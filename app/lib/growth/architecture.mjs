// Site architecture: topic clusters, consolidated URLs and page images.
// Every guide belongs to at least one topic. Each topic has a pillar (a service page) that the guides link up to,
// and the pillar links back down to its guides. Trade pages link to the guides most useful to that trade.

export const SITE_UPDATED = '2026-11-28';

export const topics = {
  maps: { name: 'Google Maps & Business Profile', pillar: '/services/google-business-profile',
    intro: 'How the map pack works, what moves your ranking, and how to keep your profile safe.' },
  reviews: { name: 'Google reviews', pillar: '/services/review-generation',
    intro: 'How many reviews you need, how to get them from the software you already use, and what breaks Google\'s rules.' },
  crm: { name: 'CRM, invoicing & follow-up', pillar: '/services/crm-automation',
    intro: 'How to choose a CRM or invoicing software, keep track of customers, and follow up so estimates and calls don\'t go cold.' },
  calls: { name: 'Calls & texting', pillar: '/services/missed-call-text-back',
    intro: 'Answer more calls, text customers the right way, and choose between text-back, AI and an answering service, with real prices.' },
  booking: { name: 'Booking & getting paid', pillar: '/services/online-booking',
    intro: 'Online booking, deposits, text-to-pay and maintenance plans, without wrecking your schedule.' },
  repeat: { name: 'Repeat work & referrals', pillar: '/services/email-sms-campaigns',
    intro: 'Bring past customers back, get referred, and know what to send each season.' },
  seo: { name: 'Local SEO, AI search, websites & ads', pillar: '/services/local-seo',
    intro: 'What local SEO costs, how to show up in AI answers, what to do yourself, and where paid ads fit.' },
  trades: { name: 'Marketing ideas by trade', pillar: '/marketing',
    intro: 'Practical plans written for one trade at a time.' },
};

