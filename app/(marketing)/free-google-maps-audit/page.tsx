import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { OpenAuditButton } from "@/app/components/growth/AuditGate";
import JsonLd from "@/app/components/site/JsonLd";
import { CardGrid, Crumbs, FaqSection, GuideCards, NextSteps, SectionHead, VideoSection, faqSchemaItems } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { AUDIT_PATH, getGuide, growthSite, type Guide, type Pair } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const description =
  "Free Google Maps audit for home-service businesses: see where you rank across your service area and how your reviews compare to the top competitors near you.";

export const metadata: Metadata = {
  title: "Free Google Maps Audit for Contractors",
  description,
  alternates: { canonical: `${base}${AUDIT_PATH}` },
  openGraph: { title: "Free Google Maps Audit for Contractors", description, url: `${base}${AUDIT_PATH}` },
};

const checks = [
  "A ranking heatmap: where you show on Google Maps across your whole service area, for your main searches",
  "The top 5 competitors near you, with their ratings and review counts next to yours",
  "Whether ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity recommend you",
  "A homepage check: title, description, H1 and schema markup",
  "How much people near you spend on your trade each month, and what to fix first",
];

const shots: [string, number, number, string, string, string][] = [
  ["overview", 1920, 1152, "Your profile and market size", "Your rating and review count, plus how much people within 30 minutes spend on your trade each month (here, an estimated $6M).", "Audit report header for Heckadon Roofing & Construction in Prosper, TX, with a 5.0 rating from 50 reviews, and a monthly market opportunity of $6,000,000"],
  ["competitors", 1920, 1092, "Who's beating you", "The top 5 businesses Google shows for your main search, with their ratings and review counts. Most had more reviews than this roofer.", "Top competitors list with five roofing companies, ratings from 4.9 to 5.0 and between 11 and 182 reviews"],
  ["heatmap", 1920, 2334, "Where you rank, street by street", "Each dot is a spot in the service area and the number is where you rank there for \"roofing contractor\". Green is top 3; red means customers there never see you. Average: #9.", "Google Maps ranking heatmap for roofing contractor: green dots ranking 1 to 3 in the center, red dots ranking 20+ to the south, average rank 9"],
  ["ai-and-website", 1920, 2144, "AI search and website check", "Whether ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity recommend you for \"best roofing contractors in Prosper\" (here, none did), plus a homepage check.", "AI visibility results showing Not found on six AI assistants, and a website audit passing title, description and H1 but failing schema markup"],
];

const faq: Pair[] = [
  ["Is the audit really free?", "Yes. You keep the report whether you work with us or not."],
  ["How long does it take?", "The instant scan takes a couple of minutes: you pick your business, up to 3 searches and your area. For the full report with competitors, the AI-assistant check and the homepage check, we walk you through it in about 15 minutes."],
  ["Do I need to give you access to anything?", "No. Everything in the audit comes from public information on Google and your website."],
  ["What should I have ready?", "One to three searches you want to show up for (for example \"roofer near me\" or \"AC repair Spokane\") and the main town you serve. That's it."],
  ["Why do you ask for my phone number?", "So a real person can walk you through your results and answer questions. We don't share it, and we don't add you to a call list."],
  ["Is this a sales call?", "It's a walkthrough of your report, owner to owner. If we can help, we'll say how and what it costs. If we can't, we'll tell you that too."],
  ["Who is it for?", "Owners of US home-service businesses: HVAC, plumbing, roofing, electrical, handyman, fencing, tree service, remodeling, landscaping and similar trades."],
];

const NEXT: Pair[] = [
  ["Tell us who you are", "Your business name and phone number. It takes ten seconds."],
  ["Run the instant scan", "Pick your business, up to 3 searches you want to show up for and your area. You see where you rank, street by street."],
  ["Full report and walkthrough", "We add your top competitors, the AI-assistant check and a homepage check, then go through it with you on a 15-minute call, owner to owner. You keep the report."],
];

const AUDIT_GUIDES = ["how-to-rank-higher-on-google-maps", "how-many-google-reviews-to-rank", "google-business-profile-suspended"];

