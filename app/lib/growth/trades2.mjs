// Month 2-3 trade pages. Same rule as trades.mjs: each page is written for its trade.
const WEBFX = '<a href="https://www.webfx.com/blog/home-services/home-services-marketing-benchmarks/" rel="noopener">WebFX</a>';

const svc = {
  gbp: ['/services/google-business-profile', 'Google Business Profile management', 'Categories, services, photos and posts set up so you show in the map pack.'],
  reviews: ['/services/review-generation', 'Google review generation', 'Every finished job gets a review request by text, automatically.'],
  seo: ['/services/local-seo', 'Local SEO', 'Service and city pages that rank for the jobs you want.'],
  web: ['/services/contractor-websites', 'Contractor websites', 'Fast sites built to turn a Google visit into a phone call.'],
  calls: ['/services/missed-call-text-back', 'Missed-call text-back & AI receptionist', 'Every caller gets an answer, even when you\'re on a job.'],
  maps: ['/blog/how-to-rank-higher-on-google-maps', 'How to rank higher on Google Maps', 'The ranking factors that matter for contractors.'],
  howMany: ['/blog/how-many-google-reviews-to-rank', 'How many Google reviews do you need?', 'Work out your own target from the top 3 near you.'],
  lsa: ['/blog/local-services-ads-vs-google-ads', 'Local Services Ads vs. Google Ads', 'Which paid option fits a contractor, and when.'],
  fence: ['/marketing/fence-companies', 'Fence company marketing', 'Deck and fence buyers overlap. See the fence plan.'],
  landscaping: ['/marketing/landscaping', 'Landscaping marketing', 'Route density, projects and seasonal waves.'],
};

