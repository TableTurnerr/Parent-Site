import type { Metadata } from "next";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://tableturnerr.com"),
  title: {
    default:
      "TableTurnerr | Texas Restaurant Marketing, Web Design & SEO",
    template: "%s | TableTurnerr",
  },
  description:
    "TableTurnerr helps Texas restaurants grow with SEO-optimized websites, local SEO, and Google Ads. Serving Houston, San Antonio, Dallas, Austin, and restaurants across Texas. Get a free consultation.",
  keywords: [
    "restaurant marketing Texas",
    "Texas restaurant SEO",
    "restaurant marketing agency Texas",
    "restaurant website design Texas",
    "restaurant website design",
    "restaurant SEO",
    "restaurant marketing agency",
    "restaurant branding",
    "Google Ads for restaurants",
    "Google Business Profile optimization",
    "local SEO for restaurants",
    "commission-free online ordering",
  ],
  openGraph: {
    siteName: "TableTurnerr",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/usage/restaurant-kitchen-2.jpg", width: 1200, height: 630 }],
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
  category: "Restaurant Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${caveat.variable}`}>
      <head>
        <link rel="dns-prefetch" href="//psdb.tableturnerr.com" />
        <link rel="preconnect" href="http://psdb.tableturnerr.com:8000" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-35W3QYXVMG" />
      </body>
    </html>
  );
}
