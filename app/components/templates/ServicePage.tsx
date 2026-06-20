import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import ServiceFAQ from "@/app/components/sections/service/ServiceFAQ";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import RankClimb from "@/app/components/ui/RankClimb";
import CTA from "@/app/components/sections/CTA";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import type { ServicePageData } from "@/app/lib/service-data";
import { getRelatedServices } from "@/app/lib/service-data";
import { TARGET_CITIES } from "@/app/lib/location-data";

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

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-accent"
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function ServicePage({
  service,
  children,
}: {
  service: ServicePageData;
  children?: React.ReactNode;
}) {
  const relatedServices = getRelatedServices(service.slug);

  return (
    <>
      {/* Hero / Intro (light editorial + rank-climb signature animation) */}
      <section className="mesh-hero hero-grain relative overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
        {/* Decoration: drifting accent glows + a faded dot grid over the mesh */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="aurora-blob absolute -top-32 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[120px]" />
          <div className="aurora-blob-2 absolute bottom-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-accent/15 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.6]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 55% at 50% 0%, black, transparent 78%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          <AnimatedElement variants={fadeInUp} className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
            />
          </AnimatedElement>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left column — headline + description + CTA */}
            <AnimatedElement variants={staggerContainer} className="lg:col-span-6">
              <AnimatedElement variants={fadeInUp}>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-cream-dark px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {service.category}
                </span>
              </AnimatedElement>

              <AnimatedElement variants={fadeInUp}>
                <h1 className="display-xl text-charcoal mb-6">
                  {service.headline}
                </h1>
              </AnimatedElement>

              <AnimatedElement variants={fadeInUp}>
                <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-xl mb-8">
                  {service.description}
                </p>
              </AnimatedElement>

              <AnimatedElement variants={fadeInUp}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/contact" variant="primary">
                    Get a Free Consultation
                  </Button>
                  <Button href="/services" variant="secondary">
                    View All Services
                  </Button>
                </div>
              </AnimatedElement>

              <AnimatedElement variants={fadeInUp}>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                  {[
                    "Free consultation",
                    "No long-term contracts",
                    "Built for local businesses",
                  ].map((point) => (
                    <li
                      key={point}
                      className="inline-flex items-center gap-2 text-sm text-warm-gray"
                    >
                      <CheckIcon />
                      {point}
                    </li>
                  ))}
                </ul>
              </AnimatedElement>
            </AnimatedElement>

            {/* Right column — rank-climb signature animation */}
            <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
              <RankClimb
                query={
                  service.cityContext
                    ? `best in ${service.cityContext.name}`
                    : "best near me"
                }
              />
            </AnimatedElement>
          </div>
        </Container>
      </section>

      {/* City-specific intro (only on /services/<slug>/<city> variants) */}
      {service.cityContext && (
        <section className="bg-cream pb-12 md:pb-16">
          <Container>
            <AnimatedElement variants={fadeInUp}>
              <div className="rounded-[1.25rem] border border-border bg-cream-dark p-7 sm:p-9 lg:p-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cream px-3 py-1 text-xs font-medium text-warm-gray">
                  <MapPinIcon />
                  {service.cityContext.name}, {service.cityContext.stateCode}
                </span>
                <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mt-4 mb-3 max-w-3xl">
                  Local marketing built for {service.cityContext.name}
                </h2>
                <p className="text-warm-gray text-lg leading-relaxed max-w-3xl">
                  {service.cityContext.blurb}
                </p>
              </div>
            </AnimatedElement>
          </Container>
        </section>
      )}

      {/* Features Bento Grid */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl">
              <BlurText text={`Everything You Get With Our ${service.category} Service`} />
            </h2>
          </AnimatedElement>

          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {service.features.map((feature, index) => (
              <AnimatedElement
                key={feature.title}
                variants={fadeInUp}
                className={`bg-cream rounded-[1.25rem] p-6 sm:p-8 md:p-10 border border-border/50 ${
                  index < 2 ? "lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-cream text-sm font-bold mb-5">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-semibold text-xl leading-tight text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-warm-gray text-base leading-relaxed">
                  {feature.description}
                </p>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>

      {/* Stats Row */}
      <section className="bg-charcoal py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel className="text-warm-gray-light">By the Numbers</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-3 max-w-2xl">
              <BlurText text="The Data Behind Our Approach" />
            </h2>
          </AnimatedElement>

          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {service.stats.map((stat) => (
              <AnimatedElement
                key={stat.label}
                variants={fadeInUp}
                className="rounded-[1.25rem] border border-warm-gray/20 p-6 sm:p-8 md:p-10"
              >
                <p className="font-display font-bold text-4xl sm:text-5xl lg:text-[1.75rem] xl:text-[2.75rem] 2xl:text-5xl leading-none tracking-tight text-cream whitespace-nowrap">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <NumberTicker
                    value={stat.value}
                    decimalPlaces={stat.decimalPlaces}
                    className="text-cream"
                  />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </p>
                <p className="text-warm-gray-light text-base leading-relaxed mt-3">
                  {stat.label}
                </p>
                {stat.source && (
                  <p className="text-warm-gray/60 text-xs mt-2">
                    Source: {stat.source}
                  </p>
                )}
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>

      {/* Optional page-specific section (e.g. savings calculator) */}
      {children}

      {/* FAQ */}
      <ServiceFAQ faqs={service.faqs} serviceName={service.title} />

      {/* Areas we serve — internal links to per-city variants (skipped for platform services) */}
      {!service.noCityPages && (
        <section className="bg-cream py-16 md:py-24">
          <Container>
            <AnimatedElement variants={fadeInUp} className="mb-8 md:mb-10">
              <SectionLabel>Areas We Serve</SectionLabel>
              <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl">
                {service.title} in Your City
              </h2>
            </AnimatedElement>
            <AnimatedElement
              variants={staggerContainer}
              className="flex flex-wrap gap-2.5"
            >
              {TARGET_CITIES.map((city) => (
                <AnimatedElement key={city.slug} variants={fadeInUp}>
                  <Link
                    href={`/services/${service.slug}/${city.slug}`}
                    className="inline-block rounded-full border border-border bg-cream-dark px-4 py-2 text-sm text-charcoal hover:border-charcoal/30 hover:text-accent transition-colors"
                  >
                    {service.title.replace(/^Restaurant /, "")} in {city.name}
                  </Link>
                </AnimatedElement>
              ))}
            </AnimatedElement>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTA />

      {/* Related Services */}
      <section className="bg-cream-dark py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel>Explore More</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3">
              <BlurText text="Other Services We Offer" />
            </h2>
          </AnimatedElement>

          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {relatedServices.map((related) => (
              <AnimatedElement key={related.slug} variants={fadeInUp}>
                <Link
                  href={`/services/${related.slug}`}
                  aria-label={`Learn more about ${related.title}`}
                  className="service-card block bg-cream rounded-[1.25rem] p-7 md:p-8 h-full border border-transparent hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="flex flex-col justify-between h-full min-h-[200px]">
                    <div>
                      <span className="inline-block text-warm-gray-light text-xs font-medium uppercase tracking-wider mb-3">
                        {related.category}
                      </span>
                      <h3 className="font-display font-semibold text-lg leading-tight tracking-tight text-charcoal mb-3">
                        {related.title}
                      </h3>
                      <p className="text-warm-gray text-sm leading-relaxed line-clamp-3">
                        {related.description}
                      </p>
                    </div>
                    <span className="service-card-btn mt-6 inline-flex w-fit items-center gap-1.5 text-charcoal border border-charcoal/20 rounded-full px-3 py-1.5 transition-all duration-300">
                      <span className="text-sm font-medium">Learn more</span>
                      <span className="service-card-arrow transition-transform duration-300">
                        <ArrowIcon />
                      </span>
                    </span>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>
    </>
  );
}
