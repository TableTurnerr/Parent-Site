# New site — review automation for home services

Docs for the current TableTurnerr: review automation for HVAC, roofing, plumbing
and electrical pros.

## research/
- **`niche-analysis-2026-06.md`** — the full competitive/market analysis of the
  review-automation niche (competitor matrix, table-stakes vs differentiators,
  pricing, compliance do's/don'ts, prioritized "what we do better"). Verified via
  multi-agent deep research.
- **`niche-analysis-2026-06.html`** — same report, formatted for sharing. Open in a
  browser or VSCode Live Preview.
- **`niche-research-raw-2026-06.json`** — raw verified research output (claims,
  confidence, sources, refuted claims) for provenance.

## reports/
Reports for the new site go here (audits, monthly summaries, etc.).
- **`site-audit-2026-06.html`** — deep launch-readiness audit of the new site
  (architecture, technical SEO, performance, content/conversion/compliance, backend,
  brand cleanup) with a readiness scorecard + prioritized action plan. Verdict: B-
  (72/100) — strong build, unfinished funnel + legal layer. Open in Live Preview.

## Report skin (house template)
All reports use **our own report skin** — the editorial `.report-page` consulting
layout we built for the client/internal reports (canonical CSS:
[`components/report/report.css`](../../components/report/report.css)). It's the same
sticky-sidebar + collapsible-section + right-rail look as
`reports-archive/tableturnerr/2026-06/*.html`.

[`research/niche-analysis-2026-06.html`](research/niche-analysis-2026-06.html) is
the reference build. To make a new standalone report: **copy that file, keep the
`<style>` + the shell (meta-strip / sidebar / main / rail) + the script, swap the
content.** Components: hero + `.verdict` grade-card, `.rp-collapsible` sections,
`.competitor-list` (+ `.is-you` row), `.win-lose`, `.rival-grid`,
`.reviews-split` (green/orange two-column compare), `.report-table`, `.ap-table`
action plan, `.callout`, `.prose`, and the right-rail `.section-nav`.
