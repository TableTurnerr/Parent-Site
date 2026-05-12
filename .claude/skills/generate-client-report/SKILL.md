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
- The **action plan** stays the standard 4 steps, but the wording inside each item should reflect this location's specific gaps.

---

## Step 1 — Capture grader report (run the Python CLI, watch for sentinel)

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

Each location's grader score is used **only in that location's reports** — there is no brand-wide aggregation. Every per-location report stands alone with its own hero numbers, its own category breakdown, and its own action plan.

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

**This file MUST mirror `reports-archive/pure-on-the-plaza/pure-on-the-plaza-client-report.json`.**

Open Pure Pizza's JSON and copy its top-level shape, section order, section IDs, section types, and prose pattern verbatim. Replace only the *business-specific content*. Do not invent new sections, drop required ones, or rename IDs.

**Required top-level shape** (same as Pure Pizza). For multi-location brands, also include the `client.location` block described in Step 0.5:
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

  See `reports-archive/pure-on-the-plaza/2026-05/pure-on-the-plaza-client-report.json` (the canonical template) for the exact closing-paragraph format.
- **`actionPlan`** — exactly **4** items in this order. Do not add a 5th, do not drop one. Categories use the badges from Pure Pizza: `Research`, `Build`, `Polish`, `Ongoing`.
  1. `priority: 1`, `category: "Research"` — **Keyword Research**
  2. `priority: 2`, `category: "Build"` — **Site Content + Google Business Profile × Keywords**
  3. `priority: 3`, `category: "Polish"` — **Review + Small Design-Related Changes**
  4. `priority: 4`, `category: "Ongoing"` — **Monitor Performance**
  Adjust the wording inside each item to fit the client, but the four steps and their order are fixed.
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
- ❌ Do not invent new client-report sections, rename IDs, or change the section order. Match Pure Pizza exactly.
- ❌ Do not put more or fewer than 4 items in the client `actionPlan`.
- ❌ Do not name upstream tools ("owner.com", "grader", etc.) in the client JSON.
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
