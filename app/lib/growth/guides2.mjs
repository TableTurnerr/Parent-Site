// Month 2-3 guides: bottom-of-funnel questions owners search right before they hire help.
const DATE = '2026-11-16';
const POLICY = '<a href="https://support.google.com/contributionpolicy/answer/7400114" rel="noopener">Google\'s prohibited and restricted content policy</a>';
const GUIDELINES = '<a href="https://support.google.com/business/answer/3038177" rel="noopener">Google\'s guidelines for representing your business</a>';

const fsmGuide = ({ slug, tool, title, description, extra }) => ({
  slug, path: `/blog/${slug}`, title, description,
  h1: `How to get more Google reviews with ${tool}`,
  lede: `${tool} can send review requests, but most contractors using it still have fewer reviews than they should. Here\'s how to set it up properly and what to add when it isn\'t enough.`,
  eyebrow: `${tool} reviews`, readMinutes: 6, article: { date: DATE },
  ctaTitle: `Want us to run reviews from ${tool} for you?`,
  content: `
<div class="callout"><p><strong>Short version:</strong> turn on ${tool}\'s review requests if your plan has them, send them by text right after the job, include your direct Google review link, ask every customer, and run a one-time campaign to past customers.</p></div>
<h2>Check what your plan includes</h2>
<p>${tool}\'s review features depend on your plan and change over time. Look in your settings or ask ${tool} support whether automatic review requests are included, whether they go by text, email or both, and whether you can choose Google as the destination.</p>
${extra}
<h2>Use your direct Google review link</h2>
<p>Send customers straight to the "write a review" box, not to your profile or website. In your Google Business Profile, choose <em>Ask for reviews</em> to copy the link. Every extra tap loses people.</p>
<h2>Timing and channel</h2>
<ul>
<li><strong>Send it the same day.</strong> Trigger the request when the job is marked complete or the invoice is paid, while the customer still remembers the tech\'s name.</li>
<li><strong>Text beats email</strong> for most home-service customers. Use email as a backup.</li>
<li><strong>One reminder</strong> a few days later is fine. More than that annoys people.</li>
<li><strong>Personalize it.</strong> Mention the tech and the job: "Thanks for having Mike out to fix your water heater today."</li>
</ul>
<h2>Don\'t forget past customers</h2>
<p>Your ${tool} client list probably holds hundreds of customers who were never asked. A single, polite request to everyone from the last year or two is often the fastest review boost you\'ll get. That\'s how our client <a href="/results/presidential-roofing">Presidential Roofing</a> got a big part of its jump from 27 to 43 reviews in 20 days.</p>
<h2>Stay inside Google\'s rules</h2>
<p>Under ${POLICY}, you can\'t selectively ask only happy customers (review gating) or offer discounts or gifts in exchange for reviews. Ask everyone, the same way.</p>
<h2>When software isn\'t enough</h2>
<p>The request is the easy part. Replying to every review, handling bad ones, running past-customer campaigns, keeping the Google profile active and tracking whether reviews actually move your Maps ranking take time most owners don\'t have. That\'s what our <a href="/services/review-generation">done-for-you review generation</a> covers, connected to ${tool}.</p>`,
  faq: [
    [`Does ${tool} send Google review requests automatically?`, `On some plans. Features vary by plan and change, so check your settings or ask ${tool} support.`],
    ['Is it OK to only ask happy customers?', 'No. Selectively asking only satisfied customers is review gating, which breaks Google\'s policy. Ask everyone.'],
    ['Can I offer a discount for a review?', 'No. Incentives for reviews break Google\'s policy and can get reviews removed.'],
  ],
});

