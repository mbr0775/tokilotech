# Shared Supabase connection

The website and Tokilo mobile application use `https://nsosypdtxdoeiszilpwj.supabase.co`. Set `NEXT_PUBLIC_SUPABASE_URL` and that project's anon/public key in the ignored `.env.local` file and in the hosting environment. Restart development and rebuild production after changing either value. Never put service-role credentials in a `NEXT_PUBLIC_` variable.

The former website project `ylxeydwmwbwbebujkeyi` does not contain the required content tables. Connecting to the shared project resolves its missing-table errors; the existing shared tables do not need to be recreated.

## Website administration

Sign in at `/login` with the existing mobile administrator account. Administrators enter `/admin`, with links to:

- `/admin/projects`: website/mobile showcase entries, portfolio links, display order, publishing, cover and gallery images.
- `/admin/portfolio`: create and edit project title, client, category, technologies, description, status and cover image. Private mobile pricing is not included or overwritten. Link a portfolio project to a showcase entry to display its details on the public website.
- `/admin/products`: create and edit the shared `it_products` catalog, including name, brand, category, description, display price, cover, availability and active status. These entries are used by the existing mobile product catalog; this change does not add a web checkout.

Uploads use the existing public `tokilo-media` bucket. Existing uploads and other mobile tables are retained. No migrations or database resets are needed for these resources.

Website admin visibility follows the mobile administrator email. That UI check does not replace Supabase authorization: authenticated writes and uploads remain subject to the existing database RLS and Storage policies. This setup does not grant visitors write permissions or change those policies.

## Verification

Read queries for `portfolio`, `project_showcase` with its portfolio/gallery relationships, `project_images`, and `it_products` are checked against the live shared project. Automated editor write tests must use intercepted requests or a separate test database, never production records.

If an authenticated save returns `42501` or a Storage access error, review the existing policies in the shared Supabase dashboard for the administrator account. Preserve the mobile application's policies and redirect URLs. Allow `http://localhost:3000/login`, `http://localhost:3001/login`, and the deployed website login URL in Auth URL Configuration for confirmation links.

Supabase reference documentation: [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) and [Storage access control](https://supabase.com/docs/guides/storage/security/access-control).

Messaging and account notifications require an additional migration; see
[Realtime messaging setup](realtime-messaging.md). The no-migration statements
above apply to existing project and product content management.
