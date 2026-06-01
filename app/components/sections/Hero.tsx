import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

export default function Hero() {
  return (
    <section className="px-5 sm:px-8 md:px-12 pt-32 sm:pt-36 md:pt-44 pb-12 md:pb-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedElement variants={staggerContainer}>
          <AnimatedElement variants={fadeInUp}>
            <p className="eyebrow mb-8 md:mb-12">Restaurant Marketing Agency</p>
          </AnimatedElement>

          <AnimatedElement variants={fadeInUp}>
            <h1 className="display-xl text-charcoal max-w-5xl">
              We build restaurants that{" "}
              <span className="text-accent">fill more tables.</span>
            </h1>
          </AnimatedElement>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <AnimatedElement variants={fadeInUp} className="lg:col-span-7">
              <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-xl">
                High-converting websites, local SEO, and Google Ads for
                independent restaurants. We turn online searches into paying
                customers, every single day.
              </p>
            </AnimatedElement>

            <AnimatedElement
              variants={fadeInUp}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-charcoal text-cream px-7 py-3.5 text-sm font-medium hover:bg-charcoal-light transition-colors"
              >
                Get a free consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 text-charcoal px-7 py-3.5 text-sm font-medium hover:border-charcoal/50 transition-colors"
              >
                See our work
              </Link>
            </AnimatedElement>
          </div>
        </AnimatedElement>

        {/* Cinematic image band */}
        <AnimatedElement variants={fadeIn} className="mt-12 md:mt-20">
          <div className="relative h-[320px] sm:h-[440px] md:h-[560px] rounded-[1.5rem] overflow-hidden">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </AnimatedElement>

        {/* Quiet proof line */}
        <AnimatedElement
          variants={fadeInUp}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-warm-gray"
        >
          <span className="text-sm">Trusted by independent restaurants nationwide</span>
          <span className="hidden sm:inline text-warm-gray-light" aria-hidden="true">/</span>
          <span className="text-sm">
            <span className="text-charcoal font-medium">92%</span> of diners search online first
          </span>
          <span className="hidden sm:inline text-warm-gray-light" aria-hidden="true">/</span>
          <span className="text-sm">
            <span className="text-charcoal font-medium">+377%</span> peak partner growth
          </span>
        </AnimatedElement>
      </div>
    </section>
  );
}
