import type { Metadata } from "next";
import ServicePage from "@/app/components/templates/ServicePage";
import {
  getLocationStaticParams,
  getLocationData,
  buildLocationServiceData,
  buildLocationMetadata,
  buildLocationJsonLd,
} from "@/app/lib/location-service-helpers";

const SERVICE_SLUG = "google-business-profile-optimization";

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
  const jsonLd = buildLocationJsonLd(service, cityData, locationService);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePage service={locationService} />
    </>
  );
}
