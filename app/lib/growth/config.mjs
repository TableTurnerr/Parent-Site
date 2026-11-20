// Site-wide settings. Fill in the TODO values before publishing.
export const site = {
  name: 'TableTurnerr',
  origin: 'https://www.tableturnerr.com',
  email: 'contact@tableturnerr.com',

  // TODO: your 332 business line in E.164 and display form, e.g. '+13325550123' / '(332) 555-0123'.
  // While empty, pages show "Book a 15-minute call" instead.
  phoneE164: '',
  phoneDisplay: '',

  // Booking calendar (GoHighLevel widget, same one the old /signup page used).
  bookingUrl: "https://portalapi.tableturnerr.com/widget/bookings/tableturnerr",

  // Audit form: your GoHighLevel form, embedded on /free-google-maps-audit. Submissions land in your CRM.
  // Set to "" to fall back to the built-in form that opens a pre-filled email.
  auditFormEmbed: "https://portalapi.tableturnerr.com/widget/form/ipvrLi2tZqQelOTXlmfp",

  // Client portal (the "Sign in" link on the old site).
  clientLoginUrl: "https://portal.tableturnerr.com/",

  // TODO: your Trustpilot review page URL (open your Trustpilot business page and copy the address).
  // While empty, no Trustpilot link is shown.
  trustpilotUrl: "",

  // Other places TableTurnerr exists online. Paste full URLs as you set them up. These go into the
  // Organization schema as sameAs, which helps Google and AI assistants connect the brand across sites.
  profiles: {
    googleBusinessProfile: "",
    // Found via Bing 2026-11-16. Update the LinkedIn "About" text: it still says "helps restaurants".
    linkedin: "https://www.linkedin.com/company/tableturnerr",
    facebook: "",
    youtube: "https://www.youtube.com/@TableTurnerr",
    instagram: "https://www.instagram.com/tableturnerr",
  },

  // IndexNow key (Bing, Yandex and others; Bing feeds ChatGPT search and Copilot). The build publishes
  // /<key>.txt; run `node indexnow.mjs` after each deploy to tell them which pages changed.
  indexNowKey: "957102cb81f38a2c15316c5a9a94d5be",

  // States where you already have clients. Used in copy as plain fact, no client names.
  clientStates: ['Washington', 'Oregon', 'California', 'Utah', 'New Mexico', 'Hawaii'],

  // Owners shown on About / homepage. Add photo paths once you have headshots.
  owners: [
    { name: 'TODO: your name', role: 'Co-owner', photo: '' },
    { name: 'Hashaam', role: 'Co-owner', photo: '' },
  ],
};
