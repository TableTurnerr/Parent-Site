import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { PLANS, PRICING_FAQS } from "@/app/lib/pricing";
import { VideoSection } from "@/app/components/growth/Growth";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

const DFY = [
  "Google Business Profile set up properly and kept active",
  "Review requests after every job, plus a past-customer campaign",
  "Local SEO and service pages for the towns you serve",
  "A contractor website that turns visits into calls",
  "Missed-call text-back and AI receptionist",
  "Plain-English monthly report on reviews, rankings and calls",
];

export const metadata: Metadata = {
  title: "Pricing: Done-for-You Marketing or Software from $80/mo",
  description:
    "Two ways to work with TableTurnerr: done-for-you marketing quoted after a free Google Maps audit, or self-serve review and growth software from $80/mo. Month to month.",
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
              Done for you, or run the software yourself
            </h1>
            <p className="lead mt-6">
              Most home-service owners have us run their marketing for them. If
              you&apos;d rather do it yourself, our software plans start at $80/mo.
              Either way it&apos;s month to month, with no contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Two ways to work with us */}
      <section className="section pt-0">
        <div className="container-tt grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-night p-7 text-white md:p-9">
            <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Most owners choose</span>
              <h2 className="mt-3 text-2xl font-bold">Done-for-you marketing</h2>
              <p className="mt-2 text-white/70">We run it on our own software. Priced on the audit call, based on the services you need and how competitive your area is.</p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/80">
                {DFY.map((f) => (
                  <li key={f} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{f}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={AUDIT_PATH} className="btn btn-light">Get your free Google Maps audit <ArrowRight className="h-4 w-4" /></Link>
                <a href={growthSite.bookingUrl} className="btn btn-outline-light">Book a 15-minute call</a>
              </div>
              <p className="mt-5 text-sm text-white/60">
                See <Link href="/services" className="font-semibold text-white underline">every done-for-you service</Link>.
              </p>
            </div>
          </div>
          <div className="card flex flex-col p-7 md:p-9">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Do it yourself</span>
            <h2 className="mt-3 text-2xl font-bold text-ink">Self-serve software</h2>
            <p className="mt-2 text-ink-soft">The same review automation, missed-call text-back and AI tools we use for clients, for teams that want to run it themselves.</p>
            <p className="mt-6"><span className="font-display text-4xl font-bold text-ink">From $80</span><span className="text-ink-soft">/mo</span></p>
            <p className="mt-1 text-sm text-muted">14-day free trial, no credit card required.</p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <a href="#plans" className="btn btn-primary">Compare software plans</a>
              <Link href="/features" className="btn btn-ghost">See the features</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="section scroll-mt-24 pt-0">
        <div className="container-tt">
          <h2 className="display-2 mb-10 text-center text-ink">Software plans</h2>
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
                <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-3">
                  <span className="font-display text-4xl font-bold text-ink">{p.price}</span>
                  <span className="text-ink-soft">{p.per}</span>
                </p>
                <p className="mt-1 text-sm text-muted">{p.note}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-4 text-sm font-semibold leading-relaxed text-ink">
                  <span className="text-primary">Goal: </span>{p.goal}
                </p>
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

      <VideoSection
        surface
        eyebrow="What it costs"
        title="Hear how pricing works, from the owner"
        intro="A 6-minute walkthrough of what we do for local businesses, with pricing at 5:11. Use the chapter list to jump straight to it."
      />

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
          { href: "/services", label: "Done-for-you services", sub: "What we run for you, month to month" },
          { href: "/industries", label: "Browse industries", sub: "Find the workflow for your home-service team" },
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
              <h2 className="display-2 text-white">Not sure which is right for you?</h2>
              <p className="lead mt-4 text-white/70">
                Start with the free Google Maps audit. We&apos;ll show you where you
                stand and tell you honestly whether done-for-you or the software
                makes more sense.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={AUDIT_PATH} className="btn btn-light">Get your free audit <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="btn btn-outline-light">Start a free trial</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
