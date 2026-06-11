export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceStat {
  prefix?: string;
  value: number;
  suffix?: string;
  decimalPlaces: number;
  label: string;
  source?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServicePageData {
  title: string;
  slug: string;
  category: string;
  headline: string;
  description: string;
  heroImage: { src: string; alt: string };
  features: ServiceFeature[];
  stats: ServiceStat[];
  faqs: ServiceFAQ[];
  keywords: string[];
  metaDescription: string;
  /** Present only on city variants: drives the unique local intro band. */
  cityContext?: {
    name: string;
    state: string;
    stateCode: string;
    blurb: string;
  };
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  "restaurant-website-design": {
    title: "Website Design",
    slug: "restaurant-website-design",
    category: "Web Design",
    headline: "Website Design That Converts",
    description:
      "We build high-converting websites on a proven, conversion-tested framework that we tailor to your brand, so you rank on Google, turn visitors into customers, and own your online presence. Mobile-first, SEO-optimized, and ready for online ordering from day one.",
    heroImage: {
      src: "/images/usage/chef-plating.webp",
      alt: "Chef carefully plating a dish in a professional restaurant kitchen",
    },
    features: [
      {
        title: "Mobile-First Design",
        description:
          "The majority of local website traffic comes from mobile devices. Every site we build is designed mobile-first, ensuring a fast, smooth experience that converts on any screen size.",
      },
      {
        title: "SEO Built In From Day One",
        description:
          "We don't bolt SEO on after the fact. Every website we build includes proper heading hierarchy, local SEO markup, schema data, optimized images, and fast load times baked into the foundation.",
      },
      {
        title: "Conversion-Optimized Layouts",
        description:
          "Strategic placement of calls-to-action, booking, and contact info based on how real customers browse and decide. Every layout decision is driven by conversion data.",
      },
      {
        title: "Lead Capture Built In",
        description:
          "We build in the forms, click-to-call, and booking that turn visitors into enquiries, so your site captures leads instead of losing them.",
      },
      {
        title: "Lightning-Fast Performance",
        description:
          "Slow websites lose customers. We optimize every image, minimize code, and use modern hosting to keep your website loading in under 2 seconds on any connection.",
      },
      {
        title: "A Proven Framework, Tailored to You",
        description:
          "We start from a refined, conversion-tested foundation we have battle-tested across real businesses, then tailor it to your brand, content, and voice. You get a site that performs from day one without paying to reinvent the wheel.",
      },
    ],
    stats: [
      {
        value: 78.4,
        suffix: "%",
        decimalPlaces: 1,
        label: "of local website traffic comes from mobile devices",
        source: "Industry Data",
      },
      {
        value: 88,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers look at a business's website before deciding to buy",
        source: "Industry Data",
      },
      {
        value: 34,
        suffix: "%",
        decimalPlaces: 0,
        label: "increase in conversions from a mobile-first redesign with clear CTAs",
        source: "Industry Data",
      },
      {
        value: 2,
        suffix: "x",
        decimalPlaces: 0,
        label: "more enquiries for businesses with a fast, conversion-built website",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "How much does a custom website cost?",
        answer:
          "Every business has different needs, so we provide custom quotes after an initial consultation. Pricing depends on the number of pages, the features you need, and the level of custom design work required.",
      },
      {
        question: "How long does it take to design and build a website?",
        answer:
          "Most custom websites are completed within 2-4 weeks from kickoff. This includes design, development, content creation, and full SEO optimization.",
      },
      {
        question: "Do I need to provide my own content and photos?",
        answer:
          "We can work with what you have, or handle content creation for you. We write SEO-optimized copy for your home, about, and service pages. For photography, we recommend professional photos but can source high-quality stock images as a starting point.",
      },
      {
        question: "Can you add booking, forms, or online payments?",
        answer:
          "Yes. We can integrate booking, contact forms, click-to-call, and payment or scheduling tools right into your site, so visitors can take action without leaving the page.",
      },
      {
        question: "Do you offer website maintenance after launch?",
        answer:
          "Yes. We offer ongoing maintenance packages that include content updates, security patches, performance monitoring, and SEO improvements. Most of our clients work with us on an ongoing monthly basis.",
      },
    ],
    keywords: [
      "website design",
      "website design agency",
      "small business website design",
      "local business website design",
      "custom website design",
    ],
    metaDescription:
      "Custom website design built to rank on Google and convert visitors into paying customers. Mobile-first, SEO-optimized, and built on a proven framework. Get a free consultation.",
  },

  "restaurant-seo": {
    title: "Local SEO Services",
    slug: "restaurant-seo",
    category: "SEO",
    headline: "Local SEO Services",
    description:
      "Local SEO strategies that get your business found on Google Search, Google Maps, and the local pack, so nearby customers choose you over the competition.",
    heroImage: {
      src: "/images/usage/kitchen-busy.webp",
      alt: "Busy restaurant kitchen with chefs working during peak service",
    },
    features: [
      {
        title: "Local SEO Strategy",
        description:
          "We build location-specific SEO strategies that target the searches your ideal customers are making. From 'near me' searches to 'best [service] in [city],' we make sure you show up.",
      },
      {
        title: "Google Maps Optimization",
        description:
          "Your Google Business Profile is the most important piece of local SEO. We optimize every field, manage your photos, respond to reviews, and keep your listing performing at its best.",
      },
      {
        title: "On-Page SEO",
        description:
          "We optimize your website's title tags, meta descriptions, heading structure, internal linking, and content to target the keywords your customers actually search for.",
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "We identify the exact search terms your potential customers use to find businesses like yours, then build a strategy to rank for those terms across Google Search and Maps.",
      },
      {
        title: "Competitor Analysis",
        description:
          "We analyze what your local competitors are doing right and where they're falling short. Then we build an SEO strategy that targets their weaknesses and outranks them.",
      },
      {
        title: "Monthly Reporting & Tracking",
        description:
          "You get clear, actionable reports showing your ranking positions, organic traffic, Google Business Profile views, and the actual phone calls and enquiries driven by SEO.",
      },
    ],
    stats: [
      {
        value: 92,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers use a search engine to find local businesses",
        source: "Industry Data",
      },
      {
        value: 90,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers research a business online before visiting",
        source: "Industry Data",
      },
      {
        value: 72,
        suffix: "%",
        decimalPlaces: 0,
        label: "of local searches result in a visit within 5 miles",
        source: "Google",
      },
      {
        value: 10,
        suffix: ":1",
        decimalPlaces: 0,
        label: "ROI delivered by content and SEO over time",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "How long does local SEO take to show results?",
        answer:
          "Most businesses start seeing measurable improvements in Google rankings and traffic within 3-6 months. Local SEO tends to move faster than national SEO because you're competing in a smaller geographic area. Quick wins like Google Business Profile optimization can show results in weeks.",
      },
      {
        question: "What's included in your local SEO service?",
        answer:
          "Our local SEO service covers local SEO strategy, Google Business Profile optimization, on-page SEO for your website, keyword targeting for your services and location, Google Maps optimization, competitor analysis, and monthly performance reporting.",
      },
      {
        question: "Do you work with businesses in specific locations?",
        answer:
          "We work with local businesses across the United States. Our local SEO strategies are tailored to your specific city, neighborhood, and competitive landscape. Whether you're in a major metro area or a small town, we build a strategy around your market.",
      },
      {
        question: "What's the difference between local SEO and regular SEO?",
        answer:
          "Local SEO focuses on ranking your business in location-based searches and Google Maps results. Regular SEO targets broader, non-location-specific searches. For local businesses, local SEO is far more valuable because your customers are searching near a specific location.",
      },
      {
        question: "Can SEO help my business compete with bigger competitors?",
        answer:
          "Yes. Bigger competitors have bigger budgets, but local SEO levels the playing field. Google's algorithm favors locally relevant, well-optimized businesses in local search results. A small business with strong local SEO can outrank much larger competitors in its own neighborhood.",
      },
    ],
    keywords: [
      "local SEO",
      "local SEO services",
      "SEO services",
      "small business SEO",
      "local business SEO",
    ],
    metaDescription:
      "Local SEO services that get your business found on Google Search and Google Maps. Local strategies, keyword targeting, and monthly reporting that turn searches into customers.",
  },

  "restaurant-branding": {
    title: "Branding & Design",
    slug: "restaurant-branding",
    category: "Branding",
    headline: "Branding & Design",
    description:
      "Complete branding that sets you apart from the competition. Logo design, visual identity systems, and brand guidelines that make your business instantly recognizable.",
    heroImage: {
      src: "/images/usage/enjoying-food.webp",
      alt: "People enjoying beautifully presented food at a restaurant table",
    },
    features: [
      {
        title: "Logo & Identity Design",
        description:
          "We design logos that work everywhere: your storefront, website, social media, packaging, and print materials. Every logo comes with a complete brand identity system.",
      },
      {
        title: "Marketing Collateral Design",
        description:
          "From brochures to one-pagers and price lists, we design the materials that sell. Clean, on-brand layouts that guide customer decisions and highlight what matters most using proven layout psychology.",
      },
      {
        title: "Visual Identity System",
        description:
          "Colors, typography, photography style, patterns, and textures that create a cohesive visual language. Everything your business puts out into the world should feel intentionally connected.",
      },
      {
        title: "Brand Guidelines Document",
        description:
          "A comprehensive brand guidelines document that ensures consistency across every touchpoint, whether it's your team creating social media posts or a printer producing your materials.",
      },
      {
        title: "Print & Digital Collateral",
        description:
          "Business cards, flyers, social media templates, email headers, and signage. Every piece of collateral is designed to reinforce your brand at every customer interaction.",
      },
      {
        title: "Signage & Environment Design",
        description:
          "Your brand experience shouldn't stop at the front door. We design signage, window graphics, and on-site materials that reinforce your brand at every physical touchpoint.",
      },
    ],
    stats: [
      {
        value: 77,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers check a business's website before deciding to buy",
        source: "Industry Data",
      },
      {
        value: 65,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers prefer local businesses over big chains",
        source: "Industry Data",
      },
      {
        value: 74,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers use social media to decide where to buy",
        source: "Industry Data",
      },
      {
        value: 30,
        suffix: "%",
        decimalPlaces: 0,
        label: "more conversions for businesses with a prominent, clear call to action",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "What's included in a branding package?",
        answer:
          "A complete branding package includes logo design with variations, color palette, typography system, photography direction, collateral design, brand guidelines document, business cards, and social media templates. We tailor each package to your business's needs.",
      },
      {
        question: "How long does the branding process take?",
        answer:
          "A full branding project typically takes 3-5 weeks. This includes discovery and research, concept development, design rounds with revisions, and final delivery of all brand assets and guidelines.",
      },
      {
        question: "Can you redesign our existing brand without starting from scratch?",
        answer:
          "Yes. We offer brand refresh services that update and modernize your existing identity while maintaining the recognition your customers already have. This is faster and more cost-effective than a full rebrand.",
      },
      {
        question: "Do you design marketing materials?",
        answer:
          "Yes, collateral design is one of our core branding services. We design brochures, one-pagers, price lists, and other materials that are visually compelling and strategically organized to guide customer decisions. We handle both print and digital.",
      },
      {
        question: "Will I own all the brand assets you create?",
        answer:
          "Yes. Upon project completion, you receive full ownership of all brand assets including logo files in all formats, brand guidelines, and all collateral templates. Everything is yours to use without restrictions.",
      },
    ],
    keywords: [
      "branding agency",
      "logo design",
      "brand identity",
      "small business branding",
      "local business branding",
    ],
    metaDescription:
      "Branding and design services including logo design and visual identity systems. Build a brand that sets your business apart. Get a free consultation.",
  },

  "google-ads": {
    title: "Google Ads Management",
    slug: "google-ads",
    category: "Paid Ads",
    headline: "Google Ads Management",
    description:
      "Targeted Google Ads campaigns that put your business in front of high-intent local customers at the exact moment they are searching. Low-cost clicks, high-intent customers, measurable ROI.",
    heroImage: {
      src: "/images/usage/kitchen-motion.webp",
      alt: "Restaurant kitchen in motion during a busy dinner service",
    },
    features: [
      {
        title: "Campaign Strategy & Setup",
        description:
          "We build Google Ads campaigns targeting high-intent local searches like '[service] near me' and 'open now.' Every campaign is structured for maximum relevance and minimum wasted spend.",
      },
      {
        title: "Local Keyword Targeting",
        description:
          "We target the exact search terms customers use when looking for businesses like yours in your area. Location-based keywords, service-specific searches, and high-intent phrases that drive immediate action.",
      },
      {
        title: "Bid & Budget Management",
        description:
          "We manage your bids and budget to maximize every dollar spent. Our strategies focus on driving the most calls, bookings, and enquiries at the lowest cost per acquisition.",
      },
      {
        title: "Conversion Tracking",
        description:
          "We track every phone call, form submission, booking, and direction request generated by your ads. You'll know exactly how many customers your ad spend is bringing through the door.",
      },
      {
        title: "Ad Copy & Creative",
        description:
          "Ad copy that highlights your services, offers, and unique selling points. We A/B test headlines, descriptions, and calls-to-action to find what drives the most clicks and conversions.",
      },
      {
        title: "Monthly Performance Reports",
        description:
          "Clear, jargon-free reports showing your ad spend, clicks, conversions, cost per customer, and return on ad spend. We show you exactly what your Google Ads investment is producing.",
      },
    ],
    stats: [
      {
        value: 8.72,
        suffix: "%",
        decimalPlaces: 2,
        label: "average conversion rate for well-targeted local Google Ads campaigns",
        source: "Google Ads Benchmarks",
      },
      {
        prefix: "$",
        value: 1.92,
        suffix: "",
        decimalPlaces: 2,
        label: "average cost-per-click for a well-optimized local campaign",
        source: "Google Ads Benchmarks",
      },
      {
        value: 92,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers use a search engine to find local businesses",
        source: "Industry Data",
      },
      {
        value: 72,
        suffix: "%",
        decimalPlaces: 0,
        label: "of local searches result in a visit within 5 miles",
        source: "Google",
      },
    ],
    faqs: [
      {
        question: "How much should a business spend on Google Ads?",
        answer:
          "Most local businesses see strong results starting at $500-1,500 per month in ad spend, plus management fees. The right budget depends on your location, competition, and goals. We help you find the sweet spot where your ad spend generates a measurable return.",
      },
      {
        question: "How quickly will I see results from Google Ads?",
        answer:
          "Google Ads can drive results immediately after launch. Unlike SEO, which builds over months, paid ads put your business at the top of search results on day one. Most businesses see meaningful traffic and conversions within the first two weeks.",
      },
      {
        question: "What types of Google Ads do you run?",
        answer:
          "We primarily run Search ads targeting high-intent local queries, Google Maps ads that promote your business in map results, and remarketing campaigns that bring back visitors who didn't convert on their first visit.",
      },
      {
        question: "How do you measure success for Google Ads?",
        answer:
          "We track phone calls, form submissions, direction requests, bookings, and website visits generated by your ads. Every month, we report your cost per customer, return on ad spend, and total conversions so you know exactly what your investment is producing.",
      },
      {
        question: "Can I pause my Google Ads campaigns at any time?",
        answer:
          "Yes. Google Ads campaigns can be paused or adjusted at any time. There are no long-term contracts for ad management. We recommend running campaigns consistently for best results, but you always have full control.",
      },
    ],
    keywords: [
      "Google Ads management",
      "Google Ads agency",
      "PPC management",
      "Google Ads for small business",
      "local Google Ads",
    ],
    metaDescription:
      "Google Ads management for local businesses. Targeted local campaigns that drive customers to you with measurable ROI. Expert setup, bid management, and monthly reporting.",
  },

  "google-business-profile-optimization": {
    title: "Google Business Profile Optimization",
    slug: "google-business-profile-optimization",
    category: "Local Search",
    headline: "Google Business Profile Optimization",
    description:
      "Your Google Business Profile is the single most important piece of your local online presence. We optimize every detail so your business dominates local search, Google Maps, and nearby searches.",
    heroImage: {
      src: "/images/usage/restaurant-interior.webp",
      alt: "Warm, inviting restaurant interior with ambient lighting",
    },
    features: [
      {
        title: "Profile Setup & Verification",
        description:
          "We handle the full setup or claim process for your Google Business Profile, ensuring every field is completed accurately and your business is verified and ready to rank.",
      },
      {
        title: "Category & Attribute Optimization",
        description:
          "Choosing the right primary and secondary categories is critical for local search visibility. We optimize your categories, attributes, and service descriptions to match what customers search for.",
      },
      {
        title: "Photo Strategy",
        description:
          "Businesses with quality photos get 42% more direction requests. We develop a photo strategy that showcases your work, your space, and your team at their best.",
      },
      {
        title: "Review Management",
        description:
          "We help you build a review generation system and craft professional responses to every review, positive and negative. Consistent, thoughtful review management builds trust and improves rankings.",
      },
      {
        title: "Google Posts & Updates",
        description:
          "Regular Google Posts keep your profile active and give you an extra touchpoint with potential customers. We create and schedule posts for offers, events, updates, and seasonal promotions.",
      },
      {
        title: "Local Pack Ranking Strategy",
        description:
          "We focus on getting your business into the coveted Google Local Pack, the top 3 map results that appear for local searches. This is where the majority of clicks and calls come from.",
      },
    ],
    stats: [
      {
        value: 42,
        suffix: "%",
        decimalPlaces: 0,
        label: "more direction requests for businesses with quality photos on their profile",
        source: "Google",
      },
      {
        value: 2.3,
        suffix: "x",
        decimalPlaces: 1,
        label: "more reviews for GBP-optimized businesses compared to unoptimized listings",
        source: "Google",
      },
      {
        value: 15,
        suffix: "%+",
        decimalPlaces: 0,
        label: "more interactions for businesses with optimized Google Business Profiles",
        source: "Google",
      },
      {
        value: 90,
        suffix: "%",
        decimalPlaces: 0,
        label: "of people read reviews before visiting a business",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "How long does Google Business Profile optimization take to show results?",
        answer:
          "Most businesses see noticeable improvements in their Google Maps visibility within 4-8 weeks of optimization. Results depend on your starting point, local competition, and how consistently we execute the strategy.",
      },
      {
        question: "What if I haven't claimed my Google Business Profile yet?",
        answer:
          "We handle the entire claim and verification process for you. If your business already has an unclaimed listing (which is common), we'll claim it, verify ownership, and then optimize every field for maximum visibility.",
      },
      {
        question: "How do you help with negative reviews?",
        answer:
          "We help you respond to negative reviews professionally and constructively. A well-crafted response to a negative review can actually improve how potential customers perceive your business. We also build systems to proactively generate positive reviews from happy customers.",
      },
      {
        question: "Do you manage profiles for businesses with multiple locations?",
        answer:
          "Yes. We manage Google Business Profiles for multi-location businesses with location-specific strategies for each listing. Each location gets its own optimized profile, photo strategy, and review management approach.",
      },
      {
        question: "What's the difference between Google Business Profile and Google Ads?",
        answer:
          "Your Google Business Profile is your free listing on Google Maps and local search results. Google Ads are paid campaigns that put your business at the top of search results. Both are important: your GBP builds long-term organic visibility, while Google Ads drive immediate traffic. We recommend optimizing both.",
      },
    ],
    keywords: [
      "Google Business Profile optimization",
      "Google Business Profile management",
      "Google Maps optimization",
      "local listing optimization",
      "GBP optimization",
    ],
    metaDescription:
      "Google Business Profile optimization for local businesses. Dominate local search, Google Maps, and nearby searches. Profile setup, review management, and local pack ranking.",
  },

  "commission-free-deliveries": {
    title: "Commission-Free Online Ordering",
    slug: "commission-free-deliveries",
    category: "Online Ordering",
    headline: "Commission-Free Online Ordering",
    description:
      "Stop losing 15-30% of every order to DoorDash and UberEats. We set up commission-free direct ordering and flat-fee delivery so your restaurant keeps more profit from every delivery and takeout order.",
    heroImage: {
      src: "/images/usage/order-counter.jpg",
      alt: "Restaurant worker preparing food orders at the counter for delivery",
    },
    features: [
      {
        title: "Direct Ordering Setup",
        description:
          "We build commission-free direct ordering right into your restaurant's website. Customers order from you, not a third-party app, and you keep the revenue.",
      },
      {
        title: "Flat-Fee Delivery",
        description:
          "Our Turnerr Deliver service dispatches the nearest driver the moment an order comes in and charges a flat fee per delivery instead of a percentage, so a busy delivery night no longer means a giant commission bill.",
      },
      {
        title: "Branded Ordering Experience",
        description:
          "Your customers order through your own branded website and mobile app, not a marketplace where you compete with every other restaurant. You control the experience, the branding, and the customer relationship.",
      },
      {
        title: "Automated Marketing & Loyalty",
        description:
          "Your direct ordering setup includes built-in tools for email and SMS marketing, loyalty programs, and automated follow-ups. Turn first-time delivery customers into repeat direct orders without lifting a finger.",
      },
      {
        title: "Third-Party App Pivot Strategy",
        description:
          "We don't tell you to abandon DoorDash and UberEats entirely. Instead, we help you use them as acquisition channels to find new customers, then convert those customers to direct, commission-free orders for all repeat business.",
      },
      {
        title: "Revenue Analytics & Savings Tracking",
        description:
          "Track exactly how much you're saving compared to third-party commissions. See real-time data on direct orders, repeat customers, and the revenue you're keeping instead of handing to delivery apps.",
      },
    ],
    stats: [
      {
        prefix: "$",
        value: 16000,
        suffix: "",
        decimalPlaces: 0,
        label: "average annual savings when restaurants switch from delivery apps to commission-free ordering",
        source: "Industry Data",
      },
      {
        value: 67,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers prefer ordering directly from a restaurant's own website or app",
        source: "Industry Data",
      },
      {
        value: 30,
        suffix: "%",
        decimalPlaces: 0,
        label: "commission fees charged by DoorDash and UberEats on every order",
        source: "Industry Data",
      },
      {
        prefix: "$",
        value: 1.5,
        suffix: "",
        decimalPlaces: 2,
        label: "flat fee per delivered order with Turnerr Deliver, instead of 15-30% commission",
        source: "TableTurnerr",
      },
    ],
    faqs: [
      {
        question: "How much can my restaurant save by switching to commission-free ordering?",
        answer:
          "Restaurants save an average of $16,000 per year by switching from third-party delivery apps to commission-free platforms. The exact savings depend on your order volume and average order value. A restaurant doing $50,000/month in delivery orders on DoorDash at 25% commission is losing $12,500/month to fees alone.",
      },
      {
        question: "Will I lose customers if I stop using DoorDash and UberEats?",
        answer:
          "We don't recommend stopping entirely. Our strategy is to keep DoorDash and UberEats as customer acquisition channels while moving repeat customers to your direct ordering platform. 67% of consumers already prefer ordering directly from restaurants when the option is available.",
      },
      {
        question: "How does Turnerr Deliver work?",
        answer:
          "Turnerr Deliver is our flat-fee delivery service. When an order comes in through your own website, it dispatches the nearest available driver and charges a flat fee per delivered order instead of a percentage commission. It plugs into your POS, so a $40 order costs you a small flat fee rather than $10 to $12 in third-party commission.",
      },
      {
        question: "How long does it take to set up commission-free ordering?",
        answer:
          "Most restaurants are fully transitioned within 2-4 weeks. This includes platform setup, menu migration, website integration, and staff training. We handle the technical work so your team can focus on running the restaurant.",
      },
      {
        question: "Do I need a new website to use commission-free ordering?",
        answer:
          "No. Commission-free direct ordering can be added to your existing website. If your current site needs updates to support direct ordering, we handle that as part of the setup. If you don't have a website yet, we build one as part of our restaurant website design service.",
      },
    ],
    keywords: [
      "commission free online ordering",
      "commission free delivery",
      "direct online ordering",
      "online ordering system",
      "reduce delivery app fees",
    ],
    metaDescription:
      "Commission-free delivery and online ordering for restaurants. Stop paying 15-30% to DoorDash and UberEats. We set up direct ordering plus flat-fee delivery so you keep more profit.",
  },
};

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(SERVICE_PAGES);
}

export function getRelatedServices(currentSlug: string, count = 4): ServicePageData[] {
  return Object.values(SERVICE_PAGES)
    .filter((s) => s.slug !== currentSlug)
    .slice(0, count);
}
