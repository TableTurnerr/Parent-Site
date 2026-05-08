# Skill: Generate Client Report

## Trigger
- "generate a report for [Client]"
- "make a report for [Client]"
- "run the report for [Client]"
- "create SEO report for [Client]"
- `/generate-client-report`

---

## CRITICAL RULES

1. **JSON ONLY — never generate `.md` files.** Both the client report and the internal report ship as `.json` files. The website renderer (`components/report/report-renderer.tsx`) consumes JSON via the `ClientReport` schema (`lib/report-schema.ts`). The `manage-reports` script previews JSON locally. Markdown is fully retired for new reports.

2. **NEVER use MCP playwright browser tools** (browser_navigate, browser_snapshot, browser_screenshot, etc.) for this skill. The Playwright step is handled entirely by `scripts/grader_cli.py`. Claude's only role is to run that script and read its output.

3. **The client JSON MUST mirror `reports-archive/pure-on-the-plaza/pure-on-the-plaza-client-report.json`.** Same headings, same section IDs, same section types, same order, same tone. Only the *content* changes per client. Read the Pure Pizza JSON before writing any new client report — it is the canonical template.

---

## Step 0 — Gather inputs
Extract (or ask if missing):
- **Client name** (e.g., "Grumpy's Burgers")
- **Website URL** (e.g., `grumpys-burgers.com`)
- **Report month** — the month this report covers, in `YYYY-MM` form. **Default to the current calendar month** in the user's timezone if not specified. Confirm with the user only if they mention a specific past month or "this is for last month."

We do **not** require the client to have a `<Client>-Website\` project folder. If one exists at `C:\Users\Hashaam\Desktop\MyCode\<Client>-Website\`, treat its `dev-kit/` and prior reports as **bonus context**. Otherwise generate purely from grader data + URL + (optional) light web research.

Derive slug: lowercase, spaces/apostrophes/special chars → hyphens, collapse doubles.
`"Grumpy's Burgers"` → `grumpys-burgers`

The canonical local archive for every (client, month) is:
```
C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr\reports-archive\<slug>\<YYYY-MM>\
```
Create it if it doesn't exist. Output two JSON files there.

**Create the archive directory in its own command** — do not chain it with the Python capture. If anything in a chained `&&` command fails, the whole chain reports exit code 1 even when the directory was successfully created, which makes failure mode opaque.

```bash
mkdir -p "C:/Users/Hashaam/Desktop/MyCode/ParentSite-Tableturnerr/reports-archive/<slug>/<YYYY-MM>"
```

---

## Step 1 — Capture grader report (run the Python CLI, watch for sentinel)

**Windows encoding (MANDATORY):** The script uses the `rich` library which prints emoji and Unicode box-drawing characters. The default Windows code page is cp1252 and will throw `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f4ca'` mid-banner, killing the script before it can capture anything. **Always prefix the Python command with `PYTHONIOENCODING=utf-8 PYTHONUTF8=1`**:

```bash
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture --company "<Client Name>" --url "<website-url>"
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`. Use a long Bash timeout (e.g. `timeout: 600000`) — the user must solve a CAPTCHA in Chrome, which can take a minute or two.

**How it works:** The script launches the user's **real Google Chrome** via remote debugging (port 9222) with an isolated `--user-data-dir`. It connects via CDP, pre-fills the URL, and **polls the page every 2s** until it auto-detects the report. It then auto-saves the HTML and extracts JSON — no Ctrl+S, no ENTER, no manual save.

**Detect completion:** the script prints a sentinel line on its own row when finished:
```
READY:<slug>:<absolute-path-to-json>
```
If the script exits without that line, capture failed — continue with `graderData = null` and note it in the internal report only (the client report should never reference upstream tools).

---

