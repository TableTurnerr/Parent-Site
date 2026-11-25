import { BookCallBand, CallNowBand } from "@/app/components/growth/ContactCtas";
import Link from "next/link";
import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import { ArrowRight } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { PRICING_FAQS } from "@/app/lib/pricing";
import { VideoSection } from "@/app/components/growth/Growth";
import { PricingNote, PricingTiers } from "@/app/components/growth/PricingTiers";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

// What every plan shares.
const FACTORS = [
  ["Month to month", "No contract. Move up a plan, move down or stop whenever you want."],
  ["You talk to an owner", "No account-manager shuffle. The people who run the work are the people you call."],
  ["Software included", "Review automation, CRM and AI tools are built in. Nothing extra to buy, set up or learn."],
];

export const metadata: Metadata = {
  title: pageTitle("Home-Service Marketing Pricing from $97/mo"),
  description:
    "Done-for-you marketing for home-service businesses from $97/mo. Pick what you need and see your price: reviews, website, local SEO, AI answering and more.",
  alternates: { canonical: "https://www.tableturnerr.com/pricing" },
};

export default function PricingPage() {
  const base = "https://www.tableturnerr.com";
  return (
    <>
      <JsonLd
        data={[
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
            <h1 className="display mt-6 text-ink">Pick what you need. See your price.</h1>
            <p className="lead mt-6">
              Google reviews are always included. Add a website, posting, or the full growth engine, and the price updates as
              you go. Four fixed prices, no hidden extras, month to month.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={AUDIT_PATH} className="btn btn-primary">Get your free Google Maps audit <ArrowRight className="h-4 w-4" /></Link>
              <a href={growthSite.bookingUrl} className="btn btn-ghost">Book a 15-minute call</a>
            </div>
          </div>
        </div>
      </section>

      {/* Done-for-you levels */}
      <section className="section pt-0">
        <div className="container-tt">
          <PricingTiers />
          <PricingNote />
        </div>
      </section>

      <BookCallBand title="Want a straight quote? Book a 15-minute call" />

      {/* What sets the price */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">On every plan</span>
            <h2 className="display-2 mt-5 text-ink">What you get with any plan</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {FACTORS.map(([h, p]) => (
              <div key={h} className="card p-7">
                <h3 className="text-lg font-bold text-ink">{h}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-soft">
            See <Link href="/services" className="font-semibold text-primary">everything we do</Link>, or the{" "}
            <Link href="/marketing" className="font-semibold text-primary">marketing plan for your trade</Link>.
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
