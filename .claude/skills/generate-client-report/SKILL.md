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

3. **The client JSON MUST mirror the bundled sample report.** Same headings, same section IDs, same section types, same order, same tone — only the *content* changes per client. The canonical template is `sample-client-report.json` in this skill's folder. **Read it in full before writing any new report.** Do not look at previously-generated reports in `reports-archive/` for structural reference — the sample in this skill is authoritative and self-contained. Section IDs, types, and order are still locked (see the table in Step 3a); the sample also shows you the current prose patterns, callout phrasing, and section structure.

4. **Data model: companies → locations → reports.** Supabase has three tables:
   - `clients` — one row per **company** (e.g. "Taco Delphia"). Slug is brand-level (`taco-delphia`).
   - `locations` — one row per **location under a company** ("South Broad", "22nd & Walnut"). Each company has 1+ locations.
   - `client_reports` — one row per `(company, location, month)` triple. The unique constraint is `(client_id, location_id, report_month)`.

   Multi-location brands therefore push **one report per location**, all sharing the same company row. Single-location brands get a default location named "Main". Never create a separate company row for two locations of the same brand — `push-report.js` resolves company by slug and creates locations on demand.

5. **Every JSON includes a `meta` block + `client.company` + `client.location.id`.** These are populated by `push-report.js` after the first push and written back to the local file. On *first* generation Claude leaves the IDs empty (or omits them); they appear automatically on the next push/fetch cycle. The JSON shape:
   ```json
   {
     "version": 1,
     "meta": {
       "reportId":     "<uuid, post-push>",
       "companyId":    "<uuid, post-push>",
       "companyName":  "Taco Delphia",
       "companySlug":  "taco-delphia",
       "locationId":   "<uuid, post-push>",
       "locationName": "South Broad",
       "locationSlug": "south-broad",
       "reportMonth":  "2026-05"
     },
     "client": {
       "id":   "<uuid, post-push>",
       "name": "Taco Delphia — South Broad",
       "slug": "taco-delphia-south-broad",
       "url":  "https://tacodelphia.online",
       "company":  { "id": "...", "name": "Taco Delphia", "slug": "taco-delphia" },
       "location": { "id": "...", "name": "South Broad", "slug": "south-broad", "address": "..." }
     },
     ...
   }
   ```

6. **Non-restaurant clients skip the grader.** The grader (`grader.owner.com`) is restaurant-specific. For any business that is **not** a restaurant or food-service venue (med spas, salons, clinics, dentists, gyms, law firms, home services, retail, etc.), **do not run Step 1 at all** — there is nothing to capture. Score the six `ratings`, `graderScore`, `overallGrade`, and `monthlyRevenueLoss` manually from web research, and follow the **"Non-restaurant clients" section below** for the language analogs and the manual-scoring rubric. The two live precedents are `reports-archive/refresh-medspa/` (NJ med spa) and `reports-archive/the-gem-med-spa/` (TX med spa) — mirror them for non-restaurant tone, alongside the bundled sample for structure.

---

## Non-restaurant clients (med spas, salons, clinics, service businesses)

The grader only scores restaurants. When the client is **not** a restaurant, the structure of both reports stays identical — same locked sections, IDs, order, group nesting, progression bar — but you **skip the grader entirely** and adapt the restaurant-specific wording. Read this section once before generating for any non-restaurant client.

### Is it a non-restaurant?
If the business sells food/drink for on- or off-premise consumption (restaurant, café, bakery, bar, food truck, ghost kitchen), use the normal restaurant flow with the grader. Everything else — med spa, salon, barbershop, dental/medical/vet practice, gym/studio, law/accounting firm, home services (HVAC, plumbing, roofing), auto, retail boutique — is a **non-restaurant**: skip Step 1 and score manually.

### What changes
1. **Skip Step 1 (grader capture) completely.** Do not launch `grader_cli.py`, do not open Chrome, do not pass `graderData`. There is no `<slug>-grader.json` for these clients.
2. **Replace the grader with web research.** WebFetch the homepage, About/team page, and the top service pages; WebSearch the brand name for reviews/rating, Google Business Profile status, and 4–6 local competitors. This research is your only data source — gather it before writing.
3. **Score the six `ratings`, `graderScore`, `overallGrade`, and `monthlyRevenueLoss` by hand** using the rubric below. In the **client** report these appear as TableTurnerr's own analysis with no provenance (same as always). In the **internal** report, the `risks-and-caveats` section MUST state that no grader was run and that all scores are directional, not tool output.
4. **Adapt the restaurant-specific labels** per the language map below. Section IDs and order never change — only human-facing wording.

### Language map (restaurant → service business)
| Locked element | Restaurant wording | Service-business wording |
|---|---|---|
| `website-keywords` title | "…Bringing You Customers" | "…Bringing You **Patients**" (medical/med spa/dental) or "…Bringing You **Clients**" (salon/legal/fitness) |
| `money-keywords` label | "People Ready to **Order**" | "People Ready to **Book**" (services) or "…to **Buy**" (retail) |
| `gbp` group intro | "more than your restaurant" | "more than your **clinic / salon / practice / shop**" |
| `neighborhoods` label | "Reaching Nearby [City] Neighborhoods" | "Reaching Nearby **[County / Region] Communities**" (use the real local hub) |
| `catering` group (id stays `catering`) | "Catering — A Search Almost No One Is Going After" | the client's **highest-LTV, most-repeatable offering**: Medical Weight Loss / Semaglutide, Bridal & Events, Memberships, Packages, Corporate/B2B, Maintenance Plans |
| `ad-spend` column 4 header | "Est. Calls / Direct Orders" | "Est. **Consultations**" or "Est. **Bookings**" |
| `ad-spend` average ticket | $25–45 food ticket | service AOV: med spa ~$200–300, salon ~$80–150, dental new-patient ~$300+, home services ~$250–500 |
| `ad-spend` ROAS caveat | "direct orders avoid the 20–30% delivery-app commission" | drop the delivery line; use "direct bookings avoid third-party marketplace/booking fees" or simply omit it |
| hero `monthlyRevenueLoss` | restaurant-sized | size to the service market (a small-town clinic ≪ a metro restaurant) |

