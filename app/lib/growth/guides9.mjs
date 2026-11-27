// Marketing-spend guides (added 2026-11-27): budget as % of revenue, agency costs, Angi vs Thumbtack vs HomeAdvisor,
// exclusive vs shared leads, Facebook/Nextdoor ads, and Google Local Services Ads cost per lead.
// Every third-party number was read on the linked page (or its search listing, where noted) in November 2026.
// Vendor prices come only from the vendor's own pages or are attributed to the third party that reported them.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
// Re-check dated figures when updating, especially Google's Local Services Ads migration into Google Ads.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;

// Budget benchmarks
const SBA_BLOG = (t = "an SBA blog post") => A("https://www.sba.gov/blog/how-get-most-your-marketing-budget", t);
const SBA_ASCENT = (t = "SBA's Ascent marketing-plan worksheet") => A("https://ascent.sba.gov/13/bc/7879799d4c4d95e818d29fcd417d/strategic-marketing-6-2-marketing-plan-tool.pdf", t);
const GARTNER = (t = "Gartner's 2025 CMO Spend Survey") => A("https://www.gartner.com/en/newsroom/press-releases/2025-05-12-gartner-2025-cmo-spend-survey-reveals-marketing-budgets-have-flatlined-at-seven-percent-of-overall-company-revenue", t);
const HOOK = (t = "Hook Agency") => A("https://hookagency.com/blog/digital-marketing-costs-for-home-service-businesses-in-2026/", t);
const LOCALIQ_SEARCH = (t = "LocaliQ's home services search ad benchmarks") => A("https://localiq.com/blog/home-services-search-advertising-benchmarks/", t);
// Agency pricing
const AHREFS = (t = "Ahrefs' survey of 439 SEO providers") => A("https://ahrefs.com/blog/seo-pricing/", t);
const AGENCYANALYTICS = (t = "AgencyAnalytics") => A("https://agencyanalytics.com/blog/ppc-pricing", t);
const SEJ_PPC = (t = "Search Engine Journal") => A("https://www.searchenginejournal.com/how-much-should-ppc-management-cost/539017/", t);
const G_TRANSPARENCY = (t = "Google's transparency rules for agencies") => A("https://support.google.com/adspolicy/answer/16489093?hl=en", t);
const GBP_ROLES = (t = "owner and manager roles") => A("https://support.google.com/business/answer/3403100?hl=en", t);
// Lead marketplaces
const ANGI_LEADS_FAQ = (t = "Angi's help center") => A("https://intercom.help/angi/en/articles/6221483-opportunities-and-leads-frequently-asked-questions", t);
const ANGI_BILLING = (t = "Angi's billing FAQ") => A("https://intercom.help/angi/en/articles/11024858-billing-frequently-asked-questions", t);
const HA_PRO = (t = "HomeAdvisor's pro help pages") => A("https://pro.homeadvisor.com/help/faqs/", t);
const FTC_HA = (t = "the FTC's 2023 order against HomeAdvisor") => A("https://www.ftc.gov/news-events/news/press-releases/2023/01/ftc-order-requires-homeadvisor-pay-72-million-stop-deceptively-marketing-its-leads-home-improvement", t);
const TT_PRO = (t = "Thumbtack's pro page") => A("https://www.thumbtack.com/pro", t);
const TT_BUDGET = (t = "Thumbtack's budget help article") => A("https://help.thumbtack.com/article/set-budget", t);
const TT_PRICES = (t = "set their own lead prices") => A("https://help.thumbtack.com/article/set-lead-prices", t);
const TT_REFUND = (t = "Thumbtack's refund policy") => A("https://help.thumbtack.com/article/refund-policy", t);
const TT_FAIRSHOT = (t = "Fair Shot refund") => A("https://help.thumbtack.com/article/refund-policy-thumbtack-numbers", t);
// Google Local Services Ads
const LSA_LEADS = (t = "Google's page on how leads work") => A("https://support.google.com/localservices/answer/7195435?hl=en", t);
const LSA_BIDDING = (t = "Google's bidding page") => A("https://support.google.com/localservices/answer/10125017?hl=en", t);
const LSA_CREDITS = (t = "Google's lead credit rules") => A("https://support.google.com/localservices/answer/15100654", t);
const LSA_MIGRATION = (t = "Google's migration notice") => A("https://support.google.com/google-ads/answer/17213585", t);
const LSA_RANKING = (t = "Google's ad ranking page") => A("https://support.google.com/localservices/answer/7527305?hl=en", t);
const LSA_TIPS = (t = "Google's performance tips") => A("https://support.google.com/localservices/answer/12492201?hl=en", t);
const LSA_VERIFIED = (t = "Google Verified badge") => A("https://support.google.com/localservices/answer/16498018?hl=en", t);
const NINETY9 = (t = "99 Calls' Q1 2026 report") => A("https://99calls.com/blog/lsa-cost-per-lead-by-industry-for-service-contractors", t);
const HCP_LSA = (t = "Housecall Pro's LSA guide") => A("https://www.housecallpro.com/learn/local-services-ads-guide/", t);
// Social ads
const LOCALIQ_FB = (t = "LocaliQ and WordStream's Facebook ad benchmarks") => A("https://localiq.com/blog/facebook-advertising-benchmarks/", t);
const META_PRICING = (t = "Meta's ad pricing page") => A("https://www.facebook.com/business/ads/pricing", t);
const ND_LOCAL = (t = "Nextdoor's small-business ads page") => A("https://business.nextdoor.com/en-us/local/advertise-with-nextdoor-ads-v4-naccta-nb-5pday-qc", t);
const ND_NAM = (t = "Nextdoor's Ads Manager page") => A("https://business.nextdoor.com/en-us/advertise-with-nam-2026", t);
const ND_QUICKSTART = (t = "Nextdoor's ad center guide") => A("https://business.nextdoor.com/en-us/neighborhood-ad-center/blog/quickstart-guide-to-the-neighborhood-ad-center", t);
// Reviews
const BRIGHTLOCAL = (t = "BrightLocal's 2026 consumer review survey") => A("https://www.brightlocal.com/research/local-consumer-review-survey/", t);

