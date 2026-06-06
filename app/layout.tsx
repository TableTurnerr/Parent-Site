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
      "TableTurnerr | Restaurant Marketing, Web Design & SEO",
    template: "%s | TableTurnerr",
  },
  description:
    "TableTurnerr helps independent restaurants get found, get booked, and keep more profit. Websites that convert, local SEO, Google Ads, branding, and commission-free ordering. Book a free consultation.",
  keywords: [
    "restaurant website design",
    "restaurant SEO",
    "restaurant marketing agency",
    "restaurant branding",
    "Google Ads for restaurants",
    "Google Business Profile optimization",
    "restaurant digital marketing",
    "independent restaurant marketing",
    "commission-free online ordering",
    "restaurant menu design",
    "local SEO for restaurants",
    "restaurant website builder",
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
  verification: {
    google: "M-0AZRyz9kqD2TwnHjOCO3R593wsaKNLCDZy0JiGFVs",
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
      {/* suppressHydrationWarning: browser extensions (e.g. Bitdefender) inject
          attributes like bis_register onto <body> before React hydrates. This
          suppresses warnings for body's OWN attributes only, not its children. */}
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-35W3QYXVMG" />
      </body>
    </html>
  );
}
