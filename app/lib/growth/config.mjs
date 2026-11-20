// Site-wide settings. Fill in the TODO values before publishing.
export const site = {
  name: 'TableTurnerr',
  origin: 'https://www.tableturnerr.com',
  email: 'contact@tableturnerr.com',

  // Main business line (confirmed by the owner 2026-11-20).
  phoneE164: '+13323331008',
  phoneDisplay: '(332) 333-1008',

  // Booking calendar (GoHighLevel widget, same one the old /signup page used).
  bookingUrl: "https://portalapi.tableturnerr.com/widget/bookings/tableturnerr",

  // Audit form: your GoHighLevel form, embedded on /free-google-maps-audit. Submissions land in your CRM.
  // Set to "" to fall back to the built-in form that opens a pre-filled email.
  auditFormEmbed: "https://portalapi.tableturnerr.com/widget/form/ipvrLi2tZqQelOTXlmfp",

  // Client portal (the "Sign in" link on the old site).
  clientLoginUrl: "https://portal.tableturnerr.com/",

  // Trustpilot business page (verified 2026-11-20).
  trustpilotUrl: "https://www.trustpilot.com/review/tableturnerr.com",

  // Other places TableTurnerr exists online. Paste full URLs as you set them up. These go into the
  // Organization schema as sameAs, which helps Google and AI assistants connect the brand across sites.
  profiles: {
    // No Google Business Profile yet (2026-11-20). Add the URL here once one exists.
    googleBusinessProfile: "",
    // Found via Bing 2026-11-16. Update the LinkedIn "About" text: it still says "helps restaurants".
    linkedin: "https://www.linkedin.com/company/tableturnerr",
    // TODO: facebook.com/tableturnerr showed "This content isn't available" when logged out on 2026-11-20.
    // Paste the public Page URL once it's visible to everyone.
    facebook: "",
    youtube: "https://www.youtube.com/@TableTurnerr",
    instagram: "https://www.instagram.com/tableturnerr",
  },

  // IndexNow key (Bing, Yandex and others; Bing feeds ChatGPT search and Copilot). The build publishes
  // /<key>.txt; run `node indexnow.mjs` after each deploy to tell them which pages changed.
  indexNowKey: "957102cb81f38a2c15316c5a9a94d5be",

  // States where you already have clients. Used in copy as plain fact, no client names.
  clientStates: ['Washington', 'Oregon', 'California', 'Utah', 'New Mexico', 'Hawaii'],

  // Owners shown on /about (E-E-A-T: who is giving this advice?). The "Who you'll work with" cards only appear
  // once EVERY owner has a real name and a bio, so no placeholder ever shows on the live site.
  // TODO (owner): fill in the first co-owner's name, both bios (2-3 sentences in your own words: background,
  // why you started TableTurnerr, what you handle for clients), and headshot paths under /public/images/team/.
  owners: [
    { name: 'TODO: your name', role: 'Co-owner', photo: '', bio: '' },
    { name: 'Hashaam', role: 'Co-owner', photo: '', bio: '' },
  ],
};
