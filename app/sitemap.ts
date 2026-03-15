import type { MetadataRoute } from "next";
import { SERVICES } from "./lib/constants";
import { TARGET_CITIES } from "./lib/location-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tableturnerr.com";
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Location-specific service pages (service x city combinations)
  const locationPages: MetadataRoute.Sitemap = SERVICES.flatMap((service) =>
    TARGET_CITIES.map((city) => ({
      url: `${baseUrl}/services/${service.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    ...locationPages,
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
