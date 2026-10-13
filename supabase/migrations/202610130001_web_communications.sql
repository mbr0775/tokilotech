-- Apply to the shared nsosypdtxdoeiszilpwj project. Retains existing mobile data.
-- No service-role key belongs in the browser. This entire migration is atomic.
begin;

create or replace function public.tokilo_support_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from auth.users u where u.id = auth.uid()
    and lower(u.email) = 'mubassirnasar@gmail.com' and u.email_confirmed_at is not null);
$$;
revoke all on function public.tokilo_support_admin() from public;
grant execute on function public.tokilo_support_admin() to anon, authenticated;

create table if not exists public.notification_reads (
  notification_id uuid not null references public.notifications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  read_at timestamptz not null default now(), primary key(notification_id, user_id)
);
alter table public.notification_reads enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;

-- A restrictive policy intersects existing mobile policies, closing any broad grants.
-- Matching permissive policies grant the intended authenticated access.
drop policy if exists tokilo_conversation_boundary on public.conversations;
create policy tokilo_conversation_boundary on public.conversations as restrictive for all to anon, authenticated
using (auth.uid() is not null and (client_id = auth.uid() or public.tokilo_support_admin()))
with check (auth.uid() is not null and (client_id = auth.uid() or public.tokilo_support_admin()));
drop policy if exists tokilo_conversation_access on public.conversations;
create policy tokilo_conversation_access on public.conversations for all to authenticated
using (client_id = auth.uid() or public.tokilo_support_admin())
with check (client_id = auth.uid() or public.tokilo_support_admin());

drop policy if exists tokilo_message_boundary on public.messages;
create policy tokilo_message_boundary on public.messages as restrictive for all to anon, authenticated
using (auth.uid() is not null and exists (select 1 from public.conversations c where c.id = conversation_id
  and (c.client_id = auth.uid() or public.tokilo_support_admin())))
with check (auth.uid() is not null and exists (select 1 from public.conversations c where c.id = conversation_id
  and (c.client_id = auth.uid() or public.tokilo_support_admin())));
drop policy if exists tokilo_message_access on public.messages;
create policy tokilo_message_access on public.messages for all to authenticated
using (exists (select 1 from public.conversations c where c.id = conversation_id
  and (c.client_id = auth.uid() or public.tokilo_support_admin())))
with check (exists (select 1 from public.conversations c where c.id = conversation_id
  and (c.client_id = auth.uid() or public.tokilo_support_admin())));
drop policy if exists tokilo_message_insert_identity on public.messages;
create policy tokilo_message_insert_identity on public.messages as restrictive for insert to authenticated
with check (sender_id = auth.uid() and sender_role = case when public.tokilo_support_admin() then 'admin' else 'client' end);
drop policy if exists tokilo_message_delete_boundary on public.messages;
create policy tokilo_message_delete_boundary on public.messages as restrictive for delete to authenticated
using (public.tokilo_support_admin());
drop policy if exists tokilo_conversation_delete_boundary on public.conversations;
create policy tokilo_conversation_delete_boundary on public.conversations as restrictive for delete to authenticated
using (public.tokilo_support_admin());

drop policy if exists tokilo_notification_boundary on public.notifications;
create policy tokilo_notification_boundary on public.notifications as restrictive for all to anon, authenticated
using (auth.uid() is not null and (user_id = auth.uid() or user_id is null or public.tokilo_support_admin()))
with check (auth.uid() is not null and (user_id = auth.uid() or public.tokilo_support_admin()));
drop policy if exists tokilo_notification_read on public.notifications;
create policy tokilo_notification_read on public.notifications for select to authenticated
using (user_id = auth.uid() or user_id is null or public.tokilo_support_admin());
drop policy if exists tokilo_notification_update on public.notifications;
create policy tokilo_notification_update on public.notifications for update to authenticated
using (user_id = auth.uid() or public.tokilo_support_admin())
with check (user_id = auth.uid() or public.tokilo_support_admin());
drop policy if exists tokilo_notification_mutation on public.notifications;
create policy tokilo_notification_mutation on public.notifications as restrictive for insert to authenticated
with check (public.tokilo_support_admin());
drop policy if exists tokilo_notification_delete on public.notifications;
create policy tokilo_notification_delete on public.notifications as restrictive for delete to authenticated
using (user_id = auth.uid() or public.tokilo_support_admin());
drop policy if exists tokilo_receipt_boundary on public.notification_reads;
create policy tokilo_receipt_boundary on public.notification_reads as restrictive for all to anon, authenticated
using (auth.uid() is not null and user_id = auth.uid()) with check (auth.uid() is not null and user_id = auth.uid());
drop policy if exists tokilo_receipt_read on public.notification_reads;
create policy tokilo_receipt_read on public.notification_reads for select to authenticated using (user_id = auth.uid());
grant select on public.notification_reads to authenticated;

