// Review software listicle + review needs by trade (added 2026-11-27). Topics from Search Console demand:
// "review management software for <trade>" and "<competitor> alternatives". Research note: AI assistants cite honest
// lists of 10-20 options that state their criteria, so the listicle names its criteria and says who each tool fits.
// Vendor facts and prices were read on each vendor's own site on 2026-11-27. Where a vendor shows no dollar figure we say
// "quote-based". Keep competitor claims structural and fair (same rule as app/lib/alternatives.ts).
// The same verified facts feed app/lib/alternatives-others.ts: update both together.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;

const GOOGLE_POLICY = (t = "Google's review policy") => A("https://support.google.com/contributionpolicy/answer/7400114", t);
const NICEJOB = (t = "NiceJob's pricing page") => A("https://get.nicejob.com/pricing", t);
const GATHERUP = (t = "GatherUp's pricing page") => A("https://gatherup.com/pricing/", t);
const GRADEUS = (t = "Grade.us's plans page") => A("https://www.grade.us/home/plans/", t);
const BIRDEYE = (t = "Birdeye's pricing page") => A("https://www.birdeye.com/pricing/", t);
const PODIUM = (t = "Podium's pricing page") => A("https://www.podium.com/pricing", t);
const PULSEM = (t = "pulseM's site") => A("https://pulsem.me/", t);
const BROADLY = (t = "Broadly's pricing page") => A("https://broadly.com/pricing", t);
const SIGNPOST = (t = "Signpost's pricing page") => A("https://www.signpost.com/pricing", t);
const WEAVE = (t = "Weave's pricing page") => A("https://www.getweave.com/pricing/", t);
const REPUTATION = (t = "Reputation's pricing page") => A("https://reputation.com/pricing/", t);
const JOBBER = (t = "Jobber's pricing page") => A("https://www.getjobber.com/pricing/", t);
const JOBBER_REVIEWS = (t = "Jobber's Reviews page") => A("https://www.getjobber.com/features/reviews/", t);
const HCP = (t = "Housecall Pro's pricing page") => A("https://www.housecallpro.com/pricing/", t);
const HCP_REVIEWS = (t = "Housecall Pro's reviews page") => A("https://www.housecallpro.com/features/reviews/", t);
const ST_REP = (t = "ServiceTitan's Reputation page") => A("https://www.servicetitan.com/features/pro/marketing/reputation", t);
const ST_PRICING = (t = "ServiceTitan's pricing page") => A("https://www.servicetitan.com/pricing", t);

