# Shared website and mobile communications

The navigation links to `/messages` and `/notifications` on every public page. Sign in using the existing Supabase account from the mobile app. The support administrator sees customer conversations; customers see their own conversations. Account pages are excluded from search indexing.

## Required database activation

Run [202610130001_web_communications.sql](../supabase/migrations/202610130001_web_communications.sql) in the SQL Editor of **nsosypdtxdoeiszilpwj**, or apply it with an authorized Supabase migration connection. The anon/public application key cannot execute database migrations. The website reports a setup error until the required RPC functions exist; it never substitutes demonstration messages or local-only read state.

The atomic, repeatable migration retains current conversation/message/notification records. It creates `notification_reads` for individual broadcast receipts, authenticated RPC functions, indexes, Realtime publication entries, and restrictive RLS boundaries intersecting existing policies. Existing clients retain access to their conversations; other customers and anonymous visitors cannot read or modify them. Administrator authorization is checked against the confirmed email in `auth.users`, not editable profile metadata or a browser-supplied role. The administrator is the same `mubassirnasar@gmail.com` account already used by the mobile app.

Apply to a staging copy first when possible. Take a database backup before applying production changes. A schema/type mismatch rolls back the whole migration. This change neither creates users nor resets data.

## Delivery and read semantics

- `tokilo_open_conversation` reuses existing customer conversations. Database advisory locks prevent simultaneous web requests from creating duplicate threads; an insert trigger also protects mobile inserts. Existing historical duplicate threads are retained.
- `tokilo_send_message` validates account membership and sender identity, limits text to 4,000 characters and 30 new messages per minute per account, and writes the message plus conversation preview/unread flags in one transaction. A stable UUID makes an uncertain send safe to retry. The direct-insert guard applies to mobile inserts too.
- `tokilo_read_conversation` records receipts only through the last message the web client observed. A newer incoming message remains unread. The website requests receipts only when the visible, focused conversation is at its latest messages.
- Database events refresh conversation counts, thread messages and notifications. Reconnect, focus and visibility changes reconcile missed events. A 20-second reconciliation fallback runs only while visible if the subscription is disconnected. No false "connected" or successful-save status is shown for a failed subscription/write.
- Conversation/history requests load 100 records at a time and offer more history. Unread conversation totals come from a separate exact count query. The notification feed displays the latest 50, while its unread total counts the whole accessible feed.
- Message text is rendered as text. Existing mobile image attachments can be viewed; the website does not add uploads. **Existing attachments retain the mobile app's current bucket visibility**, including its public `tokilo-media` bucket. RLS protects conversation records, but does not make public attachment URLs private.

## Mobile notification compatibility

Personal notifications continue to use `notifications.is_read`, shared across devices. Broadcast receipts belong to each user in `notification_reads`; the global broadcast `is_read` is deliberately ignored by the website. Update the mobile `NotificationStore` to use `tokilo_notification_feed` and `tokilo_read_notifications` for broadcasts. Direct customer updates/deletes of broadcasts are now rejected, preventing one user from marking or deleting an announcement for everyone. Personal notification deletion remains available to its recipient. No website push permission, scheduled reminders or automatic emails are introduced; the bell displays existing account notifications and announcements.

## Verification

`node --test tests/communications.test.mjs` covers safe destinations and shared unread semantics. To validate the actual migration with isolated PostgreSQL, install `@electric-sql/pglite` in a temporary folder, set `PGLITE_MODULE_PATH` to that folder's `package.json`, then run `node --test tests/communications-db.test.mjs`. The test uses Alice/Bob/admin fixtures and deliberately broad legacy policies to verify the new restrictive boundaries, idempotent sends, individual receipts, anonymous exclusion and migration reruns. It never connects to production.

Before launch, run authenticated web-to-mobile and mobile-to-web messaging with two intended test accounts, verify cross-account isolation, background read behavior and unread badges, and confirm the four publication tables are enabled. Remove only records designated as test data. Applying SQL and passing isolated tests is not proof that production Realtime delivery has been verified.

The persisted browser suite is `tests/communications.browser.cjs`. Set `PLAYWRIGHT_MODULE_PATH`
to an installed Playwright package and optionally `QA_BROWSER_CHANNEL` (for example, `msedge`),
then run it against a local preview URL. It intercepts Supabase HTTP and WebSocket requests,
tests Realtime events and uncertain-send retries using isolated fixtures, and blocks unrecognized
Supabase HTTP endpoints. It refuses non-local preview URLs. Screenshots and its report go to the
system temporary directory or `COMMUNICATION_QA_OUTPUT`. Fixture conversations are never inserted
in the live database.

Official references: [Supabase Postgres Changes](https://supabase.com/docs/guides/realtime/postgres-changes) and [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
