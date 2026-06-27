import type { MetadataRoute } from "next";
import { TRADE_SLUGS } from "./lib/trades";
import { INTEGRATION_SLUGS } from "./lib/integrations";
import { ALTERNATIVE_SLUGS } from "./lib/alternatives";
import { REVIEW_CITY_SLUGS } from "./lib/review-cities";
import { getPublishedPostSlugs } from "./lib/blog";

const baseUrl = "https://www.tableturnerr.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const posts = await getPublishedPostSlugs();

  return [
    entry("", 1.0, "weekly"),
    // Core marketing pages
    entry("/about", 0.7),
    entry("/seo", 0.6),
    entry("/signup", 0.8),
    entry("/contact", 0.7),
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
    // Trades
    entry("/trades", 0.8),
    ...TRADE_SLUGS.map((slug) => entry(`/trades/${slug}`, 0.9)),
    // Integrations
    entry("/integrations", 0.8),
    ...INTEGRATION_SLUGS.map((slug) => entry(`/integrations/${slug}`, 0.8)),
    // Competitor alternatives (high-intent comparison pages)
    entry("/alternatives", 0.8),
    ...ALTERNATIVE_SLUGS.map((slug) => entry(`/alternatives/${slug}`, 0.8)),
    // Texas locations
    entry("/locations", 0.8),
    ...REVIEW_CITY_SLUGS.map((slug) => entry(`/locations/${slug}`, 0.7)),
    // Blog
    entry("/blog", 0.7, "weekly"),
    ...posts.map((p) =>
      entry(`/blog/${p.slug}`, 0.6, "monthly", p.updated_at ? new Date(p.updated_at) : now)
    ),
  ];
}
