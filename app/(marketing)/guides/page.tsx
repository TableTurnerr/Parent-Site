import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, GuideCards, NextSteps, SectionHead } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { guides, services, slugify, topics, trades } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: "Guides for Home-Service Owners: Google Maps, Reviews & SEO",
  description: "Practical guides for contractors: ranking on Google Maps, getting more Google reviews from Jobber, Housecall Pro and ServiceTitan, and what local SEO costs.",
  alternates: { canonical: `${base}/guides` },
};

export default function Page() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Guides", url: `${base}/guides` }])} />
      <GrowthHero
        crumbs={[["/", "Home"], ["/guides", "Guides"]]}
        eyebrow="Guides"
        h1="Straight answers for home-service owners"
        lede="How Google Maps rankings work, how to get more reviews from the software you already use, and what marketing really costs. Written for owners, not marketers."
        trust={false}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {Object.values(topics).map((t) => (
            <li key={t.name}><a href={`#${slugify(t.name)}`} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-primary hover:text-ink">{t.name}</a></li>
          ))}
        </ul>
      </GrowthHero>
      {Object.entries(topics).map(([key, t], i) => {
        const list = guides.filter((g) => g.topics[0] === key);
        if (!list.length) return null;
        const pillar = t.pillar === "/marketing" ? null : services.find((s) => s.path === t.pillar);
        return (
          <section key={key} id={slugify(t.name)} className={`section scroll-mt-24 ${i % 2 ? "bg-surface" : ""}`}>
            <div className="container-tt">
              <SectionHead title={t.name} />
              <p className="lead mt-4 max-w-2xl">
                {t.intro}{" "}
                {pillar ? <>Want it done for you? See <Link href={pillar.path} className="font-semibold text-primary">{pillar.short}</Link>.</> : <>See <Link href="/marketing" className="font-semibold text-primary">marketing plans for {trades.length} trades</Link>.</>}
              </p>
              <GuideCards list={list} />
            </div>
          </section>
        );
      })}
      <section className="section">
        <div className="container-tt">
          <p className="text-ink-soft">Looking for news and updates? See the <Link href="/blog" className="font-semibold text-primary">TableTurnerr blog</Link>.</p>
        </div>
      </section>
      <AuditBand />
      <NextSteps
        items={[
          ["/services", "Done-for-you services", "Google Business Profile, reviews, local SEO, websites and missed-call text-back."],
          ["/marketing", "Marketing plans by trade", "How homeowners search for your trade, and what we'd do first."],
          ["/results/presidential-roofing", "See a client result", "How a Utah roofer went from 27 to 43 Google reviews in 20 days."],
        ]}
      />

    </>
  );
}
