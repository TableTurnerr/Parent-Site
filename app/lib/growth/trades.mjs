// "[Trade] marketing" pages. Each one is written for that trade: different buying triggers,
// different searches, different plan. Do not turn these into a find-and-replace template.

const WEBFX = '<a href="https://www.webfx.com/blog/home-services/home-services-marketing-benchmarks/" rel="noopener">WebFX</a>';
const WHITESPARK = '<a href="https://whitespark.ca/local-search-ranking-factors/" rel="noopener">Whitespark\'s Local Search Ranking Factors survey</a>';

const svc = {
  gbp: ['/services/google-business-profile', 'Google Business Profile management', 'Categories, services, photos and posts set up so you show in the map pack.'],
  reviews: ['/services/review-generation', 'Google review generation', 'Every finished job gets a review request by text, automatically.'],
  seo: ['/services/local-seo', 'Local SEO', 'Service and city pages that rank for the jobs you want.'],
  web: ['/services/contractor-websites', 'Contractor websites', 'Fast sites built to turn a Google visit into a phone call.'],
  calls: ['/services/missed-call-text-back', 'Missed-call text-back & AI receptionist', 'Every caller gets an answer, even when you\'re on a ladder.'],
  audit: ['/free-google-maps-audit', 'Free Google Maps audit', 'See where you rank against the top 3 in your area.'],
  maps: ['/blog/how-to-rank-higher-on-google-maps', 'How to rank higher on Google Maps', 'The ranking factors that matter for contractors.'],
  handyIdeas: ['/blog/handyman-marketing-ideas', 'Handyman marketing ideas that work', 'A practical list, ranked by cost and payoff.'],
  fenceGuide: ['/blog/fence-company-marketing-guide', 'Fence company marketing guide', 'Seasonality, pricing pages and the map pack.'],
  presidential: ['/results/presidential-roofing', 'Case study: Presidential Roofing', '27 to 43 Google reviews in 20 days for a Utah roofer.'],
  coolingComfort: ['/results/cooling-comfort', 'Case study: Cooling Comfort', 'An Inglewood HVAC company verified on Google 3 days after one free call.'],
  jobber: ['/blog/jobber-google-reviews', 'Getting Google reviews from Jobber', 'Native features, gaps, and what to add.'],
};

