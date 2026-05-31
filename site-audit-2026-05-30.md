# Site audit — 2026-05-30

> **Document map.** Part 1 (below) is the SEO/structural audit. Part 2 (further down) is the v2 expansion: Performance/CWV, Accessibility, Visual & UX / section design, Content depth & E-E-A-T, Conversion (CRO), Internal-link graph, a browser-verification checklist, and a single consolidated priority roadmap. Read the **Scorecard** next for the one-screen view.

## Scorecard (one-screen view)

| Dimension | Grade | One-line verdict |
|---|---|---|
| **Technical SEO** | C+ | Good plumbing (robots, canonicals, schema bundle) undercut by a hollow `/blog` in the sitemap, dead OG image path, and US-not-Texas signals. |
| **On-page / keywords** | C | Solid service copy; **zero Texas signal** in global metadata; thin city pages. |
| **Content depth / E-E-A-T** | C | Service pages are deep; **no team/founder**, blog hollow, city pages templated, results are partners' not ours. |
| **Internal linking** | D | **All 60 service×city pages are orphaned** (sitemap-only, zero inbound links). No locations hub. |
| **Performance / CWV** | B− | Good image/font setup; risk from blur-filter text animation + 5 MB source images + heavy framer-motion. |
| **Accessibility** | C− | **No `prefers-reduced-motion`**, likely contrast failures on muted grays, missing focus rings on custom buttons, no skip link. |
| **Visual / UX** | B− | Strong fundamentals; section monotony, flat light/dark rhythm, no sticky mobile CTA. |
| **Conversion / CRO** | C | Consistent CTA, but **contact form has no backend**, no social proof above the fold, CTA wording split (Report vs Consultation). |
| **Trust / credibility** | D | **Pakistani address + `+92` phone on public legal/contact pages**; Hawaii `+1 808` business number. |

Lowest-hanging, highest-impact: **trust bugs (NAP)** → **link-graph (orphans)** → **reduced-motion + contrast** → **Texas geo signal**. Full ordering in the Roadmap at the end.

---

Untouched baseline audit of tableturnerr.com (ParentSite), the TableTurnerr company site. Read-only pass; no edits in this document's scope (two unrelated WIP edits were stashed first so this reflects the true state at HEAD `721d73f`).

Driving question: **the company's own site is hollow inside — no Texas keywords, thin/duplicate location pages, an empty blog advertised to Google, and a foreign address in the footer. What must change before we build content on top of it, given the Texas-first pivot?**

Stack: Next.js 16.1.6 (App Router) · React 19 · Tailwind 4 · Supabase · deployed on Vercel.

## Summary

- **CORRECTION (2026-05-30, from Aleee):** the Lahore address + `+92` phone are **the real, current operating address** — the US/Texas entity is mid-registration, not yet filed. So this is **not a trust bug**; it's a **geo-targeting tension**: a Pakistan NAP is the wrong local signal for ranking "restaurant marketing **Texas**." Leave the address as-is for now; when the TX entity registers, swap NAP + add `LocalBusiness` schema. Treat the items below that referenced it as "bug" with this reframing.
- **One live, business-critical bug:** **the contact form silently discards every submission** (`ContactForm.tsx:28` fakes success) — confirmed lead loss. This, not the address, is the real P0 trust/revenue issue.
  2. **The business phone is a `+1 (808)` Hawaii number** (`constants.ts:64`), and the schema `areaServed` is **"United States,"** not Texas.
