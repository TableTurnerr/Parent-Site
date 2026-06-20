import type { ReactNode } from "react";
import Container from "@/app/components/ui/Container";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Breadcrumbs, { type Crumb } from "@/app/components/ui/Breadcrumbs";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

/**
 * Light, editorial hero for inner marketing pages. Bright off-white canvas, an
 * uppercase accent label, oversized confident type, and a single soft accent
 * wash + faded grid — restrained motion, agency-grade. Optionally takes a
 * `visual` (e.g. the RankClimb animation) for a two-column layout. The accent is
 * var-based so it re-tints inside a `.theme-medspa` / `.theme-restaurant` scope.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  visual,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  children?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-cream pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20">
      {/* Restrained decoration: one soft accent wash + a faded dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.045) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent 75%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        {breadcrumb && (
          <AnimatedElement variants={fadeInUp} className="mb-8">
            <Breadcrumbs items={breadcrumb} />
          </AnimatedElement>
        )}
        <div
          className={
            visual
              ? "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              : ""
          }
        >
          <AnimatedElement
            variants={staggerContainer}
            className={visual ? "lg:col-span-6" : "max-w-3xl"}
          >
            {eyebrow && (
              <AnimatedElement variants={fadeInUp}>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-cream-dark px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {eyebrow}
                </p>
              </AnimatedElement>
            )}
            <AnimatedElement variants={fadeInUp}>
              <h1 className="display-xl text-charcoal mb-6">{title}</h1>
            </AnimatedElement>
            {description && (
              <AnimatedElement variants={fadeInUp}>
                <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
                  {description}
                </p>
              </AnimatedElement>
            )}
            {children && (
              <AnimatedElement variants={fadeInUp} className="mt-8">
                {children}
              </AnimatedElement>
            )}
          </AnimatedElement>

          {visual && (
            <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
              {visual}
            </AnimatedElement>
          )}
        </div>
      </Container>
    </section>
  );
}
