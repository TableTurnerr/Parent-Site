import type { Metadata } from "next";
import ServicePage from "@/app/components/templates/ServicePage";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";
import { SITE_CONFIG } from "@/app/lib/constants";
import {
  getLocationStaticParams,
  getLocationData,
  buildLocationServiceData,
  buildLocationMetadata,
} from "@/app/lib/location-service-helpers";

const SERVICE_SLUG = "commission-free-deliveries";

export function generateStaticParams() {
  return getLocationStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const { service, city: cityData } = getLocationData(SERVICE_SLUG, city);
  return buildLocationMetadata(service, cityData);
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const { service, city: cityData } = getLocationData(SERVICE_SLUG, city);
  const locationService = buildLocationServiceData(service, cityData);

  const serviceSchema = generateServiceSchema({
    name: locationService.title,
    description: locationService.metaDescription,
    url: `${SITE_CONFIG.url}/services/${service.slug}/${cityData.slug}`,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    {
      name: service.title,
      url: `${SITE_CONFIG.url}/services/${service.slug}`,
    },
    {
      name: `${cityData.name}, ${cityData.stateCode}`,
      url: `${SITE_CONFIG.url}/services/${service.slug}/${cityData.slug}`,
    },
  ]);
  const faqSchema = generateFAQSchema(service.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema]),
        }}
      />
      <ServicePage service={locationService} />
    </>
  );
}
