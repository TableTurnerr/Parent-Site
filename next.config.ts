import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage: blog featured images + portal/admin uploads.
        protocol: "https",
        hostname: "*.supabase.co",
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
    // 301s for the old restaurant/med-spa routes (and old tools) that were
    // removed in the review-automation rebuild, so previously-indexed URLs and
    // stray links don't 404. Most map to the homepage; trades/pricing map to the
    // closest new equivalent.
    return [
      { source: "/services", destination: "/", permanent: true },
      { source: "/services/:path*", destination: "/", permanent: true },
      { source: "/medspa", destination: "/", permanent: true },
      { source: "/restaurants", destination: "/", permanent: true },
      { source: "/case-studies", destination: "/", permanent: true },
      { source: "/locations/restaurants/:path*", destination: "/locations", permanent: true },
      // /pricing is now a real page; only redirect stray sub-paths to it.
      { source: "/pricing/:path*", destination: "/pricing", permanent: true },
      { source: "/search", destination: "/", permanent: true },
      { source: "/review-calculator", destination: "/", permanent: true },
      { source: "/tools", destination: "/", permanent: true },
      { source: "/savings-calculator", destination: "/", permanent: true },
      { source: "/menu-price-calculator", destination: "/", permanent: true },
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
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "img-src 'self' data: blob: https:",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://portalapi.tableturnerr.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com https://us.i.posthog.com https://us-assets.i.posthog.com",
              "frame-src 'self' https://portalapi.tableturnerr.com",
            ].join("; "),
          },
        ],
      },
      {
        // Private app surfaces — never cache, never index.
        source: "/(admin|portal)/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