Keep the 4th keyword group's `id` as `catering` (the ID is locked) even when the label is "Medical Weight Loss" or "Bridal & Events" — only the `label` changes.

### Manual scoring rubric (no grader)
Estimate each `ratings[]` score 0–100 from research signals, then set `graderScore` near the weighted feel of the six (it need not be the exact average), pick `overallGrade` from it, and size `monthlyRevenueLoss` to the local market. Anchor points:
- **Reviews & Reputation** — driven by Google review **count + recency + average**. A 5.0 with 80+ reviews → 75–85. A brand-new profile with <10 reviews → 25–35 regardless of how good those few are.
- **Google Business Profile** — completeness (categories, photos, Posts) + map-pack position. Not in top 3 for primary terms → 30–45.
- **Social Media** — presence + activity + following across IG/FB/TikTok. Active but small → 35–45.
- **Website Content** — depth, individual service pages, blog, local keywords, schema. Thin/templated → 25–40.
- **Google Search** — non-branded organic visibility. Ranks for nothing but the brand name → 15–25.
- **Speed & Setup** — SSL, mobile, modern template, booking integration. Modern template, not PageSpeed-measured → 55–65 (note "unverified" in the internal report).
- **`overallGrade`** — map the felt average: ~25–40 → "D"/"D+"; ~41–55 → "C-"/"C"; ~56–70 → "C+"/"B-". (Valid grades only — there is no "F+"; the floor is "F".)
- **`monthlyRevenueLoss`** — conservative monthly $ left on the table from search invisibility, scaled to local ticket × plausible missed bookings. Small-town clinic ≈ $2,000–3,500; metro practice higher.

### Everything else is unchanged
Locations (Step 0.5) — most service businesses are single-location, so omit `client.location` and let `push-report.js` create the default `Main` location; the same multi-location rules apply to chains (salon/clinic groups). The bundled sample is still the structural source of truth (Step 0a). The Step 3a/3b shapes, the locked section table, the progression bar, and the "stop after writing JSON" rule (Steps 4–5) all apply exactly as written.

---

## Step 0 — Gather inputs
Extract (or ask if missing):
- **Client name** (e.g., "Grumpy's Burgers")
- **Website URL** (e.g., `grumpys-burgers.com`)
- **Report month** — the month this report covers, in `YYYY-MM` form. **Default to the current calendar month** in the user's timezone if not specified. Confirm with the user only if they mention a specific past month or "this is for last month."
- **Locations** — discover them yourself from the brand's website and public data; do not ask the user up front. Step 0.5 walks through the discovery + selection of the 3 main locations.

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

## Step 0.5 — Discover locations, then pick the 3 main ones

Many restaurant brands operate from multiple locations. Each location has its **own** Google Business Profile, **own** review pool, **own** local-pack ranking, and often its **own** landing page. A single grader run cannot represent them all — the grader scores one URL/place at a time.

**You are responsible for discovering the brand's locations — do not ask the user up front.** The user just gave you a name (and maybe a URL); use the website + public data to build the list yourself, then confirm the chosen 3 with them in one short message before capturing.

### Step 0.5a — Discover the locations

Investigate in this order, stopping as soon as you have a confident list:

