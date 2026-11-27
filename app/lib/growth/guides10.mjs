// Operations guides that drive revenue (added 2026-11-27): field-service software comparison, speed to lead, CSR phone
// script, flat-rate vs hourly pricing, HVAC shoulder-season marketing and lead-source tracking.
// Third-party figures were read on the linked pages on 2026-11-27 (vendor pricing pages, Google help docs, IRS,
// ENERGY STAR, Invoca, Service Direct, CallRail, HBR coverage) unless the text says otherwise. Re-check dated figures
// when updating. TableTurnerr prices are never typed here: {{PRICE:<key>}} and {{DEMO}} tokens are filled from
// app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const JOBBER = (t = "Jobber's pricing page") => A("https://www.getjobber.com/pricing/", t);
const HCP = (t = "Housecall Pro's pricing page") => A("https://www.housecallpro.com/pricing/", t);
const HCP_HOME = (t = "Housecall Pro's homepage") => A("https://www.housecallpro.com/", t);
const ST_PRICING = (t = "ServiceTitan's pricing page") => A("https://www.servicetitan.com/pricing", t);
const ST_HOME = (t = "ServiceTitan's homepage") => A("https://www.servicetitan.com/", t);
const ZAP_ST = (t = "ServiceTitan app on Zapier") => A("https://zapier.com/apps/servicetitan/integrations", t);
const HBR = (t = "Harvard Business Review") => A("https://hbr.org/2011/03/the-short-life-of-online-sales-leads", t);
const HBR_SUMMARY = (t = "SmartCompany's summary of the study") => A("https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/", t);
const CBS = (t = "CBS News") => A("https://www.cbsnews.com/news/online-sales-leads-how-long-are-they-hot/", t);
const LRM = (t = "Lead Response Management summary") => A("https://mit.icagency.com/", t);
const INVOCA26 = (t = "Invoca's 2026 Home Services Benchmarks report") => A("https://invoca.com/reports/the-invoca-home-services-lead-conversion-benchmarks-report-2026", t);
const INVOCA_VM = (t = "Invoca") => A("https://invoca.com/blog/how-much-missed-sales-calls-cost-home-services-businesses", t);
const SERVICEDIRECT = (t = "Service Direct's call performance report") => A("https://blog.servicedirect.com/home-service-call-performance-report", t);
const CALLRAIL = (t = "CallRail's January 2025 report") => A("https://www.silicon.co.uk/press-release/callrail-releases-report-benchmarking-marketing-efforts-for-small-businesses", t);
const CALLRAIL_PRICING = (t = "CallRail's pricing page") => A("https://www.callrail.com/pricing", t);
const ENERGYSTAR = (t = "ENERGY STAR") => A("https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist", t);
const IRS_25C = (t = "the IRS") => A("https://www.irs.gov/newsroom/faqs-for-modification-of-sections-25c-25d-25e-30c-30d-45l-45w-and-179d-under-public-law-119-21-139-stat-72-july-4-2025-commonly-known-as-the-one-big-beautiful-bill-obbb", t);
const GA_UTM = (t = "Google Analytics help") => A("https://support.google.com/analytics/answer/10917952", t);
const GBP_PERF = (t = "Google's Business Profile performance help page") => A("https://support.google.com/business/answer/9918094?hl=en", t);
const GBP_GA = (t = "link your Business Profile to Google Analytics") => A("https://support.google.com/analytics/answer/16930347?hl=en", t);
const GBP_GUIDE = (t = "Google's Business Profile guidelines") => A("https://support.google.com/business/answer/3038177?hl=en", t);

