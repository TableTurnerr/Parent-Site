// Website cost guides (added 2026-11-27): the broad "how much does a website cost" query, builder vs freelancer vs agency,
// monthly maintenance, why a contractor site isn't getting calls, and handyman website cost.
// Third-party figures were read on the linked pages on 2026-11-27 (Wix, Squarespace, Durable, Hostinger, WordPress.com,
// NiceJob, Google Workspace, Clutch, WebFX, GoDaddy's maintenance guide, Hook Agency, Domain Name Wire, Let's Encrypt,
// BrightLocal, web.dev, Google Search Console help, USD CPIL) unless the text says otherwise. Speed-to-lead studies are
// the same ones cited in guides10.mjs. Re-check dated figures when updating. TableTurnerr prices are never typed here:
// {{PRICE:<key>}} and {{DEMO}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const WIX = (t = "Wix") => A("https://www.wix.com/blog/how-much-is-a-wix-website", t);
const WIX_AI = (t = "Wix's AI builder page") => A("https://www.wix.com/ai-website-builder", t);
const SQSP = (t = "Squarespace") => A("https://www.squarespace.com/pricing", t);
const DURABLE = (t = "Durable") => A("https://durable.com/pricing", t);
const DURABLE_HOME = (t = "Durable's homepage") => A("https://durable.com/", t);
const HOSTINGER = (t = "Hostinger") => A("https://www.hostinger.com/website-builder", t);
const WPCOM = (t = "WordPress.com") => A("https://wordpress.com/pricing/", t);
const NICEJOB = (t = "NiceJob Sites") => A("https://get.nicejob.com/pricing", t);
const GWS = (t = "Google Workspace") => A("https://workspace.google.com/pricing", t);
const CLUTCH = (t = "Clutch") => A("https://clutch.co/web-designers/pricing", t);
const WEBFX_MAINT = (t = "WebFX's maintenance pricing guide") => A("https://www.webfx.com/web-development/pricing/website-maintenance", t);
const GD_MAINT = (t = "GoDaddy's 2026 maintenance cost guide") => A("https://www.godaddy.com/resources/skills/website-maintenance-cost", t);
const HOOK = (t = "Hook Agency") => A("https://hookagency.com/blog/digital-marketing-costs-for-home-service-businesses-in-2026/", t);
const FIVERR_ROUNDUP = (t = "a 2026 roundup of Fiverr web developer pricing") => A("https://hirebestfreelance.com/fiverr-web-developers-pricing/", t);
const DNW = (t = "Domain Name Wire") => A("https://domainnamewire.com/2026/04/23/breaking-verisign-raising-wholesale-com-prices/", t);
const LE = (t = "Let's Encrypt") => A("https://letsencrypt.org/", t);
const BRIGHTLOCAL_AI = (t = "BrightLocal's 2026 study of 1.9 million AI citations") => A("https://www.brightlocal.com/research/local-ai-visibility-study/", t);
const VITALS = (t = "Google's web.dev guidance") => A("https://web.dev/articles/vitals", t);
const PSI = (t = "PageSpeed Insights") => A("https://pagespeed.web.dev/", t);
const GSC = (t = "Search Console's Performance report") => A("https://support.google.com/webmasters/answer/7576553?hl=en", t);
const GBP_PERF = (t = "Business Profile performance report") => A("https://support.google.com/business/answer/9918094?hl=en", t);
const HBR = (t = "Harvard Business Review") => A("https://hbr.org/2011/03/the-short-life-of-online-sales-leads", t);
const HBR_SUMMARY = (t = "SmartCompany's summary") => A("https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/", t);
const LRM = (t = "Lead Response Management summary") => A("https://mit.icagency.com/", t);
const CPIL = (t = "the University of San Diego's Center for Public Interest Law") => A("https://sites.sandiego.edu/cpil-blog/2024/10/09/governor-signs-bill-increasing-minor-work-exemption-for-unlicensed-contracting-from-500-to-1000/", t);

