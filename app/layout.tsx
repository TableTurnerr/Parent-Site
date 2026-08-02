import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsProvider from "@/app/components/analytics/AnalyticsProvider";
import ConsentManager from "@/app/components/analytics/ConsentManager";
import JsonLd from "@/app/components/site/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/app/lib/schema";
import "./globals.css";

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
    default: "TableTurnerr — Review Automation for Home Services",
    template: "%s | TableTurnerr",
  },
  description:
    "Review automation built for home-services pros. Turn every finished job into 5-star reviews across Google, Facebook, Yelp and Angi, climb the map pack, and get more booked work. Built for HVAC, roofing, plumbing and electrical. Start a free trial.",
  keywords: [
    "review automation",
    "review automation for home services",
    "get more Google reviews",
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
    title: "TableTurnerr — Review Automation for Home Services",
    description:
      "Review automation built for home-services pros. Turn every finished job into 5-star reviews across Google, Facebook, Yelp and Angi.",
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
