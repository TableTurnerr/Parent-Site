import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import {
  AuditBand, CardGrid, FaqSection, Glance, GrowthHero, GuideCards, NextSteps, SectionHead, VideoSection, faqSchemaItems,
} from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/app/lib/schema";
import { AUDIT_PATH, FSM, clientStatesText, getGuide, services, type Guide, type Pair } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const description =
  "Done-for-you marketing for home-service businesses: Google Business Profile management, review generation, local SEO, contractor websites and missed-call text-back. Month to month.";

export const metadata: Metadata = {
  title: "Done-For-You Marketing Services for Contractors",
  description,
  alternates: { canonical: `${base}/services` },
  openGraph: { title: "Done-for-you marketing services for home-service businesses", description, url: `${base}/services` },
};

const STEPS: Pair[] = [
  ["Free Google Maps audit", "We show you where you rank across your service area, how you compare to the top competitors near you and what to fix first."],
  ["We set it up", "Google profile fixed, review requests connected to your job software, call capture switched on. Usually within the first week or two."],
  ["We run it and report", "Ongoing posts, photos, review replies, pages and follow-up, with a plain-English monthly report on reviews, rankings and calls."],
];

const faq: Pair[] = [
  ["Can I pick just one service?", "Yes. Many owners start with their Google Business Profile and review generation, then add a website or call capture later."],
  ["Do I have to learn any software?", "No. We run everything on our own software. If you'd rather run it yourself, there are self-serve plans on the pricing page."],
  ["Does it work with my job software?", `Yes. Review requests connect to ${FSM}, or we can work from a customer list if you don't use one.`],
  ["Do you require a contract?", "No. Month to month."],
  ["How much does it cost?", "It depends on which services you need and how competitive your area is. We'll give you a straight price on the audit call. The video on this page also covers pricing."],
];

const PILLAR_GUIDES = ["how-to-rank-higher-on-google-maps", "best-review-software-for-contractors", "contractor-seo-cost"];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "TableTurnerr done-for-you marketing services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Service", name: s.short, description: s.description, url: `${base}${s.path}`, provider: { "@type": "Organization", name: "TableTurnerr", url: base } },
            })),
          },
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Services", url: `${base}/services` }]),
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], ["/services", "Services"]]}
        eyebrow="Done-for-you services"
        h1="Everything it takes to win the call on Google, done for you"
        lede="We're an online marketing agency for home-service businesses, with our own software behind the work. Your Google profile, your reviews, your website, local SEO and the calls you'd otherwise miss: start with one piece or have us run all of it. Month to month, and you talk to an owner."
      />

      <Glance
        rows={[
          ["Who it's for", "Owners of US home-service businesses who want more calls from Google without paying for shared leads or learning another tool."],
          ["What's included", <span key="s">{services.map((s, i) => <span key={s.slug}>{i > 0 && ", "}<Link href={s.path} className="font-semibold text-primary">{s.short}</Link></span>)}.</span>],
          ["Works with", `${FSM}, or no software at all.`],
          ["Where", `Anywhere in the US. Current clients in ${clientStatesText}.`],
          ["Terms", "Done for you, month to month. No long contracts."],
          ["First step", <span key="a">A <Link href={AUDIT_PATH} className="font-semibold text-primary">free Google Maps audit</Link> of your business against the top competitors near you.</span>],
        ]}
      />

      <section className="section">
        <div className="container-tt">
          <SectionHead title="Our services" intro="Each one stands on its own. Together they cover everything a homeowner checks before calling." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={s.path} className="card card-hover group flex h-full flex-col p-6">
                <span className="text-lg font-bold text-ink">{s.short}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.description}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
            <Link href="/seo" className="card card-hover group flex h-full flex-col p-6">
              <span className="text-lg font-bold text-ink">SEO & AEO</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">Get found on Google and recommended by ChatGPT and other AI assistants, as one program.</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </section>

      <VideoSection surface />

      <section className="section">
        <div className="container-tt">
          <SectionHead eyebrow="How it works" title="From audit to a phone that rings" />
          <CardGrid items={STEPS} numbered />
          <p className="mt-8 text-sm text-ink-soft">
            Proof, not promises: <Link href="/results/presidential-roofing" className="font-semibold text-primary">Presidential Roofing went from 27 to 43 Google reviews in 20 days</Link>.
          </p>
        </div>
      </section>

      <AuditBand />
      <FaqSection faq={faq} />

      <section className="section">
        <div className="container-tt">
          <SectionHead title="Guides behind the services" intro="How we think about Maps rankings, reviews and SEO costs, written for owners." />
          <GuideCards list={PILLAR_GUIDES.map(getGuide).filter((g): g is Guide => Boolean(g))} />
        </div>
      </section>

      <NextSteps
        items={[
          ["/marketing", "Marketing plans by trade", "How homeowners search for your trade, and what we'd do first."],
          ["/pricing", "Pricing", "Custom plans: about $100–300/mo for one or two services, about $500/mo for the full program, about $1,000/mo with ads and after-hours AI answering."],
          ["/about", "How we work", "A small, owner-run team with clear rules: no fake reviews, no review gating."],
        ]}
      />
    </>
  );
}