## Step 2 — Read context (optional)
Check whether `C:\Users\Hashaam\Desktop\MyCode\<Client>-Website\` exists. If yes, read its `dev-kit/`, prior reports, and root markdown. If not, skip silently and generate from grader data + URL alone, augmenting with quick web research (Google, social profiles, review sites).

---

## Step 3 — Generate **two** JSON artifacts

Output exactly two files into `reports-archive\<slug>\<YYYY-MM>\`:

- `<slug>-client-report.json` — **client-facing report** (mirrors Pure Pizza on the Plaza structure exactly)
- `<slug>-internal-report.json` — **internal team deep-dive** (same `ClientReport` schema, much more detail)

**Do not write any `.md` files.** The retired markdown flow is dead — the website renders JSON, and the local preview tooling renders JSON. Markdown adds work, drifts out of sync, and contributes nothing.

### 3a. Client report — `<slug>-client-report.json`

**This file MUST mirror `reports-archive/pure-on-the-plaza/pure-on-the-plaza-client-report.json`.**

Open Pure Pizza's JSON and copy its top-level shape, section order, section IDs, section types, and prose pattern verbatim. Replace only the *business-specific content*. Do not invent new sections, drop required ones, or rename IDs.

**Required top-level shape** (same as Pure Pizza):
```json
{
  "version": 1,
  "client": {
    "name": "<Client Name>",
    "slug": "<slug>",
    "url": "https://<client-website>",
    "preparedBy": "Tableturnerr",
    "preparedDate": "<Month D, YYYY>"
  },
  "hero": {
    "title": "<Client Name> — Website & Online Presence Report",
    "subtitle": "<one-line hook tailored to the client>",
    "narrative": [ "para 1", "para 2", "para 3" ],
    "overallGrade": "C-",
    "graderScore": 65,
    "monthlyRevenueLoss": 2361,
    "verdict": "<one-line summary, e.g. 'Beloved local brand, weak digital footprint.'>"
  },
  "ratings": [
    { "key": "reviews",     "label": "Reviews & Reputation",   "score": 78 },
    { "key": "gbp",         "label": "Google Business Profile","score": 58 },
    { "key": "social",      "label": "Social Media",           "score": 50 },
    { "key": "content",     "label": "Website Content",        "score": 28 },
    { "key": "search",      "label": "Google Search",          "score": 25 },
    { "key": "performance", "label": "Speed & Setup",          "score": 55 }
  ],
  "sections": [
    { "type": "competition", "id": "competition",  "title": "The Competition", ... },
    { "type": "problems",    "id": "problems",     "title": "What's Holding Your Website Back", ... },
    { "type": "keywords",    "id": "keywords",     "title": "The Search Terms That Should Be Bringing You Customers", ... },
    { "type": "actionPlan",  "id": "action-plan",  "title": "Priority Action Plan", ... },
    { "type": "cta",         "id": "next-steps",   "title": "Investment & Next Steps", ... }
  ]
}
```

**Required section order, IDs, and titles (LOCKED — do not change):**

| Order | `type` | `id` | `title` |
|-------|--------|------|---------|
| 1 | `competition` | `competition` | `The Competition` |
| 2 | `problems` | `problems` | `What's Holding Your Website Back` |
| 3 | `keywords` | `keywords` | `The Search Terms That Should Be Bringing You Customers` |
| 4 | `actionPlan` | `action-plan` | `Priority Action Plan` |
| 5 | `cta` | `next-steps` | `Investment & Next Steps` |

**Section content rules:**

- **`competition`** — competitor table (rank, name, style, rating, knownFor; mark the client with `"isYou": true`); `searchPosition` rows; `rivalCallouts` (2 rivals — closest neighborhood rival + biggest threat); `winLose` array; and the `opportunity` block with intro + rows + bottomLine. Match Pure Pizza's structure 1:1.
- **`problems`** — exactly **5** numbered problem cards. Each has `number`, `title`, `body[]` (1–2 paragraphs), and optional `bullets[]`. Tone: direct, specific, actionable. Identify problems that are real for this business — never copy-paste Pure Pizza's exact problems.
- **`keywords`** — **4** keyword groups in this order, with these exact `id`/`label` patterns:
  1. `money-keywords` — "The Money Keywords — People Ready to Order"
  2. `secret-weapons` — "Your Secret Weapons — Keywords Only You Can Own"
  3. `neighborhoods` — "Reaching Nearby [City] Neighborhoods" (or analogous geographic hub for non-restaurant clients)
  4. `catering` — "Catering — A Search Almost No One Is Going After" (or analogous high-margin offering: "Events," "Private Hire," "B2B," etc.)
  Each group needs `summary`, `highlight` (volume badge), `intro`, `table` (headers + rows), and `takeaway`. Plus the `totals` block at the end.
