// /llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org). Built from the same data as the pages.
import { INDUSTRIES, INDUSTRY_SLUGS } from "@/app/lib/industries";
import { AUDIT_PATH, combos, guides, plain, results, services, trades } from "@/app/lib/growth";
import { SITE_CONFIG } from "@/app/lib/constants";
import { PODCAST, VSL, podcastWatchUrl, vslWatchUrl } from "@/app/lib/growth/video";
import { tools } from "@/app/lib/growth/tools";

export const dynamic = "force-static";

const base = "https://www.tableturnerr.com";
const line = (path: string, name: string, desc?: string) => `- [${plain(name)}](${base}${path})${desc ? `: ${plain(desc)}` : ""}`;

export function GET() {
  const body = [
    "# TableTurnerr",
    "",
    "> TableTurnerr is a small, owner-run online marketing agency for US home-service businesses (HVAC, plumbing, roofing, electrical, handyman and more), with its own software behind the work. Done for you, month to month: websites and local SEO, Google Business Profile management, Google review generation, CRM and automations, seasonal campaigns, missed-call text-back and AI-search visibility. Every engagement starts with a free Google Maps audit. We have served 50+ businesses since we started.",
    "",
    `Contact: ${SITE_CONFIG.email} · ${SITE_CONFIG.phone}`,
    "",
    `Full text (team, prices, services, FAQs, results): ${base}/llms-full.txt`,
    "",
    "## Start here",
    line("/", "Home", "Done-for-you online marketing for home-service businesses: websites, SEO and AEO, Google Business Profile, reviews, CRM and automations."),
    line(AUDIT_PATH, "Free Google Maps audit", "Ranking heatmap, top 5 competitors, AI-assistant visibility and a homepage check, free."),
    line("/services", "Done-for-you services", "Everything we run for home-service businesses, month to month."),
    line("/services/everything-we-set-up", "Everything we set up", "The full list of what we set up for home-service companies, with an example and the limits of each, and what we don't replace."),
    line("/seo", "SEO & AEO", "Local SEO plus answer engine optimization: get found on Google and recommended by ChatGPT, Gemini, Perplexity and Google AI answers."),
    line("/pricing", "Pricing", "Five packages, each with everything in the one before: Reviews $97, Starter $297, Growth $597 (adds 24/7 AI answering, 150 min), Complete $797 and Partner $1,797 a month. Extra AI minutes $0.40. Packages are fixed; custom pricing on a call. No contracts, 2 months free yearly."),
    `- [Price list in Markdown](${base}/pricing.md): every plan and single-service price as a table, with worked AI-minute examples.`,
    line("/services/ai-answering-service", "AI answering service", "24/7 AI receptionist for home-service businesses. Live demo line: (270) 207-9006."),
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
    "## Free tools",
    line("/tools", "Free tools for home-service businesses"),
    ...tools.map((t) => line(t.path, t.name, t.description)),
    "",
    line("/glossary", "Glossary", "Plain-English definitions of marketing, texting, CRM and pricing terms for contractors."),
    "",
    "## Results",
    `- [Podcast: ${PODCAST.title}](${podcastWatchUrl}): ${PODCAST.durationLabel} interview with our client Adrian Alvarez of Presidential Roofing.`,
    ...results.map((r) => line(r.path, `${r.client}: ${r.reviewsBefore} to ${r.reviewsAfter} Google reviews in ${r.days} days`)),
    line("/results/cooling-comfort", "Cooling Comfort Inc. (HVAC, Inglewood, CA): Google Business Profile verified 3 days after one free call, after months stuck"),
    line("/results/seasons-taiwanese-eatery", "Seasons Taiwanese Eatery (Honolulu restaurant, 2025): 500+ customers brought in, with video"),
    "",
    "## Review software by industry",
    ...INDUSTRY_SLUGS.map((slug) => line(`/industries/${slug}`, INDUSTRIES[slug].name)),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
