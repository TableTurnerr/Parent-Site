// CRM, invoicing, follow-up and lead guides (added 2026-11-24). Topics picked from Google autocomplete: "best crm for
// home service business / plumbers / contractors", "how to keep track of customers", "best invoicing software for
// contractors", "jobber vs housecall pro", "how to follow up on an estimate", "ai receptionist for hvac / plumbers /
// cost", "how to get more customers for my plumbing business".
// Competitor prices: read on the vendor's own pricing page on 2026-11-24 (Jobber, Joist). Re-check when updating.
const DATE = "2026-11-24";
const JOBBER = `<a href="https://www.getjobber.com/pricing/" rel="noopener">Jobber's pricing page</a>`;
const JOIST = `<a href="https://www.joist.com/pricing/" rel="noopener">Joist's pricing page</a>`;
const HCP = `<a href="https://www.housecallpro.com/pricing/" rel="noopener">Housecall Pro's pricing page</a>`;

export const guides5 = [
  {
    slug: "best-crm-for-home-service-business",
    path: "/guides/best-crm-for-home-service-business",
    title: "Best CRM for a Home Service Business: How to Choose (2026)",
    description: "How to pick a CRM for a home service business: the three kinds, what each is good at, what Jobber and others charge, and when you don't need one yet.",
    h1: "Best CRM for a home service business: how to choose",
    lede: "Most owners shop for a CRM by brand. Start with the problem instead. If jobs are the mess, you need field-service software. If leads are the mess, you need a CRM that follows up. Here's how to tell.",
    eyebrow: "CRM for home services", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Not sure what you need? We'll tell you honestly.",
    content: `
<div class="callout"><p><strong>Short version:</strong> choose field-service software such as Jobber or Housecall Pro if your problem is scheduling, dispatch and invoicing. Choose a marketing CRM if your problem is missed calls, cold estimates and no repeat work. Many businesses end up with one of each, connected. If you have fewer than about 10 customers a month, a spreadsheet is fine.</p></div>
<h2>What a CRM does for a home service business</h2>
<p>CRM stands for customer relationship management. In plain words, it's one place that answers three questions: who is this person, what did we last say to them, and what happens next? Without one, the answers live in your phone, a notebook, two inboxes and somebody's memory.</p>
<h2>The three kinds</h2>
<table>
<tr><th>Kind</th><th>Good at</th><th>Weak at</th><th>Examples</th></tr>
<tr><td>Field-service software</td><td>Scheduling, dispatch, quotes, invoices, job history</td><td>Following up leads, winning back old customers</td><td>Jobber, Housecall Pro, Workiz, ServiceTitan</td></tr>
<tr><td>Marketing CRM</td><td>Leads, calls, texts and emails in one inbox, automatic follow-up, reviews, campaigns</td><td>Routes, job costing, parts</td><td>HighLevel-based systems, including ours</td></tr>
<tr><td>General sales CRM</td><td>Long sales cycles, several salespeople</td><td>Anything about jobs or crews</td><td>HubSpot, Pipedrive</td></tr>
</table>
<h2>Which problem do you have?</h2>
<ul>
<li><strong>Double-booked crews, lost addresses, late invoices:</strong> field-service software.</li>
<li><strong>Missed calls, estimates nobody follows up, no reviews:</strong> marketing CRM.</li>
<li><strong>Both:</strong> keep the field-service software you like and connect a marketing CRM to it. The job stays in one and the follow-up runs in the other.</li>
<li><strong>Commercial bids with a long sales cycle:</strong> look at a general sales CRM.</li>
</ul>
<h2>What it costs</h2>
<p>On November 24, 2026, ${JOBBER} listed monthly, one-user prices of $49 for Core, $139 for Connect and $199 for Grow, before annual discounts and with higher prices for teams. Two details matter more than the headline price:</p>
<ul>
<li>Automatic quote and invoice follow-ups and QuickBooks sync start at Connect.</li>
<li>Two-way texting starts at Grow.</li>
</ul>
<p>AI call answering and a sales pipeline are paid add-ons. Other vendors split their plans the same way, so price the plan that has the features you need, with your real number of users.</p>
<h2>Seven things to check before you buy</h2>
<ol>
<li><strong>Calls and texts in one place.</strong> Can you see every conversation with a customer on one screen?</li>
<li><strong>Automatic follow-up.</strong> Does an estimate that goes quiet get chased without anyone remembering? See <a href="/guides/how-to-follow-up-on-an-estimate">how to follow up on an estimate</a>.</li>
<li><strong>Missed-call text-back.</strong> Does a missed caller hear from you right away?</li>
<li><strong>Review requests.</strong> Do they go out after every job, to every customer?</li>
<li><strong>Import and export.</strong> Can you bring your customers in, and take them out again if you leave?</li>
<li><strong>A phone app you'd use in the truck.</strong> If it's slow on site, nobody will use it.</li>
<li><strong>Who sets it up.</strong> Most CRMs fail because they're never finished. Ask who builds the automations.</li>
</ol>
<h2>When you don't need a CRM yet</h2>
<p>If you do a handful of jobs a month and reply to everyone the same day, keep a spreadsheet. Here's <a href="/guides/how-to-keep-track-of-customers">a simple one that works</a>. Move up when you notice one of these: you forgot to call someone back, two people called the same lead, or you can't say how many estimates are still open.</p>
<h2>Our take</h2>
<p>We run a marketing CRM for our clients, so we're biased. If scheduling is what's killing you, buy field-service software first. If leads are leaking, our <a href="/services/crm-automation">done-for-you CRM and follow-up</a> is part of the $497 a month Complete plan, and it connects to the job software you already use.</p>`,
    faq: [
      ["What is the best CRM for a small home service business?", "It depends on the problem. For scheduling, dispatch and invoicing, look at field-service software such as Jobber or Housecall Pro. For missed calls, follow-up and reviews, look at a marketing CRM. Many small businesses connect one of each."],
      ["Is Jobber a CRM?", "Jobber includes a client manager along with scheduling, quoting and invoicing, so it covers the basics of a CRM. Automatic quote follow-ups and two-way texting depend on the plan."],
      ["Do I really need a CRM?", "Not if you handle a few jobs a month and reply to everyone. You do once leads, estimates or callbacks start slipping."],
      ["How much does a CRM cost for contractors?", "Jobber's single-user plans listed at $49 to $199 a month before annual discounts in November 2026, and teams cost more. Done-for-you systems cost more because someone sets them up and runs them."],
    ],
  },

  {
    slug: "best-crm-for-plumbers",
    path: "/guides/best-crm-for-plumbers",
    title: "Best CRM for Plumbers: What a Small Shop Really Needs",
    description: "What a small plumbing business needs from a CRM, which type fits a solo plumber, a small crew or a growing shop, and the features worth paying for.",
    h1: "Best CRM for plumbers: what a small shop really needs",
    lede: "A plumbing CRM has to survive one test: it's 4 pm, you're under a sink and the phone rings. Here's what to look for, by the size of your shop.",
    eyebrow: "CRM for plumbers", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want us to set up your follow-up?",
    content: `
<div class="callout"><p><strong>Short version:</strong> solo plumbers need call capture and simple invoicing. Shops with a few trucks need scheduling and dispatch. Every size needs automatic follow-up on estimates and a review request after each job. Buy for the problem you have today.</p></div>
<h2>What makes plumbing different</h2>
<ul>
<li><strong>Half your calls can't wait.</strong> A homeowner with water on the floor calls the next plumber if you don't answer.</li>
<li><strong>Small jobs lead to big ones.</strong> Today's drain cleaning is next year's water heater, if they remember your name.</li>
<li><strong>Estimates go quiet.</strong> Repipes and water heaters get compared. Whoever follows up is still in the running.</li>
</ul>
<h2>Best fit by shop size</h2>
<table>
<tr><th>Your shop</th><th>What you need</th><th>What to look at</th></tr>
<tr><td>Just you</td><td>Missed-call text-back, customer list, invoices from your phone</td><td>A simple invoicing app plus a follow-up tool, or an entry field-service plan</td></tr>
<tr><td>2 to 5 trucks</td><td>Scheduling, dispatch, quotes, card payments, job history</td><td>Jobber, Housecall Pro or Workiz</td></tr>
<tr><td>Growing past that</td><td>Call booking, memberships, reporting by technician</td><td>ServiceTitan or the upper plans of the tools above</td></tr>
<tr><td>Any size, leads leaking</td><td>One inbox, estimate follow-up, reviews, win-back texts</td><td>A marketing CRM connected to your job software</td></tr>
</table>
<h2>The features that pay for themselves</h2>
<h3>Missed-call text-back</h3>
<p>You can't answer with both hands in a wall. A text goes out right away: "Sorry we missed you, what's going on?" The caller has a reason to wait. Put your numbers into the free <a href="/tools/missed-call-calculator">missed call calculator</a> to see what it's worth to you.</p>
<h3>Estimate follow-up</h3>
<p>Three short messages over two weeks, sent automatically, stopping as soon as they answer. Copy ours from <a href="/guides/how-to-follow-up-on-an-estimate">how to follow up on an estimate</a>.</p>
<h3>Customer and house history</h3>
<p>Water heater age, shut-off location, last visit. When you call to say the heater is twelve years old, it isn't a sales call. It's useful.</p>
<h3>Review requests</h3>
<p>Plumbers get picked off Google Maps. Every finished job should trigger a request. See <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</p>
<h3>Reminders that bring people back</h3>
<p>Water heater flush, sump pump test before the rainy season, outdoor taps before the first freeze. Customers won't remember. Your CRM will.</p>
<h2>What you can skip</h2>
<ul>
<li>Lead scoring and sales forecasts</li>
<li>Anything that needs a laptop in the truck</li>
<li>A 30-page setup you'll never finish</li>
</ul>
<h2>How to switch without losing a week</h2>
<ol>
<li>Export your customers from wherever they are now, even if it's your phone.</li>
<li>Clean up duplicates and add mobile numbers.</li>
<li>Turn on one automation first. We suggest missed-call text-back.</li>
<li>Run it for two weeks, then add estimate follow-up.</li>
<li>Then review requests. Three automations cover most of the benefit.</li>
</ol>
<h2>Have it built for you</h2>
<p>We set up and run <a href="/services/crm-automation">CRM and follow-up automation</a> for plumbers and connect it to the job software you use. It's part of our <a href="/marketing/plumbing">plumbing marketing plan</a>. For how it compares with Jobber and others, read <a href="/guides/best-crm-for-home-service-business">how to choose a home service CRM</a>.</p>`,
    faq: [
      ["What CRM do most plumbers use?", "Small shops commonly use field-service software such as Jobber, Housecall Pro or Workiz, and larger ones often use ServiceTitan. Some add a marketing CRM for missed calls, follow-up and reviews."],
      ["Does a solo plumber need a CRM?", "Not a big one. A customer list, quick invoicing and missed-call text-back cover most of it. Add estimate follow-up when quotes start slipping."],
      ["Can a CRM answer my phone?", "Some can. An AI receptionist can answer, take the details and book a visit, and missed-call text-back covers the rest."],
      ["Can I move my customers from my phone into a CRM?", "Yes. Contacts can be exported and imported. We do it for our clients."],
    ],
  },

  {
    slug: "how-to-keep-track-of-customers",
    path: "/guides/how-to-keep-track-of-customers",
    title: "How to Keep Track of Customers: Spreadsheet to CRM",
    description: "A simple system for tracking customers in a service business: the spreadsheet columns to use, a 10-minute weekly routine, and when to move to a CRM.",
    h1: "How to keep track of customers in a service business",
    lede: "You don't need software to start. You need one list, the right columns and ten minutes a week. Here's the setup, and the signs you've outgrown it.",
    eyebrow: "Customer tracking", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Outgrown the spreadsheet?",
    content: `
<div class="callout"><p><strong>Short version:</strong> keep one list with a row per customer and a column for the next step and its date. Sort by that date every Monday and do what's due. When you start missing dates or two people need the list at once, move to a CRM.</p></div>
<h2>The spreadsheet that works</h2>
<p>Open Excel or Google Sheets and make these columns:</p>
<table>
<tr><th>Column</th><th>Why it's there</th></tr>
<tr><td>Name, mobile, email, address</td><td>You can't text a landline or review-request a blank</td></tr>
<tr><td>Where they came from</td><td>Google, referral, yard sign. Tells you what's working</td></tr>
<tr><td>Job and date</td><td>What you did and when</td></tr>
<tr><td>Amount and paid (yes/no)</td><td>Catches unpaid invoices</td></tr>
<tr><td>Status</td><td>New lead, estimate sent, booked, done, lost</td></tr>
<tr><td><strong>Next step</strong></td><td>Call back, send quote, ask for review, offer tune-up</td></tr>
<tr><td><strong>Next step date</strong></td><td>The column that makes it work</td></tr>
<tr><td>Review asked (date)</td><td>So everyone gets asked, once</td></tr>
</table>
<p>The two bold columns matter most. A list without a next step is an address book.</p>
<h2>Ten minutes every Monday</h2>
<ol>
<li>Sort by next step date.</li>
<li>Do everything that's due or late.</li>
<li>Filter for "estimate sent" and follow up on anything older than two days.</li>
<li>Filter for finished jobs with no review request, and send them.</li>
<li>Filter for unpaid, and send a reminder.</li>
</ol>
<h2>What to write down after every call</h2>
<p>One line, right away: what they want, what you promised and when. "Wants fence quote, 120 ft, dog, call Thursday." You'll thank yourself on Thursday.</p>
<h2>Five signs you've outgrown it</h2>
<ul>
<li>You forgot to call someone back this month.</li>
<li>Two people edit the list and it's never right.</li>
<li>Conversations are split between your texts, email and Facebook.</li>
<li>You don't know how many estimates are open.</li>
<li>You stopped updating it because you're too busy, which is when you need it most.</li>
</ul>
<h2>What changes with a CRM</h2>
<p>The next step happens by itself. A lead comes in and gets a text. An estimate goes quiet and gets a follow-up. A job closes and the review request goes out. Last year's customers hear from you before the season starts. You look at a screen that tells you who needs a real person.</p>
<p>Two kinds are worth looking at. We compare them in <a href="/guides/best-crm-for-home-service-business">how to choose a CRM for a home service business</a>, and <a href="/guides/best-crm-for-plumbers">for plumbers</a> in particular.</p>
<h2>Moving from a spreadsheet</h2>
<p>If you used the columns above, it's an import. Save the sheet as a CSV, match the columns and you're done. We <a href="/services/crm-automation">import your customers and build the follow-ups for you</a> if you'd rather not.</p>`,
    faq: [
      ["What is the best way to keep track of customers?", "One list with a next step and a date for every customer, checked weekly. A spreadsheet is fine to start. A CRM does it automatically once you're busier."],
      ["How do I keep track of customers in Excel?", "Use one row per customer with contact details, job, amount, paid, status, next step and next step date. Sort by next step date each week."],
      ["When should I switch from a spreadsheet to a CRM?", "When callbacks get missed, more than one person needs the list, or you can't say how many estimates are open."],
      ["How do I keep track of customer payments?", "Add amount and paid columns and filter for unpaid every week, or use invoicing software that marks invoices paid automatically."],
    ],
  },

  {
    slug: "jobber-vs-housecall-pro",
    path: "/guides/jobber-vs-housecall-pro",
    title: "Jobber vs Housecall Pro: Which Fits Your Business? (2026)",
    description: "Jobber vs Housecall Pro from a team that sells neither: what each publishes about plans and add-ons, how to run a fair trial, and what both leave to you.",
    h1: "Jobber vs Housecall Pro: which one fits your business?",
    lede: "Both do scheduling, quotes, invoices and payments for home-service businesses. We sell neither. Here's what their own pages say, how to decide in two weeks, and what neither does for you.",
    eyebrow: "Software comparison", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Using one of these? We connect to both.",
    content: `
<div class="callout"><p><strong>Short version:</strong> they cover the same basics, so don't pick from a feature list. Trial both on real jobs for a week each and pick the one your crew uses without complaining. Check that texting, quote follow-up and QuickBooks sync are in the plan you're pricing.</p></div>
<h2>Side by side</h2>
<table>
<tr><th></th><th>Jobber</th><th>Housecall Pro</th></tr>
<tr><td>List price, paid monthly</td><td>1 user: Core $49, Connect $139, Grow $199</td><td>Basic $79 (1 user), Essentials $189 (5 users), Max $329 (8 users)</td></tr>
<tr><td>List price, paid yearly</td><td>1 user: $29, $99, $149 a month</td><td>$59, $149, $299 a month</td></tr>
<tr><td>Free trial</td><td>14 days, no card needed</td><td>14 days, no card needed</td></tr>
<tr><td>Scheduling, quotes, invoices, payments</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Quote follow-up</td><td>Automatic from Connect</td><td>Pipeline add-on with automated follow-ups</td></tr>
<tr><td>Two-way texting</td><td>From Grow</td><td>Ask which plan</td></tr>
<tr><td>QuickBooks Online sync</td><td>From Connect</td><td>From Essentials</td></tr>
<tr><td>AI call answering</td><td>Receptionist add-on, $99/mo</td><td>CSR AI add-on, ask for the price</td></tr>
<tr><td>Phone app offline</td><td>Check in the trial</td><td>Offline viewing listed on every plan</td></tr>
</table>
<p>Read on November 24, 2026 from ${JOBBER} and ${HCP}. Jobber's team plans cost more. Housecall Pro lists $35 a month for each extra user. Both were running Black Friday sales that week, so compare the price after the promotion ends. Some visitors to Housecall Pro's page are asked a few questions before it shows prices.</p>
<h2>How to choose in two weeks</h2>
<ol>
<li><strong>Write down your three worst admin problems.</strong> Late invoices? Double bookings? Quotes nobody chases?</li>
<li><strong>Trial one for a week on real jobs.</strong> Quote, schedule, finish and invoice at least five.</li>
<li><strong>Trial the other the next week.</strong> Same jobs, same people.</li>
<li><strong>Ask the least techy person on the crew.</strong> If they can close out a job on their phone, it will stick.</li>
<li><strong>Price it with your real team size</strong> and the add-ons you need.</li>
</ol>
<h2>Questions to ask both sales teams</h2>
<ul>
<li>What's the price in month 13, with my number of users?</li>
<li>Which plan includes two-way texting, quote follow-up and QuickBooks?</li>
<li>Can I export all my customers and job history if I leave?</li>
<li>What are the card processing rates on my plan?</li>
</ul>
<h2>What neither one does for you</h2>
<p>Both are built to run jobs you've already won. Neither is your marketing team. Getting found on Google Maps, replying to reviews, working your past customers and rebuilding a website that doesn't convert are still on you, whichever you choose.</p>
<p>That's the part we do. We connect to <a href="/integrations/jobber">Jobber</a> and <a href="/integrations/housecall-pro">Housecall Pro</a>, so finished jobs trigger review requests and follow-ups. Guides for doing it yourself: <a href="/guides/jobber-google-reviews">reviews from Jobber</a> and <a href="/guides/housecall-pro-google-reviews">reviews from Housecall Pro</a>. Still deciding what type of tool you need? Start with <a href="/guides/best-crm-for-home-service-business">how to choose a CRM</a>.</p>`,
    faq: [
      ["Is Jobber or Housecall Pro better?", "They cover the same basics. The better one is the one your crew uses easily at the price of the plan that has the features you need. Trial both on real jobs."],
      ["Which is cheaper, Jobber or Housecall Pro?", "It depends on team size, plan and add-ons. In November 2026 Jobber listed one-user plans at $49, $139 and $199 paid monthly. Housecall Pro listed $79 for 1 user, $189 for 5 users and $329 for 8 users. For one person Jobber's entry plan was cheaper. For a team, compare the plans that have the features you need."],
      ["Can I switch from Jobber to Housecall Pro?", "Yes. Export your customers first and ask the new vendor what they'll import for you, especially job history."],
      ["Does TableTurnerr work with both?", "Yes. We connect to both, so review requests and follow-ups go out when a job is done."],
    ],
  },

  {
    slug: "best-invoicing-software-for-contractors",
    path: "/guides/best-invoicing-software-for-contractors",
    title: "Best Invoicing Software for Contractors: How to Choose",
    description: "How contractors should pick invoicing software: a simple app, accounting software or field-service software, plus how to get paid faster with any of them.",
    h1: "Best invoicing software for contractors: how to choose",
    lede: "The best invoicing software is the one that sends the invoice before you leave the driveway. Here are the three types, who each one suits, and six habits that get you paid faster whichever you use.",
    eyebrow: "Invoicing", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want every paid invoice to bring you a review?",
    content: `
<div class="callout"><p><strong>Short version:</strong> solo and paid on the spot: a simple estimate-and-invoice app. Books matter most: accounting software. Several jobs a day with a crew: field-service software. Whatever you pick, send the invoice on site, take cards and let it send the reminders.</p></div>
<h2>The three types</h2>
<table>
<tr><th>Type</th><th>Best for</th><th>Examples</th><th>Watch for</th></tr>
<tr><td>Invoice app</td><td>Solo contractors who need estimates and invoices from a phone</td><td>Joist, Square Invoices</td><td>Monthly document limits, card fees</td></tr>
<tr><td>Accounting software</td><td>Anyone who wants clean books and easy taxes</td><td>QuickBooks Online</td><td>Not built for scheduling or dispatch</td></tr>
<tr><td>Field-service software</td><td>Crews running several jobs a day</td><td>Jobber, Housecall Pro, Workiz</td><td>Costs more per user; check QuickBooks sync</td></tr>
</table>
<h2>What it costs</h2>
<p>Examples from the vendors' own pages on November 24, 2026:</p>
<ul>
<li><strong>Joist:</strong> ${JOIST} listed Basics at $10, Pro at $17 and Elite at $32 a month. Basics is limited to 5 documents a month.</li>
<li><strong>Jobber:</strong> ${JOBBER} listed one-user plans at $49, $139 and $199 a month before annual discounts. Invoices and online payments are in all three. Automatic invoice follow-ups and QuickBooks sync start at the $139 plan.</li>
<li><strong>Square Invoices:</strong> a free plan, then $49 and $149 a month per location. Cards cost 3.3% + 30¢ online on the free plan, so compare fees as well as plan prices.</li>
<li><strong>QuickBooks Online:</strong> a free plan limited to 2 invoices a month, then list prices from $38 to $340 a month.</li>
</ul>
<p>Prices and promotions change, so check before you buy.</p>
<h2>What to look for</h2>
<ol>
<li>Turn an approved estimate into an invoice in one tap.</li>
<li>Deposits and progress payments for bigger jobs.</li>
<li>Pay by card or bank transfer from a link in a text.</li>
<li>Automatic reminders for unpaid invoices.</li>
<li>Photos and signatures attached to the job.</li>
<li>Sync with your accounting software.</li>
<li>A trigger when an invoice is paid, so a thank-you and review request can go out.</li>
</ol>
<h2>What to put on a contractor invoice</h2>
<p>Your business name, license number if your state requires it, and contact details. The customer's name and job address. Invoice number and date. Labor and materials as separate lines. Tax, deposit paid and balance due. Due date and how to pay. Warranty terms. Short and specific invoices get fewer questions, and fewer questions means faster payment.</p>
<h2>Six habits that get you paid faster</h2>
<ol>
<li><strong>Take a deposit</strong> on any job with materials, within your state's limits.</li>
<li><strong>Invoice on site,</strong> before you pull away.</li>
<li><strong>Text it.</strong> Emails sit unread.</li>
<li><strong>Put the due date in words:</strong> "due today" or "due Friday, June 5," not "net 30."</li>
<li><strong>Automate reminders</strong> at 1, 7 and 14 days late.</li>
<li><strong>Call at day 21.</strong> A real person, friendly, with the total in front of you.</li>
</ol>
<h3>A reminder text you can copy</h3>
<blockquote class="callout"><p>Hi Karen, quick reminder that the invoice for your deck repair ($640) was due Friday. You can pay here: [link]. Any questions, just reply. Thanks! Tom, Ridge Decks</p></blockquote>
<h2>The step most contractors miss</h2>
<p>A paid invoice means a customer who's happy enough to pay. That's the moment to ask for a review and to set the reminder for next year's service. We don't replace your accounting software. We connect to it, including <a href="/integrations/quickbooks">QuickBooks</a> and <a href="/integrations/jobber">Jobber</a>, so a finished job starts a <a href="/guides/how-to-get-more-google-reviews">review request</a> and a <a href="/services/crm-automation">follow-up</a> automatically.</p>`,
    faq: [
      ["What is the best invoicing software for a small contractor?", "For a solo contractor, a simple app such as Joist or Square Invoices is usually enough. With a crew and several jobs a day, field-service software such as Jobber or Housecall Pro fits better. For clean books, use QuickBooks or sync with it."],
      ["Is there free invoicing software for contractors?", "Square Invoices has a free plan, and QuickBooks has one limited to 2 invoices a month (November 2026). Joist no longer has a free plan. Check card fees, since that's where the cost is."],
      ["How do I invoice as a contractor?", "List your business details, the customer and job address, invoice number, date, labor, materials, tax, deposit, balance, due date and how to pay. Send it the day the job is done."],
      ["How do I get customers to pay faster?", "Take deposits, invoice on site, text a payment link and let the software send reminders."],
    ],
  },

  {
    slug: "how-to-follow-up-on-an-estimate",
    path: "/guides/how-to-follow-up-on-an-estimate",
    title: "How to Follow Up on an Estimate (Texts You Can Copy)",
    description: "When and how to follow up on an estimate without being pushy: a five-touch schedule, text and email templates, and when to let the lead go.",
    h1: "How to follow up on an estimate without being pushy",
    lede: "You drove out, measured and wrote it up. Then nothing. Most owners send one estimate and wait. Here's a five-message schedule that keeps you in the running, with texts you can copy.",
    eyebrow: "Estimate follow-up", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want this to run by itself?",
    content: `
<div class="callout"><p><strong>Short version:</strong> follow up the same day, then around days 2, 5, 10 and 30. Make each message useful: confirm they got it, answer the common question, offer a date, then close the file politely. Stop as soon as they reply.</p></div>
<h2>Why estimates go quiet</h2>
<p>Usually it isn't a no. They're waiting on another quote, talking to a spouse, unsure about one line or just busy. A short message at the right time answers the question they didn't ask.</p>
<h2>The five-message schedule</h2>
<h3>1. Same day: did it arrive?</h3>
<blockquote class="callout"><p>Hi Jen, it's Carlos from Brightside Electric. I just sent the estimate for the panel upgrade. Can you confirm it came through? Happy to go over any line.</p></blockquote>
<h3>2. Day 2: answer the usual question</h3>
<blockquote class="callout"><p>Hi Jen, most people ask about the permit. It's included, and we handle the inspection. Anything else I can clear up?</p></blockquote>
<h3>3. Day 5: offer a date</h3>
<blockquote class="callout"><p>Hi Jen, I'm booking the week of the 14th and have Tuesday or Thursday open. Want me to hold one for you?</p></blockquote>
<p>Only say this if it's true.</p>
<h3>4. Day 10: make it easy to say no</h3>
<blockquote class="callout"><p>Hi Jen, no hard feelings if you went another way or the timing changed. Should I keep the estimate open or close it out?</p></blockquote>
<p>A message that makes it easy to say no often gets the reply.</p>
<h3>5. Day 30: one last check</h3>
<blockquote class="callout"><p>Hi Jen, still thinking about the panel? The estimate is good until the 30th. If not, no worries, and thanks for having me out.</p></blockquote>
<h2>The email version</h2>
<p><strong>Subject:</strong> Your panel upgrade estimate</p>
<blockquote class="callout"><p>Hi Jen,</p><p>Following up on the estimate I sent Tuesday. It covers the 200-amp panel, permit, inspection and cleanup, with a 2-year warranty on our work.</p><p>If price is the question, I can show you which parts could wait. If timing is, I have openings the week of the 14th.</p><p>Reply here or call me at [number].</p><p>Carlos</p></blockquote>
<h2>Rules that keep it friendly</h2>
<ul>
<li>Stop the minute they answer, whatever the answer.</li>
<li>One question per message.</li>
<li>No "just checking in." Give them something each time.</li>
<li>Never invent a deadline.</li>
<li>Text during the day, and honor opt-outs.</li>
<li>Call once on bigger jobs. Some people only decide on the phone.</li>
</ul>
<h2>Know your numbers</h2>
<p>Track three things each month: estimates sent, estimates won and how many got at least three follow-ups. If only a few got three, that's your cheapest growth. You already paid for those leads. See what a few extra wins are worth in our <a href="/tools/marketing-roi-calculator">marketing ROI calculator</a>.</p>
<h2>Make it automatic</h2>
<p>You won't remember message four on a Thursday in July. A CRM will. Set the schedule to start when an estimate is sent and stop on a reply. Our <a href="/services/crm-automation">CRM and follow-up automation</a> does this for you, along with appointment reminders. If you're choosing software yourself, see <a href="/guides/best-crm-for-home-service-business">how to choose a CRM</a>.</p>`,
    faq: [
      ["How long should I wait to follow up on an estimate?", "Confirm it arrived the same day, then follow up around day 2, 5, 10 and 30. Stop when they reply."],
      ["How do you professionally follow up on an estimate?", "Use their name, mention the job, give something useful such as an answer or an open date, and ask one clear question."],
      ["How many times should I follow up on a quote?", "Around five messages over a month is reasonable, as long as each is useful and you stop when they answer."],
      ["Is it better to text or call after an estimate?", "Text for quick checks and dates. Call once for bigger jobs, where people often have a question they won't type."],
    ],
  },

  {
    slug: "ai-receptionist-for-contractors",
    path: "/guides/ai-receptionist-for-contractors",
    title: "AI Receptionist for Contractors: Cost, Pros and Cons",
    description: "What an AI receptionist does for plumbers, HVAC and other contractors, what it costs, where it goes wrong and how it compares with text-back.",
    h1: "AI receptionist for contractors: what it does, costs and gets wrong",
    lede: "An AI receptionist picks up when you can't, asks what's wrong, and books or passes on the job. Here's what it costs, where it helps, where it doesn't, and how to test one before your customers do.",
    eyebrow: "AI answering", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want to hear one answer your calls?",
    content: `
<div class="callout"><p><strong>Short version:</strong> an AI receptionist makes sense if you miss calls after hours or on the job and new callers don't leave voicemail. Expect tens to a few hundred dollars a month depending on minutes and setup. Keep a human route for emergencies, tell callers it's an assistant, and test it yourself first.</p></div>
<h2>What it does</h2>
<ul>
<li>Answers when you don't, day or night</li>
<li>Asks for name, address, problem and how urgent it is</li>
<li>Answers simple questions such as hours, service area and whether you do that kind of work</li>
<li>Books a time, or sends you the details by text</li>
<li>Forwards real emergencies to you or your on-call tech</li>
</ul>
<h2>What it costs</h2>
<p>Pricing comes in three shapes: a flat monthly fee, a fee with a block of minutes, or per call. Two examples from vendors' own pages on November 24, 2026: ${JOBBER} lists its Receptionist add-on at $99 a month, and ${JOIST} lists one starting at $49 a month.</p>
<p>When you compare, ask:</p>
<ol>
<li>How many minutes are included, and what does an extra one cost?</li>
<li>Do spam calls and hang-ups count?</li>
<li>Is setup included, or do I write the script?</li>
<li>Does it book into the calendar I use?</li>
</ol>
<h2>AI receptionist, text-back or a live service?</h2>
<table>
<tr><th></th><th>Missed-call text-back</th><th>AI receptionist</th><th>Live answering</th></tr>
<tr><td>How it helps</td><td>Texts the caller right away</td><td>Talks and takes the details</td><td>A person answers</td></tr>
<tr><td>Cost</td><td>Lowest</td><td>Middle</td><td>Usually highest</td></tr>
<tr><td>Best for</td><td>Daytime misses on the job</td><td>After hours and overflow</td><td>Complex or emotional calls</td></tr>
<tr><td>Weak spot</td><td>Landlines, people who won't text</td><td>Accents, noise, odd requests</td><td>Cost, scripts</td></tr>
</table>
<p>Many shops start with text-back and add AI for nights and weekends.</p>
<h2>Where it goes wrong</h2>
<ul>
<li><strong>Quoting prices.</strong> Don't let it. Have it offer a visit or a callback.</li>
<li><strong>Emergencies.</strong> Gas smell, sparks, active flooding. Set rules so these go to a person at once, and tell callers to contact emergency services when they're in danger.</li>
<li><strong>Pretending to be human.</strong> Say it's an assistant. Callers mind less than you'd think, and some states have rules about it.</li>
<li><strong>Recording.</strong> Call recording laws vary by state. Check before you turn it on.</li>
<li><strong>Nobody reads the messages.</strong> A taken message that isn't returned is a missed call with extra steps.</li>
</ul>
<h2>Test it like a customer</h2>
<p>Before it goes live, call it five times: a simple booking, a price question, an emergency, a wrong number and someone upset. Fix what sounds off. Then check the transcripts weekly for the first month.</p>
<h2>Is it worth it for you?</h2>
<p>Count the calls you missed last month and how many left no voicemail. Put them in the free <a href="/tools/missed-call-calculator">missed call calculator</a>. If one or two saved jobs a month cover the cost, try it.</p>
<h2>How we do it</h2>
<p>Our <a href="/services/missed-call-text-back">missed-call text-back and AI answering</a> comes set up for you in the $497 a month Complete plan, with 150 minutes a month included, on your existing number. Leads go into your <a href="/services/crm-automation">CRM with follow-up</a>, so nobody has to copy anything.</p>`,
    faq: [
      ["How much does an AI receptionist cost per month?", "Entry plans we checked in November 2026 were $49 to $99 a month as add-ons to contractor software. Cost rises with minutes, setup and integrations."],
      ["Can an AI receptionist book appointments?", "Many can, if they connect to your calendar or job software. Otherwise they take the details and text you."],
      ["Will customers hang up on an AI receptionist?", "Some will. Tell callers it's an assistant, keep it short and offer a way to reach a person, especially for emergencies."],
      ["Is an AI receptionist good for plumbers and HVAC?", "It's useful for after-hours and overflow calls, with rules that forward true emergencies to the on-call tech."],
    ],
  },

  {
    slug: "how-to-get-more-plumbing-customers",
    path: "/guides/how-to-get-more-plumbing-customers",
    title: "How to Get More Plumbing Customers Without Buying Leads",
    description: "How to get more customers for your plumbing business without paying for shared leads: past customers, Google Maps, reviews, answered calls and follow-up.",
    h1: "How to get more plumbing customers without buying leads",
    lede: "Shared leads go to several plumbers at once, and the fastest or cheapest wins. Here's how to get calls that only come to you, in the order that pays back soonest.",
    eyebrow: "Plumbing leads", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want to see where you stand on Google Maps?",
    content: `
<div class="callout"><p><strong>Short version:</strong> first work the customers you already have. Then stop losing calls. Then win on Google Maps with a complete profile and steady reviews. Then build pages for each service and town. Buy leads only to fill gaps.</p></div>
<h2>Week 1: the customers you already have</h2>
<p>Your past customers trust you and cost nothing to reach.</p>
<ul>
<li><strong>Ask them for reviews.</strong> Text 15 a day. <a href="/guides/ask-past-customers-for-google-reviews">Here's the plan and the messages.</a></li>
<li><strong>Remind them.</strong> Water heater flush, sump pump test, outdoor taps before the freeze. Make sure you have permission before sending promotional texts.</li>
<li><strong>Reopen old estimates.</strong> Anything from the last 90 days that went quiet gets a short message. <a href="/guides/how-to-follow-up-on-an-estimate">Copy these.</a></li>
</ul>
<h2>Week 2: stop losing the calls you get</h2>
<p>More leads don't help if they go to voicemail. Turn on missed-call text-back, check how many calls you miss with the <a href="/tools/missed-call-calculator">missed call calculator</a>, and decide who answers at night. An <a href="/guides/ai-receptionist-for-contractors">AI receptionist</a> is one option.</p>
<h2>Weeks 3 and 4: Google Maps</h2>
<p>"Plumber near me" is decided on the map. The basics:</p>
<ol>
<li>Primary category set to Plumber, with the right secondary categories.</li>
<li>Every service listed: drain cleaning, water heaters, leak detection, repipes, sewer.</li>
<li>Real service areas and real hours, including emergency hours if you answer.</li>
<li>Photos from actual jobs, added every week.</li>
<li>Reviews coming in every week, all answered.</li>
</ol>
<p>The full list is in <a href="/guides/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a>.</p>
<h2>Month 2: pages that match what people search</h2>
<p>One page that says "we do plumbing" can't rank for everything. Make a page for each money service and each main town, and answer the questions people ask: what it costs, how long it takes, what to do until you arrive. These pages also help when someone asks <a href="/guides/how-to-get-recommended-by-chatgpt">ChatGPT or Google's AI</a> who to call.</p>
<h2>Month 3 and on: referrals that run themselves</h2>
<ul>
<li>Meet property managers, realtors, remodelers and restoration companies. One good one sends work for years.</li>
<li>Leave a card and a sticker on the water heater at every job.</li>
<li>Reward referrals if you like. Just keep rewards away from reviews.</li>
</ul>
<h2>Where paid leads fit</h2>
<table>
<tr><th>Source</th><th>Who else gets it</th><th>Use it when</th></tr>
<tr><td>Your profile, website and past customers</td><td>Nobody</td><td>Always</td></tr>
<tr><td>Google Local Services Ads</td><td>Shown next to other plumbers</td><td>You answer fast and have reviews</td></tr>
<tr><td>Google Ads</td><td>Shown next to other ads</td><td>Your page and phones are ready</td></tr>
<tr><td>Shared lead sites</td><td>Often several plumbers</td><td>To fill an empty week</td></tr>
</table>
<p>We don't run ads ourselves. If you're weighing them up, read <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>
<h2>Track one number</h2>
<p>Ask every caller how they found you and write it down. After 60 days you'll know which of these to do more of. Here's <a href="/guides/how-to-keep-track-of-customers">a simple way to track it</a>.</p>
<h2>Want help?</h2>
<p>Start with the <a href="/free-google-maps-audit">free Google Maps audit</a>. It shows how you compare with the top plumbers near you and what to fix first. Our full <a href="/marketing/plumbing">plumbing marketing plan</a> covers the rest.</p>`,
    faq: [
      ["How can I get more customers for my plumbing business?", "Work past customers first with review requests, reminders and old estimates. Then answer or text back every call, complete your Google Business Profile, collect reviews weekly and build pages for each service and town."],
      ["How do plumbers get leads for free?", "From Google Business Profile, reviews, past customers, referrals and their own website. They cost time instead of a fee per lead."],
      ["Are shared lead sites worth it for plumbers?", "They can fill a slow week, but you often compete with several plumbers for the same job. Build sources that only call you."],
      ["How long does plumbing marketing take to work?", "Past-customer outreach can bring work in days. Google Maps usually takes a few months, and new pages can take longer."],
    ],
  },
];
