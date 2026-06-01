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

Two manual steps per location:

1. In the Chrome tab that the script opens, the search field is pre-filled with the **restaurant's name**. A Google Places autocomplete dropdown appears — **click the location you want graded**. (For single-location brands there's typically just one entry.) Then solve any CAPTCHA and submit. The script auto-detects completion — no Ctrl+S, no Enter.
2. For multi-location brands the script runs once per location. Each run opens its own tab and finishes by closing only that tab — Chrome itself stays open between runs so you don't sit through repeated launches.

Claude prints a summary and stops once the JSON files are written. **Preview and publishing are not auto-launched** — when you're ready, run `scripts/manage-reports.bat` yourself (or call `scripts/push-report.js` directly).

## Multi-location brands

If the client operates from more than one location, the skill generates **one report per graded location**. Each location gets its own slug (`<base>-<location>`), its own archive folder, and its own `/report/<slug>` URL — because each location has its own Google Business Profile, review pool, and local pack.

Default cap: **3 locations per session.** Claude discovers the brand's locations from its website + public data (no manual enumeration needed), picks the 3 most main ones (flagship → marketing prominence → review volume → geographic spread), and confirms with you in one message before capturing. The rest are documented in `client.location.skippedLocations`.

Per-location grading uses `--query "<Brand> <Area>"` (e.g. `"Grumpy's Burgers Downtown"`) so Google Places autocomplete surfaces the right location as the top result.

Each per-location report is **fully independent** — its hero rating and section content reflect only that location's grader run. No averaging, no shared brand-wide score. Full rules live in Step 0.5 of `SKILL.md`.

## Data model: companies → locations → reports

Supabase mirrors this hierarchy:

| Table            | Granularity                          | Slug example                         |
|------------------|--------------------------------------|--------------------------------------|
| `clients`        | one row per **company** (brand)      | `taco-delphia`                       |
| `locations`      | one row per **location** under a co. | `taco-delphia` → `south-broad`       |
| `client_reports` | one row per **(company, location, month)** triple | `taco-delphia-south-broad` (`2026-05`) |

- The unique constraint on `client_reports` is `(client_id, location_id, report_month)`.
- Two reports for the same brand always share **one** `clients` row and live under **two** `locations` rows.
- Single-location brands get a default `Main` location auto-created on first push.
- Every report JSON carries a self-identifying `meta` block (`reportId`, `companyId`, `companyName`, `companySlug`, `locationId`, `locationName`, `locationSlug`, `reportMonth`) plus inline `client.id` / `client.company` / `client.location.id` fields. `push-report.js` writes these IDs back into the local JSON file after the first successful push.

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
# Capture only — pass "<Brand> <Area>" via --query so Google Places autocomplete
# narrows to the right location. The user clicks the top result and solves the CAPTCHA.
python scripts/grader_cli.py capture \
  --company "Grumpy's Burgers — Downtown" \
  --url "grumpys-burgers.com" \
  --query "Grumpy's Burgers Downtown"

# Push two JSON reports. --client is the brand-level company name; the location
# is picked up from the JSON's client.location block (or pass --location-name
# / --location-slug explicitly). push-report.js auto-creates the company and
# location rows as needed and writes meta.{reportId,companyId,locationId} back
# into the local JSON files after a successful push.
node scripts/push-report.js \
  --client="Grumpy's Burgers" \
  --slug=grumpys-burgers-downtown \
  --url="grumpys-burgers.com" \
  --location-name="Downtown" --location-slug="downtown" \
  --client-report-json="reports-archive/grumpys-burgers-downtown/2026-05/grumpys-burgers-downtown-client-report.json" \
  --internal-report-json="reports-archive/grumpys-burgers-downtown/2026-05/grumpys-burgers-downtown-internal-report.json" \
  --status=draft --visibility=public

# Fetch an existing report into reports-archive/<slug>/<YYYY-MM>/ for editing.
# Accepts either a per-report slug (taco-delphia-south-broad) or a company slug.
node scripts/fetch-report.js --slug=grumpys-burgers-downtown --month=2026-05
```

## Editing the skill

The behavior Claude follows is in `SKILL.md` (this folder). Edit that file to change the report sections, error handling, sentinel format, etc. Changes apply immediately to the next skill invocation — no restart needed.
