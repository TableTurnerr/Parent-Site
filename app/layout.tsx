import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsProvider from "@/app/components/analytics/AnalyticsProvider";
import ConsentManager from "@/app/components/analytics/ConsentManager";
import JsonLd from "@/app/components/site/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/app/lib/schema";
import "./globals.css";

const impactVerificationMeta = {
  name: "impact-site-verification",
  value: "d7e8569b-ce38-4585-9b40-55eb18394c38",
};

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#11142b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tableturnerr.com"),
  title: {
    default: "Home-Service Marketing Agency: Websites, SEO & Reviews | TableTurnerr",
    template: "%s | TableTurnerr",
  },
  description:
    "Done-for-you online marketing for home-service businesses: Google Business Profile, local SEO, websites, Google reviews and missed-call text-back, run on our own software. Get a free Google Maps audit.",
  keywords: [
    "home service review management software",
    "review automation for home services",
    "get more Google reviews",
    "plumbing review management software",
    "HVAC review management software",
    "roofing review management software",
    "HVAC reviews software",
    "roofing reviews software",
    "plumbing reviews",
    "electrician reviews",
    "reputation management for contractors",
    "review request software",
    "map pack ranking",
  ],
  openGraph: {
    siteName: "TableTurnerr",
    locale: "en_US",
    type: "website",
    title: "Home-Service Marketing Agency: Websites, SEO & Reviews | TableTurnerr",
    description:
      "Done-for-you online marketing for home-service businesses, with our own review and call-capture software behind it. Get a free Google Maps audit.",
    url: "https://www.tableturnerr.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tableturnerr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "M-0AZRyz9kqD2TwnHjOCO3R593wsaKNLCDZy0JiGFVs",
  },
  category: "Business Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        <meta {...impactVerificationMeta} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Bitdefender) inject
          attributes like bis_register onto <body> before React hydrates. This
          suppresses warnings for body's OWN attributes only, not its children. */}
      <body className="font-body antialiased" suppressHydrationWarning>
        <JsonLd data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        {children}
        <AnalyticsProvider />
        <ConsentManager />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
