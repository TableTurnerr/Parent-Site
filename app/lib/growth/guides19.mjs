// Buyer-intent guides (added 2026-11-28): the pages owners and AI assistants read when choosing a marketing company.
// 1. best-aeo-services-for-contractors  2. home-service-marketing-companies-compared
// 3. how-to-leave-your-marketing-agency  4. do-it-yourself-local-marketing-for-contractors
// Rules followed: no self-ranking (tables are alphabetical), competitor prices and terms only as read on the vendor's
// own page in November 2026 (linked and dated), complaint themes only from dated BBB/Trustpilot pages, stated factually.
// Scorpion's FAQ blocks automated readers (403); its terms here come from Scorpion's own FAQ text as indexed in
// search on 2026-11-27 and are worded as "Scorpion's FAQ says". Hibu's site also blocked us, so no Hibu price or term
// is stated beyond Hibu's own written reply on its BBB profile.
// Never state what happens to a client's website/domain when they leave TableTurnerr (unconfirmed by the owner).
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const CHK = "checked November 2026";
const PHONE = `<a href="tel:+13323331008">(332) 333-1008</a>`;

// Vendor pages (read November 2026)
const FOOTBRIDGE = (t = "Footbridge Media's program page") => A("https://footbridgemedia.com/contractor-marketing-program", t);
const THRYV_PRICE = (t = "Thryv's pricing page") => A("https://www.thryv.com/pricing/", t);
const THRYV_AEO = (t = "Thryv's AEO services page") => A("https://www.thryv.com/blog/aeo-services/", t);
const THRYV_TERMS = (t = "Thryv's terms") => A("https://www.thryv.com/thryv-ba-terms/", t);
const HOOK_PRICE = (t = "Hook Agency's pricing page") => A("https://hookagency.com/pricing/", t);
const HOOK_SEO = (t = "Hook Agency's SEO page") => A("https://hookagency.com/seo/", t);
const WEBFX_PRICE = (t = "WebFX's pricing page") => A("https://www.webfx.com/pricing/", t);
const WEBFX_AI = (t = "WebFX's AI SEO pricing page") => A("https://www.webfx.com/seo/pricing/ai-seo/", t);
const BLUECORONA = (t = "Blue Corona's digital marketing page") => A("https://www.bluecorona.com/digital-marketing", t);
const SCORPION_FAQ = (t = "Scorpion's FAQ") => A("https://www.scorpion.co/faq/", t);
// Review sites (read November 2026)
const BBB_THRYV = (t = "BBB") => A("https://www.bbb.org/us/tx/dallas/profile/marketing-software/thryv-0875-90044496/complaints", t);
const BBB_HIBU = (t = "BBB") => A("https://www.bbb.org/us/ia/cedar-rapids/profile/digital-marketing/hibu-inc-0664-32057924/complaints", t);
const BBB_SCORPION = (t = "BBB") => A("https://www.bbb.org/us/ca/valencia/profile/digital-marketing/scorpion-llc-1216-13207426/complaints", t);
const TP_THRYV = (t = "Trustpilot") => A("https://www.trustpilot.com/review/thryv.com", t);
const TP_HIBU = (t = "Trustpilot") => A("https://www.trustpilot.com/review/corporate.hibu.com", t);
const TP_SCORPION = (t = "Trustpilot") => A("https://www.trustpilot.com/review/scorpion.co", t);
const TP_FOOTBRIDGE = (t = "Trustpilot") => A("https://www.trustpilot.com/review/footbridgemedia.com", t);
const TP_WEBFX = (t = "Trustpilot") => A("https://www.trustpilot.com/review/www.webfx.com", t);
const TP_BLUECORONA = (t = "Trustpilot") => A("https://www.trustpilot.com/review/bluecorona.com", t);
// Primary sources
const G_AI = (t = "Google's guide to generative AI features") => A("https://developers.google.com/search/docs/fundamentals/ai-optimization-guide", t);
const BRIGHTLOCAL = (t = "BrightLocal's 2026 Local Consumer Review Survey") => A("https://www.brightlocal.com/research/local-consumer-review-survey/", t);
const AHREFS_SCHEMA = (t = "Ahrefs' 2026 schema test") => A("https://ahrefs.com/blog/schema-ai-citations/", t);
const G_USERS = (t = "Google's owners and managers help") => A("https://support.google.com/business/answer/3403100?hl=en", t);
const G_REQUEST = (t = "Google's request-ownership help") => A("https://support.google.com/business/answer/4566671?hl=en", t);
const G_ADS_ACCESS = (t = "Google Ads access levels") => A("https://support.google.com/google-ads/answer/9978556?hl=en", t);
const G_ADS_UNLINK = (t = "Google's unlink-a-manager help") => A("https://support.google.com/google-ads/answer/7456531", t);
const G_LSA_ACCESS = (t = "Local Services Ads access help") => A("https://support.google.com/localservices/answer/7652468?hl=en", t);
const G_LSA = (t = "Google's Local Services Ads help") => A("https://support.google.com/localservices/answer/6224841?hl=en", t);
const G_REVIEWS = (t = "Google's review policy") => A("https://support.google.com/business/answer/3474122?hl=en", t);
const G_REPLY = (t = "Google's review reply help") => A("https://support.google.com/business/answer/3474050?hl=en", t);
const ICANN_LOOKUP = (t = "ICANN Lookup") => A("https://lookup.icann.org/", t);
const ICANN_BLOG = (t = "ICANN's guide for domain owners") => A("https://www.icann.org/en/blogs/details/do-you-have-a-domain-name-heres-what-you-need-to-know-19-12-2017-en", t);
const FCC_PORT = (t = "the FCC's porting guide") => A("https://www.fcc.gov/consumers/guides/porting-keeping-your-phone-number-when-you-change-providers", t);

