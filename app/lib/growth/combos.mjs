// Trade + service pages: /marketing/<trade>/<service>. One page per real search intent ("Google Business Profile for
// HVAC companies", "roofing website design"), each written for that trade, not find-and-replace.
// Local SEO is deliberately left out: the trade pages (/marketing/<trade>) already target "<trade> SEO", and a
// second page for the same phrase would compete with them.
//
// Rules: no invented stats or clients. GBP category names are Google's own, checked in November 2026 against the
// published category list (daltonluka.com, updated November 2026); note Google writes "Dry wall contractor" and
// "Handyman/Handywoman/Handyperson". Keep titles under ~50 characters (the site adds " | TableTurnerr").
// Pricing: never type a TableTurnerr price; {{PRICE:gbp}}, {{PRICE:reviews}} and {{PRICE:website}} are filled from
// app/lib/pricing.ts. Integrations: Jobber is our official integration, Housecall Pro connects on its plan that allows
// integrations, everything else (ServiceTitan, Workiz, AccuLynx, QuickBooks...) through Zapier or Make.
export const comboServices = ['google-business-profile', 'review-generation', 'contractor-websites'];
export const comboTrades = ['hvac', 'plumbing', 'roofing', 'electricians', 'handyman'];

// Sources, all checked November 2026.
const SRC = {
  rank: 'https://support.google.com/business/answer/7091', // relevance, distance, prominence; reviews help
  guidelines: 'https://support.google.com/business/answer/3038177', // fewest categories; service areas; one profile
  serviceArea: 'https://support.google.com/business/answer/9157481', // up to 20 areas, no radius, ~2 hours
  reviewPolicy: 'https://support.google.com/contributionpolicy/answer/7400114', // no gating, no incentives
  ftc: 'https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials',
  categories: 'https://daltonluka.com/blog/google-my-business-categories', // full GBP category list
  energyStar: 'https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist',
  brownFriday: 'https://www.fox13news.com/news/day-after-thanksgiving-is-brown-friday-plumbers-busiest-day-year',
};
const ext = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const CHECKED = '(checked November 2026)';

