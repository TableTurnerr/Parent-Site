// /glossary: the words owners meet when they buy marketing or software. Each answer stands on its own.
// [term, plain answer, optional link to the page that goes deeper]
export type Term = [term: string, definition: string, href?: string, hrefLabel?: string];

export const GLOSSARY: { group: string; terms: Term[] }[] = [
  {
    group: "Getting found on Google",
    terms: [
      ["Map pack", "The box with a map and, usually, three businesses that Google shows for local searches such as \"plumber near me\". Where you appear depends on how relevant your profile is, how far the searcher is from you and how well known you are.", "/guides/how-to-rank-higher-on-google-maps", "Rank higher on Google Maps"],
      ["Google Business Profile (GBP)", "Your free listing on Google Search and Maps, with your hours, phone, services, photos and reviews. It used to be called Google My Business.", "/services/google-business-profile", "Profile management"],
      ["Service-area business", "A business that goes to its customers instead of serving them at its address. On Google you hide the address and list up to 20 areas instead.", "/guides/google-business-profile-service-area", "Set up service areas"],
      ["Primary category", "The main label on your Google profile, such as \"Plumber\" or \"Roofing contractor\". Pick the most specific one that describes your main work. It has a big effect on which searches you show up for."],
      ["NAP", "Name, address and phone number. They should match on your website, Google, Yelp and other directories so search engines trust they're the same business."],
      ["Citation", "A mention of your business name, address and phone on another site, such as a directory, a trade association or a supplier's dealer page."],
      ["Local SEO", "Work that helps you show up when people nearby search for your service: your Google profile, reviews, website pages and listings.", "/services/local-seo", "Local SEO"],
      ["Doorway page", "Near-identical pages made only to rank in many towns. Google treats them as spam. A town page should have something real about work you do there."],
      ["Local Services Ads (LSA)", "Google's pay-per-lead ads for local businesses, with a verification step. You pay for leads, not clicks.", "/guides/local-services-ads-vs-google-ads", "LSA vs Google Ads"],
      ["AEO (answer engine optimization)", "Making your business easy for AI assistants and Google's AI answers to find, understand and mention. It mostly means clear pages, consistent facts and real reviews.", "/services/ai-search-optimization", "AI search"],
      ["Schema markup", "Code on a page that tells search engines what it is: a business, a service, a question and answer. It helps them understand the page but doesn't guarantee a higher rank."],
    ],
  },
  {
    group: "Reviews",
    terms: [
      ["Review gating", "Asking customers how happy they are first and sending only the happy ones to Google. Google doesn't allow it.", "/guides/is-review-gating-allowed", "Is review gating allowed?"],
      ["Review velocity", "How steadily new reviews come in. Ten a month for a year usually helps more than 120 in one week and then nothing."],
      ["Place ID", "Google's code for one place on the map. You can build your direct review link from it.", "/tools/google-review-link-generator", "Make your review link"],
      ["NFC review card", "A card that opens your Google review page when a customer taps it with a phone. A QR code does the same with the camera.", "/guides/google-review-qr-code-and-nfc-cards", "Cards and QR codes"],
      ["Reputation management", "Asking for reviews, replying to them and keeping an eye on what people say about you online.", "/services/review-generation", "Review generation"],
    ],
  },
  {
    group: "Leads and calls",
    terms: [
      ["Lead", "Someone who contacts you about work: a call, text, form, message or booking."],
      ["Speed to lead", "How long a new lead waits for your first real reply.", "/tools/lead-response-calculator", "Work out what it's worth"],
      ["Missed-call text-back", "A text sent automatically, within seconds, to someone whose call you missed.", "/services/missed-call-text-back", "Missed-call text-back"],
      ["AI receptionist", "Software that answers your phone in a natural voice, takes details, answers simple questions and books or transfers the call.", "/guides/ai-receptionist-for-contractors", "AI receptionists"],
      ["Call tracking", "Using different phone numbers for different places you advertise, so you can see which one made the phone ring.", "/services/call-tracking", "Call tracking"],
      ["Shared lead", "A lead sold to several companies at once. The first good reply often wins.", "/guides/angi-vs-thumbtack-vs-local-services-ads", "How lead sites charge"],
      ["Booking rate", "The share of leads that end up on your calendar. 20 visits from 50 leads is 40%."],
      ["Close rate", "The share of estimates that become jobs. 12 jobs from 30 estimates is 40%."],
      ["Cost per lead / cost per job", "What you spent on a source, divided by its leads, or by the jobs won from them. Compare sources on cost per job.", "/tools/cost-per-lead-calculator", "Compare your sources"],
      ["Rehash", "Going back to old estimates that never closed and asking again.", "/guides/how-to-follow-up-on-an-estimate", "Follow up on estimates"],
    ],
  },
  {
    group: "Software and automation",
    terms: [
      ["CRM", "Customer relationship management: one place for who your customers are, what was said and what happens next.", "/guides/best-crm-for-home-service-business", "Choose a CRM"],
      ["Field-service software (FSM)", "Software that runs jobs: scheduling, dispatch, quotes, invoices and job history. Jobber, Housecall Pro, ServiceTitan and Workiz are examples.", "/guides/crm-vs-field-service-software", "CRM or FSM?"],
      ["HighLevel (GoHighLevel)", "A CRM and marketing platform that agencies set up for small businesses. Ours is built on it.", "/guides/gohighlevel-for-contractors", "HighLevel for contractors"],
      ["Pipeline", "A board that shows each lead's stage, such as new, quoted, won or lost.", "/services/crm-automation", "CRM and follow-up"],
      ["Workflow", "A set of automatic steps: when this happens, wait, then send that, and stop if they reply."],
      ["Database reactivation", "Messaging past customers and old leads, with permission, to bring some of them back.", "/guides/win-back-past-customers", "Win back customers"],
      ["Text-to-pay", "Sending an invoice as a text with a link the customer can pay from.", "/guides/text-to-pay-for-contractors", "Text-to-pay"],
      ["Maintenance plan", "A yearly or monthly agreement for regular visits. Also called a service agreement or membership.", "/services/maintenance-plans", "Maintenance plans"],
    ],
  },
  {
    group: "Texting rules",
    terms: [
      ["A2P 10DLC", "The US carrier registration a business needs to text customers from a normal 10-digit number. Unregistered texts are often blocked.", "/guides/a2p-10dlc-for-contractors", "A2P for contractors"],
      ["TCPA", "The US law on marketing calls and texts. Marketing texts need prior written consent and a working opt-out."],
      ["Opt-in and opt-out", "Opt-in is a person agreeing to your messages. Opt-out is them stopping, for example by replying STOP. Keep records of both."],
      ["Quiet hours", "Times you shouldn't send marketing messages. Federal telemarketing rules allow 8 a.m. to 9 p.m. in the recipient's time, and some states are stricter."],
    ],
  },
  {
    group: "Money",
    terms: [
      ["Markup", "What you add to cost, as a share of cost. A job that costs $600 and sells for $1,000 has a 67% markup.", "/tools/job-price-calculator", "Job price calculator"],
      ["Margin", "What's left, as a share of the price. The same job has a 40% margin."],
      ["Overhead", "Costs you pay whether or not you have a job today: insurance, truck, phone, office, software."],
      ["Billable hours", "Hours a customer pays for. Quotes, driving and paperwork usually aren't.", "/tools/hourly-rate-calculator", "Hourly rate calculator"],
      ["Average ticket", "Total sales divided by number of jobs."],
      ["Recurring revenue", "Income that repeats, such as maintenance plans.", "/tools/maintenance-plan-calculator", "Plan calculator"],
    ],
  },
];
