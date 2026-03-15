import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const STATS = [
  {
    prefix: "+",
    value: 377,
    suffix: "%",
    decimalPlaces: 0,
    description: "Average organic traffic growth for restaurant clients using our SEO services",
  },
  {
    prefix: "$",
    value: 4.5,
    suffix: "M",
    decimalPlaces: 1,
    description: "In additional online ordering revenue generated for independent restaurants",
  },
  {
    prefix: "",
    value: 50,
    suffix: "+",
    decimalPlaces: 0,
    description: "Independent restaurant brands launched and transformed nationwide",
  },
  {
    prefix: "",
    value: 90,
    suffix: "%",
    decimalPlaces: 0,
    description: "Of diners research a restaurant online before their first visit",
  },
] as const;

export default function Results() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel className="text-warm-gray-light">Results</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-3 max-w-2xl">
            <BlurText text="Proven Restaurant Marketing Results" />
          </h2>
        </AnimatedElement>

        {/* Stats grid */}
        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5"
        >
          {STATS.map((stat) => (
            <AnimatedElement
              key={stat.description}
              variants={fadeInUp}
              className="rounded-[1.25rem] border border-warm-gray/20 p-8 md:p-10"
            >
              <p className="font-display font-bold text-[clamp(2.5rem,5vw,3.5rem)] leading-none tracking-tight text-cream">
                {stat.prefix && (
                  <span>{stat.prefix}</span>
                )}
                <NumberTicker
                  value={stat.value}
                  decimalPlaces={stat.decimalPlaces}
                  className="text-cream"
                />
                {stat.suffix && (
                  <span>{stat.suffix}</span>
                )}
              </p>
              <p className="text-warm-gray-light text-base md:text-lg leading-relaxed mt-3">
                {stat.description}
              </p>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
