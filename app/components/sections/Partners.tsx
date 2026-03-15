import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import NumberTicker from "@/app/components/ui/NumberTicker";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

const PARTNERS = [
  {
    name: "Owner.com",
    tier: "Premium",
    tagline: "The complete restaurant operating system",
    features: [
      "Commission-free online ordering",
      "Automated email & SMS marketing",
      "Custom-branded mobile app",
      "AI-powered upselling & loyalty programs",
    ],
    perk: "$970 setup fee waived",
    perkDetail: "through TableTurnerr",
    stat: { prefix: "$", value: 4.5, suffix: "M", decimalPlaces: 1 },
    statLabel: "In online sales generated for a single restaurant on Owner.com",
  },
  {
    name: "ChowNow",
    tier: "Budget-Friendly",
    tagline: "Direct ordering without the commission fees",
    features: [
      "Commission-free delivery & pickup",
      "Dedicated ordering website",
      "Branded mobile ordering app",
      "Google & social media integrations",
    ],
    perk: "1 month free",
    perkDetail: "on any annual plan",
    stat: { prefix: "$", value: 288, suffix: "K", decimalPlaces: 0 },
    statLabel: "Saved annually by a restaurant after ditching third-party fees",
  },
] as const;

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-accent mt-0.5 shrink-0"
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
    <section className="bg-charcoal py-20 md:py-28">
      <Container>
        {/* Section header */}
        <AnimatedElement variants={fadeInUp} className="mb-12 md:mb-16">
          <SectionLabel className="text-warm-gray-light">
            Our Partners
          </SectionLabel>
          <h2 className="font-display font-bold text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-tight text-cream mt-3 max-w-2xl">
            <BlurText text="Scale With Industry-Leading Restaurant Tech" />
          </h2>
          <p className="text-warm-gray-light text-lg leading-relaxed mt-4 max-w-2xl">
            As an official strategic partner of Owner.com and ChowNow, we get
            you exclusive benefits you won't find signing up on your own —
            commission-free ordering that puts revenue back in your pocket.
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
              className="rounded-[1.25rem] border border-warm-gray/20 p-8 md:p-10 flex flex-col"
            >
              {/* Partner header */}
              <div className="mb-6">
                <span className="text-accent text-sm font-semibold tracking-wide uppercase">
                  {partner.tier}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-cream mt-1">
                  {partner.name}
                </h3>
                <p className="text-warm-gray-light text-base mt-1">
                  {partner.tagline}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {partner.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-warm-gray-light text-[0.95rem] leading-relaxed"
                  >
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Exclusive perk */}
              <div className="rounded-xl bg-white/[0.04] border border-warm-gray/15 px-5 py-4 mb-6">
                <p className="text-sm text-warm-gray-light">
                  <span className="text-cream font-semibold">
                    TableTurnerr Exclusive:
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
                <p className="text-warm-gray-light text-sm leading-relaxed mt-1">
                  {partner.statLabel}
                </p>
              </div>
            </AnimatedElement>
          ))}
        </AnimatedElement>

        {/* 3rd-party pivot strategy */}
        <AnimatedElement variants={fadeInUp} className="mt-4 md:mt-5">
          <div className="rounded-[1.25rem] border border-warm-gray/10 px-8 py-7 md:px-10 md:py-8">
            <p className="text-warm-gray-light text-base md:text-lg leading-relaxed max-w-3xl">
              <span className="text-cream font-semibold">
                The smart play:
              </span>{" "}
              We don't ask you to ditch DoorDash or UberEats. Instead, we flip
              the script — use those platforms as marketing channels to find new
              customers, then convert repeat orders to your own commission-free
              system.
            </p>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
