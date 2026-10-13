const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE_PATH || "playwright",
);
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.argv[2] || "http://localhost:3000";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname))
  throw new Error("Browser write tests must target a local preview.");
const host = "nsosypdtxdoeiszilpwj.supabase.co";
const dir = process.env.COMMUNICATION_QA_OUTPUT || require("node:os").tmpdir();
const alice = "00000000-0000-4000-8000-000000000002",
  admin = "00000000-0000-4000-8000-000000000001";
const threadId = "00000000-0000-4000-8000-000000000010";
const stamp = () => new Date().toISOString();
async function fixture(browser, owner = alice) {
  const user = {
    id: owner,
    email: owner === admin ? "mubassirnasar@gmail.com" : "client@example.com",
    aud: "authenticated",
    role: "authenticated",
    app_metadata: { provider: "email" },
    user_metadata: { full_name: "Isolated QA account" },
    created_at: stamp(),
  };
  const token = [
    Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
      "base64url",
    ),
    Buffer.from(
      JSON.stringify({
        sub: owner,
        role: "authenticated",
        exp: Math.floor(Date.now() / 1000) + 7200,
      }),
    ).toString("base64url"),
    "isolated-qa-signature",
  ].join(".");
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const state = {
    conversations: [
      {
        id: threadId,
        client_id: alice,
        client_name: "Isolated QA account",
        client_email: "client@example.com",
        last_message: "Welcome",
        last_message_at: stamp(),
        created_at: stamp(),
        is_read_admin: true,
        is_read_client: false,
      },
    ],
    messages: [
      {
        id: "00000000-0000-4000-8000-000000000020",
        conversation_id: threadId,
        sender_id: admin,
        sender_name: "Tokilo team",
        sender_role: "admin",
        content: "Welcome",
        created_at: stamp(),
        is_read: false,
        message_type: "text",
        seen_at: null,
        attachment_url: null,
      },
    ],
    notifications: [
      {
        id: "00000000-0000-4000-8000-000000000030",
        user_id: alice,
        title: "Account update",
        body: "Isolated browser test update.",
        type: "system",
        ref_id: null,
        ref_table: null,
        is_read: false,
        created_at: stamp(),
      },
      {
        id: "00000000-0000-4000-8000-000000000031",
        user_id: null,
        title: "Broadcast update",
        body: "An announcement for each account.",
        type: "system",
        ref_id: null,
        ref_table: null,
        is_read: false,
        created_at: stamp(),
      },
    ],
    reads: new Set(),
    sends: [],
    sockets: [],
    rejectRead: false,
    ambiguousSend: false,
    status: "ok",
  };
  await context.route("https://*.supabase.co/**", (route) =>
    route.abort("blockedbyclient"),
  );
  await context.route(/google-analytics\.com|googletagmanager\.com/, (route) =>
    route.abort("blockedbyclient"),
  );
  await context.addInitScript(
    ({ token, user }) =>
      localStorage.setItem(
        "sb-nsosypdtxdoeiszilpwj-auth-token",
        JSON.stringify({
          access_token: token,
          refresh_token: "isolated-test",
          expires_at: Math.floor(Date.now() / 1000) + 7200,
          expires_in: 7200,
          token_type: "bearer",
          user,
        }),
      ),
    { token, user },
  );
  function emit(table, row, event = "INSERT") {
    for (const socket of state.sockets)
      for (const join of socket.joins.values()) {
        const bindings = join.bindings.filter((b) => b.table === table);
        if (!bindings.length) continue;
        try {
          socket.send({
            topic: join.topic,
            event: "postgres_changes",
            ref: null,
            join_ref: join.joinRef,
            payload: {
              ids: bindings.map((b) => b.id),
              data: {
                schema: "public",
                table,
                type: event,
                commit_timestamp: stamp(),
                columns: Object.entries(row || {}).map(([name, value]) => ({
                  name,
                  type: typeof value === "boolean" ? "bool" : "text",
                })),
                record: row,
                old_record: {},
              },
            },
          });
        } catch {}
      }
  }
  await context.routeWebSocket(
    new RegExp("^wss://" + host.replaceAll(".", "\\.")),
    (ws) => {
      const socket = {
        joins: new Map(),
        array: false,
        send(value) {
          ws.send(
            JSON.stringify(
              socket.array
                ? [
                    value.join_ref ?? null,
                    value.ref ?? null,
                    value.topic,
                    value.event,
                    value.payload,
                  ]
                : value,
            ),
          );
        },
      };
      state.sockets.push(socket);
      ws.onMessage((raw) => {
        const parsed = JSON.parse(String(raw));
        socket.array = Array.isArray(parsed);
        const msg = socket.array
          ? {
              join_ref: parsed[0],
              ref: parsed[1],
              topic: parsed[2],
              event: parsed[3],
              payload: parsed[4],
            }
          : parsed;
        if (msg.event === "phx_join") {
          const bindings = (msg.payload.config?.postgres_changes ?? []).map(
            (binding, index) => ({ ...binding, id: index + 1 }),
          );
          socket.joins.set(msg.topic, {
            topic: msg.topic,
            joinRef: msg.join_ref,
            bindings,
          });
          socket.send({
            topic: msg.topic,
            ref: msg.ref,
            join_ref: msg.join_ref,
            event: "phx_reply",
            payload: { status: "ok", response: { postgres_changes: bindings } },
          });
        } else if (msg.event === "phx_leave") {
          socket.joins.delete(msg.topic);
          socket.send({
            ...msg,
            event: "phx_reply",
            payload: { status: "ok", response: {} },
          });
        } else if (msg.event === "heartbeat")
          socket.send({
            ...msg,
            event: "phx_reply",
            payload: { status: "ok", response: {} },
          });
      });
    },
  );
  await context.route(`https://${host}/**`, async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const method = req.method();
    const object = req.headers().accept?.includes("object");
    const headers = {
      "access-control-expose-headers": "content-range",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    };
    const respond = (body, status = 200, extra = {}) =>
      route.fulfill({
        status,
        headers: { ...headers, ...extra },
        contentType: "application/json",
        body: method === "HEAD" ? "" : JSON.stringify(body),
      });
    if (method === "OPTIONS") return respond(null);
    if (url.pathname === "/auth/v1/user") return respond(user);
    if (url.pathname === "/auth/v1/logout") return respond(null);
    if (url.pathname.startsWith("/rest/v1/rpc/")) {
      const name = url.pathname.split("/").pop();
      const args = req.postDataJSON() || {};
      if (state.status === "missing")
        return respond(
          { code: "PGRST202", message: "Function not installed" },
          404,
        );
      if (name === "tokilo_notification_feed") {
        const feed = state.notifications
          .filter((n) => n.user_id === null || n.user_id === owner)
          .map((n) => ({
            ...n,
            is_read: n.user_id === null ? state.reads.has(n.id) : n.is_read,
          }));
        const count = feed.filter((n) => !n.is_read).length;
        return respond(feed.map((n) => ({ ...n, unread_total: count })));
      }
      if (name === "tokilo_read_notifications") {
        if (state.rejectRead) {
          state.rejectRead = false;
          return respond(
            { code: "42501", message: "Read rejected by isolated policy" },
            403,
          );
        }
        for (const n of state.notifications)
          if (!args.p_notification_id || n.id === args.p_notification_id) {
            if (n.user_id === owner) n.is_read = true;
            else if (n.user_id === null) state.reads.add(n.id);
          }
        emit("notification_reads", { user_id: owner });
        return respond(null);
      }
      if (name === "tokilo_read_conversation") {
        const watermark = state.messages.find(
          (m) => m.id === args.p_last_message_id,
        );
        if (watermark)
          for (const m of state.messages)
            if (m.sender_id !== owner && m.created_at <= watermark.created_at)
              m.is_read = true;
        const c = state.conversations.find(
          (c) => c.id === args.p_conversation_id,
        );
        if (c) c[owner === admin ? "is_read_admin" : "is_read_client"] = true;
        emit("conversations", c, "UPDATE");
        return respond(null);
      }
      if (name === "tokilo_send_message") {
        state.sends.push(args);
        let msg = state.messages.find((m) => m.id === args.p_message_id);
        if (!msg) {
          msg = {
            id: args.p_message_id,
            conversation_id: args.p_conversation_id,
            sender_id: owner,
            sender_name: user.user_metadata.full_name,
            sender_role: owner === admin ? "admin" : "client",
            content: args.p_content,
            created_at: stamp(),
            is_read: false,
            message_type: "text",
            attachment_url: null,
          };
          state.messages.push(msg);
          const c = state.conversations[0];
          Object.assign(c, {
            last_message: msg.content,
            last_message_at: msg.created_at,
            is_read_admin: owner === admin,
            is_read_client: owner !== admin,
          });
          emit("messages", msg);
          emit("conversations", c, "UPDATE");
        }
        if (state.ambiguousSend) {
          state.ambiguousSend = false;
          return respond(
            { code: "P0001", message: "Delivery response interrupted" },
            500,
          );
        }
        return respond(object ? msg : [msg]);
      }
      if (name === "tokilo_open_conversation") {
        if (!state.conversations.length)
          state.conversations.push({
            id: threadId,
            client_id: owner,
            client_name: user.user_metadata.full_name,
            client_email: user.email,
            last_message: null,
            last_message_at: stamp(),
            created_at: stamp(),
            is_read_admin: true,
            is_read_client: true,
          });
        return respond(
          object ? state.conversations[0] : [state.conversations[0]],
        );
      }
      throw new Error("Unexpected RPC " + name);
    }
    if (url.pathname.startsWith("/rest/v1/")) {
      if (method !== "GET" && method !== "HEAD")
        throw new Error("Unexpected write outside secure RPC");
      const table = url.pathname.split("/").pop();
      if (!(table in state)) throw new Error("Unmocked REST table " + table);
      let rows = state[table];
      for (const [key, value] of url.searchParams)
        if (value.startsWith("eq."))
          rows = rows.filter((r) => String(r[key]) === value.slice(3));
      if (table === "conversations" && owner !== admin) {
        assert.equal(url.searchParams.get("client_id"), "eq." + owner);
        rows = rows.filter((r) => r.client_id === owner);
      }
      if (table === "messages")
        rows = [...rows].sort(
          (a, b) =>
            b.created_at.localeCompare(a.created_at) ||
            b.id.localeCompare(a.id),
        );
      return respond(object ? (rows[0] ?? null) : rows, 200, {
        "content-range": `0-${Math.max(rows.length - 1, 0)}/${rows.length}`,
      });
    }
    throw new Error(
      "Unexpected Supabase request " + method + " " + url.pathname,
    );
  });
  return { context, state, emit, user };
}
(async () => {
  const browser = await chromium.launch({
    ...(process.env.QA_BROWSER_CHANNEL
      ? { channel: process.env.QA_BROWSER_CHANNEL }
      : {}),
    headless: true,
  });
  const report = { flows: [], layouts: [], errors: [] };
  try {
    const guest = await browser.newPage({
      viewport: { width: 360, height: 850 },
    });
    await guest.goto(base + "/messages");
    await guest
      .getByRole("heading", { name: "Sign in to stay connected." })
      .waitFor();
    await guest
      .getByRole("link", { name: "Messages", exact: true })
      .first()
      .waitFor();
    await guest
      .getByRole("link", { name: "Notifications", exact: true })
      .first()
      .waitFor();
    assert.equal(
      await guest.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    report.flows.push("guest icons/sign-in gate");
    const { context, state, emit } = await fixture(browser);
    const page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push(e.message));
    await page.goto(base + "/messages");
    await page.bringToFront();
    await page.getByRole("log").waitFor();
    await page.getByText("Live messages connected", { exact: true }).waitFor();
    await page.getByRole("log").getByText("Welcome", { exact: true }).waitFor();
    await page
      .getByRole("link", {
        name: "Notifications, 2 unread notifications",
        exact: true,
      })
      .waitFor();
    const composer = page.getByRole("textbox", {
      name: "Message to Tokilo team",
    });
    await composer.fill("Browser test message");
    await page.getByRole("button", { name: "Send message" }).click();
    await composer.waitFor();
    await page.waitForFunction(
      () => document.querySelector("#message-content").value === "",
    );
    assert.equal(
      state.messages.filter((m) => m.content === "Browser test message").length,
      1,
    );
    assert.equal("sender_role" in state.sends[0], false);
    report.flows.push("persisted send with server identity");
    state.ambiguousSend = true;
    await composer.fill("Safe retry");
    await page.getByRole("button", { name: "Send message" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "Delivery response interrupted" })
      .waitFor();
    assert.equal(await composer.inputValue(), "Safe retry");
    await page.getByRole("button", { name: "Send message" }).click();
    await page.waitForFunction(
      () => document.querySelector("#message-content").value === "",
    );
    assert.equal(
      state.messages.filter((m) => m.content === "Safe retry").length,
      1,
    );
    assert.equal(
      state.sends.at(-1).p_message_id,
      state.sends.at(-2).p_message_id,
    );
    report.flows.push("ambiguous response retry uses same ID");
    const background = await context.newPage();
    await background.goto(base + "/notifications");
    await background.bringToFront();
    await page.evaluate(() =>
      Object.defineProperty(document, "hasFocus", {
        configurable: true,
        value: () => false,
      }),
    );
    const incoming = {
      ...state.messages[0],
      id: "00000000-0000-4000-8000-000000000022",
      content: "Realtime reply",
      is_read: false,
      created_at: stamp(),
    };
    state.messages.push(incoming);
    state.conversations[0].is_read_client = false;
    emit("messages", incoming);
    emit("conversations", state.conversations[0], "UPDATE");
    await page
      .getByRole("log")
      .getByText("Realtime reply", { exact: true })
      .waitFor();
    assert.equal(incoming.is_read, false);
    await page
      .getByRole("link", {
        name: "Messages, 1 unread conversations",
        exact: true,
      })
      .waitFor();
    report.flows.push("unread badges reflect database state");
    await page.bringToFront();
    await page.evaluate(() => {
      Object.defineProperty(document, "hasFocus", {
        configurable: true,
        value: () => true,
      });
      window.dispatchEvent(new Event("focus"));
    });
    await page.waitForTimeout(700);
    assert.equal(incoming.is_read, true);
    report.flows.push("realtime delivery and background read safety");
    await page.goto(base + "/notifications");
    await page
      .getByRole("heading", { name: "Account update", exact: true })
      .waitFor();
    state.rejectRead = true;
    await page
      .getByRole("button", { name: "Mark read", exact: true })
      .first()
      .click();
    await page
      .getByRole("alert")
      .filter({ hasText: "Read rejected" })
      .waitFor();
    assert.equal(state.notifications[0].is_read, false);
    await page.getByRole("button", { name: "Mark all read" }).click();
    await page.waitForTimeout(500);
    assert.equal(state.notifications[0].is_read, true);
    assert.equal(state.notifications[1].is_read, false);
    assert.ok(state.reads.has(state.notifications[1].id));
    report.flows.push("notification rejection/individual broadcast receipts");
    for (const width of [1440, 1024, 390, 360]) {
      await page.setViewportSize({ width, height: 950 });
      for (const route of ["/messages", "/notifications"]) {
        await page.goto(base + route);
        await page.getByRole("heading", { level: 1 }).waitFor();
        await page.waitForTimeout(400);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
        );
        assert.ok(
          (
            await page.locator("meta[name=robots]").getAttribute("content")
          ).includes("noindex"),
        );
        await page.screenshot({
          path: `${dir}/tokilo-communications-${route.slice(1)}-${width}.png`,
        });
        report.layouts.push({ route, width, overflow: false });
      }
    }
    const other = await fixture(browser, admin);
    const adminPage = await other.context.newPage();
    await adminPage.goto(base + "/messages");
    await adminPage
      .getByRole("heading", { name: "Customer conversations", exact: true })
      .waitFor();
    await adminPage
      .getByRole("textbox", { name: "Message to Isolated QA account" })
      .fill("Admin reply");
    await adminPage.getByRole("button", { name: "Send message" }).click();
    await adminPage.waitForTimeout(600);
    assert.equal(other.state.messages.at(-1).sender_role, "admin");
    report.flows.push("administrator customer inbox/reply");
    const fresh = await fixture(browser);
    fresh.state.conversations = [];
    fresh.state.messages = [];
    const freshPage = await fresh.context.newPage();
    await freshPage.goto(base + "/messages");
    await freshPage
      .getByRole("button", { name: "Start a conversation", exact: true })
      .click();
    await freshPage
      .getByRole("textbox", { name: "Message to Tokilo team" })
      .waitFor();
    assert.equal(fresh.state.conversations.length, 1);
    report.flows.push("new customer opens persisted support conversation");
    state.status = "missing";
    await page.goto(base + "/notifications");
    await page
      .getByRole("alert")
      .filter({ hasText: "awaiting its database update" })
      .waitFor();
    report.flows.push("missing migration shows setup error, no demo fallback");
    assert.deepEqual(report.errors, []);
    fs.writeFileSync(
      dir + "/tokilo-communication-qa.json",
      JSON.stringify(report, null, 2),
    );
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