export const trades = [
  // ------------------------------------------------------------------ HANDYMAN
  {
    slug: 'handyman', name: 'Handyman', plural: 'handyman businesses',
    path: '/marketing/handyman',
    title: 'Handyman Marketing That Fills Your Schedule | TableTurnerr',
    description: 'Done-for-you handyman marketing: rank in Google Maps for the small jobs homeowners search, collect reviews after every visit, and never miss a call.',
    h1: 'Handyman marketing that turns small jobs into a full schedule',
    lede: 'Homeowners don\'t search "handyman" as often as you\'d think. They search "drywall repair near me," "TV mounting," "door won\'t latch." We make sure your business shows up for those searches, looks like the obvious pick, and answers when they call.',
    problemHeading: 'Why handyman marketing is its own problem',
    problemIntro: 'A $250 job can\'t carry a $90 lead. Handyman businesses win on volume, repeat customers and referrals, so the marketing has to be cheap per job and built for trust.',
    problems: [
      ['Your services are a list of 40 things', 'Google can\'t rank you for "fence gate repair" if that phrase appears nowhere on your profile or site. Most handyman sites have one generic "services" page.'],
      ['Paid leads eat the margin', 'Lead marketplaces sell the same homeowner to several pros. On small tickets, a few unconverted leads wipe out the profit on the ones you win.'],
      ['Trust decides the call', 'Homeowners are letting a stranger into the house for a small job. Recent reviews that mention specific tasks ("hung 6 shelves, cleaned up after") do more than any ad.'],
    ],
    searchIntro: 'Handyman searches are task-first and very local. That\'s good news: each task is a page and a profile service you can rank for, with far less competition than the word "handyman."',
    searches: ['handyman near me', 'drywall repair near me', 'tv mounting service', 'fix squeaky door', 'fence gate repair', 'install ceiling fan', 'caulk bathtub', 'small home repairs', 'furniture assembly near me', 'handyman for seniors', 'honey do list service', 'gutter cleaning and repair'],
    planIntro: 'Everything below is done for you. You approve it, we run it.',
    plan: [
      ['Build out your Google Business Profile service by service', 'We add every task you actually want (with short descriptions), choose the right primary and secondary categories, and upload real job photos tagged to those tasks. ' + 'Primary category is rated the single most important map-pack factor in ' + WHITESPARK + '.'],
      ['Task pages that rank', 'A page for each high-value task in your area: drywall, doors, fixtures, mounting, carpentry. Each one says what you do, what it usually costs, how fast you can come, and shows photos.'],
      ['A review after every visit', 'When a job is marked done in your FSM or our CRM, the customer gets a short text asking for a Google review. We prompt them to mention the task so reviews carry keywords naturally.'],
      ['Turn one job into the next', 'Handyman customers come back. We set up a simple follow-up so past customers hear from you a few times a year, which is where the cheap repeat work comes from.'],
    ],
    deepDive: `
<h2>Where handyman jobs actually come from on Google</h2>
<p>For most home-service searches, the first thing a homeowner sees is the map pack, the three businesses under the map. A 2026 ${WEBFX} study of 100 home-service keywords found the Local Pack on 98 of them. If you\'re not in those three spots for your town, you\'re mostly invisible to people ready to book.</p>
<p>Three things move a handyman business into that pack: the right categories and services on the profile, a steady flow of recent reviews, and a website that backs up what the profile claims. Proximity matters too, which is why we build profiles and pages around the towns you actually serve rather than an entire metro.</p>
<h2>What a handyman website should do</h2>
<ul>
  <li><strong>Show the phone number at the top on mobile.</strong> Most handyman searches happen on phones, often while something is broken.</li>
  <li><strong>List tasks, not categories.</strong> "Interior door adjustment and replacement" beats "Carpentry."</li>
  <li><strong>Give price ranges or a minimum.</strong> Homeowners worry small jobs aren\'t worth your time. Saying "most small repairs are done in one visit" removes that doubt.</li>
  <li><strong>Prove it with photos and reviews from the same town.</strong> Local proof converts better than a generic testimonial.</li>
</ul>
<h2>What we don\'t recommend</h2>
<p>Buying shared leads for jobs under a few hundred dollars, or spreading thin across 30 city pages you\'ve never worked in. Both look busy and rarely pay back. Start with the towns within your drive radius and the tasks you make the most money on.</p>`,
    ctaTitle: 'See which handyman jobs you\'re missing in your area',
    faq: [
      ['How long does handyman SEO take to work?', 'Profile and review improvements often show up in map rankings within a few weeks. Task pages usually take 2 to 4 months to rank, depending on how competitive your town is.'],
      ['Do I need a new website?', 'Not always. If your current site is fast and you can add pages to it, we work with it. If it\'s slow or locked inside a builder we can\'t edit, we\'ll recommend a rebuild and explain why.'],
      ['Should I use Thumbtack or Angi?', 'They can fill gaps when you\'re starting out. Long term, owning your Google presence is cheaper per job, and those customers are yours, not the platform\'s.'],
      ['Can you get reviews from customers I already served?', 'Yes. We can send a one-time, polite request to past customers from your records. We send it to everyone, not just the happy ones, because filtering who gets asked breaks Google\'s review policy.'],
    ],
    related: [svc.handyIdeas, svc.gbp, svc.reviews],
  },

  // ------------------------------------------------------------------ FENCE
  {
    slug: 'fence-companies', name: 'Fence companies', plural: 'fence companies',
    path: '/marketing/fence-companies',
    title: 'Fence Company Marketing & SEO | TableTurnerr',
    description: 'Fence contractor marketing: rank for "fence installation near me," book more estimates in peak season, and earn reviews that show off your work.',
    h1: 'Fence company marketing that books estimates, not tire-kickers',
    lede: 'Fence jobs are big tickets with a long decision. Homeowners compare three or four companies, look hard at photos and reviews, and want a ballpark price before they call. We set up your Google presence so you\'re one of the companies they call, and the one they pick.',
    problemHeading: 'What makes fence marketing different',
    problemIntro: 'Fence buyers research. They look at materials, styles and prices, then check who in their area has done it well. Your marketing has to answer those questions before the estimate.',
    problems: [
      ['Seasonal rush, slow winters', 'Most residential fence demand shows up in spring and summer. If your Google presence only gets attention once the phone is already ringing, you miss the early-season wave.'],
      ['Photos sell the job', 'Buyers want to see cedar privacy, vinyl and chain-link jobs in neighborhoods like theirs. A profile with five old photos loses to one with fifty recent ones.'],
      ['Price shoppers clog the calendar', 'Without any price guidance on your site, you drive out to give estimates to people who were never going to buy at your price.'],
    ],
    searchIntro: 'Fence searches split by material, by job type (install vs. repair), and by intent (price research vs. ready to hire). Each group needs its own page.',
    searches: ['fence company near me', 'fence installation near me', 'privacy fence installers', 'vinyl fence cost', 'cedar fence installation', 'chain link fence contractor', 'fence repair near me', 'pool fence installation', 'wood fence cost per foot', 'gate installation', 'commercial fence contractor', 'fence replacement'],
    planIntro: 'A plan built around peak season and big-ticket trust.',
    plan: [
      ['Material and job-type pages', 'Separate pages for wood, vinyl, chain link, aluminum, pool fencing, gates and repairs, each with photos of your work, typical price ranges per foot, and what affects cost in your area.'],
      ['A photo machine on your Google profile', 'Before/after photos from every install, uploaded with the job location and material. Fresh photos are one of the easiest signals to keep active.'],
      ['Reviews that mention the material and neighborhood', 'Review requests go out when the job closes, with a gentle prompt to mention what you installed. "Our new cedar privacy fence in Hazel Dell looks great" is the review that sells the next one.'],
      ['Pre-season push', 'We line up profile posts, page refreshes and a past-customer referral ask before your busy season, so rankings are strong when demand arrives.'],
    ],
    deepDive: `
<h2>Should a fence company publish prices?</h2>
<p>We think yes, as ranges. "Most 6-foot cedar privacy fences in our area run $X to $Y per linear foot, installed" does three things: it ranks for the price searches homeowners make early, it filters out people far off your price, and it builds trust because you\'re not hiding the ball. You set the numbers. We write the page around what changes the price: terrain, removal of the old fence, gates, permits, HOA rules.</p>
<h2>Map pack vs. ads for fence contractors</h2>
<p>Paid ads and Local Services Ads can work for fence companies because the ticket size supports a higher cost per lead. But the map pack shows up on nearly every local home-service search. A 2026 ${WEBFX} study found it on 98 of 100 home-service keywords, and those clicks don\'t cost anything per lead. We usually recommend getting the profile, reviews and pages right first, then adding paid spend in peak months if you want more volume.</p>
<h2>Your service area</h2>
<p>Fence crews often travel 30 to 45 minutes for the right job. We build pages for the towns where you want more work and back them with photos and reviews from those towns. We don\'t build pages for places you haven\'t worked, because thin "doorway" city pages can hurt more than help.</p>`,
    ctaTitle: 'See how you stack up against the top fence companies near you',
    faq: [
      ['When should a fence company start SEO?', 'Ideally a few months before your busy season. Rankings take time to build, and you want them strong when spring demand starts.'],
      ['Do you work with commercial fence contractors?', 'Yes. Commercial work needs different pages (security fencing, gates, access control) and a different review strategy, since the buyer is a property manager or GC.'],
      ['Can you help with HOA and permit questions on the site?', 'Yes. Pages that explain local permit and HOA basics are useful to homeowners and tend to rank well, because few competitors bother writing them.'],
      ['We also build decks. Can that be included?', 'Yes. Decks and fences share buyers, and a deck page set is a natural add-on.'],
    ],
    related: [svc.fenceGuide, svc.seo, svc.gbp],
  },

  // ------------------------------------------------------------------ HVAC
  {
    slug: 'hvac', name: 'HVAC', plural: 'HVAC companies',
    path: '/marketing/hvac',
    title: 'HVAC Marketing: Get More Calls From Google | TableTurnerr',
    description: 'HVAC marketing done for you: rank for AC repair and furnace searches, answer every emergency call, and turn tune-up customers into reviews and replacements.',
    h1: 'HVAC marketing built for emergency calls and replacement jobs',
    lede: 'When the AC dies in July, the homeowner calls whoever shows up first on Google and picks up the phone. When they\'re planning a replacement, they compare reviews for weeks. We set you up to win both.',
    problemHeading: 'Where HVAC companies lose jobs online',
    problemIntro: 'HVAC has two very different buyers: the emergency caller and the replacement shopper. Most marketing serves one and ignores the other.',
    problems: [
      ['Missed calls during peak heat', 'On the hottest days your phones are slammed. Every unanswered call is a homeowner who dials the next company in the map pack within a minute.'],
      ['Competing with big shops on ads', 'Large HVAC companies outspend you on Google Ads in peak season. Your edge is the map pack and reviews, which can\'t simply be bought.'],
      ['Maintenance customers never review', 'Tune-up and maintenance-plan customers are your happiest, most frequent visits, and almost none of them are ever asked for a review.'],
    ],
    searchIntro: 'HVAC searches are often urgent ("AC not cooling") or symptom-based. Replacement searches are price and brand driven.',
    searches: ['ac repair near me', 'furnace repair near me', 'hvac company near me', 'ac not blowing cold air', 'emergency ac repair', 'heat pump installation', 'ac replacement cost', 'furnace tune up', 'ductless mini split installation', 'hvac maintenance plan', 'thermostat installation', 'heat pump vs furnace'],
    planIntro: 'Built around call capture first, because in HVAC a missed call is a lost job.',
    plan: [
      ['Never miss a peak-season call', 'Missed-call text-back replies within seconds, and an AI receptionist can answer, collect the address and problem, and book or route the call when your office is full.'],
      ['Profile set up for both buyers', 'Categories, services and hours tuned for repair and install searches. Emergency availability is shown clearly if you offer it.'],
      ['Reviews from every visit, maintenance included', 'Automated requests after repairs, installs and tune-ups. Maintenance customers become a steady, year-round review source that keeps you active in the off-season.'],
      ['Pages for replacement shoppers', 'Heat pump, furnace and AC replacement pages that explain options, rebates and rough costs in your area, which is the research these buyers are already doing.'],
    ],
    deepDive: `
<h2>Why reviews matter more in HVAC than most trades</h2>
<p>A replacement can be a five-figure decision. Homeowners read reviews looking for signs of honesty: did the tech push an unnecessary replacement, did they show up when they said, did the price match the quote. A steady stream of recent, specific reviews is the strongest trust signal you can have, and review signals carry heavy weight in local rankings according to ${WHITESPARK}.</p>
<h2>Shoulder seasons are when you build</h2>
<p>Spring and fall are slower for repairs. That\'s when we push past-customer review campaigns, refresh replacement pages and build out profile content, so you go into summer and winter peaks already ranking.</p>
<h2>Works with your software</h2>
<p>If you run ServiceTitan, Housecall Pro or Jobber, we connect review requests to job completion so your techs don\'t have to remember anything. If you don\'t have an FSM, we can set up our CRM for you.</p>`,
    ctaTitle: 'Find out how many HVAC calls go to your competitors',
    faq: [
      ['Do you run Google Ads for HVAC?', 'We focus on the map pack, reviews, website and call capture first, because those lower your cost per job. If you want ads on top, we\'ll tell you honestly whether your profile and site are ready to convert that traffic.'],
      ['Can the AI receptionist book jobs?', 'It can answer, collect the caller\'s details and problem, and either book into your calendar or hand the job to your team by text, depending on how you want it set up.'],
      ['We already use ServiceTitan\'s review feature. Do we need you?', 'Maybe not for the requests themselves. Many owners still need the profile, pages, call capture and someone watching the numbers. We\'ll tell you which parts you actually need.'],
      ['Do you work with commercial HVAC?', 'Yes, though the plan changes. Commercial buyers search differently and care about response time and service agreements.'],
    ],
    related: [svc.coolingComfort, svc.calls, svc.maps],
  },

  // ------------------------------------------------------------------ ROOFING
  {
    slug: 'roofing', name: 'Roofing', plural: 'roofing contractors',
    path: '/marketing/roofing',
    title: 'Roofing Marketing & Local SEO | TableTurnerr',
    description: 'Roofing marketing that builds trust before the inspection: rank for repair and replacement in your towns, earn detailed reviews, beat storm chasers.',
    h1: 'Roofing marketing that makes you the trusted local choice',
    lede: 'Homeowners have heard the storm-chaser stories. Before they let anyone on the roof, they check how long you\'ve been around, who you\'ve worked for nearby, and what those people said. We make that proof easy to find.',
    problemHeading: 'The roofing trust problem',
    problemIntro: 'Roofing has big tickets, insurance involvement and a reputation problem the honest contractors pay for. Marketing has to separate you from the crowd.',
    problems: [
      ['Storm chasers flood the market', 'After hail or wind, out-of-town crews flood ads and door-knocking. Local roofers with deep review history and local photos stand out, if homeowners can find them.'],
      ['Long gaps between jobs per customer', 'A roof lasts decades. You won\'t see repeat business, so reviews and referrals have to carry the weight.'],
      ['Leads that never close', 'Shared roofing leads are expensive and often go to several roofers at once. Organic and map-pack calls come to you alone.'],
    ],
    searchIntro: 'Roofing searches split into repair (urgent, local) and replacement (research-heavy, cost-focused). Insurance and storm searches spike after weather events.',
    searches: ['roofer near me', 'roof repair near me', 'roof replacement cost', 'roof leak repair', 'metal roofing contractor', 'shingle roof replacement', 'roof inspection near me', 'storm damage roof repair', 'roofing company reviews', 'flat roof repair', 'gutter installation', 'insurance claim roof replacement'],
    planIntro: 'A plan focused on proof, so homeowners trust you before you arrive.',
    plan: [
      ['Project proof by neighborhood', 'Photo galleries and short project write-ups tagged by town and roof type, on both your site and Google profile.'],
      ['Detailed reviews', 'Requests go out after the final walkthrough, prompting homeowners to mention the roof type, cleanup and crew. Specific reviews build more trust than "great job."'],
      ['Replacement and material pages', 'Pages for shingle, metal and flat roofs that explain lifespan, cost factors and warranty options in plain language.'],
      ['Storm-response readiness', 'A ready-to-publish storm damage page and profile post for your area, so you show up fast after a weather event.'],
    ],
    deepDive: `
<h2>Insurance and storm content, done carefully</h2>
<p>Homeowners search for help with insurance claims after storms. A page that explains how the process usually works in your state, what an inspection involves and what to watch for is genuinely useful and ranks well. We keep it accurate and avoid promises about claim outcomes, which some contractors get in trouble for.</p>
<h2>Local proof beats big ad budgets</h2>
<p>Roofing ads are expensive in most markets. The map pack shows up on nearly every local home-service search (98 of 100 keywords in a 2026 ${WEBFX} study), and a roofer with consistent recent reviews and local project photos can compete there without outspending anyone.</p>`,
    ctaTitle: 'See where your roofing company ranks in each town you serve',
    faq: [
      ['How do you get reviews for jobs that happen once in a decade?', 'We ask at the right moment (right after the final walkthrough) and make it a one-tap text. We can also run a one-time request to past customers from the last few years.'],
      ['Do you build pages for every city near us?', 'Only where you work or want to work, and only with real substance like projects, photos and reviews from that town. Thin city pages can hurt.'],
      ['Can you help with commercial roofing?', 'Yes. Commercial roofing gets its own pages and a review approach aimed at property managers and facility owners.'],
      ['Is this a long contract?', 'No. Month to month.'],
    ],
    related: [svc.presidential, svc.reviews, svc.seo],
  },

  // ------------------------------------------------------------------ PLUMBING
  {
    slug: 'plumbing', name: 'Plumbing', plural: 'plumbing companies',
    path: '/marketing/plumbing',
    title: 'Plumbing Marketing: Win the Map Pack | TableTurnerr',
    description: 'Plumber marketing done for you: show up first for emergency plumbing searches, answer every call, and turn repairs into a steady stream of Google reviews.',
    h1: 'Plumbing marketing that wins the emergency call',
    lede: 'A burst pipe doesn\'t wait for a callback. The homeowner taps the first plumber in the map pack with good reviews and calls. If you don\'t answer, they call the next one. We fix both sides: being found and being reached.',
    problemHeading: 'Where plumbers lose calls',
    problemIntro: 'Plumbing demand is urgent and unpredictable. That makes ranking and answering equally important.',
    problems: [
      ['Calls go to voicemail on busy days', 'Your techs are under sinks and the office is overloaded. A missed call is often a job gone in under five minutes.'],
      ['Generic profiles', 'Profiles listing only "plumber" miss searches for water heaters, drain cleaning, sewer lines and repiping, which are often higher-ticket work.'],
      ['Reviews are sporadic', 'Ten reviews in one month, then nothing for six. Inconsistent review flow makes rankings swing.'],
    ],
    searchIntro: 'Plumbing searches are urgent, problem-based and often include "near me" or "24 hour."',
    searches: ['plumber near me', 'emergency plumber', 'water heater replacement', 'drain cleaning near me', 'clogged toilet', 'leak detection', 'sewer line repair', 'tankless water heater installation', 'repipe cost', 'garbage disposal repair', 'sump pump installation', 'burst pipe repair'],
    planIntro: 'Get found for every type of job, then make sure every caller reaches someone.',
    plan: [
      ['Every service on your profile', 'Water heaters, drains, sewer, repipes, fixtures: each added as a service with a description, so you can show up for the specific search.'],
      ['Answer 100% of callers', 'Missed-call text-back plus an optional AI receptionist that collects the problem and address and books or routes the job.'],
      ['Steady reviews, every week', 'Automated requests after each job keep reviews coming consistently, which keeps rankings stable.'],
      ['High-ticket service pages', 'Water heater, sewer and repipe pages with cost factors and photos, to win the bigger jobs, not just clogs.'],
    ],
    deepDive: `
<h2>Emergency vs. planned plumbing work</h2>
<p>Emergency searches favor whoever is closest, open and well reviewed. Planned work (water heater replacement, repipes, remodel plumbing) favors whoever explains it best. Your profile handles the first and your website handles the second. We build both.</p>
<h2>Local Services Ads</h2>
<p>Google\'s Local Services Ads ("Google Guaranteed") show above the map pack on many plumbing searches. A 2026 ${WEBFX} study found them on about half of searches that include a city name. Reviews feed into how those ads rank too, so a strong review flow helps both your organic and paid presence.</p>`,
    ctaTitle: 'See how many plumbing searches you\'re missing',
    faq: [
      ['Should we show 24/7 availability?', 'Only if you really offer it. Showing it and not answering hurts reviews fast. If you do offer it, we make it obvious on your profile and site.'],
      ['Can review requests come from our FSM?', 'Yes. We connect to Jobber, Housecall Pro, ServiceTitan and others so requests go out when a job is marked complete.'],
      ['Do you manage Local Services Ads?', 'We can help set up and optimize your profile for LSAs. Your reviews and responsiveness are what move those ads, and that\'s our core work.'],
      ['How fast will we see more calls?', 'Call capture shows results right away, since you stop losing missed callers. Ranking gains usually build over weeks to a few months.'],
    ],
    related: [svc.calls, svc.gbp, svc.jobber],
  },

  // ------------------------------------------------------------------ TREE SERVICE
  {
    slug: 'tree-service', name: 'Tree service', plural: 'tree service companies',
    path: '/marketing/tree-service',
    title: 'Tree Service Marketing & SEO | TableTurnerr',
    description: 'Marketing for tree service companies and arborists: rank for tree removal and storm work, show off your crew\'s skill, and earn reviews that build trust.',
    h1: 'Tree service marketing that proves you\'re safe, insured and skilled',
    lede: 'Tree work is dangerous, and homeowners know it. They want to see that you\'re insured, experienced and careful with their property. We put that proof in front of them on Google before they call anyone else.',
    problemHeading: 'What tree service buyers worry about',
    problemIntro: 'Homeowners hiring tree work worry about damage, safety and price. Your online presence should answer all three.',
    problems: [
      ['Price confusion', 'Tree removal prices vary widely by height, access and hazard. Without any guidance, homeowners call five companies and pick the cheapest.'],
      ['Storm surges', 'After a windstorm, demand spikes overnight. Companies that rank for emergency tree searches get the work. The rest find out days later.'],
      ['Undercutters without insurance', 'Uninsured crews undercut on price. Showing your credentials, certifications and insurance clearly is a real advantage.'],
    ],
    searchIntro: 'Tree service searches are mostly about removal, trimming and emergencies, often with a cost question attached.',
    searches: ['tree removal near me', 'tree service near me', 'tree trimming near me', 'emergency tree removal', 'stump grinding near me', 'tree removal cost', 'arborist near me', 'storm damage tree removal', 'tree pruning service', 'dead tree removal', 'land clearing', 'certified arborist'],
    planIntro: 'Proof of skill and safety, plus readiness for storm season.',
    plan: [
      ['Show credentials up front', 'Insurance, certifications (like ISA certified arborists, if you have them) and safety practices shown clearly on your profile and site.'],
      ['Video and photo proof', 'Short clips and photos of difficult removals and clean cleanups. They build trust and keep your profile active.'],
      ['Emergency and storm pages', 'Pages and profile posts ready to go for storm events, so you rank when demand spikes.'],
      ['Reviews that mention cleanup and care', 'Requests prompt customers to describe the job and how you left their yard, which is what future customers look for.'],
    ],
    deepDive: `
<h2>Pricing pages for tree work</h2>
<p>A "how much does tree removal cost in [your area]" page that explains the factors (height, access, proximity to structures, stump grinding, haul-away) ranks well and filters out bargain hunters. You decide whether to include ranges.</p>
<h2>Arborist vs. tree service</h2>
<p>Some homeowners search for "arborist" when they want health assessments or pruning, not removal. If you have certified arborists on staff, separate pages and the right profile categories help you capture that higher-value work.</p>`,
    ctaTitle: 'See how you rank for tree removal in your area',
    faq: [
      ['Can you help us get more commercial and HOA work?', 'Yes. Property managers and HOAs search differently and care about reliability and insurance. We build pages and proof aimed at them.'],
      ['We get most work from referrals. Why invest in Google?', 'Referrals still check Google before calling. A strong profile and reviews make referrals convert, and bring in the homeowners who don\'t have one.'],
      ['Do you post to our Google profile?', 'Yes. Regular posts with job photos keep the profile active and give searchers fresh proof.'],
      ['Is there a contract?', 'No, month to month.'],
    ],
    related: [svc.gbp, svc.reviews, svc.audit],
  },

  // ------------------------------------------------------------------ REMODELING
  {
    slug: 'remodeling', name: 'Remodelers', plural: 'remodeling contractors',
    path: '/marketing/remodeling',
    title: 'Remodeling Contractor Marketing | TableTurnerr',
    description: 'Marketing for kitchen, bath and home remodelers: rank for high-value remodel searches, show finished projects, and earn reviews that win five-figure jobs.',
    h1: 'Remodeling marketing for the jobs worth winning',
    lede: 'Kitchen and bath remodels are among the biggest checks a homeowner writes. They spend weeks looking at portfolios, reading reviews and comparing contractors. We make your work the easiest to trust.',
    problemHeading: 'Why remodelers struggle online',
    problemIntro: 'Remodeling buyers do a lot of research before they call. Most remodeler websites don\'t give them enough to go on.',
    problems: [
      ['Portfolios that don\'t rank', 'Beautiful project photos in a gallery with no text don\'t show up in search. Google needs words, locations and context.'],
      ['Few projects, few reviews', 'You might finish 20 to 50 big projects a year. Every one of them needs to turn into a detailed review.'],
      ['Price-first shoppers', 'Without any budgeting guidance, you spend evenings giving estimates to homeowners with a fraction of the budget the project needs.'],
    ],
    searchIntro: 'Remodeling searches are project-based and research heavy, with lots of cost and "ideas" queries.',
    searches: ['kitchen remodel near me', 'bathroom remodel contractor', 'kitchen remodel cost', 'home remodeling contractors', 'basement finishing', 'walk in shower remodel', 'home addition contractor', 'bathroom remodel ideas', 'design build remodeler', 'aging in place remodel', 'whole home renovation', 'cabinet refacing'],
    planIntro: 'Turn every finished project into lasting search and trust value.',
    plan: [
      ['Project case pages', 'Each major project becomes a short page: the problem, the design, the budget range, the timeline, photos, and the homeowner\'s review.'],
      ['Cost and planning guides', 'Honest budget guides for kitchens, baths and basements in your area. They rank, and they qualify buyers before the first call.'],
      ['Review at handover', 'A request goes out at the final walkthrough, prompting the homeowner to mention the room, the design and the process.'],
      ['Profile built for each project type', 'Services and photos for kitchens, baths, basements and additions, so you show up for each.'],
    ],
    deepDive: `
<h2>Why remodelers should write about budgets</h2>
<p>Homeowners search for remodel costs months before they hire. If your page answers that question honestly for your area, you\'re the first contractor they trust. It also saves you from estimates that were never going to close.</p>
<h2>Every project is content</h2>
<p>One finished kitchen gives you a project page, a dozen profile photos, a review and a before/after post. Over a year, that adds up to a site that ranks and a profile that sells itself.</p>`,
    ctaTitle: 'See how your remodeling business shows up on Google',
    faq: [
      ['Do you do design or photography?', 'We coordinate photos and can recommend local photographers. We handle the pages, profile, reviews and SEO.'],
      ['We\'re a design-build firm. Does that change things?', 'Yes. Design-build buyers want to see process and design work, not just finished photos. We build pages around that.'],
      ['How many reviews do we need?', 'There\'s no magic number. What matters is staying ahead of the top competitors in your area on recency and detail. Your audit will show where you stand.'],
      ['Can you help with home additions and ADUs?', 'Yes. ADU and addition pages are very searchable in some markets, especially where local rules recently changed.'],
    ],
    related: [svc.seo, svc.web, svc.reviews],
  },

  // ------------------------------------------------------------------ LANDSCAPING
  {
    slug: 'landscaping', name: 'Landscaping', plural: 'landscaping companies',
    path: '/marketing/landscaping',
    title: 'Landscaping Marketing & Lawn Care SEO | TableTurnerr',
    description: 'Marketing for landscapers and lawn care companies: rank for design, install and maintenance searches, fill routes, and get reviews from every property.',
    h1: 'Landscaping marketing that fills routes and wins design jobs',
    lede: 'Landscaping has two businesses inside it: recurring maintenance that needs dense routes, and design and install projects that need a portfolio. We market both, so your crews stay busy all season.',
    problemHeading: 'What holds landscapers back online',
    problemIntro: 'Seasonal demand, price competition on maintenance, and a visual product that most websites undersell.',
    problems: [
      ['Scattered routes', 'Maintenance customers spread across town waste drive time. Marketing should focus where your routes already run.'],
      ['Undifferentiated maintenance', 'Mowing looks like a commodity. Reviews and reliability are how you justify your price.'],
      ['Design work hidden in a gallery', 'Patios, retaining walls and plantings need project pages that rank, not just a photo slideshow.'],
    ],
    searchIntro: 'Landscaping searches range from recurring lawn care to big hardscape projects.',
    searches: ['landscaping near me', 'lawn care service near me', 'landscape design', 'paver patio installation', 'retaining wall contractor', 'yard cleanup service', 'sod installation', 'irrigation repair', 'landscape lighting', 'drought tolerant landscaping', 'commercial landscaping', 'weekly lawn mowing'],
    planIntro: 'Grow recurring revenue where your routes run, and win the bigger projects.',
    plan: [
      ['Route-density targeting', 'Profile and page focus on the neighborhoods where you already have crews, to fill routes instead of stretching them.'],
      ['Project pages for hardscape and design', 'Patios, walls, lighting and plantings shown as projects with photos, scope and location.'],
      ['Reviews from recurring customers', 'Maintenance customers get a review request after their first few visits, when the good impression is fresh.'],
      ['Seasonal content', 'Spring cleanup, fall aeration, holiday lighting add-ons: timed posts and pages so you catch each seasonal wave.'],
    ],
    deepDive: `
<h2>Maintenance vs. projects</h2>
<p>Recurring maintenance is about reliability and convenience: reviews that say "they show up every week" matter most. Projects are about design and craftsmanship: photos and detailed project pages matter most. We split your site and profile content to serve both buyers.</p>
<h2>Commercial landscaping</h2>
<p>Property managers search for reliability, insurance and the ability to handle multiple sites. If you want commercial contracts, we build a separate section aimed at them.</p>`,
    ctaTitle: 'See how your landscaping company ranks near your routes',
    faq: [
      ['Can you help us add holiday lighting as a winter service?', 'Yes. Holiday lighting is a natural off-season add-on for landscapers, and we can build pages and profile services for it.'],
      ['Do you work with lawn care only companies?', 'Yes. The plan focuses more on route density and recurring reviews.'],
      ['Our busy season is short. When should we start?', 'Late winter is ideal, so rankings and reviews are strong when spring demand hits.'],
      ['Do we need a new website?', 'Only if your current one can\'t be edited or is very slow. We\'ll tell you after the audit.'],
    ],
    related: [svc.gbp, svc.seo, svc.maps],
  },
].map((t) => ({ ...t, crumbs: [['/', 'Home'], ['/marketing', 'Who we help'], [t.path, t.name]] }));
