import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/app/components/sections/Hero";
import TrustBar from "@/app/components/sections/TrustBar";
import Services from "@/app/components/sections/Services";
import Container from "@/app/components/ui/Container";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import { FAQ_DATA, SITE_CONFIG } from "@/app/lib/constants";
import { createPageMetadata } from "@/app/lib/metadata";
import {
  generateFAQSchema,
  generateAllServicesSchema,
  generateBreadcrumbSchema,
} from "@/app/lib/schema";

const Mission = dynamic(() => import("@/app/components/sections/Mission"));
const Partners = dynamic(() => import("@/app/components/sections/Partners"));
const Process = dynamic(() => import("@/app/components/sections/Process"));
const Testimonials = dynamic(() => import("@/app/components/sections/Testimonials"));
const FAQ = dynamic(() => import("@/app/components/sections/FAQ"));
const CTA = dynamic(() => import("@/app/components/sections/CTA"));

export const metadata: Metadata = createPageMetadata({
  title: "Restaurant Marketing & SEO",
  description:
    "Websites, local SEO, Google Ads, and commission-free ordering built for restaurants. We help restaurants get found on Google and fill more tables.",
  path: "/restaurants",
  keywords: [
    "restaurant marketing",
    "restaurant SEO",
    "restaurant website design",
    "restaurant local SEO",
    "restaurant marketing agency",
  ],
});

export default function RestaurantsPage() {
  const faqSchema = generateFAQSchema(FAQ_DATA);
  const servicesSchema = generateAllServicesSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Restaurants", url: `${SITE_CONFIG.url}/restaurants` },
  ]);

  return (
    <div className="theme-restaurant">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema, ...servicesSchema]),
        }}
      />
      <Hero />
      <div className="bg-cream">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Restaurants" }]}
            className="pt-6 pb-1"
          />
        </Container>
      </div>
      <TrustBar />
      <Services />
      <Mission />
      <Partners />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
