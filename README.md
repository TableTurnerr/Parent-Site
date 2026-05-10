This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Client Report Skills

Two related skills cover the lifecycle of a client report:

- **`/generate-client-report`** — scrape grader.owner.com, generate **two** markdown reports (client-facing + internal), push both to Supabase.
- **`/edit-client-report <slug>`** — fetch an existing report, apply targeted edits, push back. Triggered explicitly only.

The skill definitions live at `.claude/skills/generate-client-report/SKILL.md` and `.claude/skills/edit-client-report/SKILL.md` — Claude Code reads them automatically when you trigger the skill.

### One-time setup

```bash
pnpm install
pip install -r scripts/requirements.txt
```

Apply the database migrations against your Supabase project:

```
scripts/migrations/create-client-reports-table.sql        # base table (legacy installs)
scripts/migrations/add-internal-and-client-reports.sql    # adds internal/client split + visibility
```

> Python deps are pinned in [`scripts/requirements.txt`](scripts/requirements.txt) (`rich`, `playwright`). Only the Playwright Python *package* is needed for CDP — you don't need to run `playwright install` since the script drives your real Chrome, not a bundled browser.

Make sure `.env.local` contains:

```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Google Chrome must be installed (the capture script drives the user's real Chrome to dodge bot detection — Playwright's bundled Chromium is **not** used).

### Generate flow (`/generate-client-report`)

Trigger with any of:

- `generate a report for <Client Name>`
- `make a report for <Client Name>`
- `/generate-client-report`

What happens:

1. **Capture** — `python scripts/grader_cli.py capture --company "<Client>" --url "<site>" --query "<Brand Name>"` opens Chrome to grader.owner.com, types the brand name, you pick the location from the Google Places autocomplete, solve any CAPTCHA, submit. The script polls only its own tab and auto-saves `.grader-cache/<slug>.{html,json}`. Chrome stays open between consecutive captures.
2. **Optional context** — if `C:\Users\Hashaam\Desktop\MyCode\<Client>-Website\` exists, Claude reads the dev-kit / prior reports for extra context. Otherwise it generates from grader data + URL alone.
3. **Generate two reports** in `reports-archive/<slug>/`:
   - `<slug>-client-report.md` — polished, client-facing
   - `<slug>-internal-report.md` — full deep-dive for the TableTurnerr team (mirrors the Grumpy's internal template, with added Pitch Angle, Internal Action Plan with pricing/margin, and Risks & Caveats sections)
4. **Share menu** — `python scripts/grader_cli.py share --slug ... --client-report ... --internal-report ... [--status draft] [--visibility public]` lets you view either MD locally or push both to Supabase.

### Edit flow (`/edit-client-report`)

Trigger explicitly:

- `/edit-client-report <slug>`
- "edit the client report for <Client>"
- Pasted from the admin panel's **Talk to AI** copy button

Claude runs `python scripts/grader_cli.py fetch --slug <slug>` to pull both MDs back into `reports-archive/<slug>/`, applies your instruction in place, then re-pushes via `share`. Status and visibility are preserved unless you explicitly ask to change them.

### Admin panel

`/admin/reports` lists every report. Click a row for the detail view:

- **Client / Internal tabs** — toggle between the two variants.
- **Edit markdown** — split-pane MD editor; saving re-renders the HTML server-side via `marked`.
- **Status** — `draft` / `published` / `archived` (mirrors blog).
- **Visibility** — `public` / `unlisted` / `private` (controls **client** report only; internal is always team-only via column-level RLS).
- **Talk to AI** — describe a change, copy the generated `/edit-client-report <slug>` command, paste into Claude Code; the skill fetches → edits → pushes; refresh to see the result.

### Scripts reference

| Script | Purpose |
|---|---|
| `scripts/grader_cli.py capture` | Interactive grader.owner.com scraper. Prints `READY:<slug>:<json-path>` sentinel on success. |
| `scripts/grader_cli.py share`   | Post-report menu: view client / view internal / push both / push + view client. |
| `scripts/grader_cli.py fetch`   | Pull existing report from Supabase into `reports-archive/<slug>/`. Prints `FETCHED:<slug>:<archive-dir>`. |
| `scripts/push-report.js`        | Lower-level Supabase upsert (called by `share`). Accepts `--client-report` and/or `--internal-report`. |
| `scripts/fetch-report.js`       | Lower-level Supabase pull (called by `fetch`). |

### Common errors

| Problem | Fix |
|---|---|
| `Could not connect to Chrome on port 9222` | Close ALL Chrome windows (incl. system tray) and retry. |
| `Could not find Google Chrome` | Install Chrome or add `chrome.exe` to `PATH`. |
| Capture script exits without `READY:` line | Capture failed — Claude continues with `graderData = null` and notes it in both reports. |
| `Missing dependency: rich` / `playwright` | `pip install -r scripts/requirements.txt`. |
| `Missing NEXT_PUBLIC_SUPABASE_URL` on push | Add Supabase env vars to `.env.local`. |
| `Report not found for slug` on edit | Slug doesn't exist — use `/generate-client-report` for new clients. |
