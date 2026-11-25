// Site architecture: topic clusters, consolidated URLs and page images.
// Every guide belongs to at least one topic. Each topic has a pillar (a service page) that the guides link up to,
// and the pillar links back down to its guides. Trade pages link to the guides most useful to that trade.

export const SITE_UPDATED = '2026-11-24';

export const topics = {
  maps: { name: 'Google Maps & Business Profile', pillar: '/services/google-business-profile',
    intro: 'How the map pack works, what moves your ranking, and how to keep your profile safe.' },
  reviews: { name: 'Google reviews', pillar: '/services/review-generation',
    intro: 'How many reviews you need, how to get them from the software you already use, and what breaks Google\'s rules.' },
  crm: { name: 'CRM, invoicing & follow-up', pillar: '/services/crm-automation',
    intro: 'How to choose a CRM or invoicing software, keep track of customers, and follow up so estimates and calls don\'t go cold.' },
  seo: { name: 'Local SEO, AI search, websites & ads', pillar: '/services/local-seo',
    intro: 'What local SEO costs, how to show up in AI answers, what to do yourself, and where paid ads fit.' },
  trades: { name: 'Marketing ideas by trade', pillar: '/marketing',
    intro: 'Practical plans written for one trade at a time.' },
};

// guide slug -> topics (first one is the primary topic)
export const guideTopics = {
  'how-to-rank-higher-on-google-maps': ['maps', 'seo'],
  'how-many-google-reviews-to-rank': ['reviews', 'maps'],
  'google-business-profile-suspended': ['maps'],
  'local-services-ads-vs-google-ads': ['seo', 'maps'],
  'jobber-google-reviews': ['reviews'],
  'housecall-pro-google-reviews': ['reviews'],
  'servicetitan-review-requests': ['reviews'],
  'workiz-google-reviews': ['reviews'],
  'best-review-software-for-contractors': ['reviews'],
  'electrician-review-management': ['reviews', 'trades'],
  'contractor-seo-cost': ['seo'],
  'how-to-get-recommended-by-chatgpt': ['seo', 'maps'],
  'how-to-get-more-google-reviews': ['reviews', 'maps'],
  'ask-past-customers-for-google-reviews': ['reviews'],
  'google-reviews-not-showing-up': ['reviews', 'maps'],
  'google-review-qr-code-and-nfc-cards': ['reviews'],
  'best-crm-for-home-service-business': ['crm'],
  'best-crm-for-plumbers': ['crm', 'trades'],
  'how-to-keep-track-of-customers': ['crm'],
  'jobber-vs-housecall-pro': ['crm'],
  'best-invoicing-software-for-contractors': ['crm'],
  'how-to-follow-up-on-an-estimate': ['crm'],
  'ai-receptionist-for-contractors': ['crm'],
  'how-to-get-more-plumbing-customers': ['trades', 'maps'],
  'handyman-marketing-ideas': ['trades'],
  'fence-company-marketing-guide': ['trades'],
};

// service slug -> topic its guides come from
export const serviceTopics = {
  'google-business-profile': 'maps', 'review-generation': 'reviews', 'local-seo': 'seo', 'ai-search-optimization': 'seo',
  'contractor-websites': 'seo', 'missed-call-text-back': 'crm', 'crm-automation': 'crm',
};

// trade slug -> guide slugs to feature on that trade page (most relevant first)
export const tradeGuides = {
  handyman: ['handyman-marketing-ideas', 'how-to-keep-track-of-customers', 'how-to-rank-higher-on-google-maps'],
  'fence-companies': ['fence-company-marketing-guide', 'how-to-rank-higher-on-google-maps', 'how-many-google-reviews-to-rank'],
  hvac: ['ask-past-customers-for-google-reviews', 'ai-receptionist-for-contractors', 'local-services-ads-vs-google-ads'],
  plumbing: ['how-to-get-more-plumbing-customers', 'best-crm-for-plumbers', 'ask-past-customers-for-google-reviews'],
  'garage-door-repair': ['local-services-ads-vs-google-ads', 'google-business-profile-suspended', 'how-to-rank-higher-on-google-maps'],
  roofing: ['ask-past-customers-for-google-reviews', 'how-to-follow-up-on-an-estimate', 'how-to-rank-higher-on-google-maps'],
  'pest-control': ['local-services-ads-vs-google-ads', 'how-many-google-reviews-to-rank', 'workiz-google-reviews'],
  electricians: ['electrician-review-management', 'local-services-ads-vs-google-ads', 'how-many-google-reviews-to-rank'],
  'deck-builders': ['fence-company-marketing-guide', 'contractor-seo-cost', 'how-to-rank-higher-on-google-maps'],
};
export const defaultTradeGuides = ['how-to-rank-higher-on-google-maps', 'ask-past-customers-for-google-reviews', 'best-crm-for-home-service-business'];

// Old pages that compete with a new page for the same search. 301 them so signals consolidate on one URL.
// Internal links in the kept old pages are rewritten to the new URL too, so nothing links through a redirect.
export const consolidate = {
  '/industries': '/marketing',
  '/industries/handyman': '/marketing/handyman',
  '/industries/hvac': '/marketing/hvac',
  '/industries/plumbing': '/marketing/plumbing',
  '/industries/roofing': '/marketing/roofing',
  '/industries/landscaping': '/marketing/landscaping',
  '/industries/lawn-care': '/marketing/landscaping',
  '/industries/painting': '/marketing/painting',
  '/industries/pest-control': '/marketing/pest-control',
  '/industries/pressure-washing': '/marketing/pressure-washing',
  '/industries/garage-door-repair': '/marketing/garage-door-repair',
  '/industries/cleaning': '/marketing/cleaning-services',
  '/industries/electrical': '/marketing/electricians',
};

