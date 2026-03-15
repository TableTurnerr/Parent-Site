import Link from "next/link";
import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { SERVICES } from "@/app/lib/constants";

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  "restaurant-website-design": {
    src: "/images/usage/chef-flames.png",
    alt: "Chef cooking with dramatic flames in a professional kitchen",
  },
  "restaurant-seo": {
    src: "/images/usage/busy-restaurant.jpg",
    alt: "Busy restaurant staff working behind the counter",
  },
};

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
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

export default function Services() {
  const topRow = SERVICES.slice(0, 2);
  const bottomRow = SERVICES.slice(2, 5);

  return (
    <section className="py-20 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel>What We Do</SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-charcoal mt-3 max-w-2xl">
            <BlurText text="Restaurant Marketing Services That Drive Real Growth" />
          </h2>
        </AnimatedElement>

        {/* Bento grid */}
        <AnimatedElement variants={staggerContainer}>
          {/* Top row — 2 larger cards with images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
            {topRow.map((service) => {
              const image = SERVICE_IMAGES[service.slug];
              return (
                <AnimatedElement key={service.slug} variants={fadeInUp}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="service-card block bg-cream-dark rounded-[1.25rem] overflow-hidden h-full border border-transparent hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
                  >
                    {image && (
                      <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="service-card-img object-cover transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[180px]">
                      <div>
                        <h3 className="font-display font-semibold text-[clamp(1.25rem,2vw,1.625rem)] leading-tight tracking-tight text-charcoal mb-4">
                          {service.title}
                        </h3>
                        <p className="text-warm-gray text-base md:text-lg leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      </div>
                      <span className="service-card-btn mt-8 inline-flex w-fit items-center gap-1.5 text-charcoal border border-charcoal/20 rounded-full px-3 py-1.5 transition-all duration-300">
                        <span className="text-sm font-medium">
                          Learn more
                        </span>
                        <span className="service-card-arrow transition-transform duration-300">
                          <ArrowIcon />
                        </span>
                      </span>
                    </div>
                  </Link>
                </AnimatedElement>
              );
            })}
          </div>

          {/* Bottom row — 3 smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {bottomRow.map((service) => (
              <AnimatedElement key={service.slug} variants={fadeInUp}>
                <Link
                  href={`/services/${service.slug}`}
                  className="service-card block bg-cream-dark rounded-[1.25rem] p-7 md:p-8 lg:p-9 h-full border border-transparent hover:border-border hover:shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                  <div className="flex flex-col justify-between h-full min-h-[200px] md:min-h-[220px]">
                    <div>
                      <h3 className="font-display font-semibold text-[clamp(1.125rem,1.5vw,1.375rem)] leading-tight tracking-tight text-charcoal mb-3">
                        {service.title}
                      </h3>
                      <p className="text-warm-gray text-[0.95rem] md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <span className="service-card-btn mt-6 inline-flex w-fit items-center gap-1.5 text-charcoal border border-charcoal/20 rounded-full px-3 py-1.5 transition-all duration-300">
                      <span className="text-sm font-medium">
                        Learn more
                      </span>
                      <span className="service-card-arrow transition-transform duration-300">
                        <ArrowIcon />
                      </span>
                    </span>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
