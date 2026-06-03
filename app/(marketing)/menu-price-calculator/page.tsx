import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import MenuPriceCalculator from "@/app/components/sections/MenuPriceCalculator";
import FaqList from "@/app/components/ui/FaqList";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Menu Price & Food Cost Calculator",
  description:
    "Work out what to charge for any dish. Enter your plate cost and target food cost percentage to get a menu price, the profit it leaves per plate, and per month.",
  path: "/menu-price-calculator",
  keywords: [
    "food cost calculator",
    "menu price calculator",
    "food cost percentage calculator",
    "how to price menu items",
    "restaurant pricing calculator",
  ],
});

const FAQS = [
  {
    question: "How do I price a menu item from its food cost?",
    answer:
      "Divide what the dish costs you to make by your target food cost percentage. If a plate costs you $4.50 to make and you want a 30% food cost, the menu price is $4.50 divided by 0.30, which is $15. Enter your own numbers above to see the price and the profit it leaves.",
  },
  {
    question: "What is a good food cost percentage for a restaurant?",
    answer:
      "Most restaurants aim for a food cost between 28% and 35% of the menu price, though it varies by concept. Lower food cost leaves more for labor and overhead, but pricing too high for your market can cost you orders. Treat the result as a floor and test what your guests will pay.",
  },
  {
    question: "Does this calculator account for labor and overhead?",
    answer:
      "No. It prices from food cost only, so the result is a starting price before labor, rent, packaging, and other costs. Use it to set a floor, then layer in your full operating costs and what competitors in your area charge.",
  },
];

export default function MenuPriceCalculatorPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Menu Price Calculator", url: `${SITE_CONFIG.url}/menu-price-calculator` },
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
              Restaurant Menu Price &amp; Food Cost Calculator
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed">
              Guessing on prices leaves money on every plate. Enter what a dish
              costs you to make and the food cost you want to hit, and see the menu
              price that gets you there, plus the profit it puts in your pocket.
            </p>
          </div>
        </Container>
      </section>

      <MenuPriceCalculator />

      {/* FAQ */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-charcoal mb-8">
              Menu pricing questions
            </h2>
            <FaqList faqs={FAQS} />
            <p className="text-warm-gray mt-8">
              A menu that is priced right still needs to look the part.{" "}
              <Link
                href="/services/restaurant-branding"
                className="text-accent underline underline-offset-2"
              >
                See our menu and branding service
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
