import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
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

      {/* Breadcrumb */}
      <div className="bg-cream pt-24 sm:pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-charcoal font-medium">Pricing</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Header */}
      <section className="bg-cream pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-2">
              honest numbers
            </p>
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
              What does local marketing cost?
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              Most agencies hide their pricing. We would rather give you straight
              answers. Here is what websites, local SEO, and Google Ads really
              cost for local businesses in 2026, so you can budget with confidence
              and spot a fair price from a bad one.
            </p>
          </div>
        </Container>
      </section>

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
