import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import CTA from "@/app/components/sections/CTA";
import OurWork from "@/app/components/sections/OurWork";
import { fadeInUp, staggerContainer, scaleIn } from "@/app/lib/animations";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Success Stories & Case Studies",
  description:
    "See how independent restaurants are growing with TableTurnerr and our partner ecosystem. Real, verified results: +377% online growth, $4.5M in online sales, and millions saved in third-party commission fees.",
  path: "/case-studies",
  keywords: [
    "restaurant success stories",
    "restaurant case studies",
    "restaurant marketing results",
    "restaurant SEO results",
    "restaurant growth examples",
    "commission free ordering results",
    "restaurant delivery savings",
  ],
});

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CLIENTS = [
  {
    name: "Grill Shack",
    logo: "/Client_Logos/GrillShack.webp",
    quote: "Amazing work amazing people!! Definitely my go to",
  },
  {
    name: "Miss Mat Cafe",
    logo: "/Client_Logos/MissMatCafe.webp",
    quote: "Amazing team",
  },
  {
    name: "Texbbq",
    logo: "/Client_Logos/TexBBQ.webp",
    quote: "Great communication and work from the team",
  },
  {
    name: "Qadeer Coffee",
    logo: "/Client_Logos/QadeerCoffee.webp",
    quote: "Very professional team!! Great working with you",
  },
] as const;

interface PartnerStat {
  display?: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  label: string;
  source: string;
}

const PARTNER_STATS: PartnerStat[] = [
  {
    value: 30,
    suffix: "%",
    label: "Commission third-party apps take on every order, before any costs",
    source: "Industry Data",
  },
  {
    value: 16000,
    prefix: "$",
    suffix: "",
    label: "Average annual savings switching from delivery apps to direct ordering",
    source: "Industry Data",
  },
  {
    value: 67,
    suffix: "%",
    label: "Of diners prefer ordering directly from a restaurant when they can",
    source: "Industry Data",
  },
  {
    value: 70,
    suffix: "%",
    label: "Of first-time diners never return without a follow-up system",
    source: "Industry Data",
  },
  {
    value: 98,
    suffix: "%",
    label: "Open rate on SMS, vs about 20% for email, for bringing customers back",
    source: "Industry Data",
  },
  {
    value: 1.5,
    prefix: "$",
    suffix: "",
    decimalPlaces: 2,
    label: "Flat fee per delivered order with Turnerr Deliver, not a percentage",
    source: "TableTurnerr",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CaseStudiesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Case Studies", url: `${SITE_CONFIG.url}/case-studies` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
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
                <span className="text-charcoal font-medium">Case Studies</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <section className="bg-cream pt-10 pb-16 md:pt-14 md:pb-24">
        <Container>
          <AnimatedElement variants={fadeInUp} className="max-w-3xl">
            <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-3">
              the proof
            </p>
            <h1 className="display-xl text-charcoal mb-6">
              Restaurant success stories
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              Real results from independent restaurants using TableTurnerr
              services and our partner ecosystem. Every number below is
              verified, no made-up stats, no vanity metrics.
            </p>
          </AnimatedElement>
        </Container>
      </section>

      {/* ── Live client site portfolio (renders once real URLs are set) ── */}
      <OurWork />

      {/* ── Our Clients ─────────────────────────────────────────── */}
      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel>Our Clients</SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-4">
              <BlurText text="Restaurants We Work With" />
            </h2>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {CLIENTS.map((client) => (
                <AnimatedElement key={client.name} variants={fadeInUp}>
                  <div className="rounded-[1.25rem] bg-cream-dark border border-border/50 p-6 sm:p-8 md:p-10 flex flex-col h-full">
                    {/* Logo + badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="relative h-12 w-12 rounded-full bg-white border border-border/60 overflow-hidden flex-shrink-0">
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-[9999px]">
                        TableTurnerr Client
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-warm-gray italic text-base md:text-lg leading-relaxed mb-8 flex-1">
                      &ldquo;{client.quote}&rdquo;
                    </blockquote>

                    {/* Name + role */}
                    <div>
                      <p className="font-display font-semibold text-charcoal">
                        {client.name}
                      </p>
                      <p className="text-warm-gray-light text-sm">
                        Restaurant owner
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* ── Partner Ecosystem Stats ─────────────────────────────── */}
      <section className="bg-charcoal py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
            <SectionLabel className="text-warm-gray-light">
              The Numbers
            </SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-4 max-w-2xl">
              <BlurText text="Why Commission-Free Ordering Wins" />
            </h2>
            <p className="text-warm-gray-light text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Delivery apps take a third of every order and keep your customers
              as theirs. Here is what that costs, and what your restaurant keeps
              when ordering runs through you instead.
            </p>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {PARTNER_STATS.map((stat) => (
                <AnimatedElement key={stat.label} variants={fadeInUp}>
                  <div className="rounded-[1.25rem] border border-warm-gray/20 p-6 sm:p-8 md:p-10 flex flex-col h-full">
                    {/* Stat number */}
                    {stat.display ? (
                      <p className="font-display font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-tight text-cream">
                        {stat.display}
                      </p>
                    ) : (
                      <p className="font-display font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-tight text-cream">
                        {stat.prefix}
                        <NumberTicker
                          value={stat.value!}
                          decimalPlaces={stat.decimalPlaces ?? 0}
                          className="text-cream"
                        />
                        {stat.suffix}
                      </p>
                    )}

                    {/* Label */}
                    <p className="text-warm-gray-light text-base md:text-lg leading-snug mt-4 flex-1">
                      {stat.label}
                    </p>

                    {/* Source */}
                    <div className="flex items-center justify-end mt-6 pt-6 border-t border-warm-gray/15">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-[9999px] ${
                          stat.source === "TableTurnerr"
                            ? "text-accent bg-accent/15"
                            : "text-cream bg-warm-gray/20"
                        }`}
                      >
                        {stat.source}
                      </span>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* ── How we keep your margin ─────────────────────────────── */}
      <section className="bg-cream-dark py-16 md:py-24">
        <Container>
          <AnimatedElement variants={fadeInUp}>
            <div className="max-w-3xl mx-auto">
              <p className="font-display font-semibold text-charcoal text-lg md:text-xl mb-6">
                How we keep that margin in your pocket
              </p>

              <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                We set you up with{" "}
                <strong className="text-charcoal font-medium">
                  commission-free direct ordering
                </strong>{" "}
                on your own website, so repeat customers order from you, not an
                app, and you keep the revenue and the data. For delivery, our{" "}
                <strong className="text-charcoal font-medium">
                  Turnerr Deliver
                </strong>{" "}
                service dispatches the nearest driver for a flat fee per order
                instead of a 15 to 30 percent commission.
              </p>

              <div className="mt-10">
                <Button href="/contact" variant="primary">
                  Get a Free Consultation
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </Container>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <CTA />
    </>
  );
}
