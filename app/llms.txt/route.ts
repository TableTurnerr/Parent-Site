// /llms.txt: a plain-text map of the site for AI assistants (https://llmstxt.org). Built from the same data as the pages.
import { INDUSTRIES, INDUSTRY_SLUGS } from "@/app/lib/industries";
import { AUDIT_PATH, guides, plain, results, services, trades } from "@/app/lib/growth";
import { SITE_CONFIG } from "@/app/lib/constants";

export const dynamic = "force-static";

const base = "https://www.tableturnerr.com";
const line = (path: string, name: string, desc?: string) => `- [${plain(name)}](${base}${path})${desc ? `: ${plain(desc)}` : ""}`;

export function GET() {
  const body = [
    "# TableTurnerr",
    "",
    "> TableTurnerr helps home-service businesses (HVAC, plumbing, roofing, electrical and more) win more calls from Google. Review automation software that sends review requests after every job, plus done-for-you marketing: Google Business Profile management, review generation, local SEO, websites and missed-call text-back.",
    "",
    `Contact: ${SITE_CONFIG.email} · ${SITE_CONFIG.phone}`,
    "",
    "## Start here",
    line("/", "Home", "Review automation for home-service pros."),
    line(AUDIT_PATH, "Free Google Maps audit", "Ranking heatmap, top 5 competitors, AI-assistant visibility and a homepage check, free."),
    line("/pricing", "Pricing"),
    line("/features", "Features"),
    line("/about", "About"),
    "",
    "## Marketing by trade",
    ...trades.map((t) => line(t.path, t.title.replace(/ \| TableTurnerr$/, ""), t.description)),
    "",
    "## Done-for-you services",
    ...services.map((s) => line(s.path, s.short, s.description)),
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
