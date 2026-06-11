import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import NumberTicker from "@/app/components/ui/NumberTicker";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const PARTNERS = [
  {
    name: "Get Found",
    tier: "Show up first",
    tagline: "Rank where your customers are searching",
    features: [
      "A fast, conversion-built website",
      "Local SEO and Google Maps",
      "Optimized Google Business Profile",
      "Targeted Google Ads",
    ],
    perk: "Top 3",
    perkDetail: "in your local market",
    stat: { prefix: "", value: 92, suffix: "%", decimalPlaces: 0 },
    statLabel: "of consumers use a search engine to find a local business",
  },
  {
    name: "Get Chosen",
    tier: "Win the click",
    tagline: "Turn searchers into paying customers",
    features: [
      "Reviews that build trust",
      "Branding that looks established",
      "Clear calls to action",
      "Pages built to convert",
    ],
    perk: "5-star",
    perkDetail: "reputation that sells",
    stat: { prefix: "", value: 90, suffix: "%", decimalPlaces: 0 },
    statLabel: "of consumers read reviews before choosing a business",
  },
] as const;

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-accent mt-1 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function Partners() {
  return (
    <section className="dark-sheen py-20 md:py-32">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <p className="eyebrow mb-6" style={{ color: "rgba(250,250,248,0.6)" }}>
            How We Help
          </p>
          <h2 className="display-lg text-cream max-w-3xl">
            Everything you need to get found and get chosen
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed mt-5 max-w-2xl">
            We act as your outsourced marketing team. We build the foundation
            that ranks, drive the traffic that converts, and turn it into booked,
            paying customers, all measured so you see the return.
          </p>
        </AnimatedElement>

        {/* Partner cards */}
        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {PARTNERS.map((partner) => (
            <AnimatedElement
              key={partner.name}
              variants={fadeInUp}
              className="rounded-[1.25rem] border border-cream/10 bg-cream/[0.04] p-6 sm:p-8 md:p-10 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              {/* Partner header */}
              <div className="mb-6">
                <span className="text-accent text-sm font-semibold tracking-wide uppercase">
                  {partner.tier}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-cream mt-1">
                  {partner.name}
                </h3>
                <p className="text-cream/60 text-base mt-1">
                  {partner.tagline}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {partner.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-cream/75 text-[0.95rem] leading-relaxed"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Exclusive perk */}
              <div className="rounded-xl bg-cream/[0.06] border border-cream/10 px-5 py-4 mb-6">
                <p className="text-sm text-cream/70">
                  <span className="text-cream font-semibold">
                    The goal:
                  </span>{" "}
                  <span className="text-accent font-bold">{partner.perk}</span>{" "}
                  {partner.perkDetail}
                </p>
              </div>

              {/* Stat */}
              <div>
                <p className="font-display font-bold text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-tight text-cream">
                  {partner.stat.prefix && <span>{partner.stat.prefix}</span>}
                  <NumberTicker
                    value={partner.stat.value}
                    decimalPlaces={partner.stat.decimalPlaces}
                    className="text-cream"
                  />
                  {partner.stat.suffix && <span>{partner.stat.suffix}</span>}
                </p>
                <p className="text-cream/60 text-sm leading-relaxed mt-1">
                  {partner.statLabel}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </AnimatedElement>

        {/* 3rd-party pivot strategy */}
        <AnimatedElement variants={fadeInUp} className="mt-4 md:mt-5">
          <div className="rounded-[1.25rem] border border-cream/10 bg-cream/[0.04] px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
            <p className="text-cream/75 text-base md:text-lg leading-relaxed max-w-3xl">
              <span className="text-cream font-semibold">
                The approach:
              </span>{" "}
              We don't just send traffic. We build the website, the local
              presence, and the reputation that turn that traffic into booked
              customers, and we track every call, form, and visit so you always
              know the return.
            </p>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
