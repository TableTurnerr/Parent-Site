# Skill — `generate-client-report`

Quick-reference for humans. The full instructions Claude follows are in `SKILL.md` in this same folder.

## What it does

Single command (or natural-language trigger) that runs the full client-report pipeline:

1. **Captures** the [grader.owner.com](https://grader.owner.com) report for the client's website (real Chrome via CDP, auto-detects when the report is ready, no manual save).
2. **(Optionally) reads** the client's `<Client>-Website\` project folder for bonus business context if it exists. If it doesn't, generates from grader data + URL alone — no project folder required.
3. **Generates two JSON reports** in `reports-archive/<slug>/`:
   - `<slug>-client-report.json` — client-facing report. **Mirrors the Pure Pizza on the Plaza structure exactly** — same section IDs, same order, same 4-step action plan. Only the business-specific content changes per client.
   - `<slug>-internal-report.json` — full deep-dive for the TableTurnerr team using the same `ClientReport` schema, just much more detailed.
4. **Pushes both** to Supabase. The client variant powers the public `/report/<slug>` page (when `status=published` and `visibility != private`); the internal variant is admin-only via column-level RLS.

**JSON only — no markdown.** The skill no longer writes `.md` files. Both reports are JSON; the website renders JSON; the local preview opens the live `/report/<slug>` route in the browser.

## How to trigger

From any Claude Code session in this repo:

- `generate a report for <Client Name>`
- `make a report for <Client Name>`
- `run the report for <Client Name>`
- `create SEO report for <Client Name>`
- `/generate-client-report`

Claude will ask for any missing info (just the website URL).

## What you'll do as the user

Just **two manual steps** during the whole flow:

1. In the Chrome window that opens, solve any CAPTCHA and click "Grade my website". The capture script auto-detects completion — no Ctrl+S, no Enter.
2. After Claude generates both JSON reports, pick an option from the manager menu (preview client / preview internal / push both / push as published / exit).

Everything else happens automatically.

## Editing an existing report later

Use the separate skill `/edit-client-report <slug>` (defined in `.claude/skills/edit-client-report/`). The admin panel's "Talk to AI" panel generates the exact command to paste into Claude Code.

## Output locations

| Artifact | Path |
|---|---|
| Grader HTML snapshot | `.grader-cache/<slug>.html` |
| Grader JSON | `.grader-cache/<slug>.json` |
| Client JSON | `reports-archive/<slug>/<slug>-client-report.json` |
| Internal JSON | `reports-archive/<slug>/<slug>-internal-report.json` |
| Public client URL | `https://tableturnerr.com/report/<slug>` (after team publishes from `/admin/reports`) |
| Admin (both variants + edit + Talk-to-AI) | `https://tableturnerr.com/admin/reports/<id>` |

## Visibility model (client report)

| Visibility | Behavior |
|---|---|
| `public`   | Live at `/report/<slug>` once `status=published`. |
| `unlisted` | Live at the same URL but with `noindex,nofollow,nocache` and not surfaced internally. |
| `private`  | Hidden from the public URL entirely — only viewable via `/admin`. |

The **internal** report is always team-only regardless of these settings (column-level RLS on `internal_content_*`).

## Requirements

- Node.js + `pnpm install`.
- Python 3.10+ with `pip install -r scripts/requirements.txt`.
- Google Chrome.
- `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- Migrations applied:
  - `scripts/migrations/add-internal-and-client-reports.sql`
  - `scripts/migrations/add-client-content-json.sql`
  - `scripts/migrations/add-internal-content-json.sql`  ← required for the JSON-only flow
- The dev server (`pnpm dev`) running on `:3000` whenever you want the manager's "Preview" options to render the JSON in the live UI.

## Running the scripts directly (without the skill)

```bash
# Capture only
python scripts/grader_cli.py capture --company "Grumpy's Burgers" --url "grumpys-burgers.com"

# Push two JSON reports
node scripts/push-report.js \
  --client="Grumpy's Burgers" \
  --slug=grumpys-burgers \
  --url="grumpys-burgers.com" \
  --client-report-json="reports-archive/grumpys-burgers/grumpys-burgers-client-report.json" \
  --internal-report-json="reports-archive/grumpys-burgers/grumpys-burgers-internal-report.json" \
  --status=draft --visibility=public

# Fetch an existing report into reports-archive/<slug>/ for editing
node scripts/fetch-report.js --slug=grumpys-burgers
```

## Editing the skill

The behavior Claude follows is in `SKILL.md` (this folder). Edit that file to change the report sections, error handling, sentinel format, etc. Changes apply immediately to the next skill invocation — no restart needed.
