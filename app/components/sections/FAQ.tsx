"use client";

import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
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
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — heading & intro (~40%) */}
          <AnimatedElement
            variants={staggerContainer}
            className="lg:col-span-5"
          >
            <AnimatedElement variants={fadeInUp}>
              <SectionLabel>FAQ</SectionLabel>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-4 mb-6">
                <BlurText text="Frequently Asked" />
                <br />
                <BlurText text="Questions" delay={200} />
              </h2>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <p className="text-warm-gray text-lg leading-relaxed">
                Everything you need to know about working with us. Can&apos;t
                find what you&apos;re looking for? Reach out and we&apos;ll be
                happy to help.
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
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