export default function Page() {

  return (
    <>
      <JsonLd
        data={[
          generateServiceSchema({ name: "Free Google Maps audit", description, url: `${base}${AUDIT_PATH}` }),
          generateFAQSchema(faqSchemaItems(faq)),
          generateBreadcrumbSchema([{ name: "Home", url: base }, { name: "Free Google Maps audit", url: `${base}${AUDIT_PATH}` }]),
        ]}
      />
      <section className="hero-wash relative overflow-hidden pt-36 md:pt-44">
        <div aria-hidden className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-tt relative pb-14 md:pb-20">
          <Crumbs items={[["/", "Home"], [AUDIT_PATH, "Free Google Maps audit"]]} />
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Free, no obligation</span>
              <h1 className="display mt-6 text-ink">See exactly why competitors get the call</h1>
              <p className="lead mt-6">Run an instant scan of where you rank on Google Maps across your service area, then we<p className="lead mt-6">We&apos;ll build a custom report on your Google presence and walk you through it on a short call, owner to owner. You keep the report whether you work with us or not.</p>apos;ll walk you through the full report on a short call, owner to owner. You keep the report whether you work with us or not.</p>
              <h2 className="mt-8 text-xl font-bold text-ink">What&apos;s in the report</h2>
              <ul className="mt-4 space-y-3">
                {checks.map((c) => (
                  <li key={c} className="flex gap-3 text-ink-soft"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />{c}</li>
                ))}
              </ul>
              <p className="mt-6"><a href="#example-report" className="font-semibold text-primary hover:underline">See a real example report</a></p>
            </div>
            <div id="request" className="card scroll-mt-28 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ink">Start your free audit</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">Enter your business name and phone, then run the instant scan: your Google Maps ranking across your service area for up to 3 searches.</p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                {["Free, no credit card", "Results in a couple of minutes", "A person walks you through the full report"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>
                ))}
              </ul>
              <OpenAuditButton className="btn btn-primary mt-7 w-full">Start my free audit <ArrowRight className="h-4 w-4" /></OpenAuditButton>
              <p className="mt-4 text-sm text-muted">
                Prefer to talk first? <a href={growthSite.bookingUrl} className="font-semibold text-primary">Book a 15-minute call</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-tt">
          <SectionHead eyebrow="How it works" title="What happens after you ask for it" />
          <CardGrid items={NEXT} numbered />
        </div>
      </section>
      <VideoSection
        surface
        eyebrow="Before you book"
        title="See what we'll walk you through"
        intro="A 6-minute video from the owner: how reviews, call capture and staying active online make you the obvious choice in your area, what's in the free audit report (from 4:11) and what working with us costs (from 5:11)."
      />
      <section id="example-report" className="section scroll-mt-24 bg-surface">
        <div className="container-tt">
          <SectionHead
            title="What your audit looks like"
            intro="A real report we made for Heckadon Roofing & Construction in Prosper, Texas, exactly as they received it. Yours is built the same way for your trade and your area. Tap any image to see it full size."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {shots.map(([f, w, h, title, text, alt]) => (
              <figure key={f} className="audit-shot card overflow-hidden">
                <a href={`/images/audit/sample-audit-${f}.webp`} target="_blank" rel="noopener">
                  {/* Full-size report screenshots open in a new tab; plain <img> keeps the original file for that link. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/audit/sample-audit-${f}.webp`} width={w} height={h} alt={alt} loading="lazy" decoding="async" />
                </a>
                <figcaption className="p-5 text-sm leading-relaxed text-ink-soft"><strong className="text-ink">{title}.</strong> {text}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8"><OpenAuditButton>Start my free audit <ArrowRight className="h-4 w-4" /></OpenAuditButton></p>
        </div>
      </section>
      <FaqSection faq={faq} heading="Quick answers" />
      <section className="section">
        <div className="container-tt">
          <SectionHead title="Read while you wait" intro="The guides behind what the audit checks." />
          <GuideCards list={AUDIT_GUIDES.map(getGuide).filter((g): g is Guide => Boolean(g))} />
          <p className="mt-8"><OpenAuditButton>Start my free audit <ArrowRight className="h-4 w-4" /></OpenAuditButton></p>
        </div>
      </section>
      <NextSteps
        items={[
          ["/results/presidential-roofing", "See a client result", "How a Utah roofer went from 27 to 43 Google reviews in 20 days."],
          ["/services", "What we do after the audit", "Google Business Profile, reviews, local SEO, websites and missed-call text-back, done for you."],
          ["/about", "Who's behind it", "A small, owner-run team. When you call, you talk to an owner."],
        ]}
      />
    </>
  );
}