export const guides12 = [
  {
    slug: "how-much-does-a-website-cost",
    path: "/guides/how-much-does-a-website-cost",
    title: "How Much Does a Website Cost in 2026? (Real Prices)",
    description: "Real 2026 website prices: AI builders, freelancers, agencies and done-for-you monthly plans compared, plus the hidden costs and what a site is actually for.",
    h1: "How much does a website cost in 2026?",
    lede: "There are four common ways to get a business website, and the prices run from a few dollars a month to tens of thousands up front. Here are real numbers for each, checked in November 2026, and how to tell which one fits a local service business.",
    eyebrow: "Website costs", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want a website that brings in customers?",
    content: `
<div class="callout"><p><strong>Short version:</strong> an AI or DIY builder plan costs about $12 to $50 a month. A basic freelancer site from a marketplace is usually a few hundred dollars one time, and an agency build is a few thousand dollars and up. Done-for-you monthly plans that include hosting and edits started around $99 a month in our checks. The cheapest site isn't the best deal if nobody finds it, so price the work that brings customers, not just the pages.</p></div>
<h2>The four ways to get a website, with real prices</h2>
<p>All prices below were read on the source pages in November 2026. Vendors change prices often, so check before you buy.</p>
<table>
<thead><tr><th>Route</th><th>What it costs</th><th>Where the number comes from</th></tr></thead>
<tbody>
<tr><td>AI or DIY builder</td><td>About $12 to $49 a month for small-business plans</td><td>${SQSP()}: $12 to $25 a month paid yearly, or $19 to $36 month to month. ${WIX()}: $17 (Light), $29 (Core) and $39 (Business) a month paid yearly. ${DURABLE()}: $25 and $49 a month. ${HOSTINGER()}: $1.99 a month if you prepay 48 months, renewing at $10.99.</td></tr>
<tr><td>Freelancer, one-time build</td><td>About $150 to $500 for a basic site on a marketplace. Established freelancers charge much more.</td><td>${FIVERR_ROUNDUP()} put simple 1 to 5 page brochure sites at $50 to $300, with top-rated sellers charging 2 to 5 times more.</td></tr>
<tr><td>Web agency, one-time build</td><td>Usually $3,000 and up for a small business</td><td>${CLUTCH()} says agencies typically charge $2,000 to $100,000, and most projects reviewed on its site cost under $10,000. ${HOOK()} says basic template builds for home-service companies start around $3,000 to $5,000.</td></tr>
<tr><td>Done-for-you monthly</td><td>About $99 to several hundred dollars a month</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:planStarter}}, with marketing work included.</td></tr>
</tbody>
</table>
<p>Running a contracting business with several services and towns? Our <a href="/guides/contractor-website-cost">contractor website cost guide</a> covers trade-specific build prices for plumbing and HVAC sites.</p>
<h2>Side by side: what you get for the money</h2>
<table>
<thead><tr><th></th><th>AI/DIY builder</th><th>Marketplace freelancer</th><th>Agency</th><th>Done-for-you monthly</th></tr></thead>
<tbody>
<tr><td>Upfront</td><td>$0</td><td>About $150 to $500</td><td>Usually $3,000+</td><td>$0 to a setup fee</td></tr>
<tr><td>Monthly</td><td>About $12 to $49 plus extras</td><td>Hosting and edits extra</td><td>Hosting and a care plan extra</td><td>One fee, hosting and edits in</td></tr>
<tr><td>Who maintains it</td><td>You</td><td>You, or pay per change</td><td>Them, if you pay a plan</td><td>Them</td></tr>
<tr><td>SEO and AEO (showing up in AI answers)</td><td>Basic settings. Strategy is up to you.</td><td>Rarely included, often an upsell</td><td>Sometimes, at extra cost</td><td>Depends on the plan. Ask what's done each month.</td></tr>
<tr><td>Lead follow-up</td><td>Form emails you. Some builders add a basic CRM.</td><td>Form emails you</td><td>Usually just the form</td><td>Varies. Some text every lead back.</td></tr>
<tr><td>Best for</td><td>Brand-new or tiny budget, and you have time</td><td>A simple brochure site, mostly referral work</td><td>Larger companies with a custom brief</td><td>Owners who want the site to bring work without doing it themselves</td></tr>
</tbody>
</table>
<h2>The costs nobody puts in the quote</h2>
<ul>
<li><strong>Domain.</strong> The registry's wholesale price for a .com rose to $10.97 a year on November 1, 2026, according to ${DNW()}, so no retailer can sell it for less over time. Builders often give a free first year, then renew at their own rate. ${SQSP()} says this on its own pricing page.</li>
<li><strong>Intro pricing.</strong> Hostinger's $1.99 a month means paying $95.52 up front for four years, and the renewal is $10.99 a month. Read the renewal line, not the headline.</li>
<li><strong>Email at your domain.</strong> ${GWS()} Business Starter was $7 per user per month on an annual plan. Three people is $21 a month that never shows up in a website quote.</li>
<li><strong>Edits.</strong> A freelancer who built your site for $300 may charge for every change after launch. New photos, a price change and a holiday banner add up.</li>
<li><strong>Apps and plugins.</strong> Booking widgets, review displays, chat and forms with file upload are often paid add-ons on builders and WordPress.</li>
<li><strong>SSL.</strong> A basic security certificate should cost nothing. ${LE()} issues them free, so don't pay extra for the standard one.</li>
</ul>
<p>For the full monthly picture, see <a href="/guides/website-maintenance-cost">how much website maintenance costs</a>.</p>
<h2>Three-year math for a small service business</h2>
<p>Example numbers, not quotes. Your own will differ, but this shows how the routes compare over time.</p>
<table>
<thead><tr><th>Route</th><th>Year one</th><th>Over three years</th><th>Hidden cost</th></tr></thead>
<tbody>
<tr><td>Wix Core ($29) + one Google Workspace seat ($7)</td><td>About $430</td><td>About $1,300, plus domain renewals</td><td>Your evenings writing, updating and fixing it</td></tr>
<tr><td>$400 freelancer site + $25/mo hosting + 4 paid edits a year at $50</td><td>About $900</td><td>About $1,900</td><td>No one owns the results</td></tr>
<tr><td>$5,000 agency build + $100/mo care plan</td><td>About $6,200</td><td>About $8,600</td><td>A redesign every few years</td></tr>
</tbody>
</table>
<p>A done-for-you monthly plan usually costs more over three years than a builder. That only makes sense if it brings in more jobs than the builder would, which is the real question.</p>
<h2>A website has one job: getting you customers</h2>
<p>A site that looks good but doesn't show up when someone searches "water heater repair near me" is a business card nobody picks up. To bring in customers, a local service site needs three things.</p>
<ol>
<li><strong>Getting found.</strong> A page for each service and the main towns you work in, linked from your Google Business Profile. That's local SEO, and it's built a page at a time. Read <a href="/guides/contractor-seo-cost">what contractor SEO costs</a>.</li>
<li><strong>Getting cited by AI.</strong> ChatGPT, Google AI Mode and AI Overviews pull from business websites. ${BRIGHTLOCAL_AI()} found 42% of the citations in local AI answers came from business sites. That's AEO, and it rewards clear, specific pages. See <a href="/guides/how-to-get-recommended-by-chatgpt">how to get recommended by ChatGPT</a>.</li>
<li><strong>Turning visitors into booked jobs.</strong> A tap-to-call button, real reviews and a quote form that gets an answer in minutes, not tomorrow.</li>
</ol>
<p>None of that is a one-time build. Rankings come from months of steady pages, photos and reviews, and they compound. That's why the build price is the smaller part of the decision.</p>
<h2>When the cheap option is the right one</h2>
<p>Be honest about where you are. A $12 to $49 builder plan or a $300 freelancer site is a fine choice if:</p>
<ul>
<li>You're brand new and need something live this week so customers can check you're real.</li>
<li>Nearly all your work comes from referrals and repeat customers, and you're booked solid.</li>
<li>You enjoy this kind of work and have a few hours a month to keep it current.</li>
</ul>
<p>Upgrade when you want new customers from search, when you add services or towns, or when the site has sat untouched for a year.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/contractor-websites">website service</a> costs {{PRICE:website}}. That package also includes review requests, AI review replies and missed-call text-back. If you want every form lead texted back instantly and followed up, that's the CRM in our Growth package, which costs {{PRICE:crm}}. New service-and-town pages each month and AI search work are in our Complete package. All plans are on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does a website cost for a small business?", "In November 2026, builder plans cost about $12 to $49 a month, basic marketplace freelancer sites a few hundred dollars, and agency builds usually $3,000 and up. Done-for-you monthly plans started around $99 a month."],
      ["Is an AI website builder good enough?", "For a brand-new or referral-only business, often yes. It gets you a decent-looking site fast. You still have to write service pages, add real photos, keep it updated and follow up on leads yourself."],
      ["Why do agencies charge so much more than freelancers?", "Agencies usually include planning, copywriting, custom design and project management. Clutch reports US agencies commonly charge $100 to $149 an hour. Whether it's worth it depends on what the site has to do."],
      ["What are the hidden costs of a website?", "Domain renewals, email at your domain, paid apps and plugins, edits after launch and renewal prices that are higher than the intro rate. A basic SSL certificate should be free."],
      ["Should I pay monthly or one time for a website?", "One time is cheaper if you'll maintain it yourself and don't need it to bring new customers. Monthly makes sense when someone else keeps it updated and adds pages that help you rank."],
      ["Do I own my website if I pay monthly?", "It depends on the company, so ask before you sign. At minimum you should own your domain. With us: if you cancel, you can buy your website for a one-time fee. Our CRM, backend and automations stay with us."],
    ],
  },

  {
    slug: "ai-website-builder-vs-freelancer-vs-agency",
    path: "/guides/ai-website-builder-vs-freelancer-vs-agency",
    title: "AI Website Builder vs Freelancer vs Agency: Which to Pick",
    description: "AI website builder, $150-$500 freelancer, agency or done-for-you monthly: what each really delivers, what you still have to do, and which fits your stage.",
    h1: "AI website builder vs freelancer vs agency: which should you pick?",
    lede: "Each option solves a different problem. An AI builder solves \"I need a site today.\" A cheap freelancer solves \"I don't want to build it myself.\" An agency solves \"I need it done properly.\" Here's what each one hands you, and the work that's still left on your plate.",
    eyebrow: "Website costs", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Skip the build. Get the customers.",
    content: `
<div class="callout"><p><strong>Short version:</strong> pick an AI builder if you're brand new, the budget is tight and you have time. Pick a $150 to $500 freelancer if you want a simple site built once and mostly get work by referral. Pick an agency for a big custom project. Pick a done-for-you monthly service if you want the site to keep bringing in work while you run jobs. Cheap is the right answer more often than agencies admit.</p></div>
<h2>What an AI website builder really gives you</h2>
<p>You describe your business and the builder writes a first draft. ${WIX_AI()} says it creates a site structure with pages, layout and copy from a plain-language description. ${DURABLE_HOME()} says you can get online in 30 seconds. In practice you get a homepage, an about page, a contact page and a services section, filled with tidy but generic text and stock or AI images.</p>
<p>That's a real head start. Here's what's still on you:</p>
<ul>
<li><strong>Real photos.</strong> Swap the stock images for your trucks, crew and finished jobs. Homeowners can tell.</li>
<li><strong>One page per service.</strong> The builder lumps services together. If you want calls for "furnace repair," you need a page about furnace repair.</li>
<li><strong>Your towns.</strong> It won't plan which service-area pages to write, or write them well.</li>
<li><strong>Accuracy.</strong> AI copy can claim things you don't do, like 24/7 service or a warranty you don't offer. Read every line.</li>
<li><strong>Updates.</strong> Prices, seasonal offers, new photos and hours are your job, forever.</li>
</ul>
<p>Some builders now bundle more than pages. Durable's paid plans list a built-in CRM, online booking and automatic lead capture and replies, at $25 and $49 a month when we checked. Those help, but you still set them up and work the leads.</p>
<h3>A one-hour test before you commit</h3>
<p>Most builders offer a free tier or trial, so you can find out if this route suits you before you pay.</p>
<ol>
<li>Generate a site and read every sentence out loud. Mark anything that isn't true about your business.</li>
<li>Try to add a separate page for your best-paying service. Time how long it takes to write something you'd be proud of.</li>
<li>Upload five real job photos and check how they look on your phone.</li>
<li>Submit the contact form and see where the message lands, and how quickly you'd notice it on a busy day.</li>
</ol>
<p>If that hour felt easy, a builder may be all you need for now. If it felt like a chore you'll never repeat, the site will go stale, and you should budget for help.</p>
<h2>The $150 to $500 freelancer site</h2>
<p>Marketplace prices for small sites are low. ${FIVERR_ROUNDUP()} listed simple 1 to 5 page brochure sites at $50 to $300, and said buyers usually supply the text, images and logo themselves.</p>
<p><strong>What you usually get:</strong> a theme set up on WordPress or a builder, your logo and colors, three to five pages, a contact form and a round or two of revisions. It can look sharp.</p>
<p><strong>What you usually don't get:</strong></p>
<ul>
<li>Written copy. You send the words, so you're still the writer.</li>
<li>SEO beyond a few settings. The same roundup lists SEO as a common upsell.</li>
<li>Hosting, unless agreed. Premium plugins and themes may be passed on to you.</li>
<li>Edits after delivery. Each change becomes a new order.</li>
<li>A speed test on a phone. Heavy themes and big images can make a nice-looking site slow.</li>
<li>Your logins. Make sure the domain, hosting and site admin are in your name before you pay the final amount.</li>
</ul>
<h2>What an agency adds</h2>
<p>Agencies plan the site around your services and towns, write the copy, design it custom or semi-custom, and move your old site without losing rankings. ${CLUTCH()} reports most agencies it lists charge $100 to $149 an hour in the US, and that agencies working on builders like Wix or Squarespace often charge $25 to $49 an hour. ${HOOK()} puts basic template builds for home-service companies at $3,000 to $5,000 to start.</p>
<p>The catch is what happens after launch. Many agency quotes are for the build only. Ask what the monthly care plan includes, who adds new pages, whether there's a contract term, and what you keep if you leave.</p>
<h2>Done-for-you monthly</h2>
<p>Instead of a big bill, you pay monthly and someone else builds the site, hosts it and keeps it current. The better versions treat the site as one part of getting customers: Google Business Profile, reviews, new pages over time and fast replies to leads. Prices vary a lot. ${NICEJOB()} was $99 a month plus $199 setup. Ours starts at {{PRICE:planStarter}} and includes more than the website. Ask exactly what gets done each month, in writing.</p>
<h2>Which to pick, by situation</h2>
<table>
<thead><tr><th>Your situation</th><th>Best fit</th><th>Why</th><th>Watch for</th></tr></thead>
<tbody>
<tr><td>Brand-new, one truck, tight budget</td><td>AI builder</td><td>Live this week for about $12 to $49 a month. Enough to prove you're real.</td><td>Generic copy and claims you don't offer</td></tr>
<tr><td>Referral-only and booked out</td><td>Builder or a $150 to $500 freelancer site</td><td>You need a place to send people, not a lead machine</td><td>Owning the domain and logins</td></tr>
<tr><td>Growing and want new customers from Google</td><td>Done-for-you monthly with SEO, or an agency plus a care plan</td><td>Ranking needs new pages, photos and reviews every month</td><td>"SEO included" with no list of what's done</td></tr>
<tr><td>Multiple trucks, several services and towns</td><td>Agency or a done-for-you plan with lead follow-up</td><td>More pages, more leads, and slow replies cost more</td><td>Long contracts and sites you can't take with you</td></tr>
</tbody>
</table>
<h2>Ask these before you pay anyone</h2>
<ol>
<li><strong>Who owns the domain and the site if we part ways?</strong> Get it in writing.</li>
<li><strong>What happens to a form lead?</strong> An email you read tonight, or a text to the customer in a minute?</li>
<li><strong>Who adds a new service page, and what does it cost?</strong></li>
<li><strong>How fast does it load on a phone?</strong> Ask for a ${PSI()} score on mobile.</li>
<li><strong>What gets done each month after launch?</strong> If the answer is "hosting," it's not marketing.</li>
</ol>
<p>For the price side of this decision, read <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>. Contractors with several services and towns should also see the <a href="/guides/contractor-website-cost">contractor website cost guide</a>.</p>
<h2>Where we fit</h2>
<p>Our <a href="/services/contractor-websites">contractor websites</a> are built and kept up for you. It costs {{PRICE:website}}. Instant texts to form leads and follow-ups come with the <a href="/services/crm-automation">CRM</a> in our Growth package, and monthly service-and-town pages with <a href="/services/local-seo">local SEO</a> in our Complete package. If a builder fits you better today, use one. Come back when you want the phone to ring more.</p>`,
    faq: [
      ["Are AI website builders good for small businesses?", "They're good for getting online fast and cheap. They write a first draft but don't plan service and town pages, gather real photos or follow up on leads for you."],
      ["What do you get from a $300 website on Fiverr?", "Usually a theme set up with your logo, a few pages and a contact form, with you supplying the text and images. SEO, hosting and later edits are often extra."],
      ["Is a freelancer or an agency better for a website?", "A freelancer is cheaper and fine for a simple site. An agency costs more and usually adds planning, copywriting and project management. Either way, own your domain and logins."],
      ["When is a cheap website the right choice?", "When you're brand new, mostly work by referral or are already booked out. Upgrade when you want new customers from search."],
      ["Can I switch from a website builder later?", "Yes, but you usually can't lift a builder site and move it elsewhere as-is. Plan on rebuilding, keep your domain, and redirect old page addresses so you keep any rankings."],
      ["What should a monthly website plan include?", "Hosting, edits, security and backups at a minimum. If it's meant to bring customers, it should also add pages over time and connect form leads to fast follow-up."],
    ],
  },

  {
    slug: "website-maintenance-cost",
    path: "/guides/website-maintenance-cost",
    title: "How Much Does Website Maintenance Cost per Month?",
    description: "Website maintenance costs per month in 2026: hosting, domain, SSL, updates, edits, backups and SEO, plus DIY vs freelancer vs agency vs all-in plans.",
    h1: "How much does website maintenance cost per month?",
    lede: "Building a site is a one-time bill. Keeping it working, current and findable is the bill that never stops. Here's what each line item costs, four ways to handle it, and what maintenance should mean for a contractor.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Hand off the upkeep.",
    content: `
<div class="callout"><p><strong>Short version:</strong> doing it yourself costs roughly $15 to $60 a month in hosting, domain and email, plus your time. Paying someone runs about $50 to $500 a month for a small business site, according to GoDaddy's 2026 guide, or by the hour for one-off fixes. For a contractor, real maintenance means fresh photos, seasonal updates and new service pages, not just software updates.</p></div>
<h2>What you're paying for, line by line</h2>
<table>
<thead><tr><th>Item</th><th>Typical cost</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Domain</td><td>About $11 to $25 a year for a .com</td><td>Wholesale .com rose to $10.97 a year in November 2026 (${DNW()}). Retail is higher.</td></tr>
<tr><td>Hosting or builder plan</td><td>About $11 to $49 a month</td><td>${WIX()} Light to Business: $17 to $39 paid yearly. ${WPCOM()} Business: $25 paid yearly or $40 monthly. ${HOSTINGER()} renews at $10.99.</td></tr>
<tr><td>SSL certificate</td><td>Usually $0</td><td>${LE()} issues standard certificates free.</td></tr>
<tr><td>Business email</td><td>$7 per user a month</td><td>${GWS()} Business Starter on an annual plan.</td></tr>
<tr><td>Backups and security</td><td>Often included in hosting or a care plan</td><td>Ask how often backups run and how fast a restore happens.</td></tr>
<tr><td>Software and plugin updates</td><td>$0 on builders. Time or a care plan on WordPress.</td><td>Skipped updates are how many small sites get hacked.</td></tr>
<tr><td>Edits and new content</td><td>$50 to $150+ an hour</td><td>Developer rates from ${GD_MAINT()}.</td></tr>
<tr><td>SEO and new pages</td><td>Separate, often several hundred a month</td><td>See <a href="/guides/contractor-seo-cost">contractor SEO cost</a>.</td></tr>
</tbody>
</table>
<p>A quick DIY example: a $29 Wix Core plan, one $7 email seat and about $2 a month for the domain is roughly $38 a month before your time.</p>
<h2>Four ways to handle maintenance</h2>
<table>
<thead><tr><th>Approach</th><th>Monthly cost</th><th>What you get</th><th>Who it suits</th></tr></thead>
<tbody>
<tr><td>DIY</td><td>About $15 to $60 in tools</td><td>Exactly what you do yourself</td><td>Owners with a builder site and an hour a week</td></tr>
<tr><td>Freelancer, hourly or retainer</td><td>$50 to $150+ an hour, or a retainer from about $100 a month</td><td>Fixes and edits when you ask</td><td>A WordPress site that needs a pro now and then</td></tr>
<tr><td>Agency care plan</td><td>From a few hundred a month. ${WEBFX_MAINT("WebFX")} listed its WordPress plan at $350 a month plus $150 an hour for extra work.</td><td>Updates, backups, security, some edit time</td><td>Larger sites, or a site the agency built</td></tr>
<tr><td>All-in monthly (site included)</td><td>About $99 to several hundred a month</td><td>Hosting, edits and, on better plans, marketing work</td><td>Owners who don't want to think about the site</td></tr>
</tbody>
</table>
<p>Ranges are from ${GD_MAINT()} (small to medium business sites $50 to $500 a month; retainers $100 to $1,500+) and ${WEBFX_MAINT()}, which lists $35 to $100 a month for a small business site. Both checked November 2026.</p>
<h2>What maintenance should include for a contractor</h2>
<p>Software updates keep the lights on. These are the jobs that keep a home-service site earning:</p>
<ul>
<li><strong>Seasonal banners and offers.</strong> AC tune-ups in spring, furnace checks in fall, gutter cleaning after leaf drop, storm repair after hail. A stale "summer special" in December tells visitors nobody's minding the store.</li>
<li><strong>New job photos.</strong> A few real before-and-after shots a month. They prove you're active and give Google and AI tools something new to read.</li>
<li><strong>New service pages.</strong> Started doing tankless water heaters or EV chargers? It needs its own page, or you won't get those calls.</li>
<li><strong>New town pages.</strong> When you start taking work in the next suburb over, add a page that says so, with jobs you've done there.</li>
<li><strong>Review widgets.</strong> Show recent Google reviews, and make sure the feed hasn't quietly broken.</li>
<li><strong>Phone, hours and holiday closures.</strong> They should match your Google Business Profile exactly.</li>
<li><strong>Form tests.</strong> Submit your own quote form once a month. Broken forms fail silently.</li>
</ul>
<h2>A simple maintenance calendar</h2>
<table>
<thead><tr><th>How often</th><th>Task</th></tr></thead>
<tbody>
<tr><td>Weekly</td><td>Check that new reviews show. Add any great job photos.</td></tr>
<tr><td>Monthly</td><td>Test the form and call button on your phone. Update the offer or banner. Apply updates if you're on WordPress.</td></tr>
<tr><td>Quarterly</td><td>Run ${PSI()} on mobile. Add a service or town page. Check ${GSC()} for searches you show up for but rarely get clicked.</td></tr>
<tr><td>Yearly</td><td>Renew the domain on auto-pay. Check that you still own every login. Review prices and services listed.</td></tr>
</tbody>
</table>
<h2>What skipping maintenance really costs</h2>
<p>Maintenance feels optional until something breaks. These are the failures that hit small contractor sites most, and none of them announce themselves:</p>
<ul>
<li><strong>An expired domain.</strong> The card on file expires, the renewal fails, and the site and your email go dark. Someone else can register the name once it lapses.</li>
<li><strong>A broken quote form.</strong> A plugin update or an expired connection stops forms from sending. You notice weeks later, when you wonder why leads dried up.</li>
<li><strong>A hacked WordPress site.</strong> Out-of-date plugins are a common way in. Cleanup work is billed by the hour, and Google may warn visitors away in the meantime.</li>
<li><strong>Old information.</strong> A disconnected phone number, last year's prices or a service you stopped offering costs you calls and trust.</li>
</ul>
<h2>Example: a monthly budget for a three-truck HVAC company</h2>
<p>Example numbers built from the prices above, not a quote. Say the company runs a WordPress site, has four email users and pays a freelancer for small jobs.</p>
<ul>
<li>Hosting: $25 a month (WordPress.com Business, paid yearly)</li>
<li>Email: 4 seats at $7, or $28 a month</li>
<li>Domain: about $2 a month</li>
<li>Freelancer edits: 1 hour a month at $75, for the seasonal banner and new photos</li>
</ul>
<p>That's about $130 a month to keep things running. It still doesn't include anyone writing new service or town pages, which is the work that brings in new customers. Add that and you're into SEO pricing.</p>
<h2>Red flags in a maintenance plan</h2>
<ul>
<li><strong>No list of what's included.</strong> "Ongoing support" can mean anything.</li>
<li><strong>Edits capped at a tiny number of minutes</strong> with high overage rates.</li>
<li><strong>The vendor owns your domain.</strong> If they hold it, they hold your rankings.</li>
<li><strong>No backup restore promise.</strong> Ask how long a restore takes, and whether it costs extra.</li>
<li><strong>A long contract</strong> for what's really just hosting.</li>
</ul>
<h2>What ours includes</h2>
<p>With our <a href="/services/contractor-websites">contractor websites</a>, hosting, security and edits are included. It costs {{PRICE:website}}. Our Complete package adds 4 new service-and-town pages a month plus AI search work, and costs {{PRICE:seo}}. Comparing up-front costs instead? Read <a href="/guides/how-much-does-a-website-cost">how much a website costs</a> or <a href="/guides/ai-website-builder-vs-freelancer-vs-agency">builder vs freelancer vs agency</a>.</p>`,
    faq: [
      ["How much does website maintenance cost per month?", "Doing it yourself costs roughly $15 to $60 a month in tools. Paying someone typically runs $50 to $500 a month for a small business site, per GoDaddy's 2026 guide."],
      ["What does website maintenance include?", "Hosting, domain renewal, security certificate, software updates, backups and small edits. For a contractor it should also cover new photos, seasonal updates and new service pages."],
      ["How much do web developers charge per hour for updates?", "GoDaddy's 2026 guide puts developer rates at $50 to $150 or more an hour. WebFX listed $150 an hour for extra work beyond its plans."],
      ["Do I need to pay for an SSL certificate?", "Usually not. Let's Encrypt issues standard certificates free, and most hosts and builders install one for you."],
      ["Is maintenance cheaper on Wix or Squarespace than WordPress?", "Usually, because the builder handles software updates and security. You still have to keep the content current yourself."],
      ["How often should a contractor update their website?", "Small updates monthly, like photos, offers and review checks. Add a new service or town page at least every quarter."],
    ],
  },

  {
    slug: "why-your-website-isnt-getting-leads",
    path: "/guides/why-your-website-isnt-getting-leads",
    title: "Why Your Contractor Website Isn't Getting Calls (and Fixes)",
    description: "Contractor website not getting calls? A free checklist: ranking, speed, click-to-call, reviews, form follow-up and tracking, with the tool to check each one.",
    h1: "Why your contractor website isn't getting calls, and how to fix it",
    lede: "A quiet website usually has one of three problems: people can't find it, they find it and leave, or they reach out and nobody answers fast enough. You can check all three in an afternoon with free tools.",
    eyebrow: "Website fixes", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want us to find the leak for you?",
    content: `
<div class="callout"><p><strong>Short version:</strong> most contractor sites that don't get calls fail in one of three places. They don't show up for "[service] near me," they're slow or hard to use on a phone, or form leads wait hours for a reply. Check each with free tools: an incognito Google search, PageSpeed Insights and Search Console. Then fix the biggest leak first.</p></div>
<h2>Problem 1: people can't find you</h2>
<p><strong>How to check.</strong> Open an incognito window on your phone and search the way a customer would: "drain cleaning near me," "AC repair [your town]," "roof leak repair [your town]." Note whether your site or your Google Business Profile shows up, and where. Then open ${GSC()} (free). It shows which searches you appeared for, how often and how often people clicked.</p>
<p><strong>Common causes:</strong></p>
<ul>
<li><strong>No service pages.</strong> One "Services" page listing ten things won't rank for any of them. Each service you want calls for needs its own page.</li>
<li><strong>No town pages.</strong> If you serve six towns but only mention one, you're invisible in the other five.</li>
<li><strong>A thin link from your Google Business Profile.</strong> Your profile's website link should go to a page that matches your main service and area, and your name, phone and address should match the site exactly.</li>
<li><strong>Too few reviews.</strong> Map rankings lean heavily on reviews. See <a href="/guides/how-many-google-reviews-to-rank">how many reviews it takes to rank</a>.</li>
</ul>
<p><strong>Fix:</strong> write one solid page per service and per main town, with real photos and jobs from that area. Our free <a href="/free-google-maps-audit">Google Maps audit</a> shows where you rank across your area.</p>
<h2>Problem 2: they find you, then leave</h2>
<p><strong>How to check.</strong> Paste your homepage into ${PSI()} and look at the mobile score. ${VITALS()} says the main content should load within 2.5 seconds, and the page should respond to a tap within 200 milliseconds. Then pull up your site on your own phone, on cell data, standing in a driveway.</p>
<p><strong>Common causes:</strong> huge photos straight off a phone camera, a slow theme with too many plugins, pop-ups that cover the screen, and text you have to pinch to read.</p>
<p><strong>Fix:</strong> compress images, remove plugins you don't use, drop the pop-up, and use a clean layout with large buttons. On a builder, a simpler template often fixes most of it.</p>
<h2>Problem 3: calling you is harder than it should be</h2>
<p><strong>How to check.</strong> Open your site on a phone. Can you call in one tap without scrolling? Is the number in the header, and does tapping it dial?</p>
<ul>
<li><strong>No click-to-call.</strong> A phone number that's just text, or an image of a number, makes people copy it by hand. Many won't.</li>
<li><strong>A buried phone number.</strong> Only on the Contact page, or in the footer. Put it at the top of every page, plus a sticky call button on mobile.</li>
<li><strong>Office hours that scare people off.</strong> If you take emergency calls, say so near the number.</li>
</ul>
<h2>Problem 4: nothing tells them you're good</h2>
<p><strong>How to check.</strong> Look at your homepage as a stranger. Within five seconds, can you see real reviews, real job photos and how long you've been in business?</p>
<p><strong>Fix:</strong> show recent Google reviews with names and towns, swap stock photos for your own crew and jobs, and list your license number if your trade requires one. A site full of smiling stock models reads as "we just started" or worse. Getting more reviews in the first place is covered in <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</p>
<h2>Problem 5: form leads go cold</h2>
<p><strong>How to check.</strong> Fill out your own quote form at 7 p.m. on a weekday. Time how long until you hear back, and from whom.</p>
<p>This is where many sites quietly lose the most money. The research on response time is old and not specific to home services, but it points one way. In ${HBR()}'s 2011 audit of 2,241 US companies, firms that responded to a web lead within an hour were nearly 7 times as likely to have a meaningful conversation with a decision maker as those that waited longer (figures as reported in ${HBR_SUMMARY()}). Dr. James Oldroyd's lead response research found calling within 5 minutes instead of 30 raised contact odds about 100 times, per the widely shared ${LRM()}.</p>
<p><strong>Common causes:</strong> forms with ten fields, forms that email an inbox nobody checks till lunch, and no reply at all after hours.</p>
<p><strong>Fix:</strong> cut the form to name, phone, address and "what's going on." Send every lead an instant text from your business number, such as "Thanks, this is Maria at Ridgeline Roofing. Got your request about the leak. Can you send a photo? We'll call within the hour." Then follow up by call or text if they don't reply. For the full playbook, read <a href="/guides/speed-to-lead-home-services">speed to lead for home services</a>.</p>
<h2>Problem 6: you can't tell what's working</h2>
<p><strong>How to check.</strong> Can you say how many calls and forms the site brought last month? If not, you're guessing.</p>
<p><strong>Fix:</strong> turn on Search Console, check your ${GBP_PERF()} for calls and website clicks, and use a tracking number or a "how did you hear about us" question. Our guide to <a href="/guides/how-to-track-lead-sources">tracking lead sources</a> walks through it.</p>
<h2>The checklist</h2>
<table>
<thead><tr><th>Symptom</th><th>Free check</th><th>Likely fix</th></tr></thead>
<tbody>
<tr><td>Few visitors</td><td>Incognito "[service] near me" search, Search Console</td><td>Service and town pages, profile link, more reviews</td></tr>
<tr><td>Visitors leave fast</td><td>PageSpeed Insights on mobile</td><td>Smaller images, fewer plugins, simpler layout</td></tr>
<tr><td>Visitors but few calls</td><td>Tap-test on your own phone</td><td>Number in header, click-to-call, sticky call button</td></tr>
<tr><td>Calls but low trust</td><td>The five-second stranger test</td><td>Reviews, real photos, license number</td></tr>
<tr><td>Forms but few jobs</td><td>Submit your own form after hours</td><td>Short form, instant text-back, follow-ups</td></tr>
<tr><td>No idea what works</td><td>Search Console, Business Profile performance</td><td>Call tracking and lead source tracking</td></tr>
</tbody>
</table>
<h2>Where we help</h2>
<p>Our <a href="/services/contractor-websites">contractor websites</a> are built with click-to-call, reviews and fast pages from day one. It costs {{PRICE:website}}. Instant texts to every form lead, follow-ups and 24/7 AI answering are in our Growth package, which costs {{PRICE:crm}}. Missed calls get an automatic text in every package: <a href="/services/missed-call-text-back">missed-call text-back</a>. Hear our AI receptionist at {{DEMO}}.</p>`,
    faq: [
      ["Why is my website not getting any calls?", "Usually because it doesn't show up for local searches, is slow or awkward on a phone, hides the phone number, or doesn't reply to form leads quickly. Check each with free tools before spending money."],
      ["How do I check if my website shows up on Google?", "Search your main service plus \"near me\" or your town in an incognito window. Then check Google Search Console, which shows the searches you appeared for and how many clicks you got."],
      ["What is a good PageSpeed score for a contractor website?", "Focus on what Google measures: main content loading within 2.5 seconds and taps responding within 200 milliseconds. The PageSpeed Insights report shows both for mobile."],
      ["Should my phone number be at the top of my website?", "Yes. Put it in the header of every page, make it tap-to-call, and add a sticky call button on mobile."],
      ["How fast should I respond to a website form lead?", "Within minutes. Lead response research found far better contact rates at 5 minutes than at 30. An instant automatic text holds the lead until you can call."],
      ["Do I need a new website to get more leads?", "Not always. Many sites improve with service and town pages, faster images, a visible phone button and instant replies to forms. Rebuild only if the site can't be fixed."],
    ],
  },

  {
    slug: "handyman-website-cost",
    path: "/guides/handyman-website-cost",
    title: "How Much Does a Handyman Website Cost? (2026)",
    description: "Handyman website cost in 2026: builder, freelancer, agency and monthly prices, plus the pages that win small jobs: task list, minimums, photo quotes and areas.",
    h1: "How much does a handyman website cost?",
    lede: "Handyman work is lots of small jobs from people who search for the task, not the trade. A good handyman site is built around that: a clear task list, honest minimums, a photo-quote form and pages for the neighborhoods you serve. Here's what it costs and what to include.",
    eyebrow: "Website costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Fill the calendar with small jobs.",
    content: `
<div class="callout"><p><strong>Short version:</strong> a handyman website costs about $12 to $49 a month on a builder, a few hundred dollars from a marketplace freelancer, or a few thousand from an agency. Done-for-you monthly plans start around $99 a month. Whichever you choose, the site should list your tasks, state your minimum or trip fee, let people send photos for a quote, and cover the areas you serve.</p></div>
<h2>Cost by route, for a handyman business</h2>
<table>
<thead><tr><th>Route</th><th>Price (checked Nov 2026)</th><th>Handyman fit</th></tr></thead>
<tbody>
<tr><td>AI or DIY builder</td><td>${SQSP()} $12 to $25/mo yearly. ${WIX()} $17 to $39/mo yearly. ${DURABLE()} $25 or $49/mo.</td><td>Fine for a solo handyman starting out. You'll write the task list and photo-quote form yourself.</td></tr>
<tr><td>Marketplace freelancer</td><td>About $150 to $500 one time</td><td>A clean brochure site. Rarely includes task pages or a form that takes photos.</td></tr>
<tr><td>Agency</td><td>Usually $3,000+ (${CLUTCH()}: most reviewed projects under $10,000)</td><td>More than most handyman shops need, unless you run several crews.</td></tr>
<tr><td>Done-for-you monthly</td><td>About $99/mo and up. Ours: {{PRICE:planStarter}}.</td><td>Good if you'd rather be on jobs than editing pages.</td></tr>
</tbody>
</table>
<p>For the general picture across business types, see <a href="/guides/how-much-does-a-website-cost">how much a website costs</a>. For multi-service contractor builds, see the <a href="/guides/contractor-website-cost">contractor website cost guide</a>.</p>
<h2>The pages a handyman site needs</h2>
<ul>
<li><strong>A task list, not a trade label.</strong> Homeowners search "TV mounting," "drywall patch," "door won't latch," "install ceiling fan." List each task you take, and give your top sellers their own page.</li>
<li><strong>Minimums and trip fees, stated plainly.</strong> If you have a minimum charge or a trip fee, put it on the site. It filters out the "can you come hang one picture" calls and saves awkward conversations. A line like "Our minimum visit covers the first hour, so bundle your small jobs" turns the minimum into a reason to book more.</li>
<li><strong>A "what we don't do" line.</strong> Say which jobs you refer out, such as panel work, gas lines or roofing. It builds trust and keeps your phone free for work you want.</li>
<li><strong>Service-area pages.</strong> Handyman customers want someone close. A page for each main neighborhood or town, with a few real jobs done there, beats one line listing twelve towns.</li>
<li><strong>About and proof.</strong> Your face, how long you've done this, insurance, and your license if your state requires one. Customers are letting you into their house.</li>
<li><strong>Reviews by task.</strong> "Mounted our 75-inch TV and hid the wires" sells TV mounting better than any headline.</li>
</ul>
<h2>What a good task page looks like</h2>
<p>Take "TV mounting" as the example. A page that wins that search is short and specific:</p>
<ol>
<li><strong>A plain headline</strong> with the task and your area: "TV Mounting in Mesa and Gilbert."</li>
<li><strong>What's included:</strong> wall types you mount on, hiding wires, mounting above a fireplace, and whether you supply the bracket.</li>
<li><strong>How pricing works:</strong> your minimum, and what changes the price, like brick walls or in-wall wire runs.</li>
<li><strong>Three or four real photos</strong> of TVs you've mounted, ideally with the wires hidden.</li>
<li><strong>Reviews that mention TV mounting.</strong></li>
<li><strong>A tap-to-call button and the photo-quote form,</strong> so the next step is one tap away.</li>
</ol>
<p>Repeat that pattern for your five or six most-requested tasks before you write anything else.</p>
<h2>The photo-quote form</h2>
<p>Most handyman jobs can be priced, or at least sized, from two or three photos. A form that takes photos saves you a drive across town for a 20-minute fix.</p>
<ol>
<li>Ask for name, phone, address and a short description.</li>
<li>Add a photo upload field, ideally up to five images. On some builders this is a paid feature or add-on, so check before you pick a plan.</li>
<li>Add a checkbox list of common tasks so people can pick several and you can bundle them into one visit.</li>
<li>Reply fast. A text saying "Got your photos, I'll send a price by 5 p.m." keeps them from calling the next guy.</li>
</ol>
<h2>License limits and what your site should say</h2>
<p>Handyman licensing varies a lot by state. Some states have no general handyman license. Others require a contractor license above a dollar limit, or for any work that needs a permit, or for plumbing, electrical and structural work. California, for example, raised its minor-work limit from $500 to $1,000 starting January 1, 2025, and the exemption doesn't cover work that needs a building permit or jobs where you hire help, according to ${CPIL()}. The same summary notes the limit doesn't apply to someone who advertises as a contractor.</p>
<p>That matters for your website. Don't list jobs you can't legally take in your state, don't call yourself a licensed contractor unless you are, and check your state licensing board's rules on advertising before you publish. If you hold a license, show the number.</p>
<h2>Built for repeat customers</h2>
<p>Handyman businesses live on repeat work. The same homeowner who calls about a sticky door will have a list of ten more things by spring. Your site and follow-up should make that easy:</p>
<ul>
<li>A "honey-do list" page that invites people to send their whole list for one visit.</li>
<li>Seasonal reminders to past customers: gutter guards and weatherstripping in fall, deck repairs and screen doors in spring.</li>
<li>A review request after every job, since lots of small jobs means lots of chances to collect reviews.</li>
<li>A saved customer list so you're not digging through texts to find who had the leaky faucet last year.</li>
</ul>
<h2>Will it pay for itself? A quick example</h2>
<p>Example numbers only, so use your own. Say an average handyman visit is worth $250 and you net about 40% of that, or $100. A site costing $300 a month needs three extra visits a month to cover itself. A builder plan at $29 a month needs one extra visit every few months. The bigger question is whether the site brings in those visits, which depends on the task pages, reviews and fast replies above, not the price tag.</p>
<h2>What ours costs</h2>
<p>Our <a href="/marketing/handyman/contractor-websites">handyman websites</a> are built around your task list, service area and a quote form, with hosting and edits included. It costs {{PRICE:website}}, and that package includes review requests after every job and missed-call text-back. Seasonal campaigns to past customers and instant replies to form leads are in our Growth package. Busy on a ladder? See our <a href="/marketing/handyman/ai-answering-service">AI answering for handymen</a>, and for low-cost ideas, read <a href="/guides/handyman-marketing-ideas">handyman marketing ideas</a>. Keeping a site current costs money too: see <a href="/guides/website-maintenance-cost">website maintenance costs</a>.</p>`,
    faq: [
      ["How much does a handyman website cost?", "About $12 to $49 a month on a builder like Wix, Squarespace or Durable, a few hundred dollars from a marketplace freelancer, or a few thousand from an agency. Done-for-you monthly plans start around $99 a month."],
      ["Should a handyman list prices on their website?", "List your minimum charge or trip fee and how you price, such as by the hour or by the job. Exact prices for every task aren't needed, but a clear minimum filters out jobs too small to be worth the drive."],
      ["What pages does a handyman website need?", "A task list with pages for your top jobs, a photo-quote form, service-area pages, an about page with insurance and any license, and reviews."],
      ["Can a handyman get quotes from photos?", "For many small jobs, yes. A form with photo upload lets you size the job, bundle tasks and decide whether a visit is worth it before you drive out."],
      ["Do handymen need a license to advertise online?", "It depends on your state. Some have no handyman license, while others set dollar or permit limits and restrict calling yourself a contractor. Check your state licensing board before you publish."],
      ["How do handymen get repeat customers from their website?", "Invite whole to-do lists, send seasonal reminders to past customers and ask for a review after every job, so you stay the person they call next time."],
    ],
  },
];