1. **WebFetch the homepage** of the client URL. Restaurants almost always link a `Locations`, `Find Us`, `Visit`, or `Stores` page from the nav or footer.
2. **WebFetch the locations page** (`/locations`, `/find-us`, `/stores`, etc.). Extract every location's `name`, `area / neighborhood`, full `address`, and per-location landing URL if one exists.
3. **Fallback — WebSearch** for `"<Brand Name> locations"` or `"<Brand Name> all stores"` and inspect the top results (brand site, Yelp, TripAdvisor, news articles).
4. **Fallback — Grader autocomplete** as a confirmation source only. Type the brand name into grader.owner.com once (just to inspect the Google Places autocomplete dropdown — don't capture). Use it to cross-check the list you built from the website.

Build a small internal table of every location you find with at minimum: `{name, area, address, signals}`. `signals` = anything that hints at prominence (homepage hero, "flagship" / "original" labels, founding location, visible review count, market size, etc.).

### Step 0.5b — Decide which locations to grade

The grader cap is **3 locations max per session**. Each grader capture is a manual CAPTCHA + an authoring pass — running 8+ locations in one session is unrealistic and dilutes report quality.

| Locations discovered | What to do |
|---|---|
| **1** | Standard flow. Skip the rest of this section. |
| **2 or 3** | Run the grader for **every** location. |
| **More than 3** | Pick the **3 most main** locations and skip the rest. |

**Picking the 3 most main when there are more than 3:**

Use the signals you collected. In rough priority order:

1. **Flagship / original** — the location the brand markets as their first, "original," or "flagship" store. Often called out by name on the homepage or About page.
2. **Marketing prominence** — locations featured in the hero image, called out first on the locations page, or that own the bare-domain brand handle on social.
3. **Review volume** — when visible, the location with the highest Google review count is usually the highest-revenue store.
4. **Geographic diversity** — if signals 1–3 leave you with two candidates in the same neighborhood, prefer spreading across markets so the report reveals brand-wide patterns rather than one zip code.

Then **post a short confirmation** to the user before capturing — one message, fully formed, e.g.:

> Found 7 locations for Grumpy's Burgers from grumpys.com/locations. Planning to grade these 3 most main ones — let me know if you'd swap any:
> 1. **Downtown** (123 Main St) — flagship, biggest on Google
> 2. **Westside** (456 Oak Ave) — second-busiest, anchors the west market
> 3. **Northpark** (789 Pine Rd) — newest market, geographic spread
>
> Skipping (will be listed in the report's `skippedLocations`): Eastgate, Riverside, Uptown, Belmont.

If the user pushes back, swap to their picks. Never silently skip — always document `graderRunFor` + `skippedLocations` in `client.location`, and surface skipped ones in the internal report's `risks-and-caveats` section.

### Step 0.5c — Slug & folder convention for multi-location brands

Each graded location gets its **own slug** and its **own archive folder** so it appears as a standalone client in `manage-reports.py` and gets its own `/report/<slug>` URL. Pattern:

```
<base-slug>-<location-slug>
```

Examples:
- `grumpys-burgers-downtown`
- `grumpys-burgers-westside`
- `pizza-roma-north-park`

Archive layout:
```
reports-archive/
  grumpys-burgers-downtown/<YYYY-MM>/grumpys-burgers-downtown-client-report.json
  grumpys-burgers-downtown/<YYYY-MM>/grumpys-burgers-downtown-internal-report.json
  grumpys-burgers-westside/<YYYY-MM>/grumpys-burgers-westside-client-report.json
  grumpys-burgers-westside/<YYYY-MM>/grumpys-burgers-westside-internal-report.json
```

### Step 0.5d — What to type into the grader (per-location query)

The grader scores **one Google Places result per run**. To make it pick the *correct* location's GBP without the user having to scroll a long autocomplete list, always pass `--query` as `"<Brand Name> <Area or Address>"`:

- ✅ `--query "Grumpy's Burgers Downtown"`
- ✅ `--query "Grumpy's Burgers 123 Main St Springfield"`
- ✅ `--query "Pizza Roma North Park"`
- ❌ `--query "Grumpy's Burgers"` (forces user to scroll a 7-location dropdown to find the right one)
- ❌ `--query "grumpys.com"` (URL — grades brand average, not the specific location)

Use the **area / neighborhood** when one is on the website (most chains label their locations this way). Fall back to street address or city when no neighborhood is given. The autocomplete narrows to one or two entries, the user clicks the right one, and the grader scores that location's actual GBP.

`--url` is metadata only (slug + JSON record). Use the brand's main domain unless a per-location landing page exists; either is fine since the grader is driven by `--query`, not `--url`.

**Single-location brands:** still useful to include the city or address — `--query "Joe's Diner Springfield"` removes ambiguity if other businesses share the name.

**Fallback when a location has no GBP / isn't on Google Places:** rare, but if the autocomplete returns nothing for that location, fall back to passing its **dedicated landing page** URL via `--query` (the grader will accept a URL too). The result will be brand-average rather than location-specific — note that limitation in the internal report's `risks-and-caveats` section.

### Step 0.5e — `client.location` JSON field (required for multi-location)

For multi-location brands, **every** report's `client` object MUST include a `location` block. The `meta` block stays empty on first generation — `push-report.js` populates `meta.*Id` and `client.company.id` / `client.location.id` after the first successful push and rewrites the local JSON.

```json
"client": {
  "name": "Grumpy's Burgers — Downtown",
  "slug": "grumpys-burgers-downtown",
  "url": "https://grumpys.com/locations/downtown",
  "preparedDate": "May 10, 2026",
  "company": {
    "name": "Grumpy's Burgers",
    "slug": "grumpys-burgers"
  },
  "location": {
    "name": "Downtown",
    "slug": "downtown",
    "address": "123 Main St, Springfield, IL",
    "siblings": ["Westside", "Uptown", "Northpark", "Eastgate"],
    "totalLocations": 5,
    "graderRunFor": ["Downtown", "Westside", "Northpark"],
    "skippedLocations": ["Uptown", "Eastgate"]
  }
}
```

- `client.name` — append `" — <Location>"` so the location is unambiguous everywhere it surfaces (admin list, hero title, share previews).
- `client.company.{name,slug}` — the canonical brand-level identity. `push-report.js` looks this up in `clients`; if no row exists with that slug, it creates one. **Two reports for the same brand MUST use the same `client.company.slug`** — that's how the system collapses them under one company row.
- `client.location.{name,slug,address}` — the location identity. `push-report.js` finds or creates a `locations` row keyed on `(company.id, location.slug)`. The first location created for a company is auto-marked `is_primary=true`.
- `location.siblings` — every other location name. Lets the report subtly reference the wider brand ("your Westside team is doing X better — apply the same here").
- `location.graderRunFor` / `skippedLocations` — only set on multi-location brands where the cap applied. Skipped locations should also receive a brief note in the internal report's `risks-and-caveats` section.

**Single-location brands:** include `client.company` (so the brand row gets created with the right slug), but `client.location` is optional — if omitted, `push-report.js` creates a default `Main` location and links the report to it.

### Step 0.5f — Content-level rules for multi-location reports

Each location gets its **own fully independent** client + internal report. No averaging, no brand-wide aggregation. Treat each per-location report as if it were a standalone client.

- **Hero numbers reflect THIS location only.** `hero.graderScore`, `hero.overallGrade`, `hero.monthlyRevenueLoss`, and `ratings[]` all use this location's grader output — never an average across siblings. The Westside report's hero is Westside's score; the Downtown report's hero is Downtown's score.
- **Reviews & GBP** sections must use **that location's** Google Business Profile and review pool — not the brand average.
- **Competition** section must use **that location's** local pack and neighborhood — competitors three miles from the Westside store are not competitors to the Downtown store.
- **Keywords** section's `neighborhoods` group must reflect the actual neighborhoods around **that location**.
- **Hero subtitle/narrative** should briefly acknowledge the wider brand ("One of 5 Grumpy's locations — this report focuses on Downtown") so the client knows the report is location-specific. Light sibling references in the body are fine where they add useful context (e.g. "your Westside team is doing X better — apply the same here") but the report stays focused on this location.
- The **progression-bar roadmap** stays the standard 4 locked steps; only the `info` 1-liner under each step should be tailored to this location's specific gaps.

---

## Step 0a — Read the bundled sample report

Before doing anything else, **read the sample report bundled with this skill**:

```
.claude/skills/generate-client-report/sample-client-report.json
```

That file — not any archived report — is the structural template for the client-facing JSON. It shows the locked section order, IDs, types, group structure, progression-bar steps, ad-spend table shape, and the current prose conventions (hero narrative tone, competition callout phrasing, keyword `totals.summary` closing paragraph, ad-spend callout, CTA voice).

You do **not** need to inspect previously-generated reports in `reports-archive/` to decide structure. The sample is self-contained and authoritative. The structure is also enforced by the locked table in Step 3a — if anything ever drifts between the sample and the table, the table wins.

**Multi-location sibling consistency:** if you're generating multiple per-location reports for the same brand in one session, write location #1 against the sample first, then write locations #2/#3 against location #1 so the sibling reports stay consistent in voice and sized-baseline numbers (see Step 3a's `keywords.totals.summary` rules).

State the reference once, briefly, at the start of generation (e.g. "Using the bundled sample as the structural reference."). Don't paste the file or narrate the read — just name it and move on.

---

## Step 1 — Capture grader report (run the Python CLI, watch for sentinel)

> **Skip this entire step for non-restaurant clients** (med spas, salons, clinics, etc.). The grader only scores restaurants — see the "Non-restaurant clients" section above. Score manually from web research and go straight to Step 2/3.

**Search by NAME + AREA, not URL.** grader.owner.com's input box accepts both a website URL and a Google Places business name. Always pass `"<Brand Name> <Area or Address>"` in `--query` — that surfaces a Google Places autocomplete dropdown narrowed to that one location. The user clicks it; the grader scores that location's actual GBP, not whatever the homepage URL resolves to. See Step 0.5d for what to put in `<Area>`.

This is materially better than passing a URL or a bare brand name because:
- Multi-location chains' homepage URLs grade as the brand average, not the location.
- A bare brand name on a 7-location chain forces the user to scroll a long autocomplete list — easy to mis-click.
- `<Brand> <Area>` hits Google Places with enough specificity that the right GBP is the first or only autocomplete result.

**Windows encoding (MANDATORY):** The script uses the `rich` library which prints emoji and Unicode box-drawing characters. The default Windows code page is cp1252 and will throw `UnicodeEncodeError: 'charmap' codec can't encode character '\U0001f4ca'` mid-banner, killing the script before it can capture anything. **Always prefix the Python command with `PYTHONIOENCODING=utf-8 PYTHONUTF8=1`**:

```bash
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture \
  --company "<Client Name> — <Location>" \
  --url "<website-url>" \
  --query "<Brand Name> <Area or Address>"
```

`--company` and `--url` are saved as JSON metadata and drive the slug. `--query` is what the script types into the grader's search field — pass `"<Brand> <Area>"` (e.g. `"Grumpy's Burgers Downtown"`). If `--query` is omitted, the script falls back to typing the URL (legacy behavior).

Run from: `C:\Users\Hashaam\Desktop\MyCode\ParentSite-Tableturnerr`. Use a long Bash timeout (e.g. `timeout: 600000`) — the user must solve a CAPTCHA and pick a location, which can take a minute or two.

**Multi-location:** Run this step **once per location to be graded**, in series. Each run uses a different `<Brand> <Area>` query so the autocomplete narrows to the right GBP automatically — the user only has to click and CAPTCHA per location.

```bash
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture \
  --company "Grumpy's Burgers — Downtown" \
  --url "grumpys.com" \
  --query "Grumpy's Burgers Downtown"
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture \
  --company "Grumpy's Burgers — Westside" \
  --url "grumpys.com" \
  --query "Grumpy's Burgers Westside"
PYTHONIOENCODING=utf-8 PYTHONUTF8=1 python scripts/grader_cli.py capture \
  --company "Grumpy's Burgers — Northpark" \
  --url "grumpys.com" \
  --query "Grumpy's Burgers Northpark"
```

Tell the user up-front: "I'll run the grader N times — once each for `<location list>`. Each run pre-fills `<Brand> <Area>` so the right location is the top autocomplete result; just click it and solve the CAPTCHA." After each `READY:` sentinel, stash the JSON path before starting the next capture.

Each location's grader score is used **only in that location's reports** — there is no brand-wide aggregation. Every per-location report stands alone with its own hero numbers, its own category breakdown, and its own progression-bar roadmap tooltips.

**How it works:**
- The script launches the user's **real Google Chrome** via remote debugging (port 9222) with an isolated `--user-data-dir`. If Chrome is already running on that port (from a prior capture this session), the script **attaches without relaunching** — the existing browser is reused.
- The script always opens a **brand-new tab** for each capture and pins that page reference. It polls **only its own tab** every 2s until the report renders. Other concurrent or sibling captures cannot interfere.
- When the capture finishes, the script **closes only its own tab**. It never terminates Chrome. This means consecutive captures are safe — finishing capture #1 will not kill capture #2's session.
- The user is responsible for closing Chrome manually when the whole session is done. (Closing it mid-session would force a relaunch on the next capture, which is fine — just costs a few seconds.)

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

**This file MUST mirror the bundled sample** (`.claude/skills/generate-client-report/sample-client-report.json`).

Open the sample JSON and copy its top-level shape, section order, group structure, child IDs, section types, and prose pattern verbatim. Replace only the *business-specific content*. Do not invent new sections, drop required ones, or rename IDs. Section IDs/types/order/counts in the locked table below override the sample if they ever drift.

**Top-level section structure (3 group sections + 1 progression bar + 1 CTA = 5 entries).** Hero/narrative/ratings stay at the top level outside of any group — they're the "Business overview" that sits before Section 1.

**Required top-level shape** (consistent across every report). For multi-location brands, also include the `client.location` block described in Step 0.5:
```json
{
  "version": 1,
  "client": { "name": "...", "slug": "...", "url": "...", "preparedDate": "..." },
  "hero": { ... },
  "ratings": [ ... ],
  "sections": [
    { "type": "group",          "id": "gbp",         "title": "Google Business Profile", "sections": [ /* competition */ ] },
    { "type": "group",          "id": "website",     "title": "Website",                 "sections": [ /* problems, keywords */ ] },
    { "type": "group",          "id": "google-ads",  "title": "Google Ads",              "sections": [ /* ad-spend table */ ] },
    { "type": "progressionBar", "id": "roadmap",     "title": "The path from here",      "steps": [ /* 4 steps */ ] },
    { "type": "cta",            "id": "next-steps",  "title": "Investment & Next Steps", "body": [ ... ] }
  ]
}
```

**Required section order, IDs, and titles (LOCKED — do not change):**

| Order | `type` | `id` | `title` | Children |
|-------|--------|------|---------|----------|
| 1 | `group` | `gbp` | `Google Business Profile` | competition |
| 2 | `group` | `website` | `Website` | problems, keywords |
| 3 | `group` | `google-ads` | `Google Ads` | ad-spend table |
| 4 | `progressionBar` | `roadmap` | `The path from here` | 4 steps (locked) |
| 5 | `cta` | `next-steps` | `Investment & Next Steps` | — |

**Required child IDs/types (LOCKED) inside each group:**

| Group | Child `type` | Child `id` | Child `title` |
|-------|--------------|------------|---------------|
| `gbp` | `competition` | `gbp-competition` | `The Competition` |
| `website` | `problems` | `website-problems` | `What's Holding Your Website Back` |
| `website` | `keywords` | `website-keywords` | `Search Terms That Should Be Bringing You Customers` |
| `google-ads` | `table` | `ad-spend` | `Ad Spend & Estimated Returns` |

> **Non-restaurant clients:** the child **IDs and types above are locked**, but the human-facing **titles/labels** adapt per the language map in the "Non-restaurant clients" section (e.g. `website-keywords` becomes "…Bringing You Patients"). Never change an `id`.

**Group section rules:**

- Each group has a short 1–2 sentence `intro` introducing the group, written client-facing.
- Each group's `sections` array contains the children listed above in the order shown.
- Do not nest a group inside another group. Groups are top-level only.

**Section content rules:**

- **`gbp-competition`** — competitor table (rank, name, style, rating, knownFor; mark the client with `"isYou": true`); `searchPosition` rows; `rivalCallouts` (2 rivals — closest neighborhood rival + biggest threat); `winLose` array; and the `opportunity` block with intro + rows + bottomLine. Match the sample's structure 1:1.
- **`website-problems`** — exactly **5** numbered problem cards. Each has `number`, `title`, `body[]` (1–2 paragraphs), and optional `bullets[]`. Tone: direct, specific, actionable. Identify problems that are real for *this* business — never copy-paste the sample's exact problems.
- **`website-keywords`** — **4** keyword groups in this order, with these exact `id`/`label` patterns:
  1. `money-keywords` — "The Money Keywords — People Ready to Order" (non-restaurant: "…People Ready to **Book**", or "…to **Buy**" for retail)
  2. `secret-weapons` — "Your Secret Weapons — Keywords Only You Can Own"
  3. `neighborhoods` — "Reaching Nearby [City] Neighborhoods" (non-restaurant: "Reaching Nearby [County/Region] Communities")
  4. `catering` — "Catering — A Search Almost No One Is Going After" (keep the `catering` **id**, but for non-restaurants swap the **label** to the client's highest-LTV offering: "Medical Weight Loss," "Bridal & Events," "Memberships," "Corporate/B2B," etc.)
  Each group needs `summary`, `highlight` (volume badge), `intro`, `table` (headers + rows), and `takeaway`. Plus the `totals` block at the end.

  **`keywords.totals.summary` MUST close with a traffic-performance paragraph** that frames current monthly traffic vs. a 3-month target. Required shape (separated from the rest of the summary by a blank line):

  ```
  **Where you stand today vs. where you can be in 3 months:** <domain> is currently pulling roughly **<X–Y> visitors a month** — <one phrase on where that traffic comes from, e.g. "almost all branded searches"/"a mix of branded and Maps clicks"/etc.>. With the keyword set live across the site and GBP <+ any client-specific levers>, a realistic **3-month target is <N>+ monthly visitors**, growing toward <larger N>+ by month six — roughly a **<multiplier>× lift**. On a <low-high keyword opportunity range> monthly-search opportunity, that's <comfortably within reach|well within reach|comfortably hit at a 5–8% capture rate>.
  ```

  How to size the numbers:
  - **Current monthly visitors** — estimate from this report's signals only. Heuristics:
    - `ratings.search ≤ 20` and `ratings.content < 30` → ~30–150 visitors/mo (essentially invisible; brand-name searches only).
    - `ratings.search` 21–40 → ~150–300/mo.
    - `ratings.search` 41–65 → ~250–500/mo.
    - `ratings.search` > 65 (already ranks) → ~400–1,000+/mo.
    - Strong GBP (`ratings.gbp` ≥ 70) and high review count bump the range up; a "broken Google listing"-style verdict pulls it down.
  - **3-month target** — size to ~5–8% of the **low end** of `keywords.totals.rows`' total search opportunity. Round to a clean number (600+, 800+, 1,000+, 1,500+).
  - **Month-six stretch target** — ~1.5–2× the 3-month number. Just enough to show a glide path, not a hard promise.

  **Sister locations on the same domain share the site-wide baseline.** If `client.location.siblings` is non-empty and the brand serves all locations from one website (which is the common case — verify against the URL), both location reports must cite the **same site-wide current-traffic range** and explicitly say "across both locations" / "as a whole." Then differentiate the per-location framing: one location may already capture most of that traffic ("most of it is already coming through Hempstead"); the other may capture almost none ("almost none of that is reaching the Elmont pages because the listing is broken"). The per-location **target** still scales to that location's own keyword opportunity. Never publish two sister-location reports with conflicting current-traffic numbers.

  For multi-domain brands (one location per domain — e.g. Al-Baghdadi runs three separate sites), phrase the baseline as "the three sites combined are pulling roughly X visitors a month" instead.

  See the bundled sample for the exact closing-paragraph format.
- **`roadmap` (progressionBar)** — exactly **4** steps in this order. The step labels are LOCKED — do not rename, reorder, or add/drop a step. Each step has a `label`, an `info` string (a 1-liner shown in the tooltip on hover/click of the info icon), and the 4th step gets `"recommended": true`.
  1. `label: "Research Competition & Keywords"` — info: 1-liner tailored to the client describing the keyword/competition research move.
  2. `label: "Optimize Google Business Profile"` — info: 1-liner about the GBP fixes most relevant to this client.
  3. `label: "SEO Optimized Website"` — info: 1-liner about the website rebuild this client specifically needs.
  4. `label: "Google Ads"`, `recommended: true` — info: 1-liner explaining ads compound the lift once steps 1–3 ship.

  Keep each `info` to ~12–22 words. They render as small popovers, not paragraphs. The "recommended" flag on step 4 renders as a subtle badge — do not add the word "recommended" to the label.
- **`ad-spend` (inside the `google-ads` group)** — `type: "table"`, `id: "ad-spend"`, `title: "Ad Spend & Estimated Returns"`. Three-tier paid-ads forecast that pairs with the keyword opportunity sized in the `keywords` section. Required shape:
  - `intro` — 1 short paragraph: "Once the site fixes above are live, a small monthly Google Ads budget compounds the lift…" Tailor a sentence to *this* location's market dynamics (low-CPC small town vs. competitive city, college market, border traffic, etc.). Never name upstream tools.
  - `emphasizeFirstColumn: true`.
  - `headers`: **exactly** `["Tier", "Monthly Spend", "Est. Clicks", "Est. Calls / Direct Orders", "Est. Monthly Revenue", "Approx. ROAS"]`. **Non-restaurant clients** swap column 4 to `"Est. Consultations"` or `"Est. Bookings"` (the other five headers stay identical).
  - `rows`: **exactly 3 rows** — `Starter` ($300/mo), `**Growth — Recommended**` ($750/mo) with the bolded recommended badge in column 1, and `Aggressive` ($1,500/mo). Keep the spend column at `$300/mo`/`$750/mo`/`$1,500/mo` across all reports; only the click/order/revenue/ROAS ranges change per location.
  - `callout` — a "How to read this" paragraph stating: (a) what queries the ads target (use this location's actual money-keywords + secret-weapon terms), (b) assumed conversion rate (~10–12% clicks → calls/orders; ~8–12% clicks → consultations/bookings for services), (c) assumed average ticket (location-specific, typically $30–45 for food; for non-restaurants use the service AOV from the language map — med spa ~$200–300, salon ~$80–150, etc.), (d) that ROAS is conservative because direct orders avoid the 20–30% delivery-app commission (for non-restaurants drop the delivery line — say direct bookings avoid third-party marketplace/booking fees, or omit it), and (e) which tier you recommend starting with.

  **How to size the per-location numbers** (don't copy verbatim across locations — tune them):
  - **Cost-per-click bands** to anchor the click counts:
    - Low-competition / small town: $1.80–$3.20 avg CPC → ~94–167 clicks/$300, ~234–417 clicks/$750, ~469–833 clicks/$1,500.
    - Mid-competition / mid-size city: $2.40–$4.50 avg CPC → ~67–125 clicks/$300, ~167–313 clicks/$750, ~333–625 clicks/$1,500.
    - High-competition / large metro: $3.50–$7 avg CPC → ~43–86 clicks/$300, ~107–214 clicks/$750, ~214–429 clicks/$1,500.
  - **Calls / direct orders** = clicks × ~10–12% conversion. Round to a tight range.
  - **Est. revenue** = calls/orders × this location's typical average ticket (Indian/Mexican/Mediterranean restaurants ~$30–40; pizza ~$25–35; high-end dinner ~$60+).
  - **ROAS** = revenue ÷ spend, reported as a range (low/high of revenue ÷ spend).
  - Sanity check: revenue range must be ≥ spend at the low end of at least the Growth tier — if it isn't, the assumptions are off and the section becomes a *negative* sales argument. Re-check CPC band, conversion rate, or AOV.

  **Sister locations on the same brand** can use the same tier amounts but should have *different* click/order/revenue ranges where the markets differ (e.g. a small-town location vs. a college-city location). Mention any seasonal levers (university calendar, holiday catering, tourist season) in the callout when relevant.
- **`cta`** — title `Investment & Next Steps`, 3 paragraphs in `body[]`, omit `primary.href` and `secondary.href` (the renderer fills those with the TableTurnerr defaults).

**Multi-location:** see Step 0.5f. Each per-location client report is fully independent — its hero numbers and section content reflect only that location, not a brand average.

**Schema reference:** `lib/report-schema.ts` (`ClientReport` v1). Inline formatting allowed in any string: `**bold**`, `*italic*`, `[label](url)`, `` `code` ``. Never emit raw HTML.

**Tone:** Professional, direct, actionable, client-facing. Never name upstream tools (no "owner.com," no "grader," no "API"). Numbers from external tools become *our* analysis. Internal pricing strategy and speculative growth math belong in the internal report only.

**Renderer defaults — omit from output to keep the JSON tight:**
- `client.preparedBy` (defaults to `"Tableturnerr"`)
- CTA `primary.href` / `secondary.href`
- TableTurnerr's phone, email, and address — those live in the site Footer.

### 3b. Internal report — `<slug>-internal-report.json`

Same `ClientReport` schema, but **a much deeper, longer report for the TableTurnerr team**. Use the schema's flexibility to fit the full deep-dive: more sections, more problem items, more keyword groups, more callouts, more competitor analysis.

**Recommended internal section sequence** (use `narrative`, `table`, `problems`, `competition`, `keywords`, `actionPlan`, and `successMetrics` types liberally — the schema supports all of them; the internal report still uses the old `actionPlan` section type, not the client report's new progression bar):

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
15. `actionPlan` `id: "internal-action-plan"` — Same 4 steps as the client roadmap, but rendered as a full `actionPlan` table for the team: each `action` rewritten with internal context — which agency tier handles it, effort estimate, internal cost, suggested quote, margin estimate. Use richer `impact` strings.
16. `narrative` `id: "risks-and-caveats"` — Anything we couldn't verify (Cloudflare blocks, missing data, capture failures)
17. `narrative` `id: "sources"` — Sources & references

**Tone:** Internal-team voice. Pricing strategy, margin math, speculative numbers, and pitch hooks all belong here. Reference `grader_cli.py`, `.grader-cache/`, and upstream tools freely — this report never reaches the client.

**Grader data integration:** When grader data is available, embed the overall score + category breakdown in the **internal** report's hero/scorecard. The **client** report's hero numbers should be presented as TableTurnerr's analysis with no provenance.

**Multi-location:** each location gets its own internal report with that location's raw grader output — no averaging. Make sure `risks-and-caveats` notes which locations were skipped (`client.location.skippedLocations`) and why, so the team can run a follow-up session for the rest if needed.

---

## Step 4 — Stop after writing the JSON files

**Do NOT auto-launch the Reports Archive Manager.** Once both JSON files are written to `reports-archive/<slug>/<YYYY-MM>/`, the generation run is done — print the summary in Step 5 and stop.

The user runs the manager themselves when they're ready (`scripts/manage-reports.bat`), or pushes via `scripts/push-report.js` directly. Auto-launching it interrupts whatever else they're doing and forces them through a UI they may not need.

**Only launch the manager if the user explicitly asks** for previews or to push. Even then, prefer running `scripts/push-report.js` directly with the right flags rather than spawning the interactive Rich menu in a separate cmd window.

For reference, the manager (when the user runs it themselves) lists every client in `reports-archive/`, lets them pick one, and offers preview / push as draft / push as published. It uses `scripts/push-report.js` under the hood with `--month`, `--client-report-json`, and `--internal-report-json` — always pass `--month=<YYYY-MM>` matching the archive subdirectory, otherwise it defaults to the current month.

---

## Step 5 — Return results and stop

Print this summary, then stop. Do NOT launch the manager, do NOT push to Supabase, do NOT open a browser. Wait for the user to drive the next step themselves.

```
✅ Reports generated for <Client Name>

📁 Archive:        <repo>/reports-archive/<slug>/<YYYY-MM>/
   • <slug>-client-report.json   (powers /report/<slug>)
   • <slug>-internal-report.json (admin-only deep-dive)

Next steps (run yourself when ready):
  • Preview / push:  scripts/manage-reports.bat
  • Or push direct: node scripts/push-report.js --slug=<slug> --month=<YYYY-MM> --client-report-json=… --internal-report-json=…
  • Admin panel:    http://localhost:3000/admin/reports
  • Public URL:     https://tableturnerr.com/report/<slug>  (after publishing)

Status: DRAFT (until you push as published).
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
| Client is a med spa / salon / clinic / any non-restaurant | Do **not** run the grader at all. Skip Step 1, score the six ratings manually (see "Non-restaurant clients" section), and note "no grader run — scores directional" in the internal `risks-and-caveats`. |
| Unsure whether to run the grader | If it sells food/drink, run it. Anything else (services, retail, medical, fitness) is a non-restaurant — skip it. |
| CAPTCHA in browser | User solves it in real Chrome; script auto-detects completion |
| Chrome not found | Ask user to install Chrome or check PATH |
| CDP connection refused | Close all Chrome windows and re-run |
| Capture #1 finishes and capture #2 stops mid-run | Old script killed shared Chrome on capture #1's exit. Make sure `scripts/grader_cli.py` is on the latest version (only closes its own tab; never terminates Chrome). |
| Autocomplete dropdown shows 0 results for a brand | Brand isn't on Google Places under that exact name — try the brand's full legal name, or fall back to passing the location's URL via `--query`. |
| Wrong location's report captured | User clicked the wrong autocomplete entry. Re-run that one capture; output will overwrite the `<slug>.json` cache. |
| Push script fails | Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` |
| Migration `internal_content_json` column missing | Apply `scripts/migrations/add-internal-content-json.sql` once before the first push |
| Tempted to write a `.md` file | Stop. JSON only. Re-read the rules at the top of this skill. |

---

## Anti-patterns
- ❌ Do **not** generate `<slug>-client-report.md` or `<slug>-internal-report.md`. Markdown is retired.
- ❌ Do not invent new client-report sections, rename IDs, or change the section order. Match `sample-client-report.json` and the locked tables in Step 3a exactly.
- ❌ Do not skip Step 0a. The bundled `sample-client-report.json` is the structural source of truth — read it before writing.
- ❌ Do not read reports from `reports-archive/` as your structural reference. The sample bundled with this skill is authoritative; archived reports may be in the older 6-section structure (competition / problems / keywords / actionPlan / ad-spend / cta) which is now retired for new reports.
- ❌ Do not put more or fewer than 4 steps in the client `progressionBar.steps`. The four labels and their order are locked: Research Competition & Keywords, Optimize Google Business Profile, SEO Optimized Website, Google Ads (recommended).
- ❌ Do not rename, reorder, or substitute the four progression-bar step labels. Only the `info` 1-liners are client-tunable.
- ❌ Do not add a `priority: "Action Plan"` table to the client report. The progression bar replaces the old Priority Action Plan section — the `actionPlan` section type is internal-only now.
- ❌ Do not omit the `ad-spend` table from inside the `google-ads` group, change its child ID (`ad-spend`), or rename it. The group and its child are locked.
- ❌ Do not flatten the 3 groups (`gbp`, `website`, `google-ads`) into top-level sections like before. The 3-group nested structure is required.
- ❌ Do not nest a group inside another group. Groups are top-level only.
- ❌ Do not put more or fewer than 3 rows in the `ad-spend` table — Starter / Growth (Recommended) / Aggressive only. Keep the monthly spend values at $300 / $750 / $1,500 across all reports; tune only the click/order/revenue/ROAS ranges per location.
- ❌ Do not copy the Namaste Blaine / Bellingham ad-spend numbers into a new client's report — re-derive them from the location's CPC band, conversion rate, and average ticket. Verbatim copying is a tell.
- ❌ Do not let the Growth tier's low-end revenue come in below spend. If it does, your CPC, conversion-rate, or AOV assumption is wrong — fix it before shipping.
- ❌ Do not name upstream tools ("owner.com", "grader", etc.) in the client JSON.
- ❌ Do not run the grader for a non-restaurant client (med spa, salon, clinic, etc.). Skip Step 1 and score manually per the "Non-restaurant clients" section. Conversely, do not skip the grader for an actual restaurant.
- ❌ Do not change a locked `id` when adapting wording for a non-restaurant. Only the human-facing titles/labels change (e.g. the 4th keyword group stays `id: "catering"` even when its label is "Medical Weight Loss"). IDs, types, and section order are identical to the restaurant flow.
- ❌ Do not present manually-scored ratings as grader output in the internal report. State plainly in `risks-and-caveats` that no grader was run and the numbers are directional.
- ❌ Do not run `scripts/grader_cli.py share` directly — use `scripts/push-report.js` (the manager calls it for you).
- ❌ Do not produce one report covering many locations. Each graded location gets its own slug, folder, and JSON pair.
- ❌ Do not silently skip locations when a brand has too many. Always document `graderRunFor` + `skippedLocations` in `client.location`, and surface skipped ones in the internal report's `risks-and-caveats`.
- ❌ Do not invent a `client.location` block for single-location brands. Omit the field entirely.
- ❌ Do not run multiple grader captures in parallel — the user has to solve a CAPTCHA per capture and pick a different location each time. Run them in series so the user can keep up.
- ❌ Do not pass just the bare brand name in `--query` when grading a specific location of a chain — use `"<Brand> <Area>"` so the autocomplete narrows to that GBP. Bare names force the user to scroll a long dropdown and mis-clicks are common.
- ❌ Do not pass the website URL in `--query` for multi-location brands. URLs grade the brand average, not the location.
- ❌ Do not ask the user to enumerate the brand's locations. Discover them yourself from the website + public data first (Step 0.5a), pick the 3 main ones (Step 0.5b), then post a single confirmation message before capturing.
- ❌ Do not average grader scores across siblings. Each per-location report uses **only that location's** grader output for its hero numbers and ratings — there is no brand-wide aggregation.
- ❌ Do not produce one combined report covering several locations. Each graded location gets its own slug, its own folder, and its own client + internal JSON pair.
- ❌ Do not assume Chrome must be relaunched between captures. The script attaches to any Chrome already running on port 9222 and only closes its own tab on completion.
- ❌ Do not auto-launch `scripts/manage-reports.bat` at the end of a generation run. Print the Step 5 summary and stop — the user runs the manager themselves when they want to preview or push.
- ❌ Do not create separate `clients` rows for two locations of the same brand. Both reports must share the same `client.company.slug` so `push-report.js` collapses them under a single company row with two `locations` children.
- ❌ Do not invent UUIDs for `meta.reportId`, `meta.companyId`, or `meta.locationId` on first generation. Leave them empty — `push-report.js` writes the real IDs back into the JSON after the first successful push.
