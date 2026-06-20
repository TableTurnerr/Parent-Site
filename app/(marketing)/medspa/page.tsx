import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import Container from "@/app/components/ui/Container";
import FaqList from "@/app/components/ui/FaqList";
import MedspaHero from "@/app/components/sections/MedspaHero";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/app/lib/schema";

const Process = dynamic(() => import("@/app/components/sections/Process"));
const CTA = dynamic(() => import("@/app/components/sections/CTA"));

export const metadata: Metadata = createPageMetadata({
  title: "Med Spa Marketing & SEO",
  description:
    "Med spa marketing that fills your calendar. We get med spas and aesthetic clinics found on Google with local SEO, websites, and ads, then book the appointments with an AI receptionist and scheduling.",
  path: "/medspa",
  keywords: [
    "med spa marketing",
    "med spa SEO",
    "medical spa marketing agency",
    "med spa website design",
    "med spa Google Ads",
  ],
});

const BENEFITS = [
  {
    title: "Get found",
    blurb:
      "Rank in Google Maps and local search when nearby clients look for botox, fillers, facials, and more.",
  },
  {
    title: "Get booked",
    blurb:
      "A fast, beautiful website plus an AI receptionist that answers and books consultations around the clock.",
  },
  {
    title: "Get rebooked",
    blurb:
      "Automated reminders, follow-ups, and reviews that keep your chairs full and clients coming back.",
  },
];

const SERVICES = [
  {
    title: "Local SEO for Med Spas",
    blurb:
      "Own the map pack and local search for your treatments and your city, so new clients find you first.",
    href: "/services/medspa-seo",
  },
  {
    title: "Med Spa Websites",
    blurb:
      "Elegant, fast websites built to turn browsers into booked consultations, with SEO baked in.",
    href: "/services/restaurant-website-design",
  },
  {
    title: "Google Ads",
    blurb:
      "Get to the top of search the day you launch and capture high-intent treatment searches.",
    href: "/services/google-ads",
  },
  {
    title: "AI Receptionist",
    blurb:
      "Answer every call and message 24/7, qualify the lead, and book the consult automatically.",
    href: "/services/ai-receptionist",
  },
  {
    title: "Appointment Scheduling",
    blurb:
      "Online booking with reminders that cut no-shows and keep your calendar full.",
    href: "/services/appointment-scheduling",
  },
  {
    title: "Reviews & Reputation",
    blurb:
      "Build a wall of 5-star reviews that wins trust before a client ever calls.",
    href: "/services/google-business-profile-optimization",
  },
];

const FAQS = [
  {
    question: "Do you work with med spas and aesthetic clinics?",
    answer:
      "Yes. We help med spas, medical aesthetics, and skincare clinics get found on Google and fill their calendars with booked treatments. We bring the same local-marketing playbook that has worked across competitive local industries.",
  },
  {
    question: "How do you get a med spa more bookings?",
    answer:
      "We combine local SEO and a strong Google Business Profile to get you found, a fast website built to convert, Google Ads for instant high-intent traffic, and an AI receptionist plus online scheduling so every lead turns into a booked appointment.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Google Ads can drive booked consultations within weeks, while local SEO typically compounds over three to six months. We focus on the fastest path to real appointments for your specific market.",
  },
  {
    question: "Do you handle the booking and follow-up too?",
    answer:
      "Yes. Beyond getting you found, our AI receptionist, scheduling, and CRM capture every lead, book the appointment, and follow up automatically, so nothing slips through the cracks.",
  },
];

export default function MedSpaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Med Spas", url: `${SITE_CONFIG.url}/medspa` },
  ]);
  const faqSchema = generateFAQSchema(FAQS);
  const serviceSchema = generateServiceSchema({
    name: "Med Spa Marketing & SEO",
    description:
      "Local SEO, websites, Google Ads, AI receptionist, and scheduling for med spas and aesthetic clinics.",
    url: `${SITE_CONFIG.url}/medspa`,
  });

  return (
    <div className="theme-medspa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema, serviceSchema]),
        }}
      />

      <MedspaHero />

      {/* Benefits */}
      <section className="bg-cream-dark py-16 md:py-24">
        <Container>
          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {BENEFITS.map((b) => (
              <AnimatedElement key={b.title} variants={fadeInUp}>
                <h2 className="font-display font-bold text-2xl text-charcoal mb-2">
                  {b.title}
                </h2>
                <p className="text-warm-gray leading-relaxed">{b.blurb}</p>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-cream py-20 md:py-28">
        <Container>
          <AnimatedElement variants={fadeInUp} className="max-w-3xl mb-12 md:mb-16">
            <p className="eyebrow mb-3">What we do for med spas</p>
            <h2 className="display-lg text-charcoal mb-4">
              Everything to fill your calendar
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              One team for the whole journey: get found, get booked, and keep
              clients coming back.
            </p>
          </AnimatedElement>

          <AnimatedElement
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {SERVICES.map((s, i) => (
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
                  <p className="text-warm-gray leading-relaxed">{s.blurb}</p>
                </Link>
              </AnimatedElement>
            ))}
          </AnimatedElement>
        </Container>
      </section>

      <Process />

      {/* FAQ */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-tight text-charcoal mb-8">
              Med spa marketing questions
            </h2>
            <FaqList faqs={FAQS} />
            <p className="text-warm-gray mt-8">
              Ready to fill your calendar?{" "}
              <Link
                href="/contact"
                className="text-accent underline underline-offset-2"
              >
                Get a free consultation
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTA />
    </div>
  );
}
