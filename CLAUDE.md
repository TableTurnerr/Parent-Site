# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Auto Prompt Optimization (MANDATORY)

**EVERY user prompt MUST be internally optimized before execution.** This is a non-negotiable preprocessing step.

Before acting on any user message:
1. In your internal reasoning, refine the user's raw prompt into a structured, specific, and actionable version using the optimization principles defined in `.claude/skills/prompt-optimizer/SKILL.md`
2. Immediately execute the optimized version — do NOT show the optimized prompt to the user
3. Deliver results directly — no preamble about optimization, no clipboard operations

This applies to ALL prompts — implementation requests, questions, bug fixes, reviews, everything.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`). Use `pnpm` not `npm`.

```bash
pnpm install              # install JS deps
pip install -r scripts/requirements.txt   # install Python deps (grader_cli)

pnpm dev                  # next dev (localhost:3000)
pnpm build                # next build --webpack
pnpm start                # next start (production)
pnpm lint                 # eslint (uses eslint-config-next)
```

No test runner is configured. Type checking happens via `pnpm build` (`tsc --noEmit` is implicit through Next.js).

## Architecture

Next.js 16 App Router project (React 19, TypeScript strict, Tailwind v4) — a marketing site **plus** a multi-tenant admin/client portal **plus** a public ingestion API for partner restaurant sites.

### Route groups (`app/`)

The app splits into four route groups, each with its own layout:

| Group | URL prefix | Layout responsibility |
|---|---|---|
| `(marketing)` | `/`, `/about`, `/services`, `/blog`, `/case-studies`, `/contact`, `/privacy`, `/terms`, `/search` | Public Navbar/Footer. SEO-tuned with `metadata`, `sitemap.ts`, `robots.ts`. |
| `(admin)` | `/admin/*` | Team CMS: blog posts, companies (clients), reports, owners, location pages, settings. Wrapped in `AdminShell` with role/status gating. |
| `(client)` | `/portal/*` | Client portal: clients see only their own reports/reviews/submissions. Wrapped in `ClientShell`. |
| `(auth)` | `/login` | Magic-link login (`@supabase/ssr`). |

Plus top-level public report routes at `/report/[slug]/[month]` (with `/report/[slug]` redirecting to latest month).

### Auth & access control (Supabase)

- **Middleware** (`proxy.ts` → `app/lib/supabase/middleware.ts`) refreshes the session on every protected request and enforces a role/status routing table:
  - `role: 'client'` → forced to `/portal`
  - `status: 'pending'` → `/admin/pending`
  - `status: 'denied'` → `/admin/denied`
  - `status: 'approved'` admins/managers/etc. → can access `/admin/*`
- **Stray OAuth code recovery**: if Supabase redirects to the site root with a `?code=...` because the callback URL isn't allowlisted, `proxy.ts` rewrites the request to `/api/auth/callback`.
- **Supabase clients** (`app/lib/supabase/`):
  - `client.ts` — browser client
  - `server.ts` — `createClient()` for RSCs/route handlers (cookies, respects RLS); `createAdminClient()` for service-role access (plain `supabase-js` so user JWTs **don't** override the service role — the cause of the v3.5 bugfix)
  - `middleware.ts` — session refresh + redirect logic
  - `types.ts` — auto-generated `Database` types; regenerate via `mcp__supabase__generate_typescript_types`

**Profile schema:** `profiles.role` ∈ `admin | author | viewer | commenter | editor | manager | client`; `profiles.status` ∈ `pending | approved | denied`. New signups land in `pending` and need approval before reaching `/admin`.

**Visibility model** (reports + posts): `public | unlisted | private | client_only`. Public/unlisted are readable by `anon` (see `20260512151452_allow_anon_read_public_reports.sql`). `client_only` is gated to the owning client via column-level RLS.

### Multi-tenant ingestion API

Partner restaurant sites embed a tiny form/widget and POST reviews + form submissions to this app's API. Live tables: `clients`, `client_api_keys`, `client_site_origins`, `site_reviews`, `site_form_submissions`, `ingest_rate_events`.

**Endpoints** (`app/api/ingest/`):
- `POST /api/ingest/reviews`
- `POST /api/ingest/form-submissions`

**Request pipeline** (all helpers live in `app/lib/ingest/`):
1. `rateLimit.ts` — per-IP+route sliding window via `ingest_rate_events` (default 10/min)
2. `turnstile.ts` — Cloudflare Turnstile token check (skipped with a warning if `TURNSTILE_SECRET_KEY` is unset; test secret `1x0000000000000000000000000000000AA` always passes)
3. `auth.ts` — `x-api-key` header (`ttk_*`) hashed via `keys.ts` and matched against `client_api_keys`; the request `Origin` must appear in `client_site_origins` for that client
4. `validation.ts` — Zod-style parsers
5. Insert with `createAdminClient()`; post-response `after()` callback fires `notifications.ts` (Resend)

CORS is computed per-request in `cors.ts` from the requesting origin against the client's allowed origins. **Provisioning** lives at `/admin/companies/<slug>/integration` — Al-Baghdadi is the live tenant; new ones onboard through this UI.

### Client report pipeline (Python + Node)

The two skills `/generate-client-report` and `/edit-client-report` and the helper scripts in `scripts/` form a separate workflow. See the **README.md** "Client Report Skills" section for the full lifecycle. Key points for Claude:

- `grader_cli.py capture` drives the user's **real Chrome** (CDP on port 9222) — close all Chrome windows before running. Outputs `READY:<slug>:<json-path>` on success.
- Both a **client-facing** and an **internal** markdown report are generated to `reports-archive/<slug>/`. Push via `grader_cli.py share` (calls `push-report.js` under the hood).
- After `/generate-client-report` writes JSON: **stop**. Never auto-run `manage-reports.bat` or push to Supabase unless the user asks (per `feedback_no_auto_launch_manager.md`).

### Email (Resend)

`app/lib/email/{client,send,templates}.ts`. Used for: "TableTurnerr shared a report" and "monthly report ready" notifications, plus ingest notifications. Sender domain must be verified in Resend; configured via `EMAIL_FROM_ADDRESS` / `EMAIL_FROM_NAME`.

### Theme

Default theme **follows the OS** (`prefers-color-scheme`) on every surface — public, admin, portal, auth, errors. Admin allows a per-user override via the `admin-theme` cookie (read in `app/(admin)/admin/layout.tsx`).

### Fonts

- **Body**: Satoshi (local woff2, `--font-satoshi`)
- **Display/accent**: Caveat (Google, `--font-caveat`) — used sparingly

User dislikes ornate serifs. The accent/orange color is for **very rare** use only; never on logos or prominent UI.

## Database & Supabase

- **Active project**: Supabase Cloud `ehmadjsryrsjjfwsmqqq` (the legacy self-hosted VPS at `psdb.tableturnerr.com` is deprecated; DNS prefetch remains in `app/layout.tsx`/`next.config.ts` but the DB itself is stopped).
- **Migrations** live in `supabase/migrations/` (numeric timestamps). Apply via `mcp__supabase__apply_migration` or the Supabase CLI. Always read existing migrations first to understand prior schema state — the codebase has shifted from a blog-only schema (Mar 2026) to multi-tenant clients+reports (May 2026) to ingestion (May 12-13 2026).
- Two MCP servers are wired up in `.mcp.json`:
  - `supabase` (HTTP, cloud project) — preferred for all schema/data work
  - `localsupabase` (postgrest, points at the deprecated VPS) — **do not use**

When making schema changes: use `mcp__supabase__list_tables` first to inspect current state, then `apply_migration` (it writes the file and runs it). For ad-hoc reads use `execute_sql`. Run `get_advisors` after any schema change to catch missing RLS / index issues.

## Conventions

- Path alias `@/*` maps to the repo root (see `tsconfig.json`).
- shadcn components live at `components/ui/` (config in `components.json`, base color `neutral`, style `base-nova`).
- App-specific components live at `app/components/{admin,portal,sections,layout,templates,ui,icons}/`.
- Don't reuse the same image across different sections or pages — every visual should be unique (see `feedback_no_reuse_images.md`).
- Footer "TABLETURNERR" watermark must keep `overflow-visible`; handle scroll prevention at body level instead.
- Commit style: see recent `git log` — `feat(Scope): ...`, `fix(Scope): ...`, `chore(version): bump version to vX.Y`. Version bumps are their own commit. The `/commit-changes` skill automates this pattern.

## Key Reference Documents

When working on website content, copy, SEO, or business positioning, **always** consult:
- `dev-kit/SEO-Report.md`
- `dev-kit/TableTurnerr Business Overview.md`
- `dev-kit/Overall-Plan.md` (Phases 5-7 roadmap; Phases 0-4 complete, Phase 5 admin CMS + Supabase blog in progress)

`dev-kit/Reports_snapshot.csv` and `dev-kit/Usage-Images/` contain source data and approved imagery.

## Environment Variables

See `.env.example`. Required for full functionality:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (used by email templates for absolute links)
- `TURNSTILE_SECRET_KEY` (ingest API bot protection — unset only in dev)
- `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`
