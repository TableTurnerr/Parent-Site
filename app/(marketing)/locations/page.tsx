import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import Button from "@/app/components/ui/Button";
import { SERVICES, SITE_CONFIG } from "@/app/lib/constants";
import { TARGET_CITIES } from "@/app/lib/location-data";
import {
  generateBreadcrumbSchema,
  generateOrganizationSchema,
} from "@/app/lib/schema";
import { createPageMetadata } from "@/app/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Areas We Serve",
  description:
    "TableTurnerr works with independent restaurants across the U.S. Browse our city pages for restaurant website design, SEO, and Google Ads in your market.",
  path: "/locations",
  keywords: [
    "restaurant marketing by city",
    "local restaurant marketing",
    "restaurant SEO near me",
  ],
});

export default function LocationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Locations", url: `${SITE_CONFIG.url}/locations` },
  ]);
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, breadcrumbSchema]),
        }}
      />

      <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-16">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>Service Areas</SectionLabel>
            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mt-3 mb-6">
              Areas We Serve
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              We help independent restaurants grow across the U.S. These city
              pages dig into restaurant marketing in specific markets, with more
              added over time. Pick a city to see how our website design, local
              SEO, and Google Ads services work for restaurants near you.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {TARGET_CITIES.map((city) => (
              <div
                key={city.slug}
                className="rounded-[1.25rem] border border-border bg-cream-dark p-6 sm:p-8"
              >
                <h2 className="font-display font-semibold text-xl md:text-2xl text-charcoal mb-1">
                  {city.name}, {city.stateCode}
                </h2>
                <p className="text-warm-gray text-sm mb-5">
                  Restaurant marketing services in {city.name}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                  {SERVICES.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}/${city.slug}`}
                        className="text-charcoal text-[0.95rem] hover:text-accent underline-offset-2 hover:underline transition-colors"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-3">
            <Button href="/contact" variant="primary">
              Get a Free Consultation
            </Button>
            <Button href="/services" variant="secondary">
              View All Services
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
