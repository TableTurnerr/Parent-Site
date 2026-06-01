import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { SERVICES } from "@/app/lib/constants";

export default function Services() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 md:mb-16">
          <AnimatedElement variants={fadeInUp} className="lg:col-span-7">
            <p className="eyebrow mb-6">What We Do</p>
            <h2 className="display-lg text-charcoal">
              Marketing services that drive real growth
            </h2>
          </AnimatedElement>
          <AnimatedElement
            variants={fadeInUp}
            className="lg:col-span-5 flex items-end"
          >
            <p className="text-warm-gray text-base md:text-lg leading-relaxed">
              Six focused services, built for the food and beverage industry.
              Each one is designed to get more diners through your door.
            </p>
          </AnimatedElement>
        </div>

        {/* Editorial index list */}
        <AnimatedElement variants={staggerContainer}>
          {SERVICES.map((service, i) => (
            <AnimatedElement key={service.slug} variants={fadeInUp}>
              <Link
                href={`/services/${service.slug}`}
                className="index-row group grid grid-cols-12 gap-4 md:gap-8 items-baseline py-7 md:py-9"
              >
                <span className="index-num col-span-2 md:col-span-1 font-display text-sm tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 md:col-span-4 font-display font-semibold text-xl md:text-2xl tracking-tight text-charcoal">
                  {service.title}
                </h3>
                <p className="col-span-12 md:col-span-6 text-warm-gray text-[0.95rem] md:text-base leading-relaxed">
                  {service.description}
                </p>
                <span
                  className="hidden md:flex col-span-1 justify-end items-center text-warm-gray-light group-hover:text-accent transition-colors pt-1"
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
