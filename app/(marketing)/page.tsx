import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/app/components/sections/Hero";
import TrustBar from "@/app/components/sections/TrustBar";
import Services from "@/app/components/sections/Services";
import { FAQ_DATA } from "@/app/lib/constants";

const Mission = dynamic(() => import("@/app/components/sections/Mission"));
const Partners = dynamic(() => import("@/app/components/sections/Partners"));
const CalculatorTeaser = dynamic(() => import("@/app/components/sections/CalculatorTeaser"));
const Process = dynamic(() => import("@/app/components/sections/Process"));
const Testimonials = dynamic(() => import("@/app/components/sections/Testimonials"));
const FAQ = dynamic(() => import("@/app/components/sections/FAQ"));
const CTA = dynamic(() => import("@/app/components/sections/CTA"));
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQSchema,
  generateAllServicesSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Restaurant Marketing Agency That Fills More Tables",
  description:
    "TableTurnerr helps independent restaurants get found, get booked, and keep more profit. Websites that convert, local SEO, Google Ads, and commission-free ordering. Book a free consultation.",
  alternates: {
    canonical: "https://tableturnerr.com",
  },
  openGraph: {
    title: "TableTurnerr | Restaurant Marketing That Fills More Tables",
    description:
      "Websites that convert, local SEO, Google Ads, and commission-free ordering for independent restaurants nationwide. Book a free consultation.",
    url: "https://tableturnerr.com",
    siteName: "TableTurnerr",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TableTurnerr | Restaurant Marketing That Fills More Tables",
    description:
      "Websites that convert, local SEO, Google Ads, and commission-free ordering for independent restaurants nationwide.",
  },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(FAQ_DATA);
  const servicesSchema = generateAllServicesSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tableturnerr.com" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            webSiteSchema,
            faqSchema,
            breadcrumbSchema,
            ...servicesSchema,
          ]),
        }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <Mission />
      <Partners />
      <CalculatorTeaser />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
