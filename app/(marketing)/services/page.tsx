import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import NumberTicker from "@/app/components/ui/NumberTicker";
import CTA from "@/app/components/sections/CTA";
import PageHero from "@/app/components/sections/PageHero";
import RankClimb from "@/app/components/ui/RankClimb";
import { fadeInUp, staggerContainer, scaleIn } from "@/app/lib/animations";
import { SERVICES, PLATFORM_SERVICES, SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateAllServicesSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "SEO, Web Design & Marketing Services",
  description:
    "Local SEO, website design, Google Ads, branding, and Google Business Profile optimization. See how TableTurnerr helps local businesses get found and grow online.",
  path: "/services",
  keywords: [
    "local SEO services for small business",
    "website design",
    "local SEO",
    "branding agency",
    "Google Ads management",
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
  "commission-free-deliveries": {
    src: "/images/usage/order-counter.jpg",
    alt: "Restaurant worker preparing food orders at the counter for delivery",
  },
};

const STATS: readonly { value: number; suffix: string; prefix?: string; decimalPlaces?: number; label: string; source?: string }[] = [
  { value: 6, suffix: "", label: "Core marketing services for local businesses" },
  {
    value: 90,
    suffix: "%",
    label: "Of consumers research online before visiting",
    source: "Industry Data",
  },
  {
    value: 77,
    suffix: "%",
    label: "Of consumers check a business's website before choosing",
    source: "Industry Data",
  },
  {
    value: 92,
    suffix: "%",
    label: "Of consumers use a search engine to find local businesses",
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

      {/* Header */}
      <PageHero
        eyebrow="the full lineup"
        title="SEO, web design, and marketing for local businesses"
        description="Everything your business needs to grow online, from a high-converting website to local SEO, paid ads, and a brand identity that wins customers. Each service is built to get you found and chosen in local search."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        visual={<RankClimb query="best near me" />}
      >
        <div className="flex flex-wrap gap-2.5">
          {[
            "Local SEO",
            "Web Design",
            "Google Ads",
            "AI Receptionist",
            "CRM",
            "Scheduling",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-sm font-medium text-cream/80 backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

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
                      className="service-card elevate-hover group block bg-cream-dark rounded-[1.25rem] overflow-hidden h-full border border-transparent hover:border-border"
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

      {/* Automation & growth tools (GoHighLevel-powered) */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="max-w-3xl mb-12 md:mb-16">
            <p className="eyebrow mb-3">Capture & convert</p>
            <h2 className="display-lg text-charcoal mb-4">
              Automation tools that turn leads into booked customers
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              Getting found is half the battle. These tools make sure every lead
              gets answered, followed up, and booked, so the traffic we drive
              actually turns into revenue.
            </p>
          </AnimatedElement>

          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {PLATFORM_SERVICES.map((service, i) => (
              <AnimatedElement key={service.slug} variants={fadeInUp}>
                <Link
                  href={`/services/${service.slug}`}
                  className="elevate-hover group flex h-full flex-col rounded-[1.25rem] border border-border bg-cream p-7 md:p-8 transition-colors hover:border-accent/40"
                >
                  <span className="font-display text-sm tabular-nums text-accent mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-charcoal mb-2">
                    {service.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-charcoal font-medium transition-colors group-hover:text-accent">
                    Learn more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>

      {/* Aggregate Stats Strip */}
      <section className="dark-sheen py-16 md:py-24">
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