- **`/blog` and `/blog/[slug]` are literal "Coming Soon" stubs** (7 lines each) — yet the sitemap advertises `/blog` with `changeFrequency: "daily", priority: 0.8`. Google is being told to crawl a daily-updated section that is empty. **The blog backend fully exists** (Supabase `blog_posts` tables + a complete `/admin/posts` editor), so this is a wired-up-but-disconnected front end, not a missing feature.
- **The location pages are thin/template-spun.** `buildLocationServiceData` (`location-service-helpers.ts:18-31`) produces each city page by swapping the city name into the title/headline and doing a **single-period substitution** on the description (`:26`). Features, stats, and FAQs are **100% identical across every city**. This is a textbook doorway/thin-content pattern — and it's the exact system we want to scale to 60 Texas pages. Scaling it as-is multiplies the risk.
- **Zero Texas signal anywhere in the global layer.** Root title, description, and keywords (`layout.tsx:33-53`) contain no "Texas." For a Texas-first strategy, the home/services/about pages currently give Google nothing geographic to anchor on.
- **OG image fallback is broken.** `metadata.ts:36` and `layout.tsx:58` both reference `/images/og/default.jpg`; the `public/images/og/` directory **exists but is empty**. Every page that falls back to the default OG card (including the homepage) ships a 404 image to Facebook/LinkedIn/Slack. (Note: the route-level `opengraph-image.tsx` / `twitter-image.tsx` generators are real and fine — only the static fallback path is dead.)
- **What's genuinely healthy:** robots.ts (admin blocked, AI bots allowed, correct sitemap ref), HTTPS/domain consistency, `metadataBase` set, security headers, report pages correctly `noindex`, admin correctly `noindex`, real (non-placeholder) testimonials and stats with sources, clean heading hierarchy on most pages, and a solid per-service schema bundle (Service + Breadcrumb + FAQ) on every service and city route.

## Global

### Root layout — `app/layout.tsx`

- Calls real metadata: `metadataBase` set to `https://tableturnerr.com` (`:32`), default title/template, description, keywords, robots, OG/Twitter. Fonts (Satoshi local + Caveat) with `display: "swap"`. Injects analytics (Vercel Speed Insights, Vercel Analytics, GA4 `G-35W3QYXVMG`). **Clean structurally.**
- **No Texas anywhere** in title (`:33-37`), description (`:38-39`), or the 12 keywords (`:40-53`). For the pivot this is the highest-leverage copy surface on the site.
- **`:58` references `/images/og/default.jpg`** as the global OG image — file does not exist (see Issues).

### Header / Footer / Mobile nav

- `app/components/layout/Navbar.tsx`, `MobileMenu.tsx` — nav from `NAV_LINKS`, CTA to `/contact`, social from `SOCIAL_LINKS`, email/phone from `SITE_CONFIG`. Brand string "TableTurnerr" hardcoded in nav (acceptable in a wordmark context).
- `app/components/layout/Footer.tsx` — full internal link map (pages, all 6 services, legal, mailto/tel). **`Footer.tsx:47` logo has no `alt`/`aria-label`** — minor a11y/SEO gap. Email/phone correctly from `SITE_CONFIG`.
- **`NAV_LINKS` includes `/blog`** (`constants.ts:1-7`) — so the hollow blog is linked from every page's header and footer, not just the sitemap.

### Data layer (`app/lib/`)

