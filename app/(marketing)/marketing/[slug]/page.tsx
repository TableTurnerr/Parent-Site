import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, Glance, GrowthHero, GuideCards, Html, SectionHead, TradeChips, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { AUDIT_PATH, FSM, getTrade, guidesForTrade, plain, servicesForTrade, trades, withToc } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export function generateStaticParams() {
  return trades.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTrade((await params).slug);
  if (!t) return {};
  const title = t.title.replace(/\s*\|\s*TableTurnerr$/, "");
  return {
    title,
    description: t.description,
    alternates: { canonical: `${base}${t.path}` },
    openGraph: { title: t.title, description: t.description, url: `${base}${t.path}`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTrade((await params).slug);
  if (!t) notFound();
  const deep = withToc(t.deepDive);

  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: `${t.name} marketing`, description: t.description, url: `${base}${t.path}` }),
          generateFAQSchema(faqSchemaItems(t.faq)),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Marketing by trade", url: `${base}/marketing` },
            { name: t.name, url: `${base}${t.path}` },
          ]),
        ]}
      />

      <GrowthHero crumbs={[["/", "Home"], ["/marketing", "Marketing by trade"], [t.path, t.name]]} eyebrow={`${t.name} marketing`} h1={t.h1} lede={t.lede} />

      <Glance
        rows={[
          ["Who it's for", `Owners of ${t.plural} in the US who want more calls from Google without paying for shared leads.`],
          ["What TableTurnerr does", <ul key="p" className="list-disc pl-5">{t.plan.map(([h]) => <li key={h}>{plain(h)}</li>)}</ul>],
          ["Searches we target", `${t.searches.slice(0, 4).map((q) => `"${q}"`).join(", ")} and similar searches in your towns.`],
          ["Works with", `${FSM}, or no software at all.`],
          ["Terms", "Done for you, month to month. You talk to an owner."],
          t.slug === "roofing" ? ["Proof", <Link key="r" href="/results/presidential-roofing" className="font-semibold text-primary">Presidential Roofing went from 27 to 43 Google reviews in 20 days</Link>] : null,
          ["First step", <span key="a">A <Link href={AUDIT_PATH} className="font-semibold text-primary">free Google Maps audit</Link> comparing you with the top competitors near you.</span>],
        ]}
      />

      <section className="section">
        <div className="container-tt">
          <SectionHead title={plain(t.problemHeading)} intro={t.problemIntro} />
          <CardGrid items={t.problems} />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="What homeowners actually type into Google" intro={t.searchIntro} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {t.searches.map((s) => <li key={s} className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm text-ink-soft">{s}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted">Examples of the search patterns we build pages and Google profiles around. We check real volume for your exact city before we start.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-tt">
          <SectionHead title={`Our plan for ${t.plural}`} intro={t.planIntro} />
          <CardGrid items={t.plan} numbered cols={2} />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt max-w-3xl"><Html html={deep.html} /></div>
      </section>

      <AuditBand title={t.ctaTitle} />
      <FaqSection faq={t.faq} />

      <section className="section">
        <div className="container-tt">
          <SectionHead title={`Guides for ${t.plural}`} />
          <GuideCards list={guidesForTrade(t.slug)} />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title={`Services ${t.plural} use most`} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {servicesForTrade(t).map((s) => (
              <Link key={s.slug} href={s.path} className="card card-hover group flex h-full flex-col p-6">
                <span className="text-lg font-bold text-ink">{s.short}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.description}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
          <h3 className="mt-12 text-lg font-bold text-ink">Marketing plans for other trades</h3>
          <TradeChips except={t.path} />
          <p className="mt-6 text-sm text-ink-soft">
            Prefer to run it yourself? See <Link href="/industries" className="font-semibold text-primary">review automation software by industry</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
