# Skill: Generate Client Report

## Trigger
- "generate a report for [Client]"
- "make a report for [Client]"
- "run the report for [Client]"
- "create SEO report for [Client]"
- `/generate-client-report`

---

## CRITICAL — Playwright Rule
**NEVER use MCP playwright browser tools** (browser_navigate, browser_snapshot, browser_screenshot, etc.) for this skill. The Playwright step is handled entirely by `scripts/grader_cli.py`. Claude's only role is to run that script and read its output.

---

## Step 0 — Gather inputs
Extract (or ask if missing):
- **Client name** (e.g., "Grumpy's Burgers")
- **Website URL** (e.g., `grumpys-burgers.com`)

We do **not** require the client to have a `<Client>-Website\` project folder. If one exists at `C:\Users\Hashaam\Desktop\MyCode\<Client>-Website\`, treat its `dev-kit/` and prior reports as **bonus context**. Otherwise generate purely from grader data + URL + (optional) light web research.

Derive slug: lowercase, spaces/apostrophes/special chars → hyphens, collapse doubles.
`"Grumpy's Burgers"` → `grumpys-burgers`

The canonical local archive for every client is:
```
C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr\reports-archive\<slug>\
```
Create it if it doesn't exist. Output two reports here.

**Create the archive directory in its own command** — do not chain it with the Python capture. If anything in a chained `&&` command fails, the whole chain reports exit code 1 even when the directory was successfully created, which makes failure mode opaque.

```bash
mkdir -p "C:/Users/Hashaam/Desktop/MyCode/ParentSite-Tableturnerr/reports-archive/<slug>"
```

---

## Step 1 — Capture grader report (run the Python CLI, watch for sentinel)

**Windows encoding (MANDATORY):** The script uses the `rich` library which prints emoji and Unicode box-drawing characters. The default Windows code page is cp1252 and will throw `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f4ca'` mid-banner, killing the script before it can capture anything. **Always prefix the Python command with `PYTHONIOENCODING=utf-8 PYTHONUTF8=1`**:

```bash
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture --company "<Client Name>" --url "<website-url>"
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`. Use a long Bash timeout (e.g. `timeout: 600000`) — the user must solve a CAPTCHA in Chrome, which can take a minute or two.

**How it works:** The script launches the user's **real Google Chrome** via remote debugging (port 9222) with an isolated `--user-data-dir`. It connects via CDP, pre-fills the URL, and **polls the page every 2s** until it auto-detects the report. It then auto-saves the HTML and extracts JSON — no Ctrl+S, no ENTER, no manual save. The user only solves the CAPTCHA and clicks Submit.

**Detect completion:** the script prints a sentinel line on its own row when finished:
```
READY:<slug>:<absolute-path-to-json>
```
Claude must scan the script's stdout for a line matching `^READY:` to confirm success and pick up the JSON path. If the script exits without that line, capture failed — continue with `graderData = null` and note it in the report.

The HTML snapshot is saved alongside as `.grader-cache/<slug>.html`.

---

