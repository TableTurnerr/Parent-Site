import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import SavingsCalculator from "@/app/components/sections/SavingsCalculator";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Delivery Commission Calculator",
  description:
    "See how much DoorDash, Uber Eats, and Grubhub commissions cost your restaurant per year, then learn how commission-free ordering keeps that money in your pocket.",
  path: "/savings-calculator",
  keywords: [
    "doordash commission calculator",
    "restaurant delivery commission calculator",
    "third party delivery fees calculator",
    "how much does doordash charge restaurants",
    "commission free ordering savings",
  ],
});

const FAQS = [
  {
    question: "How much commission do DoorDash, Uber Eats, and Grubhub charge restaurants?",
    answer:
      "Third-party delivery apps typically charge restaurants between 15% and 30% per order, and with added fees the effective rate can climb past 30%. The exact rate depends on the plan and services you use.",
  },
  {
    question: "How does this calculator estimate my costs?",
    answer:
      "It multiplies your monthly delivery orders by your average order value and your commission rate to estimate what you pay in commissions each month and year. It is an estimate based on the figures you enter, not a quote.",
  },
  {
    question: "How can my restaurant reduce delivery commissions?",
    answer:
      "Commission-free ordering platforms replace per-order commissions with a low flat monthly rate and let customers order directly from your own website. Most restaurants use third-party apps to acquire new customers, then move repeat orders to their commission-free channel.",
  },
];

export default function SavingsCalculatorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Savings Calculator", url: `${SITE_CONFIG.url}/savings-calculator` },
  ]);
  const faqSchema = generateFAQSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]),
        }}
      />

      <section className="bg-cream pt-28 sm:pt-32 md:pt-36 pb-4 md:pb-8">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mt-3 mb-6">
              Restaurant Delivery Commission Calculator
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              DoorDash, Uber Eats, and Grubhub take a cut of every single order.
              Drag the sliders to see what those commissions add up to for your
              restaurant, then see how much you could keep with commission-free
              ordering.
            </p>
          </div>
        </Container>
      </section>

      <SavingsCalculator />

      {/* FAQ */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mb-8">
              Delivery commission questions
            </h2>
            <dl className="divide-y divide-border">
              {FAQS.map((faq) => (
                <div key={faq.question} className="py-5">
                  <dt className="font-medium text-charcoal mb-2">{faq.question}</dt>
                  <dd className="text-warm-gray leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="text-warm-gray mt-8">
              Want the full picture?{" "}
              <Link
                href="/services/commission-free-deliveries"
                className="text-accent underline underline-offset-2"
              >
                Explore commission-free deliveries
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
