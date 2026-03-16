import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import ServiceFAQ from "@/app/components/sections/service/ServiceFAQ";
import CTA from "@/app/components/sections/CTA";
import { fadeInUp, staggerContainer, scaleIn } from "@/app/lib/animations";
import type { ServicePageData } from "@/app/lib/service-data";
import { getRelatedServices } from "@/app/lib/service-data";

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

export default function ServicePage({ service }: { service: ServicePageData }) {
  const relatedServices = getRelatedServices(service.slug);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-cream pt-24 sm:pt-28 md:pt-32 pb-4">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm text-warm-gray">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-warm-gray-light">/</li>
              <li>
                <Link href="/services" className="hover:text-charcoal transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="text-warm-gray-light">/</li>
              <li className="text-charcoal font-medium" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* Hero / Intro */}
      <section className="bg-cream py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left column — headline + description + CTA */}
            <AnimatedElement variants={staggerContainer} className="lg:col-span-7">
              <AnimatedElement variants={fadeInUp}>
                <span className="inline-block bg-cream-dark text-warm-gray text-sm font-medium px-4 py-1.5 rounded-full border border-border mb-6">
                  {service.category}
                </span>
              </AnimatedElement>

              <AnimatedElement variants={fadeInUp}>
                <h1 className="font-display font-bold text-[clamp(2rem,4vw+0.5rem,3.75rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
                  <BlurText text={service.headline} />
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
            </AnimatedElement>

            {/* Right column — hero image */}
            <AnimatedElement variants={scaleIn} className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-[1.25rem] overflow-hidden">
                <Image
                  src={service.heroImage.src}
                  alt={service.heroImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </section>

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

      {/* FAQ */}
      <ServiceFAQ faqs={service.faqs} serviceName={service.title} />

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
