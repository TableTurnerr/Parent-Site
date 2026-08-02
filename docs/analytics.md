# Analytics architecture

TableTurnerr uses Cloudflare Web Analytics as its privacy-friendly traffic and performance baseline, and PostHog as the consent-gated behavioral source of truth. Vercel Analytics and Speed Insights remain installed for operational performance monitoring. GA4 is deliberately not loaded by the application: configure it only through Cloudflare Zaraz after a business need and valid measurement ID exist.

## Environment

Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, and `NEXT_PUBLIC_POSTHOG_HOST` in production. `NEXT_PUBLIC_ANALYTICS_DEBUG=true` permits deliberate local debugging. Browser project tokens are public by design; do not add a PostHog personal API key or server key to a `NEXT_PUBLIC_` variable.

Use `https://www.tableturnerr.com/ingest` as `NEXT_PUBLIC_POSTHOG_HOST` only after the Cloudflare proxy below is deployed. Until then use the regional PostHog host. The CSP currently permits the US PostHog hosts; replace those directives with the first-party host after the proxy is verified.

## Consent and privacy

Cloudflare Web Analytics may operate where permitted as the aggregate baseline. PostHog analytics is off until the visitor accepts Analytics; session replay/heatmaps require the separate Replay choice. Rejecting or withdrawing consent calls PostHog opt-out and stops recording. The footer’s **Privacy choices** link changes a saved preference.

Lead forms have `data-analytics-mask`; form values, email, phone, messages, passwords, payment values, private query parameters, and raw IP addresses are never sent as application event properties. URLs are reduced to a sanitized path/query/hash, removing token-like keys, e-mail values, and IDs. IP-derived location should be described in reporting as approximate only.

Before enabling production replay, set PostHog to mask inputs by default, block `/admin`, `/portal`, `/login`, billing, and authenticated account pages, disable network-body capture, and inspect test recordings. Use a sampled recording rate rather than 100%.

## Event dictionary

The typed names are in `app/lib/analytics/events.ts`: `page_viewed`, `section_viewed`, `section_engagement`, `scroll_milestone_reached`, `navigation_clicked`, `outbound_link_clicked`, `faq_opened`, `faq_closed`, `feature_card_opened`, `feature_card_closed`, `primary_cta_clicked`, `secondary_cta_clicked`, `pricing_viewed`, `pricing_plan_selected`, `free_trial_started`, `free_trial_completed`, `demo_booking_started`, `demo_booking_completed`, `contact_form_started`, `contact_form_submitted`, `contact_form_error`, `promotion_viewed`, `promotion_closed`, `promotion_claim_started`, `promotion_claim_completed`, `frontend_error`, `web_vital_recorded`, and `resource_load_error`.

Current automatic properties include sanitized `page_path`, title, viewport category, landing page, referrer domain, allowed UTM values, first- and last-touch source. Homepage sections marked with `data-analytics-section` emit `section_viewed` after one visible second and a summarized `section_engagement` on exit/unload. Scroll milestones are emitted once at 10, 25, 50, 75, 90, and 100 percent. Do not call PostHog directly in components; add a typed event and call `capture()` from `app/lib/analytics/client.ts`.

## Cloudflare actions

1. In Cloudflare Web Analytics, verify whether the zone automatically injects the beacon. If it does, do not add a beacon to Next.js. If it does not, enable the dashboard beacon and permit it in CSP.
2. Verify visits, paths, referrers, device data, country, bot filtering, and Web Vitals in the Cloudflare dashboard after deployment.
3. For first-party PostHog ingestion, deploy a Worker route only for `www.tableturnerr.com/ingest/*`. Allowlist PostHog’s exact US API and asset origins, forward method/body/required headers to the matching fixed origin, preserve `/e/`, `/decide/`, and static assets, strip the inbound host, and set `Cache-Control: no-store` on ingestion responses. Never accept a destination URL from the request, and do not add credentials to the Worker.
4. Optional: configure Logpush with privacy-filtered fields to R2 for edge, bot, cache, and region analysis. Do not retain raw IP addresses by default.

## PostHog actions and verification

Create insights for executive overview, acquisition/geography, section engagement, conversion funnel, and UX/performance. The funnel should be `page_viewed → section_viewed(hero) → scroll_milestone_reached(50) → pricing_viewed → primary_cta_clicked → contact_form_started → free_trial_completed/demo_booking_completed`, with device/source/campaign/landing-page breakdowns. Configure approximate geography and retention in PostHog, then use live events and replay masking tests before claiming production collection works.

Cloudflare and PostHog will differ because Cloudflare uses edge measurements while PostHog is consent-, blocker-, and session-definition-dependent. Exclude internal traffic in each product using your company IP/device rules. If counts are duplicated, confirm `capture_pageview: false`, inspect only one `page_viewed` per navigation, and check that neither Zaraz nor GA4 mirrors PostHog events.

## Release checklist

Test direct, UTM, returning, mobile, hidden-tab, idle, rapid-scroll, back-navigation, accepted/rejected/withdrawn consent, blocked analytics, successful and failed lead submissions, FAQ, product-card, and promotion flows. Analytics failures must never affect navigation or forms. Run `pnpm lint` and the production build after changes.
