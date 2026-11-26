import { CallNowBand } from "@/app/components/growth/ContactCtas";
import Link from "next/link";
import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import { ArrowRight } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { PLANS, PRICING_FAQS, PRICING_TERMS, DEMO_PHONE_DISPLAY } from "@/app/lib/pricing";

// Prices as structured data, so search and AI tools can read each package price.
const OFFERS = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "TableTurnerr pricing",
  url: "https://www.tableturnerr.com/pricing",
  itemListElement: [
    ...PLANS.map((p) => ({ "@type": "Offer", name: `${p.name} package`, description: p.adds.join("; "), price: p.price, priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "USD", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } })),
  ],
};
import AiAnsweringDemo from "@/app/components/growth/AiAnsweringDemo";
import { VideoSection } from "@/app/components/growth/Growth";
import { CustomPricingBar, PlanCards, PricingNote } from "@/app/components/growth/PricingTiers";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

export const metadata: Metadata = {
  title: pageTitle("Pricing: 5 Simple Packages from $97/mo"),
  description:
    "Five simple packages for home-service businesses, from $97/mo for reviews to $1,797/mo with ads and strategy. AI answering included from $597/mo. Need something different? Call us for custom pricing. No contracts.",
  alternates: { canonical: "https://www.tableturnerr.com/pricing" },
};

export default function PricingPage() {
  const base = "https://www.tableturnerr.com";
  return (
    <>
      <JsonLd
        data={[
          OFFERS,
          generateFAQSchema(PRICING_FAQS.map((f) => ({ question: f.q, answer: f.a }))),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Pricing", url: `${base}/pricing` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-10 md:pb-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Pricing</span>
            <h1 className="display mt-6 text-ink">Five simple packages.</h1>
            <p className="lead mt-6">
              Each package includes everything in the one before it, from $97 to $1,797 a month. No contracts. Need something
              different? Call us for custom pricing.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={growthSite.bookingUrl} className="btn btn-primary">Book a call <ArrowRight className="h-4 w-4" /></a>
              <a href={`tel:${growthSite.phoneE164}`} className="btn btn-ghost">Call {growthSite.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      {/* The packages */}
      <section className="section pt-0" id="plans">
        <div className="container-tt">
          <PlanCards />
          <PricingNote />
          <CustomPricingBar />
        </div>
      </section>

      {/* AI answering */}
      <section className="section bg-surface" id="ai-answering">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">AI answering service</span>
            <h2 className="display-2 mt-5 text-ink">See what your AI receptionist looks like</h2>
            <p className="lead mt-4">It answers in your business name, books the job and texts you a summary. Call <span className="whitespace-nowrap">{DEMO_PHONE_DISPLAY}</span> to hear it yourself.</p>
          </div>
          <div className="mt-12"><AiAnsweringDemo /></div>
        </div>
      </section>

      {/* Terms */}
      <section className="section">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">On every plan</span>
            <h2 className="display-2 mt-5 text-ink">No contracts. Move up or down any time.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRICING_TERMS.map(([h, p]) => (
              <div key={h} className="card p-7">
                <h3 className="text-lg font-bold text-ink">{h}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-soft">
            See <Link href="/services" className="font-semibold text-primary">everything we do</Link>, the{" "}
            <Link href="/marketing" className="font-semibold text-primary">marketing plan for your trade</Link>, or the{" "}
            <a href="/pricing.md" className="font-semibold text-primary">plain-text price list</a>.
          </p>
        </div>
      </section>

      <VideoSection
        surface
        eyebrow="How we work"
        title="Hear how we work, from the owner"
        intro="A 6-minute walkthrough of what we do for local businesses and how the work runs month to month."
      />

      {/* FAQ */}
      <section className="section">
        <div className="container-tt grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-5 text-ink">Pricing questions</h2>
            <p className="lead mt-4">
              Anything else? <Link href="/contact" className="font-semibold text-primary">Ask us</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={PRICING_FAQS} />
          </div>
        </div>
      </section>

      <CallNowBand title="Rather just ask what it would cost? Call us" />

      <CrossLinks
        links={[
          { href: "/services", label: "Done-for-you services", sub: "What we run for you, month to month" },
          { href: "/marketing", label: "Marketing by trade", sub: "The plan for your kind of business" },
          { href: "/results", label: "Results", sub: "Real numbers from real clients" },
          { href: "/about", label: "About us", sub: "A small, owner-run team" },
        ]}
      />

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display-2 text-white">Find out what your business actually needs</h2>
              <p className="lead mt-4 text-white/70">
                Start with the free Google Maps audit. We&apos;ll show you where you stand against your top competitors,
                tell you what we&apos;d do first and what it would cost.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={AUDIT_PATH} className="btn btn-light">Get your free audit <ArrowRight className="h-4 w-4" /></Link>
                <a href={growthSite.bookingUrl} className="btn btn-outline-light">Book a 15-minute call</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
