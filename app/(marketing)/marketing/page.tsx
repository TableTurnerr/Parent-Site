import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, SectionHead } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { trades } from "@/app/lib/growth";
import { INDUSTRIES } from "@/app/lib/industries";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: "Home Service Marketing by Trade",
  description: `Done-for-you Google Maps, reviews and local SEO plans written for ${trades.length} home-service trades: roofing, HVAC, plumbing, electricians, handyman, fencing and more.`,
  alternates: { canonical: `${base}/marketing` },
};

export default function Page() {
  const marketingSlugs = new Set(trades.map((t) => t.slug));
  const otherIndustries = Object.values(INDUSTRIES).filter((i) => !marketingSlugs.has(i.slug));
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Marketing by trade", url: `${base}/marketing` }])} />
      <GrowthHero
        crumbs={[["/", "Home"], ["/marketing", "Marketing by trade"]]}
        eyebrow="Who we help"
        h1="Marketing plans for home-service businesses, one trade at a time"
        lede="A roofer and a pest control company don't win on Google the same way. Each plan below is written for one trade: what homeowners search, what holds that trade back, and what we do about it."
      />
      <section className="section">
        <div className="container-tt">
          <SectionHead title="Pick your trade" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((t) => (
              <Link key={t.slug} href={t.path} className="card card-hover group flex h-full flex-col p-6">
                <span className="text-lg font-bold text-ink">{t.name}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.description}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">See the {t.name.toLowerCase()} plan <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {otherIndustries.length > 0 && (
        <section className="section bg-surface">
          <div className="container-tt">
            <SectionHead title="Other trades we work with" intro="Review automation pages for trades that don't have a full marketing plan yet." />
            <ul className="mt-6 flex flex-wrap gap-2">
              {otherIndustries.map((i) => (
                <li key={i.slug}><Link href={`/industries/${i.slug}`} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-primary hover:text-ink">{i.name}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <AuditBand />
    </>
  );
}
