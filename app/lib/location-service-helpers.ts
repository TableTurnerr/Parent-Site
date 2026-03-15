import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, type ServicePageData } from "./service-data";
import { getCityBySlug, getAllCitySlugs, type CityData } from "./location-data";
import { SITE_CONFIG } from "./constants";

export function getLocationStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

export function getLocationData(serviceSlug: string, citySlug: string) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();
  return { service, city };
}

export function buildLocationServiceData(
  service: ServicePageData,
  city: CityData
): ServicePageData {
  return {
    ...service,
    title: `${service.title} in ${city.name}, ${city.stateCode}`,
    headline: `${service.headline} in ${city.name}`,
    description: service.description.replace(
      /\./,
      ` in ${city.name}, ${city.state}.`
    ),
    metaDescription: `${service.title} in ${city.name}, ${city.stateCode}. ${service.metaDescription}`,
  };
}

export function buildLocationMetadata(
  service: ServicePageData,
  city: CityData
): Metadata {
  const title = `${service.title} in ${city.name}, ${city.stateCode}`;
  const description = `${service.title} in ${city.name}, ${city.stateCode}. ${service.metaDescription}`;
  const path = `/services/${service.slug}/${city.slug}`;
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      `${service.keywords[0]} ${city.name}`,
      `${city.name} ${service.keywords[0]}`,
      `restaurant marketing ${city.name}`,
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
