import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import Link from "next/link";
import { AlarmClock, ArrowRight, CalendarSync, Calculator, Clock, DollarSign, FileText, MapPin, MessageSquareText, MessagesSquare, PenLine, PhoneMissed, Phone, QrCode, Reply, Smartphone, Receipt, Star, Target } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, NextSteps } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { AUDIT_PATH } from "@/app/lib/growth";
import { tools, type ToolSlug } from "@/app/lib/growth/tools";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: pageTitle("Free Tools & Templates for Contractors"),
  description:
    "Free tools for contractors: job price and hourly rate calculators, estimate and invoice templates, a Google review QR code maker, and texts you can copy.",
  alternates: { canonical: `${base}/tools` },
};

const ICONS: Record<ToolSlug, typeof Star> = {
  "google-review-calculator": Star,
  "missed-call-calculator": PhoneMissed,
  "marketing-roi-calculator": Calculator,
  "review-request-templates": MessageSquareText,
  "job-price-calculator": DollarSign,
  "hourly-rate-calculator": Clock,
  "maintenance-plan-calculator": CalendarSync,
  "cost-per-lead-calculator": Target,
  "estimate-template": FileText,
  "invoice-template": Receipt,
  "contractor-text-templates": MessagesSquare,
  "phone-scripts": Phone,
  "google-review-link-generator": QrCode,
  "lead-response-calculator": AlarmClock,
  "google-business-description-generator": PenLine,
  "missed-call-text-templates": Smartphone,
  "review-response-templates": Reply,
};

const GROUPS: [string, ToolSlug[]][] = [
  ["Price the work", ["job-price-calculator", "hourly-rate-calculator", "maintenance-plan-calculator"]],
  ["Estimates and invoices", ["estimate-template", "invoice-template"]],
  ["Reviews and your Google profile", ["google-review-link-generator", "google-review-calculator", "review-request-templates", "review-response-templates", "google-business-description-generator"]],
  ["Calls and messages", ["missed-call-calculator", "missed-call-text-templates", "contractor-text-templates", "phone-scripts", "lead-response-calculator"]],
  ["Marketing spend", ["cost-per-lead-calculator", "marketing-roi-calculator"]],
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Free tools", url: `${base}/tools` }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Free tools for home-service businesses",
            itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${base}${t.path}` })),
          },
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], ["/tools", "Free tools"]]}
        eyebrow="Free tools"
        h1="Free tools for home-service businesses"
        lede="Price a job, make an estimate or invoice, get your review link, and copy the messages that win work. Use your own numbers, no email needed. When you want the real picture from your Google data, get the free audit."
        trust={false}
      />
      <section className="section bg-surface">
        <div className="container-tt">
          <div className="grid gap-5 md:grid-cols-2">
            <Link href={AUDIT_PATH} className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-night p-7 text-white md:col-span-2 md:p-9">
              <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <MapPin className="h-7 w-7 text-star" aria-hidden />
                  <span className="mt-4 block text-2xl font-bold">Free Google Maps audit</span>
                  <span className="mt-2 block leading-relaxed text-white/75">
                    The one tool that uses your real data: where you rank across your service area, your top 5 competitors side by
                    side, whether AI assistants recommend you, and what to fix first. Done by a person, walked through on a short call.
                  </span>
                </div>
                <span className="btn btn-light shrink-0">Get my free audit <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </div>
          {GROUPS.map(([heading, slugs]) => (
            <div key={heading} className="mt-12">
              <h2 className="text-2xl font-bold text-ink">{heading}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {slugs.map((slug) => {
                  const t = tools.find((x) => x.slug === slug)!;
                  const Icon = ICONS[slug];
                  return (
                    <Link key={slug} href={t.path} className="card card-hover group flex flex-col p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-5 w-5" aria-hidden /></span>
                      <span className="mt-5 text-xl font-bold text-ink">{t.name}</span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.card}</span>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open the tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <AuditBand title="Calculators use your guesses. The audit uses your Google data." />
      <NextSteps
        items={[
          ["/guides", "Guides for owners", "Plain-English guides on Google Maps, reviews, SEO and what marketing costs."],
          ["/services", "Done-for-you services", "We run your Google profile, reviews, website, SEO and follow-ups, month to month."],
          ["/results", "Client results", "Real numbers from home-service businesses we work with."],
        ]}
      />
    </>
  );
}
