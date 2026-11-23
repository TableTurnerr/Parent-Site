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
      // Old restaurant-era city pages: send each to the closest live page instead of the
      // homepage (Google treats redirects to an unrelated homepage as soft 404s).
      {
        source: "/services/google-business-profile-optimization/:rest*",
        destination: "/services/google-business-profile",
        permanent: true,
      },
      {
        source:
          "/services/:slug(restaurant-branding|restaurant-seo|restaurant-website-design|google-ads|commission-free-deliveries)/:rest*",
        destination: "/restaurants",
        permanent: true,
      },
      // Old /trades/<slug> pages (software-era): send each to its done-for-you trade plan so it doesn't compete
      // with /marketing/<trade>. Industry slugs that differ from trade slugs are mapped first; industries with no
      // trade plan fall back to their software page.
      { source: "/trades", destination: "/marketing", permanent: true },
      { source: "/trades/electrical", destination: "/marketing/electricians", permanent: true },
      { source: "/trades/lawn-care", destination: "/marketing/landscaping", permanent: true },
      { source: "/trades/cleaning", destination: "/marketing/cleaning-services", permanent: true },
      {
        source: "/trades/:slug(handyman|fence-companies|hvac|roofing|plumbing|tree-service|remodeling|landscaping|garage-door-repair|pressure-washing|holiday-lighting|painting|pest-control|cleaning-services|deck-builders|concrete-contractors|electricians)",
        destination: "/marketing/:slug",
        permanent: true,
      },
      { source: "/trades/:slug", destination: "/industries/:slug", permanent: true },
      { source: "/medspa", destination: "/", permanent: true },
      { source: "/case-studies", destination: "/results", permanent: true },
      { source: "/locations/restaurants/:path*", destination: "/restaurants", permanent: true },
      // /pricing is now a real page; only redirect stray sub-paths to it.
      // `:path+` (one or more segments): `:path*` also matched /pricing itself and looped.
      { source: "/pricing/:path+", destination: "/pricing", permanent: true },
      { source: "/search", destination: "/", permanent: true },
      // /tools is a real page again (free calculators and templates); the old review calculator maps to its replacement.
      { source: "/review-calculator", destination: "/tools/google-review-calculator", permanent: true },
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
              "frame-src 'self' https://portalapi.tableturnerr.com https://www.youtube-nocookie.com",
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
