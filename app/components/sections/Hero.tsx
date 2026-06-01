import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

const PROOF = [
  { value: "92%", label: "of diners search online before they pick a place" },
  { value: "+377%", label: "online growth for a restaurant on our partner stack" },
  { value: "$0", label: "commission with direct ordering we set up" },
] as const;

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] min-h-[600px] md:min-h-[680px] flex">
          {/* Background image + warm wash */}
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.72) 42%, rgba(26,26,26,0.25) 70%, rgba(26,26,26,0.05) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 w-full flex flex-col justify-center p-7 sm:p-12 md:p-16 lg:p-20">
            <AnimatedElement variants={staggerContainer} className="max-w-2xl">
              <AnimatedElement variants={fadeInUp}>
                <p className="eyebrow-accent text-cream/70 text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-6">
                  Restaurant Marketing Agency
                </p>
              </AnimatedElement>

              <h1 className="font-display font-bold text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-cream mb-6">
                <BlurText text="Websites & marketing that" />{" "}
                <span className="text-accent-gradient">
                  <BlurText text="fill more tables" delay={200} />
                </span>
              </h1>

              <AnimatedElement variants={fadeInUp}>
                <p className="text-cream/80 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                  We build high-converting restaurant websites, run local SEO,
                  and manage Google Ads for independent restaurants, turning
                  online searches into paying customers every single day.
                </p>
              </AnimatedElement>

              <AnimatedElement
                variants={fadeInUp}
                className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
              >
                <Button href="/contact" variant="primary-light">
                  Get a Free Consultation
                </Button>
                <Link
                  href="/savings-calculator"
                  className="inline-flex items-center justify-center rounded-full border border-cream/30 text-cream px-7 py-3 text-sm font-medium hover:bg-cream/10 transition-colors"
                >
                  Try the commission calculator
                </Link>
              </AnimatedElement>

              {/* Star + trust line */}
              <AnimatedElement variants={fadeInUp} className="mt-8 flex items-center gap-3">
                <div className="flex text-accent" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9 4.7 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-cream/70 text-sm">
                  Trusted by independent restaurants nationwide
                </p>
              </AnimatedElement>
            </AnimatedElement>
          </div>

          {/* Floating proof stat (desktop) */}
          <AnimatedElement
            variants={fadeIn}
            className="hidden lg:block absolute bottom-8 right-8 z-10 w-64"
          >
            <div className="rounded-2xl bg-cream/95 backdrop-blur-sm p-6 elevate">
              <p className="font-display font-bold text-4xl text-accent-gradient leading-none">
                92%
              </p>
              <p className="text-charcoal/70 text-sm leading-relaxed mt-2">
                of diners search online before they decide where to eat. We make
                sure they find you.
              </p>
            </div>
          </AnimatedElement>
        </div>

        {/* Proof strip below hero */}
        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4"
        >
          {PROOF.map((p) => (
            <AnimatedElement
              key={p.label}
              variants={fadeInUp}
              className="rounded-2xl bg-cream-dark px-6 py-5"
            >
              <p className="font-display font-bold text-2xl md:text-3xl text-charcoal tabular-nums">
                {p.value}
              </p>
              <p className="text-warm-gray text-sm leading-relaxed mt-1">
                {p.label}
              </p>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </div>
    </section>
  );
}
