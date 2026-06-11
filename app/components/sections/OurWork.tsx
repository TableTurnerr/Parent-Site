import Image from "next/image";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import {
  PORTFOLIO_CLIENTS,
  screenshotUrl,
  hasRealPortfolio,
} from "@/app/lib/portfolio-data";

/**
 * "Our Work" portfolio: live screenshot thumbnails of client restaurant sites
 * we build and host, each linking out to the live site. Renders nothing until
 * real client URLs are filled into portfolio-data.ts (avoids shipping
 * example.com placeholders to production).
 */
export default function OurWork() {
  if (!hasRealPortfolio()) return null;

  const clients = PORTFOLIO_CLIENTS.filter((c) => c.url && c.url !== "example.com");

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 md:mb-16">
          <AnimatedElement variants={fadeInUp} className="lg:col-span-7">
            <p className="font-handwriting text-accent text-3xl md:text-4xl rotate-[-3deg] mb-3">
              the house specials
            </p>
            <h2 className="display-lg text-charcoal">
              Restaurant sites we build and run
            </h2>
          </AnimatedElement>
          <AnimatedElement variants={fadeInUp} className="lg:col-span-5 flex items-end">
            <p className="text-warm-gray text-base md:text-lg leading-relaxed">
              Real, live restaurant websites we designed, host, and grow. Click
              any one to see it in the wild.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {clients.map((client) => (
            <AnimatedElement key={client.name} variants={fadeInUp}>
              <a
                href={`https://${client.url.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noopener"
                className="elevate-hover group block rounded-[1.25rem] overflow-hidden border border-border bg-cream-dark"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={screenshotUrl(client.url)}
                    alt={`Live homepage of ${client.name}, built by TableTurnerr`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-semibold text-lg text-charcoal">
                      {client.name}
                    </h3>
                    <span
                      className="text-warm-gray-light group-hover:text-accent transition-colors"
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M5.833 14.167 14.167 5.833M14.167 5.833H6.667M14.167 5.833v7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="text-warm-gray text-sm leading-relaxed mt-1.5">
                    {client.blurb}
                  </p>
                </div>
              </a>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