-- Keep direct mobile writes compatible, but prevent identity/content changes disguised as receipts.
create or replace function public.tokilo_guard_message_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  if auth.uid() is not null then
    if new.sender_id <> auth.uid() or new.sender_role <> (case when public.tokilo_support_admin() then 'admin' else 'client' end) then
      raise exception 'Message sender does not match the signed-in account.' using errcode = '42501';
    end if;
    if new.message_type is null or new.message_type::text not in ('text', 'image', 'file') then
      raise exception 'Unsupported message type.' using errcode = '22023';
    end if;
    new.created_at := clock_timestamp();
    new.is_read := false;
    new.seen_at := null;
    if new.message_type = 'text' and (new.content is null or length(btrim(new.content)) < 1 or length(new.content) > 4000) then
      raise exception 'Messages must contain 1 to 4000 characters.' using errcode = '22023';
    end if;
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text, 0));
    if (select count(*) from public.messages where sender_id = auth.uid() and created_at > now() - interval '1 minute') >= 30 then
      raise exception 'Please wait a moment before sending more messages.' using errcode = 'P0001';
    end if;
  end if; return new;
end; $$;
drop trigger if exists tokilo_guard_message_insert on public.messages;
create trigger tokilo_guard_message_insert before insert on public.messages for each row execute function public.tokilo_guard_message_insert();
create or replace function public.tokilo_guard_conversation_insert()
returns trigger language plpgsql set search_path = '' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.client_id::text, 0));
  if exists(select 1 from public.conversations where client_id = new.client_id) then
    raise exception 'A support conversation already exists for this account.' using errcode = '23505';
  end if; return new;
end; $$;
drop trigger if exists tokilo_guard_conversation_insert on public.conversations;
create trigger tokilo_guard_conversation_insert before insert on public.conversations for each row execute function public.tokilo_guard_conversation_insert();
create or replace function public.tokilo_guard_message_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if auth.uid() is not null and (
    (to_jsonb(new) - 'is_read' - 'seen_at' - 'updated_at') is distinct from (to_jsonb(old) - 'is_read' - 'seen_at' - 'updated_at')
    or old.sender_id = auth.uid() or not new.is_read or new.seen_at is null
  ) then raise exception 'Only the recipient may record a read receipt.' using errcode = '42501'; end if;
  return new;
end; $$;
drop trigger if exists tokilo_guard_message_update on public.messages;
create trigger tokilo_guard_message_update before update on public.messages for each row execute function public.tokilo_guard_message_update();
create or replace function public.tokilo_guard_conversation_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if auth.uid() is not null and (new.id is distinct from old.id or new.client_id is distinct from old.client_id
    or new.created_at is distinct from old.created_at) then
    raise exception 'Conversation identity cannot be changed.' using errcode = '42501';
  end if; return new;
end; $$;
drop trigger if exists tokilo_guard_conversation_update on public.conversations;
create trigger tokilo_guard_conversation_update before update on public.conversations for each row execute function public.tokilo_guard_conversation_update();
create or replace function public.tokilo_guard_notification_update()
returns trigger language plpgsql set search_path = '' as $$
begin
  if auth.uid() is not null and not public.tokilo_support_admin()
    and (to_jsonb(new) - 'is_read' - 'updated_at') is distinct from (to_jsonb(old) - 'is_read' - 'updated_at') then
    raise exception 'Only notification read status may be changed.' using errcode = '42501';
  end if; return new;
end; $$;
drop trigger if exists tokilo_guard_notification_update on public.notifications;
create trigger tokilo_guard_notification_update before update on public.notifications for each row execute function public.tokilo_guard_notification_update();

create index if not exists tokilo_messages_thread_order on public.messages(conversation_id, created_at desc, id desc);
create index if not exists tokilo_messages_sender_time on public.messages(sender_id, created_at desc);
create index if not exists tokilo_conversations_client on public.conversations(client_id);
create index if not exists tokilo_notifications_user_time on public.notifications(user_id, created_at desc);

create or replace function public.tokilo_open_conversation()
returns setof public.conversations language plpgsql security definer set search_path = '' as $$
declare result public.conversations; caller uuid := auth.uid();
begin
  if caller is null or public.tokilo_support_admin() then raise exception 'Sign in with a customer account.' using errcode = '42501'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(caller::text, 0));
  select * into result from public.conversations where client_id = caller order by last_message_at desc, id desc limit 1;
  if not found then
    insert into public.conversations(id, client_id, client_name, client_email, last_message_at, is_read_admin, is_read_client)
    values (gen_random_uuid(), caller, left(coalesce(auth.jwt()->'user_metadata'->>'full_name', auth.jwt()->>'email', 'Customer'), 80),
      auth.jwt()->>'email', now(), true, true) returning * into result;
  end if;
  return next result;
end; $$;

create or replace function public.tokilo_send_message(p_conversation_id uuid, p_message_id uuid, p_content text)
returns setof public.messages language plpgsql security definer set search_path = '' as $$
declare caller uuid := auth.uid(); admin boolean := public.tokilo_support_admin();
  thread public.conversations; result public.messages; body text := btrim(p_content);
