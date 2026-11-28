// Problem guide (added 2026-11-27 by the daily growth task): "why isn't my phone ringing" for home-service owners.
// Research: no marketing page answered this as a diagnosis. Google shows phone-system help docs (ServiceTitan, carriers)
// and generic "Google Business Profile not getting calls" posts that skip missed calls, the call-history change and
// Google's call-button test. Every outside number below was read on the linked page on 2026-11-27.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const PHONE = `<a href="tel:+13323331008">(332) 333-1008</a>`;

// Sources (read 2026-11-27)
const INVOCA = (t = "Invoca, May 2024") => A("https://www.invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses", t);
const SERVICE_DIRECT = (t = "Service Direct's call study, August 2019") => A("https://blog.servicedirect.com/home-service-call-performance-report", t);
const G_CALLS = (t = "Google's help page") => A("https://support.google.com/business/answer/14919056?hl=en", t);
const SER_CALL = (t = "Search Engine Roundtable, October 13, 2025") => A("https://www.seroundtable.com/google-local-results-without-call-button-40260.html", t);
const BRIGHTLOCAL = (t = "BrightLocal's Consumer Search Behavior study, April 2025") => A("https://www.brightlocal.com/research/consumer-search-behavior/", t);

export const guides20 = [
  {
    slug: "why-isnt-my-phone-ringing",
    path: "/guides/why-isnt-my-phone-ringing",
    title: "Why Isn't My Phone Ringing? 10 Causes for Contractors",
    description: "Calls dried up? Check these 10 causes in order: phone setup, missed calls, Google Maps rank, reviews, profile problems, ads and season. With the first fix for each.",
    h1: "Why isn't my phone ringing? 10 causes, and how to check each one",
    lede: "When calls dry up, it's almost always one of four things: calls are coming in but nobody answers, people can't find you on Google, they find you but pick a competitor, or it's the season. Check them in that order, because the first one is the cheapest to fix.",
    eyebrow: "More calls", readMinutes: 9, article: { date: DATE },
    ctaTitle: "Want us to find out why your phone went quiet?",
    content: `
<div class="callout"><p><strong>Short version:</strong> before you spend a dollar on ads, check whether calls are being missed. In one study, home-service owners thought they answered 97% of calls; the real number was 66% (${SERVICE_DIRECT()}). If calls really are down, look at your Google Maps position, your review count against the top 3, your Google Business Profile category and status, and whether competitors started running Local Services Ads. A free Google Maps audit shows most of this in one sitting.</p></div>

<h2>First: is the phone quiet, or are calls being missed?</h2>
<p>This is the most common cause and the one owners spot last. You're on a roof, under a sink or driving. The call rolls to voicemail, the caller hangs up and dials the next company. You never knew they called, so it feels like a slow week.</p>
<p>The numbers back this up. Invoca's research found that 27% of calls to home-service businesses go unanswered, and fewer than 3% of callers who reach voicemail leave a message (${INVOCA()}). So a missed call usually isn't a voicemail you can return. It's a job that went to someone else.</p>
<p><strong>How to check, today:</strong></p>
<ul>
<li>Pull your carrier's or phone system's call log for the last 30 days. Count missed and unanswered calls, not just voicemails.</li>
<li>Call your own number from another phone during work hours and after hours. Does it ring? Who picks up? Does it go to an old employee's cell?</li>
<li>Look for call forwarding left on, Do Not Disturb schedules, or after-hours rules that send calls nowhere.</li>
</ul>
<p><strong>First fix:</strong> make sure every missed call gets an instant text back ("Sorry we missed you, what do you need help with?"), and decide who answers when you can't. See <a href="/services/missed-call-text-back">missed-call text-back</a> and our <a href="/services/ai-answering-service">AI answering service</a>, or read <a href="/guides/speed-to-lead-home-services">why speed to lead matters</a>.</p>

<h2>The 10 causes, in the order to check them</h2>
<table>
<thead><tr><th>#</th><th>What's happening</th><th>How you'd notice</th><th>First thing to do</th></tr></thead>
<tbody>
<tr><td>1</td><td>Phone setup problem</td><td>Your own test call doesn't ring through</td><td>Fix forwarding, routing and after-hours rules</td></tr>
<tr><td>2</td><td>Calls missed, not returned</td><td>Call log shows missed calls with no voicemail</td><td>Missed-call text-back, a backup answerer</td></tr>
<tr><td>3</td><td>Dropped in Google Maps</td><td>You're not in the top 3 when you search your main service from a customer's area</td><td>Free Maps audit; profile and review work</td></tr>
<tr><td>4</td><td>Fewer, older reviews than the top 3</td><td>Competitors show more reviews and newer ones</td><td>Ask every customer, every job</td></tr>
<tr><td>5</td><td>Wrong primary category</td><td>Profile shows a broad category like "Contractor"</td><td>Pick the category that matches your main money job</td></tr>
<tr><td>6</td><td>Profile suspended, unverified or edited</td><td>Profile missing from Maps, or a "suspended" notice</td><td>Fix the cause before you request reinstatement</td></tr>
<tr><td>7</td><td>Wrong or mismatched info</td><td>Old phone number, hours or name on some listings</td><td>Make your name, phone and hours match everywhere</td></tr>
<tr><td>8</td><td>Competitors started paying for the top spots</td><td>"Sponsored" and "Google Guaranteed" boxes above the map</td><td>Decide if Local Services Ads pay for your trade</td></tr>
<tr><td>9</td><td>Website loses the call</td><td>Visitors land but don't call; number hard to tap on phones</td><td>Click-to-call button and phone number at the top</td></tr>
<tr><td>10</td><td>Season or weather</td><td>The same dip happened this time last year</td><td>Past-customer campaigns and maintenance plans</td></tr>
</tbody>
</table>

<h2>Are you still in the top 3 on Google Maps?</h2>
<p>Most calls from Google come from the three businesses in the map pack. Drop to number four or five and calls can fall off fast, even though nothing changed on your end. A competitor got more reviews, or Google changed how it reads your area.</p>
<p>Don't check this by searching from your shop. Google shows results based on where the searcher is, so your ranking at the office isn't your ranking across town. Search your main service ("water heater repair", "roof leak repair") from a phone in the neighborhoods you want work from, or use a ranking grid. Our <a href="/free-google-maps-audit">free Google Maps audit</a> includes a grid across your service area.</p>
<p>If you've dropped, the usual fixes are in <a href="/guides/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a>.</p>

<h2>Do the top 3 have more, newer reviews than you?</h2>
<p>Reviews are one of the few ranking signals you control, and they decide who gets the call once someone sees the map. If the top 3 each have 150 reviews and a few from this week, and you have 40 with the newest from March, you'll lose both the ranking and the click.</p>
<p>You don't need to match the leader overnight. You need a steady flow: a request after every finished job, to every customer, with a follow-up. Our client Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days by asking past customers the right way (<a href="/results/presidential-roofing">see the case study</a>). How many you need depends on your market: see <a href="/guides/how-many-google-reviews-to-rank">how many Google reviews you need to rank</a>. Never pay for reviews or ask only happy customers; Google's rules forbid both.</p>

<h2>Is your Google Business Profile category right?</h2>
<p>Your primary category tells Google which searches you belong in. A plumber listed as "Contractor", or a roofer whose primary category is "Gutter cleaning service", will miss the searches that bring in the big jobs. Choose the primary category that matches the work you most want, and add secondary ones for the rest. More in <a href="/guides/google-business-profile-categories">choosing Google Business Profile categories</a>.</p>

<h2>Is your profile suspended, unverified or changed?</h2>
<p>A suspended or unverified profile can vanish from Maps without much warning. So can a profile that someone else edited: Google accepts suggested edits from the public, and a wrong phone number or "permanently closed" label can sit there for weeks.</p>
<p>Check your profile today: is it verified, are the phone, hours and address settings yours, and is there any notice at the top? If it's suspended, fix the reason before you appeal, or the appeal will fail. Read <a href="/guides/google-business-profile-suspended">why Google Business Profiles get suspended</a> and <a href="/guides/google-business-profile-verification-problems">fixing verification problems</a>. One of our HVAC clients, Cooling Comfort in Inglewood, had a profile stuck unverified for months; it was verified 3 days after one free consultation call (<a href="/results/cooling-comfort">case study</a>).</p>

<h2>Does your info match everywhere?</h2>
<p>Customers check. In ${BRIGHTLOCAL()}, 85% of US consumers said contact details and opening hours are important when they research a local business, and 56% said they often or always check that a business's information is correct across the web. An old phone number on one directory, or hours that say you close at 3 when you work until 6, quietly costs calls. Make your business name, phone number and hours identical on Google, your website, Facebook, Yelp, Bing and any directory you're listed on.</p>

<h2>Did Google change what customers see?</h2>
<p>Two changes catch owners out:</p>
<ul>
<li><strong>You can't see calls from Google the old way.</strong> Google retired the call history feature in Business Profiles on July 31, 2024 (${G_CALLS()}). Calls still come through, but if you were counting calls there, your "calls from Google" number may look like it fell when it didn't. Use a tracking number or your phone system's log instead. See <a href="/guides/how-to-track-lead-sources">how to track where your leads come from</a>.</li>
<li><strong>The call button isn't always there.</strong> In October 2025, local SEO experts reported Google testing local results without the call button (${SER_CALL()}). When that happens, people tap through to your profile or website first. Make sure both make calling one tap away.</li>
</ul>
<p>Paid placements matter too. If competitors started running Local Services Ads, they now sit above the map with a "Google Guaranteed" or "Google Screened" badge. Whether that's worth it for you depends on your trade and cost per lead: compare the options in <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>

<h2>Does your website lose the call?</h2>
<p>Many people visit your website before they call. If the phone number is buried, not tappable on a phone, or the page takes forever to load, they back out and call the next result. Put a click-to-call button at the top of every page, show the towns you serve, and add real reviews near the button. Read <a href="/guides/why-your-website-isnt-getting-leads">why your website isn't getting leads</a>.</p>

<h2>Or is it just the season?</h2>
<p>Compare this month with the same month last year, not with last month. HVAC goes quiet between heating and cooling seasons, roofing slows when storms stop, plumbing dips after the freezes. If the dip matches last year, the fix isn't more ads; it's filling the slow weeks with work you already have access to: maintenance plans, tune-up reminders and a text to past customers. See <a href="/guides/hvac-slow-season-marketing">slow-season marketing</a> and <a href="/guides/win-back-past-customers">how to win back past customers</a>.</p>

<h2>A 30-minute check you can do this week</h2>
<ol>
<li>Call your business number from another phone, during and after hours.</li>
<li>Count missed calls in your phone log for the last 30 days.</li>
<li>Search your top 2 services from a phone in 3 parts of your service area. Note where you show up.</li>
<li>Write down your review count and newest review date next to the top 3 competitors'.</li>
<li>Open your Google Business Profile: check verification, primary category, phone and hours.</li>
<li>Compare this month's calls or jobs with the same month last year.</li>
</ol>
<p>If steps 1 or 2 turn something up, fix that first. It costs the least and pays back the fastest.</p>

<h2>What we do about it</h2>
<p>TableTurnerr is a small, owner-run marketing company for home-service businesses. We text back every missed call, can answer calls with AI when you're busy, run your Google Business Profile, ask every customer for a Google review and keep your listings straight. We sell {{PRICE:plans}}, and you can see every package on our <a href="/pricing">pricing page</a>. If you'd rather start by finding out what's wrong, book a <a href="/free-google-maps-audit">free Google Maps audit</a> or call us at ${PHONE}. You talk to an owner.</p>
`,
    faq: [
      ["Why did my business phone suddenly stop ringing?", "Check missed calls first: many owners find calls are coming in but going unanswered. If calls really fell, the usual causes are dropping out of Google's top 3 map results, competitors getting more reviews, a suspended or edited Google Business Profile, competitors buying Local Services Ads, or the season."],
      ["Why am I not getting calls from my Google Business Profile?", "The common causes are a low map ranking where your customers search, few or old reviews, the wrong primary category, a suspended or unverified profile, or wrong phone and hours. Also note Google retired the call history report on July 31, 2024, so calls may still be coming in without showing there."],
      ["How do I know if I'm missing calls?", "Pull your phone system's or carrier's call log and count missed and unanswered calls, not just voicemails. Fewer than 3% of callers sent to voicemail leave a message, according to Invoca, so voicemail counts hide most missed calls."],
      ["Should I run ads when calls slow down?", "Only after you've ruled out missed calls and profile problems. Ads send more callers to the same phone; if a third of calls go unanswered, you pay for jobs you never get. Compare the same month last year too: a seasonal dip calls for past-customer campaigns, not more ads."],
      ["Can TableTurnerr tell me why my calls dropped?", "Yes. Our free Google Maps audit shows where you rank across your service area, how your reviews compare with the top competitors, and what to fix first. Book it online or call (332) 333-1008."],
    ],
  },
];
