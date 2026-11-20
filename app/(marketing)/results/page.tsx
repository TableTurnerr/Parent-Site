import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, NextSteps, SectionHead } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { results } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: "Client Results",
  description: "Real results from home-service businesses we work with: Google review growth, Maps rankings and more calls, shared with each client's permission.",
  alternates: { canonical: `${base}/results` },
};

export default function Page() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Results", url: `${base}/results` }])} />
      <GrowthHero
        crumbs={[["/", "Home"], ["/results", "Results"]]}
        eyebrow="Results"
        h1="Client results"
        lede="Real numbers from real home-service businesses, shared with their permission. No made-up testimonials."
        trust={false}
      />
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="Case studies" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {results.map((r) => (
              <Link key={r.slug} href={r.path} className="card card-hover group flex flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{r.trade} · {r.location}</span>
                <span className="mt-3 text-xl font-bold text-ink">{r.client}</span>
                <span className="mt-4 font-display text-4xl font-bold text-ink">{r.reviewsBefore} → {r.reviewsAfter}</span>
                <span className="mt-1 text-sm text-ink-soft">Google reviews in {r.days} days (+{r.pct}%)</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <AuditBand title="Want results like these?" />
      <NextSteps
        items={[
          ["/services", "Done-for-you services", "Google Business Profile, reviews, local SEO, websites and missed-call text-back."],
          ["/marketing", "Marketing plans by trade", "How homeowners search for your trade, and what we'd do first."],
          ["/about", "How we work", "A small, owner-run team with clear rules: no fake reviews, no review gating."],
        ]}
      />

    </>
  );
}
