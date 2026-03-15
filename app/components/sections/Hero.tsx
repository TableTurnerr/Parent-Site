import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Button from "@/app/components/ui/Button";
import { fadeInUp, fadeIn } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

export default function Hero() {
  return (
    <section className="px-4 md:px-8 pt-28 md:pt-32 pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-[500px] md:min-h-[560px]">
          {/* Left panel — content card */}
          <AnimatedElement variants={fadeIn}>
            <div className="bg-cream-dark rounded-[1.5rem] p-8 md:p-12 lg:p-14 flex flex-col justify-center h-full">
              <p className="text-warm-gray text-xs md:text-sm uppercase tracking-[0.2em] font-medium mb-6 md:mb-8">
                Restaurant Marketing Agency &raquo;
              </p>

              <h1 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6 md:mb-8">
                <BlurText text="Restaurant Website" />
                <br />
                <BlurText text="Design & SEO That" delay={150} />
                <br />
                <BlurText text="Fills More Tables" delay={300} />
              </h1>

              <p className="text-warm-gray text-base md:text-lg leading-relaxed max-w-md mb-8 md:mb-10">
                We design high-converting restaurant websites, run local
                SEO campaigns, and manage Google Ads for independent
                restaurants — turning online searches into paying
                customers, every single day.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button href="/contact" variant="primary">
                  Get a Free Report
                </Button>
                <Button href="/services" variant="secondary">
                  View Services
                </Button>
              </div>
            </div>
          </AnimatedElement>

          {/* Right panel — hero image */}
          <AnimatedElement variants={fadeInUp}>
            <div className="relative rounded-[1.5rem] overflow-hidden h-full min-h-[320px] md:min-h-0">
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
