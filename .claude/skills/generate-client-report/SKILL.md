# Skill: Generate Client Report

## Trigger
Invoke this skill when the user says anything like:
- "generate a report for [Client]"
- "make a report for [Client]"
- "run the report for [Client]"
- `/generate-client-report`
- "create SEO report for [Client]"

---

## What This Skill Does

Automates the full client SEO report pipeline:
1. Scrapes grader.owner.com for the client's website score data (Playwright)
2. Reads any existing business context from the client's project folder
3. Generates a comprehensive markdown report (following the established TableTurnerr format)
4. Saves the report locally to the client's project folder
5. Pushes the report to the Supabase `client_reports` table
6. Returns a shareable `tableturnerr.com/report/<slug>` link

---

## Step-by-Step Execution

### Step 0 — Gather inputs
Extract from the user's message (or ask if missing):
- **Client name** (e.g., "Grumpy's Burgers")
- **Client website URL** (e.g., `grumpys-burgers.com`)
- **Client project folder path** (optional — default: `C:\Users\Hashaam\Desktop\MyCode\<ClientName>-Website\`)

Derive the slug: lowercase, replace spaces/apostrophes/special chars with hyphens, collapse multiple hyphens.
Example: "Grumpy's Burgers" → `grumpys-burgers`

### Step 1 — Fetch grader report (Playwright)
```bash
node scripts/fetch-grader-report.js <website-url> .grader-cache/<slug>.json
```

Working directory: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

Wait for it to complete. Read the output JSON at `.grader-cache/<slug>.json`.

If the script fails (connection error, timeout), note this and continue — mention in the report that grader data was unavailable and set `graderData = null`.

### Step 2 — Read existing business context
Check if the client project folder exists. Common path: `C:\Users\Hashaam\Desktop\MyCode\<ClientName>-Website\`

If it exists, read relevant files:
- `dev-kit/` folder (Overall-Plan.md, Business Overview, SEO Report if present)
- Any existing reports in `reports/` subfolder
- README or any markdown files in the root

Use this context to inform the report's business section, competitive landscape, and recommendations.

### Step 3 — Generate the markdown report

Follow the EXACT format used in existing reports. Reference these for structure:
- `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\Grumpys-Client-Report.md`
- `C:\Users\Hashaam\Desktop\MyCode\PureOnThePlaza-Website\reports\PureOnThePlaza-Client-Report.md`

**Required sections:**
1. YAML frontmatter (PDF metadata — keep identical structure, update title/date/filename)
2. Watermark layer div
3. Branding banner (TableTurnerr logo + link)
4. Executive Summary
5. Website Performance & Technical Analysis (incorporate grader score if available)
6. Local SEO & Google Business Profile
7. Social Media & Online Presence
8. Online Reviews & Reputation
9. Competitive Analysis
10. Priority Action Plan (table with Priority / Action / Impact / Timeline)
11. Investment & Next Steps
12. Footer branding

**Grader data integration:** When grader data is available, create a "Website Grade Report" subsection within the relevant analysis section showing:
- Overall score (out of 100)
- Category breakdown table (SEO, Mobile, Social, Local, Reviews — each with score and key issues)
- Powered by: owner.com grader

**Tone:** Professional, direct, actionable. Client-facing. No jargon. Positive framing with clear improvement opportunities.

### Step 4 — Save report locally

Determine the client folder path. Create it if it doesn't exist.

Ensure the `reports/` subfolder exists inside the client folder.

Save the report as: `<client-folder>/reports/<ClientNameNoSpaces>-Client-Report.md`

Also ensure `pdf-styles.css` and `tt-logo-nobg.svg` exist in that reports folder. If not, copy them from:
- `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\pdf-styles.css`
- `C:\Users\Hashaam\Desktop\MyCode\Grumpy's-Website\reports\tt-logo-nobg.svg`

### Step 5 — Push to Supabase

```bash
node scripts/push-report.js \
  --client="<Client Name>" \
  --slug="<slug>" \
  --url="<website-url>" \
  --report="<absolute-path-to-report.md>" \
  --grader=".grader-cache/<slug>.json" \
  --status=draft
```

Working directory: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`

Note: Reports are pushed as **draft** by default. The team reviews and publishes via the admin panel at `/admin/reports`.

### Step 6 — Return results to user

Output a clear summary:
```
✅ Report generated for <Client Name>

📁 Local file:  <path to saved .md file>
🔗 Admin panel: http://localhost:3000/admin/reports/<id>
🔗 Share link (after publishing): https://tableturnerr.com/report/<slug>

Status: DRAFT — go to the admin panel to review and publish.
```

---

## Error Handling

- **Grader script fails:** Note it in the report, continue with null grader data.
- **Push script fails:** Diagnose the error (usually missing env vars or Supabase connection). Report to user.
- **Client folder not found:** Create it at the default path, or ask user for the correct path.
- **Playwright not installed:** Run `pnpm exec playwright install chromium` from the project directory first.

---

## Notes

- Always work from `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr` as the working directory when running scripts.
- The `.grader-cache/` directory is gitignored — it's a local temp cache.
- The service role key is in `.env.local` — the push script reads it automatically.
- Reports are pushed as `draft` — team publishes them from the admin panel to get the shareable link.
