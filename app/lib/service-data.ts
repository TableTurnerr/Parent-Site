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
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  "restaurant-website-design": {
    title: "Custom Restaurant Website Design",
    slug: "restaurant-website-design",
    category: "Web Design",
    headline: "Custom Restaurant Website Design",
    description:
      "We design and build custom restaurant websites that rank on Google, convert visitors into paying diners, and give you full control over your online presence. Mobile-first, SEO-optimized, and built for online ordering from day one.",
    heroImage: {
      src: "/images/usage/chef-plating.webp",
      alt: "Chef carefully plating a dish in a professional restaurant kitchen",
    },
    features: [
      {
        title: "Mobile-First Design",
        description:
          "78.4% of restaurant website traffic comes from mobile devices. Every site we build is designed mobile-first, ensuring a fast, smooth experience that converts on any screen size.",
      },
      {
        title: "SEO Built In From Day One",
        description:
          "We don't bolt SEO on after the fact. Every restaurant website we build includes proper heading hierarchy, local SEO markup, schema data, optimized images, and fast load times baked into the foundation.",
      },
      {
        title: "Conversion-Optimized Layouts",
        description:
          "Strategic placement of online ordering buttons, reservation links, and contact info based on how real diners browse restaurant websites. Every layout decision is driven by conversion data.",
      },
      {
        title: "Online Ordering Integration",
        description:
          "We integrate commission-free ordering systems like Owner.com and ChowNow directly into your website, so you keep more profit from every order placed through your site.",
      },
      {
        title: "Lightning-Fast Performance",
        description:
          "Slow websites lose customers. We optimize every image, minimize code, and use modern hosting to keep your restaurant website loading in under 2 seconds on any connection.",
      },
      {
        title: "Custom Branding, Not Templates",
        description:
          "No cookie-cutter templates. Every restaurant website we design reflects your brand identity, menu style, and atmosphere. Your website should feel like walking into your restaurant.",
      },
    ],
    stats: [
      {
        value: 78.4,
        suffix: "%",
        decimalPlaces: 1,
        label: "of restaurant website traffic comes from mobile devices",
        source: "Industry Data",
      },
      {
        prefix: "+",
        value: 377,
        suffix: "%",
        decimalPlaces: 0,
        label: "online growth achieved by Samos Oaxaca after transitioning to Owner.com",
        source: "Owner.com",
      },
      {
        value: 34,
        suffix: "%",
        decimalPlaces: 0,
        label: "increase in online ordering volume from mobile-first redesigns with sticky CTAs",
        source: "Industry Data",
      },
      {
        prefix: "$",
        value: 970,
        suffix: "",
        decimalPlaces: 0,
        label: "in Owner.com setup fees waived when you work with TableTurnerr",
        source: "Owner.com",
      },
    ],
    faqs: [
      {
        question: "How much does a custom restaurant website cost?",
        answer:
          "Every restaurant has different needs, so we provide custom quotes after an initial consultation. Pricing depends on the number of pages, features like online ordering integration, and the level of custom design work required.",
      },
      {
        question: "How long does it take to design and build a restaurant website?",
        answer:
          "Most custom restaurant websites are completed within 2-4 weeks from kickoff. This includes design, development, content creation, and full SEO optimization.",
      },
      {
        question: "Do I need to provide my own content and photos?",
        answer:
          "We can work with what you have, or handle content creation for you. We write SEO-optimized copy for your menu, about page, and service descriptions. For photography, we recommend professional food photography but can source high-quality stock images as a starting point.",
      },
      {
        question: "Will my website work with online ordering platforms?",
        answer:
          "Yes. We integrate commission-free ordering systems like Owner.com and ChowNow directly into your website. This means customers order through your site, not through third-party apps charging 15-30% per order.",
      },
      {
        question: "Do you offer website maintenance after launch?",
        answer:
          "Yes. We offer ongoing maintenance packages that include content updates, security patches, performance monitoring, and SEO improvements. Most of our restaurant clients work with us on an ongoing monthly basis.",
      },
    ],
    keywords: [
      "restaurant website design",
      "restaurant website builder",
      "custom restaurant website",
      "restaurant web design",
      "restaurant website development",
    ],
    metaDescription:
      "Custom restaurant website design built to rank on Google and convert visitors into paying diners. Mobile-first, SEO-optimized, with online ordering integration. Get a free consultation.",
  },

  "restaurant-seo": {
    title: "Restaurant SEO Services",
    slug: "restaurant-seo",
    category: "SEO",
    headline: "Restaurant SEO Services",
    description:
      "Local SEO strategies built specifically for restaurants. We get your restaurant found on Google Search, Google Maps, and local pack results so nearby diners choose you over the competition.",
    heroImage: {
      src: "/images/usage/kitchen-busy.webp",
      alt: "Busy restaurant kitchen with chefs working during peak service",
    },
    features: [
      {
        title: "Local SEO Strategy",
        description:
          "We build location-specific SEO strategies that target the searches your ideal diners are making. From 'best sushi near me' to 'Italian restaurant downtown,' we make sure you show up.",
      },
      {
        title: "Google Maps Optimization",
        description:
          "Your Google Business Profile is the most important piece of restaurant SEO. We optimize every field, manage your photos, respond to reviews, and keep your listing performing at its best.",
      },
      {
        title: "On-Page SEO",
        description:
          "We optimize your website's title tags, meta descriptions, heading structure, internal linking, and content to target the keywords restaurant owners actually search for.",
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "We identify the exact search terms your potential customers use to find restaurants like yours, then build a strategy to rank for those terms across Google Search and Maps.",
      },
      {
        title: "Competitor Analysis",
        description:
          "We analyze what your local competitors are doing right and where they're falling short. Then we build an SEO strategy that targets their weaknesses and outranks them.",
      },
      {
        title: "Monthly Reporting & Tracking",
        description:
          "You get clear, actionable reports showing your ranking positions, organic traffic, Google Business Profile views, and the actual phone calls and orders driven by SEO.",
      },
    ],
    stats: [
      {
        value: 92,
        suffix: "%",
        decimalPlaces: 0,
        label: "of customers use a search engine to find restaurants",
        source: "Industry Data",
      },
      {
        value: 90,
        suffix: "%",
        decimalPlaces: 0,
        label: "of diners research a restaurant online before visiting",
        source: "Industry Data",
      },
      {
        value: 72,
        suffix: "%",
        decimalPlaces: 0,
        label: "of local restaurant searches result in a visit within 5 miles",
        source: "Google",
      },
      {
        value: 10,
        suffix: ":1",
        decimalPlaces: 0,
        label: "ROI delivered by content and SEO for restaurants",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "How long does restaurant SEO take to show results?",
        answer:
          "Most restaurants start seeing measurable improvements in Google rankings and traffic within 3-6 months. Local SEO tends to move faster than national SEO because you're competing in a smaller geographic area. Quick wins like Google Business Profile optimization can show results in weeks.",
      },
      {
        question: "What's included in your restaurant SEO service?",
        answer:
          "Our restaurant SEO service covers local SEO strategy, Google Business Profile optimization, on-page SEO for your website, keyword targeting for your menu and location, Google Maps optimization, competitor analysis, and monthly performance reporting.",
      },
      {
        question: "Do you work with restaurants in specific locations?",
        answer:
          "We work with independent restaurants across the United States. Our local SEO strategies are tailored to your specific city, neighborhood, and competitive landscape. Whether you're in a major metro area or a small town, we build a strategy around your market.",
      },
      {
        question: "What's the difference between local SEO and regular SEO?",
        answer:
          "Local SEO focuses on ranking your restaurant in location-based searches and Google Maps results. Regular SEO targets broader, non-location-specific searches. For restaurants, local SEO is far more valuable because your customers are searching for food near a specific location.",
      },
      {
        question: "Can SEO help my restaurant compete with chain restaurants?",
        answer:
          "Yes. Chain restaurants have big budgets, but local SEO levels the playing field. Google's algorithm favors locally relevant, well-optimized businesses in local search results. An independent restaurant with strong local SEO can outrank major chains in its own neighborhood.",
      },
    ],
    keywords: [
      "restaurant SEO",
      "SEO for restaurants",
      "local SEO for restaurants",
      "restaurant SEO services",
      "restaurant Google ranking",
    ],
    metaDescription:
      "Restaurant SEO services that get your restaurant found on Google Search and Google Maps. Local SEO strategies, keyword targeting, and monthly reporting for independent restaurants.",
  },

  "restaurant-branding": {
    title: "Restaurant Branding & Design",
    slug: "restaurant-branding",
    category: "Branding",
    headline: "Restaurant Branding & Design",
    description:
      "Complete restaurant branding that sets you apart from the chains. Logo design, menu design, visual identity systems, and brand guidelines that make your restaurant instantly recognizable.",
    heroImage: {
      src: "/images/usage/enjoying-food.webp",
      alt: "People enjoying beautifully presented food at a restaurant table",
    },
    features: [
      {
        title: "Logo & Identity Design",
        description:
          "We design restaurant logos that work everywhere: your storefront, website, social media, packaging, and print materials. Every logo comes with a complete brand identity system.",
      },
      {
        title: "Menu Design & Layout",
        description:
          "Your menu is your most powerful sales tool. We design menus that look beautiful, guide customer decisions, and highlight your most profitable items using proven layout psychology.",
      },
      {
        title: "Visual Identity System",
        description:
          "Colors, typography, photography style, patterns, and textures that create a cohesive visual language. Everything your restaurant puts out into the world should feel intentionally connected.",
      },
      {
        title: "Brand Guidelines Document",
        description:
          "A comprehensive brand guidelines document that ensures consistency across every touchpoint, whether it's your team creating social media posts or a printer producing your menus.",
      },
      {
        title: "Print & Digital Collateral",
        description:
          "Business cards, table tents, flyers, social media templates, email headers, and signage. Every piece of collateral is designed to reinforce your brand at every customer interaction.",
      },
      {
        title: "Packaging & Takeout Design",
        description:
          "Branded packaging for takeout and delivery orders. Your brand experience shouldn't stop at the restaurant door. We design bags, boxes, stickers, and inserts that keep your brand in front of customers.",
      },
    ],
    stats: [
      {
        value: 77,
        suffix: "%",
        decimalPlaces: 0,
        label: "of diners check a restaurant's website before deciding where to eat",
        source: "Industry Data",
      },
      {
        value: 65,
        suffix: "%",
        decimalPlaces: 0,
        label: "of consumers prefer local restaurants over chains",
        source: "Industry Data",
      },
      {
        value: 74,
        suffix: "%",
        decimalPlaces: 0,
        label: "of diners use social media to decide where to eat",
        source: "Industry Data",
      },
      {
        value: 30,
        suffix: "%",
        decimalPlaces: 0,
        label: "more online orders for restaurants with prominent 'Order Online' buttons",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "What's included in a restaurant branding package?",
        answer:
          "A complete branding package includes logo design with variations, color palette, typography system, photography direction, menu design, brand guidelines document, business cards, and social media templates. We tailor each package to your restaurant's needs.",
      },
      {
        question: "How long does the branding process take?",
        answer:
          "A full restaurant branding project typically takes 3-5 weeks. This includes discovery and research, concept development, design rounds with revisions, and final delivery of all brand assets and guidelines.",
      },
      {
        question: "Can you redesign our existing brand without starting from scratch?",
        answer:
          "Yes. We offer brand refresh services that update and modernize your existing identity while maintaining the recognition your customers already have. This is faster and more cost-effective than a full rebrand.",
      },
      {
        question: "Do you design restaurant menus?",
        answer:
          "Yes, menu design is one of our core branding services. We design menus that are visually compelling and strategically organized to guide customer decisions toward your highest-margin items. We handle both print menus and digital menu design.",
      },
      {
        question: "Will I own all the brand assets you create?",
        answer:
          "Yes. Upon project completion, you receive full ownership of all brand assets including logo files in all formats, brand guidelines, menu design files, and all collateral templates. Everything is yours to use without restrictions.",
      },
    ],
    keywords: [
      "restaurant branding",
      "restaurant menu design",
      "restaurant brand identity",
      "restaurant logo design",
      "restaurant branding agency",
    ],
    metaDescription:
      "Restaurant branding and design services including logo design, menu design, and visual identity systems. Build a brand that sets your restaurant apart. Get a free consultation.",
  },

  "google-ads": {
    title: "Google Ads for Restaurants",
    slug: "google-ads",
    category: "Paid Ads",
    headline: "Google Ads for Restaurants",
    description:
      "Targeted Google Ads campaigns that put your restaurant in front of hungry diners at the exact moment they're searching for a place to eat. Low-cost clicks, high-intent customers, measurable ROI.",
    heroImage: {
      src: "/images/usage/kitchen-motion.webp",
      alt: "Restaurant kitchen in motion during a busy dinner service",
    },
    features: [
      {
        title: "Campaign Strategy & Setup",
        description:
          "We build Google Ads campaigns specifically for restaurants, targeting high-intent local searches like 'best pizza near me' and 'restaurants open now.' Every campaign is structured for maximum relevance and minimum wasted spend.",
      },
      {
        title: "Local Keyword Targeting",
        description:
          "We target the exact search terms hungry diners use when looking for restaurants in your area. Location-based keywords, cuisine-specific searches, and high-intent phrases that drive immediate action.",
      },
      {
        title: "Bid & Budget Management",
        description:
          "We manage your bids and budget to maximize every dollar spent. Our strategies focus on driving the most orders and reservations at the lowest cost per acquisition.",
      },
      {
        title: "Conversion Tracking",
        description:
          "We track every phone call, online order, reservation, and direction request generated by your ads. You'll know exactly how many customers your ad spend is bringing through the door.",
      },
      {
        title: "Ad Copy & Creative",
        description:
          "Restaurant-specific ad copy that highlights your menu, specials, and unique selling points. We A/B test headlines, descriptions, and calls-to-action to find what drives the most clicks and conversions.",
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
        label: "average conversion rate for restaurant Google Ads campaigns",
        source: "Google Ads Benchmarks",
      },
      {
        prefix: "$",
        value: 1.92,
        suffix: "",
        decimalPlaces: 2,
        label: "average cost-per-click for restaurant ads vs $8.58 for legal",
        source: "Google Ads Benchmarks",
      },
      {
        value: 92,
        suffix: "%",
        decimalPlaces: 0,
        label: "of customers use a search engine to find restaurants",
        source: "Industry Data",
      },
      {
        value: 72,
        suffix: "%",
        decimalPlaces: 0,
        label: "of local restaurant searches result in a visit within 5 miles",
        source: "Google",
      },
    ],
    faqs: [
      {
        question: "How much should a restaurant spend on Google Ads?",
        answer:
          "Most independent restaurants see strong results starting at $500-1,500 per month in ad spend, plus management fees. The right budget depends on your location, competition, and goals. We help you find the sweet spot where your ad spend generates a measurable return.",
      },
      {
        question: "How quickly will I see results from Google Ads?",
        answer:
          "Google Ads can drive results immediately after launch. Unlike SEO, which builds over months, paid ads put your restaurant at the top of search results on day one. Most restaurants see meaningful traffic and conversions within the first two weeks.",
      },
      {
        question: "What types of Google Ads do you run for restaurants?",
        answer:
          "We primarily run Search ads targeting high-intent local queries, Google Maps ads that promote your restaurant in map results, and remarketing campaigns that bring back visitors who didn't convert on their first visit.",
      },
      {
        question: "How do you measure success for restaurant Google Ads?",
        answer:
          "We track phone calls, online orders, direction requests, reservation bookings, and website visits generated by your ads. Every month, we report your cost per customer, return on ad spend, and total conversions so you know exactly what your investment is producing.",
      },
      {
        question: "Can I pause my Google Ads campaigns at any time?",
        answer:
          "Yes. Google Ads campaigns can be paused or adjusted at any time. There are no long-term contracts for ad management. We recommend running campaigns consistently for best results, but you always have full control.",
      },
    ],
    keywords: [
      "Google Ads for restaurants",
      "restaurant Google Ads management",
      "restaurant PPC",
      "restaurant paid advertising",
      "Google Ads restaurant marketing",
    ],
    metaDescription:
      "Google Ads management for restaurants. Targeted local ad campaigns that drive diners to your door with measurable ROI. Expert setup, bid management, and monthly reporting.",
  },

  "google-business-profile-optimization": {
    title: "Google Business Profile Optimization",
    slug: "google-business-profile-optimization",
    category: "Local Search",
    headline: "Google Business Profile Optimization",
    description:
      "Your Google Business Profile is the single most important piece of your restaurant's online presence. We optimize every detail so your restaurant dominates local search, Google Maps, and nearby searches.",
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
          "Choosing the right primary and secondary categories is critical for local search visibility. We optimize your categories, attributes, and service descriptions to match what diners search for.",
      },
      {
        title: "Photo & Menu Strategy",
        description:
          "Restaurants with quality photos get 42% more direction requests. We develop a photo strategy that showcases your food, interior, and team at their best.",
      },
      {
        title: "Review Management",
        description:
          "We help you build a review generation system and craft professional responses to every review, positive and negative. Consistent, thoughtful review management builds trust and improves rankings.",
      },
      {
        title: "Google Posts & Updates",
        description:
          "Regular Google Posts keep your profile active and give you an extra touchpoint with potential diners. We create and schedule posts for specials, events, new menu items, and seasonal promotions.",
      },
      {
        title: "Local Pack Ranking Strategy",
        description:
          "We focus on getting your restaurant into the coveted Google Local Pack, the top 3 map results that appear for local searches. This is where the majority of clicks and calls come from.",
      },
    ],
    stats: [
      {
        value: 42,
        suffix: "%",
        decimalPlaces: 0,
        label: "more direction requests for restaurants with quality photos on their profile",
        source: "Google",
      },
      {
        value: 2.3,
        suffix: "x",
        decimalPlaces: 1,
        label: "more reviews for GBP-optimized restaurants compared to unoptimized listings",
        source: "Google",
      },
      {
        value: 15,
        suffix: "%+",
        decimalPlaces: 0,
        label: "more interactions for restaurants with optimized Google Business Profiles",
        source: "Google",
      },
      {
        value: 90,
        suffix: "%",
        decimalPlaces: 0,
        label: "of people read reviews before visiting a restaurant",
        source: "Industry Data",
      },
    ],
    faqs: [
      {
        question: "How long does Google Business Profile optimization take to show results?",
        answer:
          "Most restaurants see noticeable improvements in their Google Maps visibility within 4-8 weeks of optimization. Results depend on your starting point, local competition, and how consistently we execute the strategy.",
      },
      {
        question: "What if I haven't claimed my Google Business Profile yet?",
        answer:
          "We handle the entire claim and verification process for you. If your restaurant already has an unclaimed listing (which is common), we'll claim it, verify ownership, and then optimize every field for maximum visibility.",
      },
      {
        question: "How do you help with negative reviews?",
        answer:
          "We help you respond to negative reviews professionally and constructively. A well-crafted response to a negative review can actually improve how potential customers perceive your restaurant. We also build systems to proactively generate positive reviews from happy diners.",
      },
      {
        question: "Do you manage profiles for restaurants with multiple locations?",
        answer:
          "Yes. We manage Google Business Profiles for multi-location restaurants with location-specific strategies for each listing. Each location gets its own optimized profile, photo strategy, and review management approach.",
      },
      {
        question: "What's the difference between Google Business Profile and Google Ads?",
        answer:
          "Your Google Business Profile is your free listing on Google Maps and local search results. Google Ads are paid campaigns that put your restaurant at the top of search results. Both are important: your GBP builds long-term organic visibility, while Google Ads drive immediate traffic. We recommend optimizing both.",
      },
    ],
    keywords: [
      "Google Business Profile optimization",
      "Google Business Profile for restaurants",
      "GBP optimization restaurant",
      "Google Maps restaurant listing",
      "restaurant Google profile",
    ],
    metaDescription:
      "Google Business Profile optimization for restaurants. Dominate local search, Google Maps, and nearby searches. Profile setup, review management, and local pack ranking strategies.",
  },

  "commission-free-deliveries": {
    title: "Commission-Free Deliveries for Restaurants",
    slug: "commission-free-deliveries",
    category: "Online Ordering",
    headline: "Commission-Free Deliveries for Restaurants",
    description:
      "Stop losing 15-30% of every order to DoorDash and UberEats. We set up commission-free direct ordering through Owner.com and ChowNow so your restaurant keeps more profit from every delivery and takeout order.",
    heroImage: {
      src: "/images/usage/order-counter.jpg",
      alt: "Restaurant worker preparing food orders at the counter for delivery",
    },
    features: [
      {
        title: "Direct Ordering Setup",
        description:
          "We integrate commission-free ordering platforms like Owner.com and ChowNow directly into your restaurant's website. Customers order from you, not a third-party app, and you keep the revenue.",
      },
      {
        title: "Third-Party Fee Elimination",
        description:
          "DoorDash and UberEats take 15-30% of every order, with hidden fees that can push costs above 40%. We transition your delivery and takeout orders to platforms that charge flat monthly rates instead of per-order commissions.",
      },
      {
        title: "Branded Ordering Experience",
        description:
          "Your customers order through your own branded website and mobile app, not a marketplace where you compete with every other restaurant. You control the experience, the branding, and the customer relationship.",
      },
      {
        title: "Automated Marketing & Loyalty",
        description:
          "Commission-free platforms include built-in tools for email marketing, loyalty programs, and AI-powered upselling. Turn first-time delivery customers into repeat direct orders without lifting a finger.",
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
        value: 970,
        suffix: "",
        decimalPlaces: 0,
        label: "in Owner.com setup fees waived when you work with TableTurnerr",
        source: "Owner.com",
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
        question: "What's the difference between Owner.com and ChowNow?",
        answer:
          "Owner.com is the premium option at $500/month flat plus a small 5% fee paid by the guest, with an all-in-one platform including website, mobile app, and automated marketing. ChowNow starts at $119/month with tiered pricing and transaction fees. Both eliminate commission-based delivery fees. We help you choose the right fit based on your budget and goals.",
      },
      {
        question: "How long does it take to set up commission-free ordering?",
        answer:
          "Most restaurants are fully transitioned within 2-4 weeks. This includes platform setup, menu migration, website integration, and staff training. We handle the technical work so your team can focus on running the restaurant.",
      },
      {
        question: "Do I need a new website to use commission-free ordering?",
        answer:
          "No. Commission-free ordering platforms can be integrated into your existing website. If your current site needs updates to support direct ordering, we handle that as part of the setup. If you don't have a website yet, we build one as part of our restaurant website design service.",
      },
    ],
    keywords: [
      "commission free delivery for restaurants",
      "commission free online ordering",
      "reduce DoorDash commission fees",
      "restaurant direct ordering",
      "commission free restaurant ordering system",
    ],
    metaDescription:
      "Commission-free delivery and online ordering for restaurants. Stop paying 15-30% to DoorDash and UberEats. We set up direct ordering through Owner.com and ChowNow so you keep more profit.",
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
