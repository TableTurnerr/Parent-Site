import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tableturnerr.com"),
  title: {
    default:
      "TableTurnerr - Restaurant Website Design, SEO & Marketing Agency",
    template: "%s | TableTurnerr",
  },
  description:
    "We build SEO-optimized websites and drive traffic for independent restaurants. Custom design, Google Ads, and commission-free ordering setup.",
  openGraph: {
    siteName: "TableTurnerr",
    images: [{ url: "/images/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} font-body antialiased bg-cream text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
