import type { Metadata } from "next";
import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import Mission from "@/app/components/sections/Mission";
import Results from "@/app/components/sections/Results";
import Process from "@/app/components/sections/Process";
import Testimonials from "@/app/components/sections/Testimonials";
import FAQ from "@/app/components/sections/FAQ";
import { FAQ_DATA } from "@/app/lib/constants";
import CTA from "@/app/components/sections/CTA";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateFAQSchema,
} from "@/app/lib/schema";

export const metadata: Metadata = {
  title: "Restaurant Website Design, SEO & Marketing Agency",
  description:
    "We build SEO-optimized websites and drive traffic for independent restaurants. Custom design, Google Ads, and commission-free ordering setup.",
  alternates: {
    canonical: "https://tableturnerr.com",
  },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(FAQ_DATA);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, webSiteSchema, faqSchema]),
        }}
      />
      <Hero />
      <Services />
      <Mission />
      <Results />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