export const guides11 = [
  {
    slug: "best-review-management-software-for-contractors",
    path: "/guides/best-review-management-software-for-contractors",
    title: "Best Review Management Software for Contractors (2026)",
    description: "14 review management tools for contractors compared on trade fit, job-software triggers, pricing model and DIY vs done-for-you. Prices checked November 2026.",
    h1: "Best review management software for contractors (2026)",
    lede: "There is no single best review tool for every contractor. Here are 14 real options, the five criteria we judged them on, and who each one fits, with prices read on each vendor's own site on November 27, 2026.",
    eyebrow: "Review software", readMinutes: 9, article: { date: DATE },
    ctaTitle: "Want reviews handled without running another app?",
    content: `
<div class="callout"><p><strong>Short version:</strong> if you already pay for Jobber, Housecall Pro or ServiceTitan, try their built-in review requests first. If you want a cheap tool you'll run yourself, look at NiceJob or GatherUp. If your bottleneck is time, a done-for-you service such as TableTurnerr fits better. Birdeye, Podium and Reputation suit bigger, multi-location teams.</p></div>
<h2>How we judged these tools</h2>
<p>We sell one of the options on this list (TableTurnerr), so we've held every entry, ours included, to the same five criteria:</p>
<ul>
<li><strong>Trade fit:</strong> is it built for home services, or for dentists, car dealers or national chains?</li>
<li><strong>Job-software triggers:</strong> can the request go out automatically when a job is closed or an invoice is paid in the software you already use?</li>
<li><strong>Pricing model:</strong> is the price published, and is it flat, per location or quote-based? Is there a contract?</li>
<li><strong>Done-for-you vs DIY:</strong> does someone run it for you, or do you log in and do the work?</li>
<li><strong>Platforms covered:</strong> Google first, then Facebook and others.</li>
</ul>
<p>Prices below were read on each vendor's own pricing page on November 27, 2026. Where a vendor shows no dollar figure, we say "quote-based". Features change, so confirm before you buy. Whatever you choose, ask every customer the same way: ${GOOGLE_POLICY()} bans offering incentives for reviews and selectively asking only happy customers.</p>
<h2>Comparison table</h2>
<table>
<thead><tr><th>Tool</th><th>Type</th><th>Built for</th><th>Job-software trigger</th><th>Pricing (checked Nov 2026)</th></tr></thead>
<tbody>
<tr><td>TableTurnerr</td><td>Done-for-you</td><td>Home services</td><td>Jobber (official), Housecall Pro (premium plan), others via Zapier/Make</td><td>Published flat package, month to month</td></tr>
<tr><td>Jobber Reviews</td><td>Built into job software</td><td>Home services</td><td>Built in</td><td>Published plans; Reviews is an add-on</td></tr>
<tr><td>Housecall Pro</td><td>Built into job software</td><td>Home services</td><td>Built in</td><td>Published; on all plans, from $79/mo monthly</td></tr>
<tr><td>ServiceTitan Reputation</td><td>Built into job software</td><td>Larger trade shops</td><td>Built in (Marketing Pro)</td><td>Quote-based</td></tr>
<tr><td>NiceJob</td><td>DIY review tool</td><td>Service businesses</td><td>Marketplace integrations</td><td>Published: from $95/mo</td></tr>
<tr><td>GatherUp</td><td>DIY review tool</td><td>Local businesses</td><td>Via Zapier</td><td>Published: from $99/mo, billed annually</td></tr>
<tr><td>Grade.us</td><td>DIY / agency tool</td><td>Marketing agencies</td><td>Check before buying</td><td>Published: from $99/mo</td></tr>
<tr><td>pulseM</td><td>DIY review tool</td><td>Home services</td><td>ServiceTitan; others via Zapier</td><td>Quote-based</td></tr>
<tr><td>Birdeye</td><td>Broad platform</td><td>Multi-location</td><td>ServiceTitan, Housecall Pro</td><td>Quote-based, per location</td></tr>
<tr><td>Podium</td><td>Messaging + AI platform</td><td>Local businesses</td><td>ServiceTitan, Housecall Pro</td><td>Quote-based</td></tr>
<tr><td>Reputation</td><td>Enterprise platform</td><td>Multi-location brands</td><td>Integrations add-on</td><td>Published: from $80 per location/mo</td></tr>
<tr><td>Broadly</td><td>AI front desk + reviews</td><td>Local service businesses</td><td>Ask in demo</td><td>Published: $299/mo plan, 12-month agreement</td></tr>
<tr><td>Signpost</td><td>Managed marketing bundle</td><td>Home services</td><td>Ask in demo</td><td>Quote-based, 6-month agreement</td></tr>
<tr><td>Weave</td><td>Practice communications</td><td>Dental, vet, optometry</td><td>Practice software</td><td>Published: from $199/mo</td></tr>
</tbody>
</table>
<h2>Each option, and who it fits</h2>
<h3>1. TableTurnerr</h3>
<p>Our service. We send the review requests, write replies with AI, run missed-call text-back, ship NFC review cards and send a monthly report. It costs {{PRICE:reviews}}. Jobber is an official integration, Housecall Pro connects on its premium plan, and other software connects through Zapier or Make. The trade-off: it's a service, so you get less hands-on control than a self-serve dashboard. <strong>Best for:</strong> owner-operators who know they should ask for reviews but never get to it.</p>
<h3>2. Jobber Reviews</h3>
<p>Per ${JOBBER_REVIEWS()}, requests can go out after a visit, a completed job or a paid invoice, with AI-drafted replies and a Google rating dashboard. ${JOBBER()} lists Reviews as an add-on (no price shown) and Marketing Suite as a $99/mo add-on. <strong>Best for:</strong> Jobber users who only need Google requests sent automatically.</p>
<h3>3. Housecall Pro</h3>
<p>${HCP_REVIEWS()} describes automatic requests after every job or payment, follow-ups, and replying to Google and Facebook reviews from one dashboard. ${HCP()} lists review management on all three plans, from $79/mo billed monthly ($59 billed annually). <strong>Best for:</strong> Housecall Pro shops that want reviews without another login.</p>
<h3>4. ServiceTitan Reputation</h3>
<p>Part of Marketing Pro. ${ST_REP()} says it sends requests after a completed job and links each review to the customer, job and technician, with Google, Facebook and Yelp in one feed. ${ST_PRICING()} is quote-based. <strong>Best for:</strong> larger ServiceTitan shops that want reviews tied to tech performance.</p>
<h3>5. NiceJob</h3>
<p>A self-serve review tool with SMS and email requests, website widgets and a team leaderboard. ${NICEJOB()} shows Starter at $95/mo and Pro at $135/mo, no contracts and a 14-day trial. <strong>Best for:</strong> small shops happy to run an affordable tool themselves.</p>
<h3>6. GatherUp</h3>
<p>Review requests, AI-drafted replies, surveys and monitoring across 100+ sites. ${GATHERUP()} shows $99/mo for one location billed annually and $60 per location for multiple locations. Job-software links run mainly through Zapier. <strong>Best for:</strong> owners who want surveys and monitoring and don't mind some setup.</p>
<h3>7. Grade.us</h3>
<p>Its own site calls it a review platform for marketing agencies, with white-label options. ${GRADEUS()} lists $99/mo for one location and $60 per location for 2 to 10. <strong>Best for:</strong> agencies managing reviews for several contractor clients.</p>
<h3>8. pulseM</h3>
<p>Built for home services, with pre-service technician bios and post-service review requests. ServiceTitan's help center lists it as a reputation integration. ${PULSEM()} shows no prices, only demos. <strong>Best for:</strong> HVAC and plumbing shops that want the technician front and center.</p>
<h3>9. Birdeye</h3>
<p>A broad platform covering reviews, listings, messaging and AI tools. ${BIRDEYE()} is quote-based and priced per location per month. It has ServiceTitan and Housecall Pro integrations. <strong>Best for:</strong> multi-location companies with someone to run it.</p>
<h3>10. Podium</h3>
<p>Now centered on an AI Employee plus texting, reviews, payments and an inbox. ${PODIUM()} is quote-based. Its marketplace lists ServiceTitan and Housecall Pro apps. <strong>Best for:</strong> shops that want messaging, payments and reviews from one vendor.</p>
<h3>11. Reputation</h3>
<p>An enterprise platform for multi-location brands, mainly in auto, healthcare, retail and real estate. ${REPUTATION()} lists Rep Core from $80 per location per month. <strong>Best for:</strong> franchises and large brands, not most single-shop contractors.</p>
<h3>12. Broadly</h3>
<p>Now led by an AI receptionist. ${BROADLY()} shows its AI Front Desk plan, which asks every customer for a review and replies to each one, at $299/mo on a 12-month agreement plus a $250 setup fee. <strong>Best for:</strong> shops that want call answering and reviews from one vendor and are fine with an annual term.</p>
<h3>13. Signpost</h3>
<p>A home-services marketing bundle (AI voice, reviews, listings, payments) with a dedicated account manager. ${SIGNPOST()} is quote-based with a 6-month agreement. <strong>Best for:</strong> owners who want a broad managed bundle and can commit for six months.</p>
<h3>14. Weave</h3>
<p>Phones, texting and reviews for healthcare practices. ${WEAVE()} starts at $199/mo and lists dental, vet, medical and optometry integrations, not home services. <strong>Best for:</strong> practices; most contractors will fit better elsewhere.</p>
<h2>How to choose in five minutes</h2>
<ol>
<li>Check what your job software already includes. If requests already go out and reviews are growing, you may need nothing else. See our guides for ${A("/guides/jobber-google-reviews", "Jobber")}, ${A("/guides/housecall-pro-google-reviews", "Housecall Pro")} and ${A("/guides/servicetitan-review-requests", "ServiceTitan")}.</li>
<li>Be honest about time. If nobody will log in weekly, pick a done-for-you option over a dashboard.</li>
<li>Count locations. Per-location pricing adds up fast past two or three shops.</li>
<li>Read the contract terms. Some options are month to month, others run 6 or 12 months.</li>
<li>Check the trade fit. The ${A("/guides/review-software-by-trade", "review software by trade guide")} covers what HVAC, roofing, pest control and others need.</li>
</ol>
<p>Still deciding? Our ${A("/guides/best-review-software-for-contractors", "honest comparison of review software types")} explains built-in vs standalone vs done-for-you, and ${A("/guides/how-to-get-more-google-reviews", "how to get more Google reviews")} covers the asking itself. To see where you stand today, get a ${A("/free-google-maps-audit", "free Google Maps audit")}, or see what our ${A("/services/review-generation", "done-for-you review generation")} includes.</p>`,
    faq: [
      ["What is the best review management software for contractors?", "It depends on your setup. Jobber, Housecall Pro and ServiceTitan users should try built-in review requests first. Small shops that will run a tool themselves often fit NiceJob or GatherUp, and owners short on time fit a done-for-you service."],
      ["Do I need review software if my job software sends review requests?", "Maybe not. If requests go out after every job and your Google reviews keep growing, you may not need anything else. Standalone tools add things like surveys, widgets and multi-site monitoring."],
      ["How much does review management software cost?", "Of the published prices we checked in November 2026, self-serve tools started around $95 to $99 a month. Birdeye, Podium, pulseM, Signpost and ServiceTitan were quote-based."],
      ["Is per-location pricing a problem for contractors?", "Only if you run several locations or brands. A one-shop contractor pays one location price, but costs multiply as you add shops."],
      ["Can review software only ask happy customers?", "It shouldn't. Google's policy bans selectively asking for positive reviews, so ask every customer the same way."],
      ["Is TableTurnerr the right choice for every contractor?", "No. If your job software already handles requests and you have time to reply, you may not need us. We fit owners who want requests, replies and follow-up handled for them."],
    ],
  },
  {
    slug: "review-software-by-trade",
    path: "/guides/review-software-by-trade",
    title: "Review Software by Trade: What Each Trade Needs",
    description: "What matters for reviews in HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping and handyman work, and which type of review tool fits.",
    h1: "Review software by trade: what each trade actually needs",
    lede: "A roofer and a pest control company both need Google reviews, but they ask at different times, for different reasons, from different software. Here's what matters in eight trades and which type of tool fits each.",
    eyebrow: "Reviews by trade", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Get review requests timed for your trade.",
    content: `
<div class="callout"><p><strong>Short version:</strong> the right review tool depends on when your customer is happiest and which software knows the job is done. Fast-call trades (HVAC, plumbing, electrical, garage door) should ask within hours of the job. Big-ticket trades (roofing) should ask at completion, not at payment. Route trades (pest control, lawn care) should ask after a good early visit and then again later in the season.</p></div>
<h2>Three types of review tool</h2>
<p>Every option falls into one of three groups. Our ${A("/guides/best-review-management-software-for-contractors", "list of 14 review tools")} compares them in detail.</p>
<ul>
<li><strong>Built into your job software:</strong> Jobber, Housecall Pro and ServiceTitan can send requests when a job closes. Cheapest if you already pay for it.</li>
<li><strong>Standalone DIY tools:</strong> NiceJob, GatherUp, pulseM and others. More features, but you run them.</li>
<li><strong>Done-for-you:</strong> someone else runs requests, follow-ups and replies, connected to your software.</li>
</ul>
<p>One rule applies to every trade: ${GOOGLE_POLICY()} bans incentives for reviews and asking only customers you think are happy. Ask everyone the same way.</p>
<h2>HVAC</h2>
<p>HVAC demand spikes in the first heat wave and the first cold snap, and so does the chance to build reviews. Ask the same day, while the house is cool again. Reviews that name the tech ("Mike fixed our AC in an hour") help, so make sure the request comes from the tech's job. Photos of new installs are useful on your Google profile. Many shops run ServiceTitan or Housecall Pro, so built-in or connected requests usually fit. Busy summers are when owners stop asking, which is where done-for-you helps most. More: ${A("/industries/hvac", "HVAC industry page")} and ${A("/marketing/hvac/review-generation", "review generation for HVAC")}.</p>
<h2>Plumbing</h2>
<p>Plumbing calls are often emergencies, so the relief right after the fix is the best moment to ask. Send the request within an hour or two of closing the job. Name the plumber, and expect reviews to mention speed and cleanliness. Drain and water heater jobs bring repeat customers, so a review from a past customer still counts. Jobber, Housecall Pro and ServiceTitan are all common here. More: ${A("/industries/plumbing", "plumbing industry page")} and ${A("/marketing/plumbing/review-generation", "review generation for plumbers")}.</p>
<h2>Electricians</h2>
<p>Electrical work splits into quick service calls and longer projects like panel upgrades or EV charger installs. Ask after service calls the same day. For projects, ask after the final inspection passes, not after the rough-in. Reviews that mention the specific job ("installed our EV charger") help you show up for that service. Our ${A("/guides/electrician-review-management", "electrician review guide")} goes deeper. More: ${A("/industries/electrical", "electrical industry page")} and ${A("/marketing/electricians/review-generation", "review generation for electricians")}.</p>
<h2>Roofing</h2>
<p>Roofing has fewer, bigger jobs, so every review matters more. Ask at completion when the yard is clean and the homeowner can see the new roof, not weeks later when the final invoice is paid. Before-and-after photos are your strongest proof. Storm seasons bring a wave of jobs, then a quiet stretch where asking past customers pays off. Many roofers run a roofing CRM such as AccuLynx or JobNimbus. If yours doesn't send review requests the way you want, a tool that connects through Zapier or Make, or works from a customer list, fills the gap. Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days with our help. More: ${A("/industries/roofing", "roofing industry page")} and ${A("/marketing/roofing/review-generation", "review generation for roofers")}.</p>
<h2>Garage door</h2>
<p>Garage door repairs are fast, urgent and usually done in one visit. A broken spring means a stuck car, so customers are grateful when it's fixed. Ask before the tech leaves the driveway, or within the hour. Tech names matter because homeowners compare companies on trust. Volume is high, so automation from your job software (often Housecall Pro, ServiceTitan or Workiz) is a must. More: ${A("/industries/garage-door-repair", "garage door industry page")} and ${A("/marketing/garage-door-repair/review-generation", "review generation for garage door companies")}.</p>
<h2>Pest control</h2>
<p>Pest control is recurring, so the first visit isn't the best time to ask. Results show after the treatment works. Ask after the second or third service, or once the problem is clearly gone, and limit requests so a monthly customer isn't asked every month. Routing software like GorillaDesk, FieldRoutes or PestPac is common. Pick a tool that can trigger on a chosen visit, not every visit. More: ${A("/industries/pest-control", "pest control industry page")} and ${A("/marketing/pest-control/review-generation", "review generation for pest control")}.</p>
<h2>Landscaping and lawn care</h2>
<p>Lawn care is seasonal and recurring. Ask early in the season after a visit that clearly shows results, and again after a big job like a cleanup or install. Before-and-after photos do a lot of work here. Crews rotate, so reviews tend to name the company more than one person. Jobber is common for smaller crews. Asking at season's end also tees up next year's signups. More: ${A("/industries/lawn-care", "lawn care industry page")} and ${A("/marketing/landscaping/review-generation", "review generation for landscapers")}.</p>
<h2>Handyman</h2>
<p>Handyman work covers lots of small, varied jobs, often for the same customers again and again. Ask after each completed job, but not more than once every few months for repeat clients. Reviews that list the type of work ("hung doors, fixed a leak") help you show up for those searches. Many handymen use Jobber, Housecall Pro or no job software at all. With no software, a done-for-you service that imports your customer list fits best. More: ${A("/industries/handyman", "handyman industry page")} and ${A("/marketing/handyman/review-generation", "review generation for handymen")}.</p>
<h2>Which type of tool fits your trade</h2>
<table>
<thead><tr><th>Trade</th><th>Best moment to ask</th><th>What reviews should mention</th><th>Usually fits</th></tr></thead>
<tbody>
<tr><td>HVAC</td><td>Same day, after the fix</td><td>Tech name, speed, comfort</td><td>Built-in or done-for-you</td></tr>
<tr><td>Plumbing</td><td>Within an hour or two</td><td>Speed, cleanliness, the fix</td><td>Built-in or done-for-you</td></tr>
<tr><td>Electrical</td><td>Same day, or after final inspection</td><td>The specific job</td><td>Built-in or done-for-you</td></tr>
<tr><td>Roofing</td><td>At completion, with photos</td><td>Crew, cleanup, the result</td><td>Connected tool or done-for-you</td></tr>
<tr><td>Garage door</td><td>Before the tech leaves</td><td>Tech name, speed</td><td>Built-in automation</td></tr>
<tr><td>Pest control</td><td>After results show</td><td>Problem solved</td><td>Tool that picks the visit</td></tr>
<tr><td>Landscaping</td><td>After a visible result</td><td>Before-and-after, reliability</td><td>Built-in or DIY tool</td></tr>
<tr><td>Handyman</td><td>After each job, capped</td><td>The type of work</td><td>Done-for-you or list import</td></tr>
</tbody>
</table>
<p>Not sure where you stand? A ${A("/free-google-maps-audit", "free Google Maps audit")} shows how your reviews compare with the top three shops near you. If you'd rather not run it yourself, our ${A("/services/review-generation", "done-for-you review generation")} handles requests and replies. It costs {{PRICE:reviews}}.</p>`,
    faq: [
      ["When should a contractor ask for a Google review?", "As close to the moment the customer feels relief as you can. For service calls that's the same day. For big jobs like roofs, it's at completion, not when the last invoice is paid."],
      ["Should reviews mention the technician's name?", "It helps in trades where customers worry about who is coming to the house, like HVAC, plumbing and garage door. Send the request from the tech's job so it's easy for customers to name them."],
      ["How often should I ask recurring customers like pest control or lawn care clients?", "Not every visit. Ask once results are clear, then wait several months before asking the same customer again."],
      ["What if my job software doesn't send review requests?", "Use a tool that connects through Zapier or Make, or one that works from an imported customer list. Roofing CRMs and older systems often need this."],
      ["Do photos help with reviews?", "Yes, especially for roofing, landscaping and installs. Customers can add photos to their reviews, and you can post job photos on your Google profile."],
      ["Is one review tool right for every trade?", "No. Fast-call trades need same-day automation, while recurring and big-ticket trades need control over which visit triggers the request."],
    ],
  },
];
