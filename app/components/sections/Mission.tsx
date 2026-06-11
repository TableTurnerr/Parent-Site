import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, fadeIn, staggerContainer } from "@/app/lib/animations";

const VALUES = [
  {
    number: "01",
    title: "Local-First",
    description:
      "Every strategy, website, and campaign is built to win in local search, where your next customer is actually looking for you.",
  },
  {
    number: "02",
    title: "Performance-Driven",
    description:
      "We measure success by the metrics that matter: leads generated, Google rankings gained, and revenue generated for your business.",
  },
  {
    number: "03",
    title: "Built for Growth",
    description:
      "From your first website to multi-location expansion, our marketing systems scale as your business grows.",
  },
];

export default function Mission() {
  return (
    <section className="bg-cream-dark py-20 md:py-32">
      <Container>
        {/* Section label */}
        <AnimatedElement variants={fadeInUp}>
          <p className="eyebrow mb-3">Our Mission</p>
          <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-7">
            we grow local
          </p>
        </AnimatedElement>

        {/* Big editorial headline */}
        <AnimatedElement variants={fadeInUp}>
          <h2 className="display-lg text-charcoal max-w-5xl">
            Local businesses pour their heart into what they do.{" "}
            <span className="text-warm-gray-light">
              We build the marketing that brings{" "}
            </span>
            <span className="text-accent">customers through the door.</span>
          </h2>
        </AnimatedElement>

        {/* Divider */}
        <AnimatedElement variants={fadeInUp}>
          <hr className="rule-fade mt-12 mb-12 md:mt-16 md:mb-16" />
        </AnimatedElement>

        {/* Two column layout: image + values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image (right on desktop for layout rhythm vs hero) */}
          <AnimatedElement variants={fadeIn} className="lg:col-span-5 lg:order-2">
            <div className="relative rounded-[1.25rem] overflow-hidden h-[280px] sm:h-[360px] md:h-[440px]">
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
            className="lg:col-span-7 lg:order-1 flex flex-col justify-center"
          >
            <AnimatedElement variants={fadeInUp}>
              <p className="text-warm-gray text-lg leading-relaxed max-w-xl mb-10">
                TableTurnerr is a marketing agency for local businesses, built
                for one purpose: giving local businesses the same digital
                advantage as the big players, without the enterprise budget. We
                combine a proven website framework with sharp local SEO strategy
                and performance marketing that drives real revenue.
              </p>
            </AnimatedElement>

            {/* Values grid */}
            <AnimatedElement
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {VALUES.map((value) => (
                <AnimatedElement key={value.number} variants={fadeInUp}>
                  <span className="font-display text-2xl text-accent-gradient font-bold tracking-tight">
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
