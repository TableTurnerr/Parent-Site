import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleDollarSign, MapPin, Star, type LucideIcon } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, GrowthHero, GuideCards, InlineHtml, NextSteps, SectionHead } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { getGuide, guides, services, slugify, topics, trades } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export const metadata: Metadata = {
  title: pageTitle("Guides for Home-Service Owners: Reviews, CRM & Google Maps"),
  description: "Practical guides for contractors: get more Google reviews, choose a CRM or invoicing software, follow up on estimates and rank higher on Google Maps.",
  alternates: { canonical: `${base}/guides` },
};

// The four guides most owners should read first, shown as larger cards above the full list.
const START_HERE: [slug: string, icon: LucideIcon][] = [
  ["how-to-rank-higher-on-google-maps", MapPin],
  ["how-to-verify-google-business-profile", BadgeCheck],
  ["how-to-get-more-google-reviews", Star],
  ["home-service-marketing-agency-cost", CircleDollarSign],
];

export default function Page() {
  const startHere = START_HERE.flatMap(([slug, icon]) => {
    const g = getGuide(slug);
    return g ? [{ g, icon }] : [];
  });
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Guides", url: `${base}/guides` }])} />
      <GrowthHero
        crumbs={[["/", "Home"], ["/guides", "Guides"]]}
        eyebrow="Guides"
        h1="Straight answers for home-service owners"
        lede="How to get more Google reviews, pick a CRM, follow up on estimates and show up on Google Maps. Written for owners, not marketers."
        trust={false}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {Object.values(topics).map((t) => (
            <li key={t.name}><a href={`#${slugify(t.name)}`} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-primary hover:text-ink">{t.name}</a></li>
          ))}
        </ul>
      </GrowthHero>
      {startHere.length > 0 && (
        <section className="section bg-surface" id="start-here">
          <div className="container-tt">
            <SectionHead eyebrow="Start here" title="The guides most owners read first" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {startHere.map(({ g, icon: Icon }) => (
                <Link key={g.slug} href={g.path} className="card card-hover group flex h-full flex-col p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-ink" aria-hidden><Icon className="h-6 w-6" /></span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">{topics[g.topics[0]]?.name}</span>
                  <InlineHtml as="p" html={g.h1} className="mt-2 text-xl font-bold leading-snug text-ink" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{g.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
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
          ["/services", "Done-for-you services", "Google Business Profile, reviews, local SEO, websites, missed-call text-back and CRM follow-up."],
          ["/marketing", "Marketing plans by trade", "How homeowners search for your trade, and what we'd do first."],
          ["/results/presidential-roofing", "See a client result", "How a Utah roofer went from 27 to 43 Google reviews in 20 days."],
        ]}
      />

    </>
  );
}
