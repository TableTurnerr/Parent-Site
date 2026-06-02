import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const STATS = [
  {
    prefix: "",
    value: 30,
    suffix: "%",
    decimalPlaces: 0,
    description: "Commission third-party apps take on every order, before food, labor, or rent",
    source: "Industry Data",
  },
  {
    prefix: "$",
    value: 16000,
    suffix: "",
    decimalPlaces: 0,
    description: "Average a restaurant saves per year by switching from delivery apps to direct ordering",
    source: "Industry Data",
  },
  {
    prefix: "",
    value: 67,
    suffix: "%",
    decimalPlaces: 0,
    description: "Of diners prefer ordering directly from a restaurant when the option is available",
    source: "Industry Data",
  },
  {
    prefix: "$",
    value: 1.5,
    suffix: "",
    decimalPlaces: 2,
    description: "Flat fee per delivered order with Turnerr Deliver, instead of a percentage commission",
    source: "TableTurnerr",
  },
] as const;

export default function Results() {
  return (
    <section className="dark-sheen py-20 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel className="text-warm-gray-light">The Numbers</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-3 max-w-2xl">
            <BlurText text="Why Commission-Free Ordering Wins" />
          </h2>
          <p className="text-warm-gray-light text-lg leading-relaxed mt-4 max-w-2xl">
            Delivery apps quietly take a third of every order. Here is what that costs, and what your restaurant keeps when ordering runs through you instead.
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
              className="rounded-[1.25rem] border border-warm-gray/20 p-6 sm:p-8 md:p-10 transition-transform duration-300 hover:-translate-y-1 hover:border-warm-gray/40"
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
