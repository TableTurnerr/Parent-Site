import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="en" className={satoshi.variable}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
