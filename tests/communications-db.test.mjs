import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

// Optional isolated PostgreSQL runner; never connects to production.
const require = createRequire(
  process.env.PGLITE_MODULE_PATH || import.meta.url,
);
let PGlite;
try {
  ({ PGlite } = require("@electric-sql/pglite"));
} catch {
  /* Run with the documented isolated test dependency. */
}
test(
  "shared messaging migration enforces privacy, identity, atomicity and individual receipts",
  {
    skip:
      !PGlite &&
      "Set PGLITE_MODULE_PATH to a temporary @electric-sql/pglite installation.",
  },
  async () => {
    const db = new PGlite();
    const admin = "00000000-0000-4000-8000-000000000001";
    const alice = "00000000-0000-4000-8000-000000000002";
    const bob = "00000000-0000-4000-8000-000000000003";
    const claims = (id) => ({
      sub: id,
      email: id === admin ? "mubassirnasar@gmail.com" : `${id}@example.com`,
      user_metadata: { full_name: "Database test account" },
    });
    const login = async (id) => {
      await db.exec("reset role");
      await db.query("select set_config('request.jwt.claims', $1, false)", [
        JSON.stringify(claims(id)),
      ]);
      await db.exec("set role authenticated");
    };
    const query = async (sql, values = []) =>
      (await db.query(sql, values)).rows;
    try {
      await db.exec(`
      create role anon; create role authenticated;
      create schema auth; create table auth.users(id uuid primary key, email text, email_confirmed_at timestamptz);
    `);
      // Cast explicitly rather than relying on a fixture's text-to-UUID coercion.
      await db.exec(
        "create function auth.uid() returns uuid language sql stable as $$ select (nullif(current_setting('request.jwt.claims', true), '')::jsonb->>'sub')::uuid $$; create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb, '{}'::jsonb) $$; grant usage on schema auth to anon, authenticated; grant execute on all functions in schema auth to anon, authenticated;",
      );
      await db.exec(`
      create table public.conversations(id uuid primary key default gen_random_uuid(), client_id uuid not null references auth.users(id), client_name text, client_email text, last_message text, last_message_at timestamptz not null default now(), is_read_admin boolean default true, is_read_client boolean default true, created_at timestamptz default now());
      create table public.messages(id uuid primary key default gen_random_uuid(), conversation_id uuid not null references conversations(id), sender_id uuid not null references auth.users(id), sender_name text, sender_role text, content text, message_type text, is_read boolean default false, seen_at timestamptz, attachment_url text, attachment_name text, attachment_path text, attachment_mime_type text, created_at timestamptz default now());
      create table public.notifications(id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id), title text not null, body text not null, type text default 'system', ref_id uuid, ref_table text, created_at timestamptz default now(), is_read boolean default false);
      grant all on public.conversations, public.messages, public.notifications to anon, authenticated;
      create policy legacy_wide on public.conversations for all using (true) with check (true);
      create policy legacy_wide on public.messages for all using (true) with check (true);
      create policy legacy_wide on public.notifications for all using (true) with check (true);
      create publication supabase_realtime;
    `);
      for (const id of [admin, alice, bob])
        await db.query("insert into auth.users values ($1,$2,now())", [
          id,
          claims(id).email,
        ]);
      const migration = await readFile(
        new URL(
          "../supabase/migrations/202610130001_web_communications.sql",
          import.meta.url,
        ),
        "utf8",
      );
      await db.exec(migration);
      await db.exec(migration); // Idempotent; retains seeded data and policies.
      await login(alice);
      const [thread] = await query(
        "select * from public.tokilo_open_conversation()",
      );
      assert.equal(
        (await query("select * from public.tokilo_open_conversation()"))[0].id,
        thread.id,
      );
      const messageId = "00000000-0000-4000-8000-000000000011";
      await query("select * from public.tokilo_send_message($1,$2,$3)", [
        thread.id,
        messageId,
        "A real transaction",
      ]);
      await query("select * from public.tokilo_send_message($1,$2,$3)", [
        thread.id,
        messageId,
        "A real transaction",
      ]);
      assert.equal(
        (await query("select count(*)::int as n from messages"))[0].n,
        1,
      );
      assert.equal(
        (await query("select is_read_admin from conversations"))[0]
          .is_read_admin,
        false,
      );
      await assert.rejects(
        query(
          "insert into messages(conversation_id,sender_id,sender_role,content) values ($1,$2,'admin','spoof')",
          [thread.id, alice],
        ),
      );
      await assert.rejects(
        query("select * from public.tokilo_send_message($1,$2,$3)", [
          thread.id,
          messageId,
          "Alter existing content",
        ]),
      );
      await assert.rejects(
        query("update messages set content = 'tampered' where id=$1", [
          messageId,
        ]),
      );
      await login(bob);
      assert.equal(
        (await query("select count(*)::int as n from conversations"))[0].n,
        0,
      );
      assert.equal(
        (await query("select count(*)::int as n from messages"))[0].n,
        0,
      );
      await assert.rejects(
        query("select * from public.tokilo_send_message($1,$2,'intrusion')", [
          thread.id,
          "00000000-0000-4000-8000-000000000012",
        ]),
      );
      await assert.rejects(
        query("select public.tokilo_read_conversation($1,$2)", [
          thread.id,
          messageId,
        ]),
      );
      await login(admin);
      assert.equal(
        (await query("select count(*)::int as n from conversations"))[0].n,
        1,
      );
      await query("select public.tokilo_read_conversation($1,$2)", [
        thread.id,
        messageId,
      ]);
      assert.equal(
        (await query("select is_read from messages"))[0].is_read,
        true,
      );
      await query("select * from public.tokilo_send_message($1,$2,'Reply')", [
        thread.id,
        "00000000-0000-4000-8000-000000000013",
      ]);
      const [personal] = await query(
        "insert into notifications(user_id,title,body) values ($1,'Private','Alice only') returning id",
        [alice],
      );
      const [broadcast] = await query(
        "insert into notifications(title,body) values ('Announcement','For all users') returning id",
      );
      await login(alice);
      await query("select public.tokilo_read_conversation($1,$2)", [
        thread.id,
        messageId,
      ]);
      assert.equal(
        (await query("select is_read_client from conversations"))[0]
          .is_read_client,
        false,
      );
      await query("select public.tokilo_read_conversation($1,$2)", [
        thread.id,
        "00000000-0000-4000-8000-000000000013",
      ]);
      assert.equal(
        (await query("select is_read_client from conversations"))[0]
          .is_read_client,
        true,
      );
      await db.exec(
        "reset role; create function public.test_fail_preview() returns trigger language plpgsql as $$ begin raise exception 'Simulated preview failure'; end; $$; create trigger test_fail_preview before update on conversations for each row execute function public.test_fail_preview();",
      );
      await login(alice);
      await assert.rejects(
        query(
          "select * from public.tokilo_send_message($1,$2,'Rollback check')",
          [thread.id, "00000000-0000-4000-8000-000000000014"],
        ),
      );
      assert.equal(
        (
          await query("select count(*)::int as n from messages where id=$1", [
            "00000000-0000-4000-8000-000000000014",
          ])
        )[0].n,
        0,
      );
      await db.exec(
        "reset role; drop trigger test_fail_preview on conversations; drop function public.test_fail_preview();",
      );
      await login(alice);
      let feed = await query(
        "select * from public.tokilo_notification_feed(50)",
      );
      assert.equal(feed.length, 2);
      assert.equal(Number(feed[0].unread_total), 2);
      await query("select public.tokilo_read_notifications($1)", [
        broadcast.id,
      ]);
      assert.equal(
        (
          await query("select is_read from notifications where id=$1", [
            broadcast.id,
          ])
        )[0].is_read,
        false,
      );
      await assert.rejects(
        query("update notifications set is_read=true where id=$1", [
          broadcast.id,
        ]),
      );
      await assert.rejects(
        query("update notifications set body='tampered' where id=$1", [
          personal.id,
        ]),
      );
      await query("select public.tokilo_read_notifications($1)", [personal.id]);
      assert.equal(
        Number(
          (await query("select * from public.tokilo_notification_feed(50)"))[0]
            .unread_total,
        ),
        0,
      );
      await login(bob);
      feed = await query("select * from public.tokilo_notification_feed(50)");
      assert.equal(feed.length, 1);
      assert.equal(feed[0].id, broadcast.id);
      assert.equal(feed[0].is_read, false);
      await query("select public.tokilo_read_notifications($1)", [personal.id]);
      assert.equal(
        (await query("select count(*)::int as n from notification_reads"))[0].n,
        0,
      );
      await db.exec(
        "reset role; select set_config('request.jwt.claims', '{}', false); set role anon",
      );
      assert.equal(
        (await query("select count(*)::int as n from messages"))[0].n,
        0,
      );
      assert.equal(
        (await query("select count(*)::int as n from notifications"))[0].n,
        0,
      );
      await assert.rejects(
        query("select * from public.tokilo_notification_feed(50)"),
      );
      await db.exec("reset role");
      assert.equal(
        (await query("select count(*)::int as n from messages"))[0].n,
        2,
      );
    } finally {
      await db.close();
    }
  },
);
