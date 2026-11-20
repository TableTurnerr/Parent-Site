import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import Accordion from "@/app/components/site/Accordion";
import JsonLd from "@/app/components/site/JsonLd";
import CrossLinks from "@/app/components/site/CrossLinks";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/app/lib/schema";
import { PLANS, PRICING_FAQS } from "@/app/lib/pricing";
import { VideoSection } from "@/app/components/growth/Growth";
import { PricingNote, PricingTiers } from "@/app/components/growth/PricingTiers";
import { AUDIT_PATH, growthSite } from "@/app/lib/growth";

// What moves a quote between the three levels (same three things the owner names on calls and in the VSL).
const FACTORS = [
  ["What you need", "You might already have a good website, or plenty of reviews. The audit shows the gaps, and we only quote for those."],
  ["How fast you want to grow", "More keywords, more towns and paid ads take more work. Steady growth costs less than an aggressive push."],
  ["How much attention you want", "Some owners want a monthly report. Others want closer check-ins and changes made the same week."],
];

export const metadata: Metadata = {
  title: "Pricing: Custom Home-Service Marketing Plans",
  description:
    "Custom done-for-you marketing: $100–300/mo for one or two services, about $500/mo for the full program, about $1,000/mo with ads and after-hours AI answering.",
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
            <h1 className="display mt-6 text-ink">Custom pricing, built around how you want to grow</h1>
            <p className="lead mt-6">
              Every business is at a different point, so there&apos;s no one-size package. Here are the three rough levels
              our clients fall into. We set your exact price after a free Google Maps audit. Month to month, no contract.
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

      {/* What sets the price */}
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How we price</span>
            <h2 className="display-2 mt-5 text-ink">Three things decide your price</h2>
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

      {/* Self-serve software */}
      <section id="plans" className="section scroll-mt-24">
        <div className="container-tt">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Do it yourself</span>
            <h2 className="display-2 mt-5 text-ink">Prefer to run the software yourself?</h2>
            <p className="lead mt-4">The same review automation, CRM and AI tools we use for clients, for teams that want to run it in-house. 14-day free trial, no credit card required.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.name} className="card relative flex flex-col p-7">
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
                <Link href="/signup" className="btn btn-ghost mt-7 w-full">Start free trial</Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Need higher volume or multiple locations?{" "}
            <Link href="/contact" className="font-semibold text-primary hover:underline">Talk to us</Link>.
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
