import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Button from "@/app/components/ui/Button";
import Container from "@/app/components/ui/Container";
import NumberTicker from "@/app/components/ui/NumberTicker";
import RotatingWord from "@/app/components/ui/RotatingWord";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M10 18s6-5.2 6-9.4A6 6 0 0 0 4 8.6C4 12.8 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8.5" r="2" fill="currentColor" />
    </svg>
  );
}

const STATS = [
  { value: 92, label: "use Google to find you" },
  { value: 90, label: "research before visiting" },
  { value: 88, label: "check your site first" },
];

/**
 * Dark, high-contrast homepage hero. Charcoal canvas so the indigo aurora glows
 * and the light "ranked #1" search panel + photo pop. Kinetic rotating headline
 * word, animated stat counters, grain, and a near-me search marquee.
 */
export default function HomeHero() {
  return (
    <section className="hero-grain relative overflow-hidden bg-charcoal pt-32 md:pt-40">
      {/* aurora */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-blob absolute -top-40 left-[-6%] h-[34rem] w-[34rem] rounded-full bg-accent/40 blur-[130px]" />
        <div className="aurora-blob-2 absolute top-6 right-[-10%] h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[130px]" />
      </div>
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(250,250,248,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <Container className="relative z-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* left: copy */}
          <AnimatedElement variants={staggerContainer} className="lg:col-span-6">
            <AnimatedElement variants={fadeInUp}>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-cream/70 text-xs md:text-sm uppercase tracking-[0.2em] font-medium backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                SEO Agency for Local Businesses
              </p>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <h1
                className="mt-7 font-display font-bold tracking-tight text-cream"
                style={{ fontSize: "clamp(2.8rem, 5.6vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-0.035em" }}
              >
                We turn local searches into{" "}
                <span className="hero-accent-word block">
                  <RotatingWord
                    words={["booked customers.", "more bookings.", "more orders.", "more calls."]}
                  />
                </span>
              </h1>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-cream/75 md:text-xl">
                We get local businesses found on Google, capture every lead with
                websites and an AI receptionist, and turn clicks into booked
                appointments and orders.
              </p>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/contact" variant="primary-light" className="w-full sm:w-auto">
                Get a Free Audit
              </Button>
              <Button href="/case-studies" variant="secondary-light" className="w-full sm:w-auto">
                See Our Work
              </Button>
            </AnimatedElement>

            <AnimatedElement variants={fadeInUp} className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-cream/15 pt-7">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold leading-none text-cream md:text-3xl">
                    <NumberTicker value={s.value} />%
                  </p>
                  <p className="mt-1.5 text-[11px] leading-snug text-cream/55">{s.label}</p>
                </div>
              ))}
            </AnimatedElement>
          </AnimatedElement>

          {/* right: photo + overlapping ranking panel */}
          <AnimatedElement variants={fadeInUp} className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none lg:pl-8">
              {/* photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-cream/10 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
                <Image
                  src="/images/hero/home-hero.png"
                  alt="A local business owner growing online with TableTurnerr"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              {/* ranking panel (light card pops on dark) */}
              <div className="hero-float absolute -left-4 bottom-8 w-64 rounded-2xl border border-border bg-cream p-3 shadow-2xl sm:-left-10">
                <div className="flex items-center gap-2 rounded-full border border-border bg-cream-dark px-3 py-2 text-xs text-warm-gray">
                  <SearchIcon className="text-accent" />
                  <span className="truncate">best local business near me</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-2 py-1.5">
                    <span className="text-accent"><PinIcon /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-charcoal">Your Business</p>
                      <p className="text-[10px] text-warm-gray">★ 4.9 · Open now</p>
                    </div>
                    <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-cream">#1</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 opacity-55">
                    <span className="text-warm-gray-light"><PinIcon /></span>
                    <p className="flex-1 truncate text-[11px] text-warm-gray">A competitor</p>
                    <span className="text-[10px] text-warm-gray-light">#2</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 opacity-40">
                    <span className="text-warm-gray-light"><PinIcon /></span>
                    <p className="flex-1 truncate text-[11px] text-warm-gray">Another competitor</p>
                    <span className="text-[10px] text-warm-gray-light">#3</span>
                  </div>
                </div>
              </div>

              {/* rating chip */}
              <div className="hero-float-slow absolute -right-2 top-6 rounded-2xl border border-border bg-cream px-4 py-3 shadow-2xl sm:-right-4">
                <p className="text-sm leading-none tracking-tight text-accent">★★★★★</p>
                <p className="mt-1.5 text-[11px] text-warm-gray">real client sites</p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </Container>

      {/* near-me searches marquee */}
      <div className="relative z-10 overflow-hidden border-t border-cream/15 bg-charcoal/40 py-4 backdrop-blur-sm">
        <div className="marquee flex whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {[
                "restaurants near me",
                "med spa near me",
                "botox near me",
                "best restaurant near me",
                "facials near me",
                "medical spa near me",
              ].map((q) => (
                <span key={q} className="flex items-center gap-8 text-sm uppercase tracking-[0.12em] text-cream/55">
                  <span className="inline-flex items-center gap-2">
                    <SearchIcon className="text-accent" /> {q}
                  </span>
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
