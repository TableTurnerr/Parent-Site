import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, type ServicePageData } from "./service-data";
import {
  getCityBySlug,
  getAllCitySlugs,
  MEDSPA_CITY_BLURBS,
  type CityData,
} from "./location-data";
import { SITE_CONFIG } from "./constants";
import {
  generateCityServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "./schema";

export function getLocationStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export function getLocationData(serviceSlug: string, citySlug: string) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();
  return { service, city };
}

export type ServiceVertical = "restaurant" | "medspa";

export function buildLocationServiceData(
  service: ServicePageData,
  city: CityData,
  vertical: ServiceVertical = "restaurant"
): ServicePageData {
  // A city-specific FAQ so each location page has at least one unique Q&A in
  // both the visible accordion and the FAQ schema (helps avoid thin/duplicate
  // content across the city variants).
  const cityFaq =
    vertical === "medspa"
      ? {
          question: `Do you offer ${service.title.toLowerCase()} for ${city.name} med spas?`,
          answer: `Yes. We work with med spas, aesthetic clinics, and wellness practices in ${city.name}, ${city.state} and across the US. Our ${service.title.toLowerCase()} is tailored to how clients in ${city.name} search for and book treatments, and it starts with a free consultation about your treatments, your market, and your goals.`,
        }
      : {
          question: `Do you offer ${service.title.toLowerCase()} for ${city.name} restaurants?`,
          answer: `Yes. We work with independent restaurants in ${city.name}, ${city.state} and across the US. Our ${service.title.toLowerCase()} is tailored to how diners in ${city.name} search and order, and it starts with a free consultation about your menu, your market, and your goals.`,
        };

  const blurb =
    vertical === "medspa"
      ? MEDSPA_CITY_BLURBS[city.slug] ?? city.blurb
      : city.blurb;

  return {
    ...service,
    title: `${service.title} in ${city.name}, ${city.stateCode}`,
    headline: `${service.headline} in ${city.name}`,
    description: service.description.replace(
      /\./,
      ` in ${city.name}, ${city.state}.`
    ),
    metaDescription: `${service.title} in ${city.name}, ${city.stateCode}. ${service.metaDescription}`,
    faqs: [...service.faqs, cityFaq],
    cityContext: {
      name: city.name,
      state: city.state,
      stateCode: city.stateCode,
      blurb,
    },
  };
}

/**
 * Builds the JSON-LD array for a city service page: a geo-aware Service schema,
 * a breadcrumb, and the FAQ schema (including the city-specific question).
 */
export function buildLocationJsonLd(
  service: ServicePageData,
  city: CityData,
  locationService: ServicePageData
) {
  const url = `${SITE_CONFIG.url}/services/${service.slug}/${city.slug}`;
  const serviceSchema = generateCityServiceSchema({
    serviceName: locationService.title,
    description: locationService.metaDescription,
    url,
    city: { name: city.name, state: city.state, lat: city.lat, lng: city.lng },
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    { name: service.title, url: `${SITE_CONFIG.url}/services/${service.slug}` },
    {
      name: `${city.name}, ${city.stateCode}`,
      url,
    },
  ]);
  const faqSchema = generateFAQSchema(locationService.faqs);
  return [serviceSchema, breadcrumbSchema, faqSchema];
}

export function buildLocationMetadata(
  service: ServicePageData,
  city: CityData,
  vertical: ServiceVertical = "restaurant"
): Metadata {
  const title = `${service.title} in ${city.name}, ${city.stateCode}`;
  const description = `${service.title} in ${city.name}, ${city.stateCode}. ${service.metaDescription}`;
  const path = `/services/${service.slug}/${city.slug}`;
  const url = `${SITE_CONFIG.url}${path}`;
  const verticalKeyword =
    vertical === "medspa"
      ? `med spa marketing ${city.name}`
      : `restaurant marketing ${city.name}`;

  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      `${service.keywords[0]} ${city.name}`,
      `${city.name} ${service.keywords[0]}`,
      verticalKeyword,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      creator: "@tableturnerr",
    },
  };
}