begin
  if caller is null then raise exception 'Sign in to send a message.' using errcode = '42501'; end if;
  if p_message_id is null or body is null or length(body) < 1 or length(body) > 4000 then raise exception 'Messages must contain 1 to 4000 characters.' using errcode = '22023'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(caller::text, 0));
  select * into thread from public.conversations where id = p_conversation_id for update;
  if not found or (thread.client_id <> caller and not admin) then raise exception 'Conversation is unavailable.' using errcode = '42501'; end if;
  select * into result from public.messages where id = p_message_id;
  if found then
    if result.sender_id <> caller or result.conversation_id <> p_conversation_id or result.content <> body then
      raise exception 'Message identifier is already in use.' using errcode = '42501';
    end if;
    return next result; return;
  end if;
  if (select count(*) from public.messages where sender_id = caller and created_at > now() - interval '1 minute') >= 30 then
    raise exception 'Please wait a moment before sending more messages.' using errcode = 'P0001';
  end if;
  insert into public.messages(id, conversation_id, sender_id, sender_name, sender_role, content, message_type, is_read, seen_at)
  values (p_message_id, p_conversation_id, caller, left(coalesce(auth.jwt()->'user_metadata'->>'full_name', auth.jwt()->>'email', 'Customer'), 80),
    case when admin then 'admin' else 'client' end, body, 'text', false, null) returning * into result;
  update public.conversations set last_message = body, last_message_at = result.created_at,
    is_read_admin = admin, is_read_client = not admin where id = p_conversation_id;
  return next result;
end; $$;

create or replace function public.tokilo_read_conversation(p_conversation_id uuid, p_last_message_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare caller uuid := auth.uid(); admin boolean := public.tokilo_support_admin(); thread public.conversations; watermark public.messages; still_unread boolean;
begin
  select * into thread from public.conversations where id = p_conversation_id for update;
  if caller is null or not found or (thread.client_id <> caller and not admin) then raise exception 'Conversation is unavailable.' using errcode = '42501'; end if;
  select * into watermark from public.messages where id = p_last_message_id and conversation_id = p_conversation_id;
  if not found then return; end if;
  update public.messages set is_read = true, seen_at = coalesce(seen_at, now())
    where conversation_id = p_conversation_id and sender_id <> caller and not coalesce(is_read, false)
      and (created_at, id) <= (watermark.created_at, watermark.id);
  select exists(select 1 from public.messages where conversation_id = p_conversation_id and sender_id <> caller and not coalesce(is_read, false)) into still_unread;
  if admin then update public.conversations set is_read_admin = not still_unread where id = p_conversation_id;
  else update public.conversations set is_read_client = not still_unread where id = p_conversation_id; end if;
end; $$;

create or replace function public.tokilo_notification_feed(p_limit integer default 50)
returns table(id uuid, title text, body text, type text, ref_id text, ref_table text, created_at timestamptz, is_read boolean, unread_total bigint)
language sql stable security definer set search_path = '' as $$
  with feed as (
    select n.id, n.title::text, n.body::text, n.type::text, n.ref_id::text, n.ref_table::text, n.created_at::timestamptz,
      case when n.user_id is null then r.notification_id is not null else coalesce(n.is_read, false) end as is_read
    from public.notifications n left join public.notification_reads r on r.notification_id = n.id and r.user_id = auth.uid()
    where auth.uid() is not null and (n.user_id = auth.uid() or n.user_id is null)
  )
  select f.*, count(*) filter(where not f.is_read) over() as unread_total from feed f
    order by f.created_at desc, f.id desc limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;
create or replace function public.tokilo_read_notifications(p_notification_id uuid default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Sign in to read notifications.' using errcode = '42501'; end if;
  update public.notifications set is_read = true where user_id = auth.uid() and (p_notification_id is null or id = p_notification_id);
  insert into public.notification_reads(notification_id, user_id)
    select id, auth.uid() from public.notifications where user_id is null and (p_notification_id is null or id = p_notification_id)
    on conflict(notification_id, user_id) do nothing;
end; $$;

revoke all on function public.tokilo_open_conversation(), public.tokilo_send_message(uuid, uuid, text),
  public.tokilo_read_conversation(uuid, uuid), public.tokilo_notification_feed(integer), public.tokilo_read_notifications(uuid) from public;
grant execute on function public.tokilo_open_conversation(), public.tokilo_send_message(uuid, uuid, text),
  public.tokilo_read_conversation(uuid, uuid), public.tokilo_notification_feed(integer), public.tokilo_read_notifications(uuid) to authenticated;
revoke all on function public.tokilo_guard_message_insert(), public.tokilo_guard_conversation_insert(), public.tokilo_guard_message_update(), public.tokilo_guard_conversation_update(), public.tokilo_guard_notification_update() from public;

do $$ declare target text; begin
  foreach target in array array['conversations', 'messages', 'notifications', 'notification_reads'] loop
    if not exists(select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = target) then
      execute format('alter publication supabase_realtime add table public.%I', target);
    end if;
  end loop;
end; $$;
notify pgrst, 'reload schema';
commit;
