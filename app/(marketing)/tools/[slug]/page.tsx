import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/site/JsonLd";
import { AuditBand, FaqSection, GrowthHero, NextSteps, SectionHead, faqSchemaItems } from "@/app/components/growth/Growth";
import { MissedCallCalculator, ReviewCalculator, ReviewTemplates, RoiCalculator } from "@/app/components/growth/Calculators";
import DocMaker from "@/app/components/growth/DocMaker";
import {
  ContractorMessages, HourlyRateCalculator, JobPriceCalculator, MaintenancePlanCalculator, PhoneScripts, ReviewLinkMaker,
} from "@/app/components/growth/JobTools";
import {
  CostPerLeadCalculator, GbpDescriptionBuilder, LeadResponseCalculator, MissedCallTemplates, ReviewReplyTemplates,
} from "@/app/components/growth/LeadTools";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/app/lib/schema";
import { getTool, tools, type ToolSlug } from "@/app/lib/growth/tools";

const base = "https://www.tableturnerr.com";

const COMPONENTS: Record<ToolSlug, () => React.JSX.Element> = {
  "google-review-calculator": ReviewCalculator,
  "missed-call-calculator": MissedCallCalculator,
  "marketing-roi-calculator": RoiCalculator,
  "review-request-templates": ReviewTemplates,
  "job-price-calculator": JobPriceCalculator,
  "hourly-rate-calculator": HourlyRateCalculator,
  "maintenance-plan-calculator": MaintenancePlanCalculator,
  "cost-per-lead-calculator": CostPerLeadCalculator,
  "estimate-template": () => <DocMaker kind="estimate" />,
  "invoice-template": () => <DocMaker kind="invoice" />,
  "contractor-text-templates": ContractorMessages,
  "phone-scripts": PhoneScripts,
  "google-review-link-generator": ReviewLinkMaker,
  "lead-response-calculator": LeadResponseCalculator,
  "google-business-description-generator": GbpDescriptionBuilder,
  "missed-call-text-templates": MissedCallTemplates,
  "review-response-templates": ReviewReplyTemplates,
};

/** Copy-and-paste pages are plain pages, not web apps. */
const TEMPLATE_PAGES: ToolSlug[] = ["review-request-templates", "contractor-text-templates", "phone-scripts", "missed-call-text-templates", "review-response-templates"];
const MAKER_PAGES: ToolSlug[] = ["estimate-template", "invoice-template", "google-review-link-generator", "google-business-description-generator"];

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTool((await params).slug);
  if (!t) return {};
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: `${base}${t.path}` },
    openGraph: { title: t.title, description: t.description, url: `${base}${t.path}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTool((await params).slug);
  if (!t) notFound();
  const Tool = COMPONENTS[t.slug];
  const isTemplates = TEMPLATE_PAGES.includes(t.slug);
  const isMaker = MAKER_PAGES.includes(t.slug);

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: "Home", url: base },
            { name: "Free tools", url: `${base}/tools` },
            { name: t.name, url: `${base}${t.path}` },
          ]),
          generateFAQSchema(faqSchemaItems(t.faq)),
          isTemplates
            ? { "@context": "https://schema.org", "@type": "WebPage", name: t.h1, description: t.description, url: `${base}${t.path}` }
            : {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: t.name,
                description: t.description,
                url: `${base}${t.path}`,
                applicationCategory: "BusinessApplication",
                operatingSystem: "Any (runs in the browser)",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                publisher: { "@type": "Organization", name: "TableTurnerr", url: base },
              },
        ]}
      />
      <GrowthHero crumbs={[["/", "Home"], ["/tools", "Free tools"], [t.path, t.name]]} eyebrow="Free tool" h1={t.h1} lede={t.lede} trust={false}>
        <p className="mt-6 text-sm text-muted">Free. No email needed. {isTemplates ? "Copy any template with one tap." : isMaker ? "Nothing you type leaves your browser." : "Change any number and the result updates."}</p>
      </GrowthHero>
      <section className="pb-16 md:pb-20">
        <div className="container-tt"><Tool /></div>
      </section>
      <section className="section bg-surface">
        <div className="container-tt">
          <SectionHead eyebrow={isTemplates || isMaker ? "How to use it" : "How we work it out"} title={t.heading ?? (isTemplates ? "Three rules that get more reviews" : "The math, in plain English")} />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.method.map(([h, p]) => (
              <div key={h} className="card p-7">
                <p className="text-lg font-bold text-ink">{h}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted">
            Built by the <Link href="/about" className="font-semibold text-primary">TableTurnerr team</Link>, a small, owner-run
            marketing agency for home-service businesses. {isTemplates || isMaker ? "It's general help, not legal or tax advice." : "Results are estimates from the numbers you enter, not a promise."}
          </p>
        </div>
      </section>
      <FaqSection faq={t.faq} />
      <AuditBand />
      <NextSteps items={t.next} />
    </>
  );
}
