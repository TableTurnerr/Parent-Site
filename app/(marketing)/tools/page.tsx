import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import { generateBreadcrumbSchema } from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Free Restaurant Tools & Calculators",
  description:
    "Free calculators for restaurant owners: see what delivery commissions really cost you, how many reviews you need to lift your rating, and what to charge for any dish.",
  path: "/tools",
  keywords: [
    "free restaurant tools",
    "restaurant calculators",
    "restaurant commission calculator",
    "google review calculator",
    "menu price calculator",
  ],
});

const TOOLS = [
  {
    name: "Delivery Commission Calculator",
    href: "/savings-calculator",
    blurb:
      "See what DoorDash, Uber Eats, and Grubhub commissions add up to over a year, and what you could keep with commission-free ordering.",
    tag: "Profit",
  },
  {
    name: "Google Review Calculator",
    href: "/review-calculator",
    blurb:
      "Find out exactly how many new 5-star reviews it takes to raise your Google rating to the number you want.",
    tag: "Reputation",
  },
  {
    name: "Menu Price & Food Cost Calculator",
    href: "/menu-price-calculator",
    blurb:
      "Enter a dish's cost and your target food cost to get the menu price that hits it, plus the profit per plate and per month.",
    tag: "Pricing",
  },
] as const;

export default function ToolsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Tools", url: `${SITE_CONFIG.url}/tools` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Restaurant Tools & Calculators",
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `${SITE_CONFIG.url}${tool.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, itemListSchema]),
        }}
      />

      <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-4 md:pb-8">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>Free Tools</SectionLabel>
            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mt-3 mb-6">
              Restaurant tools and calculators
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              Quick, honest calculators to help you see the numbers behind your
              restaurant. No signup, no catch. Run yours and bring the questions
              to a free consultation.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-[1.25rem] border border-border bg-cream-dark p-7 elevate-hover transition-colors hover:border-warm-gray/40"
              >
                <span className="eyebrow text-warm-gray">{tool.tag}</span>
                <h2 className="font-display font-bold text-xl text-charcoal mt-3 mb-2 leading-snug">
                  {tool.name}
                </h2>
                <p className="text-warm-gray text-[0.95rem] leading-relaxed">
                  {tool.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Open calculator
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
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
