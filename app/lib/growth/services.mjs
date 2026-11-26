// Service pages. These target "[service] for contractors / home services" searches.
const WHITESPARK = '<a href="https://whitespark.ca/local-search-ranking-factors/" rel="noopener">Whitespark\'s Local Search Ranking Factors survey</a>';
const WEBFX = '<a href="https://www.webfx.com/blog/home-services/home-services-marketing-benchmarks/" rel="noopener">WebFX</a>';

export const services = [
  {
    slug: 'local-seo', short: 'Local SEO',
    path: '/services/local-seo',
    title: 'Local SEO for Contractors & Home Services | TableTurnerr',
    description: 'Local SEO for home-service businesses: service pages, city pages with real proof, technical fixes and tracking, so your site ranks for the jobs you want.',
    eyebrow: 'Local SEO',
    h1: 'Local SEO for contractors who want calls, not traffic reports',
    lede: 'We build and fix the pages that rank for the jobs you actually want in the towns you actually serve. Then we track calls and form fills, not vanity numbers.',
    includedIntro: 'Done for you, start to finish. You approve the plan and answer a few questions about your work.',
    included: [
      ['Keyword plan for your trade and towns', 'We find what homeowners in your area search for each service, then map one page to each group of searches.'],
      ['Service pages', 'A page for each profitable service: what it is, what it costs, how fast you can come, photos and reviews.'],
      ['Town pages with substance', 'Pages only for areas you serve, backed by local jobs, photos and reviews, not copy-paste city swaps.'],
      ['Technical fixes', 'Speed, mobile, titles, schema, sitemaps, broken links and indexing issues found and fixed.'],
      ['Citations and listings', 'Your name, address and phone made consistent across the directories that matter for your trade.'],
      ['Call and lead tracking', 'Monthly report showing calls, forms and rankings in plain English.'],
    ],
    steps: [
      ['Audit', 'We review your site, profile and top competitors and show you the gaps on a call.'],
      ['Build', 'We write and publish the pages and fixes, usually starting with the highest-value services.'],
      ['Grow', 'Monthly improvements based on what\'s bringing calls, plus new pages as you add services or areas.'],
    ],
    deepDive: `
<h2>Map pack vs. organic results</h2>
<p>Local SEO covers two places on Google: the map pack (driven mostly by your Google Business Profile, reviews and proximity) and the regular results below it (driven more by your website). According to ${WHITESPARK}, the factors behind each are different, with on-page website signals weighing heavily for local organic results. We work on both, because homeowners click both.</p>
<h2>Why we avoid thin city pages</h2>
<p>Many agencies publish dozens of nearly identical "[Service] in [City]" pages. Google often treats those as doorway pages, and they rarely bring calls. We\'d rather build fewer pages with real local proof.</p>`,
    faq: [
      ['How long does local SEO take?', 'Technical fixes and profile improvements can move things within weeks. New pages usually take 2 to 4 months to rank, longer in competitive cities.'],
      ['Do you guarantee rankings?', 'No honest agency can guarantee a position on Google. We commit to the work, show you what we did, and report results every month.'],
      ['Can you work on our existing website?', 'Usually yes, if we can get edit access. If it\'s locked in a platform we can\'t edit, we\'ll talk options.'],
      ['Do I have to sign a long contract?', 'No. Month to month.'],
    ],
  },
  {
    slug: 'ai-search-optimization', short: 'AI search optimization (AEO)',
    path: '/services/ai-search-optimization',
    title: 'AI Search Optimization (AEO) for Contractors | TableTurnerr',
    description: 'Answer engine optimization for home-service businesses: get named when homeowners ask ChatGPT, Google AI Mode, Gemini, Perplexity or Copilot who to hire.',
    eyebrow: 'AEO / AI search',
    h1: 'Get recommended when homeowners ask AI who to hire',
    lede: 'More homeowners now ask ChatGPT, Google\x27s AI answers, Gemini, Perplexity or Copilot for "the best roofer near me" instead of scrolling results. Answer engine optimization (AEO) makes your business one of the names those assistants can find, trust and repeat.',
    includedIntro: 'Done for you, alongside your local SEO. Every plan starts with an AI visibility check in your free audit.',
    included: [
      ['AI visibility check', 'We ask ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity who they recommend for your trade and town, and show you who gets named instead of you.'],
      ['Answer-first pages', 'Service and FAQ pages that answer the exact questions homeowners ask, in plain sentences an assistant can quote: what you do, where, how fast and what it costs.'],
      ['Consistent business facts everywhere', 'Your name, phone, services, hours and service area made identical on your site, Google, Bing Places, Apple Business Connect, Yelp, Facebook and the directories AI assistants read.'],
      ['Reviews that say something', 'Review requests after every job, so you get recent, detailed reviews on Google and the other sites assistants check.'],
      ['Schema and crawler access', 'LocalBusiness, Service and FAQ markup, a clean sitemap and llms.txt, and making sure AI search crawlers (OAI-SearchBot, PerplexityBot, Claude-SearchBot, Bingbot) are not blocked.'],
      ['Mentions on other sites', 'Getting you listed and mentioned where assistants look for "best of" answers: local directories, trade associations, supplier and manufacturer dealer pages, and local news.'],
    ],
    steps: [
      ['Check', 'We run the AI visibility check and your Google Maps audit, and show you where you are and aren\x27t named.'],
      ['Fix', 'We clean up your business facts across the web, rewrite key pages answer-first and add the markup.'],
      ['Track', 'Each month we re-ask the same questions on each assistant and report who gets recommended, alongside your calls and rankings.'],
    ],
    deepDive: `
<h2>What is AEO?</h2>
<p>Answer engine optimization (AEO), also called generative engine optimization (GEO) or AI search optimization, is the work of getting your business named and cited in AI-written answers. When someone asks "who's a good HVAC company in Plano?", the assistant reads a handful of web sources, picks a few businesses and explains why. AEO is about being one of them.</p>
<h2>How AI assistants pick a local business</h2>
<p>Each assistant uses its own mix of sources. Google's AI Overviews, AI Mode and Gemini draw on Google's own index and Business Profiles; Google says <a href="https://developers.google.com/search/docs/appearance/ai-features" rel="noopener">no special markup is needed</a> beyond normal SEO. ChatGPT search uses OpenAI's own crawler and partner data, Microsoft Copilot leans on Bing and Bing Places, and Perplexity runs its own crawler. What they have in common: they favor businesses whose facts match across many sources, that have plenty of recent reviews, and that are mentioned on other trusted sites.</p>
<h2>AEO and local SEO are the same foundation</h2>
<p>Almost everything that helps you show up in AI answers also helps you rank on Google: a complete Business Profile, steady reviews, clear service pages and consistent listings. That's why we run AEO together with <a href="/services/local-seo">local SEO</a> and <a href="/services/google-business-profile">Google Business Profile management</a> rather than as a separate trick.</p>
<h2>What we won't promise</h2>
<p>Nobody controls what an AI assistant says, and answers change from one question to the next. Anyone who guarantees "#1 in ChatGPT" is guessing. We promise the work, a monthly check across the assistants, and honest reporting on whether you're being named.</p>`,
    faq: [
      ['What is the difference between SEO and AEO?', 'SEO gets your pages to rank in Google\x27s results. AEO gets your business named inside AI answers from ChatGPT, Google AI Mode, Gemini, Perplexity and Copilot. They share the same foundation (reviews, a strong Google profile, clear pages, consistent listings), and AEO adds answer-first content, wider listings and mentions on the sites assistants read.'],
      ['Can you guarantee ChatGPT will recommend my business?', 'No. AI answers vary and nobody controls them. We do the work that makes you easy for assistants to find and trust, and we check every month whether you\x27re being named.'],
      ['How do I know if AI assistants recommend me now?', 'Your free audit includes an AI visibility check: we ask ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity who they recommend for your trade and town.'],
      ['How long does AEO take?', 'Fixing listings and pages takes a few weeks. Assistants pick up changes on their own schedule, so expect a few months before you see consistent mentions.'],
      ['Is AEO included in your plans?', 'Yes. It is {{PRICE:aeo}}.'],
    ],
  },
  {
    slug: 'google-business-profile', short: 'Google Business Profile',
    path: '/services/google-business-profile',
    title: 'Google Business Profile Management for Contractors | TableTurnerr',
    description: 'Google Business Profile management for home-service businesses: categories, services, photos, posts and review replies handled so you rank in the map pack.',
    eyebrow: 'Google Business Profile',
    h1: 'Google Business Profile management that gets you into the map pack',
    lede: 'For most local searches, the first thing a homeowner sees is the map and three businesses. Your Google Business Profile is what gets you there. We set it up properly and keep it active.',
    includedIntro: 'Everything Google uses to decide who shows up, handled for you.',
    included: [
      ['Category strategy', 'The right primary and secondary categories for your trade. Primary category is rated the top individual map-pack factor in ' + WHITESPARK + '.'],
      ['Every service listed', 'Each service you offer added with a clear description, so you can show up for specific searches.'],
      ['Photos every month', 'Real job photos uploaded regularly. Fresh, genuine photos keep the profile active and build trust.'],
      ['Weekly posts', 'Short updates about recent jobs, seasonal services and offers.'],
      ['Review replies', 'Every review answered professionally, within a day or two, including the tough ones.'],
      ['Q&A and info', 'Hours, service areas, attributes and common questions kept accurate.'],
    ],
    steps: [
      ['Audit', 'We compare your profile to the top 3 in your area and find the gaps.'],
      ['Fix', 'Categories, services, description, photos and service areas updated in the first two weeks.'],
      ['Maintain', 'Ongoing photos, posts and review replies, with monthly ranking checks across your area.'],
    ],
    deepDive: `
<h2>Why the map pack matters so much</h2>
<p>A 2026 ${WEBFX} study of 100 home-service keywords found the Local Pack on 98 of them. For contractors, it\'s the most valuable real estate on Google, and unlike ads, you don\'t pay per click.</p>
<h2>What we won\'t do</h2>
<p>We don\'t stuff keywords into your business name, create fake addresses or buy reviews. Those tricks can get a profile suspended, and getting it back can take weeks. Everything we do follows Google\'s guidelines.</p>`,
    faq: [
      ['My profile got suspended. Can you help?', 'Often, yes. We\'ll review why it happened and help you submit a reinstatement request with the right documents.'],
      ['I\'m a service-area business with no storefront. Does that matter?', 'No. Most home-service businesses hide their address and list service areas instead. We set that up correctly.'],
      ['How fast will my map ranking improve?', 'Category and service fixes can show results within a few weeks. Review growth builds over time.'],
      ['Do I keep ownership of my profile?', 'Always. You stay the owner, we\'re added as a manager.'],
    ],
  },
  {
    slug: 'review-generation', short: 'Google review generation',
    path: '/services/review-generation',
    title: 'Google Review Generation for Home Services | TableTurnerr',
    description: 'Get more Google reviews after every job, automatically. Text requests from Jobber, Housecall Pro, ServiceTitan or our CRM, plus replies handled.',
    eyebrow: 'Review generation',
    h1: 'More Google reviews from every finished job, without chasing anyone',
    lede: 'Your best customers would leave a review if someone asked at the right moment. We make sure every customer gets asked, by text, right after the job, and we handle the replies.',
    includedIntro: 'The setup, the messaging and the follow-through, done for you.',
    included: [
      ['Connected to your software', 'Requests trigger when a job is marked complete in Jobber, Housecall Pro, ServiceTitan, Workiz, or our CRM.'],
      ['Past-customer campaign', 'A one-time, polite request to customers from the last couple of years. Often the fastest way to close a review gap.'],
      ['Messages that sound like you', 'Short, personal texts written in your voice, with one gentle reminder for people who don\'t respond.'],
      ['Every platform that matters', 'Google first, plus Facebook, Yelp or Angi where they matter for your trade.'],
      ['Replies handled', 'Thoughtful owner-style replies to every review, positive or negative.'],
      ['Policy-safe', 'Everyone gets asked, not just happy customers, and no incentives. That keeps your profile safe.'],
    ],
    steps: [
      ['Connect', 'We link your FSM or import your customer list. No work for your techs.'],
      ['Launch', 'Past-customer campaign goes out, then automatic requests after every new job.'],
      ['Track', 'You see review count, rating and map-ranking changes each month.'],
    ],
    deepDive: `
<h2>Why recency matters</h2>
<p>Homeowners look at how recent your reviews are, not just how many you have. A company with 40 reviews from the last six months often looks better than one with 200 from years ago. Review signals are among the factors local SEO experts rate as gaining importance in ${WHITESPARK}.</p>
<h2>Already have review requests in your FSM?</h2>
<p>Jobber, Housecall Pro and ServiceTitan all include some form of review request on certain plans. If yours works, keep it. Where we add value is the past-customer push, replies, the profile and pages around it, and making sure the requests actually go out. See our guide on <a href="/blog/jobber-google-reviews">getting Google reviews from Jobber</a>.</p>
<h2>What we never do</h2>
<p>No fake reviews, no paying for reviews, no only asking happy customers ("review gating"). All of these break Google\'s policies and can get reviews removed or the profile penalized.</p>`,
    faq: [
      ['Will customers find the texts annoying?', 'We send one request and at most one reminder. Most customers appreciate a short, personal message.'],
      ['What if someone leaves a bad review?', 'We help you reply calmly and professionally. A good reply to a bad review often wins more trust than another 5-star.'],
      ['Can I filter so only happy customers get asked?', 'No. That\'s review gating, which Google prohibits. We ask everyone and let your work speak.'],
      ['How many reviews will I get?', 'It depends on job volume and how good your work is. Your audit will show how far behind or ahead of competitors you are.'],
    ],
  },
  {
    slug: 'contractor-websites', short: 'Contractor websites',
    path: '/services/contractor-websites',
    title: 'Websites for Contractors & Home Services | TableTurnerr',
    description: 'Fast, mobile-first websites for home-service contractors, built to rank locally and turn visits into calls. Service pages, reviews, photos and click-to-call.',
    eyebrow: 'Websites',
    h1: 'Contractor websites built to make the phone ring',
    lede: 'Your website has one job: when a homeowner lands on it from Google, make them call you. We build fast, mobile-first sites with the pages, proof and click-to-call buttons that do that.',
    includedIntro: 'Everything a home-service site needs, nothing it doesn\'t.',
    included: [
      ['Mobile first', 'Phone number and call button at the top. Most local searches happen on phones.'],
      ['A page per service', 'Clear pages for each profitable service, written to rank and to answer homeowner questions.'],
      ['Real proof', 'Your reviews, job photos and service areas built in, not stock photos.'],
      ['Fast', 'Lightweight pages that load quickly on a phone with weak signal.'],
      ['SEO built in', 'Titles, descriptions, schema, sitemap and Google Business Profile connection from day one.'],
      ['Lead capture', 'Simple quote forms and call tracking, so you know what\'s working.'],
    ],
    steps: [
      ['Plan', 'We map your services and areas to pages, and collect photos and reviews.'],
      ['Build', 'We write, design and launch, usually within a few weeks.'],
      ['Improve', 'Ongoing updates as you add services, areas and new projects.'],
    ],
    deepDive: `
<h2>Your domain, your asset</h2>
<p>We build your site on your own domain, so every link and ranking you earn belongs to your business. If you ever leave us, the site and domain stay yours.</p>
<h2>Redesigning an existing site?</h2>
<p>Redesigns can lose rankings if old URLs aren\'t redirected properly. We map every existing page to its new home before launch so you keep what you\'ve earned.</p>`,
    faq: [
      ['Do I own the website?', 'Yes. It\'s on your domain, and you own the content.'],
      ['How long does a build take?', 'Usually a few weeks, depending on how many services and areas you cover and how quickly we get photos.'],
      ['Can you write the content?', 'Yes. We interview you about your work and write it. You approve everything before it goes live.'],
      ['Can you keep my current site and just improve it?', 'Often, yes. We\'ll recommend the cheapest path that gets results.'],
    ],
  },
  {
    slug: 'missed-call-text-back', short: 'Missed-call text-back',
    path: '/services/missed-call-text-back',
    title: 'Missed-Call Text-Back for Contractors | TableTurnerr',
    description: 'Stop losing jobs to missed calls: every missed call gets a text in seconds, from your number. $49/mo on its own, or add a 24/7 AI receptionist.',
    eyebrow: 'Never miss a call',
    h1: 'Every missed call gets an answer in seconds',
    lede: 'When you\'re on a roof or under a sink, you can\'t answer. The homeowner doesn\'t wait. They call the next business on Google. Missed-call text-back and an AI receptionist make sure they hear from you first.',
    includedIntro: 'Simple tools that save jobs you\'re already paying to attract.',
    included: [
      ['Instant text-back', 'Miss a call and the caller gets a friendly text within seconds: "Sorry we missed you, how can we help?"'],
      ['AI receptionist (optional)', 'Add our <a href="/services/ai-answering-service">AI answering service</a> to pick up when you are busy, take name, address and problem, and book or forward the job.'],
      ['Two-way texting', 'Reply to customers by text from one inbox, on your phone.'],
      ['After-hours coverage', 'Calls at night and on weekends still get answered and logged.'],
      ['Connected to your CRM', 'New leads go straight into your CRM or FSM, so nothing gets lost.'],
      ['Call reports', 'See how many calls you got, missed and saved each month.'],
    ],
    steps: [
      ['Set up', 'We connect your business line. Your number stays the same.'],
      ['Customize', 'We write the text messages and receptionist scripts in your voice.'],
      ['Run', 'It works in the background. You get notified of every new lead.'],
    ],
    deepDive: `
<h2>Why this comes before more marketing</h2>
<p>If you\'re missing calls, more ads or rankings just mean more missed calls. Fixing call capture first makes everything else you spend on marketing work harder. It\'s usually the fastest win we can deliver.</p>
<h2>Text messaging compliance</h2>
<p>Business texting in the US requires carrier registration (10DLC). We handle registration so your messages get delivered and stay compliant.</p>`,
    faq: [
      ['Do I have to change my phone number?', 'No. We work with your existing business number.'],
      ['Will callers know it\'s AI?', 'The receptionist is friendly and clear. We can set it to say it\'s an assistant, which we recommend.'],
      ['Can it book directly into my calendar?', 'Yes, if you want it to. Or it can collect details and hand the job to you by text.'],
      ['What if the caller has an emergency?', 'We set up rules so urgent calls are forwarded to you or your on-call tech immediately.'],
    ],
  },
  {
    slug: 'crm-automation', short: 'CRM & follow-up automation',
    path: '/services/crm-automation',
    title: 'CRM & Follow-Up Automation for Contractors | TableTurnerr',
    description: 'A done-for-you CRM for home-service businesses: every lead, call and text in one inbox, with estimate and appointment follow-ups that run themselves.',
    eyebrow: 'CRM & follow-up',
    h1: 'A CRM that follows up while you\'re on the job',
    lede: 'Most owners don\'t lose jobs on price. They lose them because nobody called back. We set up the CRM, move your customers in, write the follow-ups and keep it running, so no lead or estimate is forgotten.',
    includedIntro: 'Set up and run for you. You keep working the way you work now.',
    included: [
      ['Your customers, imported', 'We move your contacts out of your phone, spreadsheet or old software into one clean list.'],
      ['One inbox', 'Leads, calls and texts in one place, with a mobile app for the truck.'],
      ['Estimate follow-up', 'Quiet estimates get friendly reminders that stop as soon as the customer replies.'],
      ['Appointment reminders', 'Automatic reminders before each visit, so fewer people forget.'],
      ['Seasonal campaigns', 'Tune-up and maintenance reminders to past customers before your busy season.'],
      ['Reviews after every job', 'A finished job starts a review request, sent to every customer.'],
    ],
    steps: [
      ['Map', 'On a short call we find where leads slip today: missed calls, estimates, callbacks or old customers.'],
      ['Build', 'We import your customers, connect your job or invoicing software and write the messages in your voice.'],
      ['Run', 'Follow-ups go out on their own. You get a message when a real person needs you.'],
    ],
    deepDive: `
<h2>Do you need a CRM or job software?</h2>
<p>Job software such as Jobber or Housecall Pro runs the work: schedule, dispatch, quotes and invoices. A CRM with follow-up runs the relationship: who called, who went quiet and who\'s due. If you already have job software you like, keep it. We connect to it. <a href="/guides/best-crm-for-home-service-business">Here\'s how to choose between them.</a></p>
<h2>No CRM yet?</h2>
<p>Plenty of good businesses run on a phone and a notebook. Start with <a href="/guides/how-to-keep-track-of-customers">a simple customer list</a>. When callbacks start slipping, we\'ll import it and take it from there.</p>
<h2>Texting the right way</h2>
<p>Business texting in the US needs carrier registration (10DLC), permission from the customer and an easy way to opt out. We handle the registration and build opt-outs in. You tell us who you have permission to message.</p>`,
    faq: [
      ['Do I have to leave Jobber or Housecall Pro?', 'No. We connect to the job software you already use.'],
      ['Can you move my customers from a spreadsheet or my phone?', 'Yes. Send us what you have and we import it.'],
      ['Will the messages sound like a robot?', 'No. We write them in your voice and you approve them. A reply goes to a real person.'],
      ['How much does it cost?', 'CRM and follow-ups are {{PRICE:crm}}. No contracts.'],
      ['Does it send invoices?', 'Most clients keep invoicing in the software they already use, and we connect to it. If you need invoices from completed jobs, ask us about our FieldTask tools.'],
    ],
  },
].map((s) => ({ ...s, crumbs: [['/', 'Home'], ['/services', 'Services'], [s.path, s.short]] }));