// guide slug -> topics (first one is the primary topic)
export const guideTopics = {
  'how-to-verify-google-business-profile': ['maps'],
  'google-business-profile-video-verification': ['maps'],
  'google-business-profile-verification-problems': ['maps'],
  'how-to-claim-google-business-profile': ['maps'],
  'google-business-profile-optimization': ['maps', 'seo'],
  'google-business-profile-categories': ['maps'],
  'google-business-profile-photos-and-posts': ['maps'],
  'google-business-profile-mistakes': ['maps'],
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
  'ai-receptionist-for-contractors': ['calls', 'crm'],
  'gohighlevel-for-contractors': ['crm'],
  'gohighlevel-vs-jobber': ['crm'],
  'gohighlevel-vs-housecall-pro': ['crm'],
  'crm-vs-field-service-software': ['crm'],
  'missed-call-text-back-vs-ai-receptionist': ['calls', 'crm'],
  'online-booking-for-home-services': ['booking', 'crm'],
  'book-online-button-on-google': ['booking', 'maps'],
  'text-to-pay-for-contractors': ['booking', 'crm'],
  'contractor-deposits': ['booking'],
  'how-to-sell-maintenance-plans': ['booking', 'repeat'],
  'a2p-10dlc-for-contractors': ['calls', 'crm'],
  'is-review-gating-allowed': ['reviews'],
  'google-business-profile-service-area': ['maps'],
  'angi-vs-thumbtack-vs-local-services-ads': ['seo'],
  'win-back-past-customers': ['repeat', 'crm'],
  'home-service-marketing-calendar': ['repeat', 'trades'],
  'contractor-referral-program': ['repeat'],
  'how-to-get-more-hvac-customers': ['trades', 'maps'],
  'how-to-get-more-roofing-customers': ['trades', 'maps'],
  'how-to-get-more-plumbing-customers': ['trades', 'maps'],
  'handyman-marketing-ideas': ['trades'],
  'fence-company-marketing-guide': ['trades'],
  'ai-receptionist-cost': ['calls', 'booking'],
  'missed-call-text-back-cost': ['calls'],
  'best-ai-receptionist-for-contractors': ['calls', 'booking', 'crm'],
  'answering-service-cost': ['calls'],
  'google-business-profile-management-cost': ['maps', 'reviews', 'seo'],
  'contractor-website-cost': ['seo', 'maps'],
  // Added 2026-11-27 (content expansion).
  'best-review-management-software-for-contractors': ['reviews'],
  'review-software-by-trade': ['reviews', 'trades'],
  'how-to-respond-to-negative-google-reviews': ['reviews'],
  'how-to-remove-fake-google-reviews': ['reviews'],
  'ftc-fake-review-rule-contractors': ['reviews'],
  'google-business-profile-suspended-service-area': ['maps'],
  'rank-google-maps-without-storefront': ['maps', 'seo'],
  'google-ask-maps-ai-mode-local-business': ['seo', 'maps'],
  'servicetitan-vs-housecall-pro-vs-jobber': ['crm'],
  'speed-to-lead-home-services': ['calls', 'crm'],
  'hvac-csr-phone-script': ['calls', 'trades'],
  'flat-rate-vs-hourly-pricing': ['booking', 'trades'],
  'hvac-slow-season-marketing': ['repeat', 'trades'],
  'how-to-track-lead-sources': ['seo', 'crm'],
  'how-much-should-contractors-spend-on-marketing': ['seo'],
  'home-service-marketing-agency-cost': ['seo'],
  'best-aeo-services-for-contractors': ['seo'],
  'home-service-marketing-companies-compared': ['seo'],
  'how-to-leave-your-marketing-agency': ['seo'],
  'do-it-yourself-local-marketing-for-contractors': ['seo', 'maps'],
  'angi-vs-thumbtack-vs-homeadvisor': ['seo'],
  'exclusive-vs-shared-leads': ['seo'],
  'facebook-and-nextdoor-ads-for-contractors': ['seo', 'repeat'],
  'google-local-services-ads-cost-per-lead': ['seo', 'maps'],
  'garage-door-answering-service-cost': ['calls', 'trades'],
  'pest-control-answering-service-cost': ['calls', 'trades'],
  'landscaping-answering-service-cost': ['calls', 'trades'],
  'cleaning-business-answering-service-cost': ['calls', 'trades'],
  'hvac-answering-service-cost': ['calls', 'trades'],
  'plumbing-answering-service-cost': ['calls', 'trades'],
  'electrician-answering-service-cost': ['calls', 'trades'],
  'roofing-answering-service-cost': ['calls', 'trades'],
  'handyman-answering-service-cost': ['calls', 'trades'],
  'pest-control-website-cost': ['seo', 'trades'],
  'garage-door-website-cost': ['seo', 'trades'],
  'painting-contractor-website-cost': ['seo', 'trades'],
  'cleaning-business-website-cost': ['seo', 'trades'],
  'tree-service-website-cost': ['seo', 'trades'],
  'remodeling-contractor-website-cost': ['seo', 'trades'],
  'how-much-does-a-website-cost': ['seo'],
  'ai-website-builder-vs-freelancer-vs-agency': ['seo'],
  'website-maintenance-cost': ['seo'],
  'why-your-website-isnt-getting-leads': ['seo', 'crm'],
  'handyman-website-cost': ['seo', 'trades'],
  'plumber-website-cost': ['seo', 'trades'],
  'hvac-website-cost': ['seo', 'trades'],
  'electrician-website-cost': ['seo', 'trades'],
  'roofing-website-cost': ['seo', 'trades'],
  'landscaping-website-cost': ['seo', 'trades'],
  // Added 2026-11-27 (daily growth task).
  'why-isnt-my-phone-ringing': ['calls', 'maps'],
};

