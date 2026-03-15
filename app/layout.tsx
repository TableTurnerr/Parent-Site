import type { Metadata } from "next";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";
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
      "TableTurnerr | Restaurant Website Design, SEO & Marketing Agency",
    template: "%s | TableTurnerr",
  },
  description:
    "We design SEO-optimized restaurant websites and drive traffic for independent restaurants. Custom website design, local SEO, Google Ads management, and commission-free ordering setup. Get a free quote.",
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
    images: [{ url: "/images/og/default.jpg", width: 1200, height: 630 }],
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
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
