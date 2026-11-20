// /llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org). Built from the same data as the pages.
import { INDUSTRIES, INDUSTRY_SLUGS } from "@/app/lib/industries";
import { AUDIT_PATH, combos, guides, plain, results, services, trades } from "@/app/lib/growth";
import { SITE_CONFIG } from "@/app/lib/constants";
import { VSL, vslWatchUrl } from "@/app/lib/growth/video";

export const dynamic = "force-static";

const base = "https://www.tableturnerr.com";
const line = (path: string, name: string, desc?: string) => `- [${plain(name)}](${base}${path})${desc ? `: ${plain(desc)}` : ""}`;

export function GET() {
  const body = [
    "# TableTurnerr",
    "",
    "> TableTurnerr is a small, owner-run online marketing agency for US home-service businesses (HVAC, plumbing, roofing, electrical, handyman and more), with its own software behind the work. Done for you, month to month: websites and local SEO, Google Business Profile management, Google review generation, CRM and automations, seasonal campaigns, missed-call text-back and AI-search visibility. Owners who prefer to run it themselves can use the self-serve review and growth software from $80/mo. Every engagement starts with a free Google Maps audit.",
    "",
    `Contact: ${SITE_CONFIG.email} · ${SITE_CONFIG.phone}`,
    "",
    "## Start here",
    line("/", "Home", "Done-for-you online marketing and review software for home-service businesses."),
    line(AUDIT_PATH, "Free Google Maps audit", "Ranking heatmap, top 5 competitors, AI-assistant visibility and a homepage check, free."),
    line("/services", "Done-for-you services", "Everything we run for home-service businesses, month to month."),
    line("/pricing", "Pricing", "Custom done-for-you plans: around $100-300/mo for one or two services, about $500/mo for the full program, about $1,000/mo with ads, after-hours AI answering and more attention. Quoted after the free audit. Self-serve software from $80/mo."),
    line("/about", "About", "Who we are, how we work and our rules (no fake reviews, no review gating)."),
    line("/features", "Software features"),
    `- [Video: ${VSL.title}](${vslWatchUrl}): 6-minute overview of what we do and what it costs.`,
    "",
    "## Marketing by trade",
    ...trades.map((t) => line(t.path, t.title.replace(/ \| TableTurnerr$/, ""), t.description)),
    "",
    "## Done-for-you services",
    ...services.map((s) => line(s.path, s.short, s.description)),
    "",
    "## Services by trade",
    ...combos.map((c) => line(c.path, c.title, c.description)),
    "",
    "## Guides",
    ...guides.map((g) => line(g.path, g.h1, g.description)),
    "",
    "## Results",
    ...results.map((r) => line(r.path, `${r.client}: ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days`)),
    "",
    "## Review software by industry",
    ...INDUSTRY_SLUGS.map((slug) => line(`/industries/${slug}`, INDUSTRIES[slug].name)),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
