import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, Glance, GrowthHero, GuideCards, Html, SectionHead, TradeChips, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { FSM, getService, guidesInTopic, plain, serviceTopics, services, topics, withToc } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.title.replace(/\s*\|\s*TableTurnerr$/, ""),
    description: s.description,
    alternates: { canonical: `${base}${s.path}` },
    openGraph: { title: s.title, description: s.description, url: `${base}${s.path}`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const topic = serviceTopics[s.slug];
  const topicGuides = topic ? guidesInTopic(topic).slice(0, 8) : [];

  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: s.short, description: s.description, url: `${base}${s.path}` }),
          generateFAQSchema(faqSchemaItems(s.faq)),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Services", url: `${base}/services` },
            { name: s.short, url: `${base}${s.path}` },
          ]),
        ]}
      />
      <GrowthHero crumbs={[["/", "Home"], ["/services", "Services"], [s.path, s.short]]} eyebrow={s.eyebrow} h1={s.h1} lede={s.lede} />
      <Glance
        rows={[
          ["What it is", s.description],
          ["What's included", <ul key="i" className="list-disc pl-5">{s.included.map(([h]) => <li key={h}>{plain(h)}</li>)}</ul>],
          ["How it works", <ol key="s" className="list-decimal pl-5">{s.steps.map(([h, d]) => <li key={h}><strong>{plain(h)}:</strong> {plain(d)}</li>)}</ol>],
          ["Who it's for", "US home-service businesses: roofers, HVAC, plumbers, electricians, handymen, fence companies, landscapers and more."],
          ["Works with", `${FSM}.`],
          ["Terms", "Done for you, month to month."],
        ]}
      />
      <section className="section">
        <div className="container-tt">
          <SectionHead title="What's included" intro={s.includedIntro} />
          <CardGrid items={s.included} />
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="How it works" />
          <CardGrid items={s.steps} numbered />
        </div>
      </section>
      <section className="section">
        <div className="container-tt max-w-3xl"><Html html={withToc(s.deepDive).html} /></div>
      </section>
      <AuditBand />
      <FaqSection faq={s.faq} />
      {topicGuides.length > 0 && (
        <section className="section">
          <div className="container-tt">
            <SectionHead title={`Guides on ${topics[topic].name.toLowerCase()}`} intro={topics[topic].intro} />
            <GuideCards list={topicGuides} />
          </div>
        </section>
      )}
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="Who we do this for" intro="Plans written for each trade:" />
          <TradeChips />
        </div>
      </section>
    </>
  );
}
