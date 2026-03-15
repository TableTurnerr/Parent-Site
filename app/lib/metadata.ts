import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

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
      images: [
        {
          url: ogImage ?? "/images/og/default.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@tableturnerr",
    },
  };
}
