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
  title: "About TableTurnerr — Restaurant Marketing Agency",
  description:
    "TableTurnerr is a restaurant marketing agency built exclusively for independent restaurants. We design custom websites, run local SEO campaigns, and manage Google Ads to help restaurants grow online and compete with major chains.",
  path: "/about",
  keywords: [
    "restaurant marketing agency",
    "about TableTurnerr",
    "restaurant growth partner",
    "independent restaurant digital marketing",
    "restaurant website agency",
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
    title: "Restaurant-First",
    description:
      "Every strategy, website, and campaign is built specifically for the food and beverage industry — not repurposed from generic marketing playbooks.",
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
    title: "Commission-Free Future",
    description:
      "We help restaurants flip the script on third-party apps — using DoorDash and UberEats as marketing channels while converting repeat orders to their own direct platform.",
  },
] as const;

const GROWTH_STEPS = [
  {
    step: 1,
    title: "The Foundation",
    description:
      "We build a highly-converting, SEO-optimized website and handle necessary branding to instantly scale your online presence and satisfy the qualification requirements of elite software partners.",
  },
  {
    step: 2,
    title: "The Transition",
    description:
      "Once qualified, you are seamlessly onboarded to a commission-free direct ordering system. We primarily recommend Owner.com as the complete system, with ChowNow available as a budget-friendly alternative.",
  },
  {
    step: 3,
    title: "The Scale",
    description:
      "With the foundation and ordering system in place, we help you aggressively invest in revenue-driving marketing channels — scaling Google Ads, deploying branding strategies, and implementing smart systems for capturing 5-star reviews and driving repeat direct orders.",
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
    value: 377,
    prefix: "+",
    suffix: "%",
    label: "Online growth achieved by Samos Oaxaca on Owner.com",
    source: "Owner.com",
  },
  {
    value: 4.5,
    prefix: "$",
    suffix: "M",
    decimalPlaces: 1,
    label: "In online sales generated for Saffron Indian Kitchen",
    source: "Owner.com",
  },
  {
    value: 2,
    prefix: "$",
    suffix: "M+",
    label: "Saved in commissions by Ollie's in New York on ChowNow",
    source: "ChowNow",
  },
  {
    value: 288,
    prefix: "$",
    suffix: "K",
    label: "Saved annually by 4Top Hospitality after eliminating third-party fees",
    source: "ChowNow",
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
              <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
                <BlurText text="The Restaurant Growth Agency" />
              </h1>
              <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                TableTurnerr is a specialized SEO website development and
                traffic generation agency built exclusively for independent
                restaurants. We bridge the gap between independent restaurants
                and major chains by acting as an outsourced digital team —
                driving massive organic and paid traffic so restaurants can scale
                their brand and compete.
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
              <BlurText text="The restaurant industry is skewed" delay={100} />
              {" "}
              <BlurText
                text="— large chains have the capital to build powerful digital infrastructures, while"
                className="text-warm-gray-light"
                delay={500}
              />
              {" "}
              <PencilCrossout
                text="independent restaurants"
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
              <BlurText text="Trusted by Independent Restaurants" delay={0.1} />
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

      {/* Stats Strip — Partner Ecosystem Results */}
      <section className="bg-charcoal py-16 md:py-20">
        <Container>
          <AnimatedElement variants={fadeIn} className="text-center mb-10 md:mb-14">
            <SectionLabel className="text-warm-gray-light">
              Partner Ecosystem Results
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