- **`actionPlan`** — exactly **4** items in this order. Do not add a 5th, do not drop one. Categories use the badges from Pure Pizza: `Research`, `Build`, `Polish`, `Ongoing`.
  1. `priority: 1`, `category: "Research"` — **Keyword Research**
  2. `priority: 2`, `category: "Build"` — **Site Content + Google Business Profile × Keywords**
  3. `priority: 3`, `category: "Polish"` — **Review + Small Design-Related Changes**
  4. `priority: 4`, `category: "Ongoing"` — **Monitor Performance**
  Adjust the wording inside each item to fit the client, but the four steps and their order are fixed.
- **`cta`** — title `Investment & Next Steps`, 3 paragraphs in `body[]`, omit `primary.href` and `secondary.href` (the renderer fills those with the TableTurnerr defaults).

**Schema reference:** `lib/report-schema.ts` (`ClientReport` v1). Inline formatting allowed in any string: `**bold**`, `*italic*`, `[label](url)`, `` `code` ``. Never emit raw HTML.

**Tone:** Professional, direct, actionable, client-facing. Never name upstream tools (no "owner.com," no "grader," no "API"). Numbers from external tools become *our* analysis. Internal pricing strategy and speculative growth math belong in the internal report only.

**Renderer defaults — omit from output to keep the JSON tight:**
- `client.preparedBy` (defaults to `"Tableturnerr"`)
- CTA `primary.href` / `secondary.href`
- TableTurnerr's phone, email, and address — those live in the site Footer.

### 3b. Internal report — `<slug>-internal-report.json`

Same `ClientReport` schema, but **a much deeper, longer report for the TableTurnerr team**. Use the schema's flexibility to fit the full deep-dive: more sections, more problem items, more keyword groups, more callouts, more competitor analysis.

**Recommended internal section sequence** (use `narrative`, `table`, `problems`, `competition`, `keywords`, `actionPlan`, and `successMetrics` types liberally — the schema supports all of them):

1. `narrative` `id: "executive-summary"` — Executive Summary, top 5 critical findings, health scorecard at a glance
2. `narrative` `id: "business-overview"` — Company Profile, Service Channels, USPs, **Pitch Angle** (the hook for the sales call)
3. `problems` `id: "technical-seo"` — Technical SEO findings (hosting, security headers, indexation, DNS) as numbered problems
4. `problems` `id: "on-page-seo"` — On-page issues (titles, meta, headings, images, OG tags, internal linking)
5. `table` `id: "performance"` — Site performance & speed metrics
6. `narrative` `id: "ux"` — UI/UX evaluation
7. `narrative` `id: "content-strategy"` — Content strategy assessment
8. `problems` `id: "local-seo-gbp"` — Local SEO + Google Business Profile issues
9. `reviews` `id: "reputation"` — Review platforms, loved/complaints, recommendation
10. `narrative` `id: "social"` — Social media + online presence
11. `competition` `id: "competition"` — Full competitive landscape (more competitors, longer winLose, larger opportunity table)
12. `table` `id: "traffic"` — Traffic & visibility estimates
13. `keywords` `id: "keywords"` — Larger keyword strategy (5+ groups acceptable internally)
14. `scorecard` `id: "health"` — Overall Health Scorecard (letter grades per area)
15. `actionPlan` `id: "internal-action-plan"` — Same 4 steps as the client plan, but each `action` rewritten with internal context: which agency tier handles it, effort estimate, internal cost, suggested quote, margin estimate. Use richer `impact` strings.
16. `narrative` `id: "risks-and-caveats"` — Anything we couldn't verify (Cloudflare blocks, missing data, capture failures)
17. `narrative` `id: "sources"` — Sources & references

**Tone:** Internal-team voice. Pricing strategy, margin math, speculative numbers, and pitch hooks all belong here. Reference `grader_cli.py`, `.grader-cache/`, and upstream tools freely — this report never reaches the client.

