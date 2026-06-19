import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

/**
 * Homepage services block. Leads with the GoHighLevel-powered services Hisham
 * wants front and center (AI Receptionist / CRM / Appointment Scheduling),
 * then the core SEO services. The GHL ones route to /contact until their own
 * service pages exist.
 */
const HOME_SERVICES = [
  {
    title: "AI Receptionist",
    blurb:
      "Answer every call and message 24/7, qualify the lead, and book them in automatically, so you never miss business again.",
    href: "/contact",
  },
  {
    title: "CRM",
    blurb:
      "Every lead, conversation, and follow-up in one place, so nothing slips through the cracks.",
    href: "/contact",
  },
  {
    title: "Appointment Scheduling",
    blurb:
      "Online booking with automated reminders that cut no-shows and keep your calendar full.",
    href: "/contact",
  },
  {
    title: "Local SEO",
    blurb:
      "Rank in Google Maps and local search so nearby customers find you first, not your competitors.",
    href: "/services/restaurant-seo",
  },
  {
    title: "SEO Websites",
    blurb:
      "Fast, proven websites with SEO built in, designed to turn visitors into customers.",
    href: "/services/restaurant-website-design",
  },
  {
    title: "Google Ads",
    blurb:
      "Show up at the very top the day you launch, paying only for real clicks from ready-to-buy searchers.",
    href: "/services/google-ads",
  },
];

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export default function HomeServices() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container>
        <AnimatedElement variants={fadeInUp} className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-3">What we do</p>
          <h2 className="display-lg text-charcoal mb-4">
            Everything to get found and booked
          </h2>
          <p className="text-warm-gray text-lg leading-relaxed">
            One team for the whole journey: get found on Google, capture every
            lead, and turn it into a booked customer.
          </p>
        </AnimatedElement>

        <AnimatedElement
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {HOME_SERVICES.map((s, i) => (
            <AnimatedElement key={s.title} variants={fadeInUp}>
              <Link
                href={s.href}
                className="elevate-hover group flex h-full flex-col rounded-[1.25rem] border border-border bg-cream-dark p-7 md:p-8 transition-colors hover:border-accent/40"
              >
                <span className="font-display text-sm tabular-nums text-accent mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-xl text-charcoal mb-2">
                  {s.title}
                </h3>
                <p className="text-warm-gray leading-relaxed mb-6">{s.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-charcoal font-medium transition-colors group-hover:text-accent">
                  Learn more
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