// service slug -> topic its guides come from
export const serviceTopics = {
  'google-business-profile': 'maps', 'review-generation': 'reviews', 'local-seo': 'seo', 'ai-search-optimization': 'seo',
  'contractor-websites': 'seo', 'missed-call-text-back': 'calls', 'ai-answering-service': 'calls', 'crm-automation': 'crm',
  'online-booking': 'booking', 'estimates-invoices-payments': 'booking', 'maintenance-plans': 'booking',
  'email-sms-campaigns': 'repeat', 'unified-inbox': 'calls', 'call-tracking': 'calls', 'social-media-posting': 'maps',
};

// trade slug -> guide slugs to feature on that trade page (most relevant first)
export const tradeGuides = {
  handyman: ['handyman-marketing-ideas', 'how-to-keep-track-of-customers', 'how-to-rank-higher-on-google-maps', 'missed-call-text-back-cost', 'handyman-website-cost', 'handyman-answering-service-cost'],
  'fence-companies': ['fence-company-marketing-guide', 'how-to-rank-higher-on-google-maps', 'how-many-google-reviews-to-rank'],
  hvac: ['how-to-get-more-hvac-customers', 'why-isnt-my-phone-ringing', 'how-to-verify-google-business-profile', 'hvac-slow-season-marketing', 'hvac-csr-phone-script', 'how-to-sell-maintenance-plans', 'ask-past-customers-for-google-reviews', 'ai-receptionist-cost', 'hvac-website-cost', 'hvac-answering-service-cost'],
  plumbing: ['how-to-get-more-plumbing-customers', 'why-isnt-my-phone-ringing', 'flat-rate-vs-hourly-pricing', 'best-crm-for-plumbers', 'ask-past-customers-for-google-reviews', 'ai-receptionist-cost', 'plumber-website-cost', 'plumbing-answering-service-cost'],
  'garage-door-repair': ['local-services-ads-vs-google-ads', 'google-business-profile-suspended', 'how-to-rank-higher-on-google-maps', 'best-ai-receptionist-for-contractors', 'garage-door-website-cost', 'garage-door-answering-service-cost'],
  roofing: ['how-to-get-more-roofing-customers', 'why-isnt-my-phone-ringing', 'ask-past-customers-for-google-reviews', 'how-to-follow-up-on-an-estimate', 'contractor-website-cost', 'roofing-website-cost', 'roofing-answering-service-cost'],
  'pest-control': ['local-services-ads-vs-google-ads', 'how-many-google-reviews-to-rank', 'workiz-google-reviews', 'answering-service-cost', 'pest-control-website-cost', 'pest-control-answering-service-cost'],
  electricians: ['electrician-review-management', 'why-isnt-my-phone-ringing', 'local-services-ads-vs-google-ads', 'how-many-google-reviews-to-rank', 'ai-receptionist-cost', 'electrician-website-cost', 'electrician-answering-service-cost'],
  'deck-builders': ['fence-company-marketing-guide', 'contractor-seo-cost', 'how-to-rank-higher-on-google-maps'],
  landscaping: ['how-to-rank-higher-on-google-maps', 'landscaping-website-cost', 'landscaping-answering-service-cost', 'ask-past-customers-for-google-reviews'],
  painting: ['how-to-rank-higher-on-google-maps', 'painting-contractor-website-cost', 'ask-past-customers-for-google-reviews'],
  'cleaning-services': ['how-to-rank-higher-on-google-maps', 'cleaning-business-website-cost', 'cleaning-business-answering-service-cost', 'ask-past-customers-for-google-reviews'],
  'tree-service': ['how-to-rank-higher-on-google-maps', 'tree-service-website-cost', 'ask-past-customers-for-google-reviews'],
  remodeling: ['how-to-rank-higher-on-google-maps', 'remodeling-contractor-website-cost', 'ask-past-customers-for-google-reviews'],
};
export const defaultTradeGuides = ['how-to-rank-higher-on-google-maps', 'google-business-profile-optimization', 'ask-past-customers-for-google-reviews', 'best-crm-for-home-service-business'];

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
  '/features': ['Review Automation & Field Service Features | TableTurnerr', 'Google review requests and replies, review widgets, dispatch, work orders and invoicing for home-service businesses, in one place.'],
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
