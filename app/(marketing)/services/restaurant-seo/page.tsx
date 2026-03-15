import type { Metadata } from "next";
import ServicePage from "@/app/components/templates/ServicePage";
import { getServiceBySlug } from "@/app/lib/service-data";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";
import { SITE_CONFIG } from "@/app/lib/constants";

const service = getServiceBySlug("restaurant-seo")!;

export const metadata: Metadata = createPageMetadata({
  title: service.title,
  description: service.metaDescription,
  path: `/services/${service.slug}`,
  keywords: service.keywords,
});

export default function RestaurantSEOPage() {
  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    { name: service.title, url: `${SITE_CONFIG.url}/services/${service.slug}` },
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
      <ServicePage service={service} />
    </>
  );
}
