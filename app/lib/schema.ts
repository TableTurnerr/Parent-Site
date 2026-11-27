import { SITE_CONFIG, SOCIAL_LINKS } from "./constants";
import { PLANS } from "./pricing";

const ORG_ID = `${SITE_CONFIG.url}/#organization`;

/** Founders, shared by the Organization schema and the /about page (confirmed by the owner on 2026-11-23). */
export const FOUNDERS = [
  {
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/about#nooh-ali-hassan`,
    name: "Nooh Ali Hassan",
    jobTitle: "Founder & CEO",
    worksFor: { "@id": ORG_ID },
    sameAs: ["https://www.linkedin.com/in/nooh-ali-hassan", "https://www.instagram.com/noohsalehh/"],
  },
  {
    "@type": "Person",
    "@id": `${SITE_CONFIG.url}/about#hashaam-zahid`,
    name: "Hashaam Zahid",
    jobTitle: "Co-founder & CTO",
    worksFor: { "@id": ORG_ID },
    sameAs: ["https://www.linkedin.com/in/hashaam-zahid-440080264/", "https://www.instagram.com/hashaam_zahid/"],
  },
];

/** The five fixed monthly packages, from app/lib/pricing.ts, as an offer catalog AI answers can quote exactly. */
const PRICE_OFFERS: [string, number, string][] = PLANS.map((p, i) => [
  `${p.name} package`,
  p.price,
  (i > 0 ? `Everything in ${PLANS[i - 1].name}, plus: ` : "") + p.adds.join("; "),
]);

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: `${SITE_CONFIG.url}/logo.png`,
    description:
      "TableTurnerr is a done-for-you online marketing agency for US home-service businesses (HVAC, plumbing, roofing, electrical, landscaping, tree service and more) and local restaurants. We build SEO and AEO optimized websites, manage Google Business Profiles, generate Google reviews, and run CRM follow-ups, missed-call text-back and AI answering on our own software. Five fixed packages from $97 to $1,797 a month, month to month, with custom pricing on a call. Every engagement starts with a free Google Maps audit.",
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    priceRange: "$97-$1,797/mo",
    areaServed: { "@type": "Country", name: "United States" },
    slogan: "We get home-service businesses more calls from Google.",
    founder: FOUNDERS.map((p) => ({ "@id": p["@id"] })),
    employee: FOUNDERS,
    serviceType: [
      "Home-service marketing",
      "Restaurant marketing",
      "Google Business Profile management",
      "Local SEO",
      "AI search optimization (AEO)",
      "Contractor website design",
      "Google review generation",
      "Missed-call text-back",
      "AI answering service",
      "CRM and follow-up automation",
    ],
    knowsAbout: [
      "Local SEO",
      "AI search optimization",
      "Answer engine optimization",
      "Google Business Profile optimization",
      "Map pack ranking",
      "Google reviews",
      "Online reputation management",
      "Contractor websites",
      "Missed-call text-back",
      "AI receptionists",
      "Home services marketing",
      "HVAC marketing",
      "Roofing marketing",
      "Plumbing marketing",
      "Electrical contractor marketing",
      "Landscape marketing",
      "Restaurant marketing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Done-for-you marketing packages",
      itemListElement: PRICE_OFFERS.map(([name, price, description]) => ({
        "@type": "Offer",
        name,
        description,
        url: `${SITE_CONFIG.url}/pricing`,
        priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
      })),
    },
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
      "@type": ["Organization", "ProfessionalService"],
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
      url: `${SITE_CONFIG.url}/about`,
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
