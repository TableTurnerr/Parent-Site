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
import { fadeInUp, staggerContainer, scaleIn } from "@/app/lib/animations";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Success Stories & Case Studies",
  description:
    "See how independent restaurants are growing with TableTurnerr and our partner ecosystem. Real results from real restaurants — including +377% online growth, $4.5M in online sales, and millions saved in third-party commission fees.",
  path: "/case-studies",
  keywords: [
    "restaurant success stories",
    "restaurant case studies",
    "restaurant marketing results",
    "restaurant SEO results",
    "restaurant growth examples",
    "Owner.com results",
    "ChowNow results",
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
  restaurant: string;
  source: "Owner.com" | "ChowNow";
}

const PARTNER_STATS: PartnerStat[] = [
  {
    value: 377,
    prefix: "+",
    suffix: "%",
    label: "Online growth achieved",
    restaurant: "Samos Oaxaca",
    source: "Owner.com",
  },
  {
    value: 4.5,
    prefix: "$",
    suffix: "M",
    decimalPlaces: 1,
    label: "In online sales generated",
    restaurant: "Saffron Indian Kitchen",
    source: "Owner.com",
  },
  {
    display: "5-figure",
    label: "Savings in third-party fees",
    restaurant: "HillCrust Pizza",
    source: "Owner.com",
  },
  {
    value: 2,
    prefix: "$",
    suffix: "M+",
    label: "Saved in commissions",
    restaurant: "Ollie's in New York",
    source: "ChowNow",
  },
  {
    value: 108,
    suffix: "%",
    label: "Increase in repeat orders",
    restaurant: "Ollie's",
    source: "ChowNow",
  },
  {
    value: 288,
    prefix: "$",
    suffix: "K",
    label: "Saved annually by eliminating third-party fees",
    restaurant: "4Top Hospitality",
    source: "ChowNow",
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
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
              <BlurText text="Restaurant Success Stories" />
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              Real results from independent restaurants using TableTurnerr
              services and our partner ecosystem. Every number below is
              verified&nbsp;&mdash; no made-up stats, no vanity metrics.
            </p>
          </AnimatedElement>
        </Container>
      </section>

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
              Partner Ecosystem Results
            </SectionLabel>
            <h2 className="font-display font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-4 max-w-2xl">
              <BlurText text="The Numbers Behind Our Partner Platforms" />
            </h2>
            <p className="text-warm-gray-light text-lg md:text-xl leading-relaxed max-w-2xl mt-6">
              Restaurants using our recommended platforms&nbsp;&mdash; Owner.com
              and ChowNow&nbsp;&mdash; are seeing massive, verified ROI. These
              are real results from real restaurants in the ecosystem.
            </p>
          </AnimatedElement>

          <AnimatedElement variants={staggerContainer}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {PARTNER_STATS.map((stat) => (
                <AnimatedElement key={stat.restaurant + stat.label} variants={fadeInUp}>
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

                    {/* Restaurant + source */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-warm-gray/15">
                      <p className="text-warm-gray text-sm">
                        {stat.restaurant}
                      </p>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-[9999px] ${
                          stat.source === "Owner.com"
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

      {/* ── Additional Partner Info ─────────────────────────────── */}
      <section className="bg-cream-dark py-16 md:py-24">
        <Container>
          <AnimatedElement variants={fadeInUp}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-cream bg-warm-gray/20 px-3 py-1 rounded-[9999px]">
                  ChowNow
                </span>
                <p className="font-display font-semibold text-charcoal text-lg md:text-xl">
                  Emporium Thai: $68K saved in commissions
                </p>
              </div>

              <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                Our recommended ecosystem includes{" "}
                <strong className="text-charcoal font-medium">Owner.com</strong>{" "}
                for restaurants ready to scale aggressively ($500/month flat fee,
                setup fee waived through TableTurnerr) and{" "}
                <strong className="text-charcoal font-medium">ChowNow</strong>{" "}
                for cost-conscious restaurants seeking commission-free ordering.
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
