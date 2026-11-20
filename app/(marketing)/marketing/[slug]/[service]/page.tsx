import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, Glance, GrowthHero, GuideCards, Html, NextSteps, SectionHead, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import {
  AUDIT_PATH, FSM, combos, combosForService, combosForTrade, getCombo, getService, getTrade, guidesForTrade, plain, type Link3,
} from "@/app/lib/growth";

// Trade + service pages, e.g. /marketing/hvac/google-business-profile. Content is hand-written per pair in combos.mjs;
// only pairs listed there exist (everything else 404s), so there's no thin, templated page.
const base = "https://www.tableturnerr.com";
type Params = { params: Promise<{ slug: string; service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return combos.map((c) => ({ slug: c.trade, service: c.service }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, service } = await params;
  const c = getCombo(slug, service);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `${base}${c.path}` },
    openGraph: { title: `${c.title} | TableTurnerr`, description: c.description, url: `${base}${c.path}`, type: "website" },
  };
}

export default async function Page({ params }: Params) {
  const { slug, service } = await params;
  const c = getCombo(slug, service);
  const t = getTrade(slug);
  const s = getService(service);
  if (!c || !t || !s) notFound();

  const sameTrade = combosForTrade(t.slug).filter((x) => x.service !== s.slug);
  const sameService = combosForService(s.slug).filter((x) => x.trade !== t.slug);
  const next: Link3[] = [
    [t.path, `The full ${t.name.toLowerCase()} marketing plan`, `Everything we do for ${t.plural}, in order.`],
    [s.path, `${s.short}: how it works`, "What's included for every trade, and how we run it."],
    ...sameTrade.slice(0, 1).map((x): Link3 => [x.path, x.title, plain(x.description).slice(0, 110) + "…"]),
  ];

  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: c.title, description: c.description, url: `${base}${c.path}` }),
          generateFAQSchema(faqSchemaItems(c.faq)),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Marketing by trade", url: `${base}/marketing` },
            { name: t.name, url: `${base}${t.path}` },
            { name: s.short, url: `${base}${c.path}` },
          ]),
        ]}
      />

      <GrowthHero
        crumbs={[["/", "Home"], ["/marketing", "Marketing by trade"], [t.path, t.name], [c.path, s.short]]}
        eyebrow={`${s.short} for ${t.plural}`}
        h1={c.h1}
        lede={c.lede}
      />

      <Glance
        rows={[
          ["Who it's for", `US ${t.plural} who want more calls from Google.`],
          ["What we do", <ul key="t" className="list-disc pl-5">{c.tactics.map(([h]) => <li key={h}>{h}</li>)}</ul>],
          ["Works with", `${FSM}, or no software at all.`],
          ["Terms", "Done for you, month to month. You talk to an owner."],
          t.slug === "roofing" ? ["Proof", <Link key="r" href="/results/presidential-roofing" className="font-semibold text-primary">Presidential Roofing went from 27 to 43 Google reviews in 20 days</Link>] : null,
          ["First step", <span key="a">A <Link href={AUDIT_PATH} className="font-semibold text-primary">free Google Maps audit</Link> of your business and the top competitors near you.</span>],
        ]}
      />

      <section className="section">
        <div className="container-tt max-w-3xl">
          <SectionHead title={`Why it matters for ${t.plural}`} />
          <Html html={c.why} className="mt-6" />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title={`What we do for ${t.plural}`} intro={`${s.short}, set up and run for you, written around how people search for ${t.name.toLowerCase()} work.`} />
          <CardGrid items={c.tactics} numbered cols={2} />
        </div>
      </section>

      <AuditBand title={`See how your ${t.name.toLowerCase()} business shows up on Google Maps`} />
      <FaqSection faq={c.faq} />

      <section className="section">
        <div className="container-tt">
          <SectionHead title={`Guides for ${t.plural}`} />
          <GuideCards list={guidesForTrade(t.slug)} />
          {sameService.length > 0 && (
            <>
              <h3 className="mt-12 text-lg font-bold text-ink">{s.short} for other trades</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sameService.map((x) => {
                  const xt = getTrade(x.trade);
                  return (
                    <li key={x.path}>
                      <Link href={x.path} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-primary hover:text-ink">
                        {xt?.name ?? x.trade}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      <NextSteps items={next} />
    </>
  );
}
