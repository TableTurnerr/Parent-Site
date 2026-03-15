import type { Metadata } from "next";
import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import Mission from "@/app/components/sections/Mission";
import Partners from "@/app/components/sections/Partners";
import Process from "@/app/components/sections/Process";
import Testimonials from "@/app/components/sections/Testimonials";
import FAQ from "@/app/components/sections/FAQ";
import { FAQ_DATA } from "@/app/lib/constants";
import CTA from "@/app/components/sections/CTA";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQSchema,
  generateAllServicesSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Restaurant Website Design, SEO & Marketing Agency",
  description:
    "We design SEO-optimized restaurant websites and drive traffic for independent restaurants. Custom website design, local SEO, Google Ads management, and commission-free ordering setup. Get a free quote.",
  alternates: {
    canonical: "https://tableturnerr.com",
  },
  openGraph: {
    title: "TableTurnerr | Restaurant Website Design, SEO & Marketing Agency",
    description:
      "We design SEO-optimized restaurant websites and drive traffic for independent restaurants. Custom website design, local SEO, Google Ads, and commission-free ordering setup.",
    url: "https://tableturnerr.com",
    siteName: "TableTurnerr",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TableTurnerr | Restaurant Website Design, SEO & Marketing Agency",
    description:
      "Custom restaurant websites, local SEO, Google Ads, and commission-free ordering for independent restaurants.",
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
