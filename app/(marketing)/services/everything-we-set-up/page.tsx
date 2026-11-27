import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/site/JsonLd";
import { BookCallBand, CallNowBand } from "@/app/components/growth/ContactCtas";
import { AuditBand, CardGrid, FaqSection, Glance, GrowthHero, NextSteps, SectionHead, faqSchemaItems } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/app/lib/schema";
import { FSM, type Pair } from "@/app/lib/growth";
import { CAPABILITIES, NOT_FOR } from "@/app/lib/growth/capabilities";
import { pageTitle } from "@/app/lib/metadata";

const base = "https://www.tableturnerr.com";
const path = "/services/everything-we-set-up";
const total = CAPABILITIES.reduce((n, g) => n + g.items.length, 0);
const description =
  "The full list of what we set up for home-service companies: online booking, text-to-pay, call answering, follow-ups, reviews, websites and maintenance plans.";

export const metadata: Metadata = {
  title: pageTitle("Everything We Set Up for Contractors"),
  description,
  alternates: { canonical: `${base}${path}` },
  openGraph: { title: "Everything we set up for home-service companies", description, url: `${base}${path}` },
};

const EXAMPLES: Pair[] = [
  ["A two-truck plumber", "Missed calls get a text in seconds. Water-heater and drain visits book online. Every invoice goes out with a pay link, and every customer is asked for a review."],
  ["An HVAC company", "Tune-up plans bill monthly. Past customers hear from you before the first hot week. An AI receptionist takes after-hours calls and flags no-heat calls."],
  ["A roofer", "Inspection requests arrive with photos. Estimates are signed on a phone, with deposit and progress payments. Quiet estimates get three polite follow-ups."],
  ["A cleaning company", "Quotes by bedrooms and bathrooms, recurring visits with a card on file, reminders the day before, and a hiring page that replies to applicants."],
  ["A landscaper", "Spring and fall reminders to last year's customers, job photos posted every week, and a lead board so quotes don't pile up."],
  ["An electrician", "Booking for estimate visits, panel and EV-charger pages for each town, call tracking by source, and replies to every review."],
];

const faq: Pair[] = [
  ["Do I get all of this at once?", "No. We start with the thing costing you the most, usually missed calls, reviews or slow follow-up, and add pieces when you need them."],
  ["What software does it run on?", "Our CRM is built on HighLevel, with our own review software alongside it. You don't need a HighLevel account or any training."],
  ["Is everything included in the plans?", "Reviews are $97 a month. The Complete package at $797 covers the website, Google profile, local and AI search, missed-call text-back, AI answering with 150 minutes, CRM, follow-ups and seasonal campaigns; Starter ($297) and Growth ($597) add these step by step, and Partner ($1,797) adds ads and strategy. Some items here, such as payments, plans or hiring pages, depend on your setup, so we confirm what's included, and any carrier, usage or card fees, in writing before you start."],
  ["Do I have to leave Jobber or Housecall Pro?", `No. We work around ${FSM}. They run the job. We handle finding customers, answering, following up and reviews.`],
  ["Who owns the data?", "You do. Your customers, reviews, domain and content stay yours, and you can export your contacts if you leave."],
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "What TableTurnerr sets up for home-service companies",
            numberOfItems: total,
            itemListElement: CAPABILITIES.flatMap((g) => g.items).map(([name, what], i) => ({ "@type": "ListItem", position: i + 1, name, description: what })),
          },
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Services", url: `${base}/services` },
            { name: "Everything we set up", url: `${base}${path}` },
          ]),
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], ["/services", "Services"], [path, "Everything we set up"]]}
        eyebrow="The full list"
        h1="Everything we can set up for your business"
        lede={`${total} things, from a Google profile that gets calls to invoices paid by text. In plain words, with an example and the catch for each. Pick the one that would help most this month.`}
      />
      <Glance
        rows={[
          ["What it is", "Marketing, a CRM and automations for home-service companies, set up and run for you."],
          ["Built on", "HighLevel for the CRM, plus our own review software. No training needed."],
          ["Works with", `${FSM}, or no software at all.`],
          ["Price", <span key="p">From $97 a month for reviews to $1,797 for Partner, no contracts. Custom pricing on a call. See <Link href="/pricing" className="font-semibold text-primary">pricing</Link>.</span>],
          ["Not included", "Dispatch, routes, job costing, payroll, bookkeeping and paid ads."],
          ["First step", <span key="f">A <Link href="/free-google-maps-audit" className="font-semibold text-primary">free Google Maps audit</Link>, then one call about what to fix first.</span>],
        ]}
      />
      <nav aria-label="On this page" className="container-tt pt-10">
        <ul className="flex flex-wrap gap-2">
          {CAPABILITIES.map((g) => (
            <li key={g.id}><a href={`#${g.id}`} className="inline-block rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-primary hover:text-ink">{g.title}</a></li>
          ))}
        </ul>
      </nav>
      {CAPABILITIES.map((g, gi) => (
        <section key={g.id} id={g.id} className={`section scroll-mt-24 ${gi % 2 ? "bg-surface" : ""}`}>
          <div className="container-tt">
            <SectionHead title={g.title} intro={g.intro} />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {g.items.map(([name, what, example, note, href]) => (
                <div key={name} className="card flex h-full flex-col p-6">
                  <h3 className="text-lg font-bold text-ink">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{what}.</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft"><span className="font-semibold text-ink">Example:</span> {example}</p>
                  {note && <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-semibold">Good to know:</span> {note}</p>}
                  {href && <Link href={href} className="mt-auto pt-4 text-sm font-semibold text-primary" aria-label={`More about ${name}`}>Learn more</Link>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="section">
        <div className="container-tt">
          <SectionHead title="What it looks like for your trade" intro="Typical setups, not case studies." />
          <CardGrid items={EXAMPLES} />
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="What we don't replace" intro="So you don't buy the wrong thing." />
          <CardGrid items={NOT_FOR} cols={2} />
        </div>
      </section>
      <BookCallBand title="Tell us what's slipping. We'll tell you what to set up first." />
      <AuditBand />
      <FaqSection faq={faq} />
      <CallNowBand />
      <NextSteps
        items={[
          ["/guides/gohighlevel-for-contractors", "HighLevel for contractors", "What the software behind it does well, and what it doesn't."],
          ["/guides/crm-vs-field-service-software", "CRM or field-service software?", "Which one fixes your problem."],
          ["/tools", "Free tools", "Calculators, templates and a review QR code maker."],
        ]}
      />
    </>
  );
}
