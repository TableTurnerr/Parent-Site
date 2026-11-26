// Everything we can set up for a client (/services/everything-we-set-up). Checked against HighLevel's help center on
// 2026-11-24/25. Leave out betas (Field Services, loyalty, RCS). [name, what it does, example, "good to know", link]
export type Capability = [name: string, what: string, example: string, note: string, href?: string];

export interface CapabilityGroup { id: string; title: string; intro: string; items: Capability[] }

export const CAPABILITIES: CapabilityGroup[] = [
  {
    id: "get-found", title: "Get found", intro: "So people searching for your trade see you first.",
    items: [
      ["Google Business Profile", "Profile set up, posts, photos, services and hours kept current", "A drain-cleaning post with this week's job photo", "Needs manager access to your profile", "/services/google-business-profile"],
      ["Local SEO", "Pages for each service and town you really serve", "\"Water heater replacement in Keizer\"", "New pages usually take months to rank", "/services/local-seo"],
      ["AI search (AEO)", "Answer-first pages and consistent facts that assistants can read", "ChatGPT can find your hours, towns and services", "Nobody can promise a mention", "/services/ai-search-optimization"],
      ["Website or landing pages", "Fast, phone-first pages on your own domain", "A one-page site for storm season", "You own the domain and the content", "/services/contractor-websites"],
      ["Social posting", "Job photos and reviews posted on a schedule", "Before and after on Facebook, Instagram and Google", "Needs access to your pages", "/services/social-media-posting"],
    ],
  },
  {
    id: "get-chosen", title: "Get chosen", intro: "So they pick you over the next two names.",
    items: [
      ["Review requests", "A request after every job, by text or email, to every customer", "Sent when a job is marked done", "No filtering and no rewards: Google doesn't allow either", "/services/review-generation"],
      ["Review replies", "Replies written for you, good and bad", "A calm answer to a late-arrival complaint", "You can approve them first", "/tools/review-response-templates"],
      ["Review cards and QR codes", "A tap or scan opens your Google review page", "On the invoice, the truck or a card", "Ask everyone the same way", "/guides/google-review-qr-code-and-nfc-cards"],
      ["Reviews on your website", "New reviews shown on your pages and shared", "Newest five on your home page", "", "/features/review-widgets-and-social-posts"],
      ["Review monitoring", "New reviews from many sites in one place", "Google, Facebook, Yelp, Angi and more", "Replying from one place isn't possible on every site", "/features/multi-platform-reviews"],
    ],
  },
  {
    id: "answer", title: "Answer every lead", intro: "So a missed call isn't a missed job.",
    items: [
      ["Missed-call text-back", "A text to the caller within seconds", "\"Sorry we missed you, what do you need?\"", "Texting numbers must be registered (A2P 10DLC)", "/services/missed-call-text-back"],
      ["AI phone receptionist", "Answers, takes details, books or transfers", "After hours and while you're on a roof", "We set what it may say and when it hands over", "/guides/ai-receptionist-for-contractors"],
      ["AI chat assistant", "Answers common questions by text and web chat", "\"Do you cover my town?\"", "Can be wrong, so a person reviews it", "/services/unified-inbox"],
      ["One inbox", "Calls, texts, email, web chat, Facebook and Instagram together", "The whole conversation in one thread", "Google switched off profile chat in 2024", "/services/unified-inbox"],
      ["Call tracking", "Which source made the phone ring", "Google profile or yard sign?", "Recording needs consent in some states", "/services/call-tracking"],
      ["Quote-request forms", "Short forms with photos and rules", "Asks about the roof only if they pick roofing", "", "/services/contractor-websites"],
    ],
  },
  {
    id: "book", title: "Book the work", intro: "So the calendar fills without phone tag.",
    items: [
      ["Online booking page", "Customers pick from your real openings", "Estimate visits, tune-ups, cleanings", "Doesn't plan routes or drive time", "/services/online-booking"],
      ["Shared calendars", "Visits shared across a team, or two people at once", "Estimator and owner both free", "", "/services/online-booking"],
      ["Reminders", "Confirmation, day-before and follow-up messages", "Fewer forgotten visits", "", "/services/online-booking"],
      ["Reschedule links", "Customers move a visit themselves, up to your cut-off", "Not after 6 p.m. the day before", "", "/services/online-booking"],
      ["Booking link on Google", "Your booking page linked from your profile", "Book without calling", "Google decides where it shows", "/guides/book-online-button-on-google"],
      ["Deposits at booking", "A flat amount or a percentage", "$75 to hold a Saturday slot", "Some states limit deposits", "/guides/contractor-deposits"],
    ],
  },
  {
    id: "paid", title: "Win it and get paid", intro: "So estimates get answers and invoices get paid.",
    items: [
      ["Lead board", "Every lead from new to won on one screen", "Nothing sits in \"quoted\" for a month", "", "/services/crm-automation"],
      ["Estimates", "Sent by text or email, approved on a phone", "Accepted estimate becomes an invoice", "No flat-rate price book built in", "/services/estimates-invoices-payments"],
      ["E-signatures", "Contracts and change orders signed on a phone", "Signed before you order materials", "Have a lawyer check your contract", "/services/estimates-invoices-payments"],
      ["Invoices and text-to-pay", "A pay link in a text", "Paid from the driveway", "Your own payment account, normal card fees", "/services/estimates-invoices-payments"],
      ["Tap to Pay", "Take a card on your phone", "No card reader in the truck", "Needs a supported phone and Stripe or Square", "/guides/text-to-pay-for-contractors"],
      ["Payment schedules", "Deposit, progress and final payments", "A fence in three payments", "You carry the risk if someone stops paying", "/services/estimates-invoices-payments"],
      ["Pay-later options", "Affirm, Klarna or Afterpay on one-time invoices, through Stripe", "Customer spreads a water heater", "The provider approves the customer", "/guides/text-to-pay-for-contractors"],
      ["Maintenance plans", "Sign-up page, automatic billing and reminders", "Two tune-ups a year, billed monthly", "Follow your state's renewal rules", "/services/maintenance-plans"],
    ],
  },
  {
    id: "again", title: "Get hired again", intro: "So past customers come back and send friends.",
    items: [
      ["Follow-up automation", "Messages that stop when the customer replies", "Day 2, 7 and 14 after an estimate", "", "/guides/how-to-follow-up-on-an-estimate"],
      ["Email and text campaigns", "Seasonal reminders and offers", "Furnace check in September", "Permission and opt-outs required", "/services/email-sms-campaigns"],
      ["Win-back messages", "A check-in to customers you haven't heard from", "\"It's been a year since your gutters\"", "Only people you may contact", "/guides/win-back-past-customers"],
      ["Referral tracking", "Who sent whom, and a thank-you", "A neighbor's name on the form", "Never tie a reward to a review", "/guides/contractor-referral-program"],
      ["Coupons and gift cards", "Codes and gift cards sold from your site", "A gift cleaning for a new parent", "State gift-card rules apply"],
    ],
  },
  {
    id: "run", title: "Run the office", intro: "The parts customers don't see.",
    items: [
      ["Customer list", "Your contacts imported, cleaned and searchable", "Jobs, dates and equipment for each customer", "Imported from a CSV file", "/features/crm-contact-import-and-lead-management"],
      ["Mobile app", "Calls, texts, calendar and leads on your phone", "Reply from the truck", ""],
      ["Customer portal", "Where customers see estimates, invoices and plans", "\"Send me that invoice again\"", "", "/services/estimates-invoices-payments"],
      ["Hiring pages", "Short application and fast replies", "Applicants on one board", "", "/services/hiring-pages"],
      ["Team training", "Short videos and checklists in one link", "How we greet a customer", ""],
      ["Reports", "Calls, leads, bookings, reviews and sources", "One page a month", "Attribution is never perfect", "/services/call-tracking"],
      ["Connections", "Job software, QuickBooks, and others through Zapier", "Finished job starts a review request", "What syncs differs by tool, so we check yours", "/integrations"],
      ["Roles and permissions", "Who can see what", "Techs see their own leads", ""],
    ],
  },
];

/** What we don't replace. Said plainly so nobody buys the wrong thing. */
export const NOT_FOR: [string, string][] = [
  ["Dispatch boards and route planning", "Keep Jobber, Housecall Pro, ServiceTitan or Workiz for running jobs. We add leads, follow-up, reviews and campaigns around them. Dispatch inside our CRM needs FieldTask, a separate add-on."],
  ["Job costing, payroll and truck stock", "That's field-service or accounting software."],
  ["Bookkeeping", "QuickBooks, or whatever your accountant uses."],
  ["Paid ads", "Google Ads and Local Services Ads management on the Partner package, with ad spend billed separately. Everything else here works without an ad budget."],
];
