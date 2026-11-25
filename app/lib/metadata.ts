import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

/** Adds the brand only when the whole title still fits what Google shows (about 60 characters). */
export function pageTitle(title: string): { absolute: string } {
  const full = `${title} | ${SITE_CONFIG.name}`;
  return { absolute: full.length <= 60 ? full : title };
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "website",
      // Only set an explicit image when one is passed; otherwise fall back to
      // the branded opengraph-image route (no restaurant photo).
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} - ${SITE_CONFIG.name}` }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@tableturnerr",
    },
  };
}
