import { SITE_CONFIG, SOCIAL_LINKS, SERVICES } from "./constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "MarketingAgency"],
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/logo.png`,
    description:
      "TableTurnerr is review automation for home-services businesses, turning completed jobs into 5-star reviews across Google, Facebook, Yelp and Angi for HVAC, roofing, plumbing and electrical pros.",
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Review Automation",
      "Online Reputation Management",
      "Review Management Software",
      "Local SEO",
    ],
    knowsAbout: [
      "Review automation",
      "Online reputation management",
      "Google reviews",
      "Local SEO",
      "Google Business Profile optimization",
      "Map pack ranking",
      "Home services marketing",
      "HVAC marketing",
      "Roofing marketing",
      "Plumbing marketing",
      "Electrical contractor marketing",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      contactType: "sales",
      availableLanguage: "English",
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.tagline,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: { type: "State" | "City"; name: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: service.areaServed
      ? { "@type": service.areaServed.type, name: service.areaServed.name }
      : { "@type": "Country", name: "United States" },
    serviceType: service.name,
  };
}

/**
 * Service schema for a city variant. We do not claim a physical storefront in
 * the city (no fake address); instead we mark the area we serve as that City,
 * with metro geo coordinates, and keep the national agency as the provider.
 * This signals local relevance honestly for "near me" / local-pack searches.
 */
export function generateCityServiceSchema(params: {
  serviceName: string;
  description: string;
  url: string;
  city: { name: string; state: string; lat: number; lng: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.serviceName,
    description: params.description,
    url: params.url,
    serviceType: params.serviceName,
    provider: {
      "@type": ["ProfessionalService", "MarketingAgency"],
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
    },
    areaServed: {
      "@type": "City",
      name: params.city.name,
      containedInPlace: { "@type": "State", name: params.city.state },
      geo: {
        "@type": "GeoCoordinates",
        latitude: params.city.lat,
        longitude: params.city.lng,
      },
    },
  };
}

export function generateAllServicesSchema() {
  return SERVICES.map((service) =>
    generateServiceSchema({
      name: service.title,
      description: service.description,
      url: `${SITE_CONFIG.url}/services/${service.slug}`,
    })
  );
}

export function generateFAQSchema(
  faqs: ReadonlyArray<{ readonly question: string; readonly answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url: article.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    ...(article.image && { image: article.image }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    author: {
      "@type": "Organization",
      name: article.authorName ?? SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/icon.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
