import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import PageHero from "@/app/components/sections/PageHero";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";
import { COST_PAGE_LIST } from "@/app/lib/cost-data";

export const metadata: Metadata = createPageMetadata({
  title: "What Local Marketing Really Costs (2026 Pricing)",
  description:
    "Straight answers on what websites, local SEO, and Google Ads cost for local businesses in 2026, so you can budget with confidence and spot a fair price.",
  path: "/pricing",
  keywords: [
    "local marketing pricing",
    "website cost",
    "local SEO cost",
    "google ads cost",
    "small business marketing cost",
  ],
});

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Pricing", url: `${SITE_CONFIG.url}/pricing` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <PageHero
        eyebrow="honest numbers"
        title="What does local marketing cost?"
        description="Most agencies hide their pricing. We would rather give you straight answers. Here is what websites, local SEO, and Google Ads really cost for local businesses in 2026, so you can budget with confidence and spot a fair price from a bad one."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      {/* Cost page cards */}
      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {COST_PAGE_LIST.map((page) => (
              <Link
                key={page.slug}
                href={`/pricing/${page.slug}`}
                className="group block bg-cream-dark rounded-[1.25rem] p-7 md:p-8 border border-transparent hover:border-border transition-colors h-full"
              >
                <h2 className="font-display font-semibold text-xl text-charcoal mb-3">
                  {page.h1}
                </h2>
                <p className="text-warm-gray leading-relaxed mb-6">
                  {page.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-charcoal font-medium">
                  See the numbers
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
