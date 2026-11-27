// Trade website-cost guides (added 2026-11-27): pest control, garage door, painting, cleaning, tree service, remodeling.
// Topic: "how much does a website cost for a <trade>" queries. Each guide is written for its trade (pages, buyer behavior,
// seasons, FAQs); do not turn these into a template with the trade name swapped.
// Outside figures were read on 2026-11-27 on the pages linked: Squarespace, Wix (its own pricing article, "current as of
// November 2026"), Durable, Hostinger, NiceJob (vendor pages); WebFX (survey of 2,000+ businesses) and WebsiteSetup for
// freelancer and agency ranges; NPMA, EPA, ISA, 16 CFR 1211.1, and HomeLight's summary of the JLC 2025 Cost vs Value report.
// GoDaddy and Fiverr/Upwork pages blocked automated reading, so no figures from them are used.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;

const SQSP = (t = "Squarespace") => A("https://www.squarespace.com/pricing", t);
const WIX = (t = "Wix") => A("https://www.wix.com/blog/how-much-is-a-wix-website", t);
const DURABLE = (t = "Durable") => A("https://durable.com/pricing", t);
const HOSTINGER = (t = "Hostinger") => A("https://www.hostinger.com/website-builder", t);
const NICEJOB = (t = "NiceJob Sites") => A("https://get.nicejob.com/pricing", t);
const WEBFX = (t = "WebFX's survey of 2,000+ businesses") => A("https://www.webfx.com/web-design/pricing/website-costs/", t);
const WSETUP = (t = "WebsiteSetup") => A("https://websitesetup.org/website-cost/", t);
const NPMA = (t = "NPMA's 2026 Bug Barometer") => A("https://www.pestworld.org/multimedia-center/press-releases/from-coast-to-coast-pests-are-coming-early-experts-forecast-heightened-activity-this-spring-and-summer/", t);
const EPA_APPLICATOR = (t = "EPA") => A("https://www.epa.gov/pesticide-worker-safety/how-get-certified-pesticide-applicator", t);
const EPA_RRP = (t = "EPA's lead Renovation, Repair and Painting rule") => A("https://www.epa.gov/lead/lead-renovation-repair-and-painting-program-rules", t);
const ISA_FIND = (t = "ISA's Find an Arborist directory") => A("https://www.treesaregood.org/findanarborist", t);
const CFR_1211 = (t = "the federal safety standard for automatic residential garage door openers") => A("https://www.law.cornell.edu/cfr/text/16/1211.1", t);
const JLC_2025 = (t = "the 2025 Cost vs. Value report, as summarized by HomeLight") => A("https://www.homelight.com/blog/how-much-to-remodel-a-kitchen/", t);

const GENERAL = `<a href="/guides/how-much-does-a-website-cost">how much a website costs</a>`;
const CONTRACTOR = `<a href="/guides/contractor-website-cost">contractor website cost guide</a>`;

