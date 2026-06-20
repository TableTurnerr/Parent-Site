import type { ReactNode } from "react";
import Container from "@/app/components/ui/Container";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Breadcrumbs, { type Crumb } from "@/app/components/ui/Breadcrumbs";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

/**
 * Shared dark hero for inner marketing pages (services, locations, blog, etc.).
 * Charcoal canvas so the accent aurora glows + faded grid pop, matching the
 * homepage / niche heroes. The accent is var-based, so dropping this inside a
 * `.theme-medspa` / `.theme-restaurant` scope re-tints the glow automatically.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
  visual,
  align = "left",
}: {
  /** Handwriting accent line above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Breadcrumb trail, rendered on-dark at the top of the hero. */
  breadcrumb?: Crumb[];
  /** CTA row, chips, stats — rendered under the description. */
  children?: ReactNode;
  /** Optional right-column visual; when set, the hero becomes a two-column grid. */
  visual?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center" && !visual;

  return (
    <section className="hero-grain relative overflow-hidden bg-charcoal pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
      {/* Decorative background: accent aurora glows + faded light grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob absolute -top-40 left-[-6%] h-[32rem] w-[32rem] rounded-full bg-accent/40 blur-[130px]" />
        <div className="aurora-blob-2 absolute top-0 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[130px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(250,250,248,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <Container className="relative z-10">
        {breadcrumb && (
          <AnimatedElement variants={fadeInUp} className="mb-8">
            <Breadcrumbs items={breadcrumb} onDark />
          </AnimatedElement>
        )}
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
            {eyebrow && (
              <AnimatedElement variants={fadeInUp}>
                <p
                  className={`font-handwriting text-3xl md:text-4xl rotate-[-3deg] mb-3 ${
                    centered ? "mx-auto w-fit" : ""
                  }`}
                  style={{
                    color: "color-mix(in oklab, var(--color-accent) 58%, white)",
                  }}
                >
                  {eyebrow}
                </p>
              </AnimatedElement>
            )}
            <AnimatedElement variants={fadeInUp}>
              <h1 className="display-xl text-cream mb-6">{title}</h1>
            </AnimatedElement>
            {description && (
              <AnimatedElement variants={fadeInUp}>
                <p
                  className={`text-warm-gray-light text-lg md:text-xl leading-relaxed ${
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
