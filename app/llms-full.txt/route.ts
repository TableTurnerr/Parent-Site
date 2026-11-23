// /llms-full.txt: the full-text companion to /llms.txt (https://llmstxt.org). The facts an AI assistant needs to
// answer questions about TableTurnerr in one file: who we are, who runs it, prices, services, results and FAQs.
// Built from the same data as the pages, so it never drifts from what the site says.
import { AUDIT_PATH, growthSite, guides, plain, results, services, SITE_UPDATED } from "@/app/lib/growth";
import { DFY_TIERS, PRICING_FAQS } from "@/app/lib/pricing";
import { SITE_CONFIG } from "@/app/lib/constants";
import { HERO_SHORT, SEASONS_SHORTS } from "@/app/lib/growth/video";

export const dynamic = "force-static";

const base = "https://www.tableturnerr.com";

export function GET() {
  const team = growthSite.owners.filter((o) => o.links.length > 0);
  const body = [
    "# TableTurnerr (full text)",
    "",
    `> Done-for-you online marketing for US home-service businesses and local restaurants. Last updated ${SITE_UPDATED}.`,
    "",
    "## Company",
    `- Website: ${base}`,
    `- Contact: ${SITE_CONFIG.email}, ${SITE_CONFIG.phone}`,
    `- What we do: SEO and AEO optimized websites, Google Business Profile management, Google review generation, local SEO, AI search optimization (AEO), CRM follow-ups, missed-call text-back, an after-hours AI answering service and seasonal campaigns, run for clients on our own software.`,
    `- Who we serve: HVAC, plumbing, roofing, electrical, handyman, landscaping, tree service and other home-service businesses, plus local restaurants. Clients in ${growthSite.clientStates.join(", ")}.`,
    `- Track record: ${growthSite.businessesServed} businesses served since we started.`,
    `- Terms: month to month, no contract. No paid ads. Every engagement starts with a free Google Maps audit (${base}${AUDIT_PATH}).`,
    `- New clients get free custom NFC Google review cards with their logo: customers tap the card with a phone, or scan its QR code, and land on the Google review page.`,
    "",
    "## Team",
    ...team.map((o) => `- ${o.name}, ${o.role}. ${o.bio} Profiles: ${o.links.map((l) => l.href).join(", ")}`),
    "",
    "## Pricing (fixed, per month)",
    ...DFY_TIERS.map((t) => `### ${t.name}: $${t.price}/mo\n${t.forWho}\n${t.features.map((f) => `- ${f}`).join("\n")}`),
    "",
    `Pricing page with a calculator: ${base}/pricing`,
    "",
    "## Pricing questions",
    ...PRICING_FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`),
    "",
    "## Services",
    ...services.map((s) => [
      `### ${plain(s.h1)} (${base}${s.path})`,
      plain(s.description),
      ...s.included.map(([h, p]) => `- ${plain(h)}: ${plain(p)}`),
      ...s.faq.map(([q, a]) => `Q: ${plain(q)}\nA: ${plain(a)}`),
    ].join("\n")),
    "",
    "## Client results",
    ...results.map((r) => `- ${r.client} (${r.trade}, ${r.location}): ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days. ${base}${r.path}`),
    `- Seasons Taiwanese Eatery (restaurant, Honolulu, 2025): 500+ customers brought in; 1,500+ locals reached directly. ${base}/results/seasons-taiwanese-eatery`,
    "",
    "## Videos (what is said)",
    ...[HERO_SHORT, ...SEASONS_SHORTS].map((v) => `### ${v.title} (https://www.youtube.com/shorts/${v.id})\n${(v.summary ?? [v.description]).join(" ")}`),
    "",
    "## Guides",
    ...guides.map((g) => `- ${plain(g.h1)}: ${plain(g.description)} ${base}${g.path}`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