| File | State | Notes |
|---|---|---|
| `constants.ts` | Healthy, but **phone is `+1 (808)` (Hawaii)** at `:64`; email `contact@tableturnerr.com`; URL https. `SITE_CONFIG`, `NAV_LINKS`, `SERVICES` (6), `SOCIAL_LINKS`, `FAQ_DATA` (6), `CLIENTS` (4). | No address field — the Pakistani addresses live hardcoded in JSX instead. |
| `service-data.ts` | Healthy, rich | 6 services, each with features/stats/faqs/keywords/metaDescription. ~720 lines of real content. Strong foundation. |
| `location-data.ts` | **8 national cities** (NY, LA, Chicago, Houston, Dallas, Miami, Atlanta, SF) — only 2 are Texas. | This is the city source for all `[city]` routes + sitemap. (Pivot edit to 10 TX metros is staged separately, out of this baseline's scope.) |
| `location-service-helpers.ts` | **Thin-content engine** | `buildLocationServiceData:26` does `description.replace(/\./, " in {city}.")` — first-period swap only. FAQs/features/stats untouched per city. |
| `metadata.ts` | `createPageMetadata()` helper — good (canonical, OG, Twitter). | **`:36` OG fallback `/images/og/default.jpg` is dead.** |
| `schema.ts` | Comprehensive generators (Org, WebSite w/ SearchAction, Service, FAQ, Breadcrumb). | **`areaServed` = "United States"** in both Org (`:16-19`) and Service (`:88-91`). **No `LocalBusiness` schema, no postal address.** |

### Sitemap / robots / config

- `app/sitemap.ts` — generates from data (good): home, `/services`, 6 service pages, **6×8 = 48 service×city URLs**, `/about`, `/case-studies`, `/blog`, `/search`, `/contact`. **Base URL hardcoded** `https://tableturnerr.com` (`:6`) instead of `SITE_CONFIG.url` — minor drift risk. **Advertises `/blog` as `daily`/0.8 while it's a stub.**
- `app/robots.ts` — **Clean.** Disallows `/api/`, `/_next/`, `/admin/`; explicitly allows GPTBot + Google-Extended; correct sitemap + host. https throughout.
- `next.config.ts` — image `remotePatterns` includes **`http://psdb.tableturnerr.com`** (insecure) alongside the https variant (`:11-17`); security headers + long-cache static assets are well configured.
- `proxy.ts` / `supabase/middleware.ts` — auth-gates `/admin` only; adds security headers; **does not** add noindex to public routes. No crawlability harm.

## Per-page

### `/` Homepage — `app/(marketing)/page.tsx`
- **SEO:** `metadata` with canonical `https://tableturnerr.com`, OG, Twitter. Schema bundle is excellent: Organization, WebSite, FAQ, Breadcrumb, + all 6 Service schemas (`:46-66`).
- **H1:** lives in `Hero` (`Hero.tsx:20`): "Restaurant Website Design & SEO That Fills More Tables." Single H1, correct. Hero image `priority` ✓, descriptive alt ✓.
- **Geo:** **none.** No Texas in title/H1/copy.
- **Internal links:** page file itself routes only through Hero's 2 CTAs (`/contact`, `/services`); the rest of the long page (Services, Mission, Partners, Process, Testimonials, FAQ, CTA) is section components. Adequate via sections, but the hero is thin on internal links for a hub.
- **Verdict:** Structurally strong. **Needs Texas geo signal.** Ship after geo + OG-fallback fix.

### `/about` — `app/(marketing)/about/page.tsx`
- **SEO:** `createPageMetadata`, canonical `/about`, Org + Breadcrumb schema. Clean H1→H2→H3 cascade ("The Restaurant Growth Agency," `:179`). Images have rich alt.
- **Geo:** none. **Em-dashes in body copy:** `:54, :69, :90, :186, :223` (house-rule sweep; none are quotes).
- **Verdict:** Ship after em-dash sweep + a Texas mention.

### `/services` — `app/(marketing)/services/page.tsx`
- **SEO:** canonical `/services`, Breadcrumb + all-services schema. H1 "Restaurant Marketing Services" (`:143`), 6 service cards link out. Good link density.
- **Geo:** none. **Em-dash** `:147`.
- **Verdict:** Ship after geo + em-dash.

### `/contact` — `app/(marketing)/contact/page.tsx`
- **SEO:** canonical `/contact`, Org + Breadcrumb. H1 "Let's Grow Your Restaurant" (`:231`), clean hierarchy, good link density, icons `aria-hidden`. Title has an em-dash (`:17`, metadata).
- **Phone/email correctly from `SITE_CONFIG`** (`:293-297`). (The Pakistani address that appears on `/privacy` and `/terms` is in those legal pages; re-confirm whether `/contact` itself prints an address block before editing — the legal pages are the confirmed locations.)
- **Verdict:** Ship after NAP is resolved sitewide.

### `/privacy` and `/terms`
- **SEO:** canonical set, Breadcrumb schema, clean multi-H2 legal structure. Substantive (not thin).
- **BUG (High):** **Pakistani address AND a hardcoded Pakistani secondary phone** — `privacy:379-386` (`tel:+923281193038` / "+92 328 1193038" / "Plot 118, Block E2, Johar Town, Lahore, Pakistan, 54782"), same at `terms:370-377`. Note the primary phone on these pages DOES pull from `SITE_CONFIG`; only the secondary phone + address are hardcoded. `terms` also has an em-dash in body (`~:137`).
- **Verdict:** Ship after address + secondary-phone fix.

### `/case-studies` — `app/(marketing)/case-studies/page.tsx`
- **SEO:** canonical, Breadcrumb. H1 "Restaurant Success Stories" (`:164`). Client logos with `{name} logo` alt.
- **Content:** Real, sourced stats (+377% Samos Oaxaca, etc.) — good E-E-A-T. **Em-dashes** at `:240-241` (body); `:170` is inside a verification claim, sweep too (not a customer quote).
- **Gap:** has named clients + numbers but **no `Review`/`AggregateRating` schema** — a missed rich-result opportunity.
- **Verdict:** Ship after em-dash sweep; add review schema later.

### `/search` — `app/(marketing)/search/page.tsx`
- **SEO:** dynamic `generateMetadata` with query-aware title/description/canonical, Org + Breadcrumb. Dynamic H1, "Popular Services" links when empty. Clean.
- **Verdict:** Ship.

### `/services/[service]` (×6) — via `ServicePage.tsx`
- **SEO:** each page sets metadata from service data + injects Service + Breadcrumb + FAQ schema. Single dynamic H1 (`ServicePage.tsx:79`), H2/H3 cascade, hero `priority` + dynamic alt, related-services links.
- **Gap:** **The on-page FAQ accordion (`ServiceFAQ`) renders no FAQ JSON-LD itself** — FAQ schema is injected at the page level on service/city routes (good), but the template's own FAQ block and any reuse elsewhere should be confirmed to always pair with schema.
- **Verdict:** Ship. Strongest part of the site.

### `/services/[service]/[city]` (×48) — thin-content risk
- **SEO:** dynamic metadata with city in title/description + **canonical set** (`location-service-helpers.ts:52`), city-augmented keywords, and Service + Breadcrumb(4-level) + FAQ schema. Mechanically correct.
- **Content (High risk):** body is the parent service's copy with the **city name swapped into title/headline and one sentence**. Features, stats, FAQs identical across all cities. 48 near-duplicate URLs today; the pivot would make it **60**.
- **Verdict:** **Do not scale until each city page has genuinely unique content** (local intro, neighborhoods/landmarks, a local proof point). Add city-level `LocalBusiness`/`areaServed` per page.

### `/blog` and `/blog/[slug]` — hollow
- **Both are 7-line "Coming Soon" stubs.** No metadata, no schema, no H1 of value, no data fetch, no links. Yet linked from global nav/footer **and** advertised in the sitemap as daily-updated.
- **Backend exists:** Supabase `blog_posts` + `blog_post_categories` tables and a full `/admin/posts` editor (`PostEditor.tsx`, `actions.ts`) are present. The public reader was never wired.
- **Verdict:** **Highest content-leverage item.** Either build the public blog (backend is ready) or remove `/blog` from sitemap + nav until it ships. Do not leave it advertised-but-empty.

### `/report/[slug]` — client reports
- **SEO:** dynamic metadata, **correctly `noindex, nofollow`** (public) / `nocache` (unlisted). Renders via `dangerouslySetInnerHTML`. **No canonical** (harmless while noindex). H1 = client name.
- **Verdict:** Ship (intentionally non-public).

### `/404`, `/error`, `/global-error`, `/admin/*`
- 404/error/global-error are `"use client"` branded pages — fine; Next marks 404 noindex automatically. Admin layout sets `robots: noindex` and middleware gates it. **Clean.**

## Issues by severity

### Blockers (fix before promoting the site / building content on top)

0. **Contact form discards leads** — `ContactForm.tsx:28-31`. Wire to Supabase. *(in progress this session)*
1. **[RECLASSIFIED — not a bug]** ~~Pakistani address + secondary phone on public pages~~ — confirmed correct/current per Aleee (US entity mid-registration). Geo-tension only; revisit at TX registration. Original note retained for context: — address at `contact:288-289`(see note), `privacy:386`, `terms:377`; hardcoded `+92 328 1193038` secondary phone at `privacy:379-382`, `terms:370-373`. Replace with the real Texas business NAP (or remove the block until one exists). Add address + secondary-phone fields to `SITE_CONFIG` so they live in one place. *Owner: Aleee (NAP).* (Correction to an earlier draft: the secondary phone IS hardcoded — verified by grep — even though the *primary* phone on these pages reads from `SITE_CONFIG`.)
2. **`/blog` advertised but hollow** — `blog/page.tsx`, `blog/[slug]/page.tsx` are stubs; `sitemap.ts:54-58` + `NAV_LINKS` promote it. Build it (backend ready) or pull it from sitemap+nav.
3. **Broken OG fallback image (worse than first noted)** — `public/images/og/` **does not exist at all**, but `/images/og/default.jpg` is referenced in **four** places: `metadata.ts:36` (per-page OG fallback), `layout.tsx:58` (global OG), and **`schema.ts:9-10` (Organization `logo` AND `image`)**. So this dead path also breaks the Organization structured-data logo/image, not just social cards. Add a real 1200×630 card (and a square logo) or repoint to existing assets in `/images/usage/`.

### High (fix as part of the Texas pivot)

4. **No Texas in global metadata** — `layout.tsx:33-53`. Add "Texas" to default title, description, keywords.
5. **`areaServed: "United States"` + no LocalBusiness/NAP** — `schema.ts:16-19, 88-91`. Switch to Texas; add a `LocalBusiness` block with real address/geo once NAP exists.
6. **Hawaii phone (`+1 808`)** — `constants.ts:64`. Confirm intended or replace with a Texas number; it undercuts local trust.
7. **Thin city pages** — `location-service-helpers.ts:18-31`. Add per-city unique content before scaling to 60.

### Should-fix

8. **Em-dashes in body copy** — `about:54,69,90,186,223`, `services:147`, `case-studies:240-241,170`, `terms:~137`. Sweep per house rule (leave any real quotes).
9. **Sitemap base URL hardcoded** — `sitemap.ts:6` should use `SITE_CONFIG.url`.
10. **Insecure image host** — `next.config.ts:11-13` allows `http://psdb.tableturnerr.com`; drop to https-only.
11. **Footer logo missing alt** — `Footer.tsx:47`.

### Nice-to-have

12. **Review/AggregateRating schema** on `/case-studies` (real testimonials already exist).
13. **README is the default create-next-app boilerplate** (top half) — replace with real project docs.
14. **Homepage hero internal-link density** — add a few contextual internal links.

## Texas-pivot implications (recommended order)

1. **Stop the bleeding first (Blockers 1-3):** remove the Pakistan address, decide blog in-or-out of the sitemap, fix the OG fallback. These are credibility/crawl issues that make every later content gain leak.
2. **Geo-signal the global layer (4-6):** Texas into root metadata + schema `areaServed`, resolve the phone. This is what makes "restaurant marketing Texas" rankable at all.
3. **Make city pages real before multiplying them (7):** unique per-city content + `LocalBusiness` schema, *then* expand the city list. Scaling thin pages is negative EV.
4. **Then content:** with keywords mapped to pages (in progress) and the blog live, the service+city mesh has something to link to and from.

---

*Verification note: every Blocker and High finding was confirmed by direct file read + grep, not delegated summary. The hardcoded Pakistani **secondary phone** (`+92 328 1193038`) and **address** in `/privacy` and `/terms` are both real and confirmed; the **primary** phone on those pages reads from `SITE_CONFIG`. The Hawaii `+1 (808)` number also appears hardcoded in `report/[slug]/page.tsx:210-213` in addition to `constants.ts:64`. Tool output was cross-checked by design this session after earlier unreliable reads.*

---
---

# Part 2 — v2 expansion (Performance, Accessibility, Visual/UX, Content, CRO, Link graph)

This part adds the dimensions Part 1 didn't cover, in the spirit of a full client-site audit. Same rule: high-stakes claims verified by direct read/grep (noted inline).

## 5. Performance / Core Web Vitals

Stack reality: every section is wrapped in `AnimatedElement` (framer-motion `whileInView`), and most headings use `BlurText`, which splits a heading into one `<span>` per word and animates `filter: blur()` + transform + opacity. framer-motion is ^12.36.

### LCP
- **Homepage hero** — `Hero.tsx:49-56`: `next/image` with `priority` + correct `sizes`, source `hero-bg.webp` (only 56 KB). **Good** — LCP is well-handled.
- **Service / city pages** — `ServicePage.tsx:105-112`: hero image `priority` + dynamic alt. **Good.**
- **Services section cards** — `Services.tsx:71-77`: no `priority` (correct; below fold), good `sizes`.

### CLS — low risk
- `NumberTicker.tsx:52` uses `tabular-nums` and renders an initial `0`, so the counter doesn't reflow as it counts. Good.
- `BlurText` reserves space via `marginRight: 0.35em` per word and animates only transform/opacity/filter — no layout shift.
- Image slots use fixed heights / aspect ratios throughout (`Services`, `Mission`, `Process`). Good.

### The real perf risks
1. **Oversized source images (High).** Verified via `ls -laS public/images/usage/`: `restaurant-kitchen-2.jpg` **5.2 MB**, `contact-dining.jpg` **4.97 MB**, `case-studies-chef.jpg` **4.89 MB**, `order-counter.jpg` **4.89 MB**, plus several 2 MB+ files. next/image will resize for `<img>` rendering, but: (a) the **OG/Twitter image generators read `restaurant-kitchen-2.jpg` directly** (5 MB into an `ImageResponse`), and (b) any direct/social use ships megabytes. **Action:** run these through the media optimizer; target < 400 KB each. The `.webp` files (e.g. `happy-diners.webp` 332 KB) are the right size — the raw `.jpg`s are the problem.
2. **Blur-filter text animation (Medium).** `BlurText.tsx:74` animates `filter: blur()` over ~1.6 s per word across every heading. `filter` forces per-frame repaints; with 3 multi-word headings above the fold this is the most expensive paint work on the page and a likely INP contributor on mid-range Android. **Action when polishing:** consider dropping the blur and keeping opacity + translateY (cheaper, nearly identical feel), or gate it behind `prefers-reduced-motion`.
3. **framer-motion on every section (Medium).** Heavy lib hydrating broadly. Acceptable today, but it caps the motion budget — adding more should reuse the existing `AnimatedElement`/`whileInView` islands, not introduce new always-on animation libraries.
4. **No `prefers-reduced-motion` (also an a11y issue, see §6).** Animations always fire; this is both an INP and accessibility concern.

### Suggested performance budget for the visual-polish work (so appeal doesn't cost rankings)
- ✅ **Safe to add freely:** `opacity` + `transform` (translate/scale/rotate) reveals and hovers; CSS-only effects; hover lifts on cards.
- ⚠️ **Use sparingly:** anything animating `filter`, `box-shadow`, or `background`; keep simultaneous tickers < 3.
- ⛔ **Avoid:** animating layout props (width/height/top/left); adding a second animation library; more blur-text reveals; auto-playing carousels beyond the one that exists.
- 📏 **Rule:** every new animation must respect `prefers-reduced-motion`, and any new image must be ≤ ~400 KB.

## 6. Accessibility

- **`prefers-reduced-motion`: ABSENT (High).** Verified by repo-wide grep → "No matches found." Nothing in `globals.css` or any component honors it, while the site is animation-dense (BlurText, AnimatedElement, NumberTicker, nav-shrink, button flows). This is a WCAG 2.3.3 concern and the **prerequisite** for adding more motion. *Fix:* one `@media (prefers-reduced-motion: reduce)` block that neutralizes transitions/animations, plus a `useReducedMotion()` guard in `BlurText`/`NumberTicker`.
- **Color contrast (High, needs browser confirmation).** The muted palette is the risk. Approximate ratios on cream `#FAFAF8`: `warm-gray #6B6560` ≈ **3.2:1** (fails AA 4.5 for body), `warm-gray-light #9E9890` ≈ **2.1:1** (fails), `accent #C8553D` ≈ **4.1:1** (borderline fail for normal text). On charcoal these pass. Since `warm-gray` is the default body/description color across Hero, Services, Mission, FAQ, ServicePage, this is widespread. *Fix:* darken the body grays a step (e.g. body text → charcoal/`#4A4640`), reserve the lightest gray for large/decorative text only. (Flag for browser verification — see §10.)
- **Focus indicators (Medium).** shadcn `Button`/`Accordion` have `focus-visible` rings, but the **custom `.flow-btn`, `.nav-link`, `.service-card-btn` in `globals.css` define hover only, no `:focus-visible`** — keyboard users get no visible focus on the primary buttons and nav. *Fix:* add a focus-visible outline to those classes.
- **MobileMenu (Medium).** Toggle is a real `<button>` with `aria-label`, but **no Escape-to-close and no focus trap** (`MobileMenu.tsx`), and the services sub-toggle lacks `aria-expanded`.
- **Forms (Medium).** `ContactForm` labels are properly associated and required fields marked, but no `aria-required`/`aria-invalid`, no live-region error announcement, and the focus ring is faint (`focus:ring-accent/20`).
- **Structure (Low).** No skip-to-content link; confirm a single `<main>` landmark wraps page content.
- **Good:** icons are `aria-hidden`, decorative CTA image `alt=""`, breadcrumb uses `nav[aria-label]`, BlurText leaves real text in the DOM (screen-reader safe, degrades without JS), `@media (pointer: coarse)` enforces 44px targets.

## 7. Visual & UX / section design (polish, not redesign)

Homepage order + layout pattern: **Hero** (split text/image) → **Services** (bento, asymmetric) → **Mission** (image-left + values) → **Partners** (centered grid) → **Process** (centered 3-col) → **Results** (centered stats) → **Testimonials** (carousel) → **FAQ** (split) → **CTA** (dark band).

- **Section monotony (Medium).** Partners, Process, Results are three consecutive "centered SectionLabel + heading + grid of cards" sections — structurally identical. Good variety exists at the ends (Hero/Mission/FAQ split layouts, Testimonials carousel) but the middle sags.
- **Flat light/dark rhythm (Medium).** Background sequence is roughly cream → cream → cream-dark → white → cream → charcoal → cream-dark → cream → cream. Only **one** dark band (Results), and Partners is a one-off `bg-white` that reads accidental. The page feels "light, light, light." *Polish:* convert Partners (or Process) to a dark/`charcoal-light` band so dark sections bracket the middle.
- **Spacing inconsistency (Low).** Section padding drifts: mostly `py-16 md:py-28`, but Results is `py-20 md:py-28` and Hero has custom tight bottom padding, with no clear logic. Normalize to a small set of spacing tokens.
- **Missing hover affordances (Low/quick win).** Service cards have a nice hover (image scale + arrow), but Partners/Results/Process stat & step cards are static. A subtle `hover:-translate-y-1 hover:shadow` adds life cheaply.
- **Mission value numbers (Low).** `Mission.tsx:92` renders 01/02/03 at `text-sm` — they read as footnotes, not pillars; bump size/weight.
- **CTA wording split (Medium, also CRO).** Hero CTA = "Get a Free **Report**" (`Hero.tsx:37`); every other CTA = "Get a Free **Consultation**." Two different promises. Pick one (and if "Report," it implies the grader-report flow — make sure the link delivers that).
- **Restrained polish shortlist (all on-brand, low risk):**
  1. [quick] Add a sticky mobile CTA bar (`md:hidden`, "Get a Free Consultation" → `/contact`).
  2. [quick] Convert one mid-page section to a dark band for rhythm.
  3. [quick] Hover-lift on Partners/Results/Process cards.
  4. [quick] Alternate Mission to image-right to break the "image-left" repetition.
  5. [quick] Normalize section padding + bump Mission value numbers.
  6. [quick] Add a thin section divider pattern (Mission already has one at `:51`) between the middle sections.
  7. [medium] A "Still have questions?" soft CTA under the FAQ.
  8. [medium] Add `prefers-reduced-motion` support first, then a single tasteful scroll-reveal refinement — not more blur.

## 8. Content depth / E-E-A-T

- **Service pages are genuinely deep** (`service-data.ts`): each has 6 features, 4 sourced stats, 5 FAQs (~ rich page). This is the site's strongest content asset.
- **City pages are templated, not unique** (`location-service-helpers.ts:18-31`): title/headline get the city name; description gets a **single-period substitution** (`:26`); features/stats/FAQs are identical across all cities. (Also Part 1 §thin-content.)
- **No team / founder / author anywhere** — verified absence of a team page or bios. For an agency, this is the biggest E-E-A-T gap; Google and prospects both want a face and credentials.
- **Results are partners', not ours.** The headline numbers (+377%, $4.5M, $2M+, $288K) are Owner.com/ChowNow case studies with sources — credible, but there are **no TableTurnerr-attributed before/after results**. Real named clients exist (Grill Shack, Miss Mat Cafe, Texbbq, Qadeer Coffee) but without outcome numbers.
- **Blog hollow** (Part 1) — kills the top-of-funnel/long-tail content layer entirely, despite a ready backend.
- **No pricing/packages** — only "custom quote after consultation." Defensible for an agency, but a "how pricing works" / "what's included" page reduces friction.
- **Top content gaps:** (1) team/founder page; (2) unique city content; (3) launch the blog; (4) at least one real TableTurnerr case study with numbers.

## 9. Conversion (CRO)

- **Contact form has no backend (High).** Verified: `ContactForm.tsx:28-31` simulates a 600 ms timeout then shows success — **submissions are silently discarded.** Every lead from the contact page is currently lost. Also no captcha (spam exposure once wired). *This is arguably a Blocker for a lead-gen site.*
- **CTA wording split (Medium):** Report vs Consultation (see §7).
- **No social proof above the fold (Medium):** client logos live on `/about`, testimonials on `/case-studies`; the homepage hero has none. A logo strip / "trusted by Texas restaurants" near the hero CTA would lift conversion.
- **No sticky mobile CTA / weak phone prominence (Medium):** primary CTA only at top and bottom; nothing persistent on mobile; click-to-call only on `/contact`.
- **Generic anchors (Low):** "Learn more" ×4 (`Services.tsx:91,123`, `services/page.tsx:191`, `ServicePage.tsx:238`) — make them "Explore {service}" for both CRO and anchor-text SEO.
- **Good:** risk-reversal copy ("free, no obligation"), 24-hour response promise, consistent primary CTA elsewhere.

## 10. Internal-link graph

- **All 60 service×city pages are orphaned — sitemap-only (High).** Verified: city slugs appear only inside each city page's own metadata/schema URLs, the admin tool, and `sitemap.ts` — **no `<Link>` points to them** from nav, footer, service pages, or body. Service pages' "Other Services" links go to sibling *services*, never to city variants; breadcrumbs only point upward. There is **no `/locations` or `/near` index** (confirmed: neither directory exists). Result: Google may crawl them from the sitemap but they receive ~no internal PageRank and no user path — the whole local play is structurally undercut. *Fix:* build a `/locations` (or `/services/[service]/locations`) hub, add a "Serving Texas cities" block to service pages linking each city variant, and cross-link city siblings.
- **`/blog` advertised but hollow** in nav + footer + sitemap (Part 1).
- **Generic anchor text** (see §9).
- **Sitemap base URL hardcoded** instead of `SITE_CONFIG.url` (`sitemap.ts:6`) — drift risk.

## 11. Needs a human at a browser (could not verify statically)

1. **Live Core Web Vitals** (Lighthouse mobile, slow 4G): real LCP/INP/CLS, especially INP with the blur-text animation, and confirm the 5 MB JPEGs aren't being served at full size anywhere.
2. **Contrast** — confirm the warm-gray AA failures with a contrast checker on the live palette before recoloring.
3. **Mobile layout** at 360/390/414 px: hero 2-col→1-col reflow, Services bento padding tightness, sticky-CTA overlap.
4. **Keyboard pass:** tab the whole site — focus visibility on `.flow-btn`/`.nav-link`, MobileMenu Escape/trap, FAQ accordion.
5. **Rich Results validation:** paste service + city pages into Google's Rich Results Test (Service, Breadcrumb, FAQ, Organization) and confirm no errors — and that the broken `/images/og/default.jpg` logo doesn't invalidate Organization.
6. **Form submission** once wired — confirm leads actually arrive.

## Consolidated priority roadmap

**P0 — Lost-leads & crawl hygiene (this week, our ownership):**
1. Wire the contact form to Supabase + spam protection. *(every lead currently dropped — TOP priority)*
2. Blog: keep in nav/sitemap (real posts coming in 2-3 days), but polish the stub + temporarily `noindex` the empty pages so Google doesn't index "Coming Soon"; lift noindex when posts ship.
3. Fix the dead `/images/og/default.jpg` (OG cards + Organization logo/image).
4. NAP: leave Pakistan address (real/current); revisit when TX entity registers — then move NAP into `SITE_CONFIG` + add `LocalBusiness` schema.

**P1 — Texas pivot foundation:**
5. Texas into global title/description/keywords (`layout.tsx`) + schema `areaServed` → Texas + add `LocalBusiness` with real NAP.
6. Build the locations hub + internal links so the 60 city pages aren't orphaned.
7. Make city pages unique (per-city content) **before** expanding the city list.

**P2 — Accessibility & performance (do before adding polish):**
8. Add `prefers-reduced-motion` support globally.
9. Compress the 5 MB+ source images (media optimizer).
10. Darken body grays to pass contrast; add focus-visible rings to custom buttons.

**P3 — Visual polish & CRO (the appeal layer, now safe to add):**
11. Sticky mobile CTA; unify CTA wording; social proof near hero.
12. Section rhythm: one dark band in the middle, hover lifts, Mission image-right, padding normalize, FAQ soft-CTA.
13. Descriptive anchor text; Review/AggregateRating schema on `/case-studies`.

**P4 — Depth:**
14. Team/founder page; launch blog with interlinked posts; one real TableTurnerr case study with numbers.

*Sequencing logic: P0 stops active harm (foreign NAP, dropped leads, crawl waste). P1 makes Texas rankable. P2 is the gate before polish — reduced-motion + image weight must land first so the appeal work in P3 doesn't regress CWV or a11y. P3 is the "visually appealing, user-friendly, not overdone" layer you asked for. P4 compounds over time.*
