import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import PencilCrossout from "@/app/components/ui/PencilCrossout";
import CTA from "@/app/components/sections/CTA";
import { fadeInUp, staggerContainer, scaleIn, fadeIn } from "@/app/lib/animations";
import { CLIENTS, SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "About TableTurnerr, the Local Business Growth Agency",
  description:
    "TableTurnerr is an SEO agency for local businesses. We run local SEO, build high-converting websites, and manage Google Ads so local businesses can compete with the big players and win, with deep experience in the restaurant industry.",
  path: "/about",
  keywords: [
    "local SEO agency",
    "about TableTurnerr",
    "local business growth partner",
    "small business digital marketing",
    "local web design agency",
  ],
});

const CLIENT_LOGOS: Record<string, { file: string; alt: string }> = {
  "Grill Shack": {
    file: "GrillShack.webp",
    alt: "Grill Shack restaurant logo",
  },
  "Miss Mat Cafe": {
    file: "MissMatCafe.webp",
    alt: "Miss Mat Cafe restaurant logo",
  },
  Texbbq: {
    file: "TexBBQ.webp",
    alt: "TexBBQ restaurant logo",
  },
  "Qadeer Coffee": {
    file: "QadeerCoffee.webp",
    alt: "Qadeer Coffee restaurant logo",
  },
};

const VALUE_CARDS = [
  {
    title: "Local-First",
    description:
      "Every strategy, website, and campaign is built to win in local search, where your next customer is actually looking for you.",
  },
  {
    title: "Traffic-First Approach",
    description:
      "We are a traffic-first company. We build high-performing websites and then drive customers to them through aggressive organic SEO and paid Google Ads.",
  },
  {
    title: "Long-Term Partnership",
    description:
      "Our relationship does not end at handoff. We offer ongoing services, advocate for our clients with tech partners, and provide objective, business-first advice.",
  },
  {
    title: "Conversion-Obsessed",
    description:
      "We don't just send traffic. We build the website, reviews, and follow-up that turn clicks into booked, paying customers.",
  },
] as const;

const GROWTH_STEPS = [
  {
    step: 1,
    title: "The Foundation",
    description:
      "We build a highly-converting, SEO-optimized website and handle the branding you need to instantly scale your online presence and look established from day one.",
  },
  {
    step: 2,
    title: "The Transition",
    description:
      "We get you found where your customers are searching: local SEO, an optimized Google Business Profile, and a site built to convert, so the traffic and the customer relationship stay with you instead of a third-party platform.",
  },
  {
    step: 3,
    title: "The Scale",
    description:
      "With the foundation in place, we help you aggressively invest in revenue-driving channels: scaling Google Ads, deploying branding strategies, and implementing smart systems for capturing 5-star reviews and winning repeat customers.",
  },
] as const;

const PARTNER_STATS: readonly {
  value: number;
  prefix?: string;
  suffix: string;
  decimalPlaces?: number;
  label: string;
  source: string;
}[] = [
  {
    value: 92,
    suffix: "%",
    label: "Of consumers use a search engine to find a local business",
    source: "Industry Data",
  },
  {
    value: 90,
    suffix: "%",
    label: "Of consumers read reviews before choosing a local business",
    source: "Industry Data",
  },
  {
    value: 88,
    suffix: "%",
    label: "Of mobile local searches lead to a call or visit within a day",
    source: "Google",
  },
  {
    value: 5,
    suffix: ":1",
    label: "Return that local SEO and content marketing deliver over time",
    source: "Industry Data",
  },
];

