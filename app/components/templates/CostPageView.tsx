import Link from "next/link";
import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import FaqList from "@/app/components/ui/FaqList";
import CTA from "@/app/components/sections/CTA";
import { SITE_CONFIG } from "@/app/lib/constants";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/app/lib/schema";
import type { CostPage } from "@/app/lib/cost-data";

export default function CostPageView({ page }: { page: CostPage }) {
  const url = `${SITE_CONFIG.url}/pricing/${page.slug}`;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Pricing", url: `${SITE_CONFIG.url}/pricing` },
    { name: page.h1, url },
  ]);
  const faqSchema = generateFAQSchema(page.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream pt-24 sm:pt-28 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link href="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-charcoal transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-charcoal font-medium">{page.h1}</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero + short answer */}
      <section className="bg-cream pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-2">
              {page.eyebrow}
            </p>
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
              {page.h1}
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed mb-8">
              {page.intro}
            </p>
            <div className="border-l-4 border-accent bg-cream-dark rounded-r-2xl p-6 md:p-7">
              <p className="font-display font-semibold text-sm uppercase tracking-wider text-warm-gray-light mb-2">
                The short answer
              </p>
              <p className="text-charcoal text-lg leading-relaxed">
                {page.shortAnswer}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Price tiers */}
      <section className="bg-cream pb-12 md:pb-16">
        <Container>
          <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-charcoal mb-8">
            {page.tiersHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {page.tiers.map((tier) => (
              <div
                key={tier.label}
                className="bg-white border border-border rounded-[1.25rem] p-7 flex flex-col"
              >
                <h3 className="font-display font-semibold text-lg text-charcoal mb-1">
                  {tier.label}
                </h3>
                <p className="font-display font-bold text-2xl text-accent mb-3">
                  {tier.price}
                </p>
                <p className="text-warm-gray leading-relaxed mb-4">
                  {tier.description}
                </p>
                <p className="mt-auto text-sm text-warm-gray-light">
                  <span className="font-medium text-charcoal">Best for:</span>{" "}
                  {tier.best}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What changes the price */}
      <section className="bg-cream-dark py-14 md:py-20">
        <Container>
          <div className="max-w-3xl mb-8">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-charcoal mb-4">
              {page.factorsHeading}
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              {page.factorsIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            {page.factors.map((factor) => (
              <div key={factor.title} className="flex gap-4">
                <span
                  className="shrink-0 mt-2 h-2 w-2 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display font-semibold text-charcoal mb-1">
                    {factor.title}
                  </h3>
                  <p className="text-warm-gray leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our approach + inline quote CTA */}
      <section className="bg-cream py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-charcoal mb-4">
              {page.approachHeading}
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-8">
              {page.approach}
            </p>
            <div className="bg-charcoal rounded-[1.25rem] p-7 md:p-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <p className="font-display font-bold text-xl text-cream mb-1">
                  Want a real number for your business?
                </p>
                <p className="text-warm-gray-light leading-relaxed">
                  Get a clear, custom quote with no obligation and no lock in.
                </p>
              </div>
              <Button href="/contact" variant="primary-light" className="shrink-0">
                Get a Custom Quote
              </Button>
            </div>
            <p className="text-warm-gray mt-6">
              Ready to get started?{" "}
              <Link
                href={page.relatedService.href}
                className="text-accent underline underline-offset-2"
              >
                {page.relatedService.label}
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-charcoal mb-8">
              Common questions
            </h2>
            <FaqList faqs={page.faqs} />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
