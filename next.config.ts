import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Supabase Storage: blog featured images + inline uploads live here.
        protocol: "https",
        hostname: "ehmadjsryrsjjfwsmqqq.supabase.co",
      },
      {
        // Any Supabase project host, future-proofing storage URLs.
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "http",
        hostname: "psdb.tableturnerr.com",
      },
      {
        protocol: "https",
        hostname: "psdb.tableturnerr.com",
      },
      {
        // Live homepage screenshots for the "Our Work" portfolio (thum.io).
        protocol: "https",
        hostname: "image.thum.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // 301s for pages we removed, so old/indexed URLs and stray links don't 404.
    return [
      { source: "/tools", destination: "/review-calculator", permanent: true },
      {
        source: "/savings-calculator",
        destination: "/review-calculator",
        permanent: true,
      },
      {
        source: "/menu-price-calculator",
        destination: "/review-calculator",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
      {
        source: "/(.*\\.(?:js|css|woff2|webp|avif|jpg|png|svg|ico))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
