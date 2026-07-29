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
pnpm build                # next build --webpack (deliberately opts out of Turbopack)
pnpm start                # next start (production)
pnpm lint                 # eslint (uses eslint-config-next)
```

No test runner is configured. Type checking happens via `pnpm build` (`tsc --noEmit` is implicit through Next.js).

## Architecture

Next.js 16 App Router project (React 19, TypeScript strict, Tailwind v4) — a marketing site **plus** a multi-tenant admin/client portal **plus** a public ingestion API for partner restaurant sites **plus** a telemetry/monitoring hub for the CRM-repo services.

### Route groups (`app/`)

| Group | URL prefix | Layout responsibility |
|---|---|---|
| `(marketing)` | `/`, `/about`, `/blog` (+ `/blog/preview/[id]`), `/contact`, `/pricing`, `/seo`, `/signup`, `/privacy`, `/terms`, plus programmatic-SEO families: `/alternatives/[slug]`, `/integrations/[slug]`, `/locations/[city]`, `/trades/[trade]` | Public Navbar/Footer. SEO-tuned with `metadata`, `sitemap.ts`, `robots.ts`. **`/services`, `/case-studies`, `/search` no longer exist** — 301-redirected to `/` in `next.config.ts`. |
| `(admin)` | `/admin/*` | Team CMS: posts, categories, companies (clients) incl. `companies/[slug]/{integration,reviews,submissions}`, reports, owners, location-pages, leads, logs, status, settings, plus `pending`/`denied`/`unauthorized`/`login`. Wrapped in `AdminShell` with role/status gating. |
| `(client)` | `/portal/*` | Client portal: `portal/clients/[slug]` (+ `[month]`, `reviews`, `submissions`) — clients see only their own data. Wrapped in `ClientShell`. |
| `(auth)` | `/login` | Magic-link login (`@supabase/ssr`). |

Plus top-level public report routes at `/report/[slug]/[month]` (with `/report/[slug]` redirecting to latest month).

### API surface (`app/api/`)

- `ingest/{reviews,form-submissions}` — multi-tenant ingestion (below)
- `auth/callback` — OAuth/magic-link callback
- `clients/[id]/{access,api-keys,origins,share,site-reviews,site-submissions}` + `clients/share-bulk` — client provisioning CRUD
- `reports/[id]` — report data
- `cron/publish-scheduled` (registered in `vercel.json`, 05:00 daily) and `cron/uptime-check` (**not** in `vercel.json` — verify external trigger before relying on it); both gated by `CRON_SECRET`
- `telemetry/{heartbeat,logs}` — ingest from CRM-repo services (bridge, Discord bot, insta-agent), token `TELEMETRY_INGEST_TOKEN`
- `health`, `email/test`

### Auth & access control (Supabase)

- **Middleware** (`proxy.ts` → `app/lib/supabase/middleware.ts`) refreshes the session on every protected request and enforces a role/status routing table:
  - `role: 'client'` → forced to `/portal`
  - `status: 'pending'` → `/admin/pending`; `status: 'denied'` → `/admin/denied`
  - `status: 'approved'` admins/managers/etc. → can access `/admin/*`
- **Multi-host SSO**: `proxy.ts` also splits hosts — `NEXT_PUBLIC_AUTH_HOST` (`auth.tableturnerr.com`) serves *only* login + callback and 308-redirects everything else to `NEXT_PUBLIC_APP_HOST`. Cross-subdomain sessions via `NEXT_PUBLIC_COOKIE_DOMAIN` (`.tableturnerr.com`) let the wireframe app (`NEXT_PUBLIC_WIREFRAMES_URL`) and future sub-apps share one login; `NEXT_PUBLIC_ALLOWED_RETURN_ORIGINS` allowlists return redirects.
- **Stray OAuth code recovery**: if Supabase redirects to the site root with `?code=...`, `proxy.ts` rewrites to `/api/auth/callback`.
- **Supabase clients** (`app/lib/supabase/`): `client.ts` (browser), `server.ts` (`createClient()` for RSCs/route handlers respecting RLS; `createAdminClient()` for service-role — plain `supabase-js` so user JWTs don't override the service role), `middleware.ts`, `types.ts` (generated — regenerate via `mcp__supabase__generate_typescript_types`).

**Profile schema:** `profiles.role` ∈ `admin | author | viewer | commenter | editor | manager | client`; `profiles.status` ∈ `pending | approved | denied`. New signups land in `pending`.

**Visibility model** (reports + posts): `public | unlisted | private | client_only`. Public/unlisted readable by `anon`; `client_only` gated to the owning client via RLS.

### Multi-tenant ingestion API

Partner restaurant sites POST reviews + form submissions here. Tables: `clients`, `client_api_keys`, `client_site_origins`, `site_reviews`, `site_form_submissions`, `ingest_rate_events`.

**Request pipeline** (`app/lib/ingest/`): `rateLimit.ts` (per-IP+route sliding window, default 10/min) → `turnstile.ts` (Cloudflare Turnstile; skipped with warning if `TURNSTILE_SECRET_KEY` unset; test secret `1x0000000000000000000000000000000AA` always passes) → `auth.ts` (`x-api-key` header `ttk_*`, hashed via `keys.ts`, matched against `client_api_keys`; request `Origin` must be in `client_site_origins`) → `validation.ts` → insert with `createAdminClient()`; post-response `after()` fires `notifications.ts` (Resend). CORS computed per-request in `cors.ts`. **Provisioning** UI: `/admin/companies/<slug>/integration` — Al-Baghdadi is the live tenant.

### Telemetry & monitoring subsystem

`app/lib/telemetry/{auth,retention,validation}.ts`, `app/lib/status/queries.ts`, `app/lib/alerts.ts` power the admin `/status` and `/logs` pages: CRM-repo services (zoomphone-ghl-bridge, discord-bot, insta-agent) send heartbeats + structured logs via `packages/telemetry-client`; alerting goes out through Discord (`DISCORD_ALERT_WEBHOOK_URL`) and email (`ALERT_EMAIL_TO`).

### Lead capture (GoHighLevel)

`app/lib/ghl.ts` forwards marketing-site leads to a GHL webhook (`GHL_LEAD_WEBHOOK_URL`); managed at `/admin/leads`.

### Client report pipeline (Python + Node)

The skills `/generate-client-report` and `/edit-client-report` plus `scripts/` form a separate workflow. **Reports are JSON-only** — the `ClientReport` schema lives in `lib/report-schema.ts` and renders via `components/report/report-renderer.tsx`. Markdown reports are fully retired; never generate `.md` reports (the README's markdown-report section is stale). Key points:

- `grader_cli.py capture` drives the user's **real Chrome** (CDP on port 9222) — close all Chrome windows before running. Outputs `READY:<slug>:<json-path>` on success.
- Reports archive to `reports-archive/<slug>/`. Push via `grader_cli.py share` (calls `push-report.js`).
- `scripts/` holds a wider toolchain: `manage_reports.py`/`manage-reports.bat`, `push-report.js`, `fetch-report.js`, `render-report.js`, `list-reports.js`, `check-grades.js`, `backfill-grader-data.js`, `verify-archive-sync.js`, etc.
- After `/generate-client-report` writes JSON: **stop**. Never auto-run `manage-reports.bat` or push to Supabase unless the user asks.

### Email (Resend)

`app/lib/email/{client,send,templates}.ts`. Report-share, monthly-report, and ingest notifications. Sender domain must be verified in Resend; configured via `EMAIL_FROM_ADDRESS` / `EMAIL_FROM_NAME`.

### Theme & fonts

Default theme **follows the OS** (`prefers-color-scheme`) on every surface. Admin allows a per-user override via the `admin-theme` cookie (read in `app/(admin)/admin/layout.tsx`).

- **Body**: Satoshi (local woff2, `--font-satoshi`); **Display/accent**: Caveat (Google, `--font-caveat`) — used sparingly.
- User dislikes ornate serifs. The accent/orange color is for **very rare** use only; never on logos or prominent UI.

## Database & Supabase

- **Active project**: Supabase Cloud `ehmadjsryrsjjfwsmqqq`. The legacy self-hosted VPS (`psdb.tableturnerr.com`) is deprecated and stopped — the `localsupabase` MCP server in `.mcp.json` points at it; **do not use it** (it should be removed and its credential rotated).
- **Migrations** live in `supabase/migrations/` (numeric timestamps). Apply via `mcp__supabase__apply_migration` or the Supabase CLI. Always read existing migrations first — the schema evolved: blog-only (Mar 2026) → multi-tenant clients+reports (May 2026) → ingestion (May 12–13 2026) → telemetry/monitoring.
- Workflow: `mcp__supabase__list_tables` first, then `apply_migration`; ad-hoc reads via `execute_sql`; run `get_advisors` after any schema change to catch missing RLS/indexes.

## Conventions

- Path alias `@/*` maps to the repo root (`tsconfig.json`). **Beware the dual roots**: shadcn ui + the report renderer live at root `components/` while app components live at `app/components/{admin,portal,sections,layout,site,blog,ui,icons,templates}`; similarly root `lib/` (only `report-schema.ts`, `utils.ts`) vs `app/lib/` (everything else). Also `app/lib/schema.ts` ≠ `lib/report-schema.ts` — pick imports carefully.
- shadcn config in `components.json` (base color `neutral`, style `base-nova`).
- Don't reuse the same image across different sections or pages — every visual should be unique.
- Footer "TABLETURNERR" watermark must keep `overflow-visible`; handle scroll prevention at body level instead.
- Commit style: `feat(Scope): ...`, `fix(Scope): ...`, `chore(version): bump version to vX.Y` as its own commit. The `/commit-changes` skill automates this.

## Skills (`.claude/skills/`)

`generate-client-report`, `edit-client-report` (JSON report pipeline), `commit-changes` (+ version bump scripts), `prompt-optimizer` (mandatory preprocessing, above), `media-optimizer` (WebP compression), `test-and-fix`, `technical-writer`. (`basic-client-report` is an empty placeholder folder — ignore/delete.)

## Key Reference Documents

For website content, copy, SEO, or business positioning, **always** consult:
- `dev-kit/SEO-Report.md`
- `dev-kit/TableTurnerr Business Overview.md`
- `dev-kit/Overall-Plan.md`

`dev-kit/Reports_snapshot.csv` and `dev-kit/Usage-Images/` contain source data and approved imagery.

## Environment Variables

See `.env.example`. Required for full functionality:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (absolute links in email templates)
- Multi-host SSO: `NEXT_PUBLIC_AUTH_HOST`, `NEXT_PUBLIC_APP_HOST`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_COOKIE_DOMAIN`, `NEXT_PUBLIC_ALLOWED_RETURN_ORIGINS`, `NEXT_PUBLIC_WIREFRAMES_URL`
- Ingest: `TURNSTILE_SECRET_KEY` (unset only in dev)
- Email: `RESEND_API_KEY`, `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME`
- Ops: `CRON_SECRET`, `TELEMETRY_INGEST_TOKEN`, `DISCORD_ALERT_WEBHOOK_URL`, `ALERT_EMAIL_TO`, `GHL_LEAD_WEBHOOK_URL`
