// Website cost guides by trade (added 2026-11-27): plumber, HVAC, electrician, roofing, landscaping/lawn care.
// Topic: "how much does a website cost for a <trade>" queries. Each guide gives the four-route price answer first,
// then trade-specific pages, buyer behavior, price drivers and what to skip. No shared paragraphs between guides.
// Sources checked 2026-11-27: Wix (its own premium-plans article, "current as of November 2026"), Squarespace (its
// published USD pricing file), Durable and Hostinger pricing pages, NiceJob pricing, Project Cost Estimator's per-trade
// cost pages, HireBestFreelance's Fiverr pricing guide, Hook Agency, BrightLocal, IRS, EPA, CSLB, Insurance Journal,
// colorado.public.law. GoDaddy's builder pages refused automated fetches, so no GoDaddy price is quoted.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;

const WIX = (t = "Wix") => A("https://www.wix.com/blog/wix-premium-plans", t);
const SQSP = (t = "Squarespace") => A("https://www.squarespace.com/pricing", t);
const DURABLE = (t = "Durable") => A("https://durable.com/pricing", t);
const HOSTINGER = (t = "Hostinger") => A("https://www.hostinger.com/website-builder", t);
const NICEJOB = (t = "NiceJob") => A("https://get.nicejob.com/pricing", t);
const FIVERR_GUIDE = (t = "a 2026 Fiverr pricing guide from HireBestFreelance") => A("https://hirebestfreelance.com/fiverr-web-developers-pricing/", t);
const HOOK = (t = "Hook Agency") => A("https://hookagency.com/blog/digital-marketing-costs-for-home-service-businesses-in-2026/", t);
const BRIGHTLOCAL = (t = "BrightLocal's 2026 local AI visibility study") => A("https://www.brightlocal.com/research/local-ai-visibility-study/", t);
const PCE_PLUMBER = (t = "Project Cost Estimator's plumber page") => A("https://projectcostestimator.com/cost/industry/plumber", t);
const PCE_HVAC = (t = "Project Cost Estimator's HVAC page") => A("https://projectcostestimator.com/cost/industry/hvac", t);
const PCE_ELEC = (t = "Project Cost Estimator's electrician page") => A("https://projectcostestimator.com/cost/industry/electrician", t);
const PCE_ELEC_BLOG = (t = "its electrician cost breakdown") => A("https://projectcostestimator.com/blog/electrician-website-cost-2026", t);
const PCE_ROOF = (t = "Project Cost Estimator's roofer page") => A("https://projectcostestimator.com/cost/industry/roofer", t);
const PCE_LAND = (t = "Project Cost Estimator's landscaper page") => A("https://projectcostestimator.com/cost/industry/landscaper", t);
const EPA_LEAK = (t = "EPA WaterSense") => A("https://www.epa.gov/watersense/fix-leak-week", t);
const EPA_OUTDOOR = (t = "EPA WaterSense") => A("https://www.epa.gov/watersense/outdoors", t);
const EPA_REFRIG = (t = "EPA's May 2026 fact sheet") => A("https://www.epa.gov/system/files/documents/2026-05/fact-sheet-san-12166-technology-transitions-frm.pdf", t);
const IRS_25C = (t = "the IRS") => A("https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit", t);
const IRS_30C = (t = "the IRS") => A("https://www.irs.gov/credits-deductions/alternative-fuel-vehicle-refueling-property-credit", t);
const CSLB = (t = "California's contractor board") => A("https://www.cslb.ca.gov/Resources/IndustryBulletins/Online_Marketplace_Fast_Facts.pdf", t);
const TX_DEDUCTIBLE = (t = "Insurance Journal") => A("https://www.insurancejournal.com/news/southcentral/2019/08/08/535216.htm", t);
const CO_DEDUCTIBLE = (t = "Colorado statute 6-22-105") => A("https://colorado.public.law/statutes/crs_6-22-105", t);

