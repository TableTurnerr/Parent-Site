import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const STEPS = [
  {
    number: "01",
    title: "Foundation",
    subtitle: "Custom Website & Brand Design",
    description:
      "We audit your current online presence, design a custom restaurant website optimized for search engines, and build a brand identity that stands out across every digital touchpoint.",
    image: {
      src: "/images/usage/chef-prep.webp",
      alt: "Chef preparing ingredients in a warm restaurant kitchen",
    },
  },
  {
    number: "02",
    title: "Transition",
    subtitle: "Restaurant SEO & Local Visibility",
    description:
      "We optimize your restaurant for Google Search and Maps, set up your Google Business Profile, and implement a local SEO strategy so nearby diners find you before your competitors. In some cases, we also connect qualified clients to our strategic partners for commission-free online ordering solutions.",
    image: {
      src: "/images/usage/chef-working.webp",
      alt: "Restaurant kitchen staff preparing food with focus and precision",
    },
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "Google Ads & Revenue Growth",
    description:
      "With your digital foundation in place, we launch targeted Google Ads campaigns, help set up commission-free online ordering, and refine your strategy to maximize direct orders month over month.",
    image: {
      src: "/images/usage/kitchen-counter.webp",
      alt: "Busy restaurant counter with staff serving local customers",
    },
  },
];

export default function Process() {
  return (
    <section className="bg-cream py-16 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl">
            <BlurText text="How We Grow Your Restaurant in Three Steps" />
          </h2>
        </AnimatedElement>

        {/* Steps grid */}
        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {STEPS.map((step, index) => (
            <AnimatedElement
              key={step.number}
              variants={fadeInUp}
              className="relative flex"
            >
              {/* Dashed connector line between cards (desktop only) */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 w-0 h-[60%] border-r border-dashed border-border z-10"
                  aria-hidden="true"
                />
              )}

              {/* Card */}
              <div className="bg-cream-dark rounded-[1.25rem] overflow-hidden flex flex-col w-full">
                {/* Step image */}
                <div className="relative h-[160px] md:h-[140px] lg:h-[160px]">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-8 md:p-9 lg:p-10 flex flex-col flex-1">
                  {/* Step number */}
                  <span className="font-display text-[3.5rem] md:text-[4rem] leading-none font-bold text-warm-gray-light/50 select-none">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-tight tracking-tight text-charcoal mt-4">
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-accent font-medium text-sm tracking-wide mt-1.5">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-warm-gray text-[0.95rem] md:text-base leading-relaxed mt-4">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
