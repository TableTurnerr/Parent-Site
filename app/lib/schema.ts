import { SITE_CONFIG, SOCIAL_LINKS, SERVICES } from "./constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "MarketingAgency"],
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/og/default.jpg`,
    image: `${SITE_CONFIG.url}/images/og/default.jpg`,
    description:
      "TableTurnerr is a restaurant marketing agency specializing in custom website design, SEO, Google Ads, and branding for independent restaurants.",
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Restaurant Website Design",
      "Restaurant SEO",
      "Restaurant Branding",
      "Google Ads Management",
      "Google Business Profile Optimization",
    ],
    knowsAbout: [
      "Restaurant Marketing",
      "Restaurant SEO",
      "Restaurant Website Design",
      "Local SEO",
      "Google Business Profile Optimization",
      "Commission-Free Online Ordering",
      "Restaurant Branding",
      "Google Ads for Restaurants",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
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
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: service.name,
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
