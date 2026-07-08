# ParagonAI Landing Page

The official landing page for **Paragon AI**, a frontier-tech company based in Addis Ababa, Ethiopia, building practical AI products for Africa. The first product, **LevelUP**, helps secondary-school students prepare for national exams through personalized AI tutoring.

This repository is a **Next.js 16 (App Router)** application backed by **Payload CMS 3** as a headless CMS, a **Postgres (Supabase)** database, and **S3 (Supabase Storage)** for media. It is fully TypeScript, styled with **Tailwind CSS 4**, and uses **Three.js / React-Three-Fiber** for the hero effects.

This document is the canonical reference for engineers working on the project. Read it end-to-end on your first day; use it as a lookup afterward.

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Environment Variables](#2-environment-variables)
3. [Architecture Overview](#3-architecture-overview)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Payload CMS](#6-payload-cms)
   - 6.1 [Collections](#61-collections)
   - 6.2 [Globals](#62-globals)
   - 6.3 [Admin Scripts](#63-admin-scripts)
   - 6.4 [Migrations](#64-migrations)
7. [Frontend Routing](#7-frontend-routing)
8. [Data Layer: Caching & Revalidation](#8-data-layer-caching--revalidation)
9. [Rendering Rich Text & Media](#9-rendering-rich-text--media)
10. [Styling, Fonts & Themes](#10-styling-fonts--themes)
11. [Adding Things: How-To Guides](#11-adding-things-how-to-guides)
    - [11.1 Add a New Collection](#111-add-a-new-collection)
    - [11.2 Add a New Global](#112-add-a-new-global)
    - [11.3 Add a New Frontend Page](#113-add-a-new-frontend-page)
    - [11.4 Add a New Component](#114-add-a-new-component)
    - [11.5 Add a New Section to the Landing Page](#115-add-a-new-section-to-the-landing-page)
    - [11.6 Add a New shadcn Primitive](#116-add-a-new-shadcn-primitive)
12. [Conventions](#12-conventions)
13. [Scripts](#13-scripts)
14. [Testing](#14-testing)
15. [Deployment Notes](#15-deployment-notes)
16. [Troubleshooting](#16-troubleshooting)

---

## 1. Quick Start

> Requires **Node.js 20+** and **Yarn 4** (Corepack-enabled). The repo declares `packageManager: yarn@4.15.0`.

```bash
# 1. Install dependencies (this also runs husky setup)
yarn install

# 2. Copy env template and fill in real values
cp .env.example .env.local   # or create .env.local by hand (see §2)

# 3. Run Payload migrations against the database
yarn payload migrate

# 4. Start the dev server (Next.js + Turbopack)
yarn dev
```

Then open:

| URL                       | What it is                                  |
| ------------------------- | ------------------------------------------- |
| http://localhost:3000     | The public landing page                     |
| http://localhost:3000/admin | Payload admin (login required)            |
| http://localhost:3000/api  | Payload REST API (auto-mounted by Payload)  |
| http://localhost:3000/api/graphql | Payload GraphQL endpoint             |

### Default admin user

The default admin account seeded for this project is:

- **Email:** `hq.paragonai@gmail.com`
- **Password:** set via the env var `PAYLOAD_SECRET` rotation / first-run script (see [§6.3](#63-admin-scripts)).

If you can't log in, use the helper script:

```bash
yarn admin:reset-password -- hq.paragonai@gmail.com 'NewStrongPassword!'
```

---

## 2. Environment Variables

All env vars live in `.env.local` (gitignored). A template is shown below; copy and fill it in.

```dotenv
# --- Core ---
# Long random string used by Payload to sign auth tokens.
PAYLOAD_SECRET=replace-me-with-a-long-random-string

# Public origin of the deployed site (used for OG/canonical URLs and the
# revalidation webhook between Payload and Next.js).
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# --- Database (Supabase Postgres) ---
# postgres://USER:PASSWORD@HOST:PORT/DBNAME
DATABASE_URL=postgresql://postgres:password@localhost:5432/paragon

# --- S3 / Supabase Storage (used by @payloadcms/storage-s3) ---
S3_BUCKET=media
S3_REGION=us-east-1
S3_ENDPOINT=https://<project-ref>.storage.supabase.co/storage/v1/s3
S3_ACCESS_KEY_ID=<s3-access-key>
S3_SECRET_ACCESS_KEY=<s3-secret-key>

# --- Revalidation webhook (Payload → Next.js ISR invalidation) ---
# Any non-empty string. Must match the value used by the admin hook callers.
REVALIDATE_SECRET=replace-me-too

# --- Optional: a third-party REST API the frontend sometimes calls ---
NEXT_PUBLIC_API_URL=https://api.example.com
```

> **Never commit secrets.** `.env*` files are git-ignored. The same env vars must be configured in your deployment provider.

---

## 3. Architecture Overview

```
┌────────────────────────────┐         ┌─────────────────────────────┐
│  Payload Admin (Next.js)   │  save   │   Postgres (Supabase)       │
│  /admin  →  collections    │ ──────► │   tables generated from      │
│  /api    →  REST/GraphQL   │         │   payload.config.ts         │
└────────────┬───────────────┘         └─────────────────────────────┘
             │ afterChange hook
             │ POST /api/revalidate
             ▼
┌────────────────────────────┐         ┌─────────────────────────────┐
│  Next.js Frontend          │ ◄─────► │   S3 / Supabase Storage     │
│  (frontend) route group    │  fetch  │   media (images) via         │
│  RSC + ISR via unstable_cache │     │   @payloadcms/storage-s3     │
└────────────────────────────┘         └─────────────────────────────┘
```

Key design points:

- **Route groups** split the Next.js app into two coexisting trees:
  - `(frontend)` — public site
  - `(payload)` — Payload admin + REST/GraphQL, mounted at `/admin` and `/api`
- **ISR-style caching** is implemented with `unstable_cache` in `src/lib/data.ts`. Each cached function declares a **tag** (`posts`, `products`, `legal`, …) that can be invalidated.
- **Revalidation** is driven by Payload's `afterChange` hooks. Every time a content editor saves a record, Payload POSTs to `/api/revalidate?secret=…` with the matching tag, which calls `revalidateTag(...)` and `revalidatePath('/', 'layout')` on the Next.js side. This makes the public site update without a redeploy.
- **Local API** for Payload is wrapped in `src/lib/payload.ts` so server components can call `payload.find(...)` ergonomically.

---

## 4. Tech Stack

| Layer            | Tooling                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| Framework        | **Next.js 16** (App Router, Turbopack)                                  |
| Language         | **TypeScript 5** (strict)                                               |
| CMS              | **Payload CMS 3** (`payload`, `@payloadcms/next`, `@payloadcms/db-postgres`) |
| Rich text        | **Lexical** (`@payloadcms/richtext-lexical`)                           |
| Database         | **Postgres** via Supabase                                              |
| Media storage    | **S3** via Supabase Storage (`@payloadcms/storage-s3`)                 |
| Styling          | **Tailwind CSS 4** + **shadcn/ui** (radix-nova style, lucide icons)    |
| Icons            | **lucide-react**                                                       |
| 3D / Effects     | **three.js**, **@react-three/fiber**, **@react-three/drei**, **postprocessing** |
| Theming          | **next-themes**                                                        |
| Validation       | **TypeScript** + **Biome** (replaces ESLint, Prettier, Stylelint)       |
| Unit tests       | **Vitest** + Testing Library                                           |
| E2E tests        | **Playwright**                                                         |
| Git hooks        | **Husky** + **lint-staged** (Biome on staged files)                    |
| Package manager  | **Yarn 4** (Corepack)                                                  |
| Analytics        | **@vercel/analytics**                                                  |

---

## 5. Project Structure

> The legacy "recommended" layout in `docs/structure.txt` is a generic Next.js reference. The structure below is the **actual** layout of this project.

```
paragon-landing-page-app/
├── docs/
│   ├── llms.txt                # LLM-friendly description of the boilerplate
│   └── structure.txt           # Generic Next.js folder guide (legacy)
│
├── public/                     # Static assets served at the site root
│   └── assets/
│       ├── icons/              # Inline-icon SVGs
│       └── images/             # Brand images (logo, hero, placeholders)
│
├── scripts/
│   └── payload-admin.ts        # CLI for managing admin users
│
├── src/
│   ├── app/
│   │   ├── (frontend)/         # ── Public site (route group) ─────────────
│   │   │   ├── layout.tsx      # Root layout: fonts, theme, analytics
│   │   │   ├── page.tsx        # Home page (composes Hero, ContentSection, Footer)
│   │   │   ├── page.test.tsx   # Smoke test for the home page
│   │   │   ├── [slug]/         # Catch-all dynamic page (renders Payload "Pages")
│   │   │   ├── api/
│   │   │   │   └── revalidate/route.ts   # ISR revalidation webhook
│   │   │   ├── blog/           # /blog and /blog/[slug]
│   │   │   ├── careers/        # /careers and /careers/[slug]
│   │   │   ├── faq/            # /faq
│   │   │   ├── help/           # /help and /help/[slug]
│   │   │   ├── legal/[slug]/   # /legal/[slug] (privacy/terms/etc.)
│   │   │   ├── products/       # /products and /products/[slug]
│   │   │   ├── privacy/        # /privacy → redirect → /legal/privacy-policy
│   │   │   └── terms/          # /terms   → redirect → /legal/terms-of-service
│   │   │
│   │   └── (payload)/          # ── Payload (admin + APIs) ───────────────
│   │       ├── admin/          # Auto-generated admin UI
│   │       ├── api/            # REST API
│   │       ├── graphql/        # GraphQL endpoint
│   │       ├── importMap.js    # Auto-generated import map for admin
│   │       └── layout.tsx      # Payload RootLayout wrapper
│   │
│   ├── components/             # Reusable UI (server + client)
│   │   ├── ui/                 # shadcn primitives (button, animated-shiny-text, …)
│   │   ├── AuroraEffect.tsx
│   │   ├── ContentSection.tsx  # Featured + latest posts + announcement cards
│   │   ├── effect-scene.tsx    # R3F scene for the right side of the hero
│   │   ├── ascii-effect.tsx    # Custom ASCII shader effect
│   │   ├── Footer.tsx          # Reads "footer" global
│   │   ├── FooterLogos.tsx
│   │   ├── Hero.tsx            # Reads "hero" global
│   │   ├── Navbar.tsx          # Reads "navigation" global
│   │   ├── PayloadImage.tsx    # <Image> wrapper for Payload Media
│   │   ├── PixelBlast.tsx      # R3F pixel-grid background
│   │   ├── PixelBlast.css
│   │   ├── RichText.tsx        # Lexical → React renderer
│   │   └── ThemeToggle/        # Light/dark theme switcher
│   │
│   ├── lib/                    # Server-side data + helpers
│   │   ├── api.ts              # Generic fetchApi<T>() wrapper
│   │   ├── data.ts             # Cached read-side queries (unstable_cache)
│   │   ├── metadata.ts         # siteConfig + createPageMetadata()
│   │   ├── payload.ts          # getPayload() helper (Local API)
│   │   └── utils.ts            # cn() (clsx + tailwind-merge)
│   │
│   ├── migrations/             # Payload DB migrations
│   │   ├── 20260617_120927.ts
│   │   ├── 20260617_120927.json
│   │   ├── 20260707_120000.ts
│   │   └── index.ts
│   │
│   ├── payload/                # ── Payload schema definitions ────────────
│   │   ├── collections/
│   │   │   ├── Careers.ts
│   │   │   ├── FAQs.ts
│   │   │   ├── HelpArticles.ts
│   │   │   ├── LegalPages.ts
│   │   │   ├── Media.ts
│   │   │   ├── Pages.ts
│   │   │   ├── Posts.ts
│   │   │   ├── Products.ts
│   │   │   └── Users.ts
│   │   └── globals/
│   │       ├── Announcements.ts
│   │       ├── Footer.ts
│   │       ├── Hero.ts
│   │       └── Navigation.ts
│   │
│   ├── styles/
│   │   └── globals.css         # Tailwind 4 entry + design tokens
│   │
│   ├── utils/                  # Pure utilities (date formatters, etc.)
│   │   ├── cn.ts
│   │   └── date.ts
│   │
│   ├── payload-generated-schema.ts   # Generated DB schema (do not edit)
│   └── payload-types.ts              # Generated TS types (do not edit)
│
├── tests-e2e/                  # Playwright specs
│   └── example.spec.ts
│
├── components.json             # shadcn config
├── biome.json                  # Lint + format config (replaces ESLint/Prettier)
├── next.config.ts              # withPayload(nextConfig)
├── payload.config.ts           # buildConfig({ … }) — root CMS config
├── playwright.config.ts
├── postcss.config.mjs
├── tsconfig.json               # Path aliases: @/*, @payload-config
├── vite.config.mts             # Vitest config
├── guide.md                    # Component install notes (e.g. AnimatedShinyText)
└── README.md                   # ← you are here
```

### Path aliases

`tsconfig.json` declares:

- `@/*`  → `./src/*`
- `@payload-config` → `./payload.config.ts`

Always import using aliases. Never use long relative paths across folders.

---

## 6. Payload CMS

The CMS is configured in [`payload.config.ts`](./payload.config.ts). It exposes:

- A **Postgres** adapter (Supabase) — connection string from `DATABASE_URL`
- The **Lexical** rich text editor with this feature set: paragraph, headings H1–H4, bold/italic/underline, links, ordered/unordered lists, blockquote, horizontal rule, upload (images via the `media` collection with a `caption` field)
- **S3 storage** for the `media` collection (`@payloadcms/storage-s3`) against Supabase Storage
- **TypeScript codegen** output at `src/payload-types.ts`
- An **importMap** generated for the admin UI (used by Payload's custom-field registry)

### 6.1 Collections

Each collection lives in `src/payload/collections/<Name>.ts` and exports a `CollectionConfig`. After adding a new collection, you must (a) import and add it to the `collections:` array in `payload.config.ts`, (b) run `yarn generate:types`, (c) run `yarn payload migrate` if the DB shape changed.

| Slug            | File                          | Purpose                                                                    | Cache tag | Notes |
| --------------- | ----------------------------- | -------------------------------------------------------------------------- | --------- | ----- |
| `users`         | `Users.ts`                    | Auth-enabled admins. `email` is used as the title.                         | —         | `auth: true` adds email + password. |
| `media`         | `Media.ts`                    | Upload collection for images. Image sizes: thumbnail (400×300), card (768×1024), hero (1920×1080). | —         | `staticDir: 'media'` for local fallback, but S3 is the primary store. |
| `pages`         | `Pages.ts`                    | Generic dynamic pages rendered at `/[slug]`. Fields: `title`, `slug` (unique, indexed), `content` (richText). | —         | Excludes slugs `admin`, `api`, `graphql` from routing. |
| `posts`         | `Posts.ts`                    | Blog posts. Fields: title, slug, content, category (select), publishedDate, heroImage, author group, featured, tags. | `posts`   | `afterChange` hook revalidates the `posts` tag. |
| `products`      | `Products.ts`                 | Product catalogue. Fields: name, slug, tagline, description, category, logo, coverImage, features (array of {title, description}), link, featured, order, status (`active` / `coming-soon` / `archived`). | `products` | |
| `help-articles` | `HelpArticles.ts`             | Help center articles. Fields: title, slug, category, summary, content, order. | `help`    | |
| `faqs`          | `FAQs.ts`                     | FAQ entries. Fields: question, answer (richText), category, order.        | `faq`     | |
| `careers`       | `Careers.ts`                  | Job openings. Fields: title, slug, department, location, type, summary, description, requirements, applyLink, salaryRange, active, order. | `careers` | Public listing only shows `active: true`. |
| `legal-pages`   | `LegalPages.ts`               | Legal documents. Fields: title, slug (`privacy-policy`, `terms-of-service`, …), type (select), summary, content, effectiveDate. | `legal`   | `/privacy` and `/terms` redirect to `/legal/<slug>`. |

#### `Media` collection highlights

- Three pre-generated image sizes (`thumbnail`, `card`, `hero`) with centre cropping
- Restricts uploads to `image/*`
- Public read access (`access.read: () => true`)

#### `Posts` collection highlights

- Categories: research, engineering, safety, company, announcements
- `author` is a `group` with `name`, `title`, `avatar`
- `tags` is an array of `{ tag: string }`
- `featured` is a checkbox used to flag a post as the "Featured" card on the home page and `/blog`

### 6.2 Globals

Globals live in `src/payload/globals/<Name>.ts` and represent **single instances** of structured content (e.g. site-wide navigation, the hero copy). Edit them in the admin under their respective entries.

| Slug             | File                  | Fields                                                                                            | Cache tag      |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------- | -------------- |
| `navigation`     | `Navigation.ts`       | `items`: array of `{ label, type: 'link' | 'dropdown', link?, subItems?: [{label, link}] }`     | `navigation`   |
| `footer`         | `Footer.ts`           | `columns`: array of `{ title, links: [{label, link}] }`; `copyright`; `socialLinks: [{platform, link}]` | `footer`       |
| `hero`           | `Hero.ts`             | `title`, `subtitle`, `primaryButtonLabel`, `primaryButtonLink`, `secondaryButtonLabel`, `secondaryButtonLink` | —              |
| `announcements`  | `Announcements.ts`    | `items: [{ title, category }]`                                                                    | `announcements`|

> All globals except `hero` register an `afterChange` hook that POSTs to `/api/revalidate?secret=…` to invalidate their respective cache tag. `hero` content is small and read directly, so it doesn't need an explicit tag — but you can add one if its `unstable_cache` consumer grows.

### 6.3 Admin Scripts

`scripts/payload-admin.ts` is a small CLI for the `users` collection, useful when you can't (or don't want to) use the admin UI.

```bash
yarn admin:status                            # list existing admin users
yarn admin:create admin@paragon.ai 'password'  # create a new admin
yarn admin:reset-password admin@paragon.ai 'new-password'  # change password
```

Internally the script:
1. Loads `.env.local`
2. Imports the root `payload.config.ts`
3. Calls `payload.find` / `payload.create` / `payload.update` against the `users` collection with `overrideAccess: true`
4. Tears down the DB pool cleanly

Use this for first-time setup, recovery, or rotation. Don't expose the script in production.

### 6.4 Migrations

Schema changes to collections/globals produce migration files in `src/migrations/`:

```
20260617_120927.ts
20260617_120927.json
20260707_120000.ts
```

Each migration has `up` and `down` exports and is registered in `src/migrations/index.ts`.

```bash
yarn payload migrate           # apply pending migrations
yarn payload migrate:create    # generate a new migration from schema diff
yarn payload migrate:fresh     # drop + re-run all migrations (destructive)
```

The repo also has a generated raw SQL schema at `src/payload-generated-schema.ts` (do not edit).

### 6.5 Generating Types

After any change to a collection or global, refresh TS types:

```bash
yarn generate:types
```

This rewrites `src/payload-types.ts`, which all frontend code imports (e.g. `import type { Post } from '@/payload-types'`).

---

## 7. Frontend Routing

| Path                          | File / folder                                          | Renders                                                     |
| ----------------------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| `/`                           | `src/app/(frontend)/page.tsx`                          | Home (Navbar + Hero + ContentSection + Footer)              |
| `/[slug]`                     | `src/app/(frontend)/[slug]/page.tsx`                   | Generic dynamic page from the `pages` Payload collection    |
| `/blog`                       | `src/app/(frontend)/blog/page.tsx`                     | Blog index (featured + latest grid)                          |
| `/blog/[slug]`                | `src/app/(frontend)/blog/[slug]/page.tsx`              | Single blog post                                            |
| `/products`                   | `src/app/(frontend)/products/page.tsx`                 | Product grid                                                |
| `/products/[slug]`            | `src/app/(frontend)/products/[slug]/page.tsx`          | Product detail with related products                        |
| `/careers`                    | `src/app/(frontend)/careers/page.tsx`                  | Open roles grouped by department                            |
| `/careers/[slug]`             | `src/app/(frontend)/careers/[slug]/page.tsx`           | Single role listing with apply link / email                 |
| `/help`                       | `src/app/(frontend)/help/page.tsx`                     | Help center index                                           |
| `/help/[slug]`                | `src/app/(frontend)/help/[slug]/page.tsx`              | Help article detail with related articles                   |
| `/faq`                        | `src/app/(frontend)/faq/page.tsx`                      | FAQ list (grouped by category, native `<details>`)          |
| `/legal/[slug]`               | `src/app/(frontend)/legal/[slug]/page.tsx`             | Legal document from `legal-pages`                           |
| `/privacy`                    | `src/app/(frontend)/privacy/page.tsx`                  | `redirect('/legal/privacy-policy')`                         |
| `/terms`                      | `src/app/(frontend)/terms/page.tsx`                    | `redirect('/legal/terms-of-service')`                       |
| `/admin/**`                   | `src/app/(payload)/admin/...`                          | Payload admin                                               |
| `/api/**`                     | `src/app/(payload)/api/...`                            | Payload REST API                                            |
| `/api/graphql`                | `src/app/(payload)/graphql/route.ts`                   | Payload GraphQL                                             |
| `/api/revalidate`             | `src/app/(frontend)/api/revalidate/route.ts`           | ISR invalidation webhook (see §8)                            |

#### Next.js dynamic-route precedence

The `app/(frontend)/[slug]` catch-all lives alongside dedicated routes like `app/(frontend)/blog/`, `app/(frontend)/products/`, etc. Next.js **prioritizes more-specific routes**, so a request to `/blog/some-post` is handled by the blog page, not the catch-all. The catch-all only catches slugs that don't match any of the dedicated folders.

The catch-all explicitly excludes `admin`, `api`, and `graphql` and returns `notFound()` for them.

#### Server Components (RSC)

Every page in `(frontend)` is a server component by default. They:

1. Fetch data from Payload through `src/lib/data.ts` (cached reads) or `src/lib/payload.ts` (uncached).
2. Pass typed data into server/client child components.
3. Export `metadata` (static) or `generateMetadata` (dynamic) using helpers from `src/lib/metadata.ts`.

> **Do not** add `'use client'` at the top of a page file. Push client behavior into a small child component only when needed (e.g. interactive menus, animation triggers).

---

## 8. Data Layer: Caching & Revalidation

The read side lives in [`src/lib/data.ts`](./src/lib/data.ts). Every exported function is wrapped in `unstable_cache(fn, keyParts, { tags })`.

| Function                           | Cache key                    | Tags         | Description |
| ---------------------------------- | ---------------------------- | ------------ | ----------- |
| `getCachedPosts`                   | `posts`                      | `posts`      | Latest 3 posts by `publishedDate` (depth 1) |
| `getCachedFeaturedPost`            | `featured-post`              | `posts`      | Single post where `featured = true` |
| `getCachedBlogPosts(limit?)`       | `blog-posts`                 | `posts`      | All blog posts, optionally limited |
| `getCachedAnnouncements`           | `announcements`              | `announcements` | Global `announcements` |
| `getCachedNavigation`              | `navigation`                 | `navigation` | Global `navigation` |
| `getCachedFooter`                  | `footer`                     | `footer`     | Global `footer` |
| `getCachedProducts`                | `products`                   | `products`   | All products, sorted by `order` |
| `getCachedFeaturedProducts`        | `featured-products`          | `products`   | Products where `featured = true` |
| `getCachedProduct(slug)`           | `product-by-slug`            | `products`   | Single product by slug |
| `getCachedHelpArticles`            | `help-articles`              | `help`       | All help articles, sorted by `order` |
| `getCachedHelpArticle(slug)`       | `help-article-by-slug`       | `help`       | Single help article by slug |
| `getCachedFaqs`                    | `faqs`                       | `faq`        | All FAQs, sorted by `order` |
| `getCachedCareers`                 | `careers`                    | `careers`    | Active jobs only, sorted by `order` |
| `getCachedCareer(slug)`            | `career-by-slug`             | `careers`    | Single active job by slug |
| `getCachedLegalPage(slug)`         | `legal-page-by-slug`         | `legal`      | Single legal page by slug |

#### The revalidation flow

```
1. Editor saves a record in /admin
       ↓
2. Payload runs the collection's afterChange hook
       ↓
3. Hook POSTs `${SITE_URL}/api/revalidate?secret=${REVALIDATE_SECRET}`
   with body { tag: 'posts' }   (or 'products', 'careers', …)
       ↓
4. /api/revalidate/route.ts verifies the secret, then calls
   revalidateTag(tag, { expire: 0 })  AND  revalidatePath('/', 'layout')
       ↓
5. Next.js purges the cached payload for that tag, the next request
   re-fetches fresh data from Payload, the user sees the update.
```

The route also accepts an empty body, in which case it revalidates **all** known tags — useful as a panic button.

```bash
curl -X POST "https://paragon.et/api/revalidate?secret=$REVALIDATE_SECRET"
```

#### When to bypass the cache

`src/lib/payload.ts` exports `getPayload()` which returns the raw Local API instance. Use it when you need:

- A single one-shot read (e.g. `generateMetadata`)
- Live writes (creating/updating records from a server action)
- Search or aggregation that doesn't fit a cache key

Example:

```ts
import { getPayload } from '@/lib/payload'

const payload = await getPayload()
const result = await payload.find({
  collection: 'pages',
  where: { slug: { equals: slug } },
  limit: 1,
})
```

---

## 9. Rendering Rich Text & Media

#### Rich text

Payload stores Lexical content as a JSON tree. Render it anywhere with:

```tsx
import RichText from '@/components/RichText'

<RichText content={post.content} className="prose prose-invert prose-lg" />
```

Internally it calls `RichText` from `@payloadcms/richtext-lexical/react`. `RichText` is safe to use in server components.

> If you need a very lightweight text-only renderer (e.g. for FAQ answers inside `<details>`), use the `extractText` pattern shown in `src/app/(frontend)/faq/page.tsx` — it walks the tree and returns an array of paragraph strings, avoiding the cost of a full Lexical renderer for short answers.

#### Media

`src/components/PayloadImage.tsx` is a thin wrapper around `next/image` that accepts a Payload `Media` object. It handles `fill`, `width`/`height`, sizes, priority, and alt fallback.

```tsx
import { PayloadImage } from '@/components/PayloadImage'
import type { Media } from '@/payload-types'

const hero = post.heroImage as Media

<PayloadImage
  media={hero}
  alt={hero.alt || post.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

Uploaded images are stored in S3 and served from there. `next.config.ts` whitelists the Supabase hostnames so the Next image optimizer can transform them.

#### Type narrowing

Payload returns uploaded relations as `string | Media`. Cast them explicitly:

```ts
const hero = post.heroImage as Media | undefined
if (hero?.url) { /* … */ }
```

---

## 10. Styling, Fonts & Themes

#### Tailwind CSS 4

- Entry: `src/styles/globals.css`
- Design tokens are declared inside `@theme inline { … }` (Tailwind 4 style)
- No `tailwind.config.js` — Tailwind 4 is configured from CSS

#### shadcn/ui

Configured via `components.json` (style: `radix-nova`, base color: `neutral`, icons: `lucide`). Add primitives with:

```bash
yarn dlx shadcn@latest add <primitive-name>
```

They land in `src/components/ui/`. See [§11.6](#116-add-a-new-shadcn-primitive) for details.

#### Fonts

Defined in `src/app/(frontend)/layout.tsx` using `next/font/google`:

- `Inter` → CSS variable `--font-inter` (body)
- `Playfair Display` → CSS variable `--font-playfair` (display, optional)

`font-sans` and `font-display` are wired in `globals.css`.

#### Dark mode

Powered by `next-themes` (attribute: `class`, default: `system`). Toggle is in `src/components/ThemeToggle/`. The whole app is dark-first — most components assume a near-black background.

#### Hero "levelup" hard link

`src/components/Hero.tsx` contains a rule: if the CMS `primaryButtonLabel` matches `/levelup/i`, the link is **forced** to `https://levelup.et`. The label itself is still editable, so the wording stays in the CMS while the destination is fixed by code.

#### Project-wide hard rules (don't violate)

- **Use `w-full`, never `w-screen`** in layouts (causes horizontal overflow on certain viewports).
- **Backgrounds that fill a parent** must be wrapped in a `relative` parent with `absolute inset-0` child (e.g. `PixelBlast`).
- **Three.js canvases** often have explicit inline pixel widths. Use `width: 100% !important; height: 100% !important;` in their CSS to force-fill the container.
- **Hero subtitles** should use `text-white/90` or higher to stay readable against animated dark backgrounds.
- **All links promoting LevelUP must point to `https://levelup.et`.**

---

## 11. Adding Things: How-To Guides

### 11.1 Add a New Collection

1. Create `src/payload/collections/<Name>.ts` exporting a `CollectionConfig`.
2. Register it in `payload.config.ts`:
   ```ts
   import { MyCollection } from './src/payload/collections/MyCollection'
   // …
   collections: [Users, Media, Pages, Posts, Products, HelpArticles, FAQs, Careers, LegalPages, MyCollection]
   ```
3. Add a cached reader in `src/lib/data.ts` (see the existing patterns — pick a `tag` like `'my-collection'`).
4. Add the tag to the `revalidate` route's `else` branch (or call it explicitly from a hook).
5. Add an `afterChange` hook on the collection that posts to `/api/revalidate` with the tag.
6. Run:
   ```bash
   yarn generate:types
   yarn payload migrate:create   # only if you added new fields
   yarn payload migrate
   ```
7. Build a frontend route or add the data to an existing page.

Minimal example:

```ts
// src/payload/collections/Testimonials.ts
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'author', defaultColumns: ['author', 'company'] },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async () => {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
        const secret = process.env.REVALIDATE_SECRET
        if (!siteUrl || !secret) return
        await fetch(`${siteUrl}/api/revalidate?secret=${secret}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tag: 'testimonials' }),
        })
      },
    ],
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
```

### 11.2 Add a New Global

1. Create `src/payload/globals/<Name>.ts` exporting a `GlobalConfig`.
2. Register it in `payload.config.ts`:
   ```ts
   import { MyGlobal } from './src/payload/globals/MyGlobal'
   // …
   globals: [Navigation, Footer, Hero, Announcements, MyGlobal]
   ```
3. Add a cached reader in `src/lib/data.ts` and an `afterChange` hook (only if you want auto-revalidation).
4. `yarn generate:types`.

### 11.3 Add a New Frontend Page

Pick the right approach based on whether the data lives in Payload or is hard-coded.

#### A. Hard-coded page (no CMS)

1. Create a folder under `src/app/(frontend)/`, e.g. `src/app/(frontend)/about/page.tsx`.
2. Export a default async function and (optionally) `metadata`:

   ```tsx
   import Navbar from '@/components/Navbar'
   import Footer from '@/components/Footer'
   import { createPageMetadata } from '@/lib/metadata'

   export const metadata = createPageMetadata({
     title: 'About',
     description: 'About Paragon AI.',
     path: '/about',
   })

   const AboutPage = () => (
     <div className="min-h-screen bg-[#050505] text-white">
       <Navbar />
       <main className="max-w-[900px] mx-auto px-6 pt-40 pb-24">
         <h1 className="text-5xl font-extrabold">About</h1>
         <p className="mt-6 text-white/70">…</p>
       </main>
       <Footer />
     </div>
   )

   export default AboutPage
   ```

3. Add a corresponding entry in the `navigation` global so it appears in the navbar.

#### B. Dynamic page from the `pages` collection

Just add a row in `/admin → Pages` with a unique `slug` and rich-text `content`. It's served at `/{slug}` by `src/app/(frontend)/[slug]/page.tsx` automatically.

#### C. Dedicated dynamic page from a custom collection

1. Add a folder, e.g. `src/app/(frontend)/testimonials/[slug]/page.tsx`.
2. Use a cached reader from `src/lib/data.ts` (or `getPayload()` for one-off reads):

   ```tsx
   import { notFound } from 'next/navigation'
   import { getPayload } from '@/lib/payload'
   import type { Testimonial } from '@/payload-types'

   type Args = { params: Promise<{ slug: string }> }

   const TestimonialPage = async ({ params }: Args) => {
     const { slug } = await params
     const payload = await getPayload()
     const result = await payload.find({
       collection: 'testimonials',
       where: { slug: { equals: slug } },
       limit: 1,
     })
     const t = result.docs[0] as Testimonial | undefined
     if (!t) return notFound()
     return <div>…</div>
   }

   export default TestimonialPage
   ```

3. (Optional) Add a `generateMetadata` for SEO.
4. (Optional) Add `generateStaticParams` for fully-static generation.

> If the slug of the new page could collide with the catch-all `[slug]`, prefer a dedicated folder — Next.js resolves the more specific path first.

### 11.4 Add a New Component

1. Place the file in `src/components/` (or `src/components/ui/` if it's a primitive).
2. Use the **component rule** (see §12):
   ```tsx
   const MyCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
     <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
       <h3 className="text-lg font-bold">{title}</h3>
       <div className="mt-3 text-sm text-white/70">{children}</div>
     </div>
   )

   export default MyCard
   ```
3. Server by default. If you need state/effects/browser APIs, add `'use client'` at the top of the file.
4. If the component must be parameterized by a Payload field (e.g. a configurable link), thread props in from a server component — never call Payload from a client component.

### 11.5 Add a New Section to the Landing Page

1. Build a new component under `src/components/` (server component that fetches whatever data it needs from `src/lib/data.ts`).
2. Import and render it in `src/app/(frontend)/page.tsx` between the existing sections (e.g. between `<Hero />` and `<ContentSection />`).
3. If the section reads a new Payload global/collection, add a cached reader and a revalidation hook for it.
4. If the section has new copy that editors should be able to change, model the data as a new global or as fields on an existing one (e.g. add a `sections` array to a `Landing` global) — don't hard-code copy that marketing will want to edit.

### 11.6 Add a New shadcn Primitive

```bash
yarn dlx shadcn@latest add <name>
```

Examples already in the repo: `button` (`src/components/ui/button.tsx`), `animated-shiny-text` (`src/components/ui/animated-shiny-text.tsx`).

After installing, import from `@/components/ui/<name>`. The shadcn CLI is configured by `components.json` (alias: `components → @/components`, `utils → @/lib/utils`).

---

## 12. Conventions

#### Component rule

All components are **pure functional arrow functions with direct props destructuring**. No `React.FC`, no default empty props objects, no class components. Server by default; add `'use client'` only when necessary.

```tsx
// ✅
const Card = ({ title }: { title: string }) => <div>{title}</div>

// ❌
export const Card: React.FC<{ title?: string }> = ({ title = '' }) => <div>{title}</div>
```

#### Code style

- **Biome** owns formatting and linting (`biome.json`). Single quotes, no semicolons, trailing commas, 2-space indent, 80-col line width. Run `yarn check` to fix.
- Husky + lint-staged auto-run Biome on staged files at commit time.
- TypeScript `strict: true`. No `any` outside well-justified adapters.

#### Imports

- Always use path aliases (`@/components/...`, `@/lib/...`, `@payload-config`).
- Use the project's `cn()` from `@/lib/utils` for class merging.
- Don't import server-only code into client components — Payload Local API, Node modules, etc. are server-only.

#### Tailwind class ordering

Tailwind classes in this codebase are usually grouped: `layout` → `spacing` → `sizing` → `background` → `border` → `text` → `effect`. `cn()` will deduplicate conflicts, so don't worry about order within reason.

#### Naming

- One component per file. File name = component name in `PascalCase.tsx`.
- Server-rendered "presentational" components can be inline co-located in `page.tsx` if used only there.

---

## 13. Scripts

| Script                | What it does                                                                 |
| --------------------- | ---------------------------------------------------------------------------- |
| `yarn dev`            | Start Next.js dev server with Turbopack.                                     |
| `yarn build`          | Build the production bundle.                                                 |
| `yarn start`          | Start the production server (run after `build`).                             |
| `yarn type-check`     | `tsc --noEmit`.                                                              |
| `yarn check`          | Run Biome across the repo, auto-fixing where possible.                       |
| `yarn payload`        | Run a Payload CLI command (e.g. `yarn payload migrate`).                     |
| `yarn generate:types` | Regenerate `src/payload-types.ts` from the schema.                           |
| `yarn generate:schema`| Regenerate `src/payload-generated-schema.ts`.                                |
| `yarn admin:status`   | List admin users.                                                            |
| `yarn admin:create`   | Create a new admin user.                                                     |
| `yarn admin:reset-password` | Reset an admin user's password.                                       |
| `yarn test`           | Run unit tests (Vitest).                                                     |
| `yarn test:e2e`       | Run end-to-end tests (Playwright).                                           |

---

## 14. Testing

#### Unit tests (Vitest)

- Configured in `vite.config.mts`
- Test files use `*.test.ts(x)` and live next to the source, e.g. `src/components/ThemeToggle/component.test.tsx`, `src/app/(frontend)/page.test.tsx`
- Run: `yarn test`

```bash
yarn test --watch     # watch mode
yarn test --run       # CI mode
```

#### E2E tests (Playwright)

- Configured in `playwright.config.ts`
- Specs live in `tests-e2e/`
- Run: `yarn test:e2e`

```bash
yarn dlx playwright install   # one-time browser install
yarn test:e2e                 # run all specs
yarn test:e2e -- --headed     # run with a visible browser
```

When adding a Playwright spec, also consider whether the page depends on the database (seed data, dynamic content) — tests against dynamic pages should mock or seed the relevant collection.

---

## 15. Deployment Notes

- The app is a standard Next.js app and can deploy to **Vercel**, **Netlify**, or any Node host that supports Next 16.
- The database is **Supabase Postgres**. Set `DATABASE_URL` to the connection-pooled URL in serverless contexts and the direct URL for long-running workers.
- Media is stored in **Supabase Storage (S3-compatible)**. The `next.config.ts` `images.remotePatterns` whitelists the Supabase hostnames — update both the Supabase project ref and the remotePatterns entry if you migrate projects.
- Required env vars in production: `PAYLOAD_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET`, `S3_*`. The S3 hook in Payload is server-side; the revalidation hook uses the public site URL.
- The admin user `hq.paragonai@gmail.com` is the default; rotate its password before launch using `yarn admin:reset-password`.

---

## 16. Troubleshooting

#### "Invalid secret" when revalidating

`REVALIDATE_SECRET` differs between the running Payload instance and the env read by `/api/revalidate`. They must match. After updating, redeploy.

#### Cache not invalidating after an edit

1. Check the editor's network tab — the `afterChange` hook should be POSTing to `/api/revalidate`.
2. Confirm `NEXT_PUBLIC_SITE_URL` is set and reachable from the Payload runtime (use `http://localhost:3000` in local dev).
3. As a nuclear option, POST to `/api/revalidate?secret=…` with an empty body to flush all tags.

#### `cannot find module '@payload-config'`

Restart the dev server after editing `tsconfig.json` or `payload.config.ts`. Turbopack watches `tsconfig.json` but the alias resolver may need a kick.

#### Image not loading

- Check that the URL belongs to a hostname in `next.config.ts` → `images.remotePatterns`.
- Confirm the file was uploaded to the `media` collection and has a `url` field.

#### Build fails on `payload-types.ts` errors

`yarn generate:types` is out of sync with the schema. Regenerate.

#### `Hero` button keeps going to `/research` instead of `https://levelup.et`

The button label is being overridden by the regex check in `src/components/Hero.tsx`. If the label doesn't match `/levelup/i`, the link falls back to `heroData.primaryButtonLink` (default `/research`). Either rename the label to include "LevelUP" or change the link in the `hero` global.

---

## Appendix A: Glossary of Cache Tags

| Tag              | What it covers                                  |
| ---------------- | ----------------------------------------------- |
| `posts`          | `posts` collection (blog posts)                 |
| `products`       | `products` collection                           |
| `careers`        | `careers` collection                            |
| `help`           | `help-articles` collection                      |
| `faq`            | `faqs` collection                               |
| `legal`          | `legal-pages` collection                        |
| `navigation`     | `navigation` global                             |
| `footer`         | `footer` global                                 |
| `announcements`  | `announcements` global                          |

If you add a new global/collection, register a new tag and add it to the `else` branch in `src/app/(frontend)/api/revalidate/route.ts`.

## Appendix B: Files You'll Touch Most Often

| Task                                          | File                                                       |
| --------------------------------------------- | ---------------------------------------------------------- |
| Change site metadata / SEO defaults           | `src/lib/metadata.ts`                                      |
| Add / change a collection's schema            | `src/payload/collections/<Name>.ts` + `payload.config.ts`  |
| Add / change a global's schema                | `src/payload/globals/<Name>.ts` + `payload.config.ts`      |
| Add a cached read function                    | `src/lib/data.ts`                                          |
| Change how revalidation works                 | `src/app/(frontend)/api/revalidate/route.ts`               |
| Change the home page composition              | `src/app/(frontend)/page.tsx`                              |
| Tweak a section (hero, navbar, footer, etc.)  | `src/components/<Component>.tsx`                           |
| Add a new route                               | `src/app/(frontend)/<route>/page.tsx`                      |
| Update site config / brand                    | `src/lib/metadata.ts` + `src/styles/globals.css`           |

---

_Last updated: 2026-07-08. Keep this file in sync as the project evolves._