export const combos = [
  // ------------------------------------------------------------------ HVAC
  {
    trade: 'hvac', service: 'google-business-profile',
    title: 'Google Business Profile for HVAC Companies',
    description: 'Google Business Profile management for HVAC companies: categories, services, seasonal posts and photos so you show up for AC repair and furnace searches.',
    h1: 'Google Business Profile management for HVAC companies',
    lede: `When an AC dies in July, homeowners don't browse. They search, look at the three businesses on the map and call one. Your Google Business Profile decides whether that's you.`,
    why: `<p>Your Google Business Profile decides whether an HVAC company shows up in the map results for "AC repair near me" and "furnace repair". ${ext(SRC.rank, 'Google says')} it ranks local results mainly on relevance, distance and prominence, and that complete, accurate information and more reviews help ${CHECKED}. For HVAC, relevance is where most profiles lose: one category, a few services, and nothing that tells Google you fix heat pumps or install mini-splits.</p><p>HVAC demand follows the weather. The first hot week brings "AC not blowing cold air" and "emergency AC repair". The first freeze brings "no heat" and "furnace repair near me". In between, people search for tune-ups, heat pump installs and "new AC unit cost". ${ext(SRC.energyStar, 'ENERGY STAR')} tells homeowners to check the cooling system in spring and the heating system in fall, so those shoulder months are when tune-up and maintenance-plan posts belong on your profile.</p><p>Categories do a lot of the work. Real Google categories for this trade include HVAC contractor, Air conditioning contractor, Air conditioning repair service, Heating contractor, Furnace repair service, Air duct cleaning service and Mechanical contractor (${ext(SRC.categories, 'full category list')}). Google asks you to pick the ${ext(SRC.guidelines, 'fewest categories')} that describe what your business is, not one for every service you sell, so most residential shops lead with HVAC contractor and add two to four that match the work they want more of. Services are a separate list: AC repair, AC installation, heat pumps, ductless mini-splits, furnace repair, duct cleaning, thermostats and maintenance plans can each get a short description.</p><p>Before calling, homeowners look at photos and reviews. Real condensers you set, clean furnace and air handler installs, tidy line sets and your branded vans say you're an established local shop. Reviews from both seasons say you're busy all year. If you run ServiceTitan, Housecall Pro, Jobber, FieldEdge or Successware, your completed jobs are the raw material for both. More on the basics in our <a href="/services/google-business-profile">Google Business Profile service</a>.</p>`,
    tactics: [
      ['Categories picked against your competitors', 'We check which primary and secondary categories the top three HVAC companies near you use, then choose yours: usually HVAC contractor first, with Air conditioning repair service, Heating contractor or Furnace repair service where they fit the work you want.'],
      ['A full services list', 'AC repair and installation, heat pumps, ductless mini-splits, furnace and boiler repair, duct cleaning, indoor air quality and maintenance plans, each with a plain description and no keyword stuffing.'],
      ['Posts that follow the season', 'Tune-up reminders in spring and fall, heat-wave and cold-snap availability when demand jumps, and maintenance-plan reminders in between, each with a real photo.'],
      ['Install photos every month', 'Condensers, furnaces, mini-split heads and duct work from your own jobs, so the profile looks active and shows the equipment you install.'],
      ['Hours that match reality', `If someone takes no-heat calls at night, the profile says so. If not, your hours say that, and missed calls get a text back instead of silence.`],
      ['Service area set correctly', `Up to 20 towns or ZIP codes, with the address removed if customers don't come to your shop, as Google's rules ask.`],
    ],
    faq: [
      ['Should my primary category be "HVAC contractor" or "Air conditioning contractor"?', `Both are real Google categories. Most full-service shops use HVAC contractor, but where AC is most of the work, Air conditioning contractor can fit better. We check what the top three near you use during the free audit and pick from there.`],
      ['Should I change my categories when the season changes?', `We rarely recommend it. Google wants categories that describe your business year round, and constant swaps make results hard to read. Seasonal focus belongs in posts, photos and the services list.`],
      [`Can I show up in towns where I don't have a shop?`, `Distance from the searcher is one of Google's three ranking factors, so one profile won't rank everywhere. A correct service area, steady reviews and a page per town on your website help you reach further.`],
      ['How much does Google Business Profile management for an HVAC company cost?', 'It costs {{PRICE:gbp}}. Month to month, no contract.'],
      ['Do you add our maintenance plan to the profile?', `Yes. It goes in the services list with a short description, and we post about it before each tune-up season, when homeowners are thinking about it.`],
    ],
  },
  {
    trade: 'hvac', service: 'review-generation',
    title: 'Google Reviews for HVAC Companies',
    description: 'Get more Google reviews for your HVAC company: a request after every service call and install, connected to Jobber, Housecall Pro or ServiceTitan. Done for you.',
    h1: 'More Google reviews for HVAC companies, after every call',
    lede: `Your techs finish a dozen jobs a day and the customers are happy. Almost none of them leave a review, because nobody asks at the right moment. We fix the asking.`,
    why: `<p>HVAC is one of the easiest trades to build Google reviews in, because the volume is there: tune-ups, repair calls and installs every day, often for customers who were sweating or freezing an hour earlier. ${ext(SRC.rank, 'Google says')} more reviews and positive ratings can help local ranking ${CHECKED}. Homeowners use them too. They check how many reviews you have, how recent they are, and what people say about the tech, the price and whether the fix lasted.</p><p>The problem is the asking. Techs finish a call, take payment and drive to the next one. Even when your job software can send a review request, someone has to switch it on, write a message people answer, follow up once and reply to what comes back. In peak season nobody has time, and that's exactly when you finish the most jobs. Our guide on <a href="/guides/servicetitan-review-requests">ServiceTitan review requests</a> covers the setup side for that platform.</p><p>Timing matters in HVAC. A no-cool repair on a hot afternoon is when the customer is most grateful, so the request should go out when the job is marked complete, not in a batch on Friday. Maintenance-plan visits are a second steady source: those customers already trust you and see you twice a year. Big installs deserve their own request after the new system has run for a day or two.</p><p>The rules are simple and strict. ${ext(SRC.reviewPolicy, "Google's review policy")} doesn't allow businesses to ask only happy customers, to discourage negative reviews, or to offer discounts or anything else in exchange for a review. The ${ext(SRC.ftc, "FTC's rule on consumer reviews")}, in force since October 21, 2024, adds federal penalties for buying fake reviews. So we ask every customer, never tell them what to write, and reply to every review, including the rare angry one about a diagnostic fee. More on why in <a href="/guides/is-review-gating-allowed">is review gating allowed</a>.</p>`,
    tactics: [
      ['A request after every completed call', 'Jobber connects through our official integration, Housecall Pro on its plan that allows integrations, and ServiceTitan, FieldEdge or Successware through Zapier or Make. When a job is marked complete, the customer gets a text and an email.'],
      ['Separate timing for installs', 'Repairs and tune-ups get a request the same day. New systems get one after a day or two of running, once the homeowner has felt the difference.'],
      ['Maintenance-plan members included', `Plan visits are a steady source of reviews from your most loyal customers. Regulars aren't asked after every single visit.`],
      ['Past-customer campaign to start', `A short, personal text to last season's customers, with one reminder, to get the count moving in the first weeks.`],
      ['Requests that name the tech', 'The message mentions the technician who came out, so the customer recognizes who is asking. We never tell customers what to write.'],
      ['Every review answered', 'Replies within a day or two in your voice, including the unhappy ones about wait times or diagnostic fees.'],
    ],
    faq: [
      ['Can we only ask customers we think are happy?', `No. Filtering who gets asked (review gating) breaks Google's rules and can cost you reviews. We ask every customer, which is also what keeps the profile safe.`],
      ['We use ServiceTitan. Do we need another tool?', `You don't need to learn one. ServiceTitan connects through Zapier or Make, so completed jobs trigger requests automatically, and we run the rest.`],
      ['How much does review generation for an HVAC company cost?', 'It costs {{PRICE:reviews}}. Month to month, no contract.'],
      ['When is the best time to ask an HVAC customer for a review?', `Right after the job is marked complete for repairs and tune-ups, while the relief is fresh. For a new system, a day or two later works better, once they've felt it run.`],
      ['Can our techs ask in person too?', `Yes, and it helps. We give your techs NFC review cards they tap on the customer's phone, so your review page opens right there.`],
    ],
  },
  {
    trade: 'hvac', service: 'contractor-websites',
    title: 'HVAC Website Design That Gets Calls',
    description: 'HVAC website design: fast on a phone, a page per service and town, reviews and click-to-call where homeowners decide. Built and run for you.',
    h1: 'HVAC website design built to get calls, not compliments',
    lede: `Most HVAC sites look fine and say nothing: a homepage, an "about us" and a contact form. Homeowners with a broken AC want to see that you fix their problem in their town, and a button to call you.`,
    why: `<p>An HVAC website has one job: turn the click from Google into a phone call. Someone with a dead AC opens your site from the map on their phone and decides in seconds. Do you fix this? Do you come to my town? Can I reach someone now? If those answers aren't on the first screen, they go back and tap the next company.</p><p>HVAC customers search for specific work: "AC repair [town]", "heat pump installation", "furnace replacement cost", "ductless mini-split installer", "AC maintenance plan". A site with one page for everything can't match all of those. Separate pages for AC repair, AC installation, heat pumps, mini-splits, furnace repair and replacement, duct work and your maintenance plan give Google a clear page to show for each search, and each one answers that customer's question directly. A page per town you serve, with jobs and reviews from that town, does the same for location.</p><p>HVAC buyers also have questions the site should answer before the call: what a diagnostic visit costs, whether you offer financing on a new system, which brands you install and service, whether you work on heat pumps, and whether you have a maintenance plan. Answering those on the page saves your CSR time and filters out calls you don't want.</p><p>Seasons matter here too. In summer the top of the homepage should push AC repair and same-day service; in winter, heating; in spring and fall, tune-ups. We change that banner with the season so it matches what people are searching for. If your job software has an online booking widget, as Jobber and Housecall Pro do, tune-ups can be booked straight from the page. Our guide to <a href="/guides/contractor-website-cost">contractor website costs</a> compares the options if you're weighing a DIY builder or an agency.</p>`,
    tactics: [
      ['A page per service', 'AC repair, AC installation, heat pumps, ductless mini-splits, furnace repair and replacement, duct work and maintenance plans, each with what to expect, what affects the price and real photos.'],
      ['A page per town', 'Written for each town you serve, with real jobs and reviews from there, not the same paragraph with the city name swapped.'],
      ['A homepage that changes with the season', 'AC repair up top in summer, heating in winter, tune-ups in spring and fall.'],
      ['Answers before the call', 'Your diagnostic fee if you have a set one, financing, the brands you service and your maintenance plan, so callers are ready to book.'],
      ['Built for phones', 'Fast on mobile, with tap-to-call, your hours and emergency availability always in view.'],
      ['Reviews where people decide', 'Your best Google reviews on the service and town pages people read before calling.'],
    ],
    faq: [
      ['Do I keep the website if I leave?', `Ask us about ownership on the audit call; we'll put it in writing before we build.`],
      ['Can you just fix my existing site?', `Often, yes. We check it in the free audit (title, description, headings and schema) and tell you whether it's worth fixing or rebuilding.`],
      ['How much does an HVAC website cost with you?', 'It costs {{PRICE:website}}. Month to month, no contract.'],
      ['Should an HVAC website show prices?', 'Show what you can stand behind, like a set diagnostic or tune-up fee and ranges for common jobs. Replacement quotes need a visit, and the page can say so and offer to book one.'],
      ['Can customers book a tune-up online?', 'Yes, if your job software has a booking widget, which Jobber and Housecall Pro do. We add it to the tune-up and maintenance plan pages.'],
    ],
  },

  // ------------------------------------------------------------------ PLUMBING
  {
    trade: 'plumbing', service: 'google-business-profile',
    title: 'Google Business Profile for Plumbers',
    description: 'Google Business Profile management for plumbers: the right categories, every service, emergency hours and photos so you show up for "plumber near me".',
    h1: 'Google Business Profile management for plumbers',
    lede: `A burst pipe doesn't wait for a comparison spreadsheet. Homeowners search "plumber near me", tap one of the three businesses on the map and call. Your profile is what gets you into that three.`,
    why: `<p>For plumbers, the Google Business Profile is often the whole sales process. A homeowner with a backed-up drain or water coming through the ceiling searches "plumber near me" or "emergency plumber", looks at the three businesses on the map and calls one. ${ext(SRC.rank, 'Google ranks')} those results on relevance, distance and prominence ${CHECKED}, and plumbing profiles usually lose on relevance: one category, no services, and hours that don't say whether anyone answers at night.</p><p>Plumbing demand has its own calendar. Frozen and burst pipes come with the first hard freeze. Clogged kitchen drains and disposals come with the holidays: Roto-Rooter calls the day after Thanksgiving "Brown Friday" and ${ext(SRC.brownFriday, 'reports about 50 percent more calls')} than an average Friday ${CHECKED}. Sump pumps and outdoor spigots come in spring. Water heaters fail all year, so "water heater repair", "tankless water heater installation" and "no hot water" are steady searches.</p><p>The primary category for almost every plumbing company is Plumber. Other real categories that can fit, if you do the work, are Drainage service, Septic system service, Gas installation service, Water softening equipment supplier, Bathroom remodeler and Water damage restoration service (${ext(SRC.categories, 'full category list')}). Google asks for the ${ext(SRC.guidelines, 'fewest categories')} that describe what the business is, so we add one only when it reflects a real part of your work. Everything else goes in the services list: drain cleaning, hydro jetting, water heater repair and replacement, tankless installs, leak detection, repiping, sewer line repair, camera inspections, sump pumps, toilets and fixtures.</p><p>Homeowners check three things before they call a plumber: recent reviews, real photos (your trucks, your team, a clean water heater install) and whether your hours cover their emergency. Plumbing is also a trade where fake listings are common and suspensions happen, so a profile with one real service area, consistent details everywhere and steady activity is the safer one. If yours has already been suspended, see <a href="/guides/google-business-profile-suspended">how to get a suspended profile back</a>.</p>`,
    tactics: [
      ['Plumber first, extras only where true', 'Plumber as the primary category, with Drainage service, Septic system service or Gas installation service added only if that work is a real part of your business.'],
      ['Every service listed', 'Drain cleaning, hydro jetting, water heaters (tank and tankless), leak detection, repiping, sewer lines and camera inspections, sump pumps and fixtures, each with a plain description.'],
      ['Hours that match reality', `If you take emergency calls, the profile says so and the phone gets answered. If you don't, the hours say that, and missed calls get a text back.`],
      ['Posts on the plumbing calendar', 'Pipe-freeze tips before the first cold snap, drain and disposal advice before Thanksgiving, sump pump checks in spring.'],
      ['Real job photos', 'Water heater installs, repipes, clean trench work and your trucks, uploaded every month so the profile looks active.'],
      ['Service area by town or ZIP', `Up to 20 areas within about two hours' drive, with the address removed if customers don't visit your shop, as Google asks.`],
    ],
    faq: [
      ['Should I list 24-hour service?', `Only if someone actually answers. Google and homeowners both notice when "open 24 hours" goes to voicemail. Missed-call text-back helps if you can't always pick up.`],
      ['My profile got suspended. Can you help?', 'Often, yes. We review why it happened and help you file the reinstatement request with the right documents.'],
      ['How much does Google Business Profile management for a plumber cost?', 'It costs {{PRICE:gbp}}. Month to month, no contract.'],
      ['Should I add "Water damage restoration service" as a category?', `Only if you do restoration work like drying and mitigation, not just fixing the leak. Google wants categories that describe what your business is, and a mismatched one can hurt more than it helps.`],
      ['Can I have a separate profile for drain cleaning?', `No. Google allows one profile per business location, so a second listing for the same plumbing company breaks its rules and risks suspension. Drain cleaning belongs in your services list and on its own page on your website.`],
    ],
  },
  {
    trade: 'plumbing', service: 'review-generation',
    title: 'Google Review Generation for Plumbers',
    description: 'More Google reviews for plumbing companies: a request after every job, a past-customer campaign and replies to every review. Done for you.',
    h1: 'More Google reviews for plumbers, without chasing customers',
    lede: `Plumbing customers are relieved when you leave, which is the perfect moment to ask for a review. Your crew is already driving to the next job. We make sure the ask still happens.`,
    why: `<p>When a homeowner compares plumbers on the map, reviews do most of the deciding. They look at the rating, the count and the date of the last few reviews, then read what people say about showing up on time, explaining the problem and charging what was quoted. ${ext(SRC.rank, 'Google says')} more reviews and positive ratings can help local ranking too ${CHECKED}. A plumber with fresh reviews every week looks busy and trusted. One whose last review is from last spring looks like a gamble.</p><p>Plumbing has a built-in moment to ask: the customer is relieved. The water is off, the drain runs, the hot water is back. That relief fades fast, so the request should go out when the job is closed, by text, with one tap to the review page. A single follow-up a couple of days later catches people who meant to and forgot.</p><p>Plumbing jobs vary, and every one deserves a request. A quick drain clearing and a full sewer line replacement both produce reviews that help: small-job reviews show you're fast and fair, big-job reviews show you can handle serious work. Late-night emergency calls often produce the most grateful customers, so their request goes out the next morning, not at 2 a.m.</p><p>Two rules keep it safe. ${ext(SRC.reviewPolicy, "Google's review policy")} doesn't allow businesses to ask only the customers they think are happy, to discourage negative reviews, or to offer anything in exchange. And replies matter: homeowners read how you answer a complaint about a price or a return visit, and a calm, specific reply often does more than the five-star reviews around it. We write those in your voice within a day or two. For software specifics, see our guides for <a href="/guides/jobber-google-reviews">Jobber</a>, <a href="/guides/housecall-pro-google-reviews">Housecall Pro</a> and <a href="/guides/workiz-google-reviews">Workiz</a>.</p>`,
    tactics: [
      ['Request when the job closes', 'Jobber connects through our official integration, Housecall Pro on its plan that allows integrations, and ServiceTitan or Workiz through Zapier or Make. A text goes out when the job is marked complete.'],
      ['One reminder, then stop', `A single follow-up two days later for anyone who didn't respond, so customers aren't nagged.`],
      ['Past customers first', 'A short campaign to customers from the last few months to get the review count moving in the first weeks.'],
      ['Every customer asked', `Big jobs and small, happy or not. Filtering is against Google's rules, and asking everyone builds a profile homeowners believe.`],
      ['Tap cards for the truck', `NFC review cards your plumbers tap on the customer's phone at the end of the job, for customers who'd rather do it on the spot.`],
      ['Replies to every review', 'Including the tough ones about price or a callback. Homeowners read how you respond.'],
    ],
    faq: [
      ['How many reviews do I need to compete?', 'It depends on your area. The free audit shows the review counts of the top plumbers near you, so you know the number to beat. Our guide on how many reviews you need explains the rest.'],
      ['Is this the same as your review software?', 'It runs on the same software, but we set it up and run it for you.'],
      ['How much does review generation for a plumbing company cost?', 'It costs {{PRICE:reviews}}. Month to month, no contract.'],
      ['Should we ask for reviews on emergency calls in the middle of the night?', 'Yes, but not in the middle of the night. The request goes out the next morning, when the customer is rested and still grateful.'],
      ['We use Workiz. Can you still connect?', `Yes. Workiz connects through Zapier or Make, so completed jobs trigger requests automatically. If you don't use job software at all, we work from your customer list.`],
    ],
  },
  {
    trade: 'plumbing', service: 'contractor-websites',
    title: 'Plumbing Website Design for More Calls',
    description: 'Plumbing website design: fast, mobile-first sites with a page per service and town, reviews and tap-to-call, so Google visitors turn into booked jobs.',
    h1: 'Plumbing websites that turn searches into booked jobs',
    lede: `Someone with water on the floor is on their phone. They need to see in five seconds that you handle their problem, in their town, and how to call you. Most plumbing sites make them hunt for it.`,
    why: `<p>A plumbing website is usually read on a phone, by someone with a problem that's getting worse. They came from the map or a search like "emergency plumber [town]" and need three answers right away: do you handle this, do you come here, and how do I reach you now. A big tap-to-call button, your hours and your service area at the top of every page answer all three.</p><p>Plumbing searches split by job, and each job is its own buyer. "Drain cleaning near me" is urgent and price-sensitive. "Tankless water heater installation" is a researched purchase. "Sewer line replacement" scares people, and they want to understand camera inspections, trenchless options and what affects the price before they call. A separate page for each, written in plain English with real photos, matches the search and answers the question. One "services" page with a bulleted list can't.</p><p>Town pages work the same way. A page for each town you serve, with details that are true there (older homes with galvanized pipe, hard water, common sewer problems) and jobs and reviews from that area, helps you show up beyond the town your shop is in. Copy-paste city pages with the name swapped do the opposite.</p><p>Trust signals matter more in plumbing than many owners think. Homeowners are letting a stranger into their house. Your license number where your state requires it, proof of insurance, real team photos and recent Google reviews on the page all reduce the fear of picking the wrong plumber. If your job software has online booking, we add it for planned work like water heater estimates, so the phone stays free for emergencies. Our guide to <a href="/guides/online-booking-for-home-services">online booking for home services</a> explains when it helps and when it doesn't.</p>`,
    tactics: [
      ['A page for each job', 'Drain cleaning, hydro jetting, water heaters (tank and tankless), leak detection, repiping, sewer line repair and camera inspections, each with what to expect and real photos.'],
      ['Town pages that are actually local', 'For the towns you serve, with local jobs, reviews and details true to that area, not copy-paste city pages.'],
      ['Emergency-first layout', 'Tap-to-call, hours and after-hours availability (if you offer it) at the top of every page on a phone.'],
      ['Trust up front', 'License, insurance, real team photos and recent reviews where homeowners decide.'],
      ['Online booking for planned work', 'Water heater estimates and fixture installs booked online through your job software, so emergencies still get through on the phone.'],
    ],
    faq: [
      ['Can the site take bookings?', 'Yes, if your job software has an online booking widget (Jobber, Housecall Pro and others do). We add it where it helps.'],
      ['How is this different from a template site?', 'Templates give you a homepage. We build around the searches your customers make and keep the site updated.'],
      ['How much does a plumbing website cost with you?', 'It costs {{PRICE:website}}. Month to month, no contract.'],
      ['Should a plumbing website list prices?', 'Set fees, like a service call or drain-clearing minimum, help people decide to call. Bigger jobs like repiping or sewer lines need ranges, an explanation of what changes the price and a way to book an inspection.'],
      ['Do you write the pages about our services?', 'Yes. We ask how you do the work, then write each page in plain English so it sounds like you and matches what customers search.'],
    ],
  },

  // ------------------------------------------------------------------ ROOFING
  {
    trade: 'roofing', service: 'google-business-profile',
    title: 'Google Business Profile for Roofers',
    description: 'Google Business Profile management for roofers: categories, services, project photos and posts so you show up for roof repair and replacement searches.',
    h1: 'Google Business Profile management for roofing contractors',
    lede: `Roof replacement is a big, rare purchase. Homeowners compare roofers carefully, and the comparison usually starts on the Google map: photos, reviews, and whether you look like a real, established company.`,
    why: `<p>Roof replacement is one of the biggest checks a homeowner writes, and the comparison usually starts on the Google map. People search "roofer near me", "roof repair", "roof leak repair" or "roof replacement [town]", then look hard at the profiles: how long you've been around, what your work looks like and what other homeowners say. ${ext(SRC.rank, 'Google ranks')} those results on relevance, distance and prominence ${CHECKED}, so a complete, active profile is the entry ticket.</p><p>Roofing demand comes in waves. Spring and summer storms bring hail and wind damage searches and a rush of inspections. Late summer and fall are when homeowners try to get a replacement done before winter. In colder areas, winter brings leaks and ice dams. After a big storm, out-of-town crews often show up and homeowners grow wary of strangers knocking, so a profile that clearly looks local, with years of reviews and photos from nearby streets, is what earns the call.</p><p>Roofing contractor is the primary category for nearly every roofer. Other real categories you can add if they match your work are Gutter service, Gutter cleaning service, Siding contractor, Skylight contractor, Insulation contractor, Sheet metal contractor and Window installation service (${ext(SRC.categories, 'full category list')}). There isn't a separate Google category for metal roofing or storm damage, so those go in the services list, along with repair, replacement, inspections, flat and low-slope roofs and emergency tarping.</p><p>Photos carry more weight in roofing than in almost any other trade. Homeowners want to see finished roofs, clean flashing and ridge lines, dumpsters on the driveway instead of the lawn, and crews working safely. Many roofers already shoot every job in CompanyCam or keep photos in AccuLynx, JobNimbus or Roofr. Uploaded each month, those photos keep the profile active and let people see your work before they let you on their house. More on winning roofing work in <a href="/guides/how-to-get-more-roofing-customers">how to get more roofing customers</a>.</p>`,
    tactics: [
      ['Roofing contractor first', 'Roofing contractor as primary, with Gutter service, Siding contractor or Skylight contractor added only where you do that work regularly.'],
      ['Project photos every month', 'Before-and-after shots from real jobs, pulled from your phone or CompanyCam, uploaded regularly and never stock.'],
      ['Services spelled out', 'Repair, replacement, inspections, storm and hail damage, metal roofing, flat roofs, gutters and emergency tarping, each with a short description.'],
      ['Posts after storms, without scare tactics', 'Short, helpful posts after hail or wind: what to look for, when to call and how to spot a storm chaser.'],
      ['A service area that reflects where you work', `Up to 20 towns or ZIP codes within about two hours of your base, with the address removed if customers don't visit.`],
    ],
    faq: [
      ['Do photos really matter for roofers?', 'For a trust purchase like a roof, yes. Homeowners look at your work before they let you on their house. Regular real photos also keep the profile active.'],
      ['Can you get us in the map pack for "roofer near me" across our whole area?', `Distance limits how far one profile reaches. We'll show you where you rank across your service area in the free audit and focus on the towns that matter most.`],
      ['How much does Google Business Profile management for a roofer cost?', 'It costs {{PRICE:gbp}}. Month to month, no contract.'],
      ['Should we set up a profile in each town we work after a storm?', `No. Google only allows profiles for real locations, and temporary or virtual offices get suspended. One strong profile with a correct service area is the safe route.`],
      ['Can we mention our manufacturer certification?', `Yes, in your description, posts and photos, as long as you actually hold it. We don't add badges or claims you can't back up.`],
    ],
  },
  {
    trade: 'roofing', service: 'review-generation',
    title: 'Google Reviews for Roofing Contractors',
    description: 'More Google reviews for roofers: requests after every roof, a past-customer campaign and replies. Presidential Roofing went from 27 to 43 reviews in 20 days.',
    h1: 'More Google reviews for roofing contractors',
    lede: `Roofs last decades, so a roofer can't count on repeat customers to leave reviews. Every new review has to come from a customer who just finished a job, which means the ask has to happen every time.`,
    why: `<p>Roofs last decades, so nearly every new review has to come from a homeowner who just finished a job with you. That makes asking on every job essential. Homeowners choosing a roofer read reviews closely: how many, how recent, and what people say about cleanup, communication, insurance claims and whether the crew showed up when promised. ${ext(SRC.rank, 'Google says')} more reviews and positive ratings can help local ranking ${CHECKED}.</p><p>The best moment to ask is right after the final walkthrough, when the new roof looks its best and the yard has been swept for nails. A short reminder a few days later catches the homeowners who meant to and forgot. Repairs and inspections count too: those customers often come back for a replacement, and their reviews show you handle small jobs honestly.</p><p>Insurance jobs deserve the same ask. A homeowner who went through a hail claim with you has a lot to say about how you handled the adjuster and the paperwork, and neighbors hit by the same storm are searching for exactly that.</p><p>We've done this for a roofer: <a href="/results/presidential-roofing">Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days</a> with a past-customer campaign and requests after every job. Most roofers have years of finished jobs whose customers were never asked, and that list is where the first jump comes from. Our guide on <a href="/guides/ask-past-customers-for-google-reviews">asking past customers for reviews</a> shows how to word it.</p><p>The rules apply to everyone. ${ext(SRC.reviewPolicy, "Google's review policy")} doesn't allow asking only happy customers, discouraging negative reviews, or offering anything in exchange, such as a gift card or a discount on gutters. The ${ext(SRC.ftc, "FTC's rule on fake reviews")}, in force since October 21, 2024, adds federal penalties for buying reviews.</p>`,
    tactics: [
      ['Past-customer campaign', 'A personal text to customers from recent jobs, with one reminder. This is where the first jump in reviews comes from.'],
      ['Request after the final walkthrough', 'Sent when the job is marked complete. Jobber connects through our official integration; AccuLynx, JobNimbus or Roofr through Zapier or Make; or we work from your job list.'],
      ['Repairs and inspections asked too', 'Small-job customers often become replacement customers later, and their reviews show you treat small work seriously.'],
      ['Every customer asked', `Retail and insurance jobs alike, no gating. It keeps the profile within Google's rules and makes the reviews believable.`],
      ['Replies to every review', 'Professional, in your voice, within a day or two, including any complaint about scheduling or cleanup.'],
    ],
    faq: [
      ['How fast can a roofer get more reviews?', 'The past-customer campaign usually brings the first wave. Presidential Roofing added 16 reviews in 20 days. After that, it depends on how many jobs you finish.'],
      ['We do insurance work. Is it OK to ask those customers?', `Yes. Ask every customer. Just don't offer anything in exchange for a review.`],
      ['How much does review generation for a roofing company cost?', 'It costs {{PRICE:reviews}}. Month to month, no contract.'],
      ['Our sales rep and crew are different people. Who asks?', 'The request comes from your company and can name the rep or project manager the homeowner dealt with most. Your crew lead can also tap an NFC review card on the homeowner\'s phone at the walkthrough.'],
      ['Can we ask customers from jobs we did years ago?', 'Yes. A review describes a real experience, even an older one. Expect fewer replies from older jobs, and keep the message honest about when you did the work.'],
    ],
  },
  {
    trade: 'roofing', service: 'contractor-websites',
    title: 'Roofing Website Design That Wins Jobs',
    description: 'Roofing website design: project galleries, a page per service and town, reviews and a clear way to request an inspection. Built and run for roofing contractors.',
    h1: 'Roofing websites that turn visits into inspections',
    lede: `A roof is a big decision. Homeowners will spend real time on your site checking your work, your reviews and whether you look established. Give them a reason to book the inspection.`,
    why: `<p>Roofing buyers research more than most home-service buyers. A replacement is expensive and rare, so homeowners spend real time on your site: they look at your projects, check your reviews, try to understand repair versus replacement, and look for signs you're established and will be around to honor a warranty. Your site has to answer those questions and make booking an inspection the easy next step.</p><p>Searches tell you which pages to build: "roof replacement [town]", "roof repair near me", "hail damage roof inspection", "metal roof installation", "flat roof repair", "how much does a new roof cost". Each deserves its own page covering what the job involves, how long it takes, what affects the price (pitch, layers to tear off, materials, decking) and real photos from that kind of job. A single "Roofing Services" page can't rank for all of them or answer any of them well.</p><p>Storm work changes the site's job. After hail or high wind, homeowners search for inspections and try to understand insurance claims. A clear page on how you handle storm damage, what an inspection includes and how you work with the adjuster earns more trust than a "Free Roof Inspection!" banner, and it sets you apart from storm chasers.</p><p>Credentials belong where people decide. Manufacturer certifications you actually hold, your license and insurance, warranty details, years in business and your best Google reviews go on the service pages, not just the About page. Project galleries organized by town and roof type let a homeowner see a roof like theirs on a street near theirs. If your crews already shoot every job in CompanyCam, keeping the gallery fresh is easy. For budget context, see our guide to <a href="/guides/contractor-website-cost">contractor website costs</a>.</p>`,
    tactics: [
      ['Project galleries by town and roof type', 'Real before-and-after photos, organized so homeowners find a roof like theirs.'],
      ['Service pages', 'Repair, replacement, inspections, storm damage, metal roofing, flat roofs and gutters, each explaining what happens and what affects the price.'],
      ['A storm and insurance page', 'What an inspection includes and how you work with adjusters, in plain English.'],
      ['Inspection requests everywhere', 'A short form and tap-to-call on every page, not buried on a contact page.'],
      ['Reviews and credentials', 'Google reviews, license, insurance, warranty details and manufacturer certifications you actually hold.'],
    ],
    faq: [
      ['Should we list prices on the site?', 'Ranges and what affects the price help people decide to call. Exact quotes need an inspection, and the site can say so.'],
      ['Can you show our certifications?', `Yes, any you actually hold. We don't add badges you don't have.`],
      ['How much does a roofing website cost with you?', 'It costs {{PRICE:website}}. Month to month, no contract.'],
      ['Do we need a separate page for each town?', `For the towns that matter most, yes, as long as each has real local content: jobs, photos and reviews from that area. Thin pages with the town name swapped don't help.`],
      ['Can the site help with storm-season leads?', 'Yes. We keep a storm-damage page ready and add a seasonal banner when hail or wind hits your area, both pointing at the inspection form and your phone.'],
    ],
  },

  // ------------------------------------------------------------------ ELECTRICIANS
  {
    trade: 'electricians', service: 'google-business-profile',
    title: 'Google Business Profile for Electricians',
    description: 'Google Business Profile management for electricians: categories, services like panel upgrades and EV chargers, photos and posts so you show up on Maps.',
    h1: 'Google Business Profile management for electricians',
    lede: `Homeowners searching for an electrician want two things: someone licensed, and someone who can come soon. Your Google profile has to show both before they scroll past.`,
    why: `<p>Electrical searches range from small and urgent to big and planned. "Electrician near me", "outlet not working" and "breaker keeps tripping" are today problems. "Panel upgrade", "EV charger installation", "whole house generator installation" and "recessed lighting installation" are projects people research. Most electrician profiles show up for their name and "electrician" and miss the rest, because nothing on the profile shows Google they do that work. ${ext(SRC.rank, 'Google ranks')} local results on relevance, distance and prominence ${CHECKED}.</p><p>Categories help with relevance. Electrician is the primary for almost every residential shop. Real secondary categories that fit electrical work include Electrical installation service, Lighting contractor, Electric vehicle charging station contractor, Solar energy system service and Security system installation service (${ext(SRC.categories, 'full category list')}). Add only what describes a real part of your business, since Google asks for the ${ext(SRC.guidelines, 'fewest categories')} that describe what you are. Some similar-sounding categories, like Electric generator shop or Electrical supply store, describe stores, not contractors. The services list carries the rest: panel upgrades, EV chargers, generators, rewiring, lighting, ceiling fans, surge protection, troubleshooting and inspections.</p><p>Electrical work is less seasonal than HVAC, but it has patterns. Storm season and outages bring generator and surge protection searches. Summer loads trip old breakers. The holidays bring lighting and outlet work, and spring brings remodels and the home-sale inspections that turn up repairs. EV purchases keep charger installs coming all year.</p><p>Homeowners can't judge electrical work, so they look for signals: a license, insurance, clean photos and reviews that say you were on time, explained the problem and pulled the permit. Photos of tidy panels with labeled breakers, finished charger installs and generator pads show skill better than a slogan. Your license number goes wherever your state requires it, usually in the description and on your website. If you run ServiceTitan, Jobber, Housecall Pro or Workiz, completed jobs are the source for photos and review requests. Service-area setup is covered in <a href="/guides/google-business-profile-service-area">our service area guide</a>.</p>`,
    tactics: [
      ['Categories that fit', 'Electrician as primary, with Electrical installation service, Lighting contractor or Electric vehicle charging station contractor only where they match work you do.'],
      ['Profitable services listed', 'Panel upgrades, EV chargers, generators, rewiring, lighting, surge protection and troubleshooting, each with a short description.'],
      ['Photos of real work', 'Clean panels, labeled breakers, finished charger and generator installs. They show skill better than any description.'],
      ['Posts tied to the season', 'Generators and surge protection before storm season, lighting before the holidays, panel checks before summer.'],
      ['License and insurance visible', 'In the description and on your site, as your state requires, because homeowners look for them.'],
    ],
    faq: [
      ['Should I add EV charger installation to my profile?', `If you do that work, yes. List it as a service, and consider the Electric vehicle charging station contractor category if chargers are a regular part of your business.`],
      ['Can you help with reviews too?', 'Yes. Reviews are one of the biggest map-pack factors. See review generation for electricians.'],
      ['How much does Google Business Profile management for an electrician cost?', 'It costs {{PRICE:gbp}}. Month to month, no contract.'],
      ['Should I add "Solar energy system service" if we do solar work?', 'Only if solar is a real, regular part of your work. If you mostly do panel upgrades and wiring for solar installers, list that as a service instead.'],
      ['We do commercial work too. Do we need two profiles?', 'No. One business at one location gets one profile. List commercial services alongside residential ones, and give each its own page on your website.'],
    ],
  },
  {
    trade: 'electricians', service: 'review-generation',
    title: 'Google Reviews for Electricians',
    description: 'More Google reviews for electricians: a request after every job, a past-customer campaign and replies to every review. Done for you, month to month.',
    h1: 'More Google reviews for electricians',
    lede: `Electrical work is invisible when it's done right, so customers forget to mention it. A short, personal request right after the job turns that quiet satisfaction into a review.`,
    why: `<p>Homeowners can't inspect electrical work themselves, so they rely on what other homeowners say. Was the electrician on time? Clean? Clear about the price before starting? Did they pull the permit, and does everything work? Reviews answer exactly those questions, which is why they carry so much weight when someone compares electricians on the map. ${ext(SRC.rank, 'Google says')} more reviews and positive ratings can help local ranking too ${CHECKED}.</p><p>Electrical work is invisible when it's done right. The lights come on, the breaker stops tripping, and the customer forgets you were there. That's why a short, personal request right after the job matters more in this trade than in most. Wait a week and you're asking about something the customer has stopped thinking about.</p><p>The mix of jobs helps. Service calls for outlets and breakers are frequent and quick, so they build volume. Panel upgrades, EV chargers and generators are bigger and rarer, and those customers often write longer, more detailed reviews, ideally once the inspection has passed and they know the job is finished. Both kinds matter, because a homeowner researching a charger install reads reviews that mention one. ${ext(SRC.reviewPolicy, "Google's review policy")} doesn't let businesses ask for specific content, so we never tell customers what to write; asking every customer builds that range on its own.</p><p>Replies matter too. A short, specific reply that thanks the customer and mentions the work shows other homeowners you pay attention, and a calm reply to a complaint about price or a return visit often reassures readers more than another five-star review. We connect to Jobber through our official integration and to Housecall Pro on its plan that allows integrations; ServiceTitan, Workiz and others connect through Zapier or Make. More detail in our <a href="/guides/electrician-review-management">electrician review management guide</a>.</p>`,
    tactics: [
      ['Request after every job', 'Sent when the job is marked complete, by text and email, from your job software or a customer list.'],
      ['Past-customer campaign', 'A short, personal message to recent customers to start the flow, with one reminder.'],
      ['Permitted jobs timed right', `Panel upgrades, EV chargers and generators get their request after the inspection passes, when the customer knows it's all done.`],
      ['Every customer asked', `No gating and no incentives. It keeps you within Google's rules.`],
      ['Replies to every review', 'Mentioning the job, like a panel upgrade or charger install, which also shows homeowners searching for that work what you do.'],
      ['NFC review cards', `Cards your electricians tap on the customer's phone at the end of the visit to open your review page.`],
    ],
    faq: [
      ['Is there a guide for electrician reviews?', 'Yes: our electrician review management guide covers timing, wording and what to avoid.'],
      ['Do you work with my software?', 'Jobber connects through our official integration and Housecall Pro on its plan that allows integrations. ServiceTitan, Workiz and others connect through Zapier or Make, or we work from a customer list.'],
      ['How much does review generation for an electrician cost?', 'It costs {{PRICE:reviews}}. Month to month, no contract.'],
      ['Should we wait for the inspection before asking?', 'For permitted jobs like panel upgrades, yes, so the customer knows the job is fully done. For service calls, ask the same day.'],
      ['Can we offer a discount for a review?', `No. Google removes reviews posted for incentives, and the FTC's 2024 rule on reviews adds penalties for paying for favorable ones. Ask everyone, offer nothing, and make it easy.`],
    ],
  },
  {
    trade: 'electricians', service: 'contractor-websites',
    title: 'Electrician Website Design for More Calls',
    description: 'Electrician website design: a page per service and town, licensing and reviews up front, tap-to-call on every page. Built and run for electrical contractors.',
    h1: `Electrician websites that show you're the safe choice`,
    lede: `Hiring an electrician is a safety decision. Your website should make it obvious, in seconds, that you're licensed, reviewed, local and easy to reach.`,
    why: `<p>Hiring an electrician is a safety decision, and homeowners know it. When someone clicks through to your site from the map, they want to see quickly that you're licensed, insured, local, well reviewed and able to handle their specific job. A site that makes them dig for any of that sends them back to the next result.</p><p>Electrical searches are job-specific: "panel upgrade cost", "200 amp service upgrade", "EV charger installation [town]", "whole house generator installer", "recessed lighting installation", "knob and tube wiring replacement", "electrical inspection for home sale". A page for each kind of work you want answers that searcher directly: what the job involves, whether a permit is needed, how long it takes, what affects the price, and photos of your work. Those pages also give Google a clear page to show for each search.</p><p>Some of these jobs are research-heavy. EV charger buyers want to know whether their panel can handle a charger and which one to buy. Generator buyers want to understand sizing and transfer switches. Owners of older homes worry about aluminum or knob-and-tube wiring. Answering those questions plainly earns the call from people who are still comparing.</p><p>Trust details belong on every page, not in the footer: your license number where your state requires it, proof of insurance, how you handle permits and inspections, and your best Google reviews. Town pages with real jobs from each area help you reach the communities around your shop. And because some electrical problems are emergencies (sparking outlets, burning smells), tap-to-call and your after-hours policy should be visible on every page on a phone. See what's included in our <a href="/services/contractor-websites">contractor websites</a> service.</p>`,
    tactics: [
      ['Service pages', 'Panel upgrades, EV chargers, generators, rewiring, lighting and troubleshooting, each with what to expect, permits and what affects the price.'],
      ['Answers for researched jobs', 'Plain-English explanations of panel capacity for chargers, generator sizing and old wiring, so homeowners who are comparing call you.'],
      ['License, insurance and permits up front', 'Visible on every page, not hidden in the footer.'],
      ['Town pages', 'For the towns you serve, with real local jobs and reviews.'],
      ['Tap-to-call and quote requests', 'On every page, fast on a phone, with your after-hours policy clear.'],
    ],
    faq: [
      ['Do you write the content?', 'Yes. We interview you about the work, then write the pages so they sound like you and match how customers search.'],
      ['Can you add our reviews to the site?', 'Yes. Your best Google reviews go on the pages people read before calling.'],
      ['How much does an electrician website cost with you?', 'It costs {{PRICE:website}}. Month to month, no contract.'],
      ['Should we have separate residential and commercial pages?', 'Yes, if you do both. The buyers, questions and jobs are different, and separate pages let each one speak to its reader.'],
      ['Can the site take EV charger quote requests with photos?', 'Yes. A quote form can ask for photos of the panel and the parking spot, which helps you price the job before the visit.'],
    ],
  },

  // ------------------------------------------------------------------ HANDYMAN
  {
    trade: 'handyman', service: 'google-business-profile',
    title: 'Google Business Profile for Handymen',
    description: 'Google Business Profile management for handyman businesses: categories, a full service list, photos and posts so you show up for small-job searches.',
    h1: 'Google Business Profile management for handyman businesses',
    lede: `Handyman searches are endless and specific: "mount TV", "fix drywall", "install ceiling fan". A profile that only says "handyman" misses most of them.`,
    why: `<p>Homeowners rarely search for "handyman" alone. They search for the job: "TV mounting near me", "drywall repair", "ceiling fan installation", "furniture assembly", "door repair", "caulk bathtub". A profile that only says "handyman" shows up for a fraction of those. ${ext(SRC.rank, 'Google ranks')} local results on relevance, distance and prominence ${CHECKED}, and a full services list is the easiest way to show relevance for dozens of small jobs.</p><p>The primary category is Handyman/Handywoman/Handyperson, which is how Google writes it. Secondary categories should reflect work you do often, not occasionally: Carpenter, Painter, Dry wall contractor (Google spells it as two words), Deck builder, Fence contractor, Tile contractor, Pressure washing service or Gutter cleaning service (${ext(SRC.categories, 'full category list')}). Google asks for the ${ext(SRC.guidelines, 'fewest categories')} that describe what your business is. Common jobs like TV mounting, furniture assembly and picture hanging have no category at all, so they belong in the services list.</p><p>Be careful with categories that imply a license. Adding Electrician, Plumber or General contractor when you aren't licensed for that work misleads customers and can cause trouble with your state. Many states limit what handymen can take on without a contractor's license, so check your state's rules before you list bigger work.</p><p>Handyman demand has a rhythm. Spring and summer bring decks, fences, screens and outdoor repairs. Fall brings gutters, weatherstripping and winter prep. The holidays bring hanging lights and getting the house ready for guests. Move-ins, move-outs and pre-listing punch lists for real estate agents come all year. Posts that follow that calendar keep the profile active.</p><p>Because you're in people's homes, trust is the sale. Before-and-after photos of everyday jobs, a correct service area (most handymen work from home and should remove their address) and recent reviews do the convincing. More ideas in <a href="/guides/handyman-marketing-ideas">handyman marketing ideas</a>.</p>`,
    tactics: [
      ['The right categories', `Handyman/Handywoman/Handyperson as primary, with Carpenter, Painter or Dry wall contractor only if you do that work regularly, and nothing that implies a license you don't hold.`],
      ['Every job type listed', 'TV mounting, drywall repair, doors, fixtures, ceiling fans, furniture assembly, caulking, small carpentry and honey-do lists, each a listed service.'],
      ['Photos of small jobs', 'Before-and-after shots of patched drywall, mounted TVs and rehung doors. They show range and care.'],
      ['Posts on the home-maintenance calendar', 'Outdoor repairs in spring, gutters and weatherstripping in fall, lights and guest prep before the holidays.'],
      ['Service area, address removed', 'Up to 20 towns or ZIP codes, with your home address off the profile, as Google asks of businesses that go to the customer.'],
    ],
    faq: [
      ['Should a handyman use a storefront address?', 'Most handyman businesses work from home and should hide the address and list a service area instead. We set that up correctly.'],
      ['Is there more on handyman marketing?', 'Yes: see our handyman marketing ideas guide and the full handyman marketing plan.'],
      ['How much does Google Business Profile management for a handyman cost?', 'It costs {{PRICE:gbp}}. Month to month, no contract.'],
      ['Can I add "Electrician" or "Plumber" to my handyman profile?', `Only if you hold the license your state requires for that work. Otherwise, list the small tasks you're allowed to do as services instead.`],
      ['Should I list furniture assembly and TV mounting?', `Yes. Neither has its own Google category, so the services list is where they go, and both are common, specific searches.`],
    ],
  },
  {
    trade: 'handyman', service: 'review-generation',
    title: 'Google Reviews for Handyman Businesses',
    description: 'More Google reviews for handyman businesses: a quick request after every job, a past-customer campaign and replies to every review. Done for you.',
    h1: 'More Google reviews for handyman businesses',
    lede: `Handymen finish lots of small jobs for happy customers, which should mean lots of reviews. It doesn't, because nobody asks. A request after every job changes that fast.`,
    why: `<p>For a handyman, trust is the whole sale. You're inside someone's home, often while they're at work or with kids around. Before they let you in, homeowners read reviews for the things that matter to them: on time, tidy, fair on price, did what they said. A handyman with a steady stream of recent reviews that sound like real neighbors wins over one with a handful from years ago. ${ext(SRC.rank, 'Google says')} more reviews and positive ratings can help local ranking too ${CHECKED}.</p><p>Handyman work has a real advantage here: volume. Jobs are frequent, short and often repeat, so a request after each one builds reviews faster than in trades that finish a few big jobs a month. The catch is that many handymen run the business from their phone, invoice in QuickBooks, Square or Jobber, and never set up any asking at all.</p><p>The best moment to ask is when the job is done and paid, while the customer is looking at the mounted TV or the patched wall. A short text with one link, then one reminder, is enough. Small jobs count: a two-hour visit to fix a door and hang shelves is exactly the kind of review other homeowners want to read, because it's the kind of job they need. Tapping an NFC review card on the customer's phone before you leave works well too; see our guide to <a href="/guides/google-review-qr-code-and-nfc-cards">review QR codes and NFC cards</a>.</p><p>Repeat customers are common, so we keep the asks sensible: one request per customer, not after every visit, unless it's been a long time. Customers who hand you a list of jobs often write the most detailed reviews.</p><p>The rules are the same as for any business. ${ext(SRC.reviewPolicy, "Google's review policy")} doesn't allow asking only happy customers, discouraging negative reviews or offering a discount for a review. Asking everyone, and replying to every review in your own voice, is what builds a profile people believe.</p>`,
    tactics: [
      ['A request after every job', 'By text when the job is done or invoiced. Jobber connects through our official integration, Housecall Pro on its plan that allows integrations, and QuickBooks or Square through Zapier or Make.'],
      ['No software, no problem', 'We import your customer list and start from there.'],
      ['Past-customer campaign', 'A short message to recent customers to get the count moving.'],
      ['Sensible for repeat customers', `Regulars are asked once, not after every visit, and again only if it's been a long time.`],
      ['Every customer asked', `No gating and no discounts for reviews, within Google's rules.`],
      ['Replies to every review', 'In your voice, mentioning the job, which also tells other homeowners what kinds of work you take.'],
    ],
    faq: [
      [`I don't use job software. Can you still do this?`, 'Yes. We import your customer list, or connect to your invoicing tool through Zapier or Make.'],
      ['Should I ask for reviews on small jobs?', `Yes. Small jobs are most of a handyman's work, and reviews about them are exactly what other homeowners want to read.`],
      ['How much does review generation for a handyman business cost?', 'It costs {{PRICE:reviews}}. Month to month, no contract.'],
      ['How quickly can a handyman build reviews?', 'Usually faster than most trades, because handymen finish many short jobs. How fast depends on your weekly job count and how many past customers you have to start with.'],
      ['Can I hand customers something to review on the spot?', `Yes. NFC review cards open your Google review page with a tap on the customer's phone, which works well at the end of a visit.`],
    ],
  },
  {
    trade: 'handyman', service: 'contractor-websites',
    title: 'Handyman Website Design That Books Jobs',
    description: 'Handyman website design: a clear list of jobs you do, service-area pages, reviews and an easy way to request a quote. Built and run for handyman businesses.',
    h1: 'Handyman websites that make booking easy',
    lede: `People hiring a handyman want to know three things: do you do this job, do you come to my area, and how do I book you. Your website should answer all three without scrolling.`,
    why: `<p>People hiring a handyman want three answers: do you do this job, do you come to my area, and how do I book you. Most handyman sites answer the third with a contact form and leave the first two vague. A homeowner looking for someone to mount a TV and patch two holes wants to see "TV mounting" and "drywall repair" on your site, in plain words, with photos.</p><p>Handyman searches are job-first: "TV mounting [town]", "drywall repair near me", "furniture assembly service", "ceiling fan installation", "door repair". Pages for your most common jobs answer those searches directly and give Google something specific to show. The rest go in a clear jobs list people can scan and add to their visit. A homeowner who came for one job and sees you also hang shelves, recaulk tubs and fix screens often books a longer visit.</p><p>Pricing guidance helps more in handyman work than in most trades, because the jobs are small and customers worry about minimums. If you charge an hourly rate, a trip fee or a minimum, say so. If you sell half-day or full-day blocks, explain what usually fits in one. It filters out jobs you don't want and makes the ones you do want easier to book.</p><p>Photos close the gap. A quote form that accepts pictures lets you price small work without driving out. Before-and-after galleries of everyday jobs show care and range. Service-area pages for the towns and neighborhoods you cover, with real local jobs, help you show up where you want to work. Reviews on every page and proof of insurance answer the trust question. Some states limit what handymen can do without a contractor's license, so the site should describe your work accurately. If you want online booking, our guide to <a href="/guides/online-booking-for-home-services">online booking for home services</a> covers the trade-offs.</p>`,
    tactics: [
      ['A clear jobs list', 'Every type of job you take, grouped and easy to scan, with photos, plus full pages for the most-searched ones.'],
      ['Pricing that sets expectations', 'Your hourly rate, minimum, trip fee or day-block pricing, explained in plain words.'],
      ['Photo quote requests', 'A short form where people describe or photograph the job, plus tap-to-call.'],
      ['Service-area pages', 'For the towns and neighborhoods you cover, with real local jobs.'],
      ['Reviews on every page', 'Short quotes from real Google reviews where people decide.'],
    ],
    faq: [
      ['Can customers send photos of the job?', 'Yes. Quote forms can accept photos, which saves you a trip to price small jobs.'],
      ['Do you also handle my Google profile?', 'Yes, and the two work best together. See Google Business Profile for handymen.'],
      ['How much does a handyman website cost with you?', 'It costs {{PRICE:website}}. Month to month, no contract.'],
      ['Should a handyman website show prices?', `Show what's simple and true, like your hourly rate, minimum or trip fee. It saves both sides time and filters out jobs that aren't a fit.`],
      ['Can customers book online?', 'Yes, if your job software has a booking widget, which Jobber and Housecall Pro do. For handymen, booking a time block usually works better than booking a single specific job.'],
    ],
  },
].map((c) => ({ ...c, path: `/marketing/${c.trade}/${c.service}` }));
