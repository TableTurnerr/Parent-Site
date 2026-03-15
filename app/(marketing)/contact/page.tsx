import type { Metadata } from "next";
import Link from "next/link";
import AnimatedElement from "@/app/components/ui/AnimatedElement";
import BlurText from "@/app/components/ui/BlurText";
import Container from "@/app/components/ui/Container";
import SectionLabel from "@/app/components/ui/SectionLabel";
import ContactForm from "@/app/components/sections/ContactForm";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateOrganizationSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us — Free Restaurant Consultation",
  description:
    "Get a free consultation for your restaurant. Contact TableTurnerr for custom website design, local SEO, Google Ads, branding, and commission-free ordering setup for independent restaurants.",
  path: "/contact",
  keywords: [
    "contact restaurant marketing agency",
    "free restaurant consultation",
    "restaurant website quote",
    "restaurant SEO consultation",
    "restaurant marketing help",
  ],
});

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m22 6-10 7L2 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="9"
        width="4"
        height="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="4"
        cy="4"
        r="2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, () => React.ReactElement> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
};

const EXPECTATIONS = [
  "Free 15-minute strategy call",
  "Free SEO report",
  "Free overall consultation & insights",
  "Custom proposal within 48 hours",
  "No obligation, no pressure",
];

export default function ContactPage() {
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Contact", url: `${SITE_CONFIG.url}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, breadcrumbSchema]),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream pt-32 md:pt-36">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-warm-gray">
              <li>
                <Link
                  href="/"
                  className="hover:text-charcoal transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-charcoal font-medium">Contact</span>
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero Header */}
      <section className="bg-cream pt-10 pb-10 md:pt-14 md:pb-14">
        <Container>
          <AnimatedElement variants={fadeInUp} className="max-w-3xl">
            <SectionLabel className="mb-4">Contact Us</SectionLabel>
            <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-charcoal mb-6">
              <BlurText text="Let's Grow Your Restaurant" />
            </h1>
            <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-2xl">
              Get a free consultation and discover how our restaurant website
              design, SEO, and marketing services can drive more online orders
              and fill more tables.
            </p>
          </AnimatedElement>
        </Container>
      </section>

      {/* Two-Column Layout */}
      <section className="bg-cream pb-20 md:pb-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column — Form */}
            <AnimatedElement
              variants={fadeInUp}
              className="lg:col-span-7"
            >
              <ContactForm />
            </AnimatedElement>

            {/* Right Column — Contact Info Sidebar */}
            <AnimatedElement
              variants={fadeInUp}
              className="lg:col-span-5"
            >
              <div className="rounded-[1.25rem] bg-cream-dark p-8 md:p-10 border border-border/50 sticky top-32">
                {/* Get in Touch */}
                <h2 className="font-display font-semibold text-xl text-charcoal mb-6">
                  Get in Touch
                </h2>

                {/* Email */}
                <div className="flex items-start gap-3 mb-5">
                  <span className="text-accent mt-0.5 shrink-0">
                    <MailIcon />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-warm-gray text-sm hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 mb-8">
                  <span className="text-accent mt-0.5 shrink-0">
                    <PhoneIcon />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-0.5">
                      Phone
                    </p>
                    <a
                      href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                      className="text-warm-gray text-sm hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3 mb-8">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = SOCIAL_ICON_MAP[link.platform];
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-cream text-charcoal hover:text-accent hover:border-accent/30 transition-colors"
                      >
                        {Icon && <Icon />}
                      </a>
                    );
                  })}
                </div>

                {/* Divider */}
                <hr className="border-border mb-8" />

                {/* What to Expect */}
                <h3 className="font-display font-semibold text-lg text-charcoal mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 mb-8">
                  {EXPECTATIONS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-accent shrink-0">
                        <CheckIcon />
                      </span>
                      <span className="text-warm-gray text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Disclaimer */}
                <p className="text-warm-gray-light text-xs leading-relaxed">
                  We work exclusively with independent restaurants with physical
                  locations.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </Container>
      </section>
    </>
  );
}