## Step 2 — Read context (optional)
Check whether `C:\Users\Hashaam\Desktop\MyCode\<Client>-Website\` exists. If yes, read:
- `dev-kit/` folder contents (Business Overview, Overall-Plan, SEO Report)
- Any existing files in `reports/`
- Root README or markdown files

If the folder does not exist, skip silently. Generate the reports from grader data + URL alone, optionally augmenting with quick web research on the business (Google search, social profiles, review sites).

---

## Step 3 — Generate **two** markdown reports

Output both into `reports-archive\<slug>\`:

### 3a. Client report — `<slug>-client-report.md`
The polished, **client-facing** deliverable. Mirror:
- `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\Grumpys-Client-Report.md`
- `C:\Users\Hashaam\Desktop\MyCode\PureOnThePlaza-Website\reports\PureOnThePlaza-Client-Report.md`

**Required sections:**
1. YAML frontmatter (PDF metadata — same structure, update title/date/filename)
2. Watermark layer div
3. Branding banner
4. Executive Summary
5. Website Performance & Technical Analysis ← embed grader score here if available
6. Local SEO & Google Business Profile
7. Social Media & Online Presence
8. Online Reviews & Reputation
9. Competitive Analysis
10. Priority Action Plan (table: Priority / Action / Impact / Timeline)
11. Investment & Next Steps
12. Footer branding

**Tone:** Professional, direct, actionable, client-facing. **No** internal pricing strategy, no speculative numbers, no commentary the client shouldn't see.

### 3b. Internal report — `<slug>-internal-report.md`
The **full deep-dive for the TableTurnerr team**. Mirror the proven structure of:
- `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\Grumpys-Internal-Full-Report.md`

**Required sections:**
1. YAML frontmatter (mark `Classification: Internal Use Only` in the cover)
2. Executive Summary + Health Scorecard at a Glance + Top 5 Critical Findings
3. Business Overview (Company Profile, Service Channels, Unique Selling Points)
4. Technical SEO Audit (hosting, security headers, indexation, DNS)
5. On-Page SEO Analysis (titles, meta, headings, images, OG tags, internal linking)
6. Site Performance & Speed
7. UI/UX Evaluation
8. Content Strategy Assessment
9. Local SEO & Google Business Profile
10. Review & Reputation Analysis
11. Social Media & Online Presence
12. Competitive Landscape
13. Traffic & Visibility Estimates
14. Target Keywords & SEO Keyword Strategy
15. Overall Health Scorecard
16. Prioritized Action Items (with internal pricing/effort/lead-time guidance)
17. Sources & References

**Improvements over Grumpy's template:**
- Add a "Pitch Angle" subsection inside Section 2 — what hook to lead the sales call with
- Add an "Internal Action Plan" sub-table inside Section 16 with columns: Action / Effort / Internal Cost / Suggested Quote / Margin Estimate
- Add a "Risks & Caveats" section before Sources flagging anything we couldn't verify (Cloudflare blocks, missing data, etc.)

**Tone:** Internal-team voice. Be candid about pricing strategy, competitor weaknesses we can exploit, and any speculative numbers — clearly label estimates as estimates.

**Grader integration:** When `graderData` is available, embed the overall score + category breakdown in **both** reports. Internal report goes deeper (issues, recommendations from grader); client report keeps it summarized.

---

## Step 4 — Launch the Reports Archive Manager

There is **one permanent launcher** for all clients: `scripts/manage-reports.bat`. It opens a cmd window running `scripts/manage_reports.py`, which scans `reports-archive/` and lets the user pick any client, render either report as a temporary HTML preview, or push to Supabase. **Do not write per-client `.bat` files.** If you find legacy `share.bat` files in archive folders, delete them.

**Launch from Bash:**

```bash
cmd //c start "" "C:/Users/Hashaam/Desktop/MyCode/ParentSite-Tableturnerr/scripts/manage-reports.bat"
```

Notes:
- `cmd //c start "" "<bat>"` opens the manager in a new cmd window with its own stdin (the harness can't pipe stdin into the interactive Rich prompts, so `start` is mandatory).
- The empty `""` after `start` is the window-title placeholder — `start` needs it whenever the next argument is a quoted path, otherwise it treats the path as the title and never launches.
- The `.bat` sets `PYTHONIOENCODING=utf-8 PYTHONUTF8=1` before invoking Python, so rich's emoji/box-drawing glyphs render cleanly on cp1252 Windows. The window stays open after the manager exits via a trailing `pause >nul`.

**What the manager does:**

1. Lists every client in `reports-archive/` with checkmarks for which reports exist.
2. After picking a client, offers:
   - View client report as rendered HTML (temp file, deleted on exit)
   - View internal report as rendered HTML (temp file, deleted on exit)
   - Push both to Supabase as **draft + public**
   - Push both as **published + public**
   - Open the archive folder in Explorer
   - Back / Quit
3. The HTML renderer is built into `manage_reports.py` (no external markdown package needed). It strips the YAML frontmatter and Tableturnerr branding/watermark divs and renders the rest with a clean GitHub-style stylesheet.
4. Push uses `subprocess` to feed `"3"` into `grader_cli.py share` automatically, so the user doesn't see the legacy share menu — the manager is the single entry point.

Confirm the new cmd window opens, then stop and wait for the user.

The share menu lets the user view either MD locally, push both to Supabase, or push + view. The push uploads:
- `client_content_md/html` → powers the public `/report/<slug>` page (only visible when `status='published'` AND `visibility != 'private'`)
- `internal_content_md/html` → admin-only via `/admin/reports/<id>` (column-level RLS prevents anon access)

Reports default to `status=draft, visibility=public`. The team finalises status/visibility from `/admin/reports`.

---

## Step 5 — Return results

```
✅ Reports generated for <Client Name>

📁 Archive:        <repo>/reports-archive/<slug>/
   • <slug>-client-report.md
   • <slug>-internal-report.md
🔗 Admin:          http://localhost:3000/admin/reports
🌐 Client share:   https://tableturnerr.com/report/<slug>  (after publishing)

Status: DRAFT — review and publish in the admin panel.
The internal report is admin-only and will never appear on the public URL.
```

---

## Error handling
| Problem | Action |
|---------|--------|
| `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f4ca'` | Missing UTF-8 prefix — re-run with `PYTHONIOENCODING=utf-8 PYTHONUTF8=1` (mandatory on Windows for both `capture` and `share`) |
| `EOFError: EOF when reading a line` from share menu | Trying to run the interactive menu inside Bash. Re-launch via `start "Tableturnerr Share Menu" cmd /k "..."` so it gets its own terminal |
| Chained `mkdir && cd && python ...` returns exit code 1 | Don't chain. Run `mkdir -p ...` in a separate Bash call before the Python step so a Python failure doesn't mask directory creation success |
| Capture script doesn't print `READY:` line | Capture failed — continue with null grader data, note it in both reports |
| CAPTCHA in browser | User solves it in real Chrome; script auto-detects completion (no terminal interaction needed) |
| Chrome not found | Script will error — ask user to install Chrome or check PATH |
| CDP connection refused | Another Chrome is using port 9222 without debug — close all Chrome windows and re-run |
| Push script fails | Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| Client folder missing | Skip — generate from grader + URL only |
| Python deps missing | `pip install -r scripts/requirements.txt` |
