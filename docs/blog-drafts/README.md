# Blog drafts

Publish-ready blog post drafts for the TableTurnerr blog. Written as markdown so they can be reviewed/edited in git, then pasted into the admin editor (`/admin/posts`) to publish. These are NOT auto-synced to Supabase; publishing is a manual paste-and-publish step in the admin tool.

## How to publish a draft
1. Open the draft, review/edit the copy.
2. In `/admin/posts`, create a new post.
3. Copy `title`, `slug`, `meta_title`, `meta_description`, `meta_keywords`, and `excerpt` from the frontmatter into the matching admin fields.
4. Paste the body (everything below the frontmatter) into the content editor.
5. Set a featured image (real photo, descriptive alt, no AI product images).
6. Set status to published + visibility public when ready.

## Drafts

Each post links to a different service page so every node in the service mesh has blog support (all 6 services now covered).

| # | File | Title | Pillar | Primary service |
|---|------|-------|--------|----------|
| 01 | [doordash-ubereats-grubhub-real-cost](01-doordash-ubereats-grubhub-real-cost.md) | How Much DoorDash, Uber Eats, and Grubhub Really Cost Your Restaurant | Pain to solution | commission-free-deliveries |
| 02 | [how-to-rank-restaurant-google-maps](02-how-to-rank-restaurant-google-maps.md) | How to Rank Your Restaurant on Google Maps | Educational | restaurant-seo |
| 03 | [restaurant-seo-checklist](03-restaurant-seo-checklist.md) | The Restaurant SEO Checklist | Educational | restaurant-seo |
| 04 | [how-to-get-more-google-reviews](04-how-to-get-more-google-reviews.md) | How to Get More Google Reviews for Your Restaurant | Educational | google-business-profile-optimization |
| 05 | [restaurant-website-design-that-converts](05-restaurant-website-design-that-converts.md) | Restaurant Website Design That Actually Converts Diners | Educational | restaurant-website-design |
| 06 | [google-ads-for-restaurants-cost](06-google-ads-for-restaurants-cost.md) | Google Ads for Restaurants: What It Costs and What to Expect | Educational | google-ads |
| 07 | [how-to-write-menu-descriptions-that-sell](07-how-to-write-menu-descriptions-that-sell.md) | How to Write Menu Descriptions That Sell | Educational | restaurant-branding |
| 08 | [why-restaurant-not-showing-up-on-google](08-why-restaurant-not-showing-up-on-google.md) | Why Your Restaurant Isn't Showing Up on Google | Educational | google-business-profile-optimization |
| 09 | [avoid-delivery-app-commissions-playbook](09-avoid-delivery-app-commissions-playbook.md) | How to Avoid Uber Eats, Grubhub & DoorDash Commissions: A Restaurant Owner's Playbook | Pain to solution | commission-free-deliveries (pillar/hub, ~1800 words, links 5 services) |

### Note on #01 vs #09
Both are about delivery commissions but from different angles, so they complement rather than duplicate: **#01** is awareness ("here is what it costs you"), **#09** is the solution playbook ("here is how to escape it"). Publish #09 as the cornerstone/pillar and #01 as a shorter supporting post that links up to it. #09 is a cleaned-up version of an existing draft that was already in the admin dashboard (em-dashes removed; Square/Toast competitor mentions removed in favor of Owner.com + ChowNow).

## House rules applied
- One primary keyword per post (title, slug, meta, first 100 words).
- Internal links to the relevant service page + the savings calculator.
- Closing CTA to /contact.
- No em-dashes (commas / colons / parentheses instead).
- No invented stats; reuses figures already cited on the site (15 to 30 percent commission, etc.).
- No AI-generated product photos; pick a real featured image at publish time.

## Strategy
Full plan + 20-post calendar: [../content-strategy-2026-05-31.md](../content-strategy-2026-05-31.md)
