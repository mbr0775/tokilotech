import assert from "node:assert/strict";
import { test } from "node:test";
import {
  signInDestination,
  notificationHref,
  safeAttachment,
  unreadConversations,
} from "../lib/communications.ts";
test("sign-in returns to messaging without permitting external or arbitrary destinations", () => {
  assert.equal(signInDestination("?next=/messages", true), "/messages");
  assert.equal(
    signInDestination("?next=/notifications", false),
    "/notifications",
  );
  for (const next of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/admin/projects",
    "javascript:alert(1)",
  ]) {
    assert.equal(
      signInDestination(`?next=${encodeURIComponent(next)}`, true),
      "/admin",
    );
  }
});
test("notification links only target supported records and attachments reject executable URLs", () => {
  const id = "046ea484-65f6-4033-bcc7-bbd84b7c2138";
  assert.equal(
    notificationHref({ ref_table: "project_showcase", ref_id: id }),
    `/projects/${id}`,
  );
  assert.equal(notificationHref({ ref_table: "portfolio", ref_id: id }), null);
  assert.equal(
    notificationHref({ ref_table: "project_showcase", ref_id: "../login" }),
    null,
  );
  assert.equal(safeAttachment("javascript:alert(1)"), null);
  assert.equal(safeAttachment("data:text/html,unsafe"), null);
});
test("unread conversation counts use the recipient's shared mobile read flag", () => {
  const rows = [
    { is_read_admin: false, is_read_client: true },
    { is_read_admin: false, is_read_client: false },
  ];
  assert.equal(unreadConversations(rows, true), 2);
  assert.equal(unreadConversations(rows, false), 1);
});
