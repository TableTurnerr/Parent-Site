import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const STEPS = [
  {
    number: "01",
    title: "Foundation",
    subtitle: "Custom website & brand design",
    description:
      "We audit your current online presence, design a high-converting website optimized for search, and build a brand identity that stands out across every digital touchpoint.",
  },
  {
    number: "02",
    title: "Transition",
    subtitle: "Local SEO & visibility",
    description:
      "We optimize your business for Google Search and Maps, set up your Google Business Profile, and implement a local SEO strategy so nearby customers find you before your competitors.",
  },
  {
    number: "03",
    title: "Scale",
    subtitle: "Google Ads & revenue growth",
    description:
      "With your digital foundation in place, we launch targeted Google Ads campaigns, sharpen your conversion paths, and refine your strategy to drive more customers month over month.",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Sticky header */}
          <AnimatedElement variants={fadeInUp} className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-6">How It Works</p>
              <h2 className="display-lg text-charcoal">
                Three steps to a fuller pipeline
              </h2>
            </div>
          </AnimatedElement>

          {/* Steps */}
          <AnimatedElement
            variants={staggerContainer}
            className="lg:col-span-8 lg:col-start-5"
          >
            {STEPS.map((step) => (
              <AnimatedElement key={step.number} variants={fadeInUp}>
                <div className="index-row grid grid-cols-12 gap-4 md:gap-8 py-9 md:py-12">
                  <span className="index-num col-span-12 md:col-span-2 font-display font-bold text-3xl md:text-4xl leading-none tabular-nums">
                    {step.number}
                  </span>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-charcoal">
                      {step.title}
                    </h3>
                    <p className="text-accent text-sm font-medium tracking-wide mt-2">
                      {step.subtitle}
                    </p>
                    <p className="text-warm-gray text-base md:text-lg leading-relaxed mt-4 max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </div>
      </Container>
    </section>
  );
}
