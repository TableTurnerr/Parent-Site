// Trade + service pages: /marketing/<trade>/<service>. One page per real search intent ("Google Business Profile for
// HVAC companies", "roofing website design"), each written for that trade, not find-and-replace.
// Local SEO is deliberately left out: the trade pages (/marketing/<trade>) already target "<trade> SEO", and a
// second page for the same phrase would compete with them.
//
// Rules: no invented stats or clients. GBP category names are Google's own. Keep titles under ~50 characters
// (the site adds " | TableTurnerr").
export const comboServices = ['google-business-profile', 'review-generation', 'contractor-websites'];
export const comboTrades = ['hvac', 'plumbing', 'roofing', 'electricians', 'handyman'];

export const combos = [
  // ------------------------------------------------------------------ HVAC
  {
    trade: 'hvac', service: 'google-business-profile',
    title: 'Google Business Profile for HVAC Companies',
    description: 'Google Business Profile management for HVAC companies: categories, services, seasonal posts and photos so you show up for AC repair and furnace searches. Done for you.',
    h1: 'Google Business Profile management for HVAC companies',
    lede: 'When an AC dies in July, homeowners don\'t browse. They search, look at the three businesses on the map and call one. Your Google Business Profile decides whether that\'s you.',
    why: '<p>HVAC searches are seasonal and urgent: "AC repair near me" in summer, "furnace repair" the first cold week. Google picks the map results largely from how relevant, close and prominent your profile looks for that exact search.</p><p>Most HVAC profiles we audit list one category and a handful of services, so they only show up for their name and "HVAC contractor", not for the repair searches that actually ring the phone.</p>',
    tactics: [
      ['Categories that match the work', 'A primary category like "HVAC contractor" plus secondary ones such as "Air conditioning repair service", "Furnace repair service" and "Heating contractor", chosen around what you want more of.'],
      ['Every service listed', 'AC repair, AC installation, furnace repair, heat pumps, duct cleaning, maintenance plans: each one listed with a short description.'],
      ['Seasonal posts', 'Tune-up reminders before summer and winter, emergency availability during heat waves, and recent installs with real photos.'],
      ['Service area set correctly', 'The towns you actually serve, with the address hidden if you work from home or a shop customers don\'t visit.'],
    ],
    faq: [
      ['Should my HVAC profile be "HVAC contractor" or "Air conditioning contractor"?', 'It depends on what you want to rank for and what your competitors use. We check the top three in your area during the free audit and pick the primary category from there.'],
      ['Can I show up in towns I don\'t have an office in?', 'Distance from the searcher matters, so you won\'t rank everywhere. A correctly set service area, reviews that mention those towns and a page per town on your site help you reach further.'],
    ],
  },
  {
    trade: 'hvac', service: 'review-generation',
    title: 'Google Reviews for HVAC Companies',
    description: 'Get more Google reviews for your HVAC company: a request after every service call and install, connected to ServiceTitan, Housecall Pro or Jobber. Done for you.',
    h1: 'More Google reviews for HVAC companies, after every call',
    lede: 'Your techs finish a dozen jobs a day and the customers are happy. Almost none of them leave a review, because nobody asks at the right moment. We fix the asking.',
    why: '<p>HVAC is high volume: tune-ups, repairs and installs every day. That makes it one of the easiest trades to build reviews in, if every completed job triggers a request. Review count and recency are both things homeowners check before calling.</p><p>Most HVAC software can send a request, but someone still has to set it up, write messages people answer, follow up and reply to reviews. That\'s the part we run.</p>',
    tactics: [
      ['A request after every job', 'Connected to ServiceTitan, Housecall Pro or Jobber, so a request goes out when the job is marked complete, by text and email.'],
      ['Past-customer campaign', 'A short, personal message to last season\'s customers to start the flow, with one reminder.'],
      ['Tech names in the message', 'Requests mention the technician, which makes them personal and means reviews often name your techs.'],
      ['Every review answered', 'Replies within a day or two, including the rare unhappy customer, written in your voice.'],
    ],
    faq: [
      ['Can we only ask customers we think are happy?', 'No. Filtering who gets asked (review gating) breaks Google\'s rules and can cost you reviews. We ask every customer, which is also what keeps the profile safe.'],
      ['We use ServiceTitan. Do we need another tool?', 'You don\'t need to learn one. We connect to ServiceTitan, Housecall Pro or Jobber and run the requests for you.'],
    ],
  },
  {
    trade: 'hvac', service: 'contractor-websites',
    title: 'HVAC Website Design That Gets Calls',
    description: 'HVAC website design for home-service companies: fast on a phone, a page per service and town, reviews and click-to-call where homeowners decide. Built and run for you.',
    h1: 'HVAC website design built to get calls, not compliments',
    lede: 'Most HVAC sites look fine and say nothing: a homepage, an "about us" and a contact form. Homeowners with a broken AC want to see that you fix their problem in their town, and a button to call you.',
    why: '<p>Your website backs up your Google profile. When someone clicks through from the map, they check three things in seconds: do you do this, do you serve my area, and can I reach you now.</p><p>Separate pages for AC repair, furnace repair, heat pumps and each town you serve also give Google more reasons to show you for those searches.</p>',
    tactics: [
      ['A page per service', 'AC repair, AC installation, furnace repair, heat pumps, maintenance plans, each with what it costs to diagnose, what to expect and real photos.'],
      ['A page per town', 'Written for the towns you serve, with jobs and reviews from that area, not the same paragraph with the city swapped.'],
      ['Built for phones', 'Fast to load on mobile, with tap-to-call and your hours always in view.'],
      ['Reviews where people decide', 'Your best Google reviews on the pages people read before calling.'],
    ],
    faq: [
      ['Do I keep the website if I leave?', 'Ask us about ownership on the audit call; we\'ll put it in writing before we build.'],
      ['Can you just fix my existing site?', 'Often, yes. We check it in the free audit (title, description, headings and schema) and tell you whether it\'s worth fixing or rebuilding.'],
    ],
  },

  // ------------------------------------------------------------------ PLUMBING
  {
    trade: 'plumbing', service: 'google-business-profile',
    title: 'Google Business Profile for Plumbers',
    description: 'Google Business Profile management for plumbers: the right categories, every service, emergency hours and photos so you show up for "plumber near me". Done for you.',
    h1: 'Google Business Profile management for plumbers',
    lede: 'A burst pipe doesn\'t wait for a comparison spreadsheet. Homeowners search "plumber near me", tap one of the three businesses on the map and call. Your profile is what gets you into that three.',
    why: '<p>Plumbing searches are often emergencies, and many happen outside business hours. Profiles with accurate hours, emergency service clearly listed and recent reviews tend to win those calls.</p><p>Plumbing also covers very different jobs: drains, water heaters, repiping, sewer lines. Each one is its own search, and your profile should show you do it.</p>',
    tactics: [
      ['Plumbing categories done right', '"Plumber" as primary, with secondary categories like "Drainage service" or "Water damage restoration service" only where they match work you do.'],
      ['Every service listed', 'Drain cleaning, water heater repair and installation, leak detection, repiping, sewer line work, each listed separately.'],
      ['Hours that match reality', 'If you take emergency calls, your hours and profile say so. If you don\'t, they don\'t.'],
      ['Photos and posts', 'Real job photos and short posts about recent work, so the profile looks active.'],
    ],
    faq: [
      ['Should I list 24-hour service?', 'Only if someone actually answers. Google and homeowners both notice when "open 24 hours" goes to voicemail. Missed-call text-back helps if you can\'t always pick up.'],
      ['My profile got suspended. Can you help?', 'Often, yes. We review why it happened and help you file the reinstatement request with the right documents.'],
    ],
  },
  {
    trade: 'plumbing', service: 'review-generation',
    title: 'Google Review Generation for Plumbers',
    description: 'More Google reviews for plumbing companies: a request after every job, a past-customer campaign and replies to every review, connected to your job software. Done for you.',
    h1: 'More Google reviews for plumbers, without chasing customers',
    lede: 'Plumbing customers are relieved when you leave, which is the perfect moment to ask for a review. Your crew is already driving to the next job. We make sure the ask still happens.',
    why: '<p>When a homeowner compares plumbers on the map, review count, rating and how recent the reviews are do a lot of the deciding. A plumber with steady new reviews looks busy and trusted; one whose last review is from last year looks risky.</p><p>The fix isn\'t complicated: ask every customer, at the right time, in a way that takes them 30 seconds. It just has to happen on every job.</p>',
    tactics: [
      ['Request when the job closes', 'Connected to Jobber, Housecall Pro, ServiceTitan or Workiz, so a text goes out when the job is marked complete.'],
      ['Past customers first', 'A short campaign to recent customers to get the review count moving in the first weeks.'],
      ['Every customer asked', 'No filtering out customers who might be unhappy. It\'s against Google\'s rules, and asking everyone is what builds a believable profile.'],
      ['Replies to every review', 'Including the tough ones. Homeowners read how you respond.'],
    ],
    faq: [
      ['How many reviews do I need to compete?', 'It depends on your area. The free audit shows the review counts of the top plumbers near you, so you know the number to beat. Our guide on how many reviews you need explains the rest.'],
      ['Is this the same as your review software?', 'It runs on the same software, but we set it up and run it for you.'],
    ],
  },
  {
    trade: 'plumbing', service: 'contractor-websites',
    title: 'Plumbing Website Design for More Calls',
    description: 'Plumbing website design: fast, mobile-first sites with a page per service and town, reviews and tap-to-call, so Google visitors turn into booked jobs. Built and run for you.',
    h1: 'Plumbing websites that turn searches into booked jobs',
    lede: 'Someone with water on the floor is on their phone. They need to see in five seconds that you handle their problem, in their town, and how to call you. Most plumbing sites make them hunt for it.',
    why: '<p>Your Google profile gets the click; your website closes it. For plumbers that means speed, a big call button and a clear list of what you do.</p><p>A page for each service (drain cleaning, water heaters, sewer lines) and each town you serve also helps you show up in more of the searches that matter.</p>',
    tactics: [
      ['Service pages', 'Drain cleaning, water heaters, leak detection, repiping, sewer lines, each with what to expect and real photos.'],
      ['Town pages', 'For the towns you serve, with local jobs and reviews, not copy-paste city pages.'],
      ['Mobile first', 'Loads fast on a phone, with tap-to-call and hours at the top.'],
      ['Trust signals', 'License, insurance, reviews and real team photos where homeowners decide.'],
    ],
    faq: [
      ['Can the site take bookings?', 'Yes, if your job software has an online booking widget (Jobber, Housecall Pro and others do). We add it where it helps.'],
      ['How is this different from a template site?', 'Templates give you a homepage. We build around the searches your customers make and keep the site updated.'],
    ],
  },

  // ------------------------------------------------------------------ ROOFING
  {
    trade: 'roofing', service: 'google-business-profile',
    title: 'Google Business Profile for Roofers',
    description: 'Google Business Profile management for roofing contractors: categories, services, project photos and posts so you show up for roof repair and replacement searches. Done for you.',
    h1: 'Google Business Profile management for roofing contractors',
    lede: 'Roof replacement is a big, rare purchase. Homeowners compare roofers carefully, and the comparison usually starts on the Google map: photos, reviews, and whether you look like a real, established company.',
    why: '<p>Roofing profiles live and die on photos and reviews. Before-and-after shots of real roofs do more for trust than any slogan, and they show Google the profile is active.</p><p>Roofing searches also split into repair, replacement, storm damage and inspections, and your profile should show up for each one you want.</p>',
    tactics: [
      ['Roofing categories', '"Roofing contractor" as primary, plus relevant secondary categories like "Gutter cleaning service" or "Siding contractor" only where you do that work.'],
      ['Project photos every month', 'Real before-and-after photos from your jobs, uploaded regularly.'],
      ['Services spelled out', 'Roof repair, replacement, inspections, storm damage, metal roofs, gutters: each listed with a short description.'],
      ['Posts after storms', 'Short, helpful posts after hail or wind events, without fear-mongering.'],
    ],
    faq: [
      ['Do photos really matter for roofers?', 'For a trust purchase like a roof, yes. Homeowners look at your work before they let you on their house. Regular real photos also keep the profile active.'],
      ['Can you get us in the map pack for "roofer near me" across our whole area?', 'Distance limits how far one profile reaches. We\'ll show you where you rank across your service area in the free audit and focus on the towns that matter most.'],
    ],
  },
  {
    trade: 'roofing', service: 'review-generation',
    title: 'Google Reviews for Roofing Contractors',
    description: 'More Google reviews for roofers: requests after every roof, a past-customer campaign and replies. Presidential Roofing went from 27 to 43 reviews in 20 days.',
    h1: 'More Google reviews for roofing contractors',
    lede: 'Roofs last decades, so a roofer can\'t count on repeat customers to leave reviews. Every new review has to come from a customer who just finished a job, which means the ask has to happen every time.',
    why: '<p>Homeowners choosing a roofer read reviews closely: how many, how recent, and what people say about cleanup, communication and price. A thin profile makes even a great roofer look risky next to a competitor with more reviews.</p><p>We\'ve done this for a roofer: <a href="/results/presidential-roofing">Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days</a> with a past-customer campaign and requests after every job.</p>',
    tactics: [
      ['Past-customer campaign', 'A personal text to customers from recent jobs, with one reminder. This is where the first jump in reviews comes from.'],
      ['Request after the final walkthrough', 'Sent when the job is marked complete, while the new roof is fresh in their mind.'],
      ['Every customer asked', 'No gating. It keeps the profile within Google\'s rules and makes the reviews believable.'],
      ['Replies to every review', 'Professional, in your voice, within a day or two.'],
    ],
    faq: [
      ['How fast can a roofer get more reviews?', 'The past-customer campaign usually brings the first wave. Presidential Roofing added 16 reviews in 20 days. After that, it depends on how many jobs you finish.'],
      ['We do insurance work. Is it OK to ask those customers?', 'Yes. Ask every customer. Just don\'t offer anything in exchange for a review.'],
    ],
  },
  {
    trade: 'roofing', service: 'contractor-websites',
    title: 'Roofing Website Design That Wins Jobs',
    description: 'Roofing website design: project galleries, a page per service and town, reviews and a clear way to request an inspection. Built and run for roofing contractors.',
    h1: 'Roofing websites that turn visits into inspections',
    lede: 'A roof is a big decision. Homeowners will spend real time on your site checking your work, your reviews and whether you look established. Give them a reason to book the inspection.',
    why: '<p>Roofing buyers research more than most home-service buyers. Galleries of real projects, clear explanations of repair versus replacement, and visible reviews all help close the gap between "looking" and "booking an inspection".</p><p>Pages for each service and town you cover also help you show up for "roof replacement [town]" searches.</p>',
    tactics: [
      ['Project galleries', 'Real before-and-after photos, organized by roof type and town.'],
      ['Service pages', 'Repair, replacement, inspections, storm damage, metal roofing, gutters, each explaining what happens and what affects the price.'],
      ['Inspection requests', 'A short form and tap-to-call on every page, not buried on a contact page.'],
      ['Reviews and credentials', 'Google reviews, licensing, insurance and manufacturer certifications you actually hold.'],
    ],
    faq: [
      ['Should we list prices on the site?', 'Ranges and what affects the price help people decide to call. Exact quotes need an inspection, and the site can say so.'],
      ['Can you show our certifications?', 'Yes, any you actually hold. We don\'t add badges you don\'t have.'],
    ],
  },

  // ------------------------------------------------------------------ ELECTRICIANS
  {
    trade: 'electricians', service: 'google-business-profile',
    title: 'Google Business Profile for Electricians',
    description: 'Google Business Profile management for electricians: categories, services like panel upgrades and EV chargers, photos and posts so you show up in the map pack. Done for you.',
    h1: 'Google Business Profile management for electricians',
    lede: 'Homeowners searching for an electrician want two things: someone licensed, and someone who can come soon. Your Google profile has to show both before they scroll past.',
    why: '<p>Electrical work spans small repairs to big projects: outlets and breakers, panel upgrades, EV charger installs, generators, lighting. Each is a separate search, and most electrician profiles only show up for their name and "electrician".</p><p>A complete profile with the right services, real photos and recent reviews is how you show up for the jobs you actually want.</p>',
    tactics: [
      ['Categories that fit', '"Electrician" as primary, with secondary categories like "Electrical installation service" or "Lighting contractor" where they match your work.'],
      ['Profitable services listed', 'Panel upgrades, EV chargers, generators, rewiring, lighting, troubleshooting: listed and described.'],
      ['Photos of real work', 'Clean panel installs and finished projects. They show skill better than any description.'],
      ['Licensing visible', 'Your license details where your profile and site allow, because homeowners look for them.'],
    ],
    faq: [
      ['Should I add "EV charger installation" to my profile?', 'If you do that work, yes. It\'s a growing search, and listing it as a service helps you show up for it.'],
      ['Can you help with reviews too?', 'Yes. Reviews are one of the biggest map-pack factors. See review generation for electricians.'],
    ],
  },
  {
    trade: 'electricians', service: 'review-generation',
    title: 'Google Reviews for Electricians',
    description: 'More Google reviews for electricians: a request after every job, past-customer campaign and replies to every review, connected to your job software. Done for you.',
    h1: 'More Google reviews for electricians',
    lede: 'Electrical work is invisible when it\'s done right, so customers forget to mention it. A short, personal request right after the job turns that quiet satisfaction into a review.',
    why: '<p>Homeowners can\'t judge electrical work themselves, so they rely on what other homeowners say: was the electrician on time, clean, clear about the price, and did it work. Reviews answer exactly those questions.</p><p>Steady new reviews also help you show up in the map pack, which is where most "electrician near me" calls start.</p>',
    tactics: [
      ['Request after every job', 'Connected to your job software, sent when the job is complete, by text and email.'],
      ['Past-customer campaign', 'A short, personal message to recent customers to start the flow.'],
      ['Every customer asked', 'No gating. It keeps you within Google\'s rules.'],
      ['Replies to every review', 'Including mentions of specific jobs like panel upgrades or EV chargers, which helps other homeowners searching for that work.'],
    ],
    faq: [
      ['Is there a guide for electrician reviews?', 'Yes: our electrician review management guide covers timing, wording and what to avoid.'],
      ['Do you work with my software?', 'We connect to Jobber, Housecall Pro, ServiceTitan and Workiz, or work from a customer list.'],
    ],
  },
  {
    trade: 'electricians', service: 'contractor-websites',
    title: 'Electrician Website Design for More Calls',
    description: 'Electrician website design: a page per service and town, licensing and reviews up front, tap-to-call on every page. Built and run for electrical contractors.',
    h1: 'Electrician websites that show you\'re the safe choice',
    lede: 'Hiring an electrician is a safety decision. Your website should make it obvious, in seconds, that you\'re licensed, reviewed, local and easy to reach.',
    why: '<p>Homeowners comparing electricians check for licensing, reviews and whether you handle their specific job. A site with a clear page for panel upgrades, EV chargers, generators and repairs answers that and gives Google more reasons to show you.</p><p>Town pages with real local jobs help you reach the areas around your shop.</p>',
    tactics: [
      ['Service pages', 'Panel upgrades, EV chargers, generators, rewiring, lighting and troubleshooting, each with what to expect.'],
      ['License and insurance up front', 'Visible on every page, not hidden in the footer.'],
      ['Town pages', 'For the towns you serve, with real local jobs and reviews.'],
      ['Tap-to-call and quote requests', 'On every page, fast on a phone.'],
    ],
    faq: [
      ['Do you write the content?', 'Yes. We interview you about the work, then write the pages so they sound like you and match how customers search.'],
      ['Can you add our reviews to the site?', 'Yes. Your best Google reviews go on the pages people read before calling.'],
    ],
  },

  // ------------------------------------------------------------------ HANDYMAN
  {
    trade: 'handyman', service: 'google-business-profile',
    title: 'Google Business Profile for Handymen',
    description: 'Google Business Profile management for handyman businesses: categories, a full service list, photos and posts so you show up for the small jobs people search for. Done for you.',
    h1: 'Google Business Profile management for handyman businesses',
    lede: 'Handyman searches are endless and specific: "mount TV", "fix drywall", "install ceiling fan". A profile that only says "handyman" misses most of them.',
    why: '<p>Handyman businesses do dozens of different jobs, and homeowners search for the job, not the trade. Listing each service you do is one of the simplest ways to show up for more of those searches.</p><p>Handyman work is also very local and repeat-driven, so recent reviews and an active profile matter a lot.</p>',
    tactics: [
      ['The right category', '"Handyman/Handywoman/Handyperson" as primary, with secondary categories like "Drywall contractor" or "Painter" only if you do that work regularly.'],
      ['Every job type listed', 'TV mounting, drywall repair, doors, fixtures, ceiling fans, small carpentry, assembly: each one a listed service.'],
      ['Photos of small jobs', 'Before-and-after shots of everyday work. They show range and reliability.'],
      ['Weekly posts', 'Quick updates about recent jobs and seasonal tasks like gutter cleaning or winter prep.'],
    ],
    faq: [
      ['Should a handyman use a storefront address?', 'Most handyman businesses work from home and should hide the address and list a service area instead. We set that up correctly.'],
      ['Is there more on handyman marketing?', 'Yes: see our handyman marketing ideas guide and the full handyman marketing plan.'],
    ],
  },
  {
    trade: 'handyman', service: 'review-generation',
    title: 'Google Reviews for Handyman Businesses',
    description: 'More Google reviews for handyman businesses: a quick request after every job, a past-customer campaign and replies to every review. Done for you, month to month.',
    h1: 'More Google reviews for handyman businesses',
    lede: 'Handymen finish lots of small jobs for happy customers, which should mean lots of reviews. It doesn\'t, because nobody asks. A request after every job changes that fast.',
    why: '<p>For a handyman, trust is the whole sale: you\'re in someone\'s home. Reviews that mention punctuality, tidiness and fair prices are what make a homeowner pick you over the next name.</p><p>Because handyman jobs are frequent and quick, a request after each one builds reviews faster than in most trades.</p>',
    tactics: [
      ['A request after every job', 'By text, sent when the job is done or invoiced, connected to your job software or invoicing.'],
      ['Past-customer campaign', 'A short message to recent customers to get started.'],
      ['Every customer asked', 'No gating, within Google\'s rules.'],
      ['Replies to every review', 'In your voice, mentioning the job, which also helps you show up for those services.'],
    ],
    faq: [
      ['I don\'t use job software. Can you still do this?', 'Yes. We can work from a customer list or your invoicing tool.'],
      ['Should I ask for reviews on small jobs?', 'Yes. Small jobs are most of a handyman\'s work, and reviews about them are exactly what other homeowners want to read.'],
    ],
  },
  {
    trade: 'handyman', service: 'contractor-websites',
    title: 'Handyman Website Design That Books Jobs',
    description: 'Handyman website design: a clear list of jobs you do, service-area pages, reviews and an easy way to request a quote. Built and run for handyman businesses.',
    h1: 'Handyman websites that make booking easy',
    lede: 'People hiring a handyman want to know three things: do you do this job, do you come to my area, and how do I book you. Your website should answer all three without scrolling.',
    why: '<p>Handyman buyers often have a list of small jobs. A site that shows the range of what you do, with photos and rough pricing guidance, turns one small job into a bigger visit.</p><p>Service-area pages and job-specific pages help you show up for the very specific searches homeowners make.</p>',
    tactics: [
      ['A clear jobs list', 'Every type of job you take, grouped and searchable, with photos.'],
      ['Service-area pages', 'For the towns and neighborhoods you cover, with real local jobs.'],
      ['Easy quote requests', 'A short form that lets people describe or photograph the job, plus tap-to-call.'],
      ['Reviews on every page', 'Short quotes from real Google reviews where people decide.'],
    ],
    faq: [
      ['Can customers send photos of the job?', 'Yes. Quote forms can accept photos, which saves you a trip to price small jobs.'],
      ['Do you also handle my Google profile?', 'Yes, and the two work best together. See Google Business Profile for handymen.'],
    ],
  },
].map((c) => ({ ...c, path: `/marketing/${c.trade}/${c.service}` }));
