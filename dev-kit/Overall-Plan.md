# TableTurnerr.com Complete Website Rebuild Plan (Updated)

## Context

TableTurnerr's site was rebuilt from a bare Next.js 16 scaffold into a multi-page, editorial-style website that positions TableTurnerr as a restaurant growth agency. Phases 0–4 are complete: project foundation, hero + navigation, all homepage sections, all 5 service detail pages + overview, and inner pages (About, Contact, Case Studies). The site runs Next.js 16.1.6, React 19.2.3, TypeScript, Tailwind CSS v4, and Framer Motion. It is deployed on Vercel.

The next major initiative is building an admin/team system with Google Auth so team members can create, manage, and publish blog content through a CMS interface — before any blog articles are written. The database will run on a Hostinger VPS (Ubuntu 24.04 LTS, KVM 1) and the Vercel-deployed app will connect to it remotely.

**Completed phases:**
- Phase 0: Project Foundation (tokens, fonts, directory, SEO, UI primitives) ✓
- Phase 1: Hero + Navigation ✓
- Phase 2: All Homepage Sections (Hero, Services, Mission, Partners, Process, Testimonials, FAQ, CTA, Results, Footer) ✓
- Phase 3: All Service Pages (5 service detail pages + overview) ✓
- Phase 4: Inner Pages (About, Contact, Case Studies) ✓

---

## PHASE 5: Admin System + Blog Infrastructure

**This phase replaces the original Phase 5 (static blog). It establishes database-backed blog content management with authentication, then builds the public-facing blog, and finally populates content through the CMS.**

---

### Sub-phase 5.1: Database + Auth Foundation

**2 parallel agents. Must complete before Sub-phase 5.2.**

#### Agent 5.1A: PostgreSQL + Prisma Setup

**VPS Setup (manual prerequisite):**
On the Hostinger VPS (Ubuntu 24.04):
1. Install PostgreSQL 16
2. Create database `tableturnerr` and a role with password auth
3. Configure `pg_hba.conf` to allow connections from Vercel IP ranges (or use PgBouncer for connection pooling)
4. Open port 5432 (or custom port) in VPS firewall
5. Ensure TLS for connections (`sslmode=require`)

**Prisma Schema (`prisma/schema.prisma`):**

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql", url = env("DATABASE_URL") }

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          Role      @default(AUTHOR)
  accounts      Account[]
  sessions      Session[]
  posts         BlogPost[] @relation("PostAuthor")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  ADMIN
  AUTHOR
}

model Account { /* NextAuth.js standard fields */ }
model Session { /* NextAuth.js standard fields */ }
model VerificationToken { /* NextAuth.js standard fields */ }

