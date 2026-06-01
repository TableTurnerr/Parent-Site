import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
      {/* Background image */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      {/* Dramatic terracotta + charcoal wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 15% 100%, rgba(200,85,61,0.55) 0%, transparent 55%), linear-gradient(180deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.55) 50%, rgba(26,26,26,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 py-32">
        <div className="mx-auto max-w-6xl">
          <AnimatedElement variants={staggerContainer}>
            <AnimatedElement variants={fadeInUp}>
              <p className="inline-flex items-center gap-2.5 text-cream/70 text-xs md:text-sm uppercase tracking-[0.25em] font-medium mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Restaurant Marketing Agency
              </p>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <h1
                className="font-display font-bold text-cream tracking-tight"
                style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.92, letterSpacing: "-0.035em" }}
              >
                <span className="relative inline-block">
                  We fill
                  {/* handwritten chef's note */}
                  <span
                    className="font-handwriting text-accent absolute -top-8 -right-10 md:-top-10 md:-right-16 rotate-[-8deg]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    every seat,
                  </span>
                </span>
                <br />
                <span className="text-accent">more tables.</span>
              </h1>
            </AnimatedElement>

            <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
                <p className="text-cream/80 text-lg md:text-xl leading-relaxed max-w-xl">
                  High-converting websites, local SEO, and Google Ads for
                  independent restaurants. We turn online searches into paying
                  customers, every single day.
                </p>
              </AnimatedElement>

              <AnimatedElement
                variants={fadeInUp}
                className="lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent text-cream px-8 py-4 text-sm font-semibold hover:bg-accent-hover transition-colors"
                >
                  Get a free consultation
                </Link>
                <Link
                  href="/savings-calculator"
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 text-cream px-8 py-4 text-sm font-medium hover:bg-cream/10 transition-colors"
                >
                  Commission calculator
                </Link>
              </AnimatedElement>
            </div>
          </AnimatedElement>
        </div>
      </div>

      {/* Bottom scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/15 bg-charcoal/40 backdrop-blur-sm py-4 overflow-hidden">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {[
                "Restaurant Website Design",
                "Local SEO",
                "Google Ads",
                "Commission-Free Ordering",
                "Google Business Profile",
                "Brand Design",
              ].map((item) => (
                <span key={item} className="flex items-center gap-8 text-cream/60 text-sm uppercase tracking-[0.15em]">
                  {item}
                  <span className="text-accent" aria-hidden="true">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
