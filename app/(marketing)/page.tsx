import type { Metadata } from "next";
import Hero from "@/app/components/sections/Hero";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/app/lib/schema";

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, webSiteSchema]),
        }}
      />
      <Hero />
      {/* Remaining sections added in Phase 2 */}
    </>
  );
}