model BlogPost {
  id              String       @id @default(cuid())
  title           String
  slug            String       @unique
  content         Json         // Rich text stored as structured JSON (editor-agnostic)
  contentHtml     String?      // Pre-rendered HTML for public display
  excerpt         String?
  featuredImage   String?
  status          PostStatus   @default(DRAFT)
  publishedAt     DateTime?
  scheduledAt     DateTime?
  author          User         @relation("PostAuthor", fields: [authorId], references: [id])
  authorId        String
  categories      Category[]
  metaTitle       String?
  metaDescription String?
  metaKeywords    String[]
  ogImage         String?
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([status, publishedAt])
  @@index([slug])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

model Category {
  id    String     @id @default(cuid())
  name  String     @unique
  slug  String     @unique
  posts BlogPost[]
}
```

**Files to create/modify:**
- `prisma/schema.prisma` — Full schema
- `app/lib/db.ts` — Prisma client singleton (global in dev, single instance in prod)
- `.env.local` — `DATABASE_URL` connection string (gitignored)
- `.env.example` — Template with placeholder values (committed)
- `package.json` — Add `prisma` and `@prisma/client`

#### Agent 5.1B: NextAuth.js v5 (Auth.js) + Google OAuth

**Dependencies:**
```
pnpm add next-auth@beta @auth/prisma-adapter
```

**Files to create/modify:**
- `app/lib/auth.ts` — Auth.js v5 configuration: PrismaAdapter, Google OAuth provider, session callback (attach `user.role`), signIn callback (whitelist emails)
- `app/api/auth/[...nextauth]/route.ts` — Auth.js API route handler
- `app/lib/auth-helpers.ts` — `getCurrentUser()`, `requireAuth()`, `requireRole(role)`
- `middleware.ts` — Protect `/admin/*` routes; redirect unauthenticated users to `/admin/login`
- `.env.local` additions — `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`, `NEXTAUTH_URL`

**Google Cloud Console setup (manual prerequisite):**
1. Create OAuth 2.0 credentials
2. Set redirect URI to `https://tableturnerr.com/api/auth/callback/google` (+ localhost for dev)

**Admin route group structure:**
```
app/
  (admin)/
    admin/
      layout.tsx         — Auth-gated layout, sidebar nav
      login/page.tsx     — Google sign-in button
      page.tsx           — Dashboard (post counts, recent drafts)
      posts/
        page.tsx         — Blog post list (filterable by status)
        new/page.tsx     — New post editor
        [id]/
          edit/page.tsx  — Edit existing post
      categories/
        page.tsx         — Category CRUD
      settings/
        page.tsx         — User management (admin-only)
```

> **APPROVAL GATE 5.1:** User reviews database schema, auth flow, and admin route structure.

---

### Sub-phase 5.2: Admin Dashboard + Blog CMS

**3 parallel agents. Depends on Sub-phase 5.1.**

#### Agent 5.2A: Admin Layout + Dashboard

**Files:**
- `app/(admin)/admin/layout.tsx` — Admin shell: charcoal sidebar, cream content area, user avatar + sign-out, responsive (sidebar collapses on mobile)
- `app/(admin)/admin/page.tsx` — Dashboard: stats cards (Total/Published/Drafts/Scheduled), recent drafts, quick action buttons
- `app/(admin)/admin/login/page.tsx` — Centered login card with Google sign-in button

#### Agent 5.2B: Blog Post CRUD + Editor

**Server Actions** (`app/(admin)/admin/posts/actions.ts`):
- `createPost(data)`, `updatePost(id, data)`, `deletePost(id)`, `publishPost(id)`, `unpublishPost(id)`, `schedulePost(id, scheduledAt)`
- All actions verify auth + role

**UI Pages:**
- `app/(admin)/admin/posts/page.tsx` — Post listing: table with Title, Status badge, Author, Date, Actions. Filter tabs (All/Published/Drafts/Scheduled), search, pagination
- `app/(admin)/admin/posts/new/page.tsx` — New post form
- `app/(admin)/admin/posts/[id]/edit/page.tsx` — Edit post form

**Shared editor** (`app/components/admin/PostEditor.tsx`):
- **Rich text editor** — Defer specific choice to implementation. Recommendations:
  1. **Tiptap** (recommended) — Headless, React-native, extensible, JSON output
  2. **Plate** — Built on Slate, shadcn-compatible
  3. **Markdown textarea + preview** — Simplest option
- Content stored as structured JSON in `content` field
- On save/publish, generate `contentHtml` for public rendering
- Side panel: SEO title, meta description, keywords, OG image, categories, featured image, slug, excerpt, status, scheduled date

#### Agent 5.2C: Image Upload + Category Management

**Image Upload:**
- `app/api/upload/route.ts` — Multipart upload, auth-gated, validates type/size
- Storage option (defer to implementation):
  1. **Vercel Blob** (recommended) — Zero config, built-in CDN
  2. **Cloudinary** — More transforms, generous free tier
  3. **Self-hosted on VPS** — Max control, requires nginx setup
- `app/components/admin/ImageUploader.tsx` — Drag-and-drop, preview, alt text input

**Category Management:**
- `app/(admin)/admin/categories/page.tsx` — List, add, edit, delete categories
- `app/(admin)/admin/categories/actions.ts` — Server Actions

**Preview:**
- `app/(admin)/admin/posts/[id]/preview/page.tsx` — Renders post using public template, auth-gated, "Preview Mode" banner

> **APPROVAL GATE 5.2:** User reviews admin dashboard, post editor, and CMS. Rich text editor choice confirmed.

---

### Sub-phase 5.3: Public Blog Pages

**2 parallel agents. Depends on Sub-phase 5.2.**

#### Agent 5.3A: Blog Listing + Article Pages

**Blog Listing** (`app/(marketing)/blog/page.tsx`):
- Replace "Coming Soon" placeholder
- H1: "Restaurant Marketing Blog" (target keyword)
- Featured/latest post card + post grid (2-3 columns)
- Category filter bar (horizontal pills)
- Pagination
- Server component querying Prisma for published posts

**Blog Post** (`app/(marketing)/blog/[slug]/page.tsx`):
- `generateStaticParams()` for all published post slugs (ISR with `revalidate`)
- `generateMetadata()` from post's SEO fields
- Layout: Breadcrumb, H1, author box, featured image, article body (from `contentHtml`), ToC sidebar (sticky desktop, collapsible mobile), category tags, share buttons, related posts, CTA section
- Server component with `'use client'` ToC only

#### Agent 5.3B: Blog SEO Infrastructure

- `app/lib/schema.ts` — Add `generateArticleSchema()` (type: `BlogPosting`)
- `app/(marketing)/blog/[slug]/opengraph-image.tsx` — Dynamic OG image per post
- `app/(marketing)/blog/[slug]/twitter-image.tsx` — Twitter card image
- `app/feed.xml/route.ts` — RSS 2.0 feed
- `app/sitemap.ts` — Add dynamic blog post URLs from Prisma
- `app/layout.tsx` — Add RSS auto-discovery link

**Blog Components:**
- `app/components/blog/TableOfContents.tsx` — `'use client'`, IntersectionObserver, sticky sidebar
- `app/components/blog/AuthorBox.tsx` — E-E-A-T author info
- `app/components/blog/RelatedPosts.tsx` — Same-category posts grid
- `app/components/blog/BlogCTA.tsx` — Article bottom CTA
- `app/components/blog/ShareButtons.tsx` — Twitter/X, LinkedIn, copy link

> **APPROVAL GATE 5.3:** User reviews public blog listing, article template, and SEO infrastructure.

---

### Sub-phase 5.4: Comparison Pages + Tools

**2 parallel agents. Independent — can run in parallel with Sub-phase 5.3.**

#### Agent 5.4A: Comparison Page Template + Owner.com vs ChowNow

**Template** (`app/components/templates/ComparisonPage.tsx`):
- Layout: Breadcrumb, H1, intro, side-by-side feature table, verdict, FAQ, CTA
- Mobile: table stacks to cards

**First Comparison** (`app/(marketing)/compare/owner-com-vs-chownow/page.tsx`):
- H1: "Owner.com vs ChowNow: Which Is Better for Your Restaurant?"
- Keywords: "Owner.com vs ChowNow", "ChowNow alternative"
- Data source: Business Overview Section 6 + SEO Report Section 3.2
  - Owner.com: $500/mo flat, $970 setup (waived via TableTurnerr), 5% per order (paid by guest)
  - ChowNow: starting from $119/mo (Hub $119, Pro $229, Premier $328) + 2.95% + $0.29/transaction
- FAQ section with FAQPage JSON-LD

#### Agent 5.4B: Commission Fee Calculator

**`app/(marketing)/tools/restaurant-commission-calculator/page.tsx`:**
- Interactive `'use client'` component
- Inputs: monthly orders, average order value, commission rate (default 25%)
- Outputs: annual fees, savings with Owner.com ($500/mo flat), savings with ChowNow (starting from $119/mo), ROI
- Uses NumberTicker for animated results
- Keywords: "restaurant commission calculator", "DoorDash fee calculator"
- Data source: SEO Report commission rates, Business Overview pricing

> **APPROVAL GATE 5.4:** User reviews comparison page and calculator.

---

### Sub-phase 5.5: Blog Content Population

**1 agent (sequential — content must be reviewed). Depends on 5.2 + 5.3.**

**4 cornerstone articles created through the admin CMS:**

| # | Title | Slug | Category | Primary Data Source |
|---|-------|------|----------|-------------------|
| 1 | "The Complete Guide to Restaurant SEO in 2026" | `restaurant-seo-complete-guide` | Restaurant SEO | SEO Report Sections 4.1, 4.3, 7.1-7.4 |
| 2 | "How to Reduce DoorDash & UberEats Commission Fees" | `reduce-doordash-ubereats-commission-fees` | Direct Ordering | Business Overview Section 6, SEO Report commission data |
| 3 | "How Much Does a Restaurant Website Cost? (Complete Breakdown)" | `restaurant-website-cost-breakdown` | Restaurant Website Design | SEO Report pricing benchmarks ($1,500-$50,000 range) |
| 4 | "Owner.com Review: Is It Worth $500/Month for Your Restaurant?" | `owner-com-review-worth-it` | Platform Reviews | Business Overview Sections 6-7, SEO Report Section 3.2 |

**Content rules:**
- All stats sourced ONLY from Business Overview, SEO Report, or Reports_snapshot.csv
- Internal links: 2-3 per article to service pages and other blog posts
- Unique featured image per post (never reuse from other sections/pages)
- Categories to seed: "Restaurant SEO", "Online Ordering", "Restaurant Marketing", "Platform Reviews"
- Author: Hashaam
- AI search optimization: include structured Q&A, "Key Takeaways" summary boxes, clear extractable answers in first paragraph

> **APPROVAL GATE 5.5:** User reviews all 4 published articles on the live blog.

---

## PHASE 6: Site-wide Updates with Real Data

**4 parallel agents. Can begin after Sub-phase 5.3.**

All updates use real data from Reports_snapshot.csv, Business Overview, and SEO Report.

#### Agent 6A: Update Results Section with Real Analytics

**File:** `app/components/sections/Results.tsx`

New stats from Reports_snapshot.csv:
- "1,000+ active users driven in just 28 days" (source: 1,051 total)
- "820 unique visitors to a single restaurant site in one month" (source: Waikiki Chicken)
- "35% average bounce rate" (source: 35.87% Waikiki, 34.69% Grill Shack; industry avg ~47%)
- "700+ sessions/month from Google Ads + Organic SEO" (source: 432 CPC + 417 organic)
- "International reach across 100+ cities" (source: 200+ cities in CSV)

Split into "Our Client Results" (TableTurnerr analytics) + "Partner Ecosystem Results" (existing Owner.com/ChowNow stats).

#### Agent 6B: Update Case Studies with Real Analytics

**File:** `app/(marketing)/case-studies/page.tsx`

**Waikiki Chicken In Paradise:** 1,613 views, 820 active users, 35.87% bounce rate, Honolulu (507 users), Google CPC (387 users) + Organic (317 users)

**Grill Shack West Drayton:** 371 homepage + 244 menu views, 217 active users, 34.69% bounce rate, London (55 users)

**Combined:** AI search traffic (ChatGPT 3-4 sessions, Perplexity 1 session), international reach across 100+ cities

#### Agent 6C: Pricing + Partner Data Updates

- Update all ChowNow references to "starting from $119/mo" (currently "$199/month")
- Check: case-studies/page.tsx, service pages, comparison page, blog content
- Flag: Business Overview doc needs manual update from "$199/month" to reflect tiered pricing

#### Agent 6D: AI Search Optimization + Internal Linking

- Add structured Q&A content, "Key Takeaways" boxes, `speakable` schema
- Evidence: Reports_snapshot.csv shows ChatGPT (3-4 sessions) and Perplexity (1 session) traffic
- Internal linking: service pages link to relevant blog posts, blog posts link to services + other posts
- Update sitemap to include all new routes (blog, compare, tools)

> **APPROVAL GATE 6:** User reviews all data updates, pricing corrections, and internal linking.

---

## PHASE 7: Polish & Launch Prep

**4 parallel agents. Final phase before launch.**

| Agent | Scope |
|-------|-------|
| 7A | Animation polish — `prefers-reduced-motion`, consistency audit, admin panel animations (minimal) |
| 7B | Performance — Lighthouse 90+ all pages, image WebP/AVIF, LCP/CLS/FID, bundle splitting (admin vs marketing), Prisma query efficiency, VPS connection pooling |
| 7C | SEO audit — unique titles/descriptions, JSON-LD validation (Organization, WebSite, Service, Article, FAQ, Breadcrumb), sitemap completeness, OG images, heading hierarchy, alt text, canonical URLs, RSS validation |
| 7D | Responsive QA — 320px-1440px all pages, mobile ToC collapse, calculator mobile UX, admin responsive sidebar, touch targets 44px min |

**Verification checklist:**
1. `pnpm build` — Zero errors
2. `pnpm dev` — Visual review at localhost:3000
3. Responsive at 375px, 768px, 1280px
4. View Source contains SEO-critical text (server-rendered)
5. Lighthouse: Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+
6. Admin: Login flow, CRUD operations, preview rendering
7. Blog: Posts display, pagination, RSS validates
8. Database: Vercel-to-VPS connection stable, queries <200ms

---

## Architecture Decisions

1. **Route group `(marketing)`** — Shared nav+footer layout, all public pages
2. **Route group `(admin)`** — Separate admin layout with sidebar nav, no marketing nav/footer, all pages behind auth
3. **Server components by default** — `'use client'` only for: AnimatedElement, MobileMenu, FAQ accordion, PostEditor, Calculator, admin interactive components, blog ToC
4. **No dark mode** — Light/cream-only editorial design (marketing + admin)
5. **Tailwind v4 CSS tokens** — All in `globals.css @theme inline`, no `tailwind.config.ts`
6. **`@/*` path alias** — Maps to project root
7. **`next/image` everywhere** — `priority` on hero image only
8. **Database-backed blog** — PostgreSQL on Hostinger VPS, not static files. Enables CMS editing, scheduling, draft/publish workflow
9. **Prisma ORM** — TypeScript-native, handles migrations and type generation
10. **NextAuth.js v5 (Auth.js)** — Google OAuth with Prisma adapter, role-based access
11. **Rich text as JSON** — Editor-agnostic storage. `content` (JSON) + `contentHtml` (pre-rendered) for fast public rendering
12. **Image storage** — Defer to implementation (Vercel Blob recommended)
13. **ISR** — Blog pages use Incremental Static Regeneration. Admin "Publish" triggers `revalidatePath('/blog')`

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Hostinger VPS) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `AUTH_SECRET` | NextAuth.js JWT signing secret |
| `NEXTAUTH_URL` | Base URL (prod: `https://tableturnerr.com`) |
| `BLOB_READ_WRITE_TOKEN` | Image upload storage (if Vercel Blob) |

## New Dependencies (Phase 5+)

| Package | Purpose | Phase |
|---------|---------|-------|
| `prisma` | ORM CLI (devDep) | 5.1 |
| `@prisma/client` | ORM runtime | 5.1 |
| `next-auth@beta` | Auth.js v5 | 5.1 |
| `@auth/prisma-adapter` | NextAuth Prisma integration | 5.1 |
| Rich text editor (TBD) | Blog editing (Tiptap recommended) | 5.2 |
| `@vercel/blob` (if chosen) | Image upload storage | 5.2 |

## Data Source Reference

| Data Point | Source | Used In |
|-----------|--------|---------|
| Owner.com: $500/mo, $970 setup waived | Business Overview §6 | Compare page, blog, case studies |
| ChowNow: starting from $119/mo | SEO Report §3.2 (updated pricing) | Compare page, blog, case studies |
| Samos Oaxaca +377% growth | Business Overview §7 | Results, case studies, blog |
| Saffron Indian Kitchen $4.5M | Business Overview §7 | Results, case studies |
| HillCrust Pizza 5-figure savings | Business Overview §7 | Results, case studies |
| Ollie's $2M+ saved, 108% repeat orders | Business Overview §7 | Case studies |
| 1,051 active users in 28 days | Reports_snapshot.csv | Results, case studies |
| 820 active users (Waikiki) | Reports_snapshot.csv | Case studies |
| 35.87% bounce rate (Waikiki) | Reports_snapshot.csv | Case studies |
| Google CPC: 387 users / 432 sessions | Reports_snapshot.csv | Case studies, blog |
| Google Organic: 317 users / 417 sessions | Reports_snapshot.csv | Case studies, blog |
| ChatGPT: 3-4 sessions, Perplexity: 1 | Reports_snapshot.csv | AI search content |
| 200+ cities worldwide | Reports_snapshot.csv | Case studies, Results |
| 90% diners research online | SEO Report §Key Data | Hero, blog, service pages |
| 77% check website before deciding | SEO Report §Key Data | Blog, service pages |
| DoorDash/UberEats 15-30% commission | SEO Report §Key Data | Blog, calculator, compare |
| Restaurant Google Ads CPC $1.92 | SEO Report §Key Data | Blog, google-ads service |
| Target keywords | SEO Report §4 | Blog topics, page metadata |
| Content marketing roadmap | SEO Report §8 + §10 | Blog content plan |

## Verification

After each phase:
1. `pnpm build` — Zero build errors
2. `pnpm dev` — Visual review at localhost:3000
3. Responsive at 375px, 768px, 1280px
4. View Source contains SEO-critical text (server-rendered)
5. Phase 5: Database connectivity, auth flow E2E, CRUD operations
6. Phase 6: All stats match source data exactly
7. Phase 7: Lighthouse 90+ all metrics