export const guides14 = [
  {
    slug: "pest-control-website-cost",
    path: "/guides/pest-control-website-cost",
    title: "How Much Does a Pest Control Website Cost? (2026)",
    description: "Pest control website costs checked November 2026: AI builders, freelancers, agencies and done-for-you plans, plus the pest and plan pages that win customers.",
    h1: "How much does a pest control website cost?",
    lede: "Anywhere from about $12 a month to $15,000 up front, depending on who builds it. What matters more for a pest control company is whether the site has a page for every pest you treat and an easy way to start a service plan.",
    eyebrow: "Website costs by trade", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a pest control site that signs up plan customers?",
    content: `
<div class="callout"><p><strong>Short version:</strong> an AI website builder costs about $12 to $50 a month, a freelancer typically charges $2,000 to $7,600 one time, an agency $5,000 to $15,000 or more, and a done-for-you monthly plan starts around $99 a month plus setup (prices checked November 2026). Pest control sites land in the upper half of each range because they need a page per pest and a plan sign-up. A brand-new operator living on referrals can start cheap. A company that wants recurring plan customers from Google needs pages added and updated every month.</p></div>
<h2>The four ways to get a pest control website, and what each costs</h2>
<table>
<thead><tr><th>Route</th><th>Typical price</th><th>What you get</th><th>What's usually missing for pest control</th></tr></thead>
<tbody>
<tr><td>AI website builder</td><td>${WIX()}: $17 to $159 a month on yearly billing (Business is $39). ${DURABLE()}: $25 or $49 a month.</td><td>A decent-looking site in an afternoon</td><td>Pest pages you have to write, no plan sign-up flow unless you build it, nobody watching rankings</td></tr>
<tr><td>Freelancer, one time</td><td>$2,000 to $7,600 for a 40 to 80 hour project, per ${WSETUP()}</td><td>A custom-looking site</td><td>Ongoing pages, hosting and edits are extra. SEO is often "basic setup" only</td></tr>
<tr><td>Agency, one time</td><td>$5,000 to $15,000 per WebsiteSetup. ${WEBFX()} saw $3,000 to $30,000+</td><td>Strategy, design, copy</td><td>Monthly retainers for anything after launch</td></tr>
<tr><td>Done for you, monthly</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>Site, hosting and edits handled</td><td>Check what happens to the site if you cancel</td></tr>
</tbody>
</table>
<p>All prices read on the linked pages on November 27, 2026. For the full breakdown across all businesses, see ${GENERAL}, and our ${CONTRACTOR} for home-service numbers.</p>
<h2>What a pest control site has to have, and why</h2>
<p>Pest customers rarely search "pest control company." They search the bug: "tiny black ants in kitchen," "mouse droppings in garage," "termite swarmers vs flying ants." Google and AI assistants answer those searches with pages that name the pest and explain what to do. If your site has one "Services" page, you never show up for them.</p>
<ul>
<li><strong>A page for each pest you treat.</strong> Ants, roaches, mice and rats, termites, bed bugs, mosquitoes, wasps and hornets, ticks, plus regional ones like scorpions. Each page should cover how to identify it, signs of an infestation, whether it is a health or property risk, how you treat it and how many visits it takes. Your own photos beat stock pictures.</li>
<li><strong>A service plan page with a sign-up.</strong> Plans are where pest control makes its money, because one sign-up pays every quarter. Say what each visit includes (inside, outside, eaves, garage), how often you come, and whether you re-treat free between visits. Then give a short "start my plan" form, not just "call for a quote."</li>
<li><strong>A termite page.</strong> Termite work is high-ticket and often tied to a home sale, so agents and buyers search for inspections. Explain what an inspection covers and how fast you can deliver the report.</li>
<li><strong>A pets and kids page.</strong> "Is it safe for my dog?" is the question that stalls bookings. Answer it plainly, product by product if you can.</li>
<li><strong>Your license number.</strong> States certify pesticide applicators under ${EPA_APPLICATOR()} rules, and some states require it for all commercial applicators. Put your license number in the footer and on the plan page.</li>
<li><strong>A commercial page</strong> if you serve restaurants, property managers or warehouses. Those buyers want inspection logs and scheduled service, not a coupon.</li>
</ul>
<h2>Pest seasons should change what your homepage says</h2>
<p>${NPMA()}, released February 23, 2026, forecast pests coming out earlier and in bigger numbers across most regions: termites and stink bugs early in the Mid-Atlantic, termites, mosquitoes and ants in the Southeast, scorpions moving indoors in the Southwest with the monsoon. Your site should follow your local calendar. Lead with termite inspections during swarm season, mosquito and tick service in summer, and rodent exclusion when it turns cold. A builder site can do this if you remember to change it. Most owners don't, so the homepage still says "spring special" in November.</p>
<h2>What drives the price up for a pest control site</h2>
<ul>
<li><strong>Page count.</strong> Ten to twenty pest pages, plus a plan page, termite page and town pages, is a lot of writing. That's the main reason pest sites cost more than a five-page template.</li>
<li><strong>Plan sign-up that reaches your software.</strong> A form that just emails you is cheap. One that creates the customer in your job software takes setup. Jobber is our official integration. Housecall Pro connects on its plan that allows integrations, and tools like GorillaDesk or PestPac connect through Zapier or Make.</li>
<li><strong>Photo upload.</strong> Letting a customer send a picture of the bug saves a trip and makes a good first impression, but it adds form work.</li>
<li><strong>A Spanish version</strong> if a big share of your market searches in Spanish.</li>
</ul>
<h2>What you can skip</h2>
<ul>
<li>Scary close-ups of roaches on the homepage. People want relief, not a horror movie.</li>
<li>A chat widget nobody answers. A missed chat looks worse than no chat.</li>
<li>A daily blog. Ten solid pest pages will do more than fifty thin posts.</li>
<li>Custom animation and video headers that slow the page on a phone.</li>
</ul>
<p>Be honest with yourself about stage. If you have one truck and most work comes from realtors and neighbors, a $17 to $39 builder plan is a fine start. The pest pages and plan sign-up can come later.</p>
<h2>What our pest control websites include, by package</h2>
<table>
<thead><tr><th>Package</th><th>What it adds for a pest control company</th></tr></thead>
<tbody>
<tr><td>Starter</td><td>We build and host the site, with pest and plan pages, and make edits when you ask. Also included: Google Business Profile management, social posting, review requests after each service, AI review replies, missed-call text-back and NFC review cards. It costs {{PRICE:website}}.</td></tr>
<tr><td>Growth</td><td>Adds the CRM, so every plan sign-up or quote form gets an instant text, plus follow-ups, a spring reminder campaign to past one-time customers, one inbox and 24/7 AI answering. It costs {{PRICE:crm}}.</td></tr>
<tr><td>Complete</td><td>Adds 4 new pest-and-town pages a month and AI search optimization, chosen from what people in your area search. It costs {{PRICE:seo}}.</td></tr>
</tbody>
</table>
<p>See the details on our <a href="/marketing/pest-control/contractor-websites">pest control websites</a> page, or compare with a seasonal-plan trade in our <a href="/guides/cleaning-business-website-cost">cleaning business website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a pest control website cost?", "About $12 to $50 a month on an AI builder, roughly $2,000 to $7,600 from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up for a done-for-you plan, based on prices checked in November 2026."],
      ["What pages should a pest control website have?", "A page for each pest you treat, a service plan page with a sign-up form, a termite page, a pets and kids safety page, and your license number. Add a commercial page if you serve businesses."],
      ["Should I put my pest control plan prices on my website?", "A starting price or a range usually helps, because plan buyers compare. If prices vary a lot by home size, say what the price depends on and offer a quick quote form."],
      ["Do pest ID pages really bring in customers?", "They match how people search, which is by the bug they see. A clear page about that pest is what Google and AI assistants show, and it ends with your phone number."],
      ["Can I connect plan sign-ups to my pest control software?", "Yes. Jobber connects officially, Housecall Pro connects on its plan that allows integrations, and software like GorillaDesk or PestPac connects through Zapier or Make."],
      ["Is a cheap website builder enough for a new pest control business?", "Often, yes. If most of your work comes from referrals, a basic builder site is fine at first. Add pest pages and a plan sign-up when you want customers from search."],
    ],
  },
  {
    slug: "garage-door-website-cost",
    path: "/guides/garage-door-website-cost",
    title: "How Much Does a Garage Door Company Website Cost?",
    description: "What a garage door company website costs in 2026, by route: builder, freelancer, agency or monthly. Plus the same-day, spring and new-door pages it needs.",
    h1: "How much does a garage door company website cost?",
    lede: "A garage door site can cost $12 a month or $15,000 up front. The real question is whether it does two different jobs well: get a stuck homeowner to call in seconds, and sell a new door to someone who is taking their time.",
    eyebrow: "Website costs by trade", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a garage door site built for same-day calls?",
    content: `
<div class="callout"><p><strong>Short version:</strong> expect about $12 to $50 a month for an AI builder, $2,000 to $7,600 one time for a freelancer, $5,000 to $15,000 or more for an agency, or roughly $99 a month and up for a done-for-you plan (checked November 2026). A garage door company can keep the build lean, because repair customers decide fast and don't read much. Where the money should go is a phone-first design, town pages for every area you cover, and a new-door section that sells the bigger ticket.</p></div>
<h2>Price by route</h2>
<table>
<thead><tr><th>Route</th><th>Cost</th><th>Fits a garage door company when...</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>${SQSP()}: $12 to $36 a month depending on plan and billing. ${HOSTINGER()}: from $1.99 a month on a 48-month prepay, renewing at $10.99 to $25.99.</td><td>You're one tech in one town and most calls come from Google Maps</td></tr>
<tr><td>Freelancer</td><td>${WEBFX()} found $500 to $10,000+. ${WSETUP()} puts a typical project at $2,000 to $7,600</td><td>You have a clear page list and someone to host and edit it after</td></tr>
<tr><td>Agency</td><td>$5,000 to $15,000 (WebsiteSetup); $3,000 to $30,000+ (WebFX)</td><td>You run several trucks across a metro and sell a lot of new doors</td></tr>
<tr><td>Done-for-you monthly</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>You'd rather run jobs than run a website</td></tr>
</tbody>
</table>
<p>Prices were read on the linked pages on November 27, 2026. Our ${GENERAL} guide covers every type of business. The ${CONTRACTOR} covers other trades.</p>
<h2>Two customers, two jobs for the site</h2>
<table>
<thead><tr><th></th><th>Repair caller</th><th>New-door shopper</th></tr></thead>
<tbody>
<tr><td>Situation</td><td>Door stuck, car trapped, loud bang from a broken spring</td><td>Old door is ugly, dented or noisy. Selling the house, or just updating it</td></tr>
<tr><td>Searches</td><td>"garage door repair near me," "broken garage door spring," "garage door off track"</td><td>"carriage house garage doors," "insulated garage door cost," "new garage door installation [town]"</td></tr>
<tr><td>Time on site</td><td>Seconds, on a phone</td><td>Several visits over days or weeks</td></tr>
<tr><td>What makes them act</td><td>A big call button, "same-day" in plain words, a service-call fee or price range</td><td>Photos of styles on real homes, brands you install, financing, warranty</td></tr>
</tbody>
</table>
<p>Most garage door sites only serve one of these people. The repair caller needs the phone number in the first screen and nothing in the way. The door shopper needs depth. Build both, and keep them on separate pages so neither gets in the other's way.</p>
<h2>Pages a garage door site needs</h2>
<ul>
<li><strong>Same-day and emergency repair.</strong> Say what hours you answer, how fast you usually arrive, and what the trip fee is. Surprise pricing is what homeowners fear most with this trade, so a clear fee builds trust.</li>
<li><strong>Broken springs.</strong> The single most common urgent call. Explain torsion versus extension springs, why replacing them is a job for a trained tech, and whether you replace springs in pairs.</li>
<li><strong>Opener repair and installation.</strong> List the brands you service and install. People search by brand when the opener fails.</li>
<li><strong>Off-track doors, cables and rollers.</strong> One short page each, written for the person standing in the garage.</li>
<li><strong>New doors, with a style gallery.</strong> Steel, wood, carriage house, insulated, glass. Show doors you installed, with the town named.</li>
<li><strong>Safety inspection or tune-up.</strong> Photo-eye and auto-reverse checks are an easy upsell. Openers made since January 1, 1993 fall under ${CFR_1211()}, which gives you a plain reason to recommend replacing a very old opener.</li>
<li><strong>Town pages.</strong> Garage door companies usually cover a whole metro. A page per town, with jobs and reviews from that town, is how you show up beyond the town where your shop sits.</li>
<li><strong>Commercial doors</strong>, only if you do them.</li>
</ul>
<h2>What raises the price</h2>
<ul>
<li><strong>Number of towns.</strong> Twenty town pages written well, not copied, is real work.</li>
<li><strong>The new-door gallery.</strong> Sorting and labeling a few hundred install photos by style and town takes time, whoever does it.</li>
<li><strong>Financing.</strong> Embedding a financing application for new doors adds setup.</li>
<li><strong>Call tracking</strong> so you know which page or ad made the phone ring.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>Online booking for emergencies. A stuck homeowner wants a human on the phone now. Booking works for tune-ups and estimates, not for a car trapped inside.</li>
<li>A long company history on the homepage. Put it on the About page.</li>
<li>Coupons that expired last year. Old offers make a site look abandoned.</li>
<li>A slow video header. Repair visitors are often on a weak phone signal in a driveway.</li>
</ul>
<h2>A quick way to judge what the site is worth to you</h2>
<p>Use your own numbers here. These are examples only. Say your site and Google profile bring in 40 repair calls a month, and your techs are on ladders when a third of them ring. If half of those missed callers try the next company instead of waiting, that's about 7 lost jobs a month. At an example average ticket of $300, that's around $2,000 a month walking away, before counting a single new-door sale. A website can't fix that alone. It needs a phone that gets answered, or a text that goes back within a minute, which is why we pair the site with missed-call text-back and, on Growth, AI answering.</p>
<p>To be fair to the cheap options: a one-tech shop that lives on Google Maps calls can do well with a simple builder site, as long as the call button is big and the hours are correct.</p>
<h2>What our garage door websites include</h2>
<p><strong>Starter</strong> ({{PRICE:website}}): we build, host and edit the site, with repair, spring, opener and new-door pages, plus Google Business Profile management, social posting, review requests, AI review replies, missed-call text-back and NFC review cards your techs can hand over at the door.</p>
<p><strong>Growth</strong> ({{PRICE:ai}}): adds 24/7 AI answering that takes several calls at once and forwards urgent ones to your on-call tech by your rules, plus the CRM, instant texts to every web lead, estimate reminders for new-door quotes and one inbox. Hear it on our demo line: {{DEMO}}.</p>
<p><strong>Complete</strong> ({{PRICE:seo}}): adds 4 new service-and-town pages a month and AI search optimization, so you keep spreading across your metro.</p>
<p>More on our <a href="/marketing/garage-door-repair/contractor-websites">garage door websites</a> page. For another urgent-call trade, read our <a href="/guides/tree-service-website-cost">tree service website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a garage door company website cost?", "Roughly $12 to $50 a month with an AI builder, $2,000 to $7,600 one time from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up done for you, based on prices checked in November 2026."],
      ["Should a garage door website show prices?", "Showing your service-call fee or a price range for common repairs like springs builds trust, because surprise pricing is a common worry in this trade. Final prices can still depend on the door."],
      ["Do I need separate pages for springs and openers?", "Yes. People search for the exact problem, like a broken spring or an opener that won't close, and a page that answers that problem is the one Google shows."],
      ["Should garage door customers book online?", "Online booking suits tune-ups and new-door estimates. Emergencies like a trapped car should go straight to a phone call or an answering service that picks up."],
      ["How many town pages does a garage door company need?", "One for each town where you want calls and actually work. Each page should mention real jobs and reviews from that town, not copied text."],
      ["Can a cheap website work for a garage door business?", "It can for a small shop that gets most calls from Google Maps. Make sure the call button, hours and service area are right on a phone screen."],
    ],
  },
  {
    slug: "painting-contractor-website-cost",
    path: "/guides/painting-contractor-website-cost",
    title: "How Much Does a Painting Contractor Website Cost?",
    description: "Painting contractor website costs in 2026: builder, freelancer, agency and monthly options compared, plus the gallery, process and estimate pages painters need.",
    h1: "How much does a painting contractor website cost?",
    lede: "Painters can spend $12 a month or $15,000 on a website. Homeowners usually get two or three estimates before hiring a painter, so the site's job is to win the shortlist with photos, a clear process and an easy estimate request.",
    eyebrow: "Website costs by trade", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a painting site that fills your estimate calendar?",
    content: `
<div class="callout"><p><strong>Short version:</strong> a painting contractor website costs about $12 to $50 a month on an AI builder, $2,000 to $7,600 one time with a freelancer, $5,000 to $15,000 or more with an agency, or about $99 a month and up done for you (checked November 2026). For painters, the photo gallery and estimate form matter more than fancy design. The biggest hidden cost is time: sorting your job photos into a gallery that sells.</p></div>
<h2>What each route costs</h2>
<table>
<thead><tr><th>Route</th><th>Price</th><th>Honest take for a painter</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>${SQSP()}: $12 to $36 a month. ${WIX()}: $17 to $159 a month on yearly billing</td><td>Good galleries out of the box. You still sort photos and write every page</td></tr>
<tr><td>Freelancer</td><td>About $2,000 to $7,600 per ${WSETUP()}</td><td>Fine for a clean five-page site. Ask who adds new project photos next year</td></tr>
<tr><td>Agency</td><td>$5,000 to $15,000 per WebsiteSetup, and ${WEBFX()} reported up to $30,000+</td><td>Worth it for commercial painting firms bidding on big contracts</td></tr>
<tr><td>Done for you, monthly</td><td>${NICEJOB()} lists $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>Someone else keeps the gallery and seasons up to date</td></tr>
</tbody>
</table>
<p>Prices read on the linked pages on November 27, 2026. For every kind of business, see ${GENERAL}. For other trades, see our ${CONTRACTOR}.</p>
<h2>How homeowners pick a painter, and what the site needs</h2>
<p>Painting is a looks business. Homeowners judge your work by pictures, then judge you by how clearly you explain the job. Most will compare estimates, so your site should make you the obvious one to call back.</p>
<ul>
<li><strong>A gallery sorted by project type.</strong> Exteriors, interiors, kitchen cabinets, decks and fences, commercial. Before-and-after pairs from the same angle sell better than a wall of finished rooms. Name the town and the paint line if you can.</li>
<li><strong>A process page.</strong> Prep is where painters differ, and homeowners know it. Walk through power washing, scraping, sanding, caulking, priming, how many coats, how you protect floors and plants, and how you clean up each day.</li>
<li><strong>Separate interior and exterior pages.</strong> Different searches, different questions. Exterior buyers ask about weather and durability. Interior buyers ask about drying time, smell and whether they can stay in the house.</li>
<li><strong>Cabinet painting</strong>, if you do it. It's a distinct search and a well-paid job, and it needs its own photos.</li>
<li><strong>Color consultation.</strong> Many homeowners stall on choosing colors. A page explaining how you help, plus links to the free color tools the big paint brands already offer, removes that block.</li>
<li><strong>Lead-safe credentials.</strong> ${EPA_RRP()} requires firms disturbing paint in homes built before 1978 to be certified. If you are, say so and show the certificate. Owners of older homes look for it.</li>
<li><strong>An estimate form with photo upload.</strong> Ask for the rooms or sides of the house, rough size and a couple of photos. It lets you price small jobs without a drive and shows you're organized.</li>
<li><strong>Warranty terms</strong>, in plain words, on the exterior page.</li>
</ul>
<h2>Painting has a calendar, and the site should follow it</h2>
<p>Exterior work depends on weather, so in much of the country exterior estimates bunch up in late winter and spring, and the summer schedule fills early. Interior work carries you through the cold months. The homepage should change with that: "Book your exterior now for spring" in February, interior and cabinet work in November. Past customers are your cheapest source here. A note each year to people whose exteriors are getting older brings repeat jobs without ad spend.</p>
<h2>What makes a painting website cost more</h2>
<ul>
<li><strong>Gallery work.</strong> Choosing, cropping, compressing and labeling a few hundred photos so the pages still load fast is the single biggest task.</li>
<li><strong>Before-and-after sliders</strong> and project write-ups, if you want each big job told as a short story.</li>
<li><strong>Commercial sections</strong> with capability statements for property managers and general contractors.</li>
<li><strong>A form that feeds your CRM</strong> so estimate requests don't sit in an email inbox.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>A custom color visualizer. The paint brands already built free ones. Link to them.</li>
<li>Stock photos of a roller on a white wall. Every painter has that picture, and it tells the homeowner nothing.</li>
<li>Instant price calculators. Painting prices depend on prep and condition, so a calculator either scares people off or sets a number you can't keep.</li>
</ul>
<h2>Example: how many jobs does the site need to pay for itself?</h2>
<p>Plug in your own figures. As an example, say your average exterior repaint brings in $5,000 and your margin after paint and labor is 35%, so each job leaves about $1,750. A $6,000 agency build needs roughly four extra exterior jobs to pay back. For a monthly plan, divide a year of fees by $1,750 to see how many extra jobs a year it has to bring in. The more useful question is whether the site makes you the painter homeowners call back after they've seen three estimates. Clear prep photos and fast estimate replies are what usually tip that.</p>
<p>If you're a solo painter booked through word of mouth, a builder site with a strong gallery and your phone number is plenty for now. Spend more when you want strangers from Google to find you.</p>
<h2>What our painting websites include, by package</h2>
<table>
<thead><tr><th>Package</th><th>For a painting contractor</th></tr></thead>
<tbody>
<tr><td>{{PRICE:planStarter}}</td><td>Site built, hosted and edited for you, with gallery, process and estimate pages. Google Business Profile management and social posting, so new job photos show up there too. Review requests after each job, AI review replies, missed-call text-back and NFC review cards.</td></tr>
<tr><td>{{PRICE:planGrowth}}</td><td>Adds the CRM: an instant text to every estimate request, estimate reminders when a quote goes quiet, a yearly campaign to past exterior customers, one inbox and 24/7 AI answering.</td></tr>
<tr><td>{{PRICE:planComplete}}</td><td>Adds 4 new service-and-town pages a month, like "cabinet painting in [town]," and AI search optimization.</td></tr>
</tbody>
</table>
<p>See our <a href="/marketing/painting">marketing for painters</a> page, and our guide on <a href="/guides/how-to-follow-up-on-an-estimate">following up on an estimate</a>. If you also do larger renovation work, compare our <a href="/guides/remodeling-contractor-website-cost">remodeling contractor website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a website for a painting company cost?", "About $12 to $50 a month on an AI builder, $2,000 to $7,600 from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up done for you, based on November 2026 prices."],
      ["What should a painter's website include?", "A gallery sorted by project type, a process page that explains your prep, separate interior and exterior pages, an estimate form with photo upload, and your warranty and lead-safe certification if you have it."],
      ["Should painters show prices on their website?", "Exact prices rarely work because prep and condition vary. Explain what drives the price and offer a fast estimate, and consider a starting price for simple jobs like a single room."],
      ["Do I need EPA lead-safe certification on my painting website?", "If you disturb paint in homes built before 1978, EPA's RRP rule requires certification. If you hold it, showing it on the site reassures owners of older homes."],
      ["How many photos should a painting website have?", "Enough to show each project type you want more of, ideally before-and-after pairs. A few strong, labeled projects beat hundreds of unsorted pictures."],
      ["When should painters update their website?", "At least with the seasons: push exterior work before spring and interior and cabinet work in fall and winter. Add new project photos every month or two."],
    ],
  },
  {
    slug: "cleaning-business-website-cost",
    path: "/guides/cleaning-business-website-cost",
    title: "How Much Does a Cleaning Business Website Cost?",
    description: "Cleaning business website costs in 2026 by route, plus why cleaning sites need instant quotes by home size, recurring booking and a hiring page.",
    h1: "How much does a cleaning business website cost?",
    lede: "From about $12 a month to $15,000 up front. Cleaning customers want a price before they call, so the money is best spent on a quote and booking flow, not on design.",
    eyebrow: "Website costs by trade", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a cleaning site that books recurring clients?",
    content: `
<div class="callout"><p><strong>Short version:</strong> a cleaning business website runs about $12 to $50 a month on an AI builder, $2,000 to $7,600 one time from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up done for you (prices checked November 2026). Cleaning sites are short on pages but heavy on tools: a quote by bedrooms and bathrooms, recurring booking, and a page to hire cleaners. Pick the route that gets those working, not the one with the prettiest template.</p></div>
<h2>Four routes, four price tags</h2>
<table>
<thead><tr><th>Route</th><th>Price</th><th>Quote and booking?</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>${DURABLE()}: $25 or $49 a month. ${WIX()}: $17 to $159 a month on yearly billing</td><td>Some builders now include booking. Durable's Launch plan lists online booking, lead capture and a basic CRM. You set it up and run it</td></tr>
<tr><td>Freelancer</td><td>$2,000 to $7,600 per ${WSETUP()}</td><td>Usually embeds your booking software's widget. Ask who fixes it when it breaks</td></tr>
<tr><td>Agency</td><td>$5,000 to $15,000 (WebsiteSetup). ${WEBFX()} found $3,000 to $30,000+</td><td>Can build a custom calculator, but you rarely need one</td></tr>
<tr><td>Done for you, monthly</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>Depends on the provider. Ask before signing</td></tr>
</tbody>
</table>
<p>Prices read on the linked pages on November 27, 2026. Our ${GENERAL} guide covers all business types. The ${CONTRACTOR} compares other trades.</p>
<h2>How cleaning customers decide</h2>
<p>Cleaning is bought differently from repair work. Nothing is broken. The customer is comparing a few companies, often late at night on a phone, and wants three answers fast: how much, when can you come, and can I trust you in my home. Many would rather fill in a form or text than call. A site that says "call for a quote" and nothing else loses them to the competitor with a price on the page.</p>
<h2>What a cleaning site needs</h2>
<ul>
<li><strong>An instant quote by home size.</strong> Bedrooms, bathrooms, rough square footage, pets, and how often. Show a price or a tight range right away. If you won't publish exact prices, show "from" prices for a standard clean.</li>
<li><strong>Recurring booking.</strong> Weekly, every two weeks or monthly, with the first clean priced as a deep clean if that's how you work. A recurring client is worth many one-time cleans, so make recurring the default choice.</li>
<li><strong>A checklist for each clean type.</strong> Standard, deep, move-in or move-out. Room-by-room lists stop arguments later about whether baseboards or inside the oven were included.</li>
<li><strong>A trust page.</strong> Who your cleaners are, how you screen them, whether the same cleaner comes each time, your insurance, and what happens if something gets damaged. Only state what's true for your company.</li>
<li><strong>Move-out and rental turnover pages.</strong> Renters chasing a deposit, property managers and short-term rental hosts each search differently and book on short notice.</li>
<li><strong>Office or commercial cleaning</strong>, if you do it, on its own page with a walkthrough request form.</li>
<li><strong>A hiring page.</strong> Most cleaning companies are always hiring. A clear <a href="/services/hiring-pages">hiring page</a> with pay range, schedule and a short application keeps the team growing, which is what limits a cleaning business most.</li>
</ul>
<h2>Busy times for cleaning companies</h2>
<p>Demand comes in waves you can plan for: spring cleaning, the weeks before Thanksgiving and the December holidays when people host guests, and move-outs around month-end lease dates. The site should lead with whatever is coming: holiday deep cleans in early November, move-out cleans near the end of each month in rental-heavy areas. A note to one-time customers before the holidays, offering to switch them to recurring service, is one of the cheapest wins in this trade.</p>
<h2>What makes a cleaning site cost more</h2>
<ul>
<li><strong>Connecting the quote form to your scheduling software</strong> so a booked clean lands on the calendar without retyping. Jobber is our official integration. Housecall Pro connects on its plan that allows integrations. Other cleaning software connects through Zapier or Make.</li>
<li><strong>Taking a card at booking.</strong> Payment setup and cancellation rules add work.</li>
<li><strong>Several service areas</strong>, each needing its own page.</li>
<li><strong>A bilingual site</strong> for clients or job applicants who prefer Spanish.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>A custom-coded price calculator. Most booking software already has one that works.</li>
<li>Pages of generic cleaning tips written to fill space. Checklists and clear prices do more.</li>
<li>Photos of sparkling stock kitchens. A real team photo does more for trust.</li>
</ul>
<h2>The math that makes recurring booking worth the setup</h2>
<p>Swap in your own prices. In this example, a client cleaned every two weeks at $150 a visit is 26 visits, or $3,900 a year. A one-time deep clean at $300 is $300. Even if only a few website visitors a month pick recurring service, each one is worth more than a dozen one-time jobs, and they keep coming back without new marketing. That's why the quote form should put "every two weeks" first, show the per-visit savings for recurring plans if you offer them, and send an instant text the moment someone submits it, before they fill out a competitor's form.</p>
<p>If you're a solo cleaner with a full schedule from referrals, a $17 to $25 builder plan with a booking link is a fine place to start. Add more when you're hiring and want strangers from Google.</p>
<h2>What our cleaning websites include, by package</h2>
<ul>
<li><strong>Starter</strong> ({{PRICE:website}}): site built, hosted and edited, with quote, checklist, trust and hiring pages, plus Google Business Profile management, social posting, review requests after each clean, AI review replies, missed-call text-back and NFC review cards.</li>
<li><strong>Growth</strong> ({{PRICE:crm}}): adds the CRM, so every quote request gets an instant text and follow-ups, plus holiday and spring campaigns to past clients, one inbox and 24/7 AI answering for after-hours quote calls.</li>
<li><strong>Complete</strong> ({{PRICE:seo}}): adds 4 new service-and-town pages a month, like "move-out cleaning in [town]," and AI search optimization.</li>
</ul>
<p>More on our <a href="/marketing/cleaning-services">marketing for cleaning businesses</a> page and our <a href="/services/online-booking">online booking</a> setup. Another recurring-service trade with similar math is covered in our <a href="/guides/pest-control-website-cost">pest control website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a cleaning business website cost?", "About $12 to $50 a month on an AI builder, $2,000 to $7,600 from a freelancer, $5,000 to $15,000 or more from an agency, or around $99 a month and up done for you, based on prices checked in November 2026."],
      ["Should a cleaning company show prices on its website?", "Usually yes. Cleaning customers compare by price first, so an instant quote by bedrooms and bathrooms, or at least starting prices, keeps them from leaving for a competitor."],
      ["Do cleaning websites need online booking?", "It helps a lot, especially for recurring service. Many clients would rather book or request a quote online than call."],
      ["What pages does a house cleaning website need?", "A quote or booking page, checklists for standard, deep and move-out cleans, a trust page about your team and insurance, a service area, and a hiring page."],
      ["Why does a cleaning business website need a hiring page?", "Finding good cleaners is often what limits growth. A hiring page with pay, schedule and a short application brings in applicants without paying for job ads every time."],
      ["Can I use a cheap website builder for my cleaning business?", "Yes, if you're small and mostly booked by referral. Pick one that supports a booking link or quote form so clients can reach you without calling."],
    ],
  },
  {
    slug: "tree-service-website-cost",
    path: "/guides/tree-service-website-cost",
    title: "How Much Does a Tree Service Website Cost? (2026)",
    description: "Tree service website costs checked November 2026: builder, freelancer, agency and monthly routes, plus storm, arborist and insurance pages tree companies need.",
    h1: "How much does a tree service website cost?",
    lede: "A tree service website costs anywhere from about $12 a month to $15,000 up front. Tree work is dangerous and expensive, so the site has to prove you're insured and qualified, then switch to storm mode when the weather turns.",
    eyebrow: "Website costs by trade", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a tree service site that's ready for the next storm?",
    content: `
<div class="callout"><p><strong>Short version:</strong> expect about $12 to $50 a month for an AI builder, $2,000 to $7,600 one time for a freelancer, $5,000 to $15,000 or more for an agency, or about $99 a month and up for done-for-you service (checked November 2026). A tree company's site doesn't need many pages to start, but it needs proof of insurance and credentials up front and a storm banner you can turn on within an hour of a storm. That second part is why someone has to be looking after the site, whatever you pay to build it.</p></div>
<h2>What each route costs a tree company</h2>
<table>
<thead><tr><th>Route</th><th>Price</th><th>Storm-ready?</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>${HOSTINGER()}: from $1.99 a month on a 48-month prepay, renewing at $10.99 to $25.99. ${SQSP()}: $12 to $36 a month</td><td>Yes, if you have time to log in during a storm. Most owners are out cutting</td></tr>
<tr><td>Freelancer</td><td>${WEBFX()}: $500 to $10,000+. ${WSETUP()}: typically $2,000 to $7,600</td><td>Only if the freelancer answers on a storm weekend</td></tr>
<tr><td>Agency</td><td>$5,000 to $15,000 (WebsiteSetup)</td><td>Depends on the retainer</td></tr>
<tr><td>Done for you, monthly</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>That's the point of paying monthly. Confirm how fast edits happen</td></tr>
</tbody>
</table>
<p>Prices read on the linked pages on November 27, 2026. See ${GENERAL} for all business types and our ${CONTRACTOR} for other trades.</p>
<h2>Storm callers and planned-work callers</h2>
<p>Tree service gets two very different calls. After a storm: a limb through the roof, a tree across the driveway, a trunk leaning on a power line. That homeowner is scared, on a phone, and may be dealing with an insurance claim. The rest of the year: a homeowner wants a dead oak removed, branches cleared off the roof, or a stump ground out. That person gets several quotes and compares. Your site should serve both, and move the storm message to the top when it matters.</p>
<h2>Pages a tree service site needs</h2>
<ul>
<li><strong>Emergency storm removal.</strong> Your 24/7 number, what you do first (make it safe, then clean up), whether you work with insurance claims, and a warning to stay away from any tree touching a power line and call the utility.</li>
<li><strong>Tree removal.</strong> What affects the price: size, lean, what's underneath, access for a bucket truck or crane, and whether the stump and wood are hauled away.</li>
<li><strong>Trimming and pruning.</strong> Why it matters for tree health and roof clearance, and when you prefer to prune. Many arborists prune certain trees while they're dormant, which gives you winter work to promote.</li>
<li><strong>Stump grinding.</strong> Its own search, often a quick add-on sale.</li>
<li><strong>Tree health and disease</strong>, if you have an arborist on staff. Local pests and diseases are searched by name.</li>
<li><strong>Land and lot clearing, crane work</strong> and <strong>firewood or mulch</strong>, only if you offer them.</li>
<li><strong>Credentials and insurance, on every service page.</strong> If you have an ISA Certified Arborist, name them. Homeowners can check credentials in ${ISA_FIND()}. State your liability and workers' comp coverage and offer a certificate of insurance on request. A homeowner hiring someone to climb a 70-foot tree over their house wants that answer before they call.</li>
</ul>
<h2>Seasons and storms drive the calendar</h2>
<p>Storm work depends on your region: hurricanes and tropical storms on the coasts, ice storms in the South and Midwest, wind and thunderstorms nearly everywhere. Call volume can jump from normal to overwhelming overnight. That's when two things decide who gets the work: a site that says "storm damage? we're answering now," and a phone that actually gets picked up. Between storms, promote planned removals, dormant-season pruning and stump grinding so the crew stays busy in quiet months.</p>
<h2>What pushes a tree service website's price up</h2>
<ul>
<li><strong>Photo and video work.</strong> Crane lifts and big removals make great content, but someone has to pick and edit it.</li>
<li><strong>A quote form with photo upload</strong> so you can price simple removals from pictures.</li>
<li><strong>Town pages</strong> across a wide service area, written for each town.</li>
<li><strong>Fast edits on demand.</strong> Paying someone to switch on the storm banner within the hour is a real cost, and worth it.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>An online price calculator. Tree prices vary too much with size, lean and access. Ask for photos instead.</li>
<li>Online booking for emergencies. A tree on a house needs a phone call.</li>
<li>Dramatic photos of crews climbing without visible safety gear. Careful homeowners notice.</li>
</ul>
<h2>Questions to ask any web provider before storm season</h2>
<ol>
<li>If a storm hits on a Saturday night, who changes the homepage, and how fast?</li>
<li>Can the site handle a spike in visitors without slowing down?</li>
<li>Where do quote-form photos go, and who sees them first?</li>
<li>Do I own the domain and the content if I leave?</li>
<li>Who adds new job photos and town pages after launch, and what does that cost?</li>
</ol>
<p>A cheap site with no answer to the first question can cost you more on one storm weekend than a year of monthly service.</p>
<p>If you run a small crew that gets plenty of work from neighbors and a Google Business Profile, a simple builder site with a big phone button can carry you for a while. Just keep your hours and storm message current.</p>
<h2>What our tree service websites include, by package</h2>
<table>
<thead><tr><th>Package</th><th>What it adds</th></tr></thead>
<tbody>
<tr><td>{{PRICE:planStarter}}</td><td>We build, host and edit the site, including storm, removal, pruning, stump and credentials pages, and switch the storm banner on when you ask. Google Business Profile management, social posting, review requests, AI review replies, missed-call text-back and NFC review cards are included.</td></tr>
<tr><td>{{PRICE:planGrowth}}</td><td>Adds 24/7 AI answering that takes several storm calls at once, forwards true emergencies to your on-call person by your rules and takes details on the rest. Plus the CRM, instant texts to web leads, estimate reminders and one inbox. Try the demo line: {{DEMO}}.</td></tr>
<tr><td>{{PRICE:planComplete}}</td><td>Adds 4 new service-and-town pages a month and AI search optimization.</td></tr>
</tbody>
</table>
<p>See our <a href="/marketing/tree-service">marketing for tree services</a> page. For another trade built around urgent calls, compare our <a href="/guides/garage-door-website-cost">garage door website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a tree service website cost?", "About $12 to $50 a month with an AI builder, $2,000 to $7,600 one time from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up done for you, based on November 2026 prices."],
      ["What should a tree service website show to build trust?", "Your insurance coverage, an offer to send a certificate of insurance, any ISA Certified Arborist on staff, real job photos and reviews. Put them on every service page, not just the About page."],
      ["Do tree service websites need an emergency page?", "Yes. After a storm, people search for emergency tree removal and call whoever answers first. A storm page with a 24/7 number and a banner you can turn on quickly wins those calls."],
      ["Should a tree service list prices online?", "Exact prices rarely work because size, lean and access change everything. Explain what affects the price and let people send photos for a quick estimate."],
      ["How can customers check if my arborist is certified?", "ISA's Find an Arborist directory lets homeowners search for and verify ISA-credentialed arborists. Listing is voluntary, so make sure your arborist's profile is listed."],
      ["Is a cheap website enough for a small tree company?", "It can be at first, if you keep hours, service area and the storm message current. A site that brings work from search needs pages added over time."],
    ],
  },
  {
    slug: "remodeling-contractor-website-cost",
    path: "/guides/remodeling-contractor-website-cost",
    title: "How Much Does a Remodeling Contractor Website Cost?",
    description: "Remodeling contractor website costs in 2026 by route, plus why remodelers need project galleries, a process page, financing and reviews by project type.",
    h1: "How much does a remodeling contractor website cost?",
    lede: "Remodelers can pay $12 a month or $15,000 or more for a website. Because one kitchen can be worth tens of thousands of dollars, the site deserves more investment than most trades, but it should go into proof of your work, not decoration.",
    eyebrow: "Website costs by trade", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want a remodeling site that brings better-fit projects?",
    content: `
<div class="callout"><p><strong>Short version:</strong> a remodeling contractor website costs about $12 to $50 a month on an AI builder, $2,000 to $7,600 one time with a freelancer, $5,000 to $15,000 or more with an agency, or about $99 a month and up done for you (checked November 2026). Remodelers sit at the higher end of each range because buyers research for weeks and want case studies, a clear process and financing. With midrange kitchen remodels averaging tens of thousands of dollars, one extra project a year pays for almost any of these options.</p></div>
<h2>Cost by route</h2>
<table>
<thead><tr><th>Route</th><th>Price</th><th>Good fit when...</th><th>Watch out for</th></tr></thead>
<tbody>
<tr><td>AI builder</td><td>${SQSP()}: $12 to $36 a month. ${WIX()}: $17 to $159 a month on yearly billing. ${DURABLE()}: $25 or $49 a month</td><td>You're a small crew doing mostly referral work</td><td>Writing case studies and keeping galleries current is on you</td></tr>
<tr><td>Freelancer</td><td>About $2,000 to $7,600 per ${WSETUP()}</td><td>You have strong photos and a clear page list</td><td>Project pages added after launch cost extra each time</td></tr>
<tr><td>Agency</td><td>$5,000 to $15,000 per WebsiteSetup. ${WEBFX()} found up to $30,000+</td><td>Design-build firms with a showroom and a brand to protect</td><td>Who owns the site and domain if you leave</td></tr>
<tr><td>Done for you, monthly</td><td>${NICEJOB()}: $99 a month plus $199 setup. Ours: {{PRICE:website}}</td><td>You want new projects added for you every month</td><td>Ask how project pages get written</td></tr>
</tbody>
</table>
<p>Prices read on the linked pages on November 27, 2026. For general numbers see ${GENERAL}, and our ${CONTRACTOR} for other trades.</p>
<h2>Why remodelers need more from a site than most trades</h2>
<p>Look at the size of the decision. According to ${JLC_2025()}, a midrange minor kitchen remodel averaged $28,458 nationally and a midrange major kitchen remodel $82,793. Nobody spends that after one glance at a homepage. Couples look at your projects together, read reviews, check your license, ask friends and come back to your site several times over weeks or months. The site has to answer their questions while you're on a job site and can't.</p>
<h2>Pages a remodeling site needs</h2>
<ul>
<li><strong>Project galleries by room.</strong> Kitchens, bathrooms, basements, additions, whole-home. Buyers want to see a project like theirs.</li>
<li><strong>Case studies for your best jobs.</strong> The starting problem, what you changed, the timeline, a budget range and a quote from the homeowner if they agree. One honest case study persuades more than forty unlabeled photos.</li>
<li><strong>A process page.</strong> First meeting, design, selections, permits, demolition, build, final walkthrough. Fear of the unknown, like delays, mess and budget creep, is what keeps people from signing. Show how you handle each step and how you communicate during the job.</li>
<li><strong>A budget guide.</strong> Typical ranges for the projects you do in your market, and what pushes them up. It filters out mismatched leads and builds trust with the right ones.</li>
<li><strong>Financing.</strong> If you offer it, a page that explains how it works helps buyers say yes to the full scope instead of a cut-down version.</li>
<li><strong>Reviews by project type.</strong> A kitchen buyer wants kitchen reviews. Put reviews on the matching gallery and service pages.</li>
<li><strong>License, insurance and warranty</strong>, plus your team. People are letting your crew into their home for months.</li>
<li><strong>A qualifying contact form.</strong> Ask project type, rough budget, timeline and address. You spend less time on consultations that go nowhere.</li>
</ul>
<h2>Timing in the remodeling year</h2>
<p>Remodeling buyers often plan months ahead. Many start researching in winter for work they want done in spring or summer, and kitchen buyers often want the job finished before holiday hosting. Keep the site's project pages fresh before those planning windows, and keep in touch with people who requested a consultation but didn't sign. Many were just not ready yet. Our guide to <a href="/guides/how-to-follow-up-on-an-estimate">following up on an estimate</a> covers how.</p>
<h2>What drives the price up for remodelers</h2>
<ul>
<li><strong>Professional photography.</strong> For high-end work, a photographer for your best projects is often the best money you'll spend on the site.</li>
<li><strong>Writing case studies.</strong> Each takes an interview and editing time.</li>
<li><strong>Custom design</strong>, if your brand is part of what you sell.</li>
<li><strong>Connecting forms to your CRM</strong> so consult requests get a fast reply and follow-up. Speed matters even on big jobs; see <a href="/guides/speed-to-lead-home-services">speed to lead</a>.</li>
</ul>
<h2>What to skip</h2>
<ul>
<li>3D tours and design apps you won't keep updated.</li>
<li>Galleries with no labels. Say the room, the town and what changed.</li>
<li>Award badges from directories that sell them. Real reviews do more.</li>
</ul>
<h2>Before you sign with anyone, ask these</h2>
<ul>
<li><strong>Who writes the case studies?</strong> If the answer is "you send us text," the site will sit half-finished. Ask whether they interview you and your clients.</li>
<li><strong>How are new projects added?</strong> A remodeler finishes a job every few weeks. Each one is a new page that can rank for that room and town, but only if someone publishes it.</li>
<li><strong>Who owns the photos, domain and content?</strong> Professional project photos are expensive. Make sure they stay yours.</li>
<li><strong>Where do consult requests go?</strong> A form that emails one inbox gets lost on a busy week. It should land in a CRM with a follow-up plan.</li>
</ul>
<p>To be fair: a remodeler booked a year out on referrals may only need a tidy builder site with a few projects. The bigger budget makes sense when you want to choose better jobs, not just more of them.</p>
<h2>What our remodeling websites include, by package</h2>
<p><strong>Starter</strong> ({{PRICE:website}}): site built, hosted and edited for you, with galleries, process, financing and contact pages. Includes Google Business Profile management, social posting, review requests after each project, AI review replies, missed-call text-back and NFC review cards.</p>
<p><strong>Growth</strong> ({{PRICE:crm}}): adds the CRM, so every consult request gets an instant text and follow-ups, estimate reminders on proposals that go quiet, campaigns to past clients, one inbox and 24/7 AI answering.</p>
<p><strong>Complete</strong> ({{PRICE:seo}}): adds 4 new service-and-town pages a month, like "bathroom remodeling in [town]," and AI search optimization, guided by what people in your area search.</p>
<p>Read more on our <a href="/marketing/remodeling">marketing for remodelers</a> page, or see how galleries work for a smaller-ticket trade in our <a href="/guides/painting-contractor-website-cost">painting contractor website cost</a> guide. Custom needs? Call us for custom pricing.</p>`,
    faq: [
      ["How much does a remodeling contractor website cost?", "About $12 to $50 a month on an AI builder, $2,000 to $7,600 one time from a freelancer, $5,000 to $15,000 or more from an agency, or about $99 a month and up done for you, based on November 2026 prices."],
      ["Why do remodeling websites cost more than other contractor sites?", "Remodeling buyers research longer, so the site needs galleries by room, case studies, a process page and financing. That's more writing and photo work than a simple service site."],
      ["What should a remodeling contractor's website include?", "Project galleries by room, a few detailed case studies, a process page, a budget guide, financing information, reviews by project type, and your license, insurance and warranty."],
      ["Should remodelers show prices on their website?", "Typical ranges for your market help. They set expectations and filter out projects that don't fit, while the final price comes from your consultation."],
      ["Is professional photography worth it for a remodeling website?", "For your best projects, usually yes. Buyers judge remodelers mostly by photos, and a few great project shoots can carry the whole site."],
      ["How do I get better remodeling leads from my website?", "Use a contact form that asks project type, budget and timeline, show case studies of the work you want more of, and reply fast with a follow-up plan for people who aren't ready yet."],
    ],
  },
];