export const guides19 = [
  // ------------------------------------------------------------------ 1. BEST AEO SERVICES
  {
    slug: "best-aeo-services-for-contractors",
    path: "/guides/best-aeo-services-for-contractors",
    title: "Best AEO Services for Contractors (2026), Compared",
    description: "AEO services for contractors compared: published prices, contracts, what's included and how each measures AI results. Sourced, dated, not self-ranked.",
    h1: "Best AEO services for contractors, compared honestly",
    lede: "Seven ways a contractor can get AI search optimization, from doing it yourself to agency plans of $3,000 a month and more, with the prices and terms each one publishes (checked November 2026).",
    eyebrow: "AI search", readMinutes: 8, article: { date: DATE },
    ctaTitle: "Want to see what AI assistants say about you today?",
    content: `
<div class="callout"><p><strong>Short version:</strong> AEO for a contractor is mostly good local SEO: a complete Google profile, steady reviews, consistent listings and clear service pages, plus a monthly check of what AI assistants actually say. Published prices we found run from $249 a month (Footbridge Media) to $3,000 a month and up (WebFX's AI SEO plans), checked November 2026. Pick on budget, contract length and whether the provider shows you real AI answers each month, not on who calls themselves best.</p></div>
<h2>What AEO actually is for a contractor</h2>
<p>Answer engine optimization (AEO) means getting your business named when a homeowner asks ChatGPT, Gemini, Perplexity or Google's AI Mode who to call for a leaking water heater or a roof inspection. It matters: 45% of US consumers used AI tools for local recommendations in the past year, up from 6% the year before (${BRIGHTLOCAL()}, 1,002 adults, ${CHK}).</p>
<p>Google is plain about what it takes. Its 2026 guide says optimizing for generative AI search "is optimizing for the search experience, and thus still SEO." It also says you don't need special AI files or schema markup, and that no third-party tool has access to its ranking or AI systems (${G_AI()}, ${CHK}). An independent test backs this up: pages that added schema saw no real lift in AI citations (${AHREFS_SCHEMA()}, 1,885 pages, ${CHK}).</p>
<p>So when you compare AEO services, you're really comparing local SEO services, plus how honestly each one reports on AI answers.</p>
<h2>The comparison</h2>
<p>Listed alphabetically. We are one of the rows, and we didn't put ourselves first.</p>
<table>
<thead><tr><th>Option</th><th>Published price</th><th>Contract</th><th>What's included</th><th>How AI results are measured</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Do it yourself</td><td>$0 plus 2 to 3 hours a week</td><td>None</td><td>Whatever you do: Google profile, review asks, photos, listings</td><td>Ask the assistants yourself each month and write down who gets named</td><td>Owners with time and a small service area</td></tr>
<tr><td>Footbridge Media</td><td>$249/mo (${FOOTBRIDGE()})</td><td>Month to month, 90-day money-back guarantee</td><td>Website, Google profile management, automated review requests, citations, blog and service pages, AEO and GEO</td><td>Not described on the page</td><td>Owners who want a low monthly price and a new site</td></tr>
<tr><td>Freelancer</td><td>Varies by person</td><td>Whatever you sign</td><td>Whatever you agree in writing</td><td>Ask before you hire</td><td>Owners who know exactly what they want done</td></tr>
<tr><td>Hook Agency</td><td>Local SEO + AEO $3,750/mo (${HOOK_PRICE()})</td><td>SEO contracts start at 12 months, then month to month (${HOOK_SEO()})</td><td>Organic search, map pack, Google profile visibility, monthly video call</td><td>"25+ ChatGPT prompts, tracked and reported on monthly"</td><td>Larger contractors ready to commit a year</td></tr>
<tr><td>TableTurnerr</td><td>{{PRICE:planComplete}}</td><td>Month to month, no contract</td><td>Website, Google profile management, review requests, 4 service-and-town pages a month, AI search work</td><td>The same questions re-asked each month on ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity, reported with calls and rankings</td><td>Owners who want reviews, profile and AEO on one bill without a contract</td></tr>
<tr><td>Thryv</td><td>Plans at $99 and $399/mo; the $399 Signature plan lists an "SEO &amp; AEO custom website" (${THRYV_PRICE()}). Its done-for-you AEO is custom priced (${THRYV_AEO()}).</td><td>Renews automatically; cancel at least 30 days before the next period (${THRYV_TERMS()})</td><td>Listings on 60+ sites, Google profile help, reputation tools, website</td><td>Not specified on its AEO page</td><td>Owners who also want Thryv's software</td></tr>
<tr><td>WebFX</td><td>AI SEO from $3,000/mo (${WEBFX_AI()})</td><td>6-month commitment</td><td>AI visibility work across 10 AI answer engines, SEO plans from $2,900/mo (${WEBFX_PRICE()})</td><td>About 50 tracked prompts on its entry tier, in its own OmniSEO tool</td><td>Bigger budgets that want detailed AI tracking</td></tr>
</tbody>
</table>
<p>All prices and terms were read on each company's own page in November 2026 and can change. Confirm in writing before you sign.</p>
<h2>How we built this list</h2>
<ul>
<li><strong>Who's on it:</strong> companies that sell AEO or AI search work to home-service businesses and show up when owners search for it, plus the two options most agency lists leave out: a freelancer and doing it yourself.</li>
<li><strong>What we checked:</strong> each vendor's own pricing, program and terms pages. If a price wasn't on the vendor's page, we didn't print one.</li>
<li><strong>What we didn't do:</strong> we didn't hire these companies or test their results. Nobody paid to be listed.</li>
<li><strong>Order:</strong> alphabetical. A list written by one of the companies on it shouldn't crown itself, so we didn't.</li>
</ul>
<h2>Where each option is the better fit</h2>
<ul>
<li><strong>Tight budget, one truck:</strong> do it yourself first. Our <a href="/guides/do-it-yourself-local-marketing-for-contractors">free DIY plan</a> covers most of the basics in a few hours a week.</li>
<li><strong>Lowest published monthly price with a site included:</strong> Footbridge Media at $249 a month, month to month, with a 90-day money-back guarantee on its page.</li>
<li><strong>A large, multi-crew company with a year to invest:</strong> Hook Agency or WebFX, which publish deeper SEO plans and named prompt-tracking numbers.</li>
<li><strong>You already want an all-in-one software platform:</strong> Thryv, if you're comfortable with its renewal terms.</li>
<li><strong>Reviews, Google profile, website and AEO in one place, no contract:</strong> that's where we fit. If you only want an AEO audit or a single service, we're not the right pick, since we sell fixed packages.</li>
</ul>
<h2>Questions to ask any AEO provider</h2>
<ol>
<li>Which AI assistants do you check, which questions do you ask, and can I see last month's answers word for word?</li>
<li>What exactly do you change each month: Google profile, reviews, listings, pages?</li>
<li>How long is the contract, does it renew on its own, and how much notice do I give to leave?</li>
<li>Who owns the website, domain and Google profile if I cancel? Put the answer in the agreement.</li>
<li>What results have you gotten for a contractor in my trade, with a public profile I can check?</li>
</ol>
<h2>What we'd skip paying for</h2>
<ul>
<li><strong>"#1 in ChatGPT, guaranteed."</strong> Nobody controls what an assistant says, and answers change between questions.</li>
<li><strong>Schema or llms.txt sold as the AI fix.</strong> Google says neither is needed for its AI features, and the Ahrefs test found no lift from schema.</li>
<li><strong>A single "AI visibility score"</strong> with no actual answers behind it. Ask to see the answers.</li>
</ul>
<p>For the full how-to, read <a href="/guides/how-to-get-recommended-by-chatgpt">how to get recommended by ChatGPT</a>, or see what our <a href="/services/ai-search-optimization">AI search optimization</a> work includes. It costs {{PRICE:aeo}}. Want a no-cost starting point? Get a <a href="/free-google-maps-audit">free Google Maps audit</a>. To compare full-service agencies on price and contract terms, see <a href="/guides/home-service-marketing-companies-compared">home service marketing companies compared</a>.</p>
<h2>Sources</h2>
<ul>
<li>${G_AI()}, ${CHK}</li>
<li>${BRIGHTLOCAL()}, published February 2026</li>
<li>${AHREFS_SCHEMA()}, published May 2026</li>
<li>${FOOTBRIDGE()}, ${HOOK_PRICE()}, ${HOOK_SEO()}, ${THRYV_PRICE()}, ${THRYV_AEO()}, ${THRYV_TERMS()}, ${WEBFX_PRICE()}, ${WEBFX_AI()}, all ${CHK}</li>
</ul>`,
    faq: [
      ["What is the best AEO service for contractors?", "It depends on budget and contract tolerance. Published prices in November 2026 ranged from $249 a month at Footbridge Media to $3,000 a month and up at WebFX, and doing the basics yourself costs nothing but time."],
      ["Is AEO different from SEO?", "Mostly not. Google's 2026 guide says optimizing for its AI features is still SEO, so a strong Google profile, steady reviews, consistent listings and clear service pages do most of the work."],
      ["How much does AEO cost for a contractor?", "From $0 if you do it yourself to several thousand dollars a month at large agencies. Footbridge Media lists $249 a month, Hook Agency $3,750 for local SEO plus AEO, and WebFX $3,000 and up for AI SEO, all checked November 2026."],
      ["Do I need schema markup or an llms.txt file to show up in AI answers?", "No. Google says neither is required for its AI features, and a 2026 Ahrefs test of 1,885 pages found no meaningful lift in AI citations from adding schema."],
      ["How do I know if AEO is working?", "Ask the provider to show the actual answers from each assistant for the same questions every month, next to your calls and Google profile numbers. A score with no answers behind it tells you little."],
      ["Why isn't TableTurnerr ranked first on this list?", "Because a list written by one of the companies on it shouldn't crown itself. The table is alphabetical, and each row says who that option fits best."],
    ],
  },

  // ------------------------------------------------------------------ 2. MARKETING COMPANIES COMPARED
  {
    slug: "home-service-marketing-companies-compared",
    path: "/guides/home-service-marketing-companies-compared",
    title: "Home Service Marketing Companies: Prices and Contracts",
    description: "Scorpion, Hibu, Thryv, Footbridge, Hook, WebFX, Blue Corona and others compared on published price, contract length, auto-renewal and public complaints.",
    h1: "Home service marketing companies: prices and contracts compared",
    lede: "Nine options side by side, with only the prices and terms each company publishes and the complaint themes on public review sites (checked November 2026). No winner crowned.",
    eyebrow: "Choosing a marketing company", readMinutes: 8, article: { date: DATE },
    ctaTitle: "Not sure which way to go? Ask us straight.",
    content: `
<div class="callout"><p><strong>Short version:</strong> most home-service marketing companies don't publish prices. Of those that do, we found $249 a month (Footbridge Media), $99 to $399 (Thryv's plans), $3,500 to $10,000 (Blue Corona) and $3,750 for local SEO plus AEO (Hook Agency), checked November 2026. Contract terms differ more than prices: from month to month to 12-month starts and automatic renewals. Read the term, renewal and ownership lines before you look at anything else.</p></div>
<h2>Prices and contracts at a glance</h2>
<p>Alphabetical. "Not published" means we couldn't find a price on the company's own site.</p>
<table>
<thead><tr><th>Company</th><th>Published price</th><th>Contract length</th><th>Renewal</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Blue Corona</td><td>$3,500 to $10,000/mo, depending on package (${BLUECORONA()})</td><td>No fixed term: "We won't handcuff you"</td><td>No term to renew</td><td>Established companies with a real ad budget</td></tr>
<tr><td>Footbridge Media</td><td>$249/mo (${FOOTBRIDGE()})</td><td>Month to month; 90-day money-back guarantee</td><td>Monthly</td><td>Small contractors who want a site and basics cheaply</td></tr>
<tr><td>Freelancer</td><td>Varies</td><td>Whatever you sign</td><td>Whatever you sign</td><td>Owners who can manage the work and check it</td></tr>
<tr><td>Hibu</td><td>Not published</td><td>An initial term, then monthly. Hibu's own reply on BBB: "All Hibu contracts are moved to month-to-month billing after the initial term period."</td><td>Moves to monthly billing</td><td>Owners who want a local rep and bundled ads</td></tr>
<tr><td>Hook Agency</td><td>Local SEO + AEO $3,750/mo; Google Ads + LSA from $2,000/mo (${HOOK_PRICE()})</td><td>SEO starts at 12 months (${HOOK_SEO()})</td><td>Month to month after 12 months</td><td>Bigger contractors ready to commit a year</td></tr>
<tr><td>Scorpion</td><td>Not published</td><td>${SCORPION_FAQ()} says typically 12 months for its technology and SEO; Google Ads, LSA and Meta typically month to month</td><td>Not stated in the FAQ; check the agreement</td><td>Multi-location companies that want one large vendor and its own platform</td></tr>
<tr><td>TableTurnerr</td><td>{{PRICE:plans}}</td><td>No contract</td><td>Monthly, or 2 months free if paid yearly</td><td>Owners who want reviews, profile, AI answering and marketing in fixed packages</td></tr>
<tr><td>Thryv</td><td>$99 and $399/mo plans; custom above that (${THRYV_PRICE()})</td><td>Set by your subscription period</td><td>Annual periods renew annually, shorter ones monthly; cancel 30+ days before the next period (${THRYV_TERMS()})</td><td>Owners who want software and marketing from one company</td></tr>
<tr><td>WebFX</td><td>SEO from $2,900/mo (${WEBFX_PRICE()}); AI SEO from $3,000/mo (${WEBFX_AI()})</td><td>6 months</td><td>Not stated on the pricing page</td><td>Larger companies that want detailed reporting</td></tr>
</tbody>
</table>
<p>Website ownership matters as much as price. Blue Corona says "You'll own all your deliverables, including your website." Footbridge says it will help you take your site with you. Scorpion's FAQ says you own the site after the contract term, but not the platform it runs on. For us: ask us, and get it in writing.</p>
<h2>What public reviews complain about</h2>
<p>From each company's BBB and Trustpilot pages, ${CHK}. Big companies have more customers, so they get more complaints. Read the themes, not just the counts.</p>
<table>
<thead><tr><th>Company</th><th>BBB</th><th>Trustpilot</th><th>Common complaint themes</th></tr></thead>
<tbody>
<tr><td>Blue Corona</td><td>Not checked</td><td>No reviews yet (${TP_BLUECORONA()})</td><td>Too few public reviews to summarize</td></tr>
<tr><td>Footbridge Media</td><td>No profile found</td><td>4.1 from 7 reviews (${TP_FOOTBRIDGE()})</td><td>One negative review: Google profile not managed, guarantee dispute. Too few reviews to call a pattern.</td></tr>
<tr><td>Hibu</td><td>A+, accredited; 110 complaints in 3 years, 40 in the last 12 months (${BBB_HIBU()})</td><td>4.6 from 1,136 reviews (${TP_HIBU()})</td><td>Cancellation requests not processed, billing after cancelling, moves to monthly billing after the term, hard to reach a rep</td></tr>
<tr><td>Hook Agency</td><td>Not checked</td><td>No page found</td><td>Too few public reviews to summarize</td></tr>
<tr><td>Scorpion</td><td>A+, accredited; 6 complaints in 3 years, 4 in the last 12 months (${BBB_SCORPION()})</td><td>3.9 from 36 reviews (${TP_SCORPION()})</td><td>Unclear 12-month commitment, slow handover of hosting, ad accounts and Google profile on exit, unspent ad funds</td></tr>
<tr><td>Thryv</td><td>A+, accredited; 336 complaints in 3 years, 80 in the last 12 months (${BBB_THRYV()})</td><td>2.6 from 458 reviews (${TP_THRYV()})</td><td>Auto-renewals customers didn't expect, cancellations not processed, billing after cancelling, unfinished listings or sites</td></tr>
<tr><td>WebFX</td><td>Not checked</td><td>3.4 from 23 reviews (${TP_WEBFX()})</td><td>Cost for the work delivered, long contracts, service slipping after an account manager change</td></tr>
</tbody>
</table>
<p>Every company here also has happy customers. Positive reviews for Hibu, Scorpion and Thryv often name a helpful rep. Trustpilot notes it doesn't fact-check reviews, and BBB shows only some complaints.</p>
<h2>Where each company is the better fit</h2>
<ul>
<li><strong>Blue Corona:</strong> a company with $3,500 a month or more to spend that wants no fixed term and full ownership of the site.</li>
<li><strong>Footbridge Media:</strong> a small contractor who needs a website and the basics at the lowest published price.</li>
<li><strong>Hibu:</strong> an owner who wants a local rep handling ads and a site, and reads the initial term closely.</li>
<li><strong>Hook Agency and WebFX:</strong> larger contractors with a growth budget who are fine with 6 to 12 months up front.</li>
<li><strong>Scorpion:</strong> multi-location or franchise operations that want a single big vendor and its technology.</li>
<li><strong>Thryv:</strong> owners who want software, listings and marketing from one place and will diary the renewal date.</li>
<li><strong>A freelancer:</strong> owners who know what they need and will check the work.</li>
<li><strong>TableTurnerr:</strong> owners who want reviews, Google profile, AI answering and marketing in fixed packages, with Jobber as an official integration and other software through Zapier or Make. Not a fit if you want one service on its own.</li>
</ul>
<h2>How to compare two quotes fairly</h2>
<p>A $249 plan and a $3,750 plan aren't the same product, so line them up on the work, not the price.</p>
<ul>
<li><strong>Write down the monthly deliverables.</strong> How many new pages, how many Google profile posts, whether review requests go out automatically, whether ads are managed and who pays the ad spend.</li>
<li><strong>Add the first year's total.</strong> Monthly fee times the minimum term, plus setup or onboarding fees. A cheap monthly price on a 12-month term can cost more than a pricier one you can leave after 30 days.</li>
<li><strong>Ask for one client in your trade.</strong> A roofer and a pest control company need different things. Ask for a Google profile you can look up yourself, not a logo on a slide.</li>
<li><strong>Ask what the report shows.</strong> Calls, booked jobs and reviews are what matter to most owners. Impressions and "visibility" are harder to take to the bank.</li>
<li><strong>Ask who does the work.</strong> The person on the sales call is often not the person running your account.</li>
</ul>
<h2>Five lines to check before you sign</h2>
<ol>
<li><strong>Term:</strong> how many months, and what you owe if you leave early.</li>
<li><strong>Renewal:</strong> does it renew on its own, for how long, and how many days' notice you need.</li>
<li><strong>Ownership:</strong> domain, website files, Google profile, ad accounts, phone numbers.</li>
<li><strong>Price changes:</strong> can they raise the price mid-term, and with how much notice.</li>
<li><strong>Disputes:</strong> some agreements send disputes to binding arbitration. Thryv's terms, for example, do.</li>
</ol>
<p>Want typical price ranges by service? See <a href="/guides/home-service-marketing-agency-cost">what a home-service marketing agency costs</a>. Comparing AI search work only? See <a href="/guides/best-aeo-services-for-contractors">best AEO services for contractors</a>. Already with an agency and want out? Read <a href="/guides/how-to-leave-your-marketing-agency">how to leave your marketing agency</a>. Our own prices are all on <a href="/pricing">the pricing page</a>, and our software-switch pages are under <a href="/alternatives">alternatives</a>.</p>
<h2>How we built this</h2>
<p>We read each company's pricing, FAQ and terms pages and their BBB and Trustpilot pages in November 2026. Scorpion's and Hibu's websites blocked our reader, so their rows use only Scorpion's FAQ text and Hibu's own written reply on BBB, and show "Not published" for price. We didn't hire any company here. Prices and terms change; confirm them in writing.</p>`,
    faq: [
      ["Which home service marketing company is best?", "There isn't one best for everyone. The right pick depends on your budget, how long a contract you'll accept and who owns your website and accounts. Compare those three before anything else."],
      ["Does Scorpion require a contract?", "Scorpion's FAQ says it typically requires a 12-month contract for its marketing technology and SEO, while Google Ads, LSA and Meta ads are typically month to month. Check your own agreement for the exact terms."],
      ["How much does Thryv cost?", "Thryv's pricing page listed plans at $99 and $399 a month in November 2026, with custom pricing above that. Its terms say plans renew automatically unless you cancel at least 30 days before the next period."],
      ["Does Hibu auto-renew?", "Hibu's own reply on its BBB profile says all Hibu contracts move to month-to-month billing after the initial term period. Hibu doesn't publish prices on its site."],
      ["Which marketing companies are month to month?", "Of the companies we checked in November 2026, Footbridge Media and Blue Corona say they don't lock you into a fixed term, and TableTurnerr has no contract. Hook Agency starts SEO at 12 months and WebFX lists a 6-month commitment."],
      ["Are BBB complaint counts a fair way to compare agencies?", "Only partly. Larger companies have more customers and so more complaints. The themes, such as billing after cancelling, matter more than the raw number."],
    ],
  },

  // ------------------------------------------------------------------ 3. HOW TO LEAVE YOUR AGENCY
  {
    slug: "how-to-leave-your-marketing-agency",
    path: "/guides/how-to-leave-your-marketing-agency",
    title: "How to Leave Your Marketing Agency and Keep Your Stuff",
    description: "Leaving a marketing agency? Get your domain, website, Google Business Profile, ad accounts, phone numbers and customer list back first. Steps plus an email.",
    h1: "How to leave your marketing agency and take your stuff with you",
    lede: "Cancel last, not first. Here's the order to get your domain, website, Google profile, ad accounts, tracking numbers and customer list back, plus an email you can send today.",
    eyebrow: "Switching agencies", readMinutes: 8, article: { date: DATE },
    ctaTitle: "Want help untangling an old agency setup?",
    content: `
<div class="callout"><p><strong>Short version:</strong> before you cancel, make sure you are the owner of your domain, your Google Business Profile and your Google Ads and Local Services Ads accounts, and that you have a backup of your website and an export of your customer list. Ask for anything missing in one written email. Cancel only when you have it, and keep proof of the date you gave notice.</p></div>
<h2>Step 1: Read your contract first</h2>
<p>Find four things: the end date, how much notice you must give, whether it renews on its own, and any line about who owns the website, domain or accounts. Mark the notice deadline on your calendar. Some agreements require notice weeks before the renewal date. Thryv's terms, for example, ask for notice at least 30 days before the next period (${THRYV_TERMS("Thryv's terms")}, ${CHK}).</p>
<h2>Step 2: Make a list of what's yours</h2>
<table>
<thead><tr><th>What</th><th>How to check who controls it</th><th>What to ask for</th></tr></thead>
<tbody>
<tr><td>Domain name</td><td>Look it up on ${ICANN_LOOKUP()} to see the registrar, then check who's listed as registrant</td><td>Registrant changed to you, or the transfer code</td></tr>
<tr><td>Website</td><td>Ask where it's hosted and on what platform</td><td>A full backup or export: files, content, images</td></tr>
<tr><td>Google Business Profile</td><td>Open business.google.com and check your role</td><td>Primary owner, in your Google account</td></tr>
<tr><td>Google Ads and Local Services Ads</td><td>Check whether your own Google account has Admin access</td><td>Admin access for you; the agency's manager link removed when you leave</td></tr>
<tr><td>Google Analytics and Search Console</td><td>Check your user role</td><td>Admin or owner access for you</td></tr>
<tr><td>Call-tracking numbers</td><td>Ask whose account the numbers are in</td><td>Numbers ported to your own phone provider</td></tr>
<tr><td>Reviews and customer list</td><td>Reviews live on your Google profile; contacts may sit in their CRM or review tool</td><td>A CSV export of every contact and job</td></tr>
<tr><td>Facebook, Instagram, Nextdoor</td><td>Check whether you're an admin</td><td>Full admin rights for you, agency removed after</td></tr>
</tbody>
</table>
<h2>Step 3: Take back each piece</h2>
<ol>
<li><strong>Domain.</strong> If the agency is the registrant, ask them to change it to your name and email. To move registrars, you need the transfer code. ICANN says your registrar must provide it within five calendar days of your request, and a transfer can be refused if you're not the registrant of record (${ICANN_BLOG()}, ${CHK}). Never let the domain lapse during a dispute.</li>
<li><strong>Website.</strong> Ask for a complete backup. If the site runs on the agency's own platform, you may get files and content but not the system it runs on. Scorpion's FAQ, for example, says clients own the site after the contract but not the platform (${SCORPION_FAQ()}). Plan for a rebuild if so.</li>
<li><strong>Google Business Profile.</strong> A profile can have several owners but only one primary owner. New owners must wait 7 days before they can be made primary owner (${G_USERS()}, ${CHK}). So have the agency add you as owner now, then transfer primary ownership a week later. If they won't respond, you can request access. Google gives the current owner 3 days to reply (${G_REQUEST()}). See also <a href="/guides/how-to-claim-google-business-profile">how to claim your Google Business Profile</a>.</li>
<li><strong>Google Ads and Local Services Ads.</strong> Make sure your own Google account has Admin access, the only level that can manage users and remove manager-account links (${G_ADS_ACCESS()}). When you leave, remove the agency's manager link (${G_ADS_UNLINK()}) and their users (${G_LSA_ACCESS()}).</li>
<li><strong>Tracking numbers.</strong> The numbers on your trucks and listings may belong to the agency's phone account. Per ${FCC_PORT()}, you can keep a number when you switch providers in the same area, simple ports are processed in one business day, and you should not cancel the old service before the new provider starts the port (${CHK}). If the number sits in the agency's account, they control it, so get their written agreement to release it.</li>
<li><strong>Reviews and contacts.</strong> Google reviews stay on your profile, so owning the profile keeps them. Export your customer list, job history and any review-request data from their tools as a CSV.</li>
<li><strong>Social accounts.</strong> Get added as a full admin, then remove agency staff once you've confirmed it works.</li>
<li><strong>Cancel in writing.</strong> Send notice by email, save the reply, and check your next card statement.</li>
</ol>
<h2>Copy-paste email to your old agency</h2>
<p>Subject: Account handover for [Business name]</p>
<p>Hi [Name],</p>
<p>We're making changes to our marketing. Before anything else, please send or set up the following by [date, 10 business days out]:</p>
<ul>
<li>Domain [yourdomain.com]: registrant changed to [your name, your email], or the transfer code.</li>
<li>A full backup of our website: files, content and images.</li>
<li>Owner access to our Google Business Profile for [your Gmail], then primary ownership after Google's 7-day wait.</li>
<li>Admin access to our Google Ads, Local Services Ads, Google Analytics and Search Console for [your Gmail].</li>
<li>A list of every phone number used for us and whose account it's in, and your approval to port them to us.</li>
<li>A CSV export of all our customer contacts, jobs and review requests.</li>
<li>Admin access to our Facebook, Instagram and any other social pages.</li>
</ul>
<p>Please also confirm our contract end date and the notice you need from us. Thanks,<br>[Your name, phone]</p>
<h2>If the agency won't cooperate</h2>
<p>Most agencies hand things over once asked in writing. If yours stalls, you still have options.</p>
<ul>
<li><strong>Google profile:</strong> use Google's request-access process. The current owner gets 3 days to respond, and if they don't, you may be able to claim the profile yourself (${G_REQUEST()}).</li>
<li><strong>Domain:</strong> if you're the registrant, contact the registrar directly for the transfer code. If the agency registered it in its own name, your contract and any invoices showing you paid for it are your best evidence.</li>
<li><strong>Google Ads:</strong> if you can't get Admin access to the old account, you can open a new account in your name. You lose the history, but you stop paying into an account you don't control.</li>
<li><strong>Phone numbers:</strong> if a number can't be released, update your Google profile, website and truck wraps to a number you own, and keep the old one forwarding as long as you can.</li>
<li><strong>Keep a paper trail:</strong> dates of every request, copies of every email, and the contract. If it turns into a billing dispute, that record is what counts.</li>
</ul>
<h2>Before you sign with the next company</h2>
<ul>
<li>The domain, Google profile and ad accounts are in your name from day one. Agencies get added as users.</li>
<li>The term, notice period and renewal rule are written in plain words.</li>
<li>It says in writing what you keep if you leave: website files, content, phone numbers, data exports.</li>
<li>There's a named person you can reach and a monthly report you can understand.</li>
<li>No "#1 on Google" or "#1 in ChatGPT" guarantees.</li>
</ul>
<p>Hold us to the same list. We're month to month with no contract, and our prices are on <a href="/pricing">the pricing page</a> ({{PRICE:plans}}). Ask us what you keep if you leave, and get it in writing before you sign. Comparing companies? See <a href="/guides/home-service-marketing-companies-compared">home service marketing companies compared</a> and <a href="/alternatives">alternatives</a>. A messy Google profile handover is common: Cooling Comfort's profile was stuck for months and <a href="/results/cooling-comfort">got verified 3 days after one free call</a>. For a free look at where you stand, get a <a href="/free-google-maps-audit">free Google Maps audit</a>, or call ${PHONE}.</p>`,
    faq: [
      ["Can a marketing agency keep my website when I cancel?", "It depends on your contract. Some agencies hand over the site, others keep the platform it runs on and give you only files and content. Read the ownership clause and get the handover terms in writing before you give notice."],
      ["How do I get my Google Business Profile back from an agency?", "Ask them to add your Google account as an owner, then transfer primary ownership after Google's 7-day wait. If they don't respond, request access through Google, which gives the current owner 3 days to reply."],
      ["How do I find out who owns my domain name?", "Look it up on ICANN Lookup to find the registrar, then check who is listed as registrant. If it isn't you, ask the agency to change it or give you the transfer code, which ICANN says the registrar must provide within five calendar days."],
      ["Can I keep my call-tracking phone numbers?", "Often, yes. The FCC says you can keep a number when you change providers in the same area. If the number sits in the agency's account, you need their agreement, so ask in writing before you cancel."],
      ["Do I lose my Google reviews if I leave my agency?", "No. Reviews live on your Google Business Profile, so as long as you own the profile, they stay. Export any contact lists from the agency's review tool, though."],
      ["Should I cancel first or get my accounts first?", "Get your accounts first. Cancelling first gives up your leverage and can leave your domain, phone numbers or profile in limbo."],
    ],
  },

  // ------------------------------------------------------------------ 4. DIY LOCAL MARKETING
  {
    slug: "do-it-yourself-local-marketing-for-contractors",
    path: "/guides/do-it-yourself-local-marketing-for-contractors",
    title: "DIY Local Marketing for Contractors: The Free Version",
    description: "The free version of local marketing a contractor can do in 2 to 3 hours a week: Google profile, reviews, photos, replies, LSA and website checks, with times.",
    h1: "Do-it-yourself local marketing for contractors: the honest free version",
    lede: "Most of what a marketing company does for a small contractor, you can do yourself in 2 to 3 hours a week. Here's the list, how long each part takes, and when paying someone is actually worth it.",
    eyebrow: "Do it yourself", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Rather hand it off? See what it costs.",
    content: `
<div class="callout"><p><strong>Short version:</strong> a contractor can cover the basics alone: a complete Google Business Profile, asking every customer for a review, replying to every review, posting real job photos, setting up Local Services Ads and checking the website works on a phone. Plan about 4 to 6 hours to set up, then 2 to 3 hours a week. Pay someone when you're not doing it consistently, or when you need skills like ad management, follow-up systems or call answering.</p></div>
<h2>The weekly list, with time estimates</h2>
<p>Times are our estimates for a small, single-location contractor. Yours depend on how many jobs you run.</p>
<table>
<thead><tr><th>Task</th><th>How often</th><th>Time</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td>Ask each customer for a Google review</td><td>After every job</td><td>1 to 2 min a job (about 30 min a week)</td><td>Reviews are the biggest thing you control in Maps</td></tr>
<tr><td>Reply to every new review</td><td>Weekly</td><td>15 to 20 min</td><td>Shows the next customer you care</td></tr>
<tr><td>Add 3 to 5 real job photos to your profile</td><td>Weekly</td><td>10 to 15 min</td><td>Real trucks and crews beat stock images</td></tr>
<tr><td>One Google profile post</td><td>Weekly</td><td>10 to 15 min</td><td>Keeps the profile current for people who find it</td></tr>
<tr><td>Check hours, services and phone are right</td><td>Monthly</td><td>15 min</td><td>Wrong hours lose calls</td></tr>
<tr><td>Review Local Services Ads leads and dispute bad ones</td><td>Weekly, if you run LSA</td><td>20 to 30 min</td><td>You pay per lead, so check them</td></tr>
<tr><td>Check the website on your phone</td><td>Monthly</td><td>15 min</td><td>Broken buttons and forms cost jobs</td></tr>
<tr><td>Ask the AI assistants who they'd call for your trade in your town</td><td>Monthly</td><td>15 min</td><td>Shows whether you're being named</td></tr>
</tbody>
</table>
<p>Total: about 2 to 3 hours a week once it's routine.</p>
<h2>One-time setup (first month)</h2>
<ol>
<li><strong>Finish your Google Business Profile (2 to 3 hours).</strong> Primary category, real business name, service areas, hours, every service, a description and 10 or more real photos. Follow our <a href="/guides/google-business-profile-optimization">Google Business Profile checklist</a>.</li>
<li><strong>Make a review link and card (30 minutes).</strong> Google lets you share a link or QR code that opens the review form (${G_REVIEWS()}). Put it in your invoice text, on a card and on your truck. Don't offer discounts or gifts for reviews: Google prohibits it. See <a href="/guides/google-review-qr-code-and-nfc-cards">review QR codes and NFC cards</a>.</li>
<li><strong>Apply for Local Services Ads (1 to 2 hours, plus waiting).</strong> You pay for leads, not clicks, and the Google Verified badge requires passing Google's screening (${G_LSA()}, ${CHK}). Have your license and business registration ready. Read <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a> and <a href="/guides/google-local-services-ads-cost-per-lead">LSA cost per lead</a> first.</li>
<li><strong>Check your website (1 hour).</strong> See the list below.</li>
</ol>
<h2>Simple website checks</h2>
<ul>
<li>Your phone number is at the top and calls when tapped on a phone.</li>
<li>Each main service has its own page that names the towns you serve.</li>
<li>The contact form sends to an inbox someone checks. Test it.</li>
<li>Business name, phone and address match your Google profile exactly.</li>
<li>It loads in a few seconds on mobile data.</li>
</ul>
<p>If it fails several of these, read <a href="/guides/why-your-website-isnt-getting-leads">why your website isn't getting leads</a>.</p>
<h2>How to ask for reviews and reply</h2>
<p>Ask in person at the end of the job, then send the link by text the same day. Something like: "Thanks for having us out today. If we did a good job, a quick Google review helps a small business like ours a lot: [link]." Ask every customer, not only the happy ones. Selective asking is called review gating; see <a href="/guides/is-review-gating-allowed">whether review gating is allowed</a>.</p>
<p>Reply to every review, good or bad. Google lets owners reply publicly (${G_REPLY()}). Thank people by name and mention the job. For bad ones, stay calm and offer to fix it offline: <a href="/guides/how-to-respond-to-negative-google-reviews">how to respond to negative reviews</a>.</p>
<h2>Photo and post ideas by trade</h2>
<p>Real photos do two jobs: they show customers who'll turn up at the door, and they give you something to post each week without writing much.</p>
<table>
<thead><tr><th>Trade</th><th>Photos that work</th><th>A simple weekly post</th></tr></thead>
<tbody>
<tr><td>HVAC</td><td>New condenser installs, clean filter swaps, the tech with the van</td><td>"Tune-up season: book before the first heat wave"</td></tr>
<tr><td>Plumbing</td><td>Water heater swaps, before-and-after drains, a tidy finished vanity</td><td>"What to do in the first 5 minutes of a leak"</td></tr>
<tr><td>Roofing</td><td>Drone shots of finished roofs, storm damage before repair, crew on site</td><td>"Free roof check after this week's hail"</td></tr>
<tr><td>Electrical</td><td>Panel upgrades, EV charger installs, clean lighting jobs</td><td>"Signs your panel needs an upgrade"</td></tr>
<tr><td>Landscaping</td><td>Before-and-after yards, seasonal cleanups, the crew and trucks</td><td>"Fall cleanup slots open in [town]"</td></tr>
</tbody>
</table>
<p>Keep customer faces and house numbers out unless you've asked. For more, see <a href="/guides/google-business-profile-photos-and-posts">Google Business Profile photos and posts</a>.</p>
<h2>A sample week</h2>
<ul>
<li><strong>Every job:</strong> ask for the review in person, text the link before you leave the driveway, snap two photos.</li>
<li><strong>Monday, 30 minutes:</strong> reply to last week's reviews and check Local Services Ads leads.</li>
<li><strong>Wednesday, 20 minutes:</strong> upload the week's best photos and write one post.</li>
<li><strong>First Friday of the month, 45 minutes:</strong> check hours and services, test the website on your phone, and ask two AI assistants who they'd call for your trade in your town.</li>
</ul>
<h2>Where DIY usually breaks down</h2>
<ul>
<li><strong>Consistency.</strong> Review asks stop the first busy week in July. Ten reviews in one month and none for six looks worse than two a week.</li>
<li><strong>Missed calls.</strong> You can't answer the phone on a roof. Many customers call the next company instead.</li>
<li><strong>Follow-up.</strong> Unsigned estimates and past customers due for service go cold without reminders.</li>
<li><strong>Google Ads.</strong> Owners in ${A("https://community.getjobber.com/discussions/green-and-exterior-services/are-local-marketing-companies-worth-hiring-to-manage-your-online-presence/13117", "contractor forums")} often say ads are the one thing worth paying a pro for, because wasted spend adds up fast.</li>
</ul>
<h2>When paying someone is worth it</h2>
<table>
<thead><tr><th>Situation</th><th>Keep doing it yourself</th><th>Pay someone</th></tr></thead>
<tbody>
<tr><td>You ask for reviews after every job</td><td>Yes</td><td>Only if it keeps slipping</td></tr>
<tr><td>You miss calls while on jobs</td><td>Hard to fix alone</td><td>Text-back or AI answering</td></tr>
<tr><td>Estimates go unsigned</td><td>Possible with a reminder habit</td><td>Automated follow-ups</td></tr>
<tr><td>You run Google Ads</td><td>Only if you know the platform</td><td>Usually worth it</td></tr>
<tr><td>You serve one small town</td><td>Yes</td><td>Rarely needed</td></tr>
<tr><td>You serve many towns and want to rank in each</td><td>Slow</td><td>Service-and-town pages and local SEO</td></tr>
</tbody>
</table>
<h2>What we charge to do it for you</h2>
<p>We sell {{PRICE:plans}}. The Reviews package handles review requests, AI replies and missed-call text-back for {{PRICE:from}}. Higher packages add your website and Google profile, then AI answering, CRM and follow-ups, then local SEO pages and AI search work, then Google Ads and LSA management. One real example: Presidential Roofing <a href="/results/presidential-roofing">went from 27 to 43 Google reviews in 20 days</a>.</p>
<p>If you'd rather keep doing it yourself, that's a good choice for plenty of owners. Start with a <a href="/free-google-maps-audit">free Google Maps audit</a> to see what to fix first. If you're weighing companies instead, see <a href="/guides/home-service-marketing-companies-compared">home service marketing companies compared</a>, <a href="/guides/how-much-should-contractors-spend-on-marketing">how much to spend on marketing</a> and <a href="/guides/best-aeo-services-for-contractors">best AEO services for contractors</a>.</p>`,
    faq: [
      ["Can I do my own marketing as a contractor?", "Yes. A complete Google Business Profile, a review request after every job, replies to every review, weekly photos and a working website cover most of the basics, in about 2 to 3 hours a week after setup."],
      ["How long does it take to set up a Google Business Profile properly?", "Plan about 2 to 3 hours to fill in the category, services, service areas, hours, description and photos. After that, 30 to 45 minutes a week keeps it current."],
      ["Is it worth paying a marketing company for a small contracting business?", "It's worth it when you aren't doing the basics consistently, when you miss calls on jobs, or when you run Google Ads without experience. If you serve one small town and keep up the weekly list, you may not need one."],
      ["Can I set up Local Services Ads myself?", "Yes. Check that your trade is eligible, then sign up through Google. You'll need your license or business registration, and you pay per lead rather than per click."],
      ["Can I offer a discount for Google reviews?", "No. Google's policy prohibits offering free or discounted items in exchange for reviews. Ask every customer the same way instead."],
      ["What does TableTurnerr charge to do this for me?", "We sell five packages from the Reviews package up to Partner, month to month with no contract. Every price is on our pricing page."],
    ],
  },
];