export const guides13 = [
  {
    slug: "plumber-website-cost",
    path: "/guides/plumber-website-cost",
    title: "How Much Does a Plumber Website Cost? (2026)",
    description: "Plumber website cost in 2026: AI builders, freelancers, agencies and done-for-you plans compared, plus the pages a plumbing site needs and what to skip.",
    h1: "How much does a plumber website cost?",
    lede: "Anywhere from about $17 a month to more than $17,000 up front. What you should pay depends on whether you want a page that looks fine or a site that gets the 11 p.m. burst-pipe call.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a plumbing site that brings in calls, not just visits?",
    content: `
<div class="callout"><p><strong>Short version:</strong> an AI website builder costs about $17 to $49 a month on a yearly plan. A freelancer charges roughly $150 to $750 for a basic marketplace site, or about $2,200 to $7,250 for a full plumbing site with service-area pages. An agency build runs about $5,800 to $17,400. A done-for-you monthly plan skips the up-front bill; ours is {{PRICE:website}}.</p></div>
<h2>The four ways to get a plumbing website, priced</h2>
<table>
<thead><tr><th>Route</th><th>What you pay</th><th>What you get</th><th>What's usually missing for a plumber</th></tr></thead>
<tbody>
<tr><td>AI website builder</td><td>About $17 to $49/mo (yearly billing)</td><td>A clean site in an afternoon</td><td>Service-area pages, a review engine, anyone to follow up on form leads</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $750 one-time</td><td>A WordPress site that looks good on launch day</td><td>Hosting, edits and SEO, all extra or not offered</td></tr>
<tr><td>Experienced freelancer</td><td>About $2,200 to $7,250 one-time</td><td>Custom design, service pages, quote form</td><td>Ongoing work after launch; hosting and tools add $30 to $150/mo</td></tr>
<tr><td>Agency</td><td>About $5,800 to $17,400 one-time</td><td>A bigger build with integrations</td><td>Monthly fees for anything new; check who owns the site</td></tr>
<tr><td>Done-for-you monthly</td><td>About $99/mo and up</td><td>Site, hosting and edits handled</td><td>Varies a lot: ask what growth work is actually included</td></tr>
</tbody>
</table>
<p>Where the numbers come from (all checked November 2026): builder plans from ${WIX()} (Light $17, Core $29, Business $39 a month, yearly), ${SQSP()} (Basic $19, Core $29, Plus $49 a month, yearly; more if paid monthly) and ${DURABLE()} (Launch $25, Grow $49). ${HOSTINGER()} advertises plans from $1.99 a month, but only on a 48-month prepay, renewing at $10.99 to $25.99. Marketplace figures are the example Fiverr WordPress packages ($150, $350, $750) in ${FIVERR_GUIDE()}. Freelancer, agency and running-cost ranges are from ${PCE_PLUMBER()}. The $99 example is ${NICEJOB()}'s managed Sites product, which also charges $199 to set up.</p>
<h2>How people actually pick a plumber</h2>
<p>Plumbing has two kinds of buyers, and your site has to serve both.</p>
<p>The first has water on the floor. They search "emergency plumber near me" on a phone, often at night or on a weekend, tap the first result that looks real, and call. They don't read. They need a phone number at the top of the screen, proof you're open now, and a few reviews in view. Whoever answers first usually gets the job.</p>
<p>The second is planning: a water heater on its last legs, a slow main line, a remodel that needs repiping. They read two or three sites, compare reviews, and fill out a form or call during business hours. They want to see that you do that exact job, in their town, and what happens after they reach out.</p>
<p>A cheap template usually serves neither well. It has one "Services" page with a bulleted list, so it can't rank for "water heater replacement" in your town, and the phone number hides in a menu.</p>
<h2>Pages a plumbing site needs</h2>
<ul>
<li><strong>An emergency page and a 24/7 banner,</strong> but only if someone really answers at 2 a.m. A "24/7" badge that rolls to voicemail costs you the call and the review.</li>
<li><strong>Drain cleaning and sewer line pages.</strong> Clogs are frequent, fast jobs; sewer work is the big ticket that follows a camera inspection.</li>
<li><strong>Water heater repair and replacement,</strong> with tank and tankless covered separately. This is the classic planned purchase people research.</li>
<li><strong>Leak detection.</strong> ${EPA_LEAK()} says household leaks can waste more than 9,300 gallons a year in the average home, and 9% of homes have leaks wasting 50 gallons or more a day. Its Fix a Leak Week runs every March (March 16 to 22 in 2026), which is a natural time to promote this page.</li>
<li><strong>Repiping and fixture installs</strong> if you do them.</li>
<li><strong>A page for each town you want calls from,</strong> written about that town, not the same text with the name swapped.</li>
<li><strong>Your license, insurance and reviews</strong> where a nervous homeowner can see them without scrolling.</li>
<li><strong>A short form:</strong> name, phone, address, what's wrong, and an optional photo.</li>
</ul>
<h2>What pushes a plumbing site's price up</h2>
<ul>
<li><strong>Service-area pages.</strong> Project Cost Estimator calls these the main price lever and suggests 10 to 15 location pages. Each one takes real writing.</li>
<li><strong>Booking and dispatch hookups</strong> to tools like ServiceTitan or Housecall Pro.</li>
<li><strong>Call tracking,</strong> about $30 to $50 a month extra if you run ads, so you know which calls the site produced.</li>
<li><strong>Real job photos and copy about your work,</strong> which take interviews and a photo hunt.</li>
<li><strong>Moving an old site</strong> without losing rankings. Skipping the redirects is the expensive version.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>An online store for parts. Homeowners don't buy flappers from their plumber's website.</li>
<li>A chat bubble nobody watches after 5 p.m. A missed chat feels worse than no chat.</li>
<li>Blog posts of generic tips copied from everywhere. Ten pages about your actual services beat fifty about "how to plunge a toilet."</li>
<li>Slider animations and autoplay video that slow the page on a weak phone signal, exactly when someone is standing in a wet basement.</li>
</ul>
<h2>Who should just buy the cheap option</h2>
<p>A builder at about $20 a month, or a $300 freelancer site, is the right call for some plumbers: a brand-new license, one truck, and work that comes from a contractor you sub for or from word of mouth. If you have no budget for monthly marketing, a clean one-page site with your number, license and reviews is far better than nothing.</p>
<p>The catch: a website has one job, getting you more customers. For that it has to show up in Google and in AI answers, and that takes monthly work (new pages, reviews, fixes) that compounds over a year or two. AI tools lean heavily on business sites: in ${BRIGHTLOCAL()}, business websites made up 42% of the sources cited in local AI answers. A site nobody touches after launch slowly drops out of both.</p>
<h2>What ours includes, by package</h2>
<ul>
<li><strong>Starter:</strong> {{PRICE:website}}. That also covers review requests, AI review replies, missed-call text-back and NFC review cards.</li>
<li><strong>Growth:</strong> {{PRICE:ai}}. This is the one that matters most for night calls: the AI answers 24/7, takes several calls at once, and forwards true emergencies to your on-call plumber by your rules. Every website form lead gets an instant text, estimates get reminders, and past customers get seasonal campaigns, all in one inbox. More on our <a href="/marketing/plumbing/ai-answering-service">AI answering for plumbers</a>.</li>
<li><strong>Complete:</strong> {{PRICE:seo}}, so you get new drain, water heater and town pages every month, picked from what people in your area search.</li>
</ul>
<p>See how we build <a href="/marketing/plumbing/contractor-websites">plumbing websites</a>, compare all packages on the <a href="/pricing">pricing page</a>, or read the wider <a href="/guides/contractor-website-cost">contractor website cost guide</a> and <a href="/guides/how-much-does-a-website-cost">how much a website costs in general</a>. Running heating and cooling too? See <a href="/guides/hvac-website-cost">HVAC website cost</a>.</p>`,
    faq: [
      ["How much does a plumber website cost in 2026?", "About $17 to $49 a month with an AI builder, $150 to $750 for a basic marketplace freelancer site, about $2,200 to $7,250 for a full freelancer build, or about $5,800 to $17,400 from an agency. Hosting and tools add about $30 to $150 a month to one-time builds."],
      ["Does a plumbing website need a 24/7 emergency page?", "Only if someone actually answers around the clock. If you do, put the emergency number in a banner at the top of every page, because night callers call the first business that looks open."],
      ["How many pages should a plumber website have?", "Plan on a page for each main service (drains, water heaters, leaks, sewer, repiping) plus one for each town you want calls from. Project Cost Estimator suggests 10 to 15 location pages for local search."],
      ["Is a $300 plumber website worth it?", "It can be for a new one-truck shop that gets most work by referral. It won't come with service-area pages, SEO or anyone to update it, so it rarely brings in new search calls on its own."],
      ["Should a plumber put prices on the website?", "Many plumbers list a service call or trip fee and give ranges for common jobs like water heater replacement. Full price lists are risky because every house is different."],
      ["Can my plumbing website connect to Jobber or Housecall Pro?", "Yes. With us, Jobber is an official integration, Housecall Pro connects on its plan that allows integrations, and other software connects through Zapier or Make."],
    ],
  },
  {
    slug: "hvac-website-cost",
    path: "/guides/hvac-website-cost",
    title: "How Much Does an HVAC Website Cost? (2026)",
    description: "HVAC website cost in 2026: builder, freelancer, agency and done-for-you prices, seasonal pages, maintenance plans, financing and outdated content to fix.",
    h1: "How much does an HVAC website cost?",
    lede: "HVAC sites cost more than most trade sites because they sell two things at once: urgent repairs and big replacement systems. Here are real price ranges and what changes them.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want an HVAC site that's ready before the first heat wave?",
    content: `
<div class="callout"><p><strong>Short version:</strong> AI website builders cost about $17 to $49 a month on yearly billing. Freelancers charge from about $150 to $750 for a basic marketplace site up to about $2,900 to $9,450 for a full HVAC build. Agencies quote about $7,250 to $23,200. Done-for-you monthly plans cover the site, hosting and edits with no big up-front bill; ours is {{PRICE:website}}.</p></div>
<h2>HVAC website cost at a glance</h2>
<table>
<thead><tr><th>Route</th><th>Up front</th><th>Monthly after launch</th><th>Fits an HVAC company that...</th></tr></thead>
<tbody>
<tr><td>AI builder (Wix, Squarespace, Durable)</td><td>$0</td><td>About $17 to $49</td><td>Is brand new and will write and update its own pages</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $750</td><td>Hosting and edits extra</td><td>Needs something live this week on a tiny budget</td></tr>
<tr><td>Experienced freelancer</td><td>About $2,900 to $9,450</td><td>About $40 to $200 for hosting, tools and upkeep</td><td>Has a clear plan and someone in-house to keep it current</td></tr>
<tr><td>Agency</td><td>About $7,250 to $23,200</td><td>Usually a retainer on top</td><td>Runs several trucks, many towns and paid ads</td></tr>
<tr><td>Done-for-you monthly</td><td>Usually a small setup fee or none</td><td>About $99 and up</td><td>Wants edits, seasonal changes and growth work handled</td></tr>
</tbody>
</table>
<p>Sources, checked November 2026: ${WIX()} and ${SQSP()} plan prices (yearly billing; Squarespace runs $25 to $65 a month on its main plans if paid monthly), ${DURABLE()}'s Launch and Grow plans, the example Fiverr packages in ${FIVERR_GUIDE()}, and ${PCE_HVAC()} for freelancer, agency and running costs. The $99 example is ${NICEJOB()} Sites, plus a $199 setup fee.</p>
<h2>Your site works two seasons a year</h2>
<p>HVAC demand comes in waves. The first real heat wave floods phones with "AC not cooling" calls, and the first cold snap does the same for furnaces and heat pumps. Between them, the shoulder seasons are when tune-ups, replacements and maintenance-plan sales happen.</p>
<p>That rhythm shapes the site. In June the top banner should say you're booking AC repairs today. In October it should push furnace tune-ups. A site you can't change without paying a developer stays stuck on last season's message. Repair buyers decide in minutes and call whoever answers. Replacement buyers take days, collect two or three quotes, and care about financing, warranties and reviews from neighbors who had the same system installed.</p>
<h2>Pages an HVAC site needs</h2>
<ul>
<li><strong>AC repair and heating repair</strong> as separate pages, since people search them separately.</li>
<li><strong>Heat pumps,</strong> including ductless mini-splits if you install them.</li>
<li><strong>System replacement,</strong> with what a typical install includes and how long it takes.</li>
<li><strong>A maintenance plan page with a sign-up form.</strong> Plans smooth out the slow months, and a page that explains visits, discounts and priority service sells them while you sleep.</li>
<li><strong>Financing,</strong> because a new system is a big, often unplanned bill.</li>
<li><strong>A seasonal banner</strong> you can swap in minutes.</li>
<li><strong>Town pages</strong> for the areas you want more work in.</li>
<li><strong>Indoor air quality</strong> only if you really sell it.</li>
</ul>
<h2>HVAC content that went stale in 2026</h2>
<p>This is the clearest case for a site someone keeps editing. Two things many HVAC sites still say are now out of date:</p>
<ul>
<li><strong>The federal heat pump and AC tax credit.</strong> According to ${IRS_25C()}, the Energy Efficient Home Improvement Credit covers property placed in service from 2023 through 2025. A "get up to $2,000 back" banner on a 2026 install page is wrong.</li>
<li><strong>The refrigerant deadline.</strong> Plenty of sites told customers that older R-410A systems couldn't be installed after January 1, 2026. ${EPA_REFRIG()} says the agency removed that installation date on May 21, 2026, so systems made or imported before 2025 can be installed until supply runs out.</li>
</ul>
<p>Wrong information costs trust, and AI search tools quote what's on your site. In ${BRIGHTLOCAL()}, business websites made up 42% of the sources cited in local AI answers. If yours says something outdated, that's what gets repeated.</p>
<h2>What makes an HVAC site cost more</h2>
<ul>
<li><strong>Maintenance-plan billing and financing integration.</strong> Project Cost Estimator names these the largest price factors for HVAC builds.</li>
<li><strong>Seasonal offer pages</strong> built for each season's push.</li>
<li><strong>Dispatch hookups</strong> such as ServiceTitan; the booking platform itself often runs $100 to $300 a month on its own.</li>
<li><strong>Install photography</strong> of your own crews and equipment.</li>
<li><strong>The number of town pages.</strong></li>
</ul>
<h3>Worked example: three years of cost</h3>
<p>Take Project Cost Estimator's standard HVAC build at about $6,150, then add its $40 to $200 a month for hosting, tools and upkeep. Over three years that's about $7,590 to $13,350, before anyone writes a new page. A $29-a-month builder plan over the same three years is about $1,044, plus your evenings. Neither number includes the seasonal edits, new pages and review work that decide whether the site brings in installs. Ask every vendor for the three-year total, not just the launch price.</p>
<h2>What to skip</h2>
<ul>
<li>A home-made load or sizing calculator. Homeowners can't use it well, and a bad answer starts an argument.</li>
<li>A separate page for every model number you carry. One page per system type is plenty.</li>
<li>Countdown timers on fake "sales." They read as pushy and go stale.</li>
<li>Paying for custom design before you have the basic pages above.</li>
</ul>
<p>To be fair to the cheap routes: if you're a one-tech shop that lives on builder referrals and warranty work, a $20-a-month builder site with your number, license and reviews is enough for now. Spend more when you want new customers from search, because that takes steady monthly work on pages and reviews that pays off over the long run.</p>
<h2>What ours includes, by package</h2>
<ul>
<li><strong>Starter:</strong> {{PRICE:website}}. Review requests, AI review replies, missed-call text-back and NFC review cards come with it, and seasonal banner changes are part of the edits.</li>
<li><strong>Growth:</strong> {{PRICE:crm}}. Past customers get tune-up reminders before each season, quotes for new systems get follow-ups, and form leads get an instant text. During a heat wave the AI answers several calls at once, books repairs, and sends no-heat or no-cool emergencies to your on-call tech by your rules.</li>
<li><strong>Complete:</strong> {{PRICE:seo}}, aimed at the system types and towns where you want more installs.</li>
</ul>
<p>See how we build <a href="/marketing/hvac/contractor-websites">HVAC websites</a> and how <a href="/marketing/hvac/ai-answering-service">AI answering works for HVAC</a>. All packages are on the <a href="/pricing">pricing page</a>. For the wider picture, read the <a href="/guides/contractor-website-cost">contractor website cost guide</a> and <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>. Related: <a href="/guides/plumber-website-cost">plumber website cost</a> and <a href="/guides/electrician-website-cost">electrician website cost</a>.</p>`,
    faq: [
      ["How much does an HVAC website cost?", "About $17 to $49 a month with an AI builder, $150 to $750 for a basic marketplace site, about $2,900 to $9,450 from an experienced freelancer, or about $7,250 to $23,200 from an agency. One-time builds add about $40 to $200 a month for hosting, tools and upkeep."],
      ["Why do HVAC websites cost more than other trade sites?", "They usually need maintenance-plan sign-ups, financing, seasonal offer pages and dispatch hookups. Project Cost Estimator names plan billing and financing as the biggest price drivers."],
      ["Should my HVAC website still mention the federal tax credit?", "Not as a current offer. The IRS says the Energy Efficient Home Improvement Credit covers property placed in service from 2023 through 2025, so update any page promising it on new installs."],
      ["Can I still install R-410A systems in 2026?", "EPA removed the January 1, 2026 installation date in May 2026, so systems made or imported before 2025 can be installed until supply runs out. Check that your website doesn't still say otherwise."],
      ["How often should an HVAC website change?", "At least twice a year, before cooling season and before heating season, so the banner, offers and booking prompts match what people need right now."],
      ["Does an HVAC website need a maintenance plan page?", "Yes, if you sell plans. A page that explains the visits, discounts and priority service, with a sign-up form, sells plans in the slow months."],
    ],
  },
  {
    slug: "electrician-website-cost",
    path: "/guides/electrician-website-cost",
    title: "How Much Does an Electrician Website Cost? (2026)",
    description: "Electrician website cost in 2026, with real ranges for each route and add-on: panel upgrade, EV charger and generator pages, license display and what to skip.",
    h1: "How much does an electrician website cost?",
    lede: "Electricians sell trust before they sell wiring. That changes which pages are worth paying for. Here's what each route costs and where the money should go.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want an electrical site that wins panel and EV jobs?",
    content: `
<div class="callout"><p><strong>Short version:</strong> a DIY or AI builder runs about $17 to $49 a month billed yearly. A marketplace freelancer charges about $150 to $750 for a basic site; a full electrician build from an experienced freelancer is about $2,200 to $8,000, with most small shops landing around $2,800 to $5,500. Agencies quote about $5,800 to $18,850. If you'd rather pay monthly and have it handled, our done-for-you option is {{PRICE:website}}.</p></div>
<h2>The four routes for an electrical contractor</h2>
<table>
<thead><tr><th>Route</th><th>Price</th><th>Honest take</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>About $17 to $49/mo (yearly)</td><td>Fine for a new license holder. You write the panel, EV and generator pages yourself.</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $750 one-time</td><td>Gets you online. Expect a template, few pages and no SEO.</td></tr>
<tr><td>Experienced freelancer</td><td>About $2,200 to $8,000 one-time</td><td>Good work if you have someone to update it afterward.</td></tr>
<tr><td>Agency</td><td>About $5,800 to $18,850 one-time</td><td>Worth it for multi-crew shops with a commercial side.</td></tr>
<tr><td>Done-for-you monthly</td><td>From about $99/mo</td><td>Edits and hosting handled. Ask exactly what "growth" means.</td></tr>
</tbody>
</table>
<p>Checked November 2026: ${WIX()}, ${SQSP()} and ${DURABLE()} pricing; the example Fiverr packages in ${FIVERR_GUIDE()}; ${PCE_ELEC()} and ${PCE_ELEC_BLOG()} for build ranges; ${NICEJOB()} for the $99 managed-site example (plus $199 setup).</p>
<h2>How homeowners hire an electrician</h2>
<p>Electrical work splits into fixes and projects. Fixes are a dead outlet, a breaker that keeps tripping, half the house without power. Those callers want someone today and will call whoever looks available and licensed.</p>
<p>Projects are bigger and slower: a panel upgrade, an EV charger in the garage, a standby generator, rewiring an older home before a sale. Here the homeowner is spending real money on something that can start a fire if it's done wrong. They check your license, read reviews that mention the same kind of job, and often get two or three quotes. Your site is where that checking happens, so it has to answer "are they legit?" in about five seconds.</p>
<h2>Put your license number where people can see it</h2>
<p>In some states it's not optional. ${CSLB()} says Business and Professions Code 7030.5 requires a license number in all forms of advertising for work that needs a contractor's license, and its definition of advertising includes electronic transmission. It also notes that a contractor who advertises electrical work without a C-10 electrical license can be disciplined. Rules differ by state, so check yours, but putting the number in the footer of every page is cheap and builds trust everywhere.</p>
<h2>Pages an electrician site needs, and what they cost to add</h2>
<p>Project Cost Estimator's electrician breakdown prices the trade-specific pieces separately, which makes budgeting easier:</p>
<table>
<thead><tr><th>Page or feature</th><th>Freelancer price</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Panel upgrade page</td><td>$300 to $700 ($700 to $1,600 from an agency)</td><td>A high-ticket job people research before calling</td></tr>
<tr><td>EV charger installation page</td><td>$400 to $900</td><td>Its own search, separate from "electrician near me"</td></tr>
<tr><td>Service-area page, per town</td><td>$150 to $300 ($400 to $700 agency)</td><td>The main way to show up in nearby towns</td></tr>
<tr><td>Emergency call capture (24/7 banner, click-to-call)</td><td>$400 to $900</td><td>Only worth it if you take after-hours calls</td></tr>
<tr><td>Separate commercial section</td><td>$800 to $2,200</td><td>Only if you bid commercial work</td></tr>
<tr><td>Financing widget</td><td>$300 to $1,000</td><td>Helps on panels and generators</td></tr>
</tbody>
</table>
<p>Add a standby generator page and a whole-home surge protection page if you install them. Displaying your license takes an hour or two, so there's no reason to skip it. On a one-time build, plan on about $30 to $150 a month afterward for hosting, tools and upkeep.</p>
<h3>Worked example: a two-truck residential shop</h3>
<p>Say you want a starter build (about $2,200), a panel upgrade page ($300 to $700), an EV charger page ($400 to $900) and pages for five nearby towns ($750 to $1,500 at $150 to $300 each). That's about $3,650 to $5,300 up front, which matches the $2,800 to $5,500 most small shops pay. Skip the commercial section and financing widget for now and you've left out $1,100 to $3,200 you may never need.</p>
<h2>EV charger pages need a 2026 update</h2>
<p>Many electrician sites still promise "30% back on your EV charger." Per ${IRS_30C()}, the home charger credit (30% of the cost, up to $1,000 per item) applies to property placed in service from January 1, 2023 to June 30, 2026. If your EV page still leads with the credit, it's now wrong. Lead with what still matters: charger level, panel capacity, permit and install time. This is the kind of fix a site that nobody maintains never gets.</p>
<h2>What to skip</h2>
<ul>
<li><strong>A smart-home page</strong> unless you actually sell and install that work.</li>
<li><strong>A commercial section</strong> if 95% of your jobs are residential. It costs up to $2,200 and pulls in bid requests you don't want.</li>
<li><strong>Stock photos of glowing light bulbs.</strong> One photo of a clean panel you installed beats ten of them.</li>
<li><strong>A price list for panel upgrades.</strong> Service size, permits and utility work vary too much. Give a range and a fast quote instead.</li>
</ul>
<p>When is the cheap route right? If you're licensed, working mostly as a sub for general contractors, and not looking for homeowner calls yet, a $20-a-month builder page with your license number and a phone button does the job. Once you want panel and EV work from search, the site needs steady monthly effort: new pages, reviews, fixes like the one above. That is what makes the phone ring over the long run.</p>
<h2>What ours includes, by package</h2>
<ul>
<li><strong>Starter:</strong> {{PRICE:website}}. Your license number goes on every page, and you also get review requests, AI review replies, missed-call text-back and NFC review cards.</li>
<li><strong>Growth:</strong> {{PRICE:crm}}. Panel and EV quotes get estimate reminders so they don't go cold, and every website form gets an instant text. The 24/7 AI answering follows your rules: for example, callers who report burning smells or sparks are told to leave the house and call 911, and real emergencies go to your on-call electrician.</li>
<li><strong>Complete:</strong> {{PRICE:seo}}, such as a panel upgrade page for each town you want those jobs in.</li>
</ul>
<p>See our <a href="/marketing/electricians/contractor-websites">websites for electricians</a> and <a href="/marketing/electricians/ai-answering-service">AI answering for electricians</a>, or compare packages on the <a href="/pricing">pricing page</a>. More reading: the <a href="/guides/contractor-website-cost">contractor website cost guide</a>, <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>, and the <a href="/guides/hvac-website-cost">HVAC website cost guide</a>.</p>`,
    faq: [
      ["How much does an electrician website cost?", "About $17 to $49 a month with an AI builder, $150 to $750 for a basic freelancer site, about $2,200 to $8,000 for a full freelancer build, or about $5,800 to $18,850 from an agency. Most small electrical shops land around $2,800 to $5,500 for a one-time build."],
      ["Do electricians have to show their license number on their website?", "In some states, yes. California's contractor board says the license number must appear in all forms of advertising for licensed work, including electronic. Check your state board, and show it either way."],
      ["Is an EV charger page worth it for an electrician?", "Yes, if you install chargers. It ranks for its own searches and costs about $400 to $900 to add on a freelancer build, according to Project Cost Estimator."],
      ["Can I still advertise the EV charger tax credit?", "Not for new installs. The IRS lists the home charger credit for property placed in service from January 1, 2023 to June 30, 2026."],
      ["Should an electrician website have a commercial section?", "Only if you want commercial bids. A separate section adds about $800 to $2,200 to a build, so skip it if your work is almost all residential."],
      ["What does an electrician website cost per month after it's built?", "About $30 to $150 a month for hosting, tools and upkeep on a one-time build. Done-for-you plans fold that into one monthly fee."],
    ],
  },
  {
    slug: "roofing-website-cost",
    path: "/guides/roofing-website-cost",
    title: "How Much Does a Roofing Website Cost? (2026)",
    description: "Roofing website cost in 2026: builders, freelancers, agencies and monthly plans compared, plus galleries, storm and insurance pages, financing and what to skip.",
    h1: "How much does a roofing website cost?",
    lede: "A roof is one of the biggest checks a homeowner writes, so roofing sites have to do more convincing than most. Here's what that costs, route by route.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a roofing site that's ready when the next storm hits?",
    content: `
<div class="callout"><p><strong>Short version:</strong> expect about $17 to $49 a month for an AI website builder on yearly billing, $150 to $750 for a basic marketplace freelancer site, about $2,900 to $8,700 for a full roofing build from an experienced freelancer, and about $7,250 to $21,750 from an agency. Done-for-you monthly plans spread the cost out; ours is {{PRICE:website}}.</p></div>
<h2>Roofing website prices by route</h2>
<table>
<thead><tr><th>Route</th><th>Typical cost</th><th>Build time</th><th>Biggest gap for a roofer</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>About $17 to $49/mo</td><td>A day or two</td><td>Gallery and storm pages are on you to build and keep current</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $750</td><td>About a week</td><td>No town pages, no insurance content, no one after launch</td></tr>
<tr><td>Experienced freelancer</td><td>About $2,900 to $8,700</td><td>About 3 to 9 weeks</td><td>Ongoing pages and reviews aren't in the price</td></tr>
<tr><td>Agency</td><td>About $7,250 to $21,750</td><td>Similar, plus approvals</td><td>Long contracts and add-on fees</td></tr>
<tr><td>Done-for-you monthly</td><td>About $99/mo and up</td><td>Varies</td><td>Check what's included beyond hosting</td></tr>
</tbody>
</table>
<p>Sources checked November 2026: ${WIX()}, ${SQSP()} and ${DURABLE()} for builder plans; ${FIVERR_GUIDE()} for example marketplace packages; ${PCE_ROOF()} for freelancer, agency and timeline figures; ${NICEJOB()} for the $99 managed-site example (with a $199 setup fee). For a second opinion, ${HOOK()} says basic template builds for home service companies start around $3,000 to $5,000.</p>
<h2>How homeowners choose a roofer</h2>
<p>Roofing leads arrive two ways. After a hail or wind storm, a whole neighborhood searches at once: "roof storm damage," "roof inspection," "roofer near me." They want an inspection fast and help with the insurance claim. The rest of the year, buyers are replacing an old roof on their own schedule. They take weeks, collect three bids, look at photos of finished roofs that look like theirs, and read reviews closely.</p>
<p>Both groups have the same fear: picking a roofer who takes the deposit and disappears, or a storm chaser who's gone by spring. Your site's job is to prove you're local, insured and still answering the phone after the work is done.</p>
<h2>Pages a roofing site needs</h2>
<ul>
<li><strong>Roof replacement and roof repair</strong> as separate pages.</li>
<li><strong>A gallery sorted by roof type:</strong> asphalt shingle, metal, tile, flat or low-slope. A homeowner with a metal roof wants to see metal roofs.</li>
<li><strong>A storm damage and insurance claims page</strong> that explains the inspection, the adjuster visit and what you handle.</li>
<li><strong>An inspection request form with photo upload,</strong> so you can triage leaks before you drive out.</li>
<li><strong>Financing,</strong> because few people pay for a roof in cash.</li>
<li><strong>Warranty and manufacturer certifications,</strong> but only ones you really hold.</li>
<li><strong>Town pages</strong> for the areas you actually work in.</li>
<li><strong>Gutters, siding or skylights</strong> if you do them.</li>
</ul>
<h2>Write the storm and insurance page carefully</h2>
<p>"We'll cover your deductible" is a common roofing ad line, and in some states it's illegal. ${TX_DEDUCTIBLE()} reported that Texas made it illegal for contractors to offer to waive a deductible or promise a rebate for it, with fines up to $2,000 and up to six months in jail. ${CO_DEDUCTIBLE()} bars roofing contractors from advertising or promising to pay, waive or rebate a deductible, and from acting as a public adjuster. Other states have their own rules. A cheap site built from a template may copy exactly this kind of claim, so have someone who knows your state review the page.</p>
<h2>Reviews do more selling than design</h2>
<p>Because buyers compare bids, the roofer with more recent, detailed reviews often wins even at a slightly higher price. One of our clients, Presidential Roofing in Utah, went from 27 to 43 Google reviews in 20 days once review requests went out after every job. Show those reviews on the site next to the matching project photos.</p>
<h2>What raises the price of a roofing site</h2>
<ul>
<li><strong>Instant-estimate or roof-measurement tools and financing widgets.</strong> Project Cost Estimator puts financing plus an estimate embed at about $500 to $1,500 extra.</li>
<li><strong>Gallery size,</strong> about $300 to $800 extra for a bigger one.</li>
<li><strong>Depth of insurance-claim content.</strong></li>
<li><strong>Number of town pages.</strong></li>
<li><strong>Running costs:</strong> about $35 to $180 a month on a one-time build, plus $30 to $100 for call tracking and lead tools if you run ads.</li>
</ul>
<p>Put together, a typical freelancer roofing build (about $5,800 with a quote form, gallery and storm page) plus a bigger gallery and a financing-and-estimate embed lands around $6,600 to $8,100 before the first month of hosting. That's a fair price for good work. Just know that it buys launch day, not the new pages and reviews that keep you ahead of the roofer who started posting jobs last spring.</p>
<h2>What to skip</h2>
<ul>
<li><strong>Autoplay drone video</strong> on the home page. It looks great on office Wi-Fi and stalls on a phone outside a damaged house.</li>
<li><strong>A satellite measurement tool</strong> if you only do a few roofs a month. Calling back fast does the same job for free.</li>
<li><strong>Pages for storm towns you don't serve.</strong> They attract calls you'll turn down and look like storm chasing.</li>
<li><strong>Fake urgency</strong> like "only 2 inspection slots left."</li>
</ul>
<p>A budget route makes sense for some roofers: a new company doing mostly repairs for a few builders, or an owner who gets plenty of work from referrals, can live with a $20-a-month builder site for a while. If you want replacement jobs from search, though, remember what a website is for: more customers. That takes SEO and showing up in AI answers, which means new pages and reviews every month, and it pays off over the long run.</p>
<h2>What ours includes, by package</h2>
<ul>
<li><strong>Starter:</strong> {{PRICE:website}}. Review requests (what Presidential Roofing used), AI review replies, missed-call text-back and NFC review cards are included.</li>
<li><strong>Growth:</strong> {{PRICE:ai}}. When a storm hits, the AI picks up several calls at once and books inspections. Bids get estimate reminders, and every website form lead gets an instant text so you're the first roofer to reply.</li>
<li><strong>Complete:</strong> {{PRICE:seo}}, such as metal roofing or storm-repair pages for the towns you want.</li>
</ul>
<p>See how we build <a href="/marketing/roofing/contractor-websites">roofing websites</a> and <a href="/marketing/roofing/ai-answering-service">AI answering for roofers</a>, or check every package on the <a href="/pricing">pricing page</a>. Also useful: the <a href="/guides/contractor-website-cost">contractor website cost guide</a>, <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>, and the <a href="/guides/landscaping-website-cost">landscaping website cost guide</a>.</p>`,
    faq: [
      ["How much does a roofing website cost?", "About $17 to $49 a month with an AI builder, $150 to $750 for a basic marketplace site, about $2,900 to $8,700 from an experienced freelancer, or about $7,250 to $21,750 from an agency."],
      ["What pages should a roofing company website have?", "Replacement, repair, storm damage and insurance claims, a gallery sorted by roof type, financing, an inspection form with photo upload, and a page for each town you serve."],
      ["Can a roofing website say we'll pay your deductible?", "Not everywhere. Texas and Colorado both prohibit contractors from offering to waive or rebate a homeowner's insurance deductible, so check your state's rules before using that line."],
      ["How long does it take to build a roofing website?", "Project Cost Estimator puts a freelancer build at about 3 to 9 weeks, with content and revisions taking longer than the build itself. Builder sites can go live in a day or two."],
      ["Do roofing websites need an instant estimate tool?", "Not always. Financing plus an estimate tool adds about $500 to $1,500 to a build, so it fits high-volume roofers better than small crews who can call back quickly."],
      ["How do I get more reviews on my roofing website?", "Ask every customer right after the job, with a direct link. Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days doing exactly that with us."],
    ],
  },
  {
    slug: "landscaping-website-cost",
    path: "/guides/landscaping-website-cost",
    title: "How Much Does a Landscaping Website Cost? (2026)",
    description: "Landscaping and lawn care website cost in 2026: builder, freelancer, agency and monthly prices, plus recurring sign-up, seasonal pages and before/after photos.",
    h1: "How much does a landscaping website cost?",
    lede: "A lawn care company and a design-build landscaper need different websites, even if they share a truck. Here's what each costs and what belongs on it.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a landscaping site that fills your spring schedule?",
    content: `
<div class="callout"><p><strong>Short version:</strong> AI website builders cost about $17 to $49 a month on yearly plans. A marketplace freelancer charges about $150 to $750 for a basic site, and an experienced freelancer about $2,200 to $8,000 for a full landscaping site. Agencies quote about $5,800 to $18,850. With a done-for-you plan you pay monthly instead; ours is {{PRICE:website}}.</p></div>
<h2>Landscaping website cost, four ways</h2>
<table>
<thead><tr><th>Route</th><th>What it costs</th><th>Works best for</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>About $17 to $49/mo, yearly billing</td><td>A solo mowing route that's mostly full from referrals</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $750 one-time</td><td>Getting a basic page live before spring</td></tr>
<tr><td>Experienced freelancer</td><td>About $2,200 to $8,000 one-time, plus $30 to $150/mo to run</td><td>A design-build firm that needs a strong portfolio</td></tr>
<tr><td>Agency</td><td>About $5,800 to $18,850 one-time</td><td>Multi-crew companies in several cities</td></tr>
<tr><td>Done-for-you monthly</td><td>About $99/mo and up</td><td>Owners who are on a mower, not a laptop, from March to November</td></tr>
</tbody>
</table>
<p>Prices checked November 2026: ${WIX()} (from $17 a month yearly), ${SQSP()} (from $19 a month yearly), ${DURABLE()} ($25 and $49 plans), example Fiverr packages from ${FIVERR_GUIDE()}, build and running costs from ${PCE_LAND()}, and ${NICEJOB()}'s $99-a-month managed site (plus $199 setup).</p>
<h2>Two businesses under one name</h2>
<p>Lawn care and landscaping look alike from the street but sell very differently.</p>
<table>
<thead><tr><th></th><th>Recurring lawn care</th><th>Design-build landscaping</th></tr></thead>
<tbody>
<tr><td>Typical sale</td><td>Weekly or biweekly visits all season</td><td>One project: a patio, planting plan, lighting</td></tr>
<tr><td>How they decide</td><td>Price, reliability, whether you serve their street</td><td>Photos of past work, reviews, a design consult</td></tr>
<tr><td>What the site must do</td><td>Take a sign-up with address and lot size</td><td>Show a portfolio and book a consult</td></tr>
<tr><td>Busiest time online</td><td>Early spring, when people want mowing started</td><td>Late winter and spring planning</td></tr>
</tbody>
</table>
<p>Lawn care searches are also very local. People type "lawn mowing service" plus their suburb, or just "near me," and they rarely want someone from across the metro. A page that names the neighborhoods you already mow, with a photo of a crew on one of those streets, does more than a long list of every city in the county.</p>
<p>If you do both, build both paths into one site rather than two half-sites. The lawn care visitor should reach a sign-up in one tap, and the patio visitor should land in the gallery.</p>
<h2>Pages a landscaping or lawn care site needs</h2>
<ul>
<li><strong>A recurring service sign-up</strong> that asks for address, rough lot size and preferred day. It lets you quote from the office and keeps routes tight.</li>
<li><strong>Seasonal service pages:</strong> spring cleanup, aeration and overseeding, leaf cleanup, and snow removal if you plow in winter.</li>
<li><strong>Fertilization or weed-control programs,</strong> listed as plans with what each visit includes.</li>
<li><strong>Before-and-after galleries</strong> for design-build work, sorted by project type (patios, retaining walls, planting, lighting).</li>
<li><strong>Irrigation start-up, repair and winterization</strong> if you do it. ${EPA_OUTDOOR()} says residential outdoor water use is nearly 8 billion gallons a day, mostly landscape irrigation, and that the average household uses more water outdoors than for showering and laundry combined. Smart controller and drip upgrade pages speak to homeowners watching their water bills.</li>
<li><strong>A service-area map,</strong> kept tight. Lawn care profits come from route density, so say clearly which neighborhoods you cover.</li>
</ul>
<h2>The spring rush is when sites earn their keep</h2>
<p>Most landscaping companies get a year's worth of estimate requests in a few weeks. Every unanswered form in March is a customer who signs with the next company and stays with them all season, maybe for years. That's why the site's job doesn't end at "looks good." Forms need an instant reply, and the seasonal banner should change from "Book spring cleanup" to "Aeration slots open" to "Leaf cleanup" without waiting for a developer.</p>
<h2>What makes a landscaping site cost more</h2>
<ul>
<li><strong>A filterable portfolio:</strong> about $300 to $900 extra, according to Project Cost Estimator.</li>
<li><strong>A recurring-billing flow</strong> for maintenance plans: about $400 to $1,200 extra.</li>
<li><strong>Covering both design-build and maintenance</strong> on one site.</li>
<li><strong>Gallery size and photo prep.</strong></li>
<li><strong>The number of town and neighborhood pages.</strong></li>
</ul>
<h3>Worked example: one company, both kinds of work</h3>
<p>A company that mows 120 lawns and builds a dozen patios a year needs both paths. Starting from Project Cost Estimator's typical landscaping build of about $5,050 (gallery, quote form, service pages), add a filterable portfolio ($300 to $900) and a recurring-billing sign-up ($400 to $1,200). You're at roughly $5,750 to $7,150 up front, plus $30 to $150 a month to run it. A pure lawn care route with no design work can skip the portfolio and often the custom build entirely: a clear sign-up form and seasonal pages do most of the selling.</p>
<h2>What to skip</h2>
<ul>
<li>A plant encyclopedia. Nobody hires a landscaper from a page about hostas.</li>
<li>An online store for mulch or plants, unless you run a yard that sells retail.</li>
<li>Uploading full-size camera photos. A gallery of 8 MB images will crawl on a phone.</li>
<li>Two separate websites for lawn care and landscaping. You split your reviews and rankings in half.</li>
</ul>
<p>The low-cost route is fine for some: a solo operator with a full route and a waiting list doesn't need more leads yet, and a $20-a-month builder page with a phone number and a few photos is plenty. If you want to add crews, though, the site has to bring in new customers, which takes SEO and showing up in AI answers. That's steady monthly work, and it pays off season after season.</p>
<h2>What ours includes, by package</h2>
<ul>
<li><strong>Starter:</strong> {{PRICE:website}}, with seasonal banner changes as part of edits. Review requests, AI review replies, missed-call text-back and NFC review cards come with it.</li>
<li><strong>Growth:</strong> {{PRICE:crm}}. Spring sign-ups get an instant text, estimates get reminders, and past customers hear about aeration or leaf cleanup at the right time of year. The AI answering handles calls while your crews are on mowers.</li>
<li><strong>Complete:</strong> {{PRICE:seo}}, such as a lawn care page for each neighborhood on your route.</li>
</ul>
<p>See our <a href="/marketing/landscaping/contractor-websites">landscaping websites</a> and <a href="/marketing/landscaping/ai-answering-service">AI answering for landscapers</a>, or compare packages on the <a href="/pricing">pricing page</a>. For more detail, read the <a href="/guides/contractor-website-cost">contractor website cost guide</a>, <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>, and the <a href="/guides/roofing-website-cost">roofing website cost guide</a>.</p>`,
    faq: [
      ["How much does a landscaping website cost?", "About $17 to $49 a month with an AI builder, $150 to $750 for a basic marketplace site, about $2,200 to $8,000 from an experienced freelancer, or about $5,800 to $18,850 from an agency."],
      ["How much does a lawn care website cost?", "The same routes apply, but lawn care sites can usually be simpler: a recurring sign-up form, seasonal service pages and a clear service area. A builder or done-for-you plan often fits better than an expensive custom build."],
      ["Should lawn care and landscaping be on one website?", "Usually yes. Two sites split your reviews and rankings. Give each service its own path on one site instead."],
      ["What should a landscaping portfolio include?", "Before-and-after photos sorted by project type, such as patios, walls, planting and lighting, with the town named. Compress the images so the gallery loads fast on a phone."],
      ["Can customers sign up for weekly mowing on my website?", "Yes. A sign-up form that asks for address, lot size and preferred day lets you quote without driving out. Recurring billing flows add about $400 to $1,200 to a freelancer build."],
      ["When should a landscaping website be updated?", "Before each season. Change the banner and offers for spring cleanup, summer maintenance, fall aeration and leaf cleanup, and winter work if you plow."],
    ],
  },
];
