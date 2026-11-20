import type { Metadata } from "next";
import Script from "next/script";
import { Check } from "lucide-react";
import JsonLd from "@/app/components/site/JsonLd";
import { Crumbs, FaqSection, SectionHead, faqSchemaItems } from "@/app/components/growth/Growth";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/app/lib/schema";
import { AUDIT_PATH, growthSite, type Pair } from "@/app/lib/growth";

const base = "https://www.tableturnerr.com";
const description =
  "Free Google Maps audit for home-service businesses: see where you rank across your service area and how your reviews and profile compare to the top competitors near you.";

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
  ["How long does it take?", "We usually prepare it within a business day or two, then walk you through it in about 15 minutes."],
  ["Do I need to give you access to anything?", "No. Everything in the audit comes from public information on Google and your website."],
];

export default function Page() {
  const embed = growthSite.auditFormEmbed;
  const formId = embed.split("/").pop() ?? "";

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
              <p className="lead mt-6">We&apos;ll build a custom report on your Google presence and walk you through it on a short call, owner to owner. You keep the report whether you work with us or not.</p>
              <h2 className="mt-8 text-xl font-bold text-ink">What&apos;s in the report</h2>
              <ul className="mt-4 space-y-3">
                {checks.map((c) => (
                  <li key={c} className="flex gap-3 text-ink-soft"><Check className="mt-0.5 h-5 w-5 shrink-0 text-success" />{c}</li>
                ))}
              </ul>
              <p className="mt-6"><a href="#example-report" className="font-semibold text-primary hover:underline">See a real example report</a></p>
            </div>
            <div id="request" className="card scroll-mt-28 p-5 md:p-7">
              <h2 className="text-xl font-bold text-ink">Request your audit</h2>
              <iframe
                src={embed}
                id={`inline-${formId}`}
                className="mt-4 w-full rounded-lg border-0"
                style={{ height: 1122 }}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Appointment Form"
                data-height="1122"
                data-layout-iframe-id={`inline-${formId}`}
                data-form-id={formId}
                title="Free Google Maps audit request form"
              />
              <Script src="https://portalapi.tableturnerr.com/js/form_embed.js" strategy="afterInteractive" />
              <p className="mt-3 text-sm text-muted">
                Prefer to pick a time now? <a href={growthSite.bookingUrl} className="font-semibold text-primary">Book a 15-minute call</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
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
          <p className="mt-8"><a href="#request" className="btn btn-primary">Get your free audit</a></p>
        </div>
      </section>
      <FaqSection faq={faq} heading="Quick answers" />
    </>
  );
}
