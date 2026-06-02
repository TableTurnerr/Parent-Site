# Content strategy & editorial calendar — 2026-05-31

How the TableTurnerr blog earns traffic and leads. TableTurnerr is a **national** US restaurant-marketing agency; content targets terms restaurant owners search, and the blog itself doubles as proof we know SEO.

## The core idea

Every post does two jobs:
1. **Ranks for a term a restaurant owner would Google** (demand capture).
2. **Demonstrates competence** — an agency whose own blog ranks *is* the sales pitch.

So: one primary keyword per post, each post links to the relevant service page ("...or we'll do it for you"), and that internal link is the conversion engine.

## Cadence

**2–3 articles per week.** Sustainable, enough to build topical authority without thinning quality. Suggested rhythm: 2 educational + up to 1 case study / trends piece per week.

## The five pillars

| # | Pillar | Mix | Funnel | Notes |
|---|---|---|---|---|
| 1 | Educational / how-to | ~40% | Top | Fastest to rank, no client data needed, proves expertise |
| 2 | Pain → solution | ~20% | Mid | Maps to services (esp. commission-free) |
| 3 | Case studies / results | ~15% | Bottom | Build over time as real numbers come in; mix real + honestly-framed partner data |
| 4 | Local / geo | ~15% | Mid | Feeds the city-page SEO play |
| 5 | Trends / industry | ~10% | Top | Freshness, shareability, links |

Lead educational-heavy early; shift toward case studies as the results bank grows.

## Per-post checklist

- One primary keyword in title (H1), URL slug, meta title, first 100 words.
- Meta title + description set (the admin editor supports both).
- Featured image with descriptive alt (no AI-generated product photos — house rule).
- At least one internal link to the relevant **service page**, one to another post.
- A closing CTA to `/contact` ("Get a Free Consultation").
- No em-dashes in body copy (house rule; commas/parentheses instead).
- Reading time / excerpt filled (drives the index cards).

## Starter calendar — first ~20 posts (mapped to keyword + pillar + service link)

> Validate volumes/difficulty in Keyword Planner/Ubersuggest before committing; these are seed targets, not researched numbers.

**Educational (pillar 1)**
1. How to rank your restaurant on Google Maps → `restaurant SEO` page
2. Restaurant SEO checklist (the complete guide) → `restaurant SEO`
3. Why your restaurant isn't showing up on Google → `google-business-profile-optimization`
4. How to set up Google Business Profile for a restaurant → `google-business-profile-optimization`
5. Local SEO for restaurants: a beginner's guide → `restaurant SEO`
6. How to get more Google reviews for your restaurant → `google-business-profile-optimization`
7. Restaurant website design best practices that convert → `restaurant-website-design`
8. How to write menu descriptions that sell → `restaurant-branding`

**Pain → solution (pillar 2)**
9. How much DoorDash/UberEats really costs your restaurant → `commission-free-deliveries`
10. Commission-free online ordering: is it worth it? → `commission-free-deliveries`
11. Third-party apps vs your own ordering: the real math → `commission-free-deliveries`
12. Why restaurants lose money on delivery (and the fix) → `commission-free-deliveries`

**Local / geo (pillar 4)**
13. Restaurant marketing in [City]: what works → `/locations` + city pages
14. How [cuisine] restaurants can stand out locally → `restaurant SEO`
15. Near me searches: how restaurants win them → `restaurant SEO`

**Trends / industry (pillar 5)**
16. Restaurant marketing trends 2026 → home/services
17. AI tools every restaurant should know → services
18. Google Ads for restaurants: cost + what to expect → `google-ads`

**Case study / results (pillar 3 — as data allows)**
19. How [client] grew online orders by X% → `/case-studies` + service
20. Commission-free ordering + Turnerr Deliver: the real math on keeping your margin → `commission-free-deliveries`

## Publishing flow (already built)

Write/publish in the in-house admin (`/admin/posts`) → sets `status='published'`, `visibility='public'` in `blog_posts`. The public reader (`/blog`, `/blog/[slug]`, built 2026-05-31) renders published+public posts with Article schema, SEO metadata, and sitemap entry. Hourly ISR means a published post appears within ~an hour without a redeploy.

## What's intentionally NOT here yet

- Real keyword volumes (pending Aleee's Keyword Planner/Ubersuggest research — slot them against the calendar above).
- Blog categories taxonomy on the public side (the `categories` table + admin exist; public category pages can come later if the post count justifies them).
