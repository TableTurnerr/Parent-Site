import type { MetadataRoute } from "next";
import { INDUSTRY_SLUGS } from "./lib/industries";
import { FEATURE_SLUGS } from "./lib/features";
import { INTEGRATION_SLUGS } from "./lib/integrations";
import { ALTERNATIVE_SLUGS } from "./lib/alternatives";
import { REVIEW_CITY_SLUGS } from "./lib/review-cities";
import { getPublishedPostSlugs } from "./lib/blog";

const baseUrl = "https://www.tableturnerr.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified?: Date
  ): MetadataRoute.Sitemap[number] => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  });

  const posts = await getPublishedPostSlugs();

  return [
    entry("", 1.0, "weekly"),
    // Core marketing pages
    entry("/about", 0.7),
    entry("/pricing", 0.8),
    entry("/seo", 0.6),
    entry("/signup", 0.8),
    entry("/contact", 0.7),
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
    // Industry and feature hubs
    entry("/industries", 0.8),
    ...INDUSTRY_SLUGS.map((slug) => entry(`/industries/${slug}`, 0.9)),
    entry("/features", 0.8),
    ...FEATURE_SLUGS.map((slug) => entry(`/features/${slug}`, 0.8)),
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
      entry(`/blog/${p.slug}`, 0.6, "monthly", p.updated_at ? new Date(p.updated_at) : undefined)
    ),
  ];
}
