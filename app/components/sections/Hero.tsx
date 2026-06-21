import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m4 10 4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
                SEO Agency for Local Businesses
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
                    className="hero-accent-word font-handwriting absolute -top-8 -right-10 md:-top-10 md:-right-16 rotate-[-8deg]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    every seat,
                  </span>
                </span>
                <br />
                <span className="hero-accent-word">more tables.</span>
              </h1>
            </AnimatedElement>

            <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
                <p className="text-cream/80 text-lg md:text-xl leading-relaxed max-w-xl">
                  Local SEO, high-converting websites, and Google Ads for local
                  businesses. We turn online searches into paying customers,
                  every single day.
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
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 text-cream px-8 py-4 text-sm font-medium hover:bg-cream/10 transition-colors"
                >
                  See our work
                </Link>
              </AnimatedElement>
            </div>
          </AnimatedElement>
        </div>
      </div>

      {/* Floating reservation + orders cards (dark glass) */}
      <div className="hero-float pointer-events-none absolute right-8 top-28 z-10 hidden w-60 rounded-2xl border border-cream/15 bg-charcoal/55 p-3.5 shadow-2xl backdrop-blur-md lg:block xl:right-16">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cream/70">
            <span className="text-accent">
              <CalendarIcon />
            </span>
            New reservation
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-semibold text-accent">
            <CheckIcon /> Booked
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-cream">Table for 4</p>
        <p className="text-xs text-cream/60">Tonight · 7:30 PM</p>
      </div>
      <div className="hero-float-slow pointer-events-none absolute right-20 top-[19rem] z-10 hidden rounded-2xl border border-cream/15 bg-charcoal/55 px-4 py-3 shadow-2xl backdrop-blur-md lg:block xl:right-28">
        <p className="font-display text-xl font-bold leading-none text-cream">
          Direct orders, <span className="text-accent">0%</span>
        </p>
        <p className="mt-1 text-[11px] text-cream/60">commission to the apps</p>
      </div>

      {/* Bottom scrolling marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/15 bg-charcoal/40 backdrop-blur-sm py-4 overflow-hidden">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {[
                "Website Design",
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
