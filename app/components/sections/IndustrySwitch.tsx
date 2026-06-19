import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

/** The two-stream selector: send each visitor to their industry page. */
const STREAMS = [
  {
    href: "/medspa",
    tag: "Med Spa Marketing",
    title: "Med Spas & Aesthetics",
    blurb:
      "Fill your calendar with booked treatments. We get med spas found on Google and turn searches into consultations and appointments.",
  },
  {
    href: "/restaurants",
    tag: "Restaurant Marketing",
    title: "Restaurants",
    blurb:
      "Fill more tables and own your orders. Websites, local SEO, and commission-free ordering built for restaurants.",
  },
];

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function IndustrySwitch() {
  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="text-center mb-12 md:mb-14">
          <p className="eyebrow mb-4 justify-center">Who we help</p>
          <h2 className="display-lg text-charcoal">Pick your industry</h2>
          <p className="text-warm-gray text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            We go deep in the industries we know best, with a playbook tuned to
            how your customers search and book.
          </p>
        </AnimatedElement>

        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {STREAMS.map((s) => (
            <AnimatedElement key={s.href} variants={fadeInUp}>
              <Link
                href={s.href}
                className="elevate-hover group block h-full rounded-[1.5rem] border border-border bg-cream p-8 md:p-10 transition-colors hover:border-accent/40"
              >
                <p className="text-sm uppercase tracking-wider text-accent font-medium mb-4">
                  {s.tag}
                </p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-charcoal mb-3">
                  {s.title}
                </h3>
                <p className="text-warm-gray leading-relaxed mb-6">{s.blurb}</p>
                <span className="inline-flex items-center gap-1.5 text-charcoal font-medium transition-colors group-hover:text-accent">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