export const guides10 = [
  {
    slug: "servicetitan-vs-housecall-pro-vs-jobber",
    path: "/guides/servicetitan-vs-housecall-pro-vs-jobber",
    title: "ServiceTitan vs Housecall Pro vs Jobber (2026)",
    description: "ServiceTitan vs Housecall Pro vs Jobber, checked November 2026: who each fits, what pricing is public, dispatch, invoicing, marketing add-ons and integrations.",
    h1: "ServiceTitan vs Housecall Pro vs Jobber: which fits your shop in 2026?",
    lede: "All three run scheduling, dispatch, invoicing and payments for home-service companies. They differ in who they're built for, how they price and how much setup they need. We sell none of them, and we connect to all three.",
    eyebrow: "Software", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Whichever you pick, we plug into it.",
    content: `
<div class="callout"><p><strong>Short version:</strong> Jobber and Housecall Pro publish their prices and suit owner-operators up to mid-size crews. ServiceTitan doesn't publish prices, aims at larger residential and commercial shops, and takes more setup. A 1 to 10 truck shop usually starts with Jobber or Housecall Pro. A shop with a dispatcher, a call center and several departments should get a ServiceTitan quote too.</p></div>
<h2>Side by side</h2>
<p>Read on each vendor's own pages on November 27, 2026. Prices change often and both Jobber and Housecall Pro were showing introductory discounts, so check the price after any promotion ends.</p>
<table>
<thead><tr><th></th><th>Jobber</th><th>Housecall Pro</th><th>ServiceTitan</th></tr></thead>
<tbody>
<tr><td>Built for</td><td>Plans priced for 1 to 15 users; larger teams contact sales</td><td>Says it's "tailored for teams of 1 to 100+"</td><td>Says it's for "commercial and residential trades," with enterprise, franchise and private equity segments</td></tr>
<tr><td>Public pricing</td><td>Yes</td><td>Yes</td><td>No. Contact sales for a quote</td></tr>
<tr><td>Entry price, billed monthly</td><td>Core $49/mo (1 user)</td><td>Basic $79/mo (1 user)</td><td>Not published</td></tr>
<tr><td>Team pricing, billed monthly</td><td>Connect 5 users $199, Grow 5 users $299, Plus 5 users $499; extra users $29/mo</td><td>Essentials $189 (5 users), Max $329 (8 users); extra users $35/mo on Max</td><td>Not published</td></tr>
<tr><td>Scheduling and dispatch</td><td>Yes, online booking on every plan</td><td>Yes, scheduling and dispatching</td><td>Yes, plus Scheduling Pro and Dispatch Pro products</td></tr>
<tr><td>Invoicing and payments</td><td>Yes; automatic quote and invoice follow-ups from Connect</td><td>Yes</td><td>Yes, with a pricebook product (Pricebook Pro)</td></tr>
<tr><td>Reviews and marketing</td><td>Marketing Suite add-on $99/mo; Reviews add-on (price not listed)</td><td>Review management in Basic; Campaigns and Websites add-ons (prices not listed)</td><td>Marketing Pro product (quote)</td></tr>
<tr><td>AI call answering</td><td>Receptionist add-on $99/mo</td><td>CSR AI add-on (price not listed)</td><td>AI Virtual Agent and Contact Center Pro (quote)</td></tr>
<tr><td>QuickBooks sync</td><td>From Connect</td><td>From Essentials</td><td>Ask in the demo</td></tr>
<tr><td>Open integrations</td><td>App marketplace</td><td>Zapier and open API on Max</td><td>Says 70+ pre-built integrations; also on Zapier</td></tr>
<tr><td>How TableTurnerr connects</td><td>Official integration</td><td>Connects on the Max plan (the one with API and Zapier access)</td><td>Through Zapier or Make</td></tr>
</tbody>
</table>
<p>Sources: ${JOBBER()}, ${HCP()}, ${HCP_HOME()}, ${ST_PRICING()} and ${ST_HOME()}, all checked November 27, 2026. Jobber's annual prices were lower, for example Core at $29 a month after the first year. Housecall Pro listed $59, $149 and $299 a month paid yearly.</p>
<h2>Who each one fits</h2>
<h3>Jobber</h3>
<p>Jobber is easy to start on and priced by number of users, so it fits solo operators and small crews: a handyman, a lawn care crew, a two-van plumbing shop, a pressure washing business. The cheapest plan covers quoting, scheduling and invoicing. Most growing shops end up on Connect or Grow because that's where automatic follow-ups and QuickBooks sync start.</p>
<h3>Housecall Pro</h3>
<p>Housecall Pro covers similar ground and leans into add-ons for marketing, AI call answering and websites. It fits small and mid-size residential shops in HVAC, plumbing, electrical, garage door and pest control. Its Max plan is the one to look at if you want other software to connect to it, because that's where Housecall Pro lists Zapier and its open API.</p>
<h3>ServiceTitan</h3>
<p>ServiceTitan is built for bigger operations: a call center or dedicated CSRs, a dispatch board, separate service and replacement departments, memberships, and reporting by technician. Its homepage lists commercial trades (mechanical, refrigeration, plumbing, electrical) and residential ones (HVAC, garage door, pest control and more). Expect a longer setup and onboarding than the other two. A five-truck HVAC shop that plans to reach twenty may find it worth the effort. A two-person shop usually won't.</p>
<h2>Pricing: what's public and what isn't</h2>
<p>Jobber and Housecall Pro list plan prices. Both price by user count, so compare at your real team size, not the one-user price. A five-person shop on Jobber Grow paid $299 a month billed monthly, against $189 for Housecall Pro Essentials. But those plans don't include the same things, so price the plan that has the features you need.</p>
<p>ServiceTitan's pricing page names packages (Core, Demand AI, Field AI and MAX) but shows no dollar amounts and asks you to contact sales. We don't repeat third-party guesses here. When you get a quote, ask for the price per technician or office user, the onboarding fee, the contract length, and the price in year two.</p>
<h2>Scheduling, dispatch and invoicing</h2>
<p>All three do the daily basics: book a job, assign it to a tech, send an on-my-way text, close the job on a phone and send the invoice. The differences show up at volume:</p>
<ul>
<li><strong>Several dispatchers or a call center:</strong> ServiceTitan's call booking and dispatch products are built for this.</li>
<li><strong>Customers booking themselves:</strong> Jobber lists online booking on every plan, including Core.</li>
<li><strong>Chasing quotes and late invoices:</strong> Jobber automates quote and invoice follow-ups from Connect. Housecall Pro sells a Pipeline add-on.</li>
<li><strong>Flat-rate pricebook on a tablet:</strong> all three support price lists. ServiceTitan sells a dedicated pricebook product. See our guide to <a href="/guides/flat-rate-vs-hourly-pricing">flat-rate vs hourly pricing</a>.</li>
</ul>
<h2>Reviews and marketing add-ons</h2>
<p>Each vendor now sells marketing on top of the job software: review requests, email and text campaigns, websites and AI call answering. They work best on customers already in the system. None of them manages your Google Business Profile, writes service-area pages or runs your ads for you. That's still a job for you or an agency.</p>
<h2>Integrations and how we connect</h2>
<p>This matters if you use other tools for marketing, accounting or phones.</p>
<ul>
<li><strong>Jobber:</strong> we have an official integration. Finished jobs and paid invoices can trigger review requests and follow-ups. See <a href="/integrations/jobber">our Jobber integration</a>.</li>
<li><strong>Housecall Pro:</strong> we connect on Housecall Pro's plan that allows integrations (in November 2026 that was the Max plan, where it lists API and Zapier access). See <a href="/integrations/housecall-pro">Housecall Pro</a>.</li>
<li><strong>ServiceTitan:</strong> we connect through Zapier or Make. The ${ZAP_ST()} listed triggers like new job, updated job, new invoice and new customer when we checked. See <a href="/integrations/servicetitan">ServiceTitan</a> and <a href="/guides/servicetitan-review-requests">review requests from ServiceTitan</a>.</li>
</ul>
<h2>How to decide</h2>
<ol>
<li><strong>Count your users.</strong> Office staff and techs who need logins. Price every option at that number.</li>
<li><strong>List your three biggest admin headaches.</strong> Missed follow-ups, double bookings, slow invoices. Check which plan fixes them.</li>
<li><strong>Trial the two that fit.</strong> Jobber and Housecall Pro offer trials. Run five real jobs through each.</li>
<li><strong>Get a ServiceTitan quote only if you have the volume.</strong> A dispatcher, several departments or 10+ techs.</li>
<li><strong>Ask about leaving.</strong> Can you export customers, jobs and invoices if you switch later?</li>
</ol>
<p>For the two smaller tools head to head, read <a href="/guides/jobber-vs-housecall-pro">Jobber vs Housecall Pro</a>. Not sure you need field-service software at all? Read <a href="/guides/crm-vs-field-service-software">CRM vs field-service software</a>. Our marketing packages work with any of the three: {{PRICE:plans}}. Details on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["Is ServiceTitan better than Housecall Pro or Jobber?", "Not better, built for a different size. ServiceTitan suits larger shops with dispatchers, call centers and several departments. Jobber and Housecall Pro suit owner-operators and small to mid-size crews."],
      ["How much does ServiceTitan cost?", "ServiceTitan doesn't publish prices. When we checked in November 2026, its pricing page named four packages and asked visitors to contact sales. Ask for the per-user price, onboarding fee, contract length and year-two price."],
      ["Which is cheapest for a small team?", "For one user, Jobber Core was the lowest list price we saw at $49 a month billed monthly in November 2026. For a team, compare plans with the features you need at your real user count."],
      ["Does Housecall Pro integrate with other software?", "Housecall Pro listed Zapier and its open API on the Max plan in November 2026. QuickBooks Online sync started on Essentials."],
      ["Does TableTurnerr work with ServiceTitan?", "Yes, through Zapier or Make. New jobs, completed jobs or new invoices can trigger review requests and follow-ups."],
      ["Can I switch from Jobber or Housecall Pro to ServiceTitan later?", "Yes. Export your customers and job history first and ask the new vendor what its onboarding team will import for you."],
    ],
  },

  {
    slug: "speed-to-lead-home-services",
    path: "/guides/speed-to-lead-home-services",
    title: "Speed to Lead: Why the First 5 Minutes Matter",
    description: "Speed to lead for home services: what the research actually says about the first 5 minutes, how many calls go unanswered, and a simple response playbook.",
    h1: "Speed to lead: why the first 5 minutes decide who gets the job",
    lede: "A homeowner with a leaking water heater calls or fills out a form, and then keeps going down the list. Here's what the research really says about response time, how many home-service calls go unanswered, and a playbook any shop can run.",
    eyebrow: "Phones", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Answer every lead in seconds, even on a roof.",
    content: `
<div class="callout"><p><strong>Short version:</strong> the research is clear that leads go cold within minutes to hours. Companies that respond within an hour are far more likely to reach and qualify the lead than those that wait. Yet many home-service calls never reach a person. Answer live when you can, text back every missed call within a minute, and call web leads within five minutes.</p></div>
<h2>What the research actually says</h2>
<p>Two studies get quoted most. They're older and weren't about home services, so treat them as direction, not a promise.</p>
<table>
<thead><tr><th>Study</th><th>What it found</th><th>Caveat</th></tr></thead>
<tbody>
<tr><td>"The Short Life of Online Sales Leads," ${HBR()}, March 2011 (Oldroyd, McElheran, Elkington)</td><td>An audit of 2,241 US companies: 37% responded to a web lead within an hour, 23% never responded, and the average response time among those that replied within 30 days was 42 hours. Firms that contacted a lead within an hour were nearly 7 times as likely to have a meaningful conversation with a decision maker as those that waited longer, and over 60 times as likely as firms that waited 24 hours or more.</td><td>Web leads across many industries, mostly B2B. Figures as reported in ${HBR_SUMMARY()}.</td></tr>
<tr><td>Lead Response Management research by Dr. James Oldroyd</td><td>Calling within 5 minutes instead of 30 raised the odds of contacting a lead by about 100 times and of qualifying it by about 21 times, according to the widely shared ${LRM()}. ${CBS()} reported the same research: leads are most likely to convert if called within 5 minutes, and nearly dead after about 30.</td><td>Sales-calling data from web leads. The public summary gives no sample details.</td></tr>
</tbody>
</table>
<p>Why it applies even more to home services: a homeowner with no heat or a backed-up drain isn't researching. They need someone today. If you don't pick up, the next company on Google Maps is one tap away.</p>
<h2>How many home-service calls go unanswered</h2>
<p>The answer depends on who counted and how. Here are three data sets, checked November 27, 2026:</p>
<ul>
<li><strong>${INVOCA26()}</strong> (July 2026, based on over 70 million calls across 10 industries): 52% of callers to home-service businesses spoke with a person. For calls longer than 15 seconds, which filters out misdials and quick hang-ups, it was 65%. It also found 45% of leads converted on the call.</li>
<li><strong>${CALLRAIL()}</strong> (1.1 million conversations): home services had a 14% missed call rate, lower than healthcare (32%) and legal (28%).</li>
<li><strong>${SERVICEDIRECT()}</strong> (August 2019, 1,000 recorded calls to 94 businesses): owners guessed they answered 97% of calls. The real figure was 66%. When a new customer got through, an appointment was booked 63% of the time.</li>
</ul>
<p>And voicemail doesn't save you. ${INVOCA_VM()} reported in 2024 that fewer than 3% of callers pushed to voicemail leave a message, based on its platform data.</p>
<p>The honest takeaway: somewhere between 1 in 7 and 1 in 3 of your calls may not reach a person, and you probably think it's fewer. Pull your phone system's call log for one week and count.</p>
<h2>The 5-minute response playbook</h2>
<ol>
<li><strong>Measure first.</strong> For one week, log every inbound call and form: time received, time of first response, answered or not. Most phone systems and call tracking tools show this. Our <a href="/tools/lead-response-calculator">lead response calculator</a> turns it into dollars.</li>
<li><strong>Answer live during business hours.</strong> Ring the office, then a backup phone, before voicemail. Four rings is plenty.</li>
<li><strong>Text back every missed call within a minute.</strong> From your business number: "Sorry we missed you, this is Dave at Miller Plumbing. What's going on and what's the address? We can usually get someone out today." This holds the lead while you finish the job you're on. See <a href="/services/missed-call-text-back">missed-call text-back</a>.</li>
<li><strong>Cover nights, weekends and busy hours.</strong> An <a href="/services/ai-answering-service">AI answering service</a> picks up when everyone's busy, takes the details, books or texts you, and sends true emergencies to whoever's on call. Call our demo at {{DEMO}} to hear one.</li>
<li><strong>Call web forms and Google messages within 5 minutes.</strong> Send form leads to a phone that buzzes, not an inbox nobody checks till lunch.</li>
<li><strong>Follow up three times.</strong> If you can't reach them: call at 5 minutes, text at 1 hour, call again the next morning. Then stop.</li>
<li><strong>Review weekly.</strong> Answer rate, median response time, and booked jobs. One number each, on one page.</li>
</ol>
<h2>Speed by lead type</h2>
<table>
<thead><tr><th>Lead type</th><th>Target first response</th><th>How</th></tr></thead>
<tbody>
<tr><td>Phone call, business hours</td><td>Answered live</td><td>Office, then backup phone, then AI answering</td></tr>
<tr><td>Missed call</td><td>Text within 1 minute, call within 15</td><td>Automatic text-back from your number</td></tr>
<tr><td>Website form or quote request</td><td>Call within 5 minutes</td><td>Form alerts to a phone, not an inbox</td></tr>
<tr><td>Google Business Profile message</td><td>Reply within 5 minutes in business hours</td><td>Notifications on for whoever covers the office</td></tr>
<tr><td>After-hours emergency</td><td>Answered and routed to on-call tech</td><td>AI answering or a live service with your emergency rules</td></tr>
<tr><td>After-hours routine request</td><td>Confirmation that night, call at opening</td><td>Text acknowledgment and a first-call list for the morning</td></tr>
</tbody>
</table>
<p>Trade matters too. A roofing lead after a hailstorm or a plumbing leak needs the fastest response you have. A landscaping design request can wait an hour without much harm, but not two days.</p>
<h2>What it's worth</h2>
<p>A quick check you can do in your head. If you get 200 calls a month, miss 20% of them, and half of those are real jobs, that's 20 lost opportunities. If you'd book half of those at a $400 average ticket, that's about $4,000 a month in jobs walking to a competitor. Try your own numbers in the <a href="/tools/missed-call-calculator">missed call calculator</a>.</p>
<h2>What we set up</h2>
<p>Missed-call text-back is in every package. It costs {{PRICE:textback}}. For live answering, our AI answering service costs {{PRICE:ai}}. It takes several calls at once and picks up even when you're already on the phone. Comparing options? Read <a href="/guides/missed-call-text-back-vs-ai-receptionist">text-back vs AI receptionist vs answering service</a>, and for quotes that stall later, <a href="/guides/how-to-follow-up-on-an-estimate">how to follow up on an estimate</a>.</p>`,
    faq: [
      ["What is speed to lead?", "It's the time between a customer reaching out, by call, form or message, and your first real response. Shorter is better, because homeowners keep calling until someone answers."],
      ["Is the 5-minute rule real?", "It comes from Dr. James Oldroyd's lead response research, which found much higher contact and qualification odds at 5 minutes than at 30. It was based on web sales leads, not home services, but the direction holds for urgent repair calls."],
      ["What did the Harvard Business Review study find?", "In a 2011 audit of 2,241 US companies, 37% answered a web lead within an hour and 23% never answered. Firms that responded within an hour were nearly 7 times as likely to reach a decision maker as those that waited longer."],
      ["How many calls do home-service businesses miss?", "It depends on the study. CallRail reported a 14% missed call rate for home services in 2025. Invoca's 2026 report found 52% of callers reached a person, or 65% for calls over 15 seconds."],
      ["Do customers leave voicemails?", "Rarely. Invoca reported in 2024 that fewer than 3% of callers sent to voicemail leave a message, so a missed call usually needs a text or call back from you."],
      ["What's the fastest way to respond when I'm on a job?", "An automatic text back from your business number within seconds of the missed call, then a call back when you're free. An AI answering service can pick up the call itself."],
    ],
  },

  {
    slug: "hvac-csr-phone-script",
    path: "/guides/hvac-csr-phone-script",
    title: "HVAC and Plumbing CSR Phone Script That Books Calls",
    description: "A copy-ready phone script for HVAC and plumbing CSRs: greeting, qualifying, price questions, booking, objections and after-hours calls, plus booking rate math.",
    h1: "An HVAC and plumbing phone script that books more calls",
    lede: "Most lost calls aren't lost to price. They're lost to a slow greeting, a vague answer about cost or a CSR who never asks for the appointment. Here's a script your office can use tomorrow, and how to measure whether it's working.",
    eyebrow: "Phones", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want every call answered with your script?",
    content: `
<div class="callout"><p><strong>Short version:</strong> greet with your name and the company's, get the problem and address early, answer price questions with your diagnostic or trip fee and what it covers, then offer two specific times. Track booking rate as booked calls divided by calls that could have booked. Listen to a few lost calls every week.</p></div>
<h2>The call in six steps</h2>
<table>
<thead><tr><th>Step</th><th>Goal</th><th>Time</th></tr></thead>
<tbody>
<tr><td>1. Greeting</td><td>Sound local, friendly and ready to help</td><td>5 seconds</td></tr>
<tr><td>2. Problem and urgency</td><td>Know what's wrong and how bad it is</td><td>30 to 60 seconds</td></tr>
<tr><td>3. Contact and address</td><td>Lock in the lead before anything else</td><td>30 seconds</td></tr>
<tr><td>4. Price question</td><td>Answer clearly without quoting a repair blind</td><td>30 seconds</td></tr>
<tr><td>5. Book</td><td>Offer two windows and confirm</td><td>30 seconds</td></tr>
<tr><td>6. Close</td><td>Set expectations and say thanks</td><td>15 seconds</td></tr>
</tbody>
</table>
<h2>1. Greeting</h2>
<p><strong>Copy-ready:</strong> "Thanks for calling Miller Heating and Plumbing, this is Jen. How can I help?"</p>
<p>Keep it short. Skip the long brand slogan. Smile when you say it; people hear it. If you route calls by department, do it after the greeting, not with a phone menu.</p>
<h2>2. Problem and urgency</h2>
<p>Let them explain, then ask two or three trade-specific questions.</p>
<ul>
<li><strong>HVAC no cooling:</strong> "Is the system running at all, or is it blowing warm air? Is the outdoor unit running?"</li>
<li><strong>HVAC no heat:</strong> "Is it gas, electric or a heat pump? Is anyone at home elderly, very young or unwell?"</li>
<li><strong>Plumbing leak:</strong> "Is water actively leaking right now? Do you know where the main shut-off is?"</li>
<li><strong>Drain:</strong> "Is it one fixture or several? Any water coming up in the tub or basement floor drain?"</li>
</ul>
<p>Then show empathy in one line: "Got it, no heat with a baby in the house. Let's get someone out to you."</p>
<h2>3. Contact and address</h2>
<p><strong>Copy-ready:</strong> "So I can check who's closest, what's the address? And the best number in case we get cut off?"</p>
<p>Get these before any long conversation about price. If the call drops, you can still call or text them back.</p>
<h2>4. Price questions</h2>
<p>"How much will it cost?" is the moment most calls are won or lost. Never say "I don't know" and never quote a repair you haven't seen. Give the number you can give.</p>
<p><strong>Copy-ready:</strong> "Our diagnostic visit is [fee]. The tech will find the problem and give you an exact price before any work starts, so there are no surprises. If you go ahead with the repair, [the fee is applied to it / the fee covers the first hour]. Would morning or afternoon work better?"</p>
<p>If you use flat-rate pricing, you can give ranges for common jobs: "Most water heater replacements we do run between [low] and [high], depending on size and venting. The tech will give you the exact price on site." Read <a href="/guides/flat-rate-vs-hourly-pricing">flat-rate vs hourly pricing</a> for how to build those numbers.</p>
<h2>5. Book the appointment</h2>
<p>Offer two choices, not an open question.</p>
<p><strong>Copy-ready:</strong> "I can have a technician there today between 2 and 4, or first thing tomorrow between 8 and 10. Which works better?"</p>
<p>Then confirm: name, address, phone, problem, window, and how they'll be notified. "You'll get a text when the tech is on the way, with their name and photo."</p>
<h2>Common objections and what to say</h2>
<table>
<thead><tr><th>They say</th><th>You say</th></tr></thead>
<tbody>
<tr><td>"That's more than the other company."</td><td>"I understand. Our techs give you the full price up front before any work, and the work is backed by [warranty]. Would you like me to hold the 2 to 4 slot while you decide?"</td></tr>
<tr><td>"I just want a price over the phone."</td><td>"I wish I could. Two homes with the same symptom can need very different fixes. The visit is [fee] and you'll have an exact price before anything is done."</td></tr>
<tr><td>"I need to talk to my spouse."</td><td>"Of course. Can I pencil you in for tomorrow morning and text you a reminder? If it doesn't work, just reply and we'll move it."</td></tr>
<tr><td>"Can you come right now?"</td><td>"Let me check. The soonest I have is [time]. If something opens up earlier, I'll call you. Want me to lock that in?"</td></tr>
<tr><td>"I'm just calling around."</td><td>"No problem. While you're comparing, ask whether the price is given before the work starts. Ours always is. Can I hold a time for you?"</td></tr>
</tbody>
</table>
<h2>After-hours calls</h2>
<p>Decide your rules before the call comes, write them down, and give them to whoever answers at night, human or AI.</p>
<ul>
<li><strong>Emergency (dispatch now):</strong> active leak that can't be shut off, no heat below a set outdoor temperature, gas smell (tell them to leave and call the gas utility or 911 first), sewage backing up.</li>
<li><strong>Urgent (first thing tomorrow):</strong> no cooling on a mild night, water heater out, one drain slow.</li>
<li><strong>Routine:</strong> estimates, tune-ups, quotes. Book into normal hours.</li>
</ul>
<p><strong>Copy-ready:</strong> "We do have a technician on call tonight. After-hours visits are [fee] because the tech is coming out of hours. Would you like me to send them, or book you first thing at 8 tomorrow at our normal rate?"</p>
<p>Always say the after-hours fee before you dispatch. An <a href="/services/ai-answering-service">AI answering service</a> can follow these exact rules, take several calls at once and forward real emergencies to the on-call tech.</p>
<h2>How to measure booking rate</h2>
<p><strong>Booking rate = booked appointments ÷ calls that could have booked.</strong></p>
<p>Take out calls that could never book: vendors, spam, existing customers checking on a job, wrong numbers and job applicants. Example: 300 calls in a month, 120 of them were real booking chances, and 78 were booked. Booking rate = 78 ÷ 120 = 65%.</p>
<p>For reference points, not targets: ${INVOCA26()} found 45% of home-service leads converted on the call in 2026, and ${SERVICEDIRECT()} found appointments were set on 63% of new-customer calls in 2019. Your own trend matters more than anyone's average.</p>
<ol>
<li>Tag each call as booked, not booked or not a lead. Most call tracking tools let you do this. See <a href="/services/call-tracking">call tracking</a>.</li>
<li>Calculate booking rate weekly, per CSR.</li>
<li>Listen to three unbooked calls a week together. Find the exact line where it slipped.</li>
<li>Change one line of the script at a time and watch the rate for two weeks.</li>
</ol>
<p>Want more lines for other call types? See our <a href="/tools/phone-scripts">phone scripts</a>. For more on running an HVAC or plumbing shop's marketing, see <a href="/marketing/hvac">HVAC marketing</a> and <a href="/marketing/plumbing">plumbing marketing</a>.</p>`,
    faq: [
      ["What should an HVAC CSR say when answering the phone?", "Keep it short: thank them for calling, say the company name and your first name, and ask how you can help. Then get the problem, address and phone number before talking price."],
      ["How should CSRs answer 'how much will it cost?'", "Give the diagnostic or trip fee, explain the tech will give an exact price before any work, and offer two appointment times. Never quote a repair blind and never say 'I don't know.'"],
      ["What is a good booking rate for HVAC calls?", "Track your own trend first. For reference, Invoca's 2026 report found 45% of home-service leads converted on the call, and Service Direct's 2019 study found appointments set on 63% of new-customer calls."],
      ["How do I calculate booking rate?", "Divide booked appointments by calls that could have booked. Leave out vendors, spam, wrong numbers and existing customers checking on a job."],
      ["How should after-hours calls be handled?", "Write down what counts as an emergency, state the after-hours fee before dispatching, and book everything else into the next morning. Give the same rules to whoever answers at night."],
      ["Should CSRs give price ranges over the phone?", "For common flat-rate jobs, a range is fine if the tech confirms the exact price on site. For diagnostics, give the visit fee and what it covers."],
    ],
  },

  {
    slug: "flat-rate-vs-hourly-pricing",
    path: "/guides/flat-rate-vs-hourly-pricing",
    title: "Flat-Rate vs Hourly Pricing for Plumbers and HVAC",
    description: "Flat-rate vs hourly (time and materials) pricing for plumbers, HVAC and electricians: pros and cons, how to build a flat rate, and good/better/best options.",
    h1: "Flat-rate vs hourly pricing: which should your shop use?",
    lede: "Homeowners want to know the price before you start. Techs want to get paid fairly for hard jobs. Here's how flat-rate and time-and-materials pricing compare, how to build a flat-rate price, and how to present options at the kitchen table.",
    eyebrow: "Pricing", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Send the price before you leave the driveway.",
    content: `
<div class="callout"><p><strong>Short version:</strong> flat-rate gives the homeowner one price before work starts, which usually means easier yeses and fewer arguments. Hourly (time and materials) is simpler to set up and fairer on jobs you can't predict. Most service shops use flat-rate for common repairs and installs and keep hourly for remodels, unusual troubleshooting and commercial work.</p></div>
<h2>The two models</h2>
<table>
<thead><tr><th></th><th>Flat-rate</th><th>Hourly (time and materials)</th></tr></thead>
<tbody>
<tr><td>What the customer sees</td><td>One price for the task, before work starts</td><td>An hourly rate plus parts, final price at the end</td></tr>
<tr><td>Who carries the risk</td><td>You. A slow job costs you</td><td>The customer. A slow job costs them</td></tr>
<tr><td>Setup effort</td><td>High. You need a price book</td><td>Low. One rate and a parts markup</td></tr>
<tr><td>Fast, skilled techs</td><td>Rewarded: same price, less time</td><td>Penalized: faster means less billed</td></tr>
<tr><td>Arguments about the bill</td><td>Fewer: price agreed up front</td><td>More: "why did it take three hours?"</td></tr>
<tr><td>Best for</td><td>Repeatable repairs and installs</td><td>Unknown scope, remodels, commercial T&amp;M contracts</td></tr>
</tbody>
</table>
<h2>Pros and cons by trade</h2>
<ul>
<li><strong>Plumbing:</strong> water heaters, toilets, faucets, disposals and drain clearing are very repeatable, so flat-rate works well. Slab leaks, sewer line work and repipes vary a lot, so many shops quote those as custom jobs after an inspection.</li>
<li><strong>HVAC:</strong> capacitor, contactor, igniter and blower motor swaps are classic flat-rate items. System replacements are usually quoted per job with tiered options. Hard-to-find intermittent problems may stay hourly after a set diagnostic.</li>
<li><strong>Electrical:</strong> outlets, switches, fixtures, ceiling fans, panel swaps and EV charger installs price well flat. Older homes with surprises, and remodel wiring, often stay T&amp;M or get a custom quote.</li>
</ul>
<h2>How to build a flat-rate price</h2>
<p>You need four numbers for each task. The example below is made up to show the math, not a recommended price.</p>
<ol>
<li><strong>Your true hourly cost to run a truck.</strong> Tech wages and benefits, truck, fuel, insurance, office, software and marketing, divided by billable hours. Most owners underestimate this. Our <a href="/tools/hourly-rate-calculator">hourly rate calculator</a> walks you through it. Example: $120 per billable hour.</li>
<li><strong>Typical time for the task, including the drive-in, setup and cleanup.</strong> Use your own job history, not the fastest tech. Example: water heater swap, 3.5 hours. Labor cost = 3.5 × $120 = $420.</li>
<li><strong>Parts cost and markup.</strong> Example: $750 in parts, marked up to $1,050.</li>
<li><strong>Target margin check.</strong> Add a buffer for callbacks and warranty. Example: $420 + $1,050 = $1,470, plus a $100 warranty buffer = $1,570.</li>
</ol>
<p>Then sanity-check it: what do you actually earn per hour on this job, and how does it compare with what local competitors charge? Our <a href="/tools/job-price-calculator">job price calculator</a> does this math.</p>
<p>Write every common task into a price book: task name, what's included, price, and add-ons (haul-away, permit, code upgrades). Start with your 20 most common jobs, not 500. Review it twice a year when parts prices move.</p>
<h2>Good, better, best options</h2>
<p>Giving three options lets the homeowner choose instead of just yes or no. Build each tier so it's a real choice:</p>
<table>
<thead><tr><th></th><th>Good</th><th>Better</th><th>Best</th></tr></thead>
<tbody>
<tr><td>Water heater</td><td>Like-for-like tank swap, code items, haul-away</td><td>Higher-efficiency tank, expansion tank, longer labor warranty</td><td>Tankless or heat pump water heater, longest warranty, first-year flush</td></tr>
<tr><td>AC repair</td><td>Replace failed capacitor</td><td>Capacitor plus contactor and a cleaning</td><td>Repair plus a year of maintenance plan visits</td></tr>
<tr><td>Electrical panel</td><td>Panel swap to code</td><td>Panel plus whole-home surge protection</td><td>Panel, surge protection and EV charger circuit</td></tr>
</tbody>
</table>
<p>Tips: make "better" the one you'd pick for your own home, keep the descriptions to plain-English outcomes, and put the price of each tier side by side. A maintenance plan makes a natural "best" add-on. See <a href="/services/maintenance-plans">maintenance plans</a>.</p>
<h2>How to present it to homeowners</h2>
<ol>
<li><strong>Diagnose first, then explain.</strong> Show the failed part or a photo. "This is the capacitor. It's swollen, which is why the unit won't start."</li>
<li><strong>Present options on a tablet or printed sheet.</strong> Start with the best option and work down, then stop talking and let them read.</li>
<li><strong>Say what's included.</strong> Parts, labor, warranty, cleanup, permit.</li>
<li><strong>Get approval in writing before work.</strong> A signed estimate or approved quote in your software protects both sides.</li>
<li><strong>Make paying easy.</strong> Take a card on site or send a text-to-pay link the moment the job is done. See <a href="/services/estimates-invoices-payments">estimates, invoices and payments</a>.</li>
</ol>
<p>If they don't decide on the spot, follow up the next day. Read <a href="/guides/how-to-follow-up-on-an-estimate">how to follow up on an estimate</a>.</p>
<h2>When hourly is the better choice</h2>
<p>Flat-rate isn't always right. Hourly or time and materials often makes more sense when:</p>
<ul>
<li><strong>You can't see the scope.</strong> Hidden pipe in a finished wall, wiring in a 1920s house, or a crawl space nobody has opened in years.</li>
<li><strong>The customer is a business with a T&amp;M contract.</strong> Property managers and commercial accounts often ask for hourly billing with a not-to-exceed amount.</li>
<li><strong>You're still new.</strong> Until you have six months of job history, you don't know your real task times. Track them on hourly jobs, then build the price book from them.</li>
</ul>
<p>A middle ground many shops use: a flat diagnostic fee, then a flat price for the repair once the problem is found. The homeowner still gets a price before work starts, and you aren't guessing blind.</p>
<h2>Switching from hourly to flat-rate</h2>
<ul>
<li>Pull 6 to 12 months of invoices and find your 20 most common tasks.</li>
<li>Price them with the method above and test on the next 50 jobs.</li>
<li>Keep an hourly rate for work that doesn't fit the book.</li>
<li>Train CSRs to give the diagnostic fee and ranges, not hourly rates, on the phone. Our <a href="/guides/hvac-csr-phone-script">CSR phone script</a> has the lines.</li>
<li>If you pay techs commission, decide how flat-rate jobs count before you switch.</li>
</ul>
<p>Running marketing for an electrical shop as well? See <a href="/marketing/electricians">marketing for electricians</a>.</p>`,
    faq: [
      ["Is flat-rate pricing better than hourly?", "For repeatable repairs and installs, many shops find flat-rate easier to sell because the homeowner knows the price first. For unpredictable work like remodels, hourly is usually fairer to both sides."],
      ["How do you calculate a flat-rate price?", "Multiply your true hourly cost to run a truck by the typical time for the task, add marked-up parts, then add a buffer for callbacks and warranty. Check the result against local prices."],
      ["Do customers prefer flat-rate pricing?", "Many homeowners like knowing the full price before work starts, and it avoids arguments about how long a job took. Present it with what's included so it doesn't look like a guess."],
      ["What is good, better, best pricing?", "Offering three real options for the same job, from a basic fix to a fuller solution with longer warranty or extras. The homeowner chooses between options instead of yes or no."],
      ["Should plumbers charge flat-rate or hourly?", "Most use flat-rate for common tasks like water heaters, toilets and drain clearing, and a custom quote or hourly rate for slab leaks, repipes and remodels."],
      ["How often should I update my flat-rate price book?", "Review it at least twice a year, and whenever parts prices or wages change noticeably."],
    ],
  },

  {
    slug: "hvac-slow-season-marketing",
    path: "/guides/hvac-slow-season-marketing",
    title: "HVAC Slow Season Marketing: Keep Busy in Spring and Fall",
    description: "How HVAC and plumbing shops stay busy in shoulder seasons: maintenance plans, tune-up campaigns, replacement offers, reviews and a month-by-month calendar.",
    h1: "HVAC slow season marketing: how to stay busy in spring and fall",
    lede: "Every HVAC shop knows the pattern: the phones ring nonstop in the first heat wave and the first cold snap, then go quiet. The fix isn't more ads in March. It's working the customers you already have, on a schedule.",
    eyebrow: "Seasonal marketing", readMinutes: 7, article: { date: DATE },
    ctaTitle: "We write and send the seasonal campaigns for you.",
    content: `
<div class="callout"><p><strong>Short version:</strong> fill spring and fall with tune-ups and maintenance plan visits sold to past customers, follow up on old replacement quotes, ask for reviews and referrals while techs have time, and keep your Google profile busy. Plan it month by month so the campaigns go out before the slow weeks, not during them.</p></div>
<h2>Why shoulder seasons are the time to sell maintenance</h2>
<p>${ENERGYSTAR()} tells homeowners to check the cooling system in spring and the heating system in fall, because contractors get busy once peak season starts. That's your opening. A homeowner who hears it from you in April books a tune-up, and you get to see the equipment before it fails in July.</p>
<p>Shoulder-season work also keeps your best techs on payroll and busy, which matters when you need them in the rush.</p>
<h2>1. Push maintenance plans</h2>
<p>A maintenance plan turns two slow-season visits a year into booked work, and gives you a reason to call every member twice a year.</p>
<ul>
<li><strong>Who to offer it to:</strong> every customer who had a repair or install in the last two years, and every tune-up customer who isn't a member yet.</li>
<li><strong>What to offer:</strong> two tune-ups a year, priority scheduling, a repair discount and no overtime fee. Keep it simple enough to explain in one sentence.</li>
<li><strong>How to bill it:</strong> monthly automatic payments are easier to say yes to than one annual charge.</li>
</ul>
<p>Our <a href="/tools/maintenance-plan-calculator">maintenance plan calculator</a> helps you price it, and <a href="/guides/how-to-sell-maintenance-plans">how to sell maintenance plans</a> has the techs' wording. We can set up the sign-up page, billing and reminders: see <a href="/services/maintenance-plans">maintenance plans</a>.</p>
<h2>2. Run tune-up campaigns to past customers</h2>
<p>A short text and email to customers you already served beats a cold ad every time. Three messages over three weeks is enough.</p>
<ul>
<li><strong>Text 1:</strong> "Hi Maria, it's Miller Heating. Time for your AC check before the heat hits. We have spots next week. Reply YES and we'll call to book."</li>
<li><strong>Email:</strong> a simple checklist of what the tune-up covers and a book-online link.</li>
<li><strong>Text 2 (a week later, only to non-responders):</strong> "Last few tune-up spots this month. Want one?"</li>
</ul>
<p>Only text people who gave you permission, and register your number for business texting first. See <a href="/guides/a2p-10dlc-for-contractors">A2P 10DLC for contractors</a>.</p>
<h2>3. Follow up on replacement quotes and aging systems</h2>
<ul>
<li>Pull every unsold replacement quote from the last 12 months and call or text each one.</li>
<li>Flag systems your techs noted as old, patched or using refrigerant that's getting expensive to service, and offer a free replacement estimate.</li>
<li>Offer real shoulder-season incentives you can afford: a scheduling discount, an upgraded warranty, a free first year of your maintenance plan, or financing.</li>
</ul>
<p>One caution for 2026: don't promise the federal energy efficient home improvement tax credit. According to ${IRS_25C()}, that credit (Section 25C) isn't allowed for property placed in service after December 31, 2025. State, utility and manufacturer rebates may still apply, so check what's current in your area before you advertise one.</p>
<h2>4. Push reviews and referrals</h2>
<p>Slow weeks are when techs have time to ask properly, and fresh reviews help you rank before the rush.</p>
<ul>
<li>Ask every shoulder-season customer for a Google review the same day. See <a href="/services/review-generation">review generation</a>.</li>
<li>Remind happy customers about your referral reward. See <a href="/guides/contractor-referral-program">how to run a contractor referral program</a>.</li>
<li>Reach customers you haven't seen in two years with a win-back message. See <a href="/guides/win-back-past-customers">how to win back past customers</a>.</li>
</ul>
<h2>Month-by-month calendar</h2>
<p>For a typical four-season market. In the South, shift cooling items earlier and keep heating light. In the far North, stretch the heating push.</p>
<table>
<thead><tr><th>Month</th><th>Focus</th><th>Plumbing tie-in</th></tr></thead>
<tbody>
<tr><td>January</td><td>Heating repairs; plan memberships renewal list</td><td>Frozen pipe and water heater content</td></tr>
<tr><td>February</td><td>Book spring AC tune-ups for members first</td><td>Water heater flush offer</td></tr>
<tr><td>March</td><td>AC tune-up campaign to all past customers (send early)</td><td>Sump pump checks before spring rain</td></tr>
<tr><td>April</td><td>Tune-ups; follow up on unsold replacement quotes</td><td>Outdoor spigot and irrigation backflow checks</td></tr>
<tr><td>May</td><td>Last tune-up push; review and referral push</td><td>Drain cleaning before summer guests</td></tr>
<tr><td>June to August</td><td>Peak cooling: answer every call, sell plans on repair visits</td><td>Keep the review requests going</td></tr>
<tr><td>September</td><td>Furnace and heat pump tune-up campaign; replacement offers</td><td>Water heater check before winter</td></tr>
<tr><td>October</td><td>Tune-ups; membership drive; review push</td><td>Winterize outdoor plumbing</td></tr>
<tr><td>November</td><td>Last heating tune-ups; holiday referral reminder</td><td>Garbage disposal and drain tips before holidays</td></tr>
<tr><td>December</td><td>Heating repairs; year-end replacement financing offers</td><td>Frozen pipe prevention</td></tr>
</tbody>
</table>
<p>For a calendar across all trades, see the <a href="/guides/home-service-marketing-calendar">home service marketing calendar</a>.</p>
<h2>Keep Google busy too</h2>
<p>Post tune-up photos and offers on your Google Business Profile every week, answer every review, and keep your hours right for the season. It keeps your profile active for the busy months.</p>
<h2>How to tell if it worked</h2>
<p>Pick three numbers and check them at the end of each shoulder season:</p>
<ul>
<li><strong>Booked tune-ups</strong> from the campaign, compared with the same months last year.</li>
<li><strong>New maintenance plan members</strong>, and how many renewed.</li>
<li><strong>Replacement jobs sold</strong> from old quotes and tune-up findings.</li>
</ul>
<p>Track which message brought each booking. A separate booking link or reply keyword per campaign makes this easy. Our guide on <a href="/guides/how-to-track-lead-sources">how to track lead sources</a> shows the setup.</p>
<p>Two mistakes to avoid. First, waiting until the phones are already quiet. A campaign sent in the slow week fills the week after, so send it two to three weeks before. Second, discounting your peak-season work. Shoulder-season offers should reward booking early, not train customers to wait for a sale.</p>
<h2>What we do</h2>
<p>We write, schedule and send your seasonal email and text campaigns, only to customers you have permission to contact. It costs {{PRICE:campaigns}}. See <a href="/services/email-sms-campaigns">email and text campaigns</a> and <a href="/services/maintenance-plans">maintenance plans</a>, or the full <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How do HVAC companies stay busy in the slow season?", "By selling tune-ups and maintenance plans to past customers, following up on old replacement quotes, and pushing reviews and referrals in spring and fall. The campaigns need to go out before the slow weeks start."],
      ["When should HVAC tune-up campaigns go out?", "Send AC tune-up messages in March and heating ones in September, so homeowners book before the first heat wave or cold snap. ENERGY STAR recommends spring cooling checks and fall heating checks."],
      ["What should an HVAC maintenance plan include?", "Commonly two tune-ups a year, priority scheduling, a repair discount and no overtime fee. Keep it simple enough to explain in one sentence and bill it monthly."],
      ["Can I still advertise the federal tax credit for heat pumps in 2026?", "Not the Section 25C credit. The IRS says it isn't allowed for property placed in service after December 31, 2025. Check current state, utility and manufacturer rebates instead."],
      ["What slow-season offers work for plumbers?", "Water heater flushes, sump pump checks before spring rain, outdoor winterizing in fall and drain cleaning before the holidays, sent to past customers."],
      ["Is it legal to text past customers about tune-ups?", "Only if they gave you permission to text them, and your business number should be registered for business texting (A2P 10DLC) first."],
    ],
  },

  {
    slug: "how-to-track-lead-sources",
    path: "/guides/how-to-track-lead-sources",
    title: "How Contractors Track Lead Sources (and What Leads Cost)",
    description: "How contractors track lead sources: call tracking numbers, UTM links, the 'how did you hear' question, CRM fields, a monthly report and cost per booked job.",
    h1: "How to track where your leads come from",
    lede: "If you can't say where last month's jobs came from, you can't tell which marketing to keep paying for. Here's a simple setup using tracking numbers, tagged links and one question, plus a monthly report and the math for cost per lead and cost per booked job.",
    eyebrow: "Tracking", readMinutes: 7, article: { date: DATE },
    ctaTitle: "We set up the tracking and send you one page a month.",
    content: `
<div class="callout"><p><strong>Short version:</strong> give each marketing channel its own tracking phone number, tag your website links with UTM codes (including the one on your Google Business Profile), ask every new customer how they heard about you, and save the answer in a lead source field in your CRM. Once a month, divide what each channel cost by the leads and booked jobs it brought in.</p></div>
<h2>The four tools you need</h2>
<table>
<thead><tr><th>Tool</th><th>What it tracks</th><th>Effort</th></tr></thead>
<tbody>
<tr><td>Call tracking numbers</td><td>Which channel made the phone ring, plus recordings</td><td>Set up once, small monthly cost</td></tr>
<tr><td>UTM links</td><td>Which link brought a website visit or form</td><td>Free, 10 minutes per link</td></tr>
<tr><td>"How did you hear about us?"</td><td>What the customer remembers, including word of mouth</td><td>Free, needs discipline</td></tr>
<tr><td>CRM lead source field</td><td>Ties the source to the booked job and the revenue</td><td>Free if your software has the field</td></tr>
</tbody>
</table>
<h2>1. Call tracking numbers</h2>
<p>Most home-service leads still come by phone, so this is the big one. A call tracking service gives you a separate number for each channel. Every number rings your normal line, and the report shows which number was dialed.</p>
<ul>
<li><strong>One number per channel:</strong> Google Business Profile, Google Ads, Local Services Ads, Facebook, website, truck wrap, yard signs, mailers.</li>
<li><strong>Website numbers that swap by visitor source:</strong> many tools can show a different number to visitors from Google, Facebook or an email, so the website calls get credited correctly.</li>
<li><strong>Recordings:</strong> listen to a few calls a week to check booking quality.</li>
</ul>
<p>Cost example: ${CALLRAIL_PRICING()} listed call tracking from $50 a month with 5 local numbers and 250 minutes, then $3 per extra number, when we checked on November 27, 2026.</p>
<p><strong>On your Google Business Profile:</strong> ${GBP_GUIDE()} require a number that connects to your business location and is under your direct control. A common setup is a local tracking number as the main profile number with your regular number added as an additional number, so your listings stay consistent. Google's own profile report counts taps on your call button, as explained on ${GBP_PERF()}, but not calls from people who dial your number from your website or a photo of your truck.</p>
<h2>2. UTM links</h2>
<p>A UTM link is your web address with labels added on the end, so Google Analytics can tell where the visit came from. ${GA_UTM()} says to always use utm_source, utm_medium and utm_campaign, and to write values in lowercase, since "Google" and "google" count as different sources.</p>
<p><strong>Google Business Profile website link, ready to adapt:</strong></p>
<p>yourcompany.com/?utm_source=google&amp;utm_medium=organic&amp;utm_campaign=gbp-listing</p>
<p>Without that tag, clicks from your profile usually blend in with ordinary Google search visits. Use the same pattern for your booking link, Facebook page, email campaigns (utm_medium=email) and QR codes on mailers (utm_medium=print). You can also ${GBP_GA()} to see profile calls, website clicks and direction requests next to your website data. Google says that data covers the last 6 months.</p>
<h2>3. Ask "How did you hear about us?"</h2>
<p>Tracking numbers miss word of mouth. Someone sees your truck, asks a neighbor, then searches your name on Google. The tracking says "Google." The customer says "my neighbor."</p>
<ul>
<li>CSRs ask on every new-customer call: "And how did you hear about us?"</li>
<li>Use a short pick list, not free text: Google search, Google Maps, Google Ads, Local Services Ads, Facebook, referral, repeat customer, truck or sign, mailer, other.</li>
<li>Add the same question as a required field on web forms and online booking.</li>
</ul>
<h2>4. Save it in a CRM lead source field</h2>
<p>The source only matters if it's tied to the job and the invoice. Most field-service and CRM tools have a lead source or "referred by" field, or let you add a custom one. Set it on every new customer, then you can report revenue by source, not just calls. We set this up in our <a href="/services/crm-automation">CRM</a> so calls, forms and texts carry their source automatically.</p>
<h2>The math: cost per lead and cost per booked job</h2>
<ul>
<li><strong>Cost per lead</strong> = what the channel cost ÷ leads from it</li>
<li><strong>Booking rate</strong> = booked jobs ÷ leads</li>
<li><strong>Cost per booked job</strong> = what the channel cost ÷ booked jobs from it</li>
<li><strong>Return</strong> = revenue from those jobs ÷ what the channel cost</li>
</ul>
<p>Cost per booked job is the number to manage by. A channel with cheap leads that never book costs more than one with expensive leads that do. Plug your numbers into the <a href="/tools/cost-per-lead-calculator">cost per lead calculator</a>.</p>
<h2>A simple monthly report template</h2>
<p>One table, filled in on the first Monday of each month. The numbers below are a made-up example.</p>
<table>
<thead><tr><th>Source</th><th>Spend</th><th>Leads</th><th>Booked jobs</th><th>Revenue</th><th>Cost per lead</th><th>Cost per booked job</th></tr></thead>
<tbody>
<tr><td>Google Business Profile</td><td>$0 (plus your time)</td><td>42</td><td>25</td><td>$11,200</td><td>$0</td><td>$0</td></tr>
<tr><td>Local Services Ads</td><td>$1,500</td><td>30</td><td>14</td><td>$7,800</td><td>$50</td><td>$107</td></tr>
<tr><td>Google Ads</td><td>$2,000</td><td>25</td><td>9</td><td>$6,300</td><td>$80</td><td>$222</td></tr>
<tr><td>Mailer</td><td>$900</td><td>6</td><td>3</td><td>$1,400</td><td>$150</td><td>$300</td></tr>
<tr><td>Referral and repeat</td><td>$200 (rewards)</td><td>18</td><td>14</td><td>$5,900</td><td>$11</td><td>$14</td></tr>
</tbody>
</table>
<p>Add one line under the table: what you'll change next month. In this example, the mailer costs the most per booked job, so test a different list or offer before cutting it. For how the two Google ad types differ, read <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>
<h2>Common mistakes</h2>
<ul>
<li>Counting calls instead of booked jobs.</li>
<li>Letting "other" become the biggest source because nobody asked.</li>
<li>Using different spellings of the same source, which splits your numbers.</li>
<li>Judging a channel on one month. Look at three.</li>
</ul>
<h2>What we set up</h2>
<p>We set up tracking numbers, tag your links, add the source field to your CRM and send one plain page each month showing what brought calls and what they turned into. Call tracking runs on our CRM, which costs {{PRICE:crm}}. Extra numbers and minutes are usage-based and we confirm them first. See <a href="/services/call-tracking">call tracking</a>, or start with a <a href="/free-google-maps-audit">free Google Maps audit</a>.</p>`,
    faq: [
      ["How do contractors track where leads come from?", "With a separate call tracking number for each channel, UTM-tagged website links, asking every new customer how they heard about you, and saving the answer in a lead source field in the CRM."],
      ["Can I use a call tracking number on my Google Business Profile?", "Google's guidelines require a number that connects to your business and is under your direct control. A common setup is a local tracking number as the main number with your regular number listed as an additional number."],
      ["How do I add a UTM to my Google Business Profile?", "Add utm_source=google, utm_medium=organic and utm_campaign=gbp-listing to the end of the website link in your profile. Use lowercase, as Google Analytics treats different capitalization as different values."],
      ["How do you calculate cost per lead?", "Divide what a channel cost in a month by the number of leads it brought in. For example, $1,500 in ads that produced 30 leads is $50 per lead."],
      ["What is cost per booked job?", "What a channel cost divided by the jobs it actually booked. It's a better number to manage by than cost per lead, because cheap leads that never book aren't cheap."],
      ["How much does call tracking cost?", "Prices vary by provider. CallRail listed plans from $50 a month with 5 local numbers and 250 minutes when we checked in November 2026."],
    ],
  },
];
