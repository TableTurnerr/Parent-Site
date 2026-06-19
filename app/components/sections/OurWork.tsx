import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import LivePreview from "@/app/components/ui/LivePreview";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { PORTFOLIO_CLIENTS, hasRealPortfolio } from "@/app/lib/portfolio-data";

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
              Sites we build and run
            </h2>
          </AnimatedElement>
          <AnimatedElement variants={fadeInUp} className="lg:col-span-5 flex items-end">
            <p className="text-warm-gray text-base md:text-lg leading-relaxed">
              Real, live websites we designed, host, and grow. Click any one to
              see it in the wild.
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {clients.map((client) => (
            <AnimatedElement key={client.name} variants={fadeInUp}>
              <div className="elevate-hover group block overflow-hidden rounded-[1.25rem] border border-border bg-cream-dark">
                <LivePreview
                  url={client.url}
                  name={client.name}
                  canFrame={!client.noFrame}
                  image={client.image}
                  className="aspect-[4/3] w-full"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display font-semibold text-lg text-charcoal">
                      <a
                        href={`https://${client.url.replace(/^https?:\/\//, "")}`}
                        target="_blank"
                        rel="noopener"
                        className="transition-colors hover:text-accent"
                      >
                        {client.name}
                      </a>
                    </h3>
                    <span className="text-warm-gray-light" aria-hidden="true">
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
              </div>
            </AnimatedElement>
          ))}
        </AnimatedElement>
      </Container>
    </section>
  );
}
