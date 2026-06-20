import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import PageHero from "@/app/components/sections/PageHero";
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
    "TableTurnerr works with local businesses in major Texas metros and beyond. Browse our city pages for website design, local SEO, and Google Ads in your market.",
  path: "/locations",
  keywords: [
    "local business marketing by city",
    "local marketing near me",
    "local SEO near me",
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

      <PageHero
        eyebrow="find your city"
        title="Areas we serve"
        description="We started in the major markets across Texas, from Houston and Dallas to Austin and San Antonio, and we are expanding to new cities as we grow. Pick a city to see how our website design, local SEO, and Google Ads work for businesses near you, and if you are outside these markets, reach out anyway."
        topSlot={
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Locations" }]}
          />
        }
      />

      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {TARGET_CITIES.map((city) => (
              <div
                key={city.slug}
                className="elevate-hover rounded-[1.25rem] border border-border bg-cream-dark p-6 sm:p-8"
              >
                <h2 className="font-display font-semibold text-xl md:text-2xl text-charcoal mb-2">
                  {city.name}, {city.stateCode}
                </h2>
                <p className="text-warm-gray text-sm leading-relaxed mb-5">
                  {city.blurb}
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
