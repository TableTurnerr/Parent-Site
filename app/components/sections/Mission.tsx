import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";

const VALUES = [
  {
    number: "01",
    title: "Restaurant-First",
    description:
      "Every strategy, website, and campaign is built specifically for the food and beverage industry — not repurposed from generic marketing playbooks.",
  },
  {
    number: "02",
    title: "Performance-Driven",
    description:
      "We measure success by the metrics that matter: online orders placed, Google rankings gained, and revenue generated for your restaurant.",
  },
  {
    number: "03",
    title: "Built for Growth",
    description:
      "From your first restaurant website to multi-location expansion, our digital marketing systems scale as your business grows.",
  },
];

export default function Mission() {
  return (
    <section className="bg-cream-dark py-16 md:py-28">
      <Container>
        {/* Section label */}
        <AnimatedElement variants={fadeInUp}>
          <SectionLabel>Our Mission</SectionLabel>
        </AnimatedElement>

        {/* Big editorial headline */}
        <AnimatedElement variants={fadeInUp}>
          <h2 className="font-display font-bold text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] tracking-tight text-charcoal mt-5 max-w-5xl">
            <BlurText text="Independent restaurants pour their heart into every plate" />
            <span className="text-warm-gray-light">
              {" "}
              <BlurText text="— we build the digital marketing that brings diners through the door." delay={300} />
            </span>
          </h2>
        </AnimatedElement>

        {/* Divider */}
        <AnimatedElement variants={fadeInUp}>
          <div className="w-full h-px bg-border mt-12 mb-12 md:mt-16 md:mb-16" />
        </AnimatedElement>

        {/* Two column layout: image + values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — large image */}
          <AnimatedElement variants={fadeIn} className="lg:col-span-5">
            <div className="relative rounded-[1.25rem] overflow-hidden h-[360px] md:h-[440px]">
              <Image
                src="/images/usage/happy-diners.webp"
                alt="Diners enjoying a meal at a vibrant restaurant"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </AnimatedElement>

          {/* Right — body text + value pillars */}
          <AnimatedElement
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <AnimatedElement variants={fadeInUp}>
              <p className="text-warm-gray text-lg leading-relaxed max-w-xl mb-10">
                TableTurnerr is a restaurant marketing agency built for one
                purpose: giving independent restaurants the same digital
                advantage as major chains — without the enterprise budget. We
                combine deep food and beverage industry expertise with custom
                website design, proven SEO strategy, and performance marketing
                that drives real revenue.
              </p>
            </AnimatedElement>

            {/* Values grid */}
            <AnimatedElement
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {VALUES.map((value) => (
                <AnimatedElement key={value.number} variants={fadeInUp}>
                  <span className="font-display text-sm text-accent font-semibold tracking-wide">
                    {value.number}
                  </span>
                  <h3 className="font-display font-semibold text-charcoal text-lg mt-2 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-warm-gray text-[0.925rem] leading-relaxed">
                    {value.description}
                  </p>
                </AnimatedElement>
              ))}
            </AnimatedElement>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
