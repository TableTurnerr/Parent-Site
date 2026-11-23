// /seo: the SEO + AEO hub. Sells both together and hands off to the two service pages
// (/services/local-seo and /services/ai-search-optimization), which hold the detail.
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, MapPin, Search } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, FaqSection, Glance, GrowthHero, GuideCards, NextSteps, SectionHead, faqSchemaItems } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { AUDIT_PATH, guidesInTopic, type Pair } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const description =
  "SEO and AEO for home-service businesses: rank on Google Maps and in search, and get recommended by ChatGPT, Gemini, Perplexity and Google's AI answers. Done for you, month to month.";

export const metadata: Metadata = {
  title: { absolute: "SEO & AEO Services for Home-Service Businesses | TableTurnerr" },
  description,
  alternates: { canonical: `${base}/seo` },
  openGraph: { title: "SEO & AEO Services for Home-Service Businesses", description, url: `${base}/seo` },
};

const PLACES = [
  { icon: MapPin, t: "The Google map pack", d: "The three businesses under the map. Driven by your Google Business Profile, reviews and distance. Where most local calls start.", href: "/services/google-business-profile", cta: "Google Business Profile" },
  { icon: Search, t: "Google's regular results", d: "The links below the map. Driven by your website: a page for each service and town, fast on a phone, with real proof.", href: "/services/local-seo", cta: "Local SEO" },
  { icon: Bot, t: "AI answers", d: "ChatGPT, Google AI Mode and Overviews, Gemini, Perplexity and Copilot. They name two or three businesses and say why. AEO is how you become one of them.", href: "/services/ai-search-optimization", cta: "AI search (AEO)" },
];

const COMPARE: [string, string, string][] = [
  ["Goal", "Rank your pages and profile on Google", "Get your business named inside AI answers"],
  ["Where it shows", "Google Maps and Google search results", "ChatGPT, Google AI Mode and Overviews, Gemini, Perplexity, Copilot"],
  ["What moves it", "Google Business Profile, reviews, service and town pages, technical fixes, citations", "Consistent facts across the web, detailed reviews on several sites, answer-first pages, schema, mentions on other sites"],
  ["How we measure it", "Calls, form fills and rankings across your service area", "Whether each assistant names you for your trade and town, checked every month"],
];

const faq: Pair[] = [
  ["What is the difference between SEO and AEO?", "SEO gets your website and Google profile to rank in Google. AEO (answer engine optimization) gets your business named inside AI answers from ChatGPT, Google AI Mode, Gemini, Perplexity and Copilot. They share the same foundation, so we run them together."],
  ["Do I need both?", "For most home-service businesses, yes. Google still sends most local calls, but more homeowners now ask an AI assistant first. The same work (reviews, a strong profile, clear pages, consistent listings) helps both, so doing them together costs little extra."],
  ["How much do SEO and AEO cost?", "Local SEO and AEO are part of our Professional plan, which is about $500 a month for the full program. If you only want one piece, it can be less. We quote after the free audit, month to month."],
  ["How long until I see results?", "Profile, review and listing fixes can move things in weeks. New pages usually take 2 to 4 months to rank, and AI assistants pick up changes on their own schedule, so expect a few months for steady mentions."],
  ["Can you guarantee rankings or ChatGPT mentions?", "No. Nobody controls Google's rankings or what an AI assistant says. We commit to the work, show you exactly what we did and report the results every month."],
];

export default function Page() {
  const guides = guidesInTopic("seo").slice(0, 6);
  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: "SEO and AEO for home-service businesses", description, url: `${base}/seo` }),
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "SEO & AEO", url: `${base}/seo` }]),
        ]}
      />
      <GrowthHero
        crumbs={[["/", "Home"], ["/seo", "SEO & AEO"]]}
        eyebrow="SEO & AEO"
        h1="Get found on Google and recommended by AI"
        lede="Homeowners look for a contractor in three places now: the Google map, Google's results and AI assistants like ChatGPT. We run the SEO and AEO that gets you into all three, done for you, month to month."
      />
      <Glance
        rows={[
          ["What it is", "Local SEO (Google Maps and search) plus answer engine optimization (AEO) for AI assistants, run as one program for home-service businesses."],
          ["What's included", "Google Business Profile, service and town pages, technical fixes, citations, review generation, consistent listings across the web, schema and a monthly AI visibility check."],
          ["What it costs", <span key="p">Part of the Professional plan, about $500/mo for the full program. See <Link href="/pricing" className="font-semibold text-primary">pricing</Link>.</span>],
          ["Terms", "Month to month. Starts with a free Google Maps audit that also checks whether AI assistants recommend you."],
        ]}
      />
      <section className="section">
        <div className="container-tt">
          <SectionHead eyebrow="Where homeowners look" title="Three places to show up, one program" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PLACES.map((p) => (
              <Link key={p.t} href={p.href} className="card card-hover group flex flex-col p-7">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><p.icon className="h-5 w-5" aria-hidden /></span>
                <span className="mt-5 text-lg font-bold text-ink">{p.t}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.d}</span>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">{p.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead title="SEO vs AEO" intro="Different places, same foundation. That's why we run them together." />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-bg">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-ink">
                  <th className="p-4 font-semibold"><span className="sr-only">Topic</span></th>
                  <th className="p-4 font-semibold">SEO</th>
                  <th className="p-4 font-semibold">AEO</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, a, b]) => (
                  <tr key={k} className="border-b border-line last:border-0 align-top">
                    <th scope="row" className="p-4 font-semibold text-ink">{k}</th>
                    <td className="p-4 text-ink-soft">{a}</td>
                    <td className="p-4 text-ink-soft">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services/local-seo" className="btn btn-ghost">Local SEO in detail</Link>
            <Link href="/services/ai-search-optimization" className="btn btn-ghost">AEO in detail</Link>
            <Link href={AUDIT_PATH} className="btn btn-primary">Check where you show up <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
      {guides.length > 0 && (
        <section className="section">
          <div className="container-tt">
            <SectionHead eyebrow="Guides" title="SEO and AI search, in plain English" />
            <GuideCards list={guides} />
          </div>
        </section>
      )}
      <FaqSection faq={faq} />
      <AuditBand title="See if Google and ChatGPT recommend you" text="Your free audit shows where you rank on Google Maps across your service area, your top competitors, and whether ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity name you. Free, and you keep the report." />
      <NextSteps
        items={[
          ["/guides/how-to-get-recommended-by-chatgpt", "Get recommended by ChatGPT", "Where each AI assistant looks, and the 10-step checklist we use."],
          ["/guides/contractor-seo-cost", "What contractor SEO costs", "Typical prices, what you should get and the red flags."],
          ["/pricing", "Pricing", "Starter, Professional and Premier, month to month."],
        ]}
      />
    </>
  );
}
