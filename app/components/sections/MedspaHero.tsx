import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

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

/**
 * Dark, full-bleed med spa hero — same dramatic treatment as the restaurant
 * hero, with its own image and an emerald wash (accent is emerald via the
 * page's .theme-medspa scope). Floating "appointment booked" glass cards + a
 * treatments marquee.
 */
export default function MedspaHero() {
  return (
    <section className="hero-grain relative flex min-h-screen items-center overflow-hidden bg-charcoal">
      <Image
        src="/images/hero/medspa-hero.png"
        alt="A serene, upscale med spa treatment room"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      {/* emerald + charcoal wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 15% 100%, rgba(16,128,90,0.5) 0%, transparent 55%), linear-gradient(180deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.55) 50%, rgba(26,26,26,0.92) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-5 py-32 sm:px-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <AnimatedElement variants={staggerContainer}>
            <AnimatedElement variants={fadeInUp}>
              <p className="mb-8 inline-flex items-center gap-2.5 text-cream/70 text-xs md:text-sm uppercase tracking-[0.25em] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Med Spa Marketing
              </p>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <h1
                className="font-display font-bold text-cream tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
              >
                <span className="relative inline-block">
                  More booked
                  <span
                    className="font-handwriting absolute -top-8 -right-8 md:-top-10 md:-right-12 rotate-[-8deg]"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.6rem)",
                      lineHeight: 1,
                      color: "color-mix(in oklab, var(--color-accent) 58%, white)",
                    }}
                    aria-hidden="true"
                  >
                    calendar full
                  </span>
                </span>
                <br />
                <span>treatments, </span>
                <span style={{ color: "color-mix(in oklab, var(--color-accent) 58%, white)" }}>
                  straight from Google.
                </span>
              </h1>
            </AnimatedElement>

            <div className="mt-10 grid grid-cols-1 items-end gap-8 md:mt-12 lg:grid-cols-12">
              <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
                <p className="max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl">
                  We get med spas and aesthetic clinics found on Google, then turn
                  those searches into booked consultations with high-converting
                  websites, an AI receptionist, and smart scheduling.
                </p>
              </AnimatedElement>

              <AnimatedElement
                variants={fadeInUp}
                className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-cream transition-colors hover:bg-accent-hover"
                >
                  Get a Free Audit
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 px-8 py-4 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  See our work
                </Link>
              </AnimatedElement>
            </div>
          </AnimatedElement>
        </div>
      </div>

      {/* floating appointment cards (dark glass) */}
      <div className="hero-float pointer-events-none absolute right-8 top-28 z-10 hidden w-60 rounded-2xl border border-cream/15 bg-charcoal/55 p-3.5 shadow-2xl backdrop-blur-md lg:block xl:right-16">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cream/70">
            <span className="text-accent">
              <CalendarIcon />
            </span>
            New appointment
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-semibold text-accent">
            <CheckIcon /> Booked
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-cream">Botox consultation</p>
        <p className="text-xs text-cream/60">Today · 2:30 PM</p>
      </div>
      <div className="hero-float-slow pointer-events-none absolute right-20 top-[19rem] z-10 hidden rounded-2xl border border-cream/15 bg-charcoal/55 px-4 py-3 shadow-2xl backdrop-blur-md lg:block xl:right-28">
        <p className="text-sm leading-none tracking-tight text-accent">★★★★★</p>
        <p className="mt-1.5 text-[11px] text-cream/60">clients love it</p>
      </div>

      {/* treatments marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-cream/15 bg-charcoal/40 py-4 backdrop-blur-sm">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {[
                "Botox",
                "Dermal Fillers",
                "Facials",
                "Laser Hair Removal",
                "Microneedling",
                "Skincare",
              ].map((item) => (
                <span key={item} className="flex items-center gap-8 text-sm uppercase tracking-[0.15em] text-cream/60">
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
