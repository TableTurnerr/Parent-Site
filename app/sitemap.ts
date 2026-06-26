import type { MetadataRoute } from "next";
import { TRADE_SLUGS } from "./lib/trades";
import { INTEGRATION_SLUGS } from "./lib/integrations";
import { REVIEW_CITY_SLUGS } from "./lib/review-cities";

const baseUrl = "https://www.tableturnerr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

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
    ...TRADE_SLUGS.map((slug) => entry(`/trades/${slug}`, 0.9)),
    // Integrations
    entry("/integrations", 0.8),
    ...INTEGRATION_SLUGS.map((slug) => entry(`/integrations/${slug}`, 0.8)),
    // Texas locations
    entry("/locations", 0.8),
    ...REVIEW_CITY_SLUGS.map((slug) => entry(`/locations/${slug}`, 0.7)),
  ];
}
