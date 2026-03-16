import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import NumberTicker from "@/app/components/ui/NumberTicker";
import CTA from "@/app/components/sections/CTA";
import { fadeInUp, staggerContainer, scaleIn } from "@/app/lib/animations";
import { SERVICES, SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateAllServicesSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Marketing Services",
  description:
    "Full-service restaurant marketing — custom website design, local SEO, Google Ads, branding, and Google Business Profile optimization. See how TableTurnerr helps restaurants grow online.",
  path: "/services",
  keywords: [
    "restaurant marketing services",
    "restaurant website design",
    "restaurant SEO",
    "restaurant branding",
    "Google Ads for restaurants",
  ],
});

const SERVICE_PAGE_IMAGES: Record<string, { src: string; alt: string }> = {
  "restaurant-website-design": {
    src: "/images/usage/chef-plating.webp",
    alt: "Chef carefully plating a dish in a professional restaurant kitchen",
  },
  "restaurant-seo": {
    src: "/images/usage/kitchen-busy.webp",
    alt: "Busy restaurant kitchen with chefs working during peak service",
  },
  "restaurant-branding": {
    src: "/images/usage/enjoying-food.webp",
    alt: "People enjoying beautifully presented food at a restaurant table",
  },
  "google-ads": {
    src: "/images/usage/kitchen-motion.webp",
    alt: "Restaurant kitchen in motion during a busy dinner service",
  },
  "google-business-profile-optimization": {
    src: "/images/usage/restaurant-interior.webp",
    alt: "Warm, inviting restaurant interior with ambient lighting",
  },
};

const STATS: readonly { value: number; suffix: string; prefix?: string; decimalPlaces?: number; label: string; source?: string }[] = [
  { value: 5, suffix: "", label: "Core marketing services for restaurants" },
  {
    value: 90,
    suffix: "%",
    label: "Of diners research online before visiting",
    source: "Industry Data",
  },
  {
    value: 77,
    suffix: "%",
    label: "Of diners check a restaurant's website before choosing where to eat",
    source: "Industry Data",
  },
  {
    value: 92,
    suffix: "%",
    label: "Of customers use a search engine to find restaurants",
    source: "Industry Data",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesPage() {
  const servicesSchema = generateAllServicesSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, ...servicesSchema]),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream pt-24 sm:pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link
                  href="/"
                  className="hover:text-charcoal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-charcoal font-medium">Services</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* H1 Header Section */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-24">
        <Container>
          <AnimatedElement variants={fadeInUp} className="max-w-3xl">
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
              <BlurText text="Restaurant Marketing Services" />
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              Everything your restaurant needs to grow online — from a
              high-converting website to local SEO, paid ads, and a brand
              identity that fills tables. Each service is built specifically for
              the restaurant industry.
            </p>
          </AnimatedElement>
        </Container>
      </section>

      {/* Service Cards Grid */}
      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {SERVICES.map((service) => {
                const image = SERVICE_PAGE_IMAGES[service.slug];
                return (
                  <AnimatedElement key={service.slug} variants={fadeInUp}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="service-card group block bg-cream-dark rounded-[1.25rem] overflow-hidden h-full border border-transparent hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
                    >
                      {image && (
                        <div className="relative h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="service-card-img object-cover transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-7 md:p-8 lg:p-9 flex flex-col justify-between min-h-[220px]">
                        <div>
                          <h2 className="font-display font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-tight tracking-tight text-charcoal mb-3">
                            {service.title}
                          </h2>
                          <p className="text-warm-gray text-[0.95rem] md:text-base leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <span className="service-card-btn mt-6 inline-flex w-fit items-center gap-1.5 text-charcoal border border-charcoal/20 rounded-full px-3 py-1.5 transition-all duration-300">
                          <span className="text-sm font-medium">
                            Learn more
                          </span>
                          <span className="service-card-arrow transition-transform duration-300">
                            <ArrowIcon />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </AnimatedElement>
                );
              })}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* Aggregate Stats Strip */}
      <section className="bg-charcoal py-16 md:py-20">
        <Container>
          <AnimatedElement variants={scaleIn}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-none text-cream mb-2">
                    {stat.prefix}
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimalPlaces ?? 0}
                    />
                    {stat.suffix}
                  </p>
                  <p className="text-warm-gray-light text-sm md:text-base leading-snug">
                    {stat.label}
                  </p>
                  {stat.source && (
                    <p className="text-warm-gray/60 text-xs mt-1.5">
                      Source: {stat.source}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
