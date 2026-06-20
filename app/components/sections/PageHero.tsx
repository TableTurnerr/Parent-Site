import type { ReactNode } from "react";
import Container from "@/app/components/ui/Container";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

/**
 * Shared decorative hero for inner marketing pages (services, about, locations,
 * blog, pricing, case studies). Replaces the old flat cream text blocks with a
 * layered light hero: drifting accent aurora glows + a faded dot grid + film
 * grain. The accent is var-based, so dropping this inside a `.theme-medspa` /
 * `.theme-restaurant` scope re-tints the glow automatically.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  topSlot,
  children,
  visual,
  align = "left",
}: {
  /** Handwriting accent line above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered above the eyebrow (e.g. a breadcrumb trail). */
  topSlot?: ReactNode;
  /** CTA row, chips, stats — rendered under the description. */
  children?: ReactNode;
  /** Optional right-column visual; when set, the hero becomes a two-column grid. */
  visual?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center" && !visual;

  return (
    <section className="hero-grain relative overflow-hidden bg-cream pt-32 sm:pt-36 md:pt-40 pb-14 md:pb-20">
      {/* Decorative background layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* faded dot grid */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        {/* drifting accent aurora glows */}
        <div className="aurora-blob absolute -top-24 right-[-6rem] h-80 w-80 rounded-full bg-accent/20 blur-[110px]" />
        <div className="aurora-blob-2 absolute top-12 left-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div
          className={
            visual
              ? "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              : ""
          }
        >
          <AnimatedElement
            variants={staggerContainer}
            className={
              visual
                ? "lg:col-span-7"
                : centered
                  ? "mx-auto max-w-3xl text-center"
                  : "max-w-3xl"
            }
          >
            {topSlot && (
              <AnimatedElement variants={fadeInUp} className="mb-6">
                {topSlot}
              </AnimatedElement>
            )}
            {eyebrow && (
              <AnimatedElement variants={fadeInUp}>
                <p
                  className={`font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-3 ${
                    centered ? "mx-auto w-fit" : ""
                  }`}
                >
                  {eyebrow}
                </p>
              </AnimatedElement>
            )}
            <AnimatedElement variants={fadeInUp}>
              <h1 className="display-xl text-charcoal mb-6">{title}</h1>
            </AnimatedElement>
            {description && (
              <AnimatedElement variants={fadeInUp}>
                <p
                  className={`text-warm-gray text-lg md:text-xl leading-relaxed ${
                    centered ? "mx-auto max-w-2xl" : "max-w-2xl"
                  }`}
                >
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
            <AnimatedElement variants={fadeInUp} className="lg:col-span-5">
              {visual}
            </AnimatedElement>
          )}
        </div>
      </Container>
    </section>
  );
}
