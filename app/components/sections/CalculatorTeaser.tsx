import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp } from "@/app/lib/animations";

/**
 * Homepage teaser for the delivery-commission calculator. Bold terracotta
 * band that drives traffic to the interactive tool at /savings-calculator.
 */
export default function CalculatorTeaser() {
  return (
    <section className="py-6 md:py-10">
      <Container>
        <AnimatedElement variants={fadeInUp}>
          <div
            className="relative overflow-hidden rounded-[1.75rem] p-8 sm:p-12 md:p-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12"
            style={{ background: "linear-gradient(120deg, #C8553D 0%, #A8412E 100%)" }}
          >
            {/* Decorative oversized glyph */}
            <span
              className="pointer-events-none absolute -right-6 -bottom-16 font-display font-bold text-cream/10 leading-none select-none"
              style={{ fontSize: "16rem" }}
              aria-hidden="true"
            >
              %
            </span>

            <div className="relative lg:flex-1">
              <p className="inline-flex items-center gap-2.5 text-cream/80 text-xs uppercase tracking-[0.22em] font-medium mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-cream" aria-hidden="true" />
                Free Tool
              </p>
              <h2 className="display-lg text-cream mb-4">
                See what delivery apps are really costing you
              </h2>
              <p className="text-cream/85 text-lg leading-relaxed max-w-xl">
                DoorDash, Uber Eats, and Grubhub take 15 to 30 percent of every
                order. See your yearly commission bill, then find out how much
                you could keep.
              </p>
            </div>
            <div className="relative shrink-0">
              <Link
                href="/savings-calculator"
                className="inline-flex items-center justify-center rounded-full bg-cream text-charcoal px-8 py-4 font-semibold hover:bg-white transition-colors"
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