export const guides9 = [
  {
    slug: "how-much-should-contractors-spend-on-marketing",
    path: "/guides/how-much-should-contractors-spend-on-marketing",
    title: "How Much Should Contractors Spend on Marketing? (2026)",
    description: "Marketing budget as a % of revenue for home-service businesses, how it shifts by growth stage and trade, a worked $1M HVAC budget, and what to measure.",
    h1: "How much should a home-service business spend on marketing?",
    lede: "Most guidance lands between 5% and 12% of revenue. Where you belong depends on how new you are, how full your schedule is and what kind of jobs you sell. Here are the benchmarks, a worked budget and the numbers to watch.",
    eyebrow: "Marketing budget", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want a budget built around your calendar?",
    content: `
<div class="callout"><p><strong>Short version:</strong> SBA material suggests 7% to 8% of revenue for businesses under $5 million. For home-service shops a practical range is about 5% to 12%: higher when you're new, entering a town or adding a trade, lower when the schedule is full and repeat customers carry you. A $1M HVAC or plumbing shop at 7% has about $5,800 a month. Judge it by cost per booked job, not cost per lead.</p></div>
<h2>What the benchmarks actually say</h2>
<p>There's no large, public survey of what HVAC or plumbing shops spend on marketing. What exists is general small-business guidance and agency estimates. Use them as guardrails, not targets. All checked November 2026.</p>
<table>
<tr><th>Source</th><th>Figure</th><th>Keep in mind</th></tr>
<tr><td>${SBA_ASCENT()}</td><td>7% to 8% of revenue for businesses under $5 million. Budgets can run from 2% up to 20% when launching something new.</td><td>General small-business advice, not trade-specific (read from the document's search listing)</td></tr>
<tr><td>${SBA_BLOG()} (July 2019), citing Web Strategies</td><td>Consumer-facing service companies averaged 11.8% of revenue. Business-to-business services averaged 6.9%.</td><td>Older data, all industries</td></tr>
<tr><td>${GARTNER()}</td><td>Average budget 7.7% of revenue. Half of respondents were at 6% or less.</td><td>402 marketing leaders, mostly at companies over $1 billion</td></tr>
<tr><td>${HOOK()} (2026 guide, edited Nov 5, 2026)</td><td>5% to 15% for home-service businesses, lower for established firms</td><td>An agency's estimate</td></tr>
</table>
<p>Home services sit on the consumer side, so the higher consumer-services figure is a fair ceiling for most growing shops. Very few owner-operators need to go past 12% for long.</p>
<h2>How the percentage changes with your growth stage</h2>
<p>These are our working ranges from planning budgets with contractors. They're a rule of thumb, not survey data.</p>
<table>
<tr><th>Stage</th><th>Share of revenue</th><th>Where the money goes</th></tr>
<tr><td>New business, new town or new trade</td><td>10% to 15%</td><td>Google Business Profile, first reviews, a real website, and paid leads to fill the calendar while the free side builds</td></tr>
<tr><td>Growing and adding trucks</td><td>7% to 10%</td><td>Paid search and Local Services Ads scaled to what you can answer, service-and-town pages, hiring pages</td></tr>
<tr><td>Established, schedule mostly full</td><td>4% to 7%</td><td>Repeat customers, maintenance plans, review flow, seasonal campaigns and brand</td></tr>
</table>
<p>The percentage drops with time because owned marketing compounds. Reviews, a ranking profile and a customer list keep producing after you pay for them. Paid leads stop the day the budget stops.</p>
<h2>How it changes by trade</h2>
<ul>
<li><strong>Emergency repair trades</strong> (plumbing, HVAC repair, garage doors, electricians). Demand is urgent and lands on Google. Most of the budget goes to the Google profile, Local Services Ads, search ads and answering every call. In ${LOCALIQ_SEARCH()} (campaigns from April 2024 to March 2025, medians), search ad leads cost $127.74 for air conditioning, $129.02 for plumbing and $93.69 for electricians. See <a href="/marketing/hvac">HVAC</a>, <a href="/marketing/plumbing">plumbing</a> and <a href="/marketing/electricians">electrician</a> marketing.</li>
<li><strong>Big-ticket project trades</strong> (roofing, remodeling, concrete, decks). Fewer, larger jobs and longer decisions. Roofing search leads ran $228.15 in the same data, so plan for estimate follow-up, job photos and reviews that close the sale. See <a href="/marketing/roofing">roofing</a> and <a href="/marketing/remodeling">remodeling</a>.</li>
<li><strong>Recurring service</strong> (pest control, lawn care, cleaning). One customer can be worth years of visits. You can afford more to win a customer, then spend little to keep them with reminders and plans. See <a href="/marketing/pest-control">pest control</a> and <a href="/marketing/landscaping">landscaping</a>.</li>
<li><strong>Seasonal trades</strong> (HVAC, landscaping, holiday lighting). Set a yearly number and move it by month. Spend ahead of the rush, not during it, when you're already booked.</li>
</ul>
<h2>Worked example: a $1M HVAC and plumbing shop</h2>
<p>Assume $1,000,000 in yearly revenue, two to four trucks, and a 7% budget. That's $70,000 a year, or about $5,830 a month. One reasonable split:</p>
<table>
<tr><th>Line</th><th>Monthly</th><th>Why</th></tr>
<tr><td>Google Local Services Ads</td><td>$1,500</td><td>Pay per lead. Strong for urgent repair calls.</td></tr>
<tr><td>Google search ad spend</td><td>$1,200</td><td>Aimed at replacements and other high-margin jobs</td></tr>
<tr><td>Ads management</td><td>$500</td><td>Someone has to watch search terms, calls and lead quality</td></tr>
<tr><td>Website, Google profile, local SEO and reviews</td><td>$1,200</td><td>The part that keeps working when ads pause</td></tr>
<tr><td>Software: CRM, call tracking, texting</td><td>$350</td><td>So you know which dollars booked jobs</td></tr>
<tr><td>Past-customer campaigns (tune-up reminders, email, text, postcards)</td><td>$500</td><td>The cheapest jobs you'll ever book</td></tr>
<tr><td>Facebook or Nextdoor test and retargeting</td><td>$300</td><td>Seasonal offers to homeowners nearby</td></tr>
<tr><td>Reserve for tests and peak weeks</td><td>$280</td><td>Spend it when a truck would otherwise sit</td></tr>
<tr><td><strong>Total</strong></td><td><strong>$5,830</strong></td><td>About half buys this month's leads. The rest builds assets.</td></tr>
</table>
<p>A quick check on the search line: at LocaliQ's median of about $128 a lead, $1,200 buys roughly 9 leads. If you book 4 of them, each job costs about $300 in ad spend before management. That works for a $9,000 system replacement. It doesn't work for a $189 drain call, so point search ads at the big jobs and let Local Services Ads and your Google profile catch the repairs.</p>
<h2>What to measure every month</h2>
<ol>
<li><strong>Cost per booked job by source.</strong> Spend divided by booked jobs, for each channel. Give each channel its own number with <a href="/services/call-tracking">call tracking</a>.</li>
<li><strong>Booking rate on real calls.</strong> Of the calls that were real customers, how many booked? A low rate is a phone problem, not a marketing problem.</li>
<li><strong>Missed calls.</strong> A missed call from a paid source is money spent for nothing. <a href="/services/ai-answering-service">AI answering</a> or <a href="/services/missed-call-text-back">missed-call text-back</a> plugs that.</li>
<li><strong>Average ticket and gross profit by source.</strong> A source with pricier leads can still win if its jobs are bigger.</li>
<li><strong>Revenue per marketing dollar.</strong> Run your numbers in the <a href="/tools/marketing-roi-calculator">marketing ROI calculator</a>.</li>
<li><strong>Share of jobs from repeat customers, referrals and reviews.</strong> This should rise every year. If it doesn't, you're renting all your growth.</li>
</ol>
<h2>When to spend more, and when to pull back</h2>
<ul>
<li><strong>Spend more</strong> when cost per booked job is well under your profit per job and you have open slots.</li>
<li><strong>Pull back on paid leads first</strong> when you can't answer the phone, your backlog runs past two weeks, or a source costs more per job than the job earns.</li>
<li><strong>Never cut the free side to zero.</strong> Reviews and your Google profile are what make every paid channel cheaper. Start with a <a href="/free-google-maps-audit">free Google Maps audit</a>.</li>
</ul>
<p>Our packages and what they include are on the <a href="/pricing">pricing page</a>. For the paid-lead side, see <a href="/guides/exclusive-vs-shared-leads">exclusive vs shared leads</a> and <a href="/guides/home-service-marketing-agency-cost">what agencies cost</a>.</p>`,
    faq: [
      ["What percentage of revenue should a contractor spend on marketing?", "Most guidance falls between 5% and 12% of revenue. SBA material suggests 7% to 8% for businesses under $5 million, with more when you're new or expanding."],
      ["How much should a $1 million HVAC company spend on marketing?", "At 7%, about $70,000 a year, or roughly $5,800 a month. Split it between paid leads and owned channels like your Google profile, reviews and website."],
      ["Should a new contractor spend more on marketing?", "Usually yes, often 10% to 15% of revenue for the first few years, because you have no reviews, referrals or repeat customers yet. The share should fall as those build."],
      ["Does marketing budget include ad spend?", "Yes. Count ad spend, agency or management fees, software and your own campaigns together, so you can compare total spend with booked jobs."],
      ["What's the best way to measure marketing for a home-service business?", "Cost per booked job by source. It ties spend to real work on the calendar instead of clicks or leads."],
      ["When should I cut my marketing budget?", "Cut paid leads first when you can't answer calls or a source costs more per job than the job earns. Keep reviews and your Google profile going."],
    ],
  },
  {
    slug: "home-service-marketing-agency-cost",
    path: "/guides/home-service-marketing-agency-cost",
    title: "Home-Service Marketing Agency Cost in 2026",
    description: "What home-service marketing agencies cost in 2026: retainers, setup fees, contracts and ad spend, pricing models compared, and 12 questions to ask first.",
    h1: "What does a home-service marketing agency cost in 2026?",
    lede: "Agency quotes for contractors range from a few hundred dollars to over $10,000 a month, and the fee is only part of the bill. Here's what the money buys, how agencies price, and what to check before you sign.",
    eyebrow: "Marketing budget", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want fixed prices and no contract?",
    content: `
<div class="callout"><p><strong>Short version:</strong> home-service agencies usually quote a monthly fee in the low thousands, with ad spend paid on top. One agency's 2026 guide puts typical home-service retainers at $2,500 to $10,000 a month, and the most common SEO-only retainer in a large survey was $501 to $1,000. The terms matter more than the price: who owns the accounts, how you leave, and whether they report cost per booked job.</p></div>
<h2>The four parts of an agency bill</h2>
<ol>
<li><strong>Management fee or retainer.</strong> The agency's labor: strategy, ads, SEO, content, reporting.</li>
<li><strong>Setup or onboarding fee.</strong> A one-time charge for building campaigns, tracking or a website. Many agencies charge one. Few publish it.</li>
<li><strong>Ad spend.</strong> Money that goes to Google, Meta or Nextdoor. It should be separate from the fee and visible to you.</li>
<li><strong>Tools.</strong> Call tracking, rank tracking, CRM and review software. ${HOOK()} puts these at $200 to $600 a month when billed as extras.</li>
</ol>
<p>Add all four before comparing quotes. A low fee with $400 of add-on tools isn't cheaper than a higher fee that includes them.</p>
<h2>2026 price ranges we could verify</h2>
<p>All read in November 2026. Agency guides come from firms that sell these services, so treat them as market quotes, not neutral averages.</p>
<table>
<tr><th>Service</th><th>Range</th><th>Source</th></tr>
<tr><td>Full-service home-service retainer</td><td>$2,500 to $10,000 a month</td><td>${HOOK()}, edited Nov 5, 2026</td></tr>
<tr><td>SEO for home services</td><td>$1,000 to $3,500 a month</td><td>${HOOK()}</td></tr>
<tr><td>SEO, all industries</td><td>Most common retainer $501 to $1,000 a month (20.4% of respondents)</td><td>${AHREFS()}, updated Aug 15, 2024</td></tr>
<tr><td>Google Ads management</td><td>$500 to $2,500 a month, plus ad spend</td><td>${HOOK()}</td></tr>
<tr><td>Google Ads spend</td><td>About $1,000 a month at the low end, $5,000+ in competitive markets</td><td>${HOOK()}</td></tr>
<tr><td>Social media management</td><td>$500 to $2,000 a month</td><td>${HOOK()}</td></tr>
<tr><td>Template website build</td><td>$3,000 to $5,000</td><td>${HOOK()}</td></tr>
</table>
<p>We couldn't find reliable published figures for setup fees or typical contract length. They vary by agency, so ask for both in writing.</p>
<h2>Pricing models compared</h2>
<table>
<tr><th>Model</th><th>How it works</th><th>Good for</th><th>Watch for</th></tr>
<tr><td>Flat monthly retainer</td><td>One fee for a defined scope</td><td>Predictable budgets</td><td>Vague scope. Get the monthly deliverables listed.</td></tr>
<tr><td>Percentage of ad spend</td><td>Fee rises with your ad budget. ${AGENCYANALYTICS()} cites 10% to 20%. ${SEJ_PPC()} says 5% to 15%.</td><td>Larger ad budgets</td><td>The agency earns more when you spend more, whether or not jobs follow</td></tr>
<tr><td>Pay per lead or per call</td><td>You pay for each lead the agency delivers</td><td>Testing with little risk</td><td>Who defines a lead, whether leads are shared, and who owns the ad accounts</td></tr>
<tr><td>Hourly or per project</td><td>Billed by time or for one deliverable, like a website</td><td>One-off work</td><td>Open-ended hours. Ask for a cap.</td></tr>
<tr><td>Fixed packages</td><td>Set tiers with set contents</td><td>Owners who want to compare apples to apples</td><td>Paying for pieces you won't use</td></tr>
</table>
<p>No model is a scam on its own. What matters is that the fee rewards booked jobs and that you can leave with everything you paid for.</p>
<h2>Contracts, setup fees and ad spend: what Google requires</h2>
<p>If an agency runs your Google Ads, ${G_TRANSPARENCY()} apply (checked November 2026). Agencies must:</p>
<ul>
<li>Tell new customers in writing about any management fee before the first sale, and show it on every invoice.</li>
<li>Show the exact amount Google charged, without their fee, in any monthly report they owe you, with cost, clicks and impressions.</li>
<li>Give you your Google Ads customer ID when you ask, so you can contact Google directly.</li>
</ul>
<p>For your Google Business Profile, you should hold the owner role and give the agency manager access. Google's ${GBP_ROLES()} mean a manager can't remove you.</p>
<h2>12 questions to ask before you hire one</h2>
<ol>
<li><strong>Who owns the ad accounts, Google profile, website, domain and tracking numbers?</strong> Red flag: "they're in our account."</li>
<li><strong>What's the minimum term, and how do I cancel?</strong> Red flag: auto-renewal or a long notice period buried in the contract.</li>
<li><strong>Is there a setup fee, and what exactly does it buy?</strong> Red flag: a large fee with no list of deliverables.</li>
<li><strong>Is ad spend separate from your fee, and will I see Google's charges?</strong> Red flag: one blended number you can't check.</li>
<li><strong>Do you report cost per booked job, or only clicks and leads?</strong> Red flag: reports full of impressions and nothing about jobs.</li>
<li><strong>How do you track calls, and can I hear the recordings?</strong> Red flag: no <a href="/services/call-tracking">call tracking</a> at all.</li>
<li><strong>Who works on my account, and how many other accounts do they handle?</strong> Red flag: you can't name a person.</li>
<li><strong>Do you work with a competitor in my trade and town?</strong> Red flag: a dodge instead of a yes or no.</li>
<li><strong>What happens to my website and content if I leave?</strong> Red flag: the site is "rented" and goes dark when you cancel.</li>
<li><strong>Do you guarantee rankings?</strong> Red flag: a promise of the #1 spot. No one controls Google's rankings.</li>
<li><strong>Which home-service clients can I call?</strong> Red flag: no references in your kind of trade.</li>
<li><strong>What do you need from me each week?</strong> Red flag: "nothing." Good marketing needs your photos, reviews and feedback on lead quality.</li>
</ol>
<p>Also walk away from anyone who offers to buy reviews or filter out unhappy customers. See <a href="/guides/is-review-gating-allowed">is review gating allowed</a>.</p>
<h2>How we price</h2>
<p>We sell {{PRICE:plans}}, paid month to month with no contract. Every package lists what's in it, and we put who owns your site, Google profile and data in writing before we start. Google Ads and Local Services Ads management is {{PRICE:ads}}. Compare them on the <a href="/pricing">pricing page</a>, or see what's behind the work in <a href="/services/local-seo">local SEO</a>.</p>
<p>To decide how big the whole budget should be first, read <a href="/guides/how-much-should-contractors-spend-on-marketing">how much contractors should spend on marketing</a>.</p>`,
    faq: [
      ["How much does a home-service marketing agency cost per month?", "Quotes commonly run from about $1,000 to $10,000 a month depending on scope, with ad spend paid separately. One 2026 agency guide puts typical home-service retainers at $2,500 to $10,000."],
      ["Is ad spend included in an agency's fee?", "Usually not. Ad spend goes to Google or Meta, and Google requires agencies to disclose their management fee separately from Google's charges."],
      ["What is a normal Google Ads management fee?", "Published ranges vary. Some agencies charge a flat $500 to $2,500 a month, others a percentage of ad spend, often quoted between 5% and 20%."],
      ["Should I sign a 12-month agency contract?", "Only if you can leave for cause and keep your accounts, website and data. Month-to-month terms put the burden on the agency to keep earning your business."],
      ["Who should own my Google Ads account and Google Business Profile?", "You should. Keep owner access yourself and give the agency manager access, so nothing is lost if you part ways."],
      ["What's the biggest red flag when hiring a marketing agency?", "Not being able to see your own accounts and costs. If you can't check spend, calls and booked jobs, you can't judge the work."],
    ],
  },
  {
    slug: "angi-vs-thumbtack-vs-homeadvisor",
    path: "/guides/angi-vs-thumbtack-vs-homeadvisor",
    title: "Angi vs Thumbtack vs HomeAdvisor: What Contractors Pay",
    description: "Angi, Thumbtack and HomeAdvisor compared for contractors: how each charges, shared vs exclusive leads, refunds, what pros report, and when each makes sense.",
    h1: "Angi vs Thumbtack vs HomeAdvisor: what contractors actually pay",
    lede: "HomeAdvisor and Angi are now one lead network for pros, so the real choice is Angi or Thumbtack, with Google Local Services Ads as the yardstick. Here's how each one charges, checked November 2026.",
    eyebrow: "Lead sources", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want jobs from leads nobody else is sold?",
    content: `
<div class="callout"><p><strong>Short version:</strong> HomeAdvisor's pro product now runs as Angi Leads, so for contractors it's one network. Angi charges per lead, matches each request with no more than five pros and bills subscription pros monthly. Thumbtack is free to join and charges per lead at prices you set within its range, with a weekly budget. Test each on cost per booked job, and answer within minutes or neither will pay.</p></div>
<h2>HomeAdvisor and Angi: one company, one pro product</h2>
<p>HomeAdvisor and Angie's List merged under Angi Inc. HomeAdvisor's pro help pages are now titled Angi Leads, and current answers about lead fees and billing live in ${ANGI_LEADS_FAQ()}. Homeowners may still see the HomeAdvisor name, but if you buy leads from either brand you're dealing with the same company and largely the same rules.</p>
<p>Some background worth knowing. In 2023, ${FTC_HA()} required it to pay up to $7.2 million and barred false claims about lead quality. The FTC alleged that from at least 2014 HomeAdvisor misrepresented the quality and source of leads it sold. At the time, the FTC said pros generally paid a $287.99 annual membership plus a fee per lead. Ask for today's membership terms in writing, because Angi doesn't publish a price list.</p>
<h2>How each one charges</h2>
<table>
<tr><th></th><th>Angi Leads (incl. HomeAdvisor)</th><th>Thumbtack</th><th>Google Local Services Ads (for context)</th></tr>
<tr><td>To join</td><td>Sign up through sales. No public price list.</td><td>${TT_PRO()} says there's no charge to join and no annual or membership fees.</td><td>No fee. Business screening and background checks, which Google doesn't charge for.</td></tr>
<tr><td>You're charged when</td><td>An opportunity becomes a lead once you and the homeowner both show interest. Subscription pros are billed monthly and charged for leads whether or not they respond.</td><td>A customer contacts you (a lead), or you reach out to an opportunity and the customer replies.</td><td>A valid lead: a call, message or booking request.</td></tr>
<tr><td>Who sets the price</td><td>Angi, by task, homeowner location and demand</td><td>Pros ${TT_PRICES()} within Thumbtack's range for the job</td><td>An auction, with your bid as a ceiling</td></tr>
<tr><td>Spend control</td><td>A monthly lead budget. ${ANGI_BILLING()} says you can be matched past it.</td><td>A weekly budget that resets Monday. A lead can take you over by a capped amount (${TT_BUDGET()}).</td><td>A weekly budget, moving to a daily average as Google folds these ads into Google Ads</td></tr>
<tr><td>Shared?</td><td>Each request is matched with no more than five pros</td><td>Customers can contact several pros</td><td>The customer picks one business from a short list</td></tr>
<tr><td>Money back</td><td>"In some cases" you can request a lead credit</td><td>${TT_REFUND()}: request within 45 days, for listed reasons. A ${TT_FAIRSHOT()} applies if the customer answers no pro within 72 hours and you replied within 4 business hours on Thumbtack.</td><td>Automatic credits for leads Google judges invalid</td></tr>
</table>
<p>Sources read November 2026: ${ANGI_LEADS_FAQ("Angi's opportunities and leads FAQ")} (updated Oct 15, 2026), ${ANGI_BILLING()} (dated Mar 5, 2026), ${HA_PRO()}, and Thumbtack's help center. Thumbtack's help pages load in the app, so some details were read from their search listings.</p>
<h2>What contractors report</h2>
<p>We don't sell leads, and we won't pretend every account looks the same. The complaints that show up again and again across lead marketplaces are:</p>
<ul>
<li><strong>Paying for people who never answer.</strong> Thumbtack's own community forum has threads from 2024 and 2025 about refund requests denied for unresponsive customers. Its general policy says a customer not replying isn't enough on its own.</li>
<li><strong>Competing on speed.</strong> With up to five pros on an Angi request, the first good reply usually wins. If you're on a roof all day, you're late to most of them.</li>
<li><strong>Prices that creep.</strong> Both platforms price by demand, so a busy season or market can raise the cost per lead without a change on your side.</li>
<li><strong>Lead quality disputes.</strong> These were the center of the FTC's HomeAdvisor case, and are why you should track every lead to an outcome.</li>
</ul>
<p>Plenty of contractors do book profitable work on both. The ones who do tend to answer instantly, pick job types carefully and drop categories that don't pay.</p>
<h2>When each one makes sense</h2>
<ul>
<li><strong>Thumbtack</strong> fits when you want to start small with no membership, control your price per lead, and can reply within minutes. It suits handyman, cleaning, painting and smaller project trades well. See <a href="/marketing/handyman">handyman marketing</a>.</li>
<li><strong>Angi Leads</strong> fits when you want steady volume in a market where homeowners use Angi, and you can work a lead fast enough to beat four other pros. Read the subscription terms and cancellation rules first.</li>
<li><strong>Google Local Services Ads</strong> often beats both for urgent trades like plumbing, HVAC and garage doors, because the customer chooses you from a short list. See <a href="/guides/google-local-services-ads-cost-per-lead">Local Services Ads cost per lead</a>.</li>
<li><strong>None of them</strong> is the right call if you can't answer the phone during the day. Fix that first with <a href="/services/ai-answering-service">AI answering</a> or <a href="/services/missed-call-text-back">missed-call text-back</a>.</li>
</ul>
<h2>How to test them side by side</h2>
<ol>
<li>Give each source its own tracked phone number with <a href="/services/call-tracking">call tracking</a>.</li>
<li>Set a fixed test budget for each: the same dollars, the same 60 days.</li>
<li>Log every lead in one place: contacted, quoted, booked, revenue.</li>
<li>After at least 20 leads per source, divide spend by booked jobs. Use the <a href="/tools/cost-per-lead-calculator">cost per lead calculator</a>.</li>
<li>Keep the source with the lowest cost per booked job, and cap its spend at what one job earns you.</li>
</ol>
<p>For a shorter breakdown of the billing moments, see <a href="/guides/angi-vs-thumbtack-vs-local-services-ads">Angi vs Thumbtack vs Local Services Ads</a>.</p>
<h2>What none of them build for you</h2>
<p>Every lead you buy is rented. When you stop paying, the calls stop, and the customer's review usually lands on the platform, not on your Google profile. Put part of the budget into things you keep: <a href="/services/review-generation">Google reviews</a>, your <a href="/services/google-business-profile">Google Business Profile</a> and a <a href="/services/contractor-websites">website</a> that converts. The math is in <a href="/guides/exclusive-vs-shared-leads">exclusive vs shared leads</a>.</p>`,
    faq: [
      ["Are HomeAdvisor and Angi the same company?", "Yes. Both belong to Angi Inc., and HomeAdvisor's pro product now runs as Angi Leads, so contractors deal with one network and one set of lead rules."],
      ["Is Thumbtack cheaper than Angi?", "Thumbtack has no membership fee and lets you set lead prices within its range, which makes it cheaper to start. Which costs less per booked job depends on your trade, town and response speed."],
      ["How many contractors get the same Angi lead?", "Angi says each homeowner request is matched with no more than five pros."],
      ["Can I get refunds for bad leads on Thumbtack or Angi?", "Thumbtack takes refund requests within 45 days for listed reasons and has a separate Fair Shot refund for some unanswered leads. Angi says lead credits are available in some cases."],
      ["Does HomeAdvisor still charge a membership fee?", "Angi doesn't publish its pro pricing. In 2023 the FTC said HomeAdvisor pros generally paid a $287.99 annual membership, so ask for current terms in writing."],
      ["Are Google Local Services Ads better than Angi or Thumbtack?", "For urgent trades they often are, because the customer picks one business from a short list. Compare all three on cost per booked job."],
    ],
  },
  {
    slug: "exclusive-vs-shared-leads",
    path: "/guides/exclusive-vs-shared-leads",
    title: "Exclusive vs Shared Leads for Home-Service Businesses",
    description: "Exclusive vs shared leads for contractors: what each means, cost per booked job math, how to find your break-even close rate, and how owned channels compare.",
    h1: "Exclusive vs shared leads: which is cheaper per booked job?",
    lede: "A cheap lead isn't a cheap job. Shared leads cost less up front but close less often, and exclusive leads cost more but close more. The way to compare them is one number: cost per booked job.",
    eyebrow: "Lead sources", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want more jobs that never cost a lead fee?",
    content: `
<div class="callout"><p><strong>Short version:</strong> a shared lead goes to several contractors at once, so it's cheaper but you win fewer. An exclusive lead goes only to you, so it costs more but closes more often. Divide the lead price by the most you'll pay for a booked job to get your break-even close rate. Over time, owned channels like your Google profile, reviews and website usually end up cheapest per job.</p></div>
<h2>What the terms mean</h2>
<table>
<tr><th>Type</th><th>What it means</th><th>Home-service examples</th></tr>
<tr><td>Shared lead</td><td>The same homeowner's request goes to more than one business</td><td>Angi matches each request with no more than five pros (${ANGI_LEADS_FAQ()}). Thumbtack customers can contact several pros.</td></tr>
<tr><td>Exclusive lead</td><td>Only you get that customer's contact</td><td>A call from your Google Business Profile, your website or your own Google Ads. Some lead sellers also offer "exclusive" leads at a higher price.</td></tr>
<tr><td>In between</td><td>The customer picks one business from a short list</td><td>Google Local Services Ads. Google says its lead prices reflect how likely the customer is to book, including whether they contacted other advertisers (${LSA_LEADS()}).</td></tr>
</table>
<h2>The cost per booked job math</h2>
<p>Here's a water heater replacement company comparing two sources over a month. These are example numbers. Use your own.</p>
<table>
<tr><th></th><th>Shared leads</th><th>Exclusive leads</th></tr>
<tr><td>Price per lead</td><td>$40</td><td>$110</td></tr>
<tr><td>Leads bought</td><td>50</td><td>20</td></tr>
<tr><td>Spend</td><td>$2,000</td><td>$2,200</td></tr>
<tr><td>Close rate (lead to booked job)</td><td>14%</td><td>40%</td></tr>
<tr><td>Booked jobs</td><td>7</td><td>8</td></tr>
<tr><td><strong>Cost per booked job</strong></td><td><strong>$286</strong></td><td><strong>$275</strong></td></tr>
</table>
<p>They come out almost even on cost per job. The difference is time. Fifty shared leads means fifty fast callbacks, many to people already talking to someone else. Twenty exclusive leads leaves more time for estimates. If the person calling back is you, that time has a price too.</p>
<h2>How to calculate your break-even close rate</h2>
<ol>
<li><strong>Find your gross profit per job.</strong> Average ticket minus parts, labor and fees. Say a $2,400 water heater install leaves $900.</li>
<li><strong>Decide the most you'll pay to win that job.</strong> Many owners cap it at a third of gross profit. Here, $300.</li>
<li><strong>Divide the lead price by that cap.</strong> Break-even close rate = lead price ÷ max cost per booked job.</li>
<li><strong>Compare with what you actually close.</strong> Track at least 20 leads per source before you judge.</li>
</ol>
<table>
<tr><th>Lead price</th><th>Max cost per job</th><th>Break-even close rate</th></tr>
<tr><td>$25</td><td>$300</td><td>8.3%</td></tr>
<tr><td>$40</td><td>$300</td><td>13.3%</td></tr>
<tr><td>$75</td><td>$300</td><td>25%</td></tr>
<tr><td>$110</td><td>$300</td><td>36.7%</td></tr>
</table>
<p>If you close above the break-even rate, the source pays. If you close below it, it loses money on every job, no matter how cheap the leads look. On a $189 drain call with $90 of profit, almost no paid lead works. That's why repair-heavy shops lean on their Google profile and repeat customers. Try it with the <a href="/tools/cost-per-lead-calculator">cost per lead calculator</a>.</p>
<h2>What moves your close rate</h2>
<ul>
<li><strong>Speed.</strong> On shared leads, the first good reply usually wins. Thumbtack's ${TT_FAIRSHOT()} even requires you to reply within 4 business hours. Instant replies through <a href="/services/missed-call-text-back">missed-call text-back</a> or <a href="/services/ai-answering-service">AI answering</a> help most here.</li>
<li><strong>Reviews.</strong> In ${BRIGHTLOCAL()} (1,002 US adults, February 2026), 47% said they won't use a business with fewer than 20 reviews, and 68% will only use one with four stars or more. Homeowners check you even when the lead came from somewhere else.</li>
<li><strong>Follow-up.</strong> Many jobs are won on the second or third touch. See <a href="/guides/how-to-follow-up-on-an-estimate">how to follow up on an estimate</a>.</li>
</ul>
<h2>How owned channels compare over time</h2>
<p>Owned channels are the ones nobody can switch off: your Google Business Profile, your reviews, your website and your customer list. Every call from them is exclusive, and there's no fee per lead. The catch is that they take months to build, so cost per job starts high and falls.</p>
<table>
<tr><th>Example: $1,000 a month on profile, reviews and website</th><th>Month 1</th><th>Month 6</th><th>Month 12</th></tr>
<tr><td>Booked jobs from those channels</td><td>2</td><td>6</td><td>10</td></tr>
<tr><td>Cost per booked job</td><td>$500</td><td>$167</td><td>$100</td></tr>
</table>
<p>That table is an illustration of the shape, not a promise. Your results depend on your trade, town and competition. But the direction is the point: paid leads cost about the same per job in month twelve as in month one, while owned channels get cheaper as reviews and rankings pile up. Recent reviews matter too: 74% of consumers in the BrightLocal survey look for reviews written in the last three months, so the flow has to keep going.</p>
<h2>Questions to ask any lead seller</h2>
<ul>
<li><strong>How many other businesses get this lead?</strong> Get a number, not "a few."</li>
<li><strong>What counts as a lead you charge for?</strong> A form fill, a call over a set length, or only a customer who replies?</li>
<li><strong>How do I get credit for a bad lead,</strong> and how long do I have to ask?</li>
<li><strong>Who sets the price, and can it change without notice?</strong></li>
<li><strong>Is there a membership, subscription or minimum term</strong> on top of lead fees?</li>
<li><strong>Where do the leads come from?</strong> A homeowner who asked for quotes today is worth more than someone who filled out a survey last month.</li>
</ul>
<p>Write the answers down and check them against your first 20 leads. If what you're sold doesn't match what you were told, stop and ask for credits before buying more.</p>
<h2>A sensible mix</h2>
<ul>
<li><strong>Starting out:</strong> use paid leads to fill the calendar while you build reviews and your profile.</li>
<li><strong>Growing:</strong> keep the paid sources that beat your break-even rate and drop the rest.</li>
<li><strong>Established:</strong> most jobs should come from owned channels and repeat customers, with paid leads to fill slow weeks.</li>
</ul>
<p>Start with <a href="/services/review-generation">review generation</a> and <a href="/services/local-seo">local SEO</a>, or get a <a href="/free-google-maps-audit">free Google Maps audit</a>. For the platforms themselves, see <a href="/guides/angi-vs-thumbtack-vs-homeadvisor">Angi vs Thumbtack vs HomeAdvisor</a>.</p>`,
    faq: [
      ["What is the difference between exclusive and shared leads?", "A shared lead is sent to several contractors at once. An exclusive lead goes only to you, so it costs more but usually closes at a higher rate."],
      ["Are exclusive leads worth the higher price?", "Only if your close rate rises enough to lower your cost per booked job. Compare sources on cost per booked job, not price per lead."],
      ["How do I calculate my break-even close rate?", "Divide the price of one lead by the most you're willing to pay for a booked job. If a lead costs $40 and you'll pay up to $300 per job, you need to close at least 13.3%."],
      ["Are Google Local Services Ads leads shared?", "Not in the usual sense. The customer picks a business from a short list and contacts it, and Google prices leads partly on whether the customer contacted other advertisers."],
      ["Why are calls from my Google Business Profile better than bought leads?", "They're exclusive, there's no fee per lead, and the customer has already seen your reviews. Cost per job tends to fall as your profile and reviews grow."],
      ["How many leads should I test before judging a source?", "At least 20 leads per source, tracked to booked jobs. Fewer than that and one good or bad week can mislead you."],
    ],
  },
  {
    slug: "facebook-and-nextdoor-ads-for-contractors",
    path: "/guides/facebook-and-nextdoor-ads-for-contractors",
    title: "Do Facebook and Nextdoor Ads Work for Contractors?",
    description: "Do Facebook, Instagram and Nextdoor ads work for contractors? What they're good at, 2026 costs from official and benchmark sources, and how to run a small test.",
    h1: "Do Facebook and Nextdoor ads work for contractors?",
    lede: "They work for some jobs and waste money on others. Social ads are good at reaching homeowners before they need you. They're poor at catching someone whose basement is flooding right now.",
    eyebrow: "Paid social", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want campaigns that reach your past customers first?",
    content: `
<div class="callout"><p><strong>Short version:</strong> yes, for the right jobs. Facebook, Instagram and Nextdoor ads work best for seasonal offers, planned projects and retargeting people who already know you. They're weak for emergency repairs, where people search Google instead. Benchmarks updated September 2026 put Facebook lead-campaign costs for home and home improvement at $42.95 per lead. Test with a small, tracked budget before spending more.</p></div>
<h2>What social ads are good at, and what they're not</h2>
<p>Google catches people who are searching for you right now. Facebook, Instagram and Nextdoor reach people who aren't searching yet. That makes them a different tool.</p>
<table>
<tr><th>Good at</th><th>Trade examples</th></tr>
<tr><td>Seasonal offers</td><td>AC tune-ups in spring, furnace checks in fall, gutter cleaning, holiday lighting installs</td></tr>
<tr><td>Planned projects people think about for weeks</td><td>Decks, fences, painting, remodeling, landscaping</td></tr>
<tr><td>Retargeting site visitors and past customers</td><td>Reminding last year's tune-up customers, or people who priced a roof and didn't book</td></tr>
<tr><td>Maintenance plans and memberships</td><td>HVAC and pest control plans sold to homeowners nearby</td></tr>
<tr><td>Local awareness in a new town</td><td>Getting your name and truck known before the busy season</td></tr>
</table>
<p><strong>Weak at:</strong> emergency calls. A homeowner with no heat or a burst pipe goes to Google, not their feed. If most of your work is urgent repair, put that money into your <a href="/services/google-business-profile">Google Business Profile</a> and <a href="/guides/google-local-services-ads-cost-per-lead">Local Services Ads</a> first.</p>
<h2>What Facebook and Instagram ads cost</h2>
<p>Meta doesn't publish fixed prices. Ads are sold by auction, and ${META_PRICING()} says cost depends on your objective, bid strategy, ad quality and budget. It suggests starting with at least $5 and running for six days or more so the system can learn. Ads Manager will warn you if a budget is below its minimum.</p>
<p>For real-world numbers, ${LOCALIQ_FB()} (last updated September 23, 2026) report:</p>
<table>
<tr><th>Metric</th><th>Home and home improvement</th><th>All industries</th></tr>
<tr><td>Cost per click (traffic campaigns)</td><td>$0.63</td><td>$0.60</td></tr>
<tr><td>Click-through rate (traffic campaigns)</td><td>1.76%</td><td>1.93%</td></tr>
<tr><td>Conversion rate (lead campaigns)</td><td>5.32%</td><td>8.54%</td></tr>
<tr><td>Cost per lead (lead campaigns)</td><td>$42.95</td><td>$27.39</td></tr>
</table>
<p>Those are averages across many advertisers, not a quote. Lead-form leads from Facebook also tend to be colder than a phone call from Google, so your close rate will likely be lower. Judge them by cost per booked job.</p>
<h2>What Nextdoor ads cost</h2>
<p>Nextdoor is built around verified neighbors, which suits contractors who work a tight service area. ${ND_NAM()} says 77% of its members are homeowners (Nextdoor's own figure).</p>
<ul>
<li>${ND_LOCAL()} advertises ads for under $5 a day. You pick a daily budget, Nextdoor multiplies it by 30 for the monthly charge, and it repeats every 30 days until you cancel.</li>
<li>In the larger Ads Manager, you set a daily goal or a lifetime budget, and you're billed when your balance reaches a billing threshold. Bids are by impressions or clicks depending on your objective (${ND_QUICKSTART()}).</li>
<li>Targeting covers location, demographics such as homeownership and income, and interests. Ads Manager also offers lead-gen ad formats and lookalike audiences built from a customer list.</li>
</ul>
<p>Don't skip the free side. A free Nextdoor business page and neighbor recommendations often do more for a local plumber or handyman than paid ads do.</p>
<h2>How to run a small test</h2>
<ol>
<li><strong>Pick one offer and one season.</strong> "Spring AC tune-up, book by May 15" with a clear price beats a general "call us" ad.</li>
<li><strong>Pick one tight area.</strong> The neighborhoods or ZIP codes where you already have trucks and reviews.</li>
<li><strong>Set a fixed budget.</strong> For example $10 to $20 a day for 30 days, so $300 to $600 total. Write the number down before you start.</li>
<li><strong>Send people somewhere trackable.</strong> A call to a tracked number, or a page with a form that goes into your CRM. Use <a href="/services/call-tracking">call tracking</a> so social calls aren't mixed with Google calls.</li>
<li><strong>Answer every lead within minutes.</strong> Social leads cool fast. <a href="/services/ai-answering-service">AI answering</a> and <a href="/services/missed-call-text-back">missed-call text-back</a> catch the ones you can't.</li>
<li><strong>Retarget before you prospect.</strong> Upload your past-customer list as an audience first. They already trust you, so the cost per job is usually lowest there.</li>
<li><strong>Decide at day 30.</strong> Keep it if cost per booked job beats your other sources. Otherwise stop or change the offer.</li>
</ol>
<h2>What to track</h2>
<ul>
<li><strong>Cost per lead</strong>, compared with the $42.95 benchmark above.</li>
<li><strong>Booked jobs and cost per booked job</strong>, the number that decides it.</li>
<li><strong>Frequency.</strong> If the same people see your ad many times a week in a small area, results drop. Refresh the ad or widen the area.</li>
<li><strong>Click-through rate.</strong> Well under the 1.76% benchmark usually means the offer or photo isn't landing.</li>
<li><strong>Revenue from the campaign.</strong> Plug it into the <a href="/tools/marketing-roi-calculator">marketing ROI calculator</a>.</li>
</ul>
<h2>Common mistakes that waste the budget</h2>
<ul>
<li><strong>Boosting random posts.</strong> A boosted job photo with no offer and no way to book rarely brings calls. Run a real campaign with one goal.</li>
<li><strong>Targeting the whole metro.</strong> If your trucks cover ten ZIP codes, show the ad in those ten. Far-away leads cost the same and book less.</li>
<li><strong>Stock photos.</strong> Your truck, your crew and real jobs in local neighborhoods beat generic images, especially on Nextdoor.</li>
<li><strong>No follow-up.</strong> A lead-form contact that waits until tomorrow has often booked someone else. Text back within minutes and follow up twice.</li>
<li><strong>Judging by likes.</strong> Comments and shares feel good but don't pay. Count booked jobs.</li>
<li><strong>Running ads in your busy season.</strong> If you're booked two weeks out in July, pause. Spend in the shoulder months when trucks would otherwise sit.</li>
</ul>
<p>If you'd rather start with free reach, regular posts and seasonal campaigns to your own list often beat paid social. See <a href="/services/social-media-posting">social media posting</a>, <a href="/services/email-sms-campaigns">email and text campaigns</a> and the <a href="/guides/home-service-marketing-calendar">home-service marketing calendar</a>. Trade ideas: <a href="/marketing/hvac">HVAC</a>, <a href="/marketing/painting">painting</a>, <a href="/marketing/deck-builders">deck builders</a>, <a href="/marketing/holiday-lighting">holiday lighting</a>.</p>`,
    faq: [
      ["Do Facebook ads work for contractors?", "They work for seasonal offers, planned projects and retargeting past customers. They work poorly for emergency repairs, where people search Google instead."],
      ["How much do Facebook ads cost for home services?", "LocaliQ and WordStream's benchmarks, updated September 2026, put home and home improvement at $42.95 per lead for lead campaigns and $0.63 per click for traffic campaigns. Your costs will vary by area and offer."],
      ["Is Nextdoor advertising worth it for a contractor?", "It can be for a tight service area, since Nextdoor reports that 77% of its members are homeowners. Run a small tracked test and compare cost per booked job with your other sources."],
      ["What's the minimum budget for Nextdoor ads?", "Nextdoor advertises small-business ads for under $5 a day. The daily budget is multiplied by 30 and billed every 30 days until you cancel."],
      ["How long should I test social ads?", "About 30 days with a fixed budget and one offer. That's long enough to get leads and see which ones book."],
      ["Should I use Facebook lead forms or send people to my website?", "Lead forms are easier to fill out but often bring colder leads. Either works if the lead reaches you instantly and you call back within minutes."],
    ],
  },
  {
    slug: "google-local-services-ads-cost-per-lead",
    path: "/guides/google-local-services-ads-cost-per-lead",
    title: "Google Local Services Ads Cost Per Lead by Trade (2026)",
    description: "Google Local Services Ads cost per lead by trade: how Google prices leads, dated ranges from credible sources, the credit process, and how to lower your cost.",
    h1: "Google Local Services Ads cost per lead, by trade",
    lede: "Google doesn't publish a price list for Local Services Ads. Lead prices depend on your trade, town, lead type and bid. Here's how pricing works, what recent reports show by trade, and how to pay less per lead.",
    eyebrow: "Paid search", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want your reviews and response time working for your ads?",
    content: `
<div class="callout"><p><strong>Short version:</strong> you pay per lead, not per click, and the price depends on your location, job type, lead type and bid. One agency's Q1 2026 data put plumbing at $56.90 per lead, roofing at $65.80 and HVAC at $76.45, and other recent estimates run from about $25 to over $130. You lower the cost with more recent reviews, fast answers, accurate job types and hours, and by turning on message leads.</p></div>
<p>This guide covers lead prices. For how these ads compare with regular Google search ads, see <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>
<h2>How Google prices a lead</h2>
<p>From ${LSA_LEADS()}, ${LSA_BIDDING()} and ${LSA_TIPS()}, all checked November 2026:</p>
<ul>
<li><strong>You pay for leads, not clicks.</strong> Charged leads are answered calls, calls you return that reach the customer, messages, booking requests, and missed calls or voicemails during business hours where the caller stays on more than 20 seconds.</li>
<li><strong>Repeat contacts are free for 15 days.</strong> The same phone number or email contacting you again within 15 days of a charged lead isn't charged again.</li>
<li><strong>Price varies</strong> by location, job type, lead type and bidding mode. Google says pricing reflects how likely the customer is to book, including whether they contacted other advertisers. Message leads typically cost less than phone leads.</li>
<li><strong>Bidding.</strong> You can let Google maximize leads, set a target cost per lead, or set a manual maximum per lead. Your bid is a ceiling. Google suggests a budget for at least 10 leads a week and about two weeks to settle.</li>
<li><strong>Budget.</strong> You set a weekly budget, and your monthly maximum is roughly the weekly budget times the weeks in the month.</li>
</ul>
<h3>What's changing in 2026</h3>
<p>Per ${LSA_MIGRATION()}, Local Services Ads are moving into Google Ads as Performance Max campaigns with pay-per-lead goals. Selected US home-service advertisers started moving in August 2026, with service-area businesses following in late 2026. After the move, budgets become daily averages (monthly spend capped at the daily average times 30.4), manual bidding goes away, and manual lead disputes are no longer supported. Download your old performance reports before you migrate, because they don't carry over.</p>
<p>The badge also changed. Google retired the Google Guarantee badge and its money-back guarantee in late 2025 and moved advertisers who'd completed screening to a single ${LSA_VERIFIED()}. Google says that change doesn't affect ranking.</p>
<h2>Cost per lead by trade: what recent reports show</h2>
<p>No neutral, large dataset exists. Below are the most specific figures we could verify, with who reported them and when. Expect your market to differ.</p>
<table>
<tr><th>Trade</th><th>${NINETY9()} (Q1 2026)</th><th>${HOOK()} (2026 guide)</th></tr>
<tr><td>HVAC</td><td>$76.45</td><td>$60 to $120</td></tr>
<tr><td>Plumbing</td><td>$56.90</td><td>$70 to $130</td></tr>
<tr><td>Roofing</td><td>$65.80</td><td>$80 to $160</td></tr>
<tr><td>Electrical</td><td>$35.70</td><td>$50 to $100</td></tr>
<tr><td>General contracting</td><td>$50.17</td><td>Not given</td></tr>
<tr><td>Painting</td><td>$30.46</td><td>Not given</td></tr>
<tr><td>Pressure washing</td><td>$26.33</td><td>Not given</td></tr>
<tr><td>Landscaping</td><td>$25.20</td><td>Not given</td></tr>
<tr><td>Damage restoration</td><td>$194.00</td><td>Not given</td></tr>
</table>
<p>About these sources: 99 Calls is an agency. Its report covers 3,367 leads and $176,892 in spend on US contractor campaigns from January to March 2026, but doesn't say how many accounts it includes. Hook Agency's ranges are estimates from another agency. ${HCP_LSA()} cites Blue Grid Media's 2026 data for a broad range of $25 to $130+ per lead across home services. All read November 2026.</p>
<p>For scale, ${LOCALIQ_SEARCH()} put median <em>search ad</em> cost per lead at $127.74 for air conditioning, $129.02 for plumbing and $228.15 for roofing (April 2024 to March 2025). That's a different product, but it shows why many urgent-trade shops start with Local Services Ads.</p>
<h2>Getting credit for bad leads</h2>
<p>Per ${LSA_CREDITS()}:</p>
<ol>
<li><strong>Google screens leads at first contact.</strong> Leads judged invalid or low quality aren't charged.</li>
<li><strong>Charged leads are reviewed again.</strong> Low-quality ones can get automatic credits, usually within 30 days. The original charge still shows on your invoice, with the credit applied to your balance.</li>
<li><strong>Some leads aren't creditable anymore.</strong> Google no longer credits "job type not serviced" or "area not serviced" leads. Keep your job types and service area accurate, because a wrong setting now costs you.</li>
<li><strong>Rate your leads.</strong> Use "Rate this lead" in your leads list. Google says feedback can lead to a credit for leads in review, and it may occasionally credit leads reported this way.</li>
<li><strong>After migration,</strong> manual disputes are gone. Automatic credits and lead feedback are what's left.</li>
</ol>
<h2>How to lower your cost per lead</h2>
<ol>
<li><strong>Grow recent reviews.</strong> ${LSA_RANKING()} lists rating and review count as part of profile quality, and some business types need at least 5 reviews to show at all. Since mid-2025 these ads use your Google Business Profile reviews, so every <a href="/services/review-generation">review request</a> helps both. See <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</li>
<li><strong>Answer fast, every time.</strong> Google says missed calls and slow replies can hurt your ranking, and a fast average response time can show in your ad. <a href="/services/ai-answering-service">AI answering</a> picks up when you're on a job or already on the phone.</li>
<li><strong>Set hours you actually answer.</strong> Missed calls over 20 seconds during business hours are charged. Don't list hours your phone isn't covered.</li>
<li><strong>Turn on message leads.</strong> They're typically cheaper than calls, and they catch nights and weekends.</li>
<li><strong>Pick job types on purpose.</strong> Google suggests selecting every job type you do. Leave off what you don't do, since those leads no longer get credits.</li>
<li><strong>Add real photos.</strong> Google lists high-quality photos of your team and work as part of profile quality.</li>
<li><strong>Track booked jobs, not just leads.</strong> Tag every lead with its outcome. A $70 lead that books a $9,000 system beats three $30 leads that don't answer. <a href="/services/call-tracking">Call tracking</a> and a <a href="/services/crm-automation">CRM</a> make this easy.</li>
</ol>
<h2>Who manages it</h2>
<p>You can run Local Services Ads yourself in an hour a week if you answer leads and rate them. If you'd rather hand it off, our Google Ads and Local Services Ads management is {{PRICE:ads}}. See every package on the <a href="/pricing">pricing page</a>. Trade pages: <a href="/marketing/plumbing">plumbing</a>, <a href="/marketing/hvac">HVAC</a>, <a href="/marketing/garage-door-repair">garage door repair</a>, <a href="/marketing/roofing">roofing</a>.</p>`,
    faq: [
      ["How much does a Google Local Services Ads lead cost?", "Google doesn't publish prices. Recent agency reports put most home-service trades between about $25 and $130 per lead, with HVAC, plumbing and roofing toward the middle and damage restoration far higher."],
      ["Do I pay for every call from Local Services Ads?", "No. You pay for valid leads. Missed calls count only if they come during business hours and last over 20 seconds, and repeat contacts from the same customer within 15 days aren't charged again."],
      ["Can I dispute a Local Services Ads lead?", "Google credits many invalid leads automatically, usually within 30 days, and you can rate leads to give feedback. After the move into Google Ads, manual disputes are no longer supported."],
      ["Does the Google Guarantee badge still exist?", "No. Google replaced it in late 2025 with a single Google Verified badge for advertisers who complete screening, and ended the money-back guarantee."],
      ["How do I lower my Local Services Ads cost per lead?", "Build recent reviews, answer every call fast, list only hours you cover, turn on cheaper message leads and keep job types accurate."],
      ["Are message leads cheaper than phone leads?", "Yes. Google says message leads typically cost less than phone leads."],
    ],
  },
];