**Grader data integration:** When grader data is available, embed the overall score + category breakdown in the **internal** report's hero/scorecard. The **client** report's hero numbers should be presented as TableTurnerr's analysis with no provenance.

---

## Step 4 — Launch the Reports Archive Manager

There is **one permanent launcher** for all clients: `scripts/manage-reports.bat`. It opens a cmd window running `scripts/manage_reports.py`, which scans `reports-archive/` and lets the user pick any client, preview either JSON report locally, or push to Supabase. **Do not write per-client `.bat` files.** If you find legacy `share.bat` files in archive folders, delete them.

**Launch from Bash:**

```bash
cmd //c start "" "C:/Users/Hashaam/Desktop/MyCode/ParentSite-Tableturnerr/scripts/manage-reports.bat"
```

Notes:
- `cmd //c start "" "<bat>"` opens the manager in a new cmd window with its own stdin (the harness can't pipe stdin into the interactive Rich prompts, so `start` is mandatory).
- The empty `""` after `start` is the window-title placeholder.
- The `.bat` sets `PYTHONIOENCODING=utf-8 PYTHONUTF8=1` before invoking Python. The window stays open after the manager exits via a trailing `pause >nul`.

**What the manager does:**

1. Lists every client in `reports-archive/` with checkmarks for which JSON variants exist.
2. After picking a client, offers:
   - Preview the client JSON via the local dev server (`http://localhost:3000/report/<slug>`)
   - Preview the internal JSON via the local dev server (`http://localhost:3000/admin/reports/<id>`)
   - Push both JSONs to Supabase as **draft + public**
   - Push both as **published + public**
   - Open the archive folder in Explorer
   - Back / Quit
3. Push uses `scripts/push-report.js` with `--month`, `--client-report-json`, and `--internal-report-json` flags. Always pass `--month=<YYYY-MM>` matching the archive subdirectory; without it the script defaults to the current month.

Confirm the new cmd window opens, then stop and wait for the user.

---

## Step 5 — Return results

```
✅ Reports generated for <Client Name>

📁 Archive:        <repo>/reports-archive/<slug>/
   • <slug>-client-report.json   (powers /report/<slug>)
   • <slug>-internal-report.json (admin-only deep-dive)
🔗 Admin:          http://localhost:3000/admin/reports
🌐 Client share:   https://tableturnerr.com/report/<slug>  (after publishing)

Status: DRAFT — review and publish in the admin panel.
The internal report is admin-only and will never appear on the public URL.
```

---

## Error handling
| Problem | Action |
|---------|--------|
| `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f4ca'` | Missing UTF-8 prefix — re-run with `PYTHONIOENCODING=utf-8 PYTHONUTF8=1` |
| `EOFError: EOF when reading a line` from share menu | Trying to run the interactive menu inside Bash. Re-launch via `cmd //c start "" "scripts/manage-reports.bat"` so it gets its own terminal |
| Chained `mkdir && cd && python ...` returns exit code 1 | Don't chain. Run `mkdir -p ...` separately |
| Capture script doesn't print `READY:` line | Capture failed — continue with `graderData = null`. Note it in the internal report only. The client report still ships with TableTurnerr's analysis numbers. |
| CAPTCHA in browser | User solves it in real Chrome; script auto-detects completion |
| Chrome not found | Ask user to install Chrome or check PATH |
| CDP connection refused | Close all Chrome windows and re-run |
| Push script fails | Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| Migration `internal_content_json` column missing | Apply `scripts/migrations/add-internal-content-json.sql` once before the first push |
| Tempted to write a `.md` file | Stop. JSON only. Re-read the rules at the top of this skill. |

---

## Anti-patterns
- ❌ Do **not** generate `<slug>-client-report.md` or `<slug>-internal-report.md`. Markdown is retired.
- ❌ Do not invent new client-report sections, rename IDs, or change the section order. Match Pure Pizza exactly.
- ❌ Do not put more or fewer than 4 items in the client `actionPlan`.
- ❌ Do not name upstream tools ("owner.com", "grader", etc.) in the client JSON.
- ❌ Do not run `scripts/grader_cli.py share` directly — use `scripts/push-report.js` (the manager calls it for you).
