import Image from "next/image";
import Container from "@/app/components/ui/Container";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import { fadeInUp, fadeIn } from "@/app/lib/animations";
import { HERO_IMAGE } from "@/app/lib/constants";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-12">
        {/* Main headline area */}
        <Container className="flex-1 flex flex-col justify-center">
          {/* Small uppercase label */}
          <AnimatedElement variants={fadeIn}>
            <p className="text-cream/60 text-xs md:text-sm uppercase tracking-[0.25em] font-medium mb-4 md:mb-6">
              Restaurant Growth Agency
            </p>
          </AnimatedElement>

          {/* Massive serif headline */}
          <AnimatedElement variants={fadeInUp}>
            <h1 className="font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[1.05] tracking-tight text-cream max-w-5xl">
              Designing Websites
              <br />
              & SEO That Fill
              <br />
              Tables!
            </h1>
          </AnimatedElement>
        </Container>

        {/* Bottom info row */}
        <Container>
          <AnimatedElement variants={fadeIn}>
            <div className="flex items-end justify-between">
              <div />

              {/* Right-aligned descriptor */}
              <div className="max-w-xs md:max-w-sm text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-cream/80 text-xs md:text-sm font-medium uppercase tracking-wider">
                    Full-Service Agency
                  </p>
                </div>
                <p className="text-cream/50 text-xs md:text-sm leading-relaxed">
                  Custom websites, SEO, Google Ads, and branding
                  for restaurants that want to grow.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </Container>
      </div>
    </section>
  );
}