export const guides2 = [
  fsmGuide({
    slug: 'housecall-pro-google-reviews', tool: 'Housecall Pro',
    title: 'How to Get More Google Reviews With Housecall Pro',
    description: 'Set up Housecall Pro review requests the right way: timing, direct Google links, past-customer campaigns, Google\'s rules, and what to add when it isn\'t enough.',
    extra: '<h2>Housecall Pro tips</h2><p>Make sure every customer record has a mobile number, since text requests only reach customers with one. If techs close jobs from the app, check that closing a job actually triggers the request; a job left open never sends it.</p>',
  }),
  fsmGuide({
    slug: 'servicetitan-review-requests', tool: 'ServiceTitan',
    title: 'ServiceTitan Review Requests: Getting More Google Reviews',
    description: 'How to get more Google reviews from ServiceTitan: review request setup, timing, tech-level tracking, past-customer campaigns and staying within Google\'s rules.',
    extra: '<h2>ServiceTitan tips</h2><p>Reputation features in ServiceTitan may be part of an add-on rather than the core plan, so confirm what you have. Larger teams should track reviews by technician: which techs get mentioned, and which customers never get asked. That shows where the process breaks.</p>',
  }),
  fsmGuide({
    slug: 'workiz-google-reviews', tool: 'Workiz',
    title: 'How to Get More Google Reviews With Workiz',
    description: 'Get more Google reviews from Workiz: request setup, timing, direct review links, past-customer campaigns, Google\'s rules and when to add done-for-you help.',
    extra: '<h2>Workiz tips</h2><p>Check that your job statuses are set up so the request fires when a job is truly done, not when it\'s scheduled. If you use Workiz for calls, look at missed calls too: a customer who couldn\'t reach you won\'t leave a good review.</p>',
  }),

  {
    slug: 'how-many-google-reviews-to-rank',
    path: '/blog/how-many-google-reviews-to-rank',
    title: 'How Many Google Reviews Do You Need to Rank in the Map Pack?',
    description: 'There\'s no magic number of Google reviews. Here\'s how to work out your own target from the top 3 businesses near you, and why recency matters as much as count.',
    h1: 'How many Google reviews do you need to rank in the map pack?',
    lede: 'There\'s no universal number. The right target depends on who you\'re competing with in your town. Here\'s how to work it out in ten minutes.',
    eyebrow: 'Google reviews', readMinutes: 6, article: { date: DATE },
    ctaTitle: 'Want us to work out your number?',
    content: `
<div class="callout"><p><strong>Short version:</strong> look at the three businesses in the map pack for your main service in your town. Your first target is to match their review count and beat their recent review pace. Reviews are one factor among several, so fix your categories and services too.</p></div>
<h2>Why there\'s no magic number</h2>
<p>Google weighs relevance, distance and prominence. Reviews feed into prominence, but so do your website, links and how well known you are. A plumber in a small town might rank with 30 reviews; one in a big metro might need several hundred. The number that matters is your competitors\' number.</p>
<h2>How to find your target</h2>
<ol>
<li>Search your main service, like "roofer near me," from a location in the middle of your service area. Use a private browser window.</li>
<li>Write down the three businesses in the map pack: review count, rating and the date of their last few reviews.</li>
<li>Repeat for your second and third most valuable services and one or two other towns you serve.</li>
<li>Your target: match the median review count of the businesses you see, and get more reviews per month than they do.</li>
</ol>
<h2>Recency matters as much as count</h2>
<p>Homeowners look at how recent reviews are. A business with 200 reviews but none in six months can look like it\'s slowing down next to one with 80 reviews and several this week. A steady pace beats occasional bursts.</p>
<h2>What about rating?</h2>
<p>A 4.7 to 4.9 rating with plenty of reviews looks more believable to many homeowners than a perfect 5.0 from a handful. Don\'t panic over the occasional bad review. Reply calmly and professionally; future customers read your replies.</p>
<h2>How fast can you get there?</h2>
<p>Most businesses have far more happy past customers than reviews. Asking all of them once, then asking every new customer after each job, usually closes the gap faster than owners expect. Our client <a href="/results/presidential-roofing">Presidential Roofing went from 27 to 43 reviews in 20 days</a> that way.</p>
<h2>Reviews alone won\'t do it</h2>
<p>If your primary category is wrong or your services aren\'t listed, more reviews won\'t fix your ranking. See <a href="/blog/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a> for the full list.</p>`,
    faq: [
      ['Is there a minimum number of reviews to show in the map pack?', 'No. Businesses with few reviews can show up, especially in less competitive areas. More reviews help you compete and convert.'],
      ['Do review keywords help ranking?', 'Reviews that mention the service and town help homeowners, and may help Google understand what you do. Don\'t script customers; just ask them to mention the job.'],
      ['Should I reply to every review?', 'Yes. It shows you care, and homeowners read replies, especially to negative reviews.'],
    ],
  },

  {
    slug: 'google-business-profile-suspended',
    path: '/blog/google-business-profile-suspended',
    title: 'Google Business Profile Suspended? Why and How to Fix It',
    description: 'Why Google suspends business profiles for contractors and service-area businesses, how to appeal, what evidence to prepare, and how to avoid it next time.',
    h1: 'Google Business Profile suspended? Why it happens and how to fix it',
    lede: 'A suspended profile means your business can disappear from Google Maps overnight. Here\'s what usually causes it for home-service businesses and how to get reinstated.',
    eyebrow: 'Google Business Profile', readMinutes: 7, article: { date: DATE },
    ctaTitle: 'Want us to check your profile for risks?',
    content: `
<div class="callout"><p><strong>Short version:</strong> fix whatever broke the rules first, gather proof that your business is real and located where you say, then submit an appeal through Google\'s official appeals process. Don\'t create a new profile while the old one is suspended.</p></div>
<h2>Common reasons contractors get suspended</h2>
<ul>
<li><strong>Keywords in the business name.</strong> "Mike\'s Plumbing | Best Plumber Denver" when your legal name is "Mike\'s Plumbing." ${GUIDELINES} say your name should match the real world.</li>
<li><strong>Address problems.</strong> Using a virtual office, PO box or coworking space you don\'t staff, or showing a home address when you serve customers at their location.</li>
<li><strong>Multiple profiles</strong> for the same business, or one per city without a real staffed location in each.</li>
<li><strong>Big edits all at once.</strong> Changing name, address and categories together can trigger a review.</li>
<li><strong>Industry sweeps.</strong> Categories with lots of spam (locksmiths, garage doors, some trades) get extra scrutiny.</li>
</ul>
<h2>How to get reinstated</h2>
<ol>
<li><strong>Find out what kind of suspension it is.</strong> Sign in to your profile and read the notice. Google\'s help center explains the appeal options for your situation.</li>
<li><strong>Fix the problem first.</strong> Remove keywords from the name, correct the address or switch to a service-area setup.</li>
<li><strong>Gather evidence.</strong> Business license, utility bill or lease at your address, photos of your signage, vehicles and equipment, and your website showing the same name, phone and address.</li>
<li><strong>Submit the appeal</strong> through Google\'s official appeals tool and include your evidence. Be factual.</li>
<li><strong>Be ready for video verification.</strong> Google may ask for a video showing your location, signage, tools or vehicle.</li>
</ol>
<h2>What not to do</h2>
<ul>
<li>Don\'t create a new profile to replace the suspended one. That usually makes it worse.</li>
<li>Don\'t pay anyone promising guaranteed reinstatement through "inside contacts."</li>
<li>Don\'t keep editing the profile while the appeal is in review.</li>
</ul>
<h2>Preventing it next time</h2>
<p>Use your real business name, set up as a service-area business if customers don\'t come to you, make changes gradually, and keep proof of your business on file. If you\'re not sure your profile is safe, our <a href="/free-google-maps-audit">free audit</a> flags the common risks. Ongoing profile care is part of our <a href="/services/google-business-profile">Google Business Profile management</a>.</p>`,
    faq: [
      ['How long does a reinstatement take?', 'It varies from days to weeks. Submit complete evidence the first time to avoid delays.'],
      ['Will I lose my reviews?', 'Reviews usually come back when a suspended profile is reinstated. Creating a new profile starts from zero.'],
      ['Can I use my home address?', 'Yes, as a service-area business with the address hidden, if you serve customers at their location. You can\'t use an address where you don\'t operate.'],
    ],
  },

  {
    slug: 'local-services-ads-vs-google-ads',
    path: '/blog/local-services-ads-vs-google-ads',
    title: 'Local Services Ads vs. Google Ads for Contractors',
    description: 'Local Services Ads vs. Google Search Ads for home-service businesses: how each charges, where each shows, who each suits, and how both fit with the map pack.',
    h1: 'Local Services Ads vs. Google Ads for contractors',
    lede: 'Both put you above the free results, but they work very differently. Here\'s how to decide which one, if either, fits your business.',
    eyebrow: 'Paid search', readMinutes: 7, article: { date: DATE },
    ctaTitle: 'Want to know if paid ads make sense for you?',
    content: `
<div class="callout"><p><strong>Short version:</strong> Local Services Ads charge per lead and lean heavily on your reviews and verification. Google Search Ads charge per click and give you more control but need more management. Neither replaces a strong Google Business Profile, because the free map pack shows on nearly every home-service search.</p></div>
<h2>How Local Services Ads work</h2>
<p>Local Services Ads (LSA) show at the very top of many home-service searches, often with a Google Guaranteed or Google Screened badge. You go through business verification and background checks, set your service area, job types and weekly budget, and pay when a customer contacts you through the ad, rather than per click. You can dispute leads that weren\'t valid, within Google\'s rules.</p>
<p>Your reviews and responsiveness strongly affect how often you show. Businesses with more reviews, a good rating and fast answers tend to do better.</p>
<h2>How Google Search Ads work</h2>
<p>Search Ads show below LSA and above the map pack. You choose keywords, write ads, send people to a page you control and pay each time someone clicks, whether or not they call. They give you more control over which jobs you target and where traffic lands, but they need careful management: negative keywords, call tracking and good landing pages.</p>
<h2>Side by side</h2>
<table>
<tr><th></th><th>Local Services Ads</th><th>Google Search Ads</th></tr>
<tr><td>You pay for</td><td>Leads (calls, messages, bookings)</td><td>Clicks</td></tr>
<tr><td>Setup</td><td>Verification, background checks, licenses where required</td><td>Account, keywords, ads, landing pages</td></tr>
<tr><td>Control</td><td>Job types, area, budget</td><td>Keywords, ad copy, landing page, bids, schedule</td></tr>
<tr><td>Biggest factor</td><td>Reviews, responsiveness, verification</td><td>Ad quality, landing page, keyword choice</td></tr>
<tr><td>Management time</td><td>Lower</td><td>Higher</td></tr>
</table>
<h2>Which should you choose?</h2>
<ul>
<li><strong>LSA</strong> often suits owner-operators and small teams in urgent trades (plumbing, HVAC, garage doors, locksmiths) who answer the phone fast and have solid reviews.</li>
<li><strong>Search Ads</strong> suit businesses that want specific high-value jobs (a full roof, a new HVAC system), have a good landing page and someone to manage the account.</li>
<li><strong>Neither</strong> may make sense yet if your Google profile is thin and reviews are few. Paid clicks to a weak profile convert poorly, and LSA rewards reviews anyway.</li>
</ul>
<h2>Where the free map pack fits</h2>
<p>Ads stop when the budget stops. The map pack keeps working. Most contractors get the best return by fixing their profile and review flow first, then adding paid ads to fill gaps. See <a href="/blog/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a>.</p>`,
    faq: [
      ['Do reviews affect Local Services Ads?', 'Yes. Reviews and rating are among the strongest factors in how often LSA shows you.'],
      ['Can I run LSA and Search Ads together?', 'Yes. Many contractors do, and they show in different places on the page.'],
      ['Does TableTurnerr manage ads?', 'Our focus is the free side of Google: your profile, reviews, website and calls. A stronger profile and more reviews also improve LSA results.'],
    ],
  },

  {
    slug: 'best-review-software-for-contractors',
    path: '/blog/best-review-software-for-contractors',
    title: 'Best Review Software for Contractors: An Honest Comparison',
    description: 'An honest look at review software for contractors: what your FSM already does, when tools like Birdeye or Podium fit, and when done-for-you makes sense.',
    h1: 'Best review software for contractors: an honest comparison',
    lede: 'You may already pay for review requests without knowing it. Here\'s how to decide between what your field-service software includes, a standalone review platform, and having someone run it for you.',
    eyebrow: 'Review software', readMinutes: 8, article: { date: DATE },
    ctaTitle: 'Not sure which option fits? We\'ll tell you honestly.',
    content: `
<div class="callout"><p><strong>Short version:</strong> if you use Jobber, Housecall Pro or ServiceTitan, check whether your plan already sends review requests. Standalone platforms add multi-location dashboards, widgets and messaging. Done-for-you makes sense when the problem is time, not features.</p></div>
<h2>Option 1: what your field-service software already does</h2>
<p>Many field-service tools now include automatic review requests on some plans, usually triggered when a job closes or an invoice is paid. Features change and vary by plan, so check before buying something else.</p>
<p><strong>Good for:</strong> businesses that just need requests sent automatically. <strong>Limits:</strong> usually basic reporting, limited past-customer campaigns, and no one replying to reviews or watching your Maps ranking.</p>
<p>Guides: <a href="/blog/jobber-google-reviews">Jobber</a>, <a href="/blog/housecall-pro-google-reviews">Housecall Pro</a>, <a href="/blog/servicetitan-review-requests">ServiceTitan</a>, <a href="/blog/workiz-google-reviews">Workiz</a>.</p>
<h2>Option 2: standalone review platforms</h2>
<p>Tools like Birdeye, Podium, NiceJob, GatherUp and PulseM focus on reviews and customer messaging. Depending on the tool, you get review requests across several sites, website widgets, texting inboxes, multi-location dashboards and integrations.</p>
<p><strong>Good for:</strong> multi-location businesses, teams with someone to manage it, and businesses that want messaging in the same tool. <strong>Limits:</strong> another subscription and another login; the software doesn\'t do the work itself.</p>
<p>Comparisons: <a href="/alternatives/birdeye-alternative">Birdeye</a>, <a href="/alternatives/podium-alternative">Podium</a>, <a href="/alternatives/nicejob-alternative">NiceJob</a>, <a href="/alternatives/gatherup-alternative">GatherUp</a>, <a href="/alternatives/pulsem-alternative">PulseM</a>.</p>
<h2>Option 3: done for you</h2>
<p>A service that connects to your existing software and runs the whole thing: requests after every job, past-customer campaigns, replies to reviews, profile updates and reporting on whether it\'s moving your ranking.</p>
<p><strong>Good for:</strong> owners who don\'t have time, or who\'ve tried software and reviews still aren\'t growing. <strong>Limits:</strong> costs more than basic software, and you\'re trusting someone with your reputation, so pick a provider who follows Google\'s rules.</p>
<h2>What to look for, whatever you choose</h2>
<ul>
<li>Text requests with a direct Google review link</li>
<li>Automatic trigger when a job is completed</li>
<li>A way to reach past customers once</li>
<li>No review gating: every customer gets the same request</li>
<li>Reporting you\'ll actually look at</li>
</ul>
<h2>Our take</h2>
<p>We\'re a done-for-you service, so we\'re biased, and we\'ll still tell you when your FSM\'s built-in feature is enough. If your reviews are growing steadily and you reply to them, you probably don\'t need us for reviews. If they\'re not, <a href="/services/review-generation">here\'s how we run it</a>.</p>`,
    faq: [
      ['Do I need separate review software if I use Jobber?', 'Maybe not. Check whether your plan includes review requests. Add something only if you need features or help it doesn\'t provide.'],
      ['Is review gating allowed if the software offers it?', 'No. Google\'s policy prohibits selectively soliciting positive reviews, whatever the software allows.'],
      ['Which is cheapest?', 'Usually the feature already in your FSM plan. Standalone tools and done-for-you services cost more because they do more.'],
    ],
  },

  {
    slug: 'contractor-seo-cost',
    path: '/blog/contractor-seo-cost',
    title: 'How Much Does SEO Cost for Contractors?',
    description: 'What contractor SEO actually costs, what drives the price, what you should get for it, red flags to avoid, and how to judge whether it\'s paying off.',
    h1: 'How much does SEO cost for contractors?',
    lede: 'Prices range from a cheap monthly package to big agency retainers. Here\'s what drives the cost, what you should get, and how to tell whether it\'s working.',
    eyebrow: 'Local SEO', readMinutes: 7, article: { date: DATE },
    ctaTitle: 'Want a straight answer on what you need?',
    content: `
<div class="callout"><p><strong>Short version:</strong> local SEO for a small home-service business usually runs from a few hundred to a few thousand dollars a month, depending on competition, how many services and towns you target, and whether content, reviews and website work are included. Judge it by calls and booked jobs, not reports full of jargon.</p></div>
<h2>What drives the price</h2>
<ul>
<li><strong>Competition.</strong> Ranking for "roofer" in a large metro takes more work than "handyman" in a small town.</li>
<li><strong>Scope.</strong> How many services, towns and pages you need.</li>
<li><strong>What\'s included.</strong> Profile management, review generation, new pages, website fixes, citations and reporting are often priced separately.</li>
<li><strong>Who does the work.</strong> A senior team costs more than an outsourced checklist, and usually gets better results.</li>
</ul>
<h2>Common pricing models</h2>
<table>
<tr><th>Model</th><th>How it works</th><th>Watch out for</th></tr>
<tr><td>Monthly retainer</td><td>Ongoing work for a fixed fee</td><td>Long contracts with vague deliverables</td></tr>
<tr><td>One-time setup</td><td>Profile, citations and pages built once</td><td>No follow-through; rankings fade</td></tr>
<tr><td>Per page or project</td><td>Pay for specific content or fixes</td><td>Pages written without a plan</td></tr>
<tr><td>Pay per lead / ranking</td><td>Pay only for results</td><td>Leads you can\'t verify, or rankings for terms nobody searches</td></tr>
</table>
<h2>What you should get</h2>
<ul>
<li>A clear plan: which services and towns, in what order, and why</li>
<li>Google Business Profile work: categories, services, photos, posts</li>
<li>A system for steady reviews</li>
<li>Service pages that match how homeowners search</li>
<li>Monthly reporting on calls, form fills, reviews and rankings across your service area</li>
</ul>
<h2>Red flags</h2>
<ul>
<li>"Guaranteed #1 ranking"</li>
<li>Keyword-stuffing your business name or creating fake addresses</li>
<li>Buying reviews or links</li>
<li>Contracts that lock you in for a year with no results clause</li>
<li>Reports that show traffic but never calls</li>
</ul>
<h2>How long until it pays off?</h2>
<p>Profile and review improvements can show in weeks. New pages typically take a few months to rank. SEO compounds: unlike ads, the work keeps paying after it\'s done.</p>
<h2>How we price</h2>
<p>We\'re month to month, and we scope it after the <a href="/free-google-maps-audit">free audit</a> so you only pay for what moves your ranking. See our <a href="/services/local-seo">local SEO service</a>.</p>`,
    faq: [
      ['Is cheap SEO worth it?', 'Sometimes, for a basic profile setup. Very cheap ongoing packages often deliver automated reports and little real work.'],
      ['Should SEO include my Google Business Profile?', 'For a contractor, yes. The map pack is where most local calls start.'],
      ['How do I know it\'s working?', 'Track calls and form fills from Google, reviews per month, and rankings across your service area, not just from your office.'],
    ],
  },

  // Search Console (Aug-Nov 2026): "electrician review management", "electrician review software",
  // "online review management for electricians", "electrician reputation management software" all get impressions.
  {
    slug: 'electrician-review-management',
    path: '/blog/electrician-review-management',
    title: 'Electrician Review Management: Get More Google Reviews',
    description: 'Review management for electricians: when to ask, what to text, how to reply to bad reviews, and whether you need review software or a done-for-you service.',
    h1: 'Review management for electricians: get more Google reviews',
    lede: 'Homeowners can\'t inspect your wiring, so they read your reviews instead. Here\'s a simple system for electricians to get a steady stream of Google reviews, reply to them well, and stay inside Google\'s rules.',
    eyebrow: 'Electrician reviews', readMinutes: 7, article: { date: DATE },
    ctaTitle: 'Want us to run your reviews for you?',
    content: `
<div class="callout"><p><strong>Short version:</strong> text every customer a direct Google review link the day the job is done, mention the tech and the work, send one reminder, ask past customers once, and reply to every review within a few days. Never ask only the happy ones, and never offer anything in return.</p></div>
<h2>Why reviews matter more for electricians</h2>
<p>Electrical work is a safety purchase. A homeowner hiring for a panel upgrade or an EV charger is worried about fire, failed inspections and someone cutting corners they can\'t see. Reviews are how they check. Reviews also affect where you show on Google Maps: Google lists review count and score among the things that affect <a href="https://support.google.com/business/answer/7091" rel="noopener">local ranking</a>.</p>
<p>The reviews that help most say what was done: "replaced our 100-amp panel with 200-amp, pulled the permit, passed inspection first time." That reassures the next customer and gives Google words that match what people search.</p>
<h2>When to ask</h2>
<ul>
<li><strong>Service calls:</strong> the same day, right after the job is closed or the invoice is paid.</li>
<li><strong>Projects with an inspection</strong> (panels, rewires, generators): after the inspection passes. That\'s when the customer is relieved and most likely to write something specific.</li>
<li><strong>Commercial work:</strong> ask the person you dealt with, by name, once the job is signed off.</li>
</ul>
<h2>What to send</h2>
<p>Text works better than email for most homeowners. Use your direct "write a review" link: in your Google Business Profile, choose <em>Ask for reviews</em> to copy it. Keep the message short and personal:</p>
<div class="callout"><p>"Hi Sarah, thanks for having Dave out to install your EV charger today. If you have a minute, a Google review helps other homeowners find a licensed electrician they can trust: [link]. Thanks! – Mike, Bright Line Electric"</p></div>
<p>One reminder two or three days later is fine. More than that annoys people.</p>
<h2>Automate it with the software you already use</h2>
<p>Most electricians already run jobs in a field-service tool, and many of those can send review requests when a job closes. Check your plan first: see our guides for <a href="/blog/servicetitan-review-requests">ServiceTitan</a>, <a href="/blog/housecall-pro-google-reviews">Housecall Pro</a>, <a href="/blog/jobber-google-reviews">Jobber</a> and <a href="/blog/workiz-google-reviews">Workiz</a>.</p>
<h2>Ask your past customers once</h2>
<p>Your customer list probably holds hundreds of people who were never asked. A single, polite text to everyone from the last year or two is usually the quickest jump you\'ll see. That\'s how our client <a href="/results/presidential-roofing">Presidential Roofing</a> got a big part of its jump from 27 to 43 reviews in 20 days.</p>
<h2>Replying to reviews, including the bad ones</h2>
<p>Reply to every review. For good ones, thank them and mention the job ("Glad the new panel is working well"). For a bad one:</p>
<ul>
<li><strong>Reply calmly within a few days.</strong> The next customer reads your reply more than the complaint.</li>
<li><strong>Don\'t argue or share private details.</strong> Acknowledge it, explain briefly if there\'s a fact to correct (for example, a delay caused by the utility or the inspector), and offer to talk offline.</li>
<li><strong>Fix it if you can</strong>, then ask whether they\'d update the review. Don\'t pressure them.</li>
<li><strong>Report reviews that break Google\'s rules</strong> (fake, off-topic, from someone who was never a customer). You can\'t remove a review just because it\'s negative.</li>
</ul>
<h2>Stay inside Google\'s rules</h2>
<p>Under ${POLICY}, you can\'t selectively ask only satisfied customers (review gating), offer discounts or gifts for reviews, or post reviews for yourself. Breaking these rules can get reviews removed or your profile restricted.</p>
<h2>Review software or done for you?</h2>
<p>If your field-service tool already sends requests and your reviews are growing, you may not need anything else. Standalone platforms such as Podium, Birdeye, NiceJob or GatherUp add messaging and dashboards, but someone still has to run them. See our <a href="/blog/best-review-software-for-contractors">honest comparison of review software</a>. If the problem is time, our <a href="/services/review-generation">done-for-you review generation</a> runs requests, past-customer campaigns and replies for you, connected to the software you already use.</p>`,
    faq: [
      ['How many Google reviews does an electrician need?', 'Enough to match or beat the top three electricians in your area, plus a steady flow of new ones. Recent reviews count, not just the total.'],
      ['Should I ask for reviews on Yelp or Facebook too?', 'Google matters most for local calls. Once Google is steady, you can ask some customers for other sites, but don\'t split every request.'],
      ['Can I offer a discount for a review?', 'No. Incentives for reviews break Google\'s policy and can get reviews removed.'],
      ['Is it OK to ask only customers I know are happy?', 'No. That\'s review gating, which Google prohibits. Ask everyone the same way.'],
    ],
  },
].map((g) => ({ ...g, crumbs: [['/', 'Home'], ['/blog', 'Guides'], [g.path, g.h1.split(':')[0].replace(/\?$/, '')]] }));
