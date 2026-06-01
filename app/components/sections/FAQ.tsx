"use client";

import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQ_DATA } from "@/app/lib/constants";

export default function FAQ() {
  return (
    <section className="bg-cream py-16 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left column — heading & intro (~40%) */}
          <AnimatedElement
            variants={staggerContainer}
            className="lg:col-span-5"
          >
            <AnimatedElement variants={fadeInUp}>
              <p className="eyebrow mb-6">FAQ</p>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <h2 className="display-lg text-charcoal mb-6">
                Frequently asked questions
              </h2>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <p className="text-warm-gray text-lg leading-relaxed">
                Everything you need to know about our restaurant website design,
                SEO, and marketing services. Can&apos;t find what you&apos;re
                looking for? Reach out and we&apos;ll be happy to help.
              </p>
            </AnimatedElement>
          </AnimatedElement>

          {/* Right column — accordion (~60%) */}
          <AnimatedElement
            variants={staggerContainer}
            className="lg:col-span-7"
          >
            <Accordion>
              {FAQ_DATA.map((faq, index) => (
                <AnimatedElement key={index} variants={fadeInUp}>
                  <AccordionItem className="border-b border-border">
                    <AccordionTrigger className="text-base md:text-lg font-medium text-charcoal py-5 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-warm-gray text-base leading-relaxed">
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedElement>
              ))}
            </Accordion>

            <AnimatedElement variants={fadeInUp}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[1.25rem] bg-cream-dark border border-border p-6">
                <p className="text-charcoal font-medium">
                  Still have questions about growing your restaurant?
                </p>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center justify-center rounded-full bg-charcoal text-cream px-6 py-3 text-sm font-medium hover:bg-charcoal-light transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </AnimatedElement>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
