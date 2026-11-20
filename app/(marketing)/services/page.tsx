import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, SectionHead } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { services } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: "Done-For-You Marketing Services for Contractors",
  description: "Google Business Profile management, review generation, local SEO, contractor websites and missed-call text-back, done for you and month to month.",
  alternates: { canonical: `${base}/services` },
};

export default function Page() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Services", url: `${base}/services` }])} />
      <GrowthHero
        crumbs={[["/", "Home"], ["/services", "Services"]]}
        eyebrow="Done-for-you services"
        h1="Everything it takes to win the call on Google, done for you"
        lede="Prefer not to run review software yourself? We do the work: your Google profile, your reviews, your website and the calls you'd otherwise miss. Month to month, and you talk to an owner."
      />
      <section className="section">
        <div className="container-tt">
          <SectionHead title="Our services" />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={s.path} className="card card-hover group flex h-full flex-col p-6">
                <span className="text-lg font-bold text-ink">{s.short}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.description}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
            <Link href="/seo" className="card card-hover group flex h-full flex-col p-6">
              <span className="text-lg font-bold text-ink">SEO services</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">Our full SEO offer for home-service businesses.</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </section>
      <AuditBand />
    </>
  );
}
