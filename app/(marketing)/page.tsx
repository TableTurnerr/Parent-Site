import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/app/components/sections/Hero";
import TrustBar from "@/app/components/sections/TrustBar";
import Services from "@/app/components/sections/Services";
import { FAQ_DATA } from "@/app/lib/constants";

const Mission = dynamic(() => import("@/app/components/sections/Mission"));
const Partners = dynamic(() => import("@/app/components/sections/Partners"));
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
  title: "SEO Agency for Local Businesses",
  description:
    "TableTurnerr is an SEO agency for local businesses. We get you found on Google with local SEO, high-converting websites, and Google Ads. Book a free consultation.",
  alternates: {
    canonical: "https://www.tableturnerr.com",
  },
  openGraph: {
    title: "TableTurnerr | SEO Agency for Local Businesses",
    description:
      "Local SEO, high-converting websites, Google Ads, and Google Business Profile optimization for local businesses nationwide. Book a free consultation.",
    url: "https://www.tableturnerr.com",
    siteName: "TableTurnerr",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TableTurnerr | SEO Agency for Local Businesses",
    description:
      "Local SEO, high-converting websites, Google Ads, and Google Business Profile optimization for local businesses nationwide.",
  },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(FAQ_DATA);
  const servicesSchema = generateAllServicesSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.tableturnerr.com" },
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
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
