import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/app/components/sections/Hero";
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
  title: "Texas Restaurant Website Design, SEO & Marketing",
  description:
    "TableTurnerr helps Texas restaurants grow with SEO-optimized websites, local SEO, and Google Ads. Serving Houston, San Antonio, Dallas, Austin, and restaurants statewide. Get a free consultation.",
  alternates: {
    canonical: "https://tableturnerr.com",
  },
  openGraph: {
    title: "TableTurnerr | Texas Restaurant Marketing, Web Design & SEO",
    description:
      "We help Texas restaurants grow with SEO-optimized websites, local SEO, Google Ads, and commission-free ordering. Serving Houston, Dallas, Austin, and statewide.",
    url: "https://tableturnerr.com",
    siteName: "TableTurnerr",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TableTurnerr | Texas Restaurant Marketing, Web Design & SEO",
    description:
      "SEO-optimized websites, local SEO, Google Ads, and commission-free ordering for Texas restaurants.",
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