// Old industry pages we keep (no new page for them yet). Listed on /marketing so they aren't orphaned.
export const otherTrades = [
  ['/industries/appliance-repair', 'Appliance repair'],
  ['/industries/junk-removal', 'Junk removal'],
  ['/industries/pool-service', 'Pool service'],
  ['/industries/window-cleaning', 'Window cleaning'],
  ['/industries/property-maintenance', 'Property maintenance'],
];

// Real photos. Replace these with your clients' job photos (with permission) whenever you can:
// original photos beat stock for both Google Images and trust.
export const tradeImages = {
  roofing: { src: '/images/trades/roofing-review-automation.webp', width: 1280, height: 853,
    alt: 'Asphalt shingle roof mid-installation with a roofing nail gun, a stack of shingles and a tape measure' },
  hvac: { src: '/images/trades/hvac-review-automation.webp', width: 1536, height: 1024,
    alt: 'Outdoor AC condenser beside a house with refrigerant gauges and hoses attached for a service check' },
  plumbing: { src: '/images/trades/plumbing-review-automation.webp', width: 1536, height: 1024,
    alt: 'Chrome P-trap and copper supply lines under a kitchen sink, with pipe wrenches and thread tape' },
};

// Links on old pages that should skip a redirect (in addition to `consolidate`).
export const linkRewrites = { '/pricing': '/free-google-maps-audit' };

// Title / description fixes for kept old pages (too long, so Google would cut or rewrite them).
// Titles <= 60 characters, descriptions 120-155. Keep them true to what the page says.
export const oldMeta = {
  // Search Console Aug-Nov 2026: these rank (GatherUp avg. position 8.5, PulseM 7.3, Birdeye 13) but got 0 clicks.
  // Searchers type the plural ("gatherup alternatives", "podium alternatives") and compare options, so say so.
  '/alternatives/gatherup-alternative': ['GatherUp Alternatives for Contractors (2026) | TableTurnerr', null],
  '/alternatives/podium-alternative': ['Podium Alternatives for Contractors (2026) | TableTurnerr', null],
  '/alternatives/nicejob-alternative': ['NiceJob Alternatives for Contractors (2026) | TableTurnerr', null],
  '/alternatives/birdeye-alternative': ['Birdeye Alternatives for Contractors (2026) | TableTurnerr', null],
  '/alternatives/pulsem-alternative': ['PulseM Alternatives for Contractors (2026) | TableTurnerr', null],
  '/alternatives': ['Podium, Birdeye & NiceJob Alternatives | TableTurnerr', null],
  '/features': ['Review Automation & Field Service Features | TableTurnerr', 'Review requests, map-pack tracking, review widgets, dispatch, work orders and invoicing for home-service businesses, in one place.'],
  '/features/crm-contact-import-and-lead-management': ['CRM Setup & Lead Management for Contractors | TableTurnerr', null],
  '/features/dispatch-scheduling-and-routes': ['Dispatch, Scheduling & Route Planning | TableTurnerr', null],
  '/features/work-orders-and-job-photos': ['Mobile Work Orders & Job Photos | TableTurnerr', null],
  '/features/time-tracking-and-invoicing': [null, 'Track field time and turn completed jobs into invoices with FieldTask for HighLevel, so office and crew work from the same job record.'],
  '/industries/appliance-repair': ['Appliance Repair Reviews & Google Visibility | TableTurnerr', 'Get more Google reviews for your appliance repair business: automatic requests after every job, better local visibility, and proof for the next customer.'],
  '/industries/electrical': ['Electrician Reviews & Google Visibility | TableTurnerr', 'Get more Google reviews for your electrical business: automatic requests after every job, better local visibility, and proof for the next customer.'],
  '/industries/junk-removal': ['Junk Removal Reviews & Google Visibility | TableTurnerr', 'Get more Google reviews for your junk removal business: automatic requests after every pickup, better local visibility, and proof for the next customer.'],
  '/industries/pool-service': ['Pool Service Reviews & Google Visibility | TableTurnerr', 'Get more Google reviews for your pool service business: automatic requests after every visit, better local visibility, and proof for the next customer.'],
  '/industries/property-maintenance': ['Property Maintenance Reviews & Visibility | TableTurnerr', 'Get more Google reviews for your property maintenance business: automatic requests after every job, better local visibility, and proof for new clients.'],
  '/industries/window-cleaning': ['Window Cleaning Reviews & Google Visibility | TableTurnerr', 'Get more Google reviews for your window cleaning business: automatic requests after every job, better local visibility, and proof for the next customer.'],
  '/privacy': [null, 'How TableTurnerr collects, uses and protects your information, including SMS and text messaging data.'],
  '/contact': ['Contact TableTurnerr | Talk to an Owner', 'Talk to a TableTurnerr owner about Google reviews, your Google Business Profile, local SEO or missed-call text-back for your home-service business.'],
};
