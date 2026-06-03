import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ReviewCalculator from "@/app/components/sections/ReviewCalculator";
import FaqList from "@/app/components/ui/FaqList";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Google Review Calculator",
  description:
    "Find out exactly how many new 5-star reviews your restaurant needs to raise its Google rating to a target, then learn how to get them.",
  path: "/review-calculator",
  keywords: [
    "google review calculator",
    "how many reviews to raise rating",
    "restaurant review calculator",
    "improve google star rating",
    "restaurant reviews",
  ],
});

const FAQS = [
  {
    question: "How many 5-star reviews do I need to raise my Google rating?",
    answer:
      "It depends on how many reviews you already have and your current average. The more reviews you have, the more new 5-star reviews it takes to move the average. Enter your numbers above to see the exact figure for your restaurant.",
  },
  {
    question: "Why does my rating move so slowly?",
    answer:
      "Your average is weighted by every review you have ever received. A restaurant with 500 reviews needs far more new 5-star reviews to move a tenth of a point than one with 30 reviews. That is why building reviews steadily over time matters.",
  },
  {
    question: "How can my restaurant get more 5-star reviews?",
    answer:
      "Ask happy diners at the right moment, make it one tap with a direct review link or QR code, train your team to mention it naturally, and respond to every review. A consistent system beats occasional bursts.",
  },
];

export default function ReviewCalculatorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Review Calculator", url: `${SITE_CONFIG.url}/review-calculator` },
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
              Restaurant Google Review Calculator
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              Reviews decide who clicks you and who scrolls past. See exactly how
              many new 5-star reviews it takes to lift your Google rating to where
              you want it, then start closing the gap.
            </p>
          </div>
        </Container>
      </section>

      <ReviewCalculator />

      {/* FAQ */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mb-8">
              Restaurant review questions
            </h2>
            <FaqList faqs={FAQS} />
            <p className="text-warm-gray mt-8">
              Want a system that keeps the reviews coming?{" "}
              <Link
                href="/services/google-business-profile-optimization"
                className="text-accent underline underline-offset-2"
              >
                See our Google Business Profile service
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