export default function AboutPage() {
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "About", url: `${SITE_CONFIG.url}/about` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, breadcrumbSchema]),
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
                <span className="text-charcoal font-medium">About</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero / Intro Section */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <AnimatedElement
              variants={fadeInUp}
              className="lg:col-span-7"
            >
              <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-3">
                who we are
              </p>
              <h1 className="display-lg text-charcoal mb-6">
                The local business growth agency
              </h1>
              <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                TableTurnerr is an SEO, website, and traffic-generation agency for
                local businesses. We act as your outsourced digital team, building
                a high-converting site on our proven framework and driving the
                organic and paid traffic that helps you compete with the big
                players. Our roots are in the restaurant industry, so we know how
                to win in crowded local markets.
              </p>
              <Button href="/contact" variant="primary">
                Get a Free Consultation
              </Button>
            </AnimatedElement>

            <AnimatedElement
              variants={scaleIn}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-[1.25rem] overflow-hidden">
                <Image
                  src="/images/usage/about-open-kitchen.jpg"
                  alt="Chefs working in an open restaurant kitchen with pendant lighting"
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

      {/* Why We Exist Section */}
      <section className="bg-cream-dark py-16 md:py-24">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel>Why TableTurnerr</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-tight mt-4 max-w-4xl">
              <BlurText text="Local marketing is a skewed game" delay={100} />
              {" "}
              <BlurText
                text="Large chains have the capital to build powerful digital infrastructures, while"
                className="text-warm-gray-light"
                delay={500}
              />
              {" "}
              <PencilCrossout
                text="local businesses"
                replacement="You"
                className="text-warm-gray-light"
                delay={1200}
              />
              {" "}
              <BlurText
                text="stay stuck."
                className="text-warm-gray-light"
                delay={2200}
              />
            </h2>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {VALUE_CARDS.map((card) => (
                <AnimatedElement key={card.title} variants={fadeInUp}>
                  <div className="bg-cream rounded-[1.25rem] p-7 md:p-9 h-full border border-border">
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-charcoal mb-3">
                      {card.title}
                    </h3>
                    <p className="text-warm-gray text-[1.125rem] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* The Growth Path Section */}
      <section className="bg-cream py-16 md:py-24">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-tight text-charcoal mt-4 max-w-3xl mb-4">
              <BlurText text="A Proven Three-Step Growth Roadmap" delay={0.1} />
            </h2>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              While clients can pick and choose services, we recommend a proven
              chronological roadmap to maximize digital growth and revenue.
            </p>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
              {GROWTH_STEPS.map((step) => (
                <AnimatedElement key={step.step} variants={fadeInUp}>
                  <div className="bg-cream-dark rounded-[1.25rem] p-7 md:p-9 h-full border border-border">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-cream font-display font-bold text-sm">
                        {step.step}
                      </span>
                      <h3 className="font-display font-semibold text-xl md:text-2xl text-charcoal">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-warm-gray text-[1.125rem] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* Clients Section */}
      <section className="bg-cream-dark py-16 md:py-24">
        <Container>
          <AnimatedElement variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <SectionLabel className="mb-4">Our Clients</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-tight text-charcoal">
              <BlurText text="Trusted by Local Businesses" delay={0.1} />
            </h2>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {CLIENTS.map((client) => {
                const logo = CLIENT_LOGOS[client.name];
                return (
                  <AnimatedElement key={client.name} variants={fadeInUp}>
                    <div className="bg-cream rounded-[1.25rem] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center border border-border">
                      {logo && (
                        <div className="relative w-full h-20 md:h-24 mb-4 grayscale hover:grayscale-0 transition-all duration-300">
                          <Image
                            src={`/Client_Logos/${logo.file}`}
                            alt={logo.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <p className="font-display text-sm md:text-base text-warm-gray text-center">
                        {client.name}
                      </p>
                    </div>
                  </AnimatedElement>
                );
              })}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* Stats Strip — commission-free numbers */}
      <section className="bg-charcoal py-16 md:py-20">
        <Container>
          <AnimatedElement variants={fadeIn} className="text-center mb-10 md:mb-14">
            <SectionLabel className="text-warm-gray-light">
              Why Commission-Free Wins
            </SectionLabel>
          </AnimatedElement>

          <AnimatedElement variants={scaleIn}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {PARTNER_STATS.map((stat) => (
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
                  <p className="text-warm-gray/60 text-xs mt-1.5">
                    Source: {stat.source}
                  </p>
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
