This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install the dependencies:

```bash
npm ci
```

If you do not already have a `.env.local` file, copy the environment template:

```bash
cp .env.example .env.local
```

Fill in both values in `.env.local` using the Supabase project for this website:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
```

The values must be real project credentials, not the placeholders above. Use the
anon public key, never a service role or secret key. The home page loads projects
from Supabase, so both values are required. `.env.local` is ignored by Git.
Restart the development server after changing these values.

## Shared backend with the Tokilo mobile app

The website connects directly to the Supabase project used by
[tokilo_mobile_app](https://github.com/mbr0775/tokilo_mobile_app):
`https://nsosypdtxdoeiszilpwj.supabase.co`. Set the two environment variables
above in your hosting provider as well as locally, and rebuild the website.
Use the same public key as the Flutter app's
`lib/core/constants/supabase_constants.dart`, or obtain it from that project's
Supabase dashboard. No separate API server or mobile app change is required.

Both applications share Supabase Auth users. An existing mobile account can
sign in on `/login`; website registrations can also sign in on mobile after
email confirmation. Sessions remain separate on each device. Website signup
stores `full_name` metadata and does not assign administrative privileges.

In Supabase **Authentication → URL Configuration**, allow the website's
`https://www.tokilotech.com/login` URL and `http://localhost:3000/login` for
confirmation links. Preserve the mobile app's existing redirect URLs.

The website uses the mobile app's existing schema:

| Feature | Shared resource |
| --- | --- |
| Public projects and website admin editor | `project_showcase` |
| Category, client name, description | Active `portfolio` linked by `portfolio_id` |
| Gallery images | `project_images` linked by `showcase_id` |
| Uploaded images | Public `tokilo-media` storage bucket, `showcase/` folder |

Only active showcase entries appear publicly. Standalone entries use their
subtitle as the category and description. Both applications use `sort_order`
for display order; negative values also show the website's Featured badge.
Project detail URLs use the showcase UUID so title changes keep links valid.
Refresh a page to see changes saved in the other application.

The website admin pages use the mobile app's showcase fields: title, subtitle,
portfolio link, display order, publishing, cover, and gallery images. The mobile
schema supports images and does not store custom slugs, video types, live URLs,
or GitHub URLs. Edit linked portfolio details in the mobile app. Removing a
showcase removes it from both applications; its linked portfolio and uploaded
files are retained because other app features may reference them.

Existing Supabase row-level security and storage policies still apply. Admin
screens recognize the same admin email as the mobile app, but the database must
enforce write permissions. No database migrations or policy changes are made
by this integration. Public read access was verified; authenticated writes
must be checked by signing in with the existing administrator account.

The mobile app's products, services, orders, client portal, chat, and
notifications are separate features and are not implemented on the website
by this connection.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Homepage scroll motion

`app/motion/ScrollExperience.tsx` enhances existing homepage markup with scroll
entrances and a reading-progress line, using the installed Framer Motion package
for scroll values. Mark an element with `data-scroll-reveal="left"`, `"right"`,
`"up"`, `"down"`, or `"depth"`; optional `data-scroll-delay="1"` or `"2"`
staggers cards. Each entrance plays once. Dynamically loaded project cards and
service filters are supported without changing their data or interactions.

The hero background and About visual use modest parallax on larger screens with
a fine pointer. Small screens use shorter entrances. Reduced-motion preferences
disable the effects, and keyboard focus reveals a pending interactive element
immediately. Content is visible in server HTML, without JavaScript, and in print.

## Verification

Run `npx tsc --noEmit`, `npm run build`, and `npm run lint`.
The shared data adapter regression checks run with
`node --test tests/project-showcase.test.mjs` on Node.js 22.18 or newer.
Do not use production data for automated write tests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
