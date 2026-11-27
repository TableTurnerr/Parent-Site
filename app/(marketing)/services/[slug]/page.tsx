import { ClientLogoStrip } from "@/app/components/growth/Proof";
import { BookCallBand, CallNowBand } from "@/app/components/growth/ContactCtas";
import type { Metadata } from "next";
import { pageTitle } from "@/app/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { toolsForPage } from "@/app/lib/growth/tools";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, ToolCallout, Glance, GrowthHero, GuideCards, Html, SectionHead, TradeChips, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { ON_CRM_PRICE, SERVICE_PRICE } from "@/app/lib/pricing";
import AiAnsweringDemo from "@/app/components/growth/AiAnsweringDemo";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { FSM, combosForService, getService, guidesInTopic, plain, serviceTopics, services, topics, withToc } from "@/app/lib/growth";


// Price line per service comes from app/lib/pricing.ts (one source for every page).
const base = "https://www.tableturnerr.com";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: pageTitle(s.title.replace(/\s*\|\s*TableTurnerr$/, "")),
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
  const byTrade = combosForService(s.slug);

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
          ["Price", <span key="p">{SERVICE_PRICE[s.slug] ?? ON_CRM_PRICE}. See all <Link href="/pricing" className="font-semibold text-primary">five packages</Link>.</span>],
          ["Terms", "Done for you, month to month."],
        ]}
      />
      {(s.slug === "ai-answering-service" || s.slug === "missed-call-text-back") && (
        <section className="section bg-surface" id="demo">
          <div className="container-tt">
            <SectionHead title="See and hear it" intro="A sample call for your trade, the text you get afterwards, and our live demo line. Then work out your monthly cost." />
            <div className="mt-10"><AiAnsweringDemo /></div>
          </div>
        </section>
      )}
      <ClientLogoStrip />
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
      <BookCallBand />
      <ToolCallout items={toolsForPage(s.path)} />
      <AuditBand />
      <FaqSection faq={s.faq} />
      <CallNowBand />
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
          <SectionHead title="Who we do this for" intro={byTrade.length > 0 ? `${s.short}, written for specific trades:` : "Plans written for each trade:"} />
          {byTrade.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {byTrade.map((c) => (
                <Link key={c.path} href={c.path} className="card card-hover group flex h-full flex-col p-6">
                  <span className="text-lg font-bold text-ink">{c.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{c.lede}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          )}
          {byTrade.length > 0 && <h3 className="mt-12 text-lg font-bold text-ink">Full marketing plans by trade</h3>}
          <TradeChips />
          <p className="mt-8 text-sm text-ink-soft">See <Link href="/services/everything-we-set-up" className="font-semibold text-primary">everything we set up</Link>, or look up a word in the <Link href="/glossary" className="font-semibold text-primary">glossary</Link>.</p>
        </div>
      </section>
    </>
  );
}
