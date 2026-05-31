import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp } from "@/app/lib/animations";

/**
 * Homepage teaser for the delivery-commission calculator. Drives traffic to
 * the interactive tool at /savings-calculator without duplicating its logic.
 */
export default function CalculatorTeaser() {
  return (
    <section className="bg-cream-dark py-16 md:py-24">
      <Container>
        <AnimatedElement variants={fadeInUp}>
          <div className="rounded-[1.5rem] border border-border bg-cream p-8 sm:p-10 md:p-14 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="lg:flex-1">
              <SectionLabel>Free Tool</SectionLabel>
              <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 mb-4">
                See what delivery apps are really costing you
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed max-w-xl">
                DoorDash, Uber Eats, and Grubhub take 15 to 30 percent of every
                order. Use our free calculator to see your yearly commission bill,
                then find out how much you could keep.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/savings-calculator"
                className="inline-flex items-center justify-center rounded-full bg-charcoal text-cream px-8 py-4 font-medium hover:bg-charcoal-light transition-colors"
              >
                Try the commission calculator
              </Link>
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