export const trades2 = [
  // ------------------------------------------------------------------ GARAGE DOOR
  {
    slug: 'garage-door-repair', name: 'Garage door', plural: 'garage door companies',
    path: '/marketing/garage-door-repair',
    title: 'Garage Door Company Marketing & SEO | TableTurnerr',
    description: 'Garage door marketing: win the map pack for urgent "garage door won\'t open" searches, answer every call, and outshine fake listings.',
    h1: 'Garage door marketing for a trade where the first company to answer wins',
    lede: 'When a spring snaps and the car is stuck inside, nobody compares five companies. They call the first trustworthy name in the map pack. We make sure that\'s you, and that someone picks up.',
    problemHeading: 'Why garage door marketing is a fight',
    problemIntro: 'Garage door repair is one of the most crowded local categories on Google, with lead-gen networks and listings that don\'t look like real local businesses. Real companies have to look obviously real.',
    problems: [
      ['Urgent, call-first searches', 'Most repair searches happen on a phone with a problem right now. A missed call usually means a lost job, not a voicemail.'],
      ['Crowded with lookalike listings', 'Homeowners have learned to be suspicious. Real photos of your trucks, techs and finished installs, plus reviews naming your techs, separate you from the noise.'],
      ['Repair vs. new door buyers', 'A broken spring and a new insulated door are different customers with different timelines. One page can\'t serve both.'],
    ],
    searchIntro: 'Repair searches are urgent and symptom-based. Replacement searches are research-based and higher value. We plan for both.',
    searches: ['garage door repair near me', 'garage door won\'t open', 'broken garage door spring', 'garage door off track', 'garage door opener repair', 'emergency garage door repair', 'new garage door cost', 'insulated garage door installation', 'liftmaster opener installation', 'garage door cable replacement', 'garage door making noise', 'commercial garage door repair'],
    planIntro: 'Speed and trust first, then the bigger replacement jobs.',
    plan: [
      ['A profile that looks unmistakably real', 'Accurate service area, real hours (including whether you do after-hours calls), photos of your people and trucks, and services for each common repair.'],
      ['Never miss the urgent call', 'Missed-call text-back replies within seconds, and an AI receptionist can book or route after-hours calls so the job doesn\'t go to the next listing.'],
      ['Reviews that name the tech', 'Requests go out right after the visit. Reviews that say "Mike replaced both springs in an hour" build trust in a category full of skeptics.'],
      ['Replacement and opener pages', 'Separate pages for new doors and openers with styles, price ranges and photos, aimed at the higher-ticket buyer who researches first.'],
    ],
    deepDive: `
<h2>Why answering fast matters more here than almost anywhere</h2>
<p>The map pack shows up on nearly every home-service search (a 2026 ${WEBFX} study found it on 98 of 100 keywords), and in garage door repair the homeowner often calls the first listing that looks legitimate. If that call rings out, they tap the next one. Answering, or texting back within a minute, is part of your marketing, not a separate problem.</p>
<h2>Stay clear of the shortcuts</h2>
<p>This category is known for keyword-stuffed business names, fake addresses and multiple listings for one company. Google suspends those profiles, sometimes taking real businesses down with them. We keep your profile clean so you aren\'t caught in a sweep, and we can help you <a href="https://support.google.com/business/answer/4596773" rel="noopener">report spam listings</a> that break the rules in your area.</p>
<h2>Opener and door brands</h2>
<p>Many homeowners search by brand ("LiftMaster opener repair"). If you service or install specific brands, we list them on your site and profile so you can be matched to those searches.</p>`,
    ctaTitle: 'See who\'s getting your area\'s garage door calls',
    faq: [
      ['Should we offer 24/7 service on our profile?', 'Only if you actually answer 24/7. Listing hours you can\'t cover leads to bad reviews. An AI receptionist can capture after-hours calls and book the morning slot.'],
      ['Do we need a separate page for each repair?', 'For the main ones, yes: springs, openers, off-track doors, cables and new installs. Each matches a different search.'],
      ['Can you get us out of the spam listings?', 'We can\'t remove competitors, but a complete, active profile with real photos and steady reviews tends to outrank thin listings over time. You can also report clear violations to Google.'],
      ['Are Local Services Ads worth it for garage door repair?', 'Often, because buyers are urgent and LSA charges per lead. See our comparison of LSA and Google Ads.'],
    ],
    related: [svc.calls, svc.gbp, svc.lsa],
  },

  // ------------------------------------------------------------------ PRESSURE WASHING
  {
    slug: 'pressure-washing', name: 'Pressure washing', plural: 'pressure washing companies',
    path: '/marketing/pressure-washing',
    title: 'Pressure Washing Marketing & SEO | TableTurnerr',
    description: 'Marketing for pressure washing and soft washing businesses: rank for house washing and driveway cleaning near you, show before/after proof, earn repeat jobs.',
    h1: 'Pressure washing marketing that sells with before-and-after photos',
    lede: 'Few trades are as visual as pressure washing. A good before/after photo sells the job. We put that proof where homeowners decide: your Google profile, your site and your reviews, then bring customers back every year.',
    problemHeading: 'What holds pressure washing businesses back',
    problemIntro: 'The barrier to entry is low, so most towns have plenty of operators. The ones who grow look established and keep customers coming back.',
    problems: [
      ['Everyone looks the same', 'A truck, a trailer and a logo. Homeowners can\'t tell who\'s careful with plants, paint and windows. Reviews and project photos are how they decide.'],
      ['One-off jobs', 'A house wash is once a year at best. Without a simple way to bring customers back, you\'re paying to find new ones every season.'],
      ['Soft wash vs. pressure wash confusion', 'Homeowners don\'t know which they need. If your site explains it, you look like the expert, and you can price properly.'],
    ],
    searchIntro: 'Searches split by surface. Each surface is a service on your profile and a page on your site.',
    searches: ['pressure washing near me', 'house washing service', 'soft wash roof cleaning', 'driveway cleaning near me', 'concrete cleaning', 'deck and fence cleaning', 'gutter brightening', 'commercial pressure washing', 'paver cleaning and sealing', 'remove mold from siding', 'pressure washing prices', 'window cleaning and pressure washing'],
    planIntro: 'Show the work, rank by surface, and turn one job into a yearly customer.',
    plan: [
      ['Before/after on your profile, weekly', 'We help you post real before/after photos to Google on a schedule, tagged by service and town. It keeps the profile active and sells the result.'],
      ['A page per surface', 'House washing, roofs, driveways, decks, fences and commercial each get a page with photos, method (soft vs. pressure) and a starting price.'],
      ['Reviews with photos', 'Review requests go out the same day, while the driveway still looks new. We encourage customers to add a photo.'],
      ['Yearly reminders', 'Past customers get a reminder at the right time of year to book again. Repeat work is the cheapest work you\'ll get.'],
    ],
    deepDive: `
<h2>Why photos are your best ranking and sales tool</h2>
<p>Homeowners scroll through photos on your Google profile before they call. Fresh, real photos also keep your profile active. Stock images do the opposite: they make you look like a lead-gen site. Use your own work, every time.</p>
<h2>Add-on services raise the ticket</h2>
<p>Gutter cleaning, window cleaning, sealing and holiday lighting are natural add-ons. Listing them as separate services on your profile helps you rank for them and gives customers a reason to book more in one visit.</p>
<h2>Commercial accounts</h2>
<p>Property managers, HOAs and restaurants need recurring cleaning, insurance proof and invoices that make sense. If you want that work, we build a separate commercial page aimed at those buyers.</p>`,
    ctaTitle: 'See how your pressure washing business ranks nearby',
    faq: [
      ['Should we show prices on our site?', 'Starting prices or ranges help. They filter out bargain hunters and make the call easier for serious buyers.'],
      ['Is it worth having separate pages for soft washing?', 'Yes. Homeowners search for "roof cleaning" and "soft wash" specifically, and explaining the difference builds trust.'],
      ['How do we get repeat customers?', 'A yearly reminder by text or email at the right season, plus a simple rebooking link. We set this up for you.'],
      ['We just started. Is SEO worth it yet?', 'Start with a complete Google profile and reviews from your first jobs. Those are cheap and compound fast.'],
    ],
    related: [svc.gbp, svc.reviews, svc.howMany],
  },

  // ------------------------------------------------------------------ HOLIDAY LIGHTING
  {
    slug: 'holiday-lighting', name: 'Holiday lighting', plural: 'holiday lighting installers',
    path: '/marketing/holiday-lighting',
    title: 'Holiday Lighting Business Marketing & SEO | TableTurnerr',
    description: 'Marketing for Christmas and holiday light installers: rank before the season starts, fill your install calendar early, and bring last year\'s customers back.',
    h1: 'Holiday lighting marketing that fills the calendar before the first cold snap',
    lede: 'Holiday lighting demand comes in a short, intense wave. If your Google presence only wakes up in November, you miss the homeowners who booked in September. We get you ranked early and bring last year\'s customers back automatically.',
    problemHeading: 'The holiday lighting timing problem',
    problemIntro: 'You have a few months to make most of your revenue. Marketing has to be ready before demand shows up, not after.',
    problems: [
      ['Rankings take time to build', 'Google needs time to trust a page or profile. Starting in November is usually too late for that season.'],
      ['Install slots run out', 'Once the calendar fills, every extra call is a turned-away customer. Early bookings let you plan crews and inventory.'],
      ['Last year\'s customers forget', 'Most installers re-sell to past customers by hand, if at all. Returning customers are the easiest money in this business.'],
    ],
    searchIntro: 'Searches start earlier than most installers expect and peak before Thanksgiving. Many homeowners also look for takedown and storage.',
    searches: ['christmas light installation near me', 'holiday lighting company', 'professional christmas light installers', 'christmas light installation cost', 'permanent holiday lighting', 'commercial christmas lights', 'christmas light takedown service', 'roofline lights installation', 'tree wrapping christmas lights', 'christmas lights hanging service', 'led christmas light installation', 'holiday lights for business'],
    planIntro: 'A plan built around the calendar.',
    plan: [
      ['Summer: build the base', 'Profile categories and services set up, a strong holiday lighting page with photos of past installs, and service-area pages for your best neighborhoods.'],
      ['Early fall: past customers first', 'Last year\'s customers get an early-booking message before anyone else, so your calendar starts full.'],
      ['Peak season: reviews and photos', 'Every install gets a review request and we post fresh night photos weekly. Nothing sells lights like lights.'],
      ['January: takedown and next year', 'Takedown reminders, review requests for the season, and a "book next year" offer while customers are happy.'],
    ],
    deepDive: `
<h2>Why holiday lighting is a good SEO bet</h2>
<p>Most marketing agencies don\'t write about this trade, so the competition for search terms is often thinner than in roofing or HVAC. A focused page with real photos and steady reviews can rank well in many towns.</p>
<h2>Permanent lighting</h2>
<p>Permanent track lighting is a year-round product with a higher ticket. If you offer it, it deserves its own page and profile service, aimed at homeowners who are tired of ladders every November.</p>
<h2>Pair it with your main trade</h2>
<p>Many holiday lighting businesses are landscapers, roofers, window cleaners or pressure washers in the off-season. Your existing customers are your first market. We can set up the off-season pages alongside your main trade.</p>`,
    ctaTitle: 'See where you rank for holiday lighting before the season starts',
    faq: [
      ['When should we start marketing for the holiday season?', 'Summer is ideal for pages and profile work. Messages to past customers usually go out in early fall.'],
      ['Should holiday lighting have its own Google profile?', 'Usually not if it\'s part of an existing business. Add it as a service on your current profile. A separate profile only makes sense for a separate business with its own location and staff.'],
      ['Can you help us sell permanent lighting?', 'Yes. It gets its own page, photos and messaging aimed at year-round buyers.'],
      ['Do you work with installers outside the US?', 'Our clients are in the US today.'],
    ],
    related: [svc.reviews, svc.seo, svc.landscaping],
  },

  // ------------------------------------------------------------------ PAINTING
  {
    slug: 'painting', name: 'Painters', plural: 'painting contractors',
    path: '/marketing/painting',
    title: 'Marketing for Painting Contractors & SEO | TableTurnerr',
    description: 'Marketing for house painters and painting contractors: rank for interior and exterior painting near you, win estimates with photo proof and reviews.',
    h1: 'Marketing for painting contractors who want better jobs, not just more quotes',
    lede: 'Homeowners hiring a painter worry about the same things: will they show up, protect my floors, and finish clean? Your Google profile and site should answer those questions before you ever give a quote.',
    problemHeading: 'Why painters struggle online',
    problemIntro: 'Painting has low barriers to entry and lots of price shoppers. The painters who grow sell reliability and craftsmanship, not the lowest number.',
    problems: [
      ['Competing on price', 'Without proof of quality, the homeowner picks the cheapest quote. Reviews that mention prep, cleanup and timeliness justify a higher price.'],
      ['Interior and exterior are different seasons', 'Exterior work clusters in good weather; interior fills the rest. Marketing should shift with the season.'],
      ['Cabinet and specialty work gets lost', 'Cabinet refinishing, decks and commercial repaints are high-margin, but most painter sites bury them in a list.'],
    ],
    searchIntro: 'Painting searches split by interior, exterior and specialty work, often with a cost question attached.',
    searches: ['house painters near me', 'interior painting contractor', 'exterior house painting', 'cabinet painting near me', 'kitchen cabinet refinishing', 'cost to paint house exterior', 'commercial painting contractor', 'deck staining service', 'drywall repair and painting', 'popcorn ceiling removal', 'painters for rental property', 'color consultation painter'],
    planIntro: 'Sell the experience, rank by service, and time it to the season.',
    plan: [
      ['Proof of process', 'A site and profile that show how you work: prep, protection, daily cleanup, walkthrough. This is what homeowners worry about most.'],
      ['Service pages that earn higher tickets', 'Interior, exterior, cabinets, decks and commercial each get a page with photos, process and price guidance.'],
      ['Reviews that mention the details', 'Requests go out at the final walkthrough. Customers are prompted to mention cleanup and communication, the things future customers look for.'],
      ['Seasonal shifts', 'Exterior pushes in spring, interior and cabinets in fall and winter, with posts and offers timed to match.'],
    ],
    deepDive: `
<h2>Show the job, not just the result</h2>
<p>Before/after photos are good. Photos of floors covered, furniture wrapped and tape lines straight are often better, because they answer the fear behind the search: "Will this crew wreck my house?"</p>
<h2>Cost pages bring in buyers</h2>
<p>Many homeowners start with "how much does it cost to paint a house." An honest page with price ranges and what changes them (size, prep, paint grade, access) attracts those buyers and makes your quote feel fair.</p>
<h2>Commercial and property managers</h2>
<p>Repaints between tenants are steady, repeat work. If you want it, a page aimed at property managers, with turnaround times and invoicing, helps you get found.</p>`,
    ctaTitle: 'See how your painting company compares to the top 3 near you',
    faq: [
      ['Should we publish prices?', 'Ranges and the factors that change them. Exact prices without seeing the job set the wrong expectation.'],
      ['How do we stop competing on price?', 'Show your process and let reviews talk about it. Buyers who care about quality will pay for it if they can see it.'],
      ['Is cabinet painting worth its own page?', 'Yes. It\'s a separate search with higher margins and fewer competitors.'],
      ['Can you help in the slow season?', 'Interior and cabinet campaigns, plus messages to past exterior customers, help fill winter.'],
    ],
    related: [svc.web, svc.reviews, svc.seo],
  },

  // ------------------------------------------------------------------ PEST CONTROL
  {
    slug: 'pest-control', name: 'Pest control', plural: 'pest control companies',
    path: '/marketing/pest-control',
    title: 'Pest Control Marketing & SEO | TableTurnerr',
    description: 'Marketing for pest control companies: rank for urgent pest searches near you, turn one-time treatments into recurring plans, and build a steady flow of reviews.',
    h1: 'Pest control marketing that turns one call into a recurring customer',
    lede: 'People search for pest control the moment they see the problem. Win that search, and a one-time treatment can become a quarterly plan worth years of revenue. We help you do both.',
    problemHeading: 'What makes pest control marketing different',
    problemIntro: 'Big national brands spend heavily on ads. Local companies win on speed, trust and being right in the neighborhood.',
    problems: [
      ['National brands outspend you', 'You won\'t outbid them on ads. You can outrank them in the map pack with a stronger local profile and more recent local reviews.'],
      ['Every pest is a separate search', 'Termites, bed bugs, rodents, wasps, ants: each is its own search with its own urgency. A generic services page misses them.'],
      ['Recurring plans are the real business', 'The first treatment pays for the marketing. The recurring plan is the profit. Follow-up matters as much as the first call.'],
    ],
    searchIntro: 'Searches are pest-first and often urgent. Many include "near me" or "same day."',
    searches: ['pest control near me', 'exterminator near me', 'termite inspection', 'bed bug treatment', 'rodent removal', 'wasp nest removal', 'ant control service', 'mosquito treatment for yard', 'cockroach exterminator', 'same day pest control', 'quarterly pest control plan', 'wildlife removal near me'],
    planIntro: 'Win the urgent search, then keep the customer.',
    plan: [
      ['A page per pest', 'Each common pest in your area gets a page: signs, what you do, how fast you can come, and whether it\'s covered by your recurring plan.'],
      ['Local reviews at scale', 'Every treatment triggers a review request. Recurring customers get one after their first visits, while the result is fresh.'],
      ['Answer the urgent call', 'Missed-call text-back and an AI receptionist catch calls when techs are in crawl spaces.'],
      ['Seasonal pest calendar', 'Posts and pages timed to your region\'s pest seasons, from spring ants to fall rodents.'],
    ],
    deepDive: `
<h2>How local companies beat national brands</h2>
<p>National brands often rank on ads and brand recognition. In the map pack, a local company with the right categories, a complete list of pest services, and a steady stream of recent reviews from the neighborhood can show up right next to them, or above them. That\'s where most local pest control calls start.</p>
<h2>Licensing and safety questions</h2>
<p>Homeowners with kids and pets want to know what you\'re spraying. A short page on your methods, licensing and safety answers that before the call and helps conversion.</p>
<h2>Commercial accounts</h2>
<p>Restaurants, property managers and warehouses need scheduled service and documentation. A commercial page aimed at them opens steady recurring revenue.</p>`,
    ctaTitle: 'See how your pest control company ranks against the big brands',
    faq: [
      ['Should each pest have its own page?', 'For the pests you treat most often in your area, yes. Each matches a different search.'],
      ['How do we turn one-time customers into recurring plans?', 'Offer the plan at the first visit, then follow up by text a few weeks later. We set up that follow-up for you.'],
      ['Can we rank in multiple towns?', 'Within your real service area, yes, through reviews from those towns and pages for them. Fake addresses to appear in more towns break Google\'s rules.'],
      ['Do you handle wildlife removal companies too?', 'Yes. The plan is similar, with more emphasis on urgent calls.'],
    ],
    related: [svc.calls, svc.seo, svc.maps],
  },

  // ------------------------------------------------------------------ CLEANING
  {
    slug: 'cleaning-services', name: 'Cleaning services', plural: 'cleaning companies',
    path: '/marketing/cleaning-services',
    title: 'Cleaning Business Marketing & SEO | TableTurnerr',
    description: 'Marketing for house cleaning and maid services: rank for cleaning near you, build trust with reviews, and turn one-time cleans into recurring clients.',
    h1: 'Cleaning business marketing built on trust and recurring clients',
    lede: 'Hiring a cleaner means letting someone into your home while you\'re not there. Trust decides everything. We build the reviews, profile and site that make homeowners comfortable booking you, then keep them on a schedule.',
    problemHeading: 'Why cleaning businesses are hard to market',
    problemIntro: 'Cleaning is crowded, from solo cleaners to franchises and apps. Recurring clients are the business, and trust is how you get them.',
    problems: [
      ['Apps and franchises everywhere', 'Booking apps and national franchises take a lot of the visibility. A local company needs to look established and personal at the same time.'],
      ['Trust is the purchase', 'Background checks, insurance, consistent cleaners: homeowners want proof. Most cleaning sites don\'t show it.'],
      ['One-time cleans don\'t pay', 'Move-out and deep cleans are great entry points, but recurring weekly or biweekly clients are where the margin is.'],
    ],
    searchIntro: 'Searches mix recurring cleaning, one-time deep cleans and move-in or move-out cleans.',
    searches: ['house cleaning near me', 'maid service', 'deep cleaning service', 'move out cleaning', 'move in cleaning', 'recurring house cleaning', 'airbnb cleaning service', 'office cleaning near me', 'post construction cleaning', 'house cleaning prices', 'biweekly cleaning service', 'green cleaning service'],
    planIntro: 'Prove you\'re trustworthy, then make rebooking automatic.',
    plan: [
      ['Trust on every page', 'Insurance, background checks, satisfaction guarantee and real team photos, shown on your profile and site where homeowners decide.'],
      ['Pages for each clean type', 'Recurring, deep, move-out, rental turnover and office each get a page with what\'s included and starting prices.'],
      ['Reviews from regulars', 'Recurring clients get a review request after their first few cleans. Reviews mentioning the cleaner by name build trust fast.'],
      ['One-time to recurring', 'After a deep or move-in clean, clients get a follow-up offer to set up a regular schedule.'],
    ],
    deepDive: `
<h2>Checklists sell cleaning</h2>
<p>A clear checklist of what\'s included in each type of clean answers the homeowner\'s biggest question and reduces back-and-forth on the phone. It also gives Google more detail about what you do.</p>
<h2>Short-term rental turnover</h2>
<p>Airbnb and vacation rental hosts need reliable, fast turnovers and often manage several properties. If your area has many rentals, a dedicated page aimed at hosts can bring steady recurring work.</p>
<h2>Commercial cleaning</h2>
<p>Offices and medical clinics buy differently: contracts, schedules, insurance certificates. A separate commercial section keeps both audiences from getting confused.</p>`,
    ctaTitle: 'See how your cleaning business compares to the top 3 near you',
    faq: [
      ['Should we show prices?', 'Starting prices by home size help. Most homeowners want a ballpark before booking.'],
      ['How do we compete with booking apps?', 'Look local and personal: real team photos, reviews naming cleaners, and a fast response. Apps can\'t offer the same cleaner every time; you can.'],
      ['Do you work with commercial cleaning companies?', 'Yes. The plan focuses more on pages for property managers and offices.'],
      ['How fast can reviews grow?', 'It depends on volume. Cleaning companies with many recurring clients can build reviews quickly once every client is asked.'],
    ],
    related: [svc.reviews, svc.gbp, svc.web],
  },

  // ------------------------------------------------------------------ DECK BUILDERS
  {
    slug: 'deck-builders', name: 'Deck builders', plural: 'deck builders',
    path: '/marketing/deck-builders',
    title: 'Marketing for Deck Builders & SEO | TableTurnerr',
    description: 'Marketing for deck builders: rank for deck construction near you, show off finished projects, and book design consultations before the building season.',
    h1: 'Marketing for deck builders that books design consults before spring',
    lede: 'A new deck is a big purchase homeowners plan for months. They browse photos, compare materials, and pick the builder whose work they can picture in their own backyard. We put your best projects in front of them early.',
    problemHeading: 'What deck builders are up against',
    problemIntro: 'Deck buyers research for weeks. If your work isn\'t visible while they\'re planning, a competitor\'s is.',
    problems: [
      ['A short building season', 'Homeowners plan in winter and want it built by summer. If your marketing starts in April, the planners have already booked.'],
      ['Material questions', 'Wood vs. composite, brands, maintenance, cost. Buyers want answers before calling, and most builder sites don\'t give them.'],
      ['Portfolio buried on Facebook', 'Many builders post their best work on social media where Google can\'t use it to rank them.'],
    ],
    searchIntro: 'Searches mix construction, materials, cost and repair.',
    searches: ['deck builders near me', 'composite deck installation', 'trex deck builder', 'deck replacement', 'deck repair near me', 'cost to build a deck', 'covered deck builder', 'pergola installation', 'deck staining and sealing', 'second story deck builder', 'custom deck design', 'deck and patio contractor'],
    planIntro: 'Get found while homeowners plan, and give them reasons to pick you.',
    plan: [
      ['Project pages, not just a gallery', 'Each standout project gets a page: location, material, size, challenges and photos. These rank for local searches and sell the next job.'],
      ['Material and cost guides', 'Wood vs. composite, brand comparisons and cost ranges. These attract planners months before they\'re ready to build.'],
      ['Winter planning push', 'Posts, pages and messages timed for late winter when homeowners start planning, so your spring calendar fills early.'],
      ['Reviews that show the result', 'Requests go out at completion, prompting customers to add a photo of their new deck.'],
    ],
    deepDive: `
<h2>Why project pages work</h2>
<p>A page titled "Composite deck with pergola in [town]" with photos and a short story matches exactly what a nearby homeowner is searching for, and shows them their neighbor trusted you. A generic gallery can\'t do that.</p>
<h2>Decks and fences go together</h2>
<p>Many deck builders also build fences, pergolas and patios. Each deserves its own page and profile service. If you also do fences, see our <a href="/marketing/fence-companies">fence company plan</a>.</p>
<h2>Certified installer programs</h2>
<p>If you\'re a certified installer for a decking brand, say so on your site and profile, and check whether the manufacturer lists you in its installer finder. Those listings are relevant links and send buyers who already chose the material.</p>`,
    ctaTitle: 'See where your deck company ranks before the season starts',
    faq: [
      ['When should deck builders start marketing?', 'Late fall and winter for planning content and pages, so rankings are in place when homeowners start calling in spring.'],
      ['Should we show prices?', 'Cost ranges by size and material help planners budget and make your quote feel fair.'],
      ['Do you work with deck repair companies?', 'Yes. Repair searches are more urgent and year-round, so the plan shifts toward speed and reviews.'],
      ['Can you use our Instagram photos?', 'Yes, with your permission. We\'ll add them to your profile and project pages where Google can use them.'],
    ],
    related: [svc.fence, svc.seo, svc.web],
  },

  // ------------------------------------------------------------------ CONCRETE
  {
    slug: 'concrete-contractors', name: 'Concrete & hardscape', plural: 'concrete and hardscape contractors',
    path: '/marketing/concrete-contractors',
    title: 'Concrete Contractor Marketing & SEO | TableTurnerr',
    description: 'Marketing for concrete and hardscape contractors: rank for driveways, patios and foundations near you, and win bigger jobs with project photos and reviews.',
    h1: 'Concrete contractor marketing that wins the driveway, patio and foundation jobs',
    lede: 'Concrete jobs are large, permanent and visible from the street. Homeowners want to see your work and trust it will last. We make your projects and reviews easy to find when they search.',
    problemHeading: 'Why concrete contractors miss out online',
    problemIntro: 'Most concrete companies get work from referrals and builders. That\'s great until it slows down. Homeowner search is a steady channel most competitors ignore.',
    problems: [
      ['Referral-only pipelines', 'When builder work slows, there\'s nothing to fall back on. A Google presence brings direct homeowner jobs at better margins.'],
      ['Every job looks the same online', 'A flat photo of grey concrete doesn\'t sell. Stamped, colored and decorative work needs good photos and descriptions.'],
      ['Big tickets, long decisions', 'Homeowners get several quotes for a driveway. Reviews mentioning durability and cleanup tip the decision.'],
    ],
    searchIntro: 'Searches split by project type, finish and repair.',
    searches: ['concrete contractors near me', 'concrete driveway replacement', 'stamped concrete patio', 'concrete patio cost', 'paver patio installation', 'retaining wall builder', 'concrete repair near me', 'foundation repair contractor', 'decorative concrete', 'concrete sidewalk repair', 'garage floor epoxy', 'concrete steps repair'],
    planIntro: 'Bring in direct homeowner work, project by project.',
    plan: [
      ['A page per project type', 'Driveways, patios, stamped and decorative, retaining walls, repair. Each with photos, process and cost guidance.'],
      ['Project photos on your profile', 'We help you post finished work regularly, tagged by type and town, so homeowners can see jobs near them.'],
      ['Reviews from homeowners', 'Most concrete companies have few reviews because builder clients don\'t leave them. Asking every homeowner customer changes that fast.'],
      ['Service-area focus', 'Pages and profile settings built around the towns you want to work in, not the whole region.'],
    ],
    deepDive: `
<h2>Direct homeowner work pays better</h2>
<p>Builder and GC work is steady but tightly priced. Homeowners hiring directly for a driveway or patio usually care more about quality and reliability than the lowest bid, especially when your reviews and photos show you deliver.</p>
<h2>Explain the process</h2>
<p>Homeowners don\'t know about base prep, reinforcement, curing time or sealing. A short page explaining how you do it right, and why it lasts, makes your quote easier to accept than a cheaper one with no explanation.</p>
<h2>Hardscape add-ons</h2>
<p>Pavers, retaining walls, fire pits and outdoor kitchens raise the ticket and attract different searches. If you offer them, list them separately.</p>`,
    ctaTitle: 'See how your concrete company shows up for homeowners nearby',
    faq: [
      ['We get most work from builders. Do we need SEO?', 'It gives you a second channel with better margins and keeps the calendar full when builder work slows.'],
      ['Should we list foundation repair separately?', 'Yes, it\'s a different, more urgent search with a different buyer.'],
      ['How do we get reviews when most jobs come from GCs?', 'Ask every homeowner job, and ask builders for a Google review or testimonial. Even a handful of recent reviews makes a big difference in this trade.'],
      ['Do you work with paver and hardscape companies?', 'Yes. The plan leans more on project pages and design photos.'],
    ],
    related: [svc.gbp, svc.reviews, svc.landscaping],
  },

  // ------------------------------------------------------------------ ELECTRICIANS
  // Added after Search Console (Aug-Nov 2026) showed electrician searches reaching the old /industries/electrical page.
  {
    slug: 'electricians', name: 'Electrician', plural: 'electricians',
    path: '/marketing/electricians',
    title: 'Electrician Marketing & SEO | TableTurnerr',
    description: 'Marketing for electricians: rank in the map pack for panel upgrades, EV chargers and emergency calls, and earn reviews that prove you\'re licensed and careful.',
    h1: 'Electrician marketing that proves you\'re the safe choice',
    lede: 'Homeowners can\'t judge wiring, so they judge you: your reviews, your license, and how fast you answer. We make your Google profile and site show all three, and point them at the bigger jobs like panel upgrades and EV chargers.',
    problemHeading: 'What makes electrical marketing different',
    problemIntro: 'Electrical work is invisible once the drywall goes back. Customers are buying trust, and they look for it on Google before they call.',
    problems: [
      ['Safety-first buyers', 'People worry about fire, shocks and failed inspections. Reviews that mention clean work, permits and passing inspection matter more than "great price".'],
      ['Small jobs vs. big projects', 'An outlet repair and a 200-amp panel upgrade come from different searches. Most electricians rank for neither specifically because their site has one generic "services" page.'],
      ['Emergencies at bad times', 'Power out, breaker won\'t reset, burning smell: these calls come evenings and weekends, and they go to whoever answers.'],
    ],
    searchIntro: 'Electrical searches are specific. Each of the bigger jobs is its own search, its own page and its own service on your profile.',
    searches: ['electrician near me', 'emergency electrician', 'panel upgrade', '200 amp service upgrade', 'ev charger installation', 'generator installation', 'whole house surge protector', 'rewiring an old house', 'outlet not working', 'breaker keeps tripping', 'recessed lighting installation', 'commercial electrician'],
    planIntro: 'Trust first, then rank for the jobs worth the most.',
    plan: [
      ['A profile that shows you\'re licensed', 'Primary category "Electrician", every service listed, service area set to where you really work, and your license details on your site and in your profile description where your state allows it.'],
      ['Pages for the high-value jobs', 'Panel upgrades, EV chargers, generators, rewiring and lighting each get a page with what\'s involved, permits, typical price ranges and photos of your own work.'],
      ['Reviews that mention the job', 'A text goes out when the job closes. Reviews like "upgraded our panel and handled the permit" help you rank for that job and reassure the next customer.'],
      ['Answer the emergency call', 'Missed-call text-back replies in seconds, and an AI receptionist can book or route after-hours calls so a tripped breaker doesn\'t become a competitor\'s job.'],
    ],
    deepDive: `
<h2>EV chargers, panels and generators are where the growth is</h2>
<p>A lot of electrician websites still list "residential, commercial, industrial" and stop there. Homeowners search for the job: "EV charger installation", "panel upgrade", "standby generator". Each of those is a higher-ticket job, and each deserves its own page with the questions people ask: how long it takes, whether a permit is needed, what affects the price, and whether the panel can handle it. That page, linked from your Google profile, is what ranks.</p>
<h2>Local Services Ads and the Google Guaranteed badge</h2>
<p>Electricians are eligible for <a href="https://ads.google.com/local-services-ads/" rel="noopener">Local Services Ads</a>, which sit above the map pack and charge per lead. Google runs license and background checks before you can advertise, and your review count and rating affect where you show. Good reviews pay off twice. See our <a href="/blog/local-services-ads-vs-google-ads">comparison of LSA and Google Ads</a>.</p>
<h2>Reviews: ask every customer, mention the work</h2>
<p>The fastest wins usually come from asking every customer by text the same day, plus a one-time request to past customers. Our <a href="/blog/electrician-review-management">guide to review management for electricians</a> covers timing, wording, and how to reply when a review goes wrong.</p>`,
    ctaTitle: 'See who\'s getting the electrical calls in your area',
    faq: [
      ['Should we put our license number on our website?', 'Yes. Many states require it on advertising, and it\'s a trust signal either way. Check your state\'s rules for exactly where it must appear.'],
      ['Do we need separate pages for EV chargers and panel upgrades?', 'Yes. They\'re different searches with different buyers, and a page that answers the specific question ranks better than a general services page.'],
      ['We do mostly commercial work. Does this still apply?', 'Partly. Commercial buyers search less on Maps and more by reputation and referral, but they still check your reviews and website before calling.'],
      ['Are Local Services Ads worth it for electricians?', 'Often, especially for urgent residential work. You pay per lead, and good reviews help you show higher.'],
    ],
    related: [svc.reviews, svc.calls, svc.lsa],
  },
].map((t) => ({ ...t, crumbs: [['/', 'Home'], ['/marketing', 'Who we help'], [t.path, t.name]] }));
