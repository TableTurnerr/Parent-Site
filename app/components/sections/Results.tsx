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
    description: "Online growth achieved by Samos Oaxaca after switching to Owner.com",
    source: "Owner.com",
  },
  {
    prefix: "$",
    value: 4.5,
    suffix: "M",
    decimalPlaces: 1,
    description: "In online sales generated for Saffron Indian Kitchen through Owner.com",
    source: "Owner.com",
  },
  {
    prefix: "$",
    value: 2,
    suffix: "M+",
    decimalPlaces: 0,
    description: "Saved in commissions by Ollie's in New York after moving to ChowNow",
    source: "ChowNow",
  },
  {
    prefix: "$",
    value: 288,
    suffix: "K",
    decimalPlaces: 0,
    description: "Saved annually by 4Top Hospitality after eliminating third-party fees via ChowNow",
    source: "ChowNow",
  },
] as const;

export default function Results() {
  return (
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel className="text-warm-gray-light">Partner Results</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-3 max-w-2xl">
            <BlurText text="Real Results From Our Partner Ecosystem" />
          </h2>
          <p className="text-warm-gray-light text-lg leading-relaxed mt-4 max-w-2xl">
            Restaurants using our recommended platforms are seeing massive, verified ROI. Here is what the ecosystem delivers.
          </p>
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
              className="rounded-[1.25rem] border border-warm-gray/20 p-6 sm:p-8 md:p-10"
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
              <p className="text-accent text-sm font-medium mt-2">
                via {stat.source}
              </p>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
