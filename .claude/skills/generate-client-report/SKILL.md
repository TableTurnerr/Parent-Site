# Skill: Generate Client Report

## Trigger
- "generate a report for [Client]"
- "make a report for [Client]"
- "run the report for [Client]"
- "create SEO report for [Client]"
- `/generate-client-report`

---

## CRITICAL — Playwright Rule
**NEVER use MCP playwright browser tools** (browser_navigate, browser_snapshot, browser_screenshot, etc.) for this skill. The Playwright step is handled entirely by the Node.js script below. Claude's only role is to run the script and read its JSON output.

---

## Step 0 — Gather inputs
Extract (or ask if missing):
- **Client name** (e.g., "Grumpy's Burgers")
- **Website URL** (e.g., `grumpys-burgers.com`)
- **Project folder** (default: `C:\Users\Hashaam\Desktop\MyCode\<ClientName>-Website\`)

Derive slug: lowercase, spaces/apostrophes/special chars → hyphens, collapse doubles.  
`"Grumpy's Burgers"` → `grumpys-burgers`

---

## Step 1 — Fetch grader report (run the script, nothing else)

```bash
node scripts/fetch-grader-report.js <website-url> .grader-cache/<slug>.json
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

The script opens a **visible browser window**. If a CAPTCHA appears, it will print a message to the terminal — the user solves it in the browser and the script auto-continues. Wait for the script to exit (it prints `✅` on success or `❌` on failure).

After it exits, read `.grader-cache/<slug>.json`. If the file contains an `"error"` key or `overallScore` is null, set `graderData = null` and note grader data was unavailable.

---

## Step 2 — Read client context
Check if the client project folder exists. If it does, read:
- `dev-kit/` folder contents (Business Overview, Overall-Plan, SEO Report)
- Any existing files in `reports/`
- Root README or markdown files

Use this context for the business section, competitive landscape, and recommendations.

---

## Step 3 — Generate the markdown report

Mirror the structure from existing reports:
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

**Grader integration:** When `graderData` is available, add a "Website Grade Report" subsection in section 5 showing overall score, category breakdown table (each with score + key issues), attributed to owner.com grader.

**Tone:** Professional, direct, actionable, client-facing.

---

## Step 4 — Save locally

Save to: `<client-folder>/reports/<ClientNameNoSpaces>-Client-Report.md`

Create the folder if it doesn't exist. Also ensure `pdf-styles.css` and `tt-logo-nobg.svg` exist in that reports folder — copy from `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\` if missing.

---

## Step 5 — Push to Supabase

```bash
node scripts/push-report.js \
  --client="<Client Name>" \
  --slug="<slug>" \
  --url="<website-url>" \
  --report="<absolute-path-to-.md>" \
  --grader=".grader-cache/<slug>.json" \
  --status=draft
```

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

Reports are pushed as **draft** — team publishes via `/admin/reports`.

---

## Step 6 — Return results

```
✅ Report generated for <Client Name>

📁 Local:   <path to .md>
🔗 Admin:   http://localhost:3000/admin/reports
🌐 Share (after publishing): https://tableturnerr.com/report/<slug>

Status: DRAFT — review and publish in the admin panel.
```

---

## Error handling
| Problem | Action |
|---------|--------|
| Grader script fails | Continue with null grader data, note it in report |
| CAPTCHA in browser | User solves it; script auto-continues — just wait |
| Push script fails | Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| Client folder missing | Create it at the default path, or ask user |
| Playwright not installed | Run `pnpm exec playwright install chromium` first |
