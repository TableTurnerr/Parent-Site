import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { PLANS, PRICING_FAQS } from "@/app/lib/pricing";

export const metadata: Metadata = {
  title: "Review Automation Pricing from $84/mo",
  description:
    "Simple, honest review-automation pricing for home-service pros. Plans from $84/mo, month-to-month, no contracts, 14-day free trial, 90-day results guarantee.",
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
            <h1 className="display mt-6 text-ink">
              Simple, honest review-automation pricing
            </h1>
            <p className="lead mt-6">
              Plans from $84/mo for HVAC, roofing, plumbing and electrical pros.
              Month-to-month, no setup fees, no contracts. Start with a 14-day
              free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section pt-0">
        <div className="container-tt">
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`card relative flex flex-col p-7 ${p.popular ? "border-primary shadow-[0_30px_70px_-40px_rgba(54,64,143,0.5)] ring-1 ring-primary" : ""}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </span>
                )}
                <h2 className="text-lg font-bold text-ink">{p.name}</h2>
                <p className="mt-3">
                  <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
                  <span className="text-ink-soft">{p.per}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{p.note}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`btn mt-7 w-full ${p.popular ? "btn-primary" : "btn-ghost"}`}
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-ink-soft sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> More reviews in 90 days or your next month is free.
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-success" /> 14-day free trial, no credit card required.
            </span>
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Need higher volume or multiple locations?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">
              Talk to us about custom pricing
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface">
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

      {/* Cross-links */}
      <CrossLinks
        links={[
          { href: "/trades", label: "Browse by trade", sub: "HVAC, roofing, plumbing & electrical" },
          { href: "/integrations", label: "Integrations", sub: "Connect your field-service CRM" },
          { href: "/alternatives", label: "Compare review tools", sub: "See how we stack up" },
        ]}
      />

      {/* CTA */}
      <section className="section">
        <div className="container-tt">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-night px-7 py-14 text-center md:px-16 md:py-20">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative mx-auto max-w-2xl">
              <div className="stars mb-5 text-2xl" aria-hidden>★★★★★</div>
              <h2 className="display-2 text-white">Start your 14-day free trial</h2>
              <p className="lead mt-4 text-white/70">
                Connect your CRM and start collecting reviews this week. No
                contracts, cancel anytime.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/signup" className="btn btn-light">Start free trial <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/contact" className="btn btn-outline-light">Book a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
