// Software, booking, payment and compliance guides (added 2026-11-25). Topics from Google autosuggest and from what Jobber,
// Housecall Pro, ServiceTitan and Workiz publish. HighLevel facts: its help center, read 2026-11-24/25. Jobber and Housecall
// Pro prices: see guides5 (read 2026-11-24). Re-check dated figures when updating.
const DATE = "2026-11-25";
const HL = (id, text) => `<a href="https://help.gohighlevel.com/support/solutions/articles/${id}" rel="noopener">${text}</a>`;
const GOOGLE_REVIEWS = `<a href="https://support.google.com/contributionpolicy/answer/7400114" rel="noopener">Google's review policy</a>`;
const FTC = `<a href="https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers" rel="noopener">the FTC's questions and answers</a>`;

export const guides6 = [
  {
    slug: "gohighlevel-for-contractors",
    path: "/guides/gohighlevel-for-contractors",
    title: "GoHighLevel for Contractors: What It Does and Doesn't (2026)",
    description: "What GoHighLevel can do for plumbers, HVAC, roofers and other home-service companies, what it can't, what it costs and when to keep your job software.",
    h1: "GoHighLevel for contractors: what it does, and what it doesn't",
    lede: "HighLevel is the platform behind a lot of agency CRMs, including ours. Here's what it's good at for a home-service company, where it falls short, and the extra costs that surprise people.",
    eyebrow: "CRM for contractors", readMinutes: 4, article: { date: DATE },
    ctaTitle: "Want it set up without learning it?",
    content: `
<div class="callout"><p><strong>Short version:</strong> HighLevel is strong at leads, calls, texts, follow-up, booking, reviews, estimates and payments. It isn't a full replacement for job software such as Jobber or ServiceTitan. Most contractors should use it next to their job software. We build on it, so weigh our view with that in mind.</p></div>
<h2>What it does well for home services</h2>
<table>
<tr><th>Job to be done</th><th>What HighLevel has</th></tr>
<tr><td>Answer every lead</td><td>One inbox for calls, texts, email, web chat, Facebook and Instagram, missed-call text-back, AI chat and phone assistants</td></tr>
<tr><td>Book visits</td><td>Booking pages with calendar sync, reminders, reschedule links and deposits</td></tr>
<tr><td>Follow up</td><td>Automations that send texts and emails and stop when somebody replies</td></tr>
<tr><td>Win and bill</td><td>Lead board, estimates, e-signatures, invoices, text-to-pay, card on file, subscriptions</td></tr>
<tr><td>Reputation</td><td>Review requests, QR codes, review monitoring, website widgets</td></tr>
<tr><td>Marketing</td><td>Websites, email and text campaigns, social posting, call tracking</td></tr>
</table>
<h2>What it doesn't do well</h2>
<ul>
<li><strong>Dispatch and routes.</strong> The generally available product has no dispatch board or drive-time slots. A Field Services module is in ${HL("155000009368", "private beta for selected accounts")}, so don't buy on it yet.</li>
<li><strong>Job costing, payroll, truck stock.</strong> We found nothing on these in its help center.</li>
<li><strong>Setup.</strong> It's a box of parts. Somebody has to build the calendars, messages and automations.</li>
</ul>
<h2>What it costs</h2>
<p>On November 24, 2026, <a href="https://www.gohighlevel.com/pricing" rel="noopener">HighLevel's pricing page</a> listed agency plans from $97 a month. The subscription isn't the whole bill:</p>
<ul>
<li><strong>Phone and texting:</strong> numbers, minutes and text segments are charged by use, plus carrier fees.</li>
<li><strong>Registration:</strong> texting from US local numbers needs ${HL("155000005200", "A2P registration")}, with a one-time fee and a monthly one.</li>
<li><strong>AI:</strong> sold by use or as ${HL("155000006652", "a monthly plan per account")}, with phone charges on top.</li>
<li><strong>Extras:</strong> listings, WhatsApp and some workflow actions.</li>
</ul>
<p>Through an agency you usually pay one fee for setup and running it. Ask which of these are included.</p>
<h2>Does it connect to my job software?</h2>
<p>Partly, and it differs. HighLevel's Jobber app syncs ${HL("155000005429", "clients and contacts both ways")}. Its Housecall Pro app ${HL("155000008060", "starts and updates things from workflows")}. The QuickBooks connection ${HL("48001153903", "sends invoices and receipts over")}. Ask for a list of exactly which fields move, in which direction, before you rely on it.</p>
<h2>Do it yourself or have it set up?</h2>
<p>If you like building systems and have a few evenings, you can run it yourself. If you don't, you'll pay for software you don't use. The setup that matters is small: number registered, missed-call text, estimate follow-up, reminders and review requests. Add the rest later.</p>
<p>See <a href="/services/everything-we-set-up">everything we set up on it</a>, or compare it with <a href="/guides/gohighlevel-vs-jobber">Jobber</a> and <a href="/guides/gohighlevel-vs-housecall-pro">Housecall Pro</a>.</p>`,
    faq: [
      ["Is GoHighLevel good for contractors?", "Yes for leads, follow-up, reviews and payments. No as a replacement for dispatch, routing and job costing. Many contractors use it next to field-service software."],
      ["Can GoHighLevel replace Jobber?", "For a one-person company with simple scheduling, sometimes. For crews and routes, keep Jobber and use HighLevel for leads and follow-up."],
      ["Does GoHighLevel integrate with Jobber?", "Yes. Its marketplace app syncs clients and contacts both ways. Its help article doesn't say that jobs or invoices sync, so test what you need."],
      ["How much does GoHighLevel cost for a small business?", "Agency plans were listed from $97 a month in November 2026, plus phone, text, AI and registration fees. Bought through an agency, the price depends on what's done for you."],
    ],
  },
  {
    slug: "gohighlevel-vs-jobber",
    path: "/guides/gohighlevel-vs-jobber",
    title: "GoHighLevel vs Jobber: Which Do You Need? (2026)",
    description: "GoHighLevel vs Jobber for home-service businesses: what each is for, a side-by-side table, when to use both, and how they connect.",
    h1: "GoHighLevel vs Jobber: which one do you need?",
    lede: "They look alike on a feature list and do different jobs. Jobber runs the work you've won. HighLevel helps you win it. Here's how to choose, and when to use both.",
    eyebrow: "Software comparison", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Keep Jobber. We'll add the follow-up.",
    content: `
<div class="callout"><p><strong>Short version:</strong> choose Jobber if your mess is scheduling, quoting and invoicing. Choose HighLevel if your mess is missed calls, slow follow-up and few reviews. If you have crews and a lead problem, use both. We set up HighLevel for clients and don't sell Jobber.</p></div>
<h2>Side by side</h2>
<table>
<tr><th></th><th>Jobber</th><th>HighLevel</th></tr>
<tr><td>Made for</td><td>Running jobs</td><td>Leads, marketing and follow-up</td></tr>
<tr><td>Schedule and dispatch crews</td><td>Yes</td><td>Not in the general product</td></tr>
<tr><td>Quotes and invoices</td><td>Yes</td><td>Yes, simpler</td></tr>
<tr><td>Online booking</td><td>Yes</td><td>Yes, for visits with a set length</td></tr>
<tr><td>One inbox for calls, texts, web chat and social</td><td>Texting depends on the plan</td><td>Yes</td></tr>
<tr><td>Missed-call text-back</td><td>Check your plan and add-ons</td><td>Yes</td></tr>
<tr><td>Multi-step follow-up</td><td>Quote follow-ups from Connect</td><td>Any sequence you design</td></tr>
<tr><td>Websites and campaigns</td><td>Marketing add-ons</td><td>Yes</td></tr>
<tr><td>Setup</td><td>Ready-made, switch things on</td><td>Needs building</td></tr>
<tr><td>List price</td><td>One-user plans $49 to $199 a month, paid monthly</td><td>Agency plans from $97 a month, plus usage</td></tr>
</table>
<p>Prices read on November 24, 2026, on each company's pricing page. Both change them often.</p>
<h2>Use this to decide</h2>
<ol>
<li><strong>Do you send more than one crew out a day?</strong> You need Jobber or something like it.</li>
<li><strong>Do you miss calls or lose quotes that go quiet?</strong> You need the HighLevel side.</li>
<li><strong>Both?</strong> Keep the job in Jobber. Let HighLevel handle everything before the job is won and after it's finished.</li>
<li><strong>Neither yet?</strong> Fewer than about ten customers a month fits in <a href="/guides/how-to-keep-track-of-customers">a simple list</a>.</li>
</ol>
<h2>How they connect</h2>
<p>HighLevel's Jobber app syncs ${HL("155000005429", "clients and contacts in both directions")}. The same article doesn't mention jobs or invoices. To start a review request or follow-up when a job closes, you need a connection that sees job status. Ours does that part: <a href="/integrations/jobber">how we connect to Jobber</a>.</p>
<h2>Mistakes to avoid</h2>
<ul>
<li>Sending invoices from both. Pick one.</li>
<li>Two systems texting the same customer about the same visit.</li>
<li>Moving job history into a marketing CRM because someone promised it replaces everything.</li>
</ul>`,
    faq: [
      ["Is GoHighLevel better than Jobber?", "Neither is better. Jobber runs jobs and HighLevel runs leads and follow-up. Pick by which part is costing you work."],
      ["Can I use GoHighLevel and Jobber together?", "Yes. Contacts can sync both ways. Keep scheduling and invoicing in Jobber and use HighLevel for calls, follow-up, reviews and campaigns."],
      ["Can GoHighLevel do scheduling for contractors?", "It can book visits into a calendar with reminders. It isn't a dispatch board, and its Field Services module was in private beta in November 2026."],
      ["Which is cheaper, GoHighLevel or Jobber?", "For one person Jobber's entry plan was listed lower in November 2026. Add up the features you need, usage fees and setup time before comparing."],
    ],
  },
  {
    slug: "gohighlevel-vs-housecall-pro",
    path: "/guides/gohighlevel-vs-housecall-pro",
    title: "GoHighLevel vs Housecall Pro: How to Choose (2026)",
    description: "GoHighLevel vs Housecall Pro for home-service companies: what each is built for, a plain side-by-side, how they connect, and when it makes sense to use both.",
    h1: "GoHighLevel vs Housecall Pro: how to choose",
    lede: "Housecall Pro is built for the day of the job. HighLevel is built for everything before and after it. If you're comparing them, work out which half of the business is leaking first.",
    eyebrow: "Software comparison", readMinutes: 3, article: { date: DATE },
    ctaTitle: "On Housecall Pro? We work with it.",
    content: `
<div class="callout"><p><strong>Short version:</strong> for dispatch, technicians and job history, use Housecall Pro. For leads, missed calls, follow-up and campaigns, use HighLevel. They can share events, so plenty of companies run both. We set up HighLevel and don't sell Housecall Pro.</p></div>
<h2>Side by side</h2>
<table>
<tr><th></th><th>Housecall Pro</th><th>HighLevel</th></tr>
<tr><td>Dispatch and technicians</td><td>Yes</td><td>Not in the general product</td></tr>
<tr><td>Estimates, invoices, card payments</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Recurring jobs and service plans</td><td>Built for it (check your plan)</td><td>Recurring billing and appointments, without counting visits used</td></tr>
<tr><td>Booking page</td><td>Yes</td><td>Yes</td></tr>
<tr><td>All messages in one inbox</td><td>Ask which plan</td><td>Calls, texts, email, web chat, Facebook, Instagram</td></tr>
<tr><td>Estimate follow-up</td><td>Pipeline add-on</td><td>Included, built by you or an agency</td></tr>
<tr><td>AI phone answering</td><td>Add-on, ask for the price</td><td>Available, usage-based</td></tr>
<tr><td>List price</td><td>$79 to $329 a month, paid monthly</td><td>Agency plans from $97 a month, plus usage</td></tr>
</table>
<p>Read on November 24, 2026. Housecall Pro's range covers 1 to 8 users.</p>
<h2>How they connect</h2>
<p>HighLevel publishes ${HL("155000008060", "a Housecall Pro app for workflows")}. It checks Housecall Pro every few minutes for events and can update records there. It uses an API key and a premium fee per action, so confirm your Housecall Pro plan allows API access. We also connect finished jobs to review requests: <a href="/integrations/housecall-pro">Housecall Pro integration</a>.</p>
<h2>Choose Housecall Pro if</h2>
<ul><li>You have technicians to send around.</li><li>You sell service plans with visits to count.</li><li>You want job history and photos tied to the address.</li></ul>
<h2>Choose HighLevel if</h2>
<ul><li>Calls go to voicemail and forms wait until evening.</li><li>Estimates go quiet and nobody chases them.</li><li>You want campaigns, reviews and a website in one place.</li></ul>
<h2>Choose both if</h2>
<p>You answer yes in both lists. Let Housecall Pro own the schedule, invoice and payment. Let HighLevel own the lead, the follow-up and the review. Also see <a href="/guides/jobber-vs-housecall-pro">Jobber vs Housecall Pro</a> and <a href="/guides/crm-vs-field-service-software">CRM or field-service software</a>.</p>`,
    faq: [
      ["Can GoHighLevel replace Housecall Pro?", "Not for a company with technicians on the road. It can replace add-ons for follow-up, marketing and messaging."],
      ["Does GoHighLevel integrate with Housecall Pro?", "Yes, through a workflow app that uses an API key and checks for events every few minutes. Confirm your Housecall Pro plan includes API access."],
      ["Which is better for a solo owner?", "If you mostly need booking, texting and invoices, either works. Try the one that fixes your worst problem first."],
      ["Can I move from Housecall Pro to HighLevel?", "You can import customers from a CSV file. Job history and photos don't have a direct import, so keep an export."],
    ],
  },
  {
    slug: "crm-vs-field-service-software",
    path: "/guides/crm-vs-field-service-software",
    title: "CRM vs Field Service Software: What's the Difference?",
    description: "CRM or field service software? What each one does for a home-service business, where they overlap, and six questions that tell you which to buy first.",
    h1: "CRM vs field service software: which do you need first?",
    lede: "A CRM looks after people. Field-service software looks after jobs. Vendors blur the line, so here's the difference in plain words and six questions to settle it.",
    eyebrow: "Choosing software", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Tell us what's slipping. We'll say which one.",
    content: `
<div class="callout"><p><strong>Short version:</strong> a CRM tracks leads and customers and follows up with them. Field-service software schedules, dispatches, quotes and invoices jobs. Buy the one that fixes the problem costing you money now, then connect the other.</p></div>
<h2>The difference in one table</h2>
<table>
<tr><th>Question it answers</th><th>CRM</th><th>Field-service software</th></tr>
<tr><td>Who called and what did we say?</td><td>Yes</td><td>Sometimes</td></tr>
<tr><td>Who hasn't replied to an estimate?</td><td>Yes, and chases it</td><td>Depends on plan</td></tr>
<tr><td>Who goes where at 10?</td><td>No</td><td>Yes</td></tr>
<tr><td>What did we install in 2023?</td><td>If you record it</td><td>Yes</td></tr>
<tr><td>Is the job paid?</td><td>Sometimes</td><td>Yes</td></tr>
<tr><td>Who's due for a tune-up?</td><td>Yes, and messages them</td><td>Often</td></tr>
<tr><td>Where did this customer come from?</td><td>Yes</td><td>Basic</td></tr>
</table>
<h2>Six questions</h2>
<ol>
<li>Did you miss a call this week that could have been a job? <strong>CRM.</strong></li>
<li>Do you have quotes older than two weeks with no answer? <strong>CRM.</strong></li>
<li>Did two people show up, or nobody, at the same job? <strong>Field service.</strong></li>
<li>Are you invoicing days after the work? <strong>Field service.</strong></li>
<li>Do past customers never hear from you? <strong>CRM.</strong></li>
<li>Do techs call the office for addresses and history? <strong>Field service.</strong></li>
</ol>
<p>Count each side. Buy the winner first. A tie usually means field service first if you have three or more people in the field.</p>
<h2>Do you need both?</h2>
<p>Often, after a while. The rule that keeps it sane: one system owns the schedule and the invoice, the other owns the conversation, and they share the customer. Check what syncs before you pay.</p>
<h2>Examples</h2>
<p>Field service: Jobber, Housecall Pro, Workiz, ServiceTitan. CRM and marketing: HighLevel-based systems such as ours. General sales CRMs such as HubSpot suit long commercial sales. More help: <a href="/guides/best-crm-for-home-service-business">how to choose a CRM</a>, <a href="/guides/gohighlevel-vs-jobber">GoHighLevel vs Jobber</a>.</p>`,
    faq: [
      ["Is field service software a CRM?", "It includes a customer list and history, so it covers part of a CRM. It usually does less to follow up leads and past customers."],
      ["Is Jobber a CRM or field service software?", "Field-service software with a client manager built in."],
      ["Which should a new contractor buy first?", "Neither, until work is slipping. Then buy for the problem you have: missed leads or messy jobs."],
      ["Can one system do both?", "Some try. Check the half you care most about, because one side is nearly always weaker."],
    ],
  },
  {
    slug: "missed-call-text-back-vs-ai-receptionist",
    path: "/guides/missed-call-text-back-vs-ai-receptionist",
    title: "Text-Back vs AI Receptionist vs Answering Service",
    description: "Missed-call text-back, AI receptionist or answering service? How each works for a home-service business, what it costs you in effort, and which to start with.",
    h1: "Missed-call text-back vs AI receptionist vs answering service",
    lede: "Three ways to stop losing calls. They cost different amounts, suit different callers, and work well together. Here's how to pick.",
    eyebrow: "Answering calls", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll set up the one that fits your calls.",
    content: `
<div class="callout"><p><strong>Short version:</strong> start with text-back, because it's the simplest and covers the calls you miss while working. Add an AI receptionist or a live service for after hours and for callers who won't text. If you handle real emergencies, make sure a person can be reached.</p></div>
<h2>Side by side</h2>
<table>
<tr><th></th><th>Text-back</th><th>AI receptionist</th><th>Answering service</th></tr>
<tr><td>What the caller gets</td><td>A text in seconds</td><td>A voice that talks and asks</td><td>A person with a script</td></tr>
<tr><td>Landline callers</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Books a visit</td><td>With a link</td><td>Yes, if connected to your calendar</td><td>Sometimes</td></tr>
<tr><td>Upset or confused callers</td><td>Weak</td><td>Weak</td><td>Best</td></tr>
<tr><td>Many calls at once</td><td>Fine</td><td>Fine</td><td>May queue</td></tr>
<tr><td>How it's usually priced</td><td>Low monthly plus texts</td><td>Per minute or plan</td><td>Per minute or per call</td></tr>
<tr><td>What you must do</td><td>Reply to the texts</td><td>Write rules, read transcripts</td><td>Keep the script current</td></tr>
</table>
<h2>Pick by your calls</h2>
<ul>
<li><strong>You miss a few a day while working:</strong> text-back.</li>
<li><strong>Nights and weekends matter:</strong> AI receptionist with an emergency transfer.</li>
<li><strong>Older customers and landlines:</strong> AI or a live service.</li>
<li><strong>Emotional or high-value calls (flood, no heat, insurance):</strong> a person, yours or theirs.</li>
</ul>
<h2>Two things people forget</h2>
<p><strong>Text-back fires on every missed call</strong> unless you add rules, so suppliers and your spouse get it too. And calls must reach the number the system watches: if your cell carrier's voicemail picks up first, nothing is sent.</p>
<p><strong>AI can be wrong.</strong> Tell it what not to say: prices you can't keep, safety advice, promises on arrival time. Tell callers it's an assistant.</p>
<h2>Put numbers on it</h2>
<p>Use the <a href="/tools/missed-call-calculator">missed call calculator</a> with your phone log, then copy a <a href="/tools/missed-call-text-templates">missed-call text for your trade</a>. We set up <a href="/services/missed-call-text-back">missed-call text-back</a> ({{PRICE:textback}}) and an <a href="/services/ai-answering-service">AI receptionist</a> ({{PRICE:ai}}). Call {{DEMO}} to hear the receptionist.</p>`,
    faq: [
      ["What is missed call text back?", "A text sent automatically, within seconds, to someone whose call you missed. It asks what they need, so the conversation starts before they call someone else."],
      ["Is missed call text back legal?", "Replying about a service someone just called you for is generally treated differently from marketing, but carriers still require the number to be registered and opt-outs honored. Don't add those callers to marketing lists. Ask a lawyer about your situation."],
      ["Is an AI receptionist better than an answering service?", "It's usually cheaper and always available. A person is better with upset, unusual or high-value calls."],
      ["Can I use all three?", "Yes. A common setup is text-back in working hours, AI after hours, and a transfer to a person for emergencies."],
    ],
  },
  {
    slug: "online-booking-for-home-services",
    path: "/guides/online-booking-for-home-services",
    title: "Online Booking for Home Services: How to Set It Up",
    description: "How to let customers book online without wrecking your schedule: what to offer, buffers, deposits, reminders and the questions to ask, for contractors.",
    h1: "Online booking for home services: how to set it up right",
    lede: "Done well, a booking page fills estimate slots while you sleep. Done badly, it books a roof inspection across town between two other jobs. Here's the setup that works.",
    eyebrow: "Booking", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll build and test your booking page.",
    content: `
<div class="callout"><p><strong>Short version:</strong> put short, predictable visits online. Ask for the address first. Add buffers and a minimum notice. Send a reminder the day before. Keep emergencies and big jobs as requests you confirm.</p></div>
<h2>1. Choose what can be booked</h2>
<table>
<tr><th>Good for booking</th><th>Better as a request</th></tr>
<tr><td>Estimate and inspection visits</td><td>Emergencies</td></tr>
<tr><td>Tune-ups, flushes, cleanings</td><td>Multi-day projects</td></tr>
<tr><td>Recurring visits</td><td>Anything you can't size without photos</td></tr>
</table>
<h2>2. Protect the schedule</h2>
<ul>
<li><strong>Sync your calendar</strong> so personal time and existing jobs block slots.</li>
<li><strong>Buffers:</strong> start with 30 to 45 minutes between visits for driving.</li>
<li><strong>Minimum notice:</strong> no bookings for the next few hours.</li>
<li><strong>Daily limit:</strong> keep room for emergencies.</li>
<li><strong>Days by area:</strong> a calendar for the north side on Tuesdays and the south side on Thursdays does a lot of what route software does.</li>
</ul>
<h2>3. Ask five questions, not fifteen</h2>
<p>Name, mobile number, address, what's going on, and a photo if it helps. Add one about access (gate, pets, parking). Everything else can wait.</p>
<h2>4. Offer windows</h2>
<p>If your day is unpredictable, offer arrival windows such as 8 to 11 instead of exact times, and text when you leave.</p>
<h2>5. Cut no-shows</h2>
<p>Confirm at once, remind the day before, and let people move the visit themselves up to a cut-off. A small deposit helps on estimate visits that take an hour each, but some customers will drop out. Check <a href="/guides/contractor-deposits">your state's deposit rules</a>.</p>
<h2>6. Put the link everywhere</h2>
<p>Website button, Google profile, missed-call text, email signature and invoices. Here's <a href="/guides/book-online-button-on-google">how to add it to Google</a>.</p>
<h2>Which software?</h2>
<p>If you use Jobber or Housecall Pro, look at theirs first, since it sees your crews. If your visits are estimates and you want booking tied to follow-up, a CRM booking page works well. That's <a href="/services/online-booking">what we set up</a>.</p>`,
    faq: [
      ["Should a plumber offer online booking?", "Yes for estimates, water heaters, drain cleaning and other predictable visits. Keep a phone number at the top for leaks and emergencies."],
      ["How do I stop people booking too far away?", "Ask for the address or zip code first, say which towns you serve, and confirm anything outside your area before it counts."],
      ["Do customers prefer booking online or calling?", "Some prefer each, and urgent problems tend to come by phone. Offer both and see which your customers use."],
      ["Can I charge a deposit for an estimate visit?", "Often yes, as a service or trip fee. Deposits on a home-improvement contract have limits in some states, so check yours."],
    ],
  },
  {
    slug: "book-online-button-on-google",
    path: "/guides/book-online-button-on-google",
    title: "How to Get the Book Online Button on Google (2026)",
    description: "How to add a booking link or Book online button to your Google Business Profile, why the button may not show, and what to use if you're a contractor.",
    h1: "How to get the Book online button on Google",
    lede: "Google has two kinds of booking link, and only one is the big button. Here's how to add each to your Business Profile, and what to do if yours doesn't show.",
    eyebrow: "Google Business Profile", readMinutes: 2, article: { date: DATE },
    ctaTitle: "We'll set up the page and the link.",
    content: `
<div class="callout"><p><strong>Short version:</strong> in your Google Business Profile, open Bookings. Choose a supported provider to be eligible for the button, or add your own link to show a plain booking link. Google says provider bookings can take up to a week to appear.</p></div>
<h2>Option 1: a booking provider</h2>
<ol>
<li>Sign in to the Google account that manages the profile and search your business name.</li>
<li>Choose Bookings, then Get started.</li>
<li>Pick a provider you use, sign up or connect, and choose Done.</li>
</ol>
<p>The button comes from the provider's connection with Google. If your software isn't on the list, Google can't switch the button on for you. Steps: <a href="https://support.google.com/business/answer/7475773" rel="noopener">set up bookings through a provider</a>.</p>
<h2>Option 2: your own link</h2>
<ol>
<li>Open Bookings on the profile.</li>
<li>Choose Add link and paste the address of your booking page.</li>
<li>Save, and test it on a phone.</li>
</ol>
<p>It shows as a link, not the blue button. For most contractors it does the job. Steps: <a href="https://support.google.com/business/answer/6218037" rel="noopener">manage your local business links</a>.</p>
<h2>If it doesn't show</h2>
<ul>
<li>The profile isn't verified, or a recent change is under review.</li>
<li>Your category doesn't support bookings.</li>
<li>A provider you used before still holds the link. Ask them to remove it.</li>
<li>It has been less than a week.</li>
</ul>
<h2>What the page should do</h2>
<p>Open fast on a phone, show real times, ask for the address and confirm by text. <a href="/guides/online-booking-for-home-services">Set up online booking the right way first</a>. A Book button that leads to a contact form annoys people.</p>`,
    faq: [
      ["How do I add a Book online button to my Google profile?", "Open your Business Profile, choose Bookings and connect a supported provider. If you don't use one, add your own booking link there instead."],
      ["Is the Google booking button free?", "Google doesn't charge for the link. Your booking provider may charge for its software."],
      ["Why did my booking button disappear?", "Common reasons are a change at the provider, a profile under review or a category change. Check Bookings on the profile, then ask the provider."],
      ["Can contractors use Google booking?", "Yes, with a link on the profile. Local Services Ads also has its own booking option in some categories."],
    ],
  },
  {
    slug: "text-to-pay-for-contractors",
    path: "/guides/text-to-pay-for-contractors",
    title: "Text-to-Pay for Contractors: How It Works and What It Costs",
    description: "Text-to-pay explained for home-service businesses: how customers pay from a text, what you need, fees, tap to pay, pay-later options and mistakes to avoid.",
    h1: "Text-to-pay for contractors: how it works",
    lede: "Text-to-pay sends the invoice as a text with a link. The customer taps, pays by card or bank, and you both get a receipt. Here's what you need and what to watch.",
    eyebrow: "Getting paid", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll set up invoices customers pay by text.",
    content: `
<div class="callout"><p><strong>Short version:</strong> you need a payment account (such as Stripe or Square), software that texts the invoice, and a registered business number. Expect a card fee on each payment. Bank payments usually cost less on big invoices.</p></div>
<h2>How it works</h2>
<ol>
<li>You finish the job and send the invoice from your phone.</li>
<li>The customer gets a text with a secure link. No app, no login.</li>
<li>They pay by card, bank or a phone wallet where supported.</li>
<li>The invoice is marked paid and the reminders stop.</li>
</ol>
<h2>Ways to get paid on the spot</h2>
<table>
<tr><th>Method</th><th>Good for</th><th>Watch for</th></tr>
<tr><td>Text-to-pay link</td><td>Most jobs, and customers who aren't home</td><td>Number must be registered for texting</td></tr>
<tr><td>Tap to Pay on your phone</td><td>Customer is standing there</td><td>Needs a supported phone and payment account</td></tr>
<tr><td>Card on file</td><td>Repeat visits and plans</td><td>Written permission first</td></tr>
<tr><td>Bank payment (ACH)</td><td>Large invoices</td><td>Takes days to clear and can be returned</td></tr>
<tr><td>Pay later (Affirm, Klarna, Afterpay)</td><td>Mid-size one-time jobs</td><td>The provider decides who's approved, and your fee is higher</td></tr>
<tr><td>Your own payment schedule</td><td>Projects</td><td>You carry the risk</td></tr>
</table>
<h2>What it costs</h2>
<p>Three parts: the software, the texts, and the payment company's fee. Fees differ by method and change, so read the current page of the company you use and price a typical invoice. Passing card fees on to customers is restricted by card rules and some state laws.</p>
<h2>Make it look safe</h2>
<ul>
<li>Text from the number the customer already knows.</li>
<li>Use their name, the job and the amount. Nobody should wonder if it's a scam.</li>
<li>Tell them in person: "I'll text you the invoice now."</li>
<li>Never ask for a card number by text.</li>
</ul>
<h2>Wording to copy</h2>
<p>"Hi {first name}, thanks for having us out. Your invoice for {job} is {amount}: {link}." Reminders are in our <a href="/tools/contractor-text-templates">text templates</a>. No software yet? Use the <a href="/tools/invoice-template">free invoice template</a>.</p>
<p>We set this up as part of <a href="/services/estimates-invoices-payments">estimates, invoices and payments</a>. If your job software already does it well, keep that.</p>`,
    faq: [
      ["Can customers text to pay an invoice?", "Yes. They get a text with a secure link and pay there by card or bank. They don't reply with card details."],
      ["Is text-to-pay safe?", "The payment happens on the payment company's page, so you don't handle the card number. Send from a known number and name the job so customers trust it."],
      ["What do I need to start?", "A payment account, software that sends invoice links by text, and a business number registered for texting."],
      ["Can I let customers pay in installments?", "You can offer your own schedule, which means you carry the risk, or a pay-later provider that approves the customer and pays you."],
    ],
  },
  {
    slug: "how-to-sell-maintenance-plans",
    path: "/guides/how-to-sell-maintenance-plans",
    title: "How to Sell Maintenance Plans: A Guide for Contractors",
    description: "How to price, write, sell and bill a maintenance plan for HVAC, plumbing, pest, pool or lawn customers, with a script, a checklist and what to avoid.",
    h1: "How to sell maintenance plans without being pushy",
    lede: "A plan works when it's easy to explain, priced above cost and billed by itself. Here's how to set one up this month.",
    eyebrow: "Recurring revenue", readMinutes: 4, article: { date: DATE },
    ctaTitle: "You set the plan. We'll set up the billing.",
    content: `
<div class="callout"><p><strong>Short version:</strong> offer one plan. Price it from your cost per visit. Offer it right after a good job and to past customers each season. Bill it automatically, remind people about visits and make it easy to cancel.</p></div>
<h2>1. Decide what's in it</h2>
<ul>
<li>How many visits a year, and what happens on each (a checklist).</li>
<li>What's included, and what isn't.</li>
<li>Extras that cost you little: priority booking, no trip fee, a set discount on repairs.</li>
</ul>
<h2>2. Price it</h2>
<p>Cost per visit times visits, divided by 12, is the floor. Add your margin. The <a href="/tools/maintenance-plan-calculator">maintenance plan calculator</a> does the sums and shows how much depends on repair work.</p>
<h2>3. Write one page</h2>
<p>Name, price, visits, checklist, exclusions, how it renews, how to cancel. Plain words. Have a lawyer check it: states have automatic-renewal laws and some trades have service-contract rules.</p>
<h2>4. Offer it at the right moment</h2>
<table>
<tr><th>When</th><th>What to say</th></tr>
<tr><td>End of a repair</td><td>"This would have shown up on a yearly check. We have a plan for that at {price} a month. Want me to text you the details?"</td></tr>
<tr><td>New install</td><td>"The manufacturer asks for yearly service. The plan covers it, so you don't have to remember."</td></tr>
<tr><td>Before the season</td><td>A text or email to past customers who agreed to hear from you</td></tr>
</table>
<p>Only say the manufacturer requires service if it does. No scare tactics: they bring cancellations.</p>
<h2>5. Run it without a spreadsheet</h2>
<ul>
<li>Sign-up page with card or bank payment.</li>
<li>Automatic charge, and a message when a payment fails.</li>
<li>Visits booked ahead, with reminders.</li>
<li>A yearly summary: what we checked and what we found.</li>
</ul>
<h2>6. Watch three numbers</h2>
<p>Members, visits owed and cancellations. If visits owed climbs, stop selling until you catch up. A plan you don't deliver is worse than none.</p>
<h2>Ideas by trade</h2>
<ul>
<li><strong>HVAC:</strong> cooling check in spring, heating check in fall.</li>
<li><strong>Plumbing:</strong> water heater flush, leak and shutoff check.</li>
<li><strong>Electrical:</strong> panel and safety check, generator service.</li>
<li><strong>Pest, pool, lawn:</strong> the visits are the plan, so sell consistency.</li>
<li><strong>Garage doors:</strong> yearly balance, springs and safety check.</li>
</ul>
<p>We set up the page, billing and reminders: <a href="/services/maintenance-plans">maintenance plan setup</a>.</p>`,
    faq: [
      ["How much should an HVAC maintenance plan cost?", "Start from your own cost for the visits, add margin, then compare with nearby companies. A plan priced below cost only works if it brings enough repair work."],
      ["What should a service agreement include?", "Visits, a checklist, exclusions, price, term, renewal and how to cancel."],
      ["How do I bill maintenance plans automatically?", "Use software that charges a saved card or bank account each month with the customer's permission, and messages them when a payment fails."],
      ["When is the best time to offer a plan?", "Right after a job that went well, at a new install, and a few weeks before the busy season."],
    ],
  },
  {
    slug: "a2p-10dlc-for-contractors",
    path: "/guides/a2p-10dlc-for-contractors",
    title: "A2P 10DLC for Contractors: Do You Need to Register?",
    description: "A2P 10DLC explained for home-service businesses: who has to register to text customers, what you need with or without an EIN, why it's rejected, and opt-outs.",
    h1: "A2P 10DLC for contractors, in plain English",
    lede: "If you text customers from software, US carriers want your business registered. It's a form, a small fee and a wait. Here's what you need and why applications get sent back.",
    eyebrow: "Texting rules", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We handle texting registration for clients.",
    content: `
<div class="callout"><p><strong>Short version:</strong> texting customers from a normal 10-digit number through software needs A2P 10DLC registration. With an EIN you register as a business. Without one, there's a sole-proprietor route with lower limits. Your website needs a privacy policy and a form with clear consent wording. This is general information, not legal advice.</p></div>
<h2>Do I need it?</h2>
<table>
<tr><th>How you text</th><th>Registration</th></tr>
<tr><td>From your own phone, one person at a time</td><td>Not A2P, though carriers still limit bulk sending</td></tr>
<tr><td>From a CRM, job software or phone system on a local number</td><td>A2P 10DLC</td></tr>
<tr><td>From a toll-free number</td><td>A separate toll-free verification</td></tr>
</table>
<p>Your software may be doing it for you. Ask whose name the registration is in. It should be yours.</p>
<h2>EIN or no EIN?</h2>
<p>If you have an EIN, use it. Twilio's documentation says <a href="https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview" rel="noopener">a business with an EIN can't use the sole-proprietor route</a>, and that route allows one number per campaign.</p>
<h2>What to have ready</h2>
<ul>
<li>Legal business name and EIN exactly as on your IRS letter.</li>
<li>Address, website, contact name and email on your own domain.</li>
<li>Two or three sample messages, with your business name and opt-out wording.</li>
<li>Where people agree to texts: the form, its wording and a link or screenshot.</li>
<li>A privacy policy that covers texting and says you don't share numbers for marketing.</li>
</ul>
<h2>Why it gets rejected</h2>
<ul>
<li>The name doesn't match the EIN.</li>
<li>The website is down, unfinished or missing a privacy policy.</li>
<li>Consent is pre-checked, buried or required to submit the form.</li>
<li>Sample messages don't match the use you described.</li>
</ul>
<h2>What it costs</h2>
<p>A one-time fee and a monthly fee per campaign, set by the registry and carriers and passed on by your software. For example, ${HL("155000005200", "HighLevel's fee article")} lists $22.50 one-time for low-volume and sole-proprietor registration and monthly fees by use. Fees apply even if the application is rejected, so get it right first.</p>
<h2>Opt-outs: new rules</h2>
<p>Honor every opt-out, however it's worded. New FCC rules on revoking consent take effect on November 25, 2026. According to <a href="https://www.nelsonmullins.com/insights/alerts/fcc-download/all/fcc-adopts-overhaul-of-tcpa-consent-revocation-rules-revoke-all-narrowed-exclusive-opt-out-methods-permitted-and-fraud-alert-exemption-expanded" rel="noopener">a law-firm summary</a>, words such as stop, quit, end, revoke, opt out, cancel and unsubscribe count, and you have up to 10 business days. Good software does it at once. States such as Texas have their own rules, so ask a lawyer before marketing to old lists.</p>
<h2>Job texts and marketing texts</h2>
<p>"Your tech is on the way" and "20% off this week" aren't the same. Marketing needs prior written consent. Keep the two on separate permissions. Sample wording: <a href="/tools/contractor-text-templates">contractor text templates</a>.</p>`,
    faq: [
      ["Is A2P 10DLC registration required?", "Yes, if you text US customers from a local 10-digit number through software. Unregistered traffic is blocked or filtered by carriers."],
      ["Do I need A2P for a toll-free number?", "No. Toll-free numbers use a separate verification process."],
      ["Can I register without an EIN?", "Yes, as a sole proprietor, with lower limits. If you have an EIN you have to use the standard route."],
      ["How long does A2P registration take?", "From a few days to a few weeks, depending on reviews. Errors send it back to the start of the line."],
    ],
  },
  {
    slug: "is-review-gating-allowed",
    path: "/guides/is-review-gating-allowed",
    title: "Is Review Gating Allowed? What Google and the FTC Say",
    description: "Review gating means asking only happy customers for public reviews. What Google's policy and the FTC rule say, what counts as gating, and what to do instead.",
    h1: "Is review gating allowed? What Google and the FTC say",
    lede: "\"How did we do? Great: leave a Google review. Not great: tell us privately.\" That's review gating. Google doesn't allow it, and the FTC may see it as deceptive. Here's the detail.",
    eyebrow: "Review rules", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We ask every customer, the same way.",
    content: `
<div class="callout"><p><strong>Short version:</strong> no, not on Google. ${GOOGLE_REVIEWS} prohibits selectively asking for positive reviews and discouraging negative ones. The FTC's 2024 rule doesn't name gating, but hiding or suppressing bad reviews can still break the law. Ask everyone and give everyone the same link.</p></div>
<h2>What counts as gating</h2>
<ul>
<li>A survey that shows the review link only to people who tap 4 or 5 stars.</li>
<li>Texting the link only to customers who seemed happy.</li>
<li>Telling unhappy customers to email you instead of reviewing.</li>
</ul>
<h2>What doesn't</h2>
<ul>
<li>Asking every customer the same way, with one link.</li>
<li>Adding "if anything isn't right, reply here and we'll fix it" next to the same link, for everyone.</li>
<li>Using private feedback to improve, as long as it doesn't decide who gets asked.</li>
</ul>
<h2>What Google says</h2>
<p>Among other things, ${GOOGLE_REVIEWS} rules out paying or offering incentives for reviews, discouraging negative reviews, selectively asking for positive ones, pressuring people on your premises, and setting staff quotas. Reviews can be removed and profiles restricted.</p>
<h2>What the FTC says</h2>
<p>The Consumer Reviews and Testimonials Rule took effect on October 21, 2024. It bans fake reviews, buying reviews that must be positive or negative, undisclosed insider reviews, and using threats to suppress reviews. Knowing violations can bring civil penalties. In ${FTC}, the agency says the rule doesn't specifically cover gating, but the practice may still violate the FTC Act.</p>
<h2>What works instead</h2>
<ol>
<li><strong>Fix it before you ask.</strong> Walk the job with the customer.</li>
<li><strong>Ask everyone, within a day.</strong></li>
<li><strong>Reply to bad reviews well.</strong> Copy a <a href="/tools/review-response-templates">review response</a>.</li>
<li><strong>Keep it steady.</strong> New reviews every month put one bad one in context.</li>
</ol>
<h2>Check your software</h2>
<p>Search its settings for "sentiment", "feedback first", "threshold" or "filter". If a low score hides the Google link, turn that off. Ours doesn't have it: <a href="/services/review-generation">how we ask for reviews</a>.</p>`,
    faq: [
      ["Is review gating illegal?", "It breaks Google's policy. The FTC's 2024 review rule doesn't specifically ban it, but the FTC says it may violate the FTC Act. Treat it as not allowed."],
      ["Can you offer a discount for a Google review?", "No. Google doesn't allow any incentive for reviews, whether good or bad."],
      ["Can I ask unhappy customers to contact me first?", "You can invite everyone to contact you, as long as everyone also gets the same review link. You can't send only unhappy people elsewhere."],
      ["Can I run a staff contest for reviews?", "Be careful. Google's policy doesn't allow staff quotas or asking for reviews that mention particular people. Reward good work, not review counts."],
    ],
  },
  {
    slug: "google-business-profile-service-area",
    path: "/guides/google-business-profile-service-area",
    title: "Google Business Profile Service Areas: Setup Guide",
    description: "How to set up a Google Business Profile for a service-area business: when to hide your address, how many areas to add, and mistakes that get profiles suspended.",
    h1: "Google Business Profile service areas, set up right",
    lede: "If you go to customers, Google treats you as a service-area business. Getting the address and areas right keeps the profile safe. It doesn't make you rank everywhere you list, though.",
    eyebrow: "Google Business Profile", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll check your profile for free.",
    content: `
<div class="callout"><p><strong>Short version:</strong> if customers don't come to your address, remove it and list service areas instead. Google allows up to 20 areas, and says the whole area shouldn't reach much beyond a two-hour drive. Areas describe where you work. They don't set where you rank.</p></div>
<h2>Which type are you?</h2>
<table>
<tr><th>Your situation</th><th>Address</th><th>Service areas</th></tr>
<tr><td>Work from home or a truck, no visitors</td><td>Hide</td><td>Yes</td></tr>
<tr><td>Staffed shop or showroom with a sign, and you travel</td><td>Show</td><td>Yes</td></tr>
<tr><td>Yard or storage unit, no visitors</td><td>Hide</td><td>Yes</td></tr>
<tr><td>Virtual office or mailbox</td><td>Not eligible as a location</td><td>Use your real base and hide it</td></tr>
</table>
<h2>Set it up</h2>
<ol>
<li>Open your profile and choose Edit profile, then Location.</li>
<li>If customers don't visit, turn off showing the address.</li>
<li>Add service areas by city, county or zip. Up to 20.</li>
<li>Save, and expect some changes to be reviewed.</li>
</ol>
<p>Source: <a href="https://support.google.com/business/answer/9157481" rel="noopener">Google's service-area help</a>.</p>
<h2>What areas do and don't do</h2>
<p>They tell customers where you go. Rankings on the map still depend heavily on where the searcher is and where your business is verified. Adding a city 60 miles away rarely brings calls from it. To be found there you need a page about real work in that town, and reviews that mention it naturally.</p>
<h2>Mistakes that cause trouble</h2>
<ul>
<li>A fake or virtual address to appear in a bigger city.</li>
<li>Two profiles for one business.</li>
<li>Town names stuffed into the business name.</li>
<li>Changing name, address and category on the same day.</li>
</ul>
<p>If it's already happened: <a href="/guides/google-business-profile-suspended">what to do when a profile is suspended</a>.</p>
<h2>Categories</h2>
<p>Choose the most specific primary category for your main work and add only a few that truly apply. Google's own advice is to <a href="https://support.google.com/business/answer/7249669" rel="noopener">use as few as describe the business</a>. Next, write the <a href="/tools/google-business-description-generator">description</a>, then <a href="/guides/how-to-rank-higher-on-google-maps">work on ranking</a>.</p>`,
    faq: [
      ["How many service areas can I add on Google?", "Up to 20."],
      ["Should I hide my address on Google?", "Yes, if customers don't visit you there. You still verify with the real address."],
      ["Do service areas help me rank in those cities?", "Not much by themselves. Distance from your base, relevance and reviews matter more."],
      ["Can I have a profile in two cities?", "Only with a second real, staffed location. A mailbox or virtual office doesn't count."],
    ],
  },
  {
    slug: "angi-vs-thumbtack-vs-local-services-ads",
    path: "/guides/angi-vs-thumbtack-vs-local-services-ads",
    title: "Angi vs Thumbtack vs Local Services Ads: How Each Charges",
    description: "Angi, Thumbtack and Google Local Services Ads compared for contractors: when you're charged, who else gets the lead, refunds, and how to work out cost per job.",
    h1: "Angi vs Thumbtack vs Local Services Ads: how each one charges",
    lede: "All three sell you leads, and all three charge at a different moment. Know when the meter starts, who else gets the lead and what you can get back.",
    eyebrow: "Paid leads", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want leads nobody else is sold?",
    content: `
<div class="callout"><p><strong>Short version:</strong> compare them on cost per job won, in your trade and town, over at least 20 leads each. Any of them can work if you answer first. None of them build anything you keep. We don't sell leads. We do manage Google Ads and Local Services Ads on our Partner package, so weigh our view with that in mind.</p></div>
<h2>How each one charges</h2>
<table>
<tr><th></th><th>Google Local Services Ads</th><th>Thumbtack</th><th>Angi Leads</th></tr>
<tr><td>You pay for</td><td>Valid leads (calls, messages), not clicks</td><td>A customer contacting you with project details</td><td>Being matched to a customer, plus a membership</td></tr>
<tr><td>Who sets the price</td><td>Google's auction and your bid settings</td><td>You set lead prices, within your market</td><td>Angi, by job size and place</td></tr>
<tr><td>Shared?</td><td>The customer picks from a list and contacts who they like</td><td>Customers can contact several pros</td><td>Often sent to you and several other pros</td></tr>
<tr><td>Getting money back</td><td>Automatic credits for leads Google judges invalid</td><td>Refund rules, such as when a customer replies to nobody</td><td>Ask Angi, and read your contract</td></tr>
<tr><td>Entry</td><td>Screening and verification</td><td>Profile and budget</td><td>Sales call and membership</td></tr>
</table>
<p>Sources, read November 25, 2026: <a href="https://support.google.com/localservices/answer/7195435" rel="noopener">Google on leads</a> and <a href="https://support.google.com/localservices/answer/15100654" rel="noopener">lead credits</a>, <a href="https://help.thumbtack.com/article/types-of-leads" rel="noopener">Thumbtack on leads</a> and <a href="https://help.thumbtack.com/article/set-lead-prices" rel="noopener">lead prices</a>, <a href="https://pro.homeadvisor.com/help/faqs/" rel="noopener">Angi Leads' help</a>. Angi's public pages are older, so get current terms in writing.</p>
<h2>Details worth knowing</h2>
<ul>
<li><strong>Google:</strong> a missed call counts as a lead only if the caller stays on for more than 20 seconds, and another contact from the same customer within 15 days isn't charged again. Google is also <a href="https://support.google.com/google-ads/answer/17213585" rel="noopener">moving these ads into Performance Max campaigns</a>, where manual disputes are no longer offered.</li>
<li><strong>Thumbtack:</strong> you set a weekly budget, and a lead can take you over it up to a limit.</li>
<li><strong>Angi:</strong> check the length of the membership and how to cancel.</li>
</ul>
<h2>Run a fair test</h2>
<ol>
<li>Use a different phone number for each, so calls are counted.</li>
<li>Answer within minutes. On shared leads the first good reply has a big edge.</li>
<li>After 20 leads each, put spend, leads and jobs into the <a href="/tools/cost-per-lead-calculator">cost per lead calculator</a>.</li>
<li>Keep the one with the lowest cost per job, and cap it at your profit per job.</li>
</ol>
<h2>What to build alongside</h2>
<p>Lead sites stop the day you stop paying. Your Google profile, reviews and website don't. Put part of the budget there: <a href="/guides/how-to-rank-higher-on-google-maps">rank on Google Maps</a>, and see <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>`,
    faq: [
      ["Is Thumbtack or Angi better for contractors?", "It depends on your trade and town. Compare cost per job won over at least 20 leads on each."],
      ["Does Thumbtack charge for every lead?", "It charges when a customer contacts you with project details, not when they only see your profile. Opportunities are charged if you reach out and the customer responds."],
      ["Are Local Services Ads pay per click?", "No. They're pay per lead."],
      ["How much does a lead cost?", "It varies by trade, job and city, and published averages conflict. Use your own numbers."],
    ],
  },
  {
    slug: "win-back-past-customers",
    path: "/guides/win-back-past-customers",
    title: "How to Win Back Past Customers (Texts & Emails to Copy)",
    description: "How home-service companies bring back past customers: who to contact first, permission rules, three short messages to copy, timing and what to measure.",
    h1: "How to win back past customers",
    lede: "People who already hired you are easier to win than strangers. Most owners never contact them again. Here's a campaign you can send this week, the right way.",
    eyebrow: "Repeat work", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll write it, send it and book the replies.",
    content: `
<div class="callout"><p><strong>Short version:</strong> pick one group (for example water heaters installed more than a year ago), check you have permission, send one useful message, follow up once, then stop. Send in small batches so you can answer everyone.</p></div>
<h2>1. Check permission</h2>
<p>Marketing texts need the customer's prior written consent. Email has lighter rules but still needs an unsubscribe link and your address. A phone call or a postcard is the safe choice for old lists, though do-not-call rules apply to calls. When in doubt, ask a lawyer. See <a href="/guides/a2p-10dlc-for-contractors">texting rules</a>.</p>
<h2>2. Choose who goes first</h2>
<ol>
<li>Open estimates from the last 90 days.</li>
<li>Customers due for seasonal service.</li>
<li>Good customers you haven't seen in 12 to 24 months.</li>
</ol>
<h2>3. Send something useful</h2>
<table>
<tr><th>Group</th><th>Message</th></tr>
<tr><td>Seasonal</td><td>Hi {first name}, {business} here. We serviced your {system} last {month}. It's about time again. Want me to hold a spot before we fill up? Reply STOP to opt out.</td></tr>
<tr><td>Long time</td><td>Hi {first name}, it's {owner} from {business}. We did your {job} in {year}. Anything else around the house you've been putting off? Reply STOP to opt out.</td></tr>
<tr><td>Old estimate</td><td>Hi {first name}, we quoted your {job} in {month}. Still on your list? I can update the price this week. Reply STOP to opt out.</td></tr>
</table>
<h2>4. Follow up once</h2>
<p>Three or four days later, to people who didn't reply. Then leave them alone until the next season.</p>
<h2>5. Answer fast</h2>
<p>Send 25 to 50 at a time, in the morning, on a day when someone can reply. A "yes" that waits until Friday is gone.</p>
<h2>6. Measure four things</h2>
<p>Sent, replies, booked, opted out. If opt-outs beat bookings, the message or the list is wrong.</p>
<h2>And ask for reviews</h2>
<p>Past customers who were happy often just never got asked. Keep it as a separate message: <a href="/guides/ask-past-customers-for-google-reviews">ask past customers for reviews</a>. We can run both: <a href="/services/email-sms-campaigns">email and text campaigns</a>.</p>`,
    faq: [
      ["What is database reactivation?", "Contacting past customers and old leads, with permission, to bring some of them back. It's a campaign, not a product."],
      ["Can I text old customers?", "Only with the consent the law requires for what you're sending. Having done business with someone isn't enough for marketing texts."],
      ["How often should I contact past customers?", "Once a season with something useful suits most trades."],
      ["Should I offer a discount?", "Try without one first. A timely reminder often works, and you keep your price."],
    ],
  },
  {
    slug: "home-service-marketing-calendar",
    path: "/guides/home-service-marketing-calendar",
    title: "Home-Service Marketing Calendar: What to Do Each Season",
    description: "A season-by-season marketing calendar for HVAC, plumbing, roofing, electrical, landscaping, pest, cleaning and painting companies. Plan four weeks ahead.",
    h1: "Home-service marketing calendar: what to do each season",
    lede: "Homeowners think about your trade a few weeks before they need it. This calendar tells you what to send, post and update each season, by trade.",
    eyebrow: "Planning", readMinutes: 4, article: { date: DATE },
    ctaTitle: "We'll run the calendar for you.",
    content: `
<div class="callout"><p><strong>Short version:</strong> start four to six weeks before each busy season. Message past customers first, then post, then update your pages. Shift the dates for your climate: in the South, cooling season starts in early spring.</p></div>
<h2>By season and trade</h2>
<table>
<tr><th>Trade</th><th>Winter</th><th>Spring</th><th>Summer</th><th>Fall</th></tr>
<tr><td>HVAC</td><td>No-heat calls, filters, carbon monoxide safety</td><td>AC tune-ups</td><td>No-cool calls, replacements</td><td>Furnace tune-ups</td></tr>
<tr><td>Plumbing</td><td>Frozen pipes, water heaters</td><td>Sump pumps, outdoor taps</td><td>Sewer lines, irrigation</td><td>Winterizing, pre-holiday drains</td></tr>
<tr><td>Roofing</td><td>Ice and leak checks, book spring</td><td>Storm inspections</td><td>Replacements</td><td>Pre-winter checks, gutters</td></tr>
<tr><td>Electrical</td><td>Space-heater safety, panels</td><td>Outdoor outlets, EV chargers</td><td>Fans, AC circuits, storm surge</td><td>Generators, holiday lights</td></tr>
<tr><td>Landscaping</td><td>Design and early booking</td><td>Cleanup, mulch, planting</td><td>Irrigation, weekly care</td><td>Leaves, aeration, last cut</td></tr>
<tr><td>Pest control</td><td>Rodents</td><td>Ants, termites</td><td>Mosquitoes, wasps</td><td>Rodent-proofing</td></tr>
<tr><td>Cleaning</td><td>New-year reset</td><td>Spring deep clean</td><td>Move-outs, rentals</td><td>Pre-holiday cleans</td></tr>
<tr><td>Painting</td><td>Interiors, cabinets</td><td>Exterior estimates</td><td>Exteriors, decks</td><td>Last exteriors, interiors before guests</td></tr>
</table>
<h2>The four-week routine</h2>
<ol>
<li><strong>Week 1:</strong> list past customers due this season. Check permission. Update the service page with current prices and lead times.</li>
<li><strong>Week 2:</strong> send the reminder to the first batch. Post a job photo to your Google profile.</li>
<li><strong>Week 3:</strong> follow up once. Post a short tip. Ask recent customers for reviews.</li>
<li><strong>Week 4:</strong> send to the next batch. Fill gaps with open estimates.</li>
</ol>
<h2>Every month, whatever the season</h2>
<ul>
<li>Reply to every review.</li>
<li>Add ten new job photos.</li>
<li>Check hours and holiday closings on Google.</li>
<li>Call back every open estimate.</li>
<li>Look at calls and jobs by source.</li>
</ul>
<h2>Dates people forget</h2>
<ul>
<li>Holiday hours on Google and voicemail (copy a <a href="/tools/phone-scripts">holiday greeting</a>).</li>
<li>Clock changes: a good day for smoke alarm and thermostat reminders.</li>
<li>First frost and first heat wave: have the message written already.</li>
<li>After a storm: helpful posts, not scare posts. Don't go door to door without checking local rules.</li>
</ul>
<p>Copy the wording from <a href="/tools/contractor-text-templates">contractor text templates</a> and <a href="/guides/win-back-past-customers">win back past customers</a>.</p>`,
    faq: [
      ["When should HVAC companies market AC tune-ups?", "Four to six weeks before your first hot spell. In the South that can be February, and in the North it's closer to April."],
      ["How far ahead should I plan?", "One season. Write the messages now and adjust the date to the weather."],
      ["What should a contractor post on Google?", "A recent job photo with the town and the work, a seasonal tip, or an offer with clear dates."],
      ["What do I do in the slow season?", "Old estimates, maintenance plans, reviews from past customers, new service pages and hiring."],
    ],
  },
  {
    slug: "contractor-deposits",
    path: "/guides/contractor-deposits",
    title: "Contractor Deposits: How Much Can You Ask For? (2026)",
    description: "How much deposit a contractor can ask for, state limits in California, Maryland and Massachusetts, how to word it, and how to collect it by text or online.",
    h1: "Contractor deposits: how much can you ask for?",
    lede: "Deposits protect you from cancellations and cover materials. Some states cap them. Here's how to set yours, word it and collect it.",
    eyebrow: "Getting paid", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Collect deposits without chasing checks.",
    content: `
<div class="callout"><p><strong>Short version:</strong> there's no national rule, and many states leave it to the contract. Some cap it: California allows the lesser of $1,000 or 10% on home-improvement contracts. Check your state before you set a standard percentage. This is general information, not legal advice.</p></div>
<h2>Examples of state limits</h2>
<table>
<tr><th>State</th><th>Limit on home-improvement deposits</th><th>Source</th></tr>
<tr><td>California</td><td>The lesser of $1,000 or 10% of the price. Later payments can't exceed work done or materials delivered.</td><td><a href="https://www.cslb.ca.gov/Consumers/Hire_A_Contractor/Home_Improvement_Contracts/What_Is_A_Contract.aspx" rel="noopener">CSLB</a></td></tr>
<tr><td>Maryland</td><td>One-third of the contract price at or before signing</td><td><a href="https://mgaleg.maryland.gov/2026RS/Statute_Web/gbr/8-617.pdf" rel="noopener">Business Regulation 8-617</a></td></tr>
<tr><td>Massachusetts</td><td>One-third of the price, or the actual cost of special-order materials that must be ordered ahead</td><td><a href="https://mass.gov/info-details/required-contract-terms-in-a-home-improvement-contract" rel="noopener">Mass.gov</a></td></tr>
</table>
<p>Read on November 25, 2026. Other states have limits too, plus rules on contract wording, trust accounts and cancellation rights. Your license board is the place to check.</p>
<h2>How to choose an amount</h2>
<ul>
<li><strong>Small repairs:</strong> none, or a visit fee that goes toward the work.</li>
<li><strong>Jobs with materials to order:</strong> enough to cover the order, within your state's limit.</li>
<li><strong>Projects over several weeks:</strong> a deposit, then payments tied to stages the customer can see.</li>
</ul>
<h2>What to write</h2>
<p>On the estimate: "To reserve your date and order materials, {amount} is due when you approve. The rest is due {when}. If you cancel before {date}, {what happens}." Ask a lawyer about the cancellation part.</p>
<h2>How to collect it</h2>
<ul>
<li>When they approve the estimate, on the same screen.</li>
<li>When they book a visit online.</li>
<li>By a pay link in a text.</li>
</ul>
<p>A deposit that waits for a check in the mail holds up your schedule. See <a href="/guides/text-to-pay-for-contractors">text-to-pay</a>, use the <a href="/tools/estimate-template">estimate template</a>, or have us set up <a href="/services/estimates-invoices-payments">estimates and payments</a>.</p>`,
    faq: [
      ["Do contractors require a deposit?", "Many do, for work that needs materials or a reserved date. For small repairs a deposit is less common."],
      ["How much deposit should a contractor ask for?", "Enough to cover materials and the reserved time, within your state's limit. California's limit is the lesser of $1,000 or 10%."],
      ["Is a deposit refundable?", "It depends on your contract and state law. Say clearly what happens if either side cancels, and have a lawyer check it."],
      ["Can I take a deposit online?", "Yes, when the estimate is approved, at booking, or with a pay link by text."],
    ],
  },
  {
    slug: "contractor-referral-program",
    path: "/guides/contractor-referral-program",
    title: "Contractor Referral Program: How to Set One Up (Simple)",
    description: "How to run a referral program for a home-service business: reward ideas, rules to check, what to say, and how to track who sent whom without a spreadsheet.",
    h1: "How to set up a contractor referral program",
    lede: "Word of mouth is already your best source. A referral program just makes it easy to do and easy to thank. Keep it simple enough to explain in one sentence.",
    eyebrow: "Repeat and referral", readMinutes: 3, article: { date: DATE },
    ctaTitle: "We'll build the form, tracking and thank-yous.",
    content: `
<div class="callout"><p><strong>Short version:</strong> one clear reward, paid when the new job is finished. Ask right after a good job. Track every referral on a form. Never tie a reward to a review, and check your state's rules on paying for referrals in your trade.</p></div>
<h2>Pick a reward</h2>
<table>
<tr><th>Reward</th><th>Good for</th><th>Watch for</th></tr>
<tr><td>Credit on the next visit</td><td>Recurring services</td><td>Useless to one-time customers</td></tr>
<tr><td>Gift card</td><td>Projects</td><td>Keep records for taxes</td></tr>
<tr><td>Something for both people</td><td>Neighborhoods</td><td>Cost per job doubles</td></tr>
<tr><td>Donation to a local cause</td><td>Community brands</td><td>Name it and really pay it</td></tr>
<tr><td>A handwritten thank-you</td><td>Everyone</td><td>Nothing. Do this too.</td></tr>
</table>
<h2>Check the rules</h2>
<ul>
<li>Some licensed trades, insurance work and real-estate settlements restrict referral payments.</li>
<li>Roofers: several states limit rebates tied to insurance deductibles.</li>
<li>Referral rewards and reviews are separate. ${GOOGLE_REVIEWS} doesn't allow rewards for reviews.</li>
</ul>
<h2>Ask at the right time</h2>
<p>At the walk-through, when they say it looks great: "Glad you like it. Most of our work comes from neighbors. If you know someone who needs {service}, send them this link and we'll {reward} when their job's done."</p>
<h2>Track it</h2>
<ol>
<li>A short form: your name, friend's name, what they need. Only add a friend's number with their OK.</li>
<li>"Who sent you?" on every new lead.</li>
<li>Send the thank-you the day the job is paid. Late rewards kill programs.</li>
</ol>
<h2>Partners send more than customers</h2>
<p>Property managers, real-estate agents and other trades meet your customers every week. Agree on how you'll treat their people and send work back. A plumber and a restoration company can fill each other's slow days.</p>
<p>More ways to get repeat work: <a href="/guides/win-back-past-customers">win back past customers</a> and <a href="/guides/how-to-sell-maintenance-plans">sell maintenance plans</a>.</p>`,
    faq: [
      ["How much should I pay for a referral?", "Less than what a job costs you from other sources, and enough to be worth mentioning. Work out your cost per job first."],
      ["Are contractor referral fees legal?", "Often, but not in every trade or state, and insurance-related work has extra limits. Check with your license board or a lawyer."],
      ["Can I give a reward for a Google review too?", "No. Google doesn't allow incentives for reviews. Keep the two apart."],
      ["When should I pay the reward?", "When the new customer's job is finished and paid, and quickly."],
    ],
  },
  {
    slug: "how-to-get-more-hvac-customers",
    path: "/guides/how-to-get-more-hvac-customers",
    title: "How to Get More HVAC Customers: A 30-Day Plan",
    description: "A 30-day plan to get more HVAC customers: fix missed calls, book tune-ups from past customers, climb Google Maps, sell maintenance plans and follow up quotes.",
    h1: "How to get more HVAC customers: a 30-day plan",
    lede: "HVAC demand comes in waves. The companies that stay busy answer in the rush and work their list between rushes. Here's a month of work, in the order that pays.",
    eyebrow: "HVAC marketing", readMinutes: 4, article: { date: DATE },
    ctaTitle: "Want this done for your HVAC company?",
    content: `
<div class="callout"><p><strong>Short version:</strong> week 1, stop losing calls. Week 2, book tune-ups from past customers. Week 3, fix your Google profile and reviews. Week 4, follow up every replacement quote and launch one maintenance plan.</p></div>
<h2>Week 1: stop losing calls</h2>
<ul>
<li>Count last month's missed calls in your phone log.</li>
<li>Turn on a text-back that asks "completely out, or not keeping up?" (<a href="/tools/missed-call-text-templates">copy it</a>).</li>
<li>Decide who takes no-heat and no-cool calls after hours, and tell callers.</li>
<li>Put the number and a booking link at the top of your site.</li>
</ul>
<h2>Week 2: your past customers</h2>
<ul>
<li>List systems you serviced 10 to 14 months ago.</li>
<li>Message the ones who agreed to hear from you, 25 to 50 at a time.</li>
<li>Call the ones with systems over ten years old. They're your replacements.</li>
</ul>
<h2>Week 3: Google</h2>
<ul>
<li>Check your Google Business Profile is verified first. An unverified profile can sit out of the map results. Cooling Comfort, an HVAC company in Inglewood, CA, had been stuck unverified for months; <a href="/results/cooling-comfort">it was verified 3 days after one free call with us</a>.</li>
<li>Primary category: the one that matches most of your work, such as HVAC contractor or Air conditioning contractor. Change it with the season only if your work really changes.</li>
<li>List services one by one: AC repair, furnace repair, heat pump installation, duct cleaning if you do it.</li>
<li>Add ten photos of real installs.</li>
<li>Ask every customer for a review the day of the job, and reply to all of them.</li>
</ul>
<p>The full list: <a href="/guides/how-to-rank-higher-on-google-maps">rank higher on Google Maps</a>.</p>
<h2>Week 4: quotes and plans</h2>
<ul>
<li>Replacement quotes: follow up on day 2, 7 and 14 (<a href="/guides/how-to-follow-up-on-an-estimate">what to say</a>). Offer two or three options, and financing from a lender you trust.</li>
<li>One maintenance plan, priced from your cost (<a href="/tools/maintenance-plan-calculator">calculator</a>), offered on every call.</li>
</ul>
<h2>What to leave for later</h2>
<p>Mailers, wraps and big ad budgets work better once calls are answered and quotes are chased. Otherwise you pay for leads you lose.</p>
<h2>How to tell it's working</h2>
<table>
<tr><th>Number</th><th>Where to find it</th></tr>
<tr><td>Calls answered</td><td>Phone log</td></tr>
<tr><td>Tune-ups booked from past customers</td><td>Your list</td></tr>
<tr><td>New reviews this month</td><td>Google profile</td></tr>
<tr><td>Replacement quotes won</td><td>Your quotes</td></tr>
<tr><td>Plan members</td><td>Billing</td></tr>
</table>
<p>Done for you: <a href="/marketing/hvac">HVAC marketing</a>.</p>`,
    faq: [
      ["How do HVAC companies get more customers?", "Answer every call, work past customers before each season, keep new Google reviews coming, and follow up every replacement quote."],
      ["What is the best advertising for HVAC?", "It depends on your town. Start with your Google profile and past customers, then test Local Services Ads and compare cost per job."],
      ["How do I get HVAC leads in the slow season?", "Tune-ups and plans from past customers, old replacement quotes, indoor air quality work and commercial maintenance."],
      ["How many reviews does an HVAC company need?", "Enough to sit with the top three in your area, plus new ones every month. Use our review calculator for your gap."],
    ],
  },
  {
    slug: "how-to-get-more-roofing-customers",
    path: "/guides/how-to-get-more-roofing-customers",
    title: "How to Get More Roofing Customers Without Shared Leads",
    description: "How roofers get more customers without buying shared leads: inspections, storm response, photos, reviews, estimate follow-up and neighbors of finished jobs.",
    h1: "How to get more roofing customers without buying shared leads",
    lede: "A roof is a big, rare purchase, so homeowners look hard before they choose. You win by being easy to check out, quick to inspect and good at following up.",
    eyebrow: "Roofing marketing", readMinutes: 4, article: { date: DATE },
    ctaTitle: "Want this done for your roofing company?",
    content: `
<div class="callout"><p><strong>Short version:</strong> make inspections easy to book, send the report the same day with photos, follow up for at least a month, collect reviews with photos, and work the streets where you've just finished a job.</p></div>
<h2>1. Make the inspection the product</h2>
<ul>
<li>Online booking with the address, roof age and a photo from the ground.</li>
<li>Same-day report: photos, what's wrong, what can wait, and what it would cost.</li>
<li>Say "you don't need a roof yet" when that's true. It brings more work than you'd expect.</li>
</ul>
<h2>2. Be ready for storms before they come</h2>
<ul>
<li>A page about storm inspections in your towns, with your real process.</li>
<li>A missed-call text for storm days (<a href="/tools/missed-call-text-templates">copy one</a>).</li>
<li>A list of past customers to check on first.</li>
<li>Stay inside the rules: many states limit what roofers can say about insurance claims and deductibles.</li>
</ul>
<h2>3. Win the map</h2>
<p>Roofers compete on reviews and photos. Ask every customer the day you finish. Our roofing client <a href="/results/presidential-roofing">Presidential Roofing</a> went from 27 to 43 Google reviews in 20 days by asking past customers. Then follow the <a href="/guides/how-to-rank-higher-on-google-maps">Google Maps guide</a>.</p>
<h2>4. Follow up longer than others</h2>
<p>Roof decisions take weeks. Plan messages at day 2, 7, 14 and 30. Add something each time: a similar roof you did, a warranty answer, a financing option. <a href="/guides/how-to-follow-up-on-an-estimate">Wording here</a>.</p>
<h2>5. Work the block</h2>
<ul>
<li>A yard sign with a QR code to your reviews, with the owner's OK.</li>
<li>Five notes to the nearest houses before you start: dates, noise, your number.</li>
<li>A finished photo with the street or neighborhood, never the house number.</li>
</ul>
<h2>6. Show proof on your site</h2>
<p>One page per service (repair, replacement, metal, flat) and real projects by town. Answer price honestly: what changes it and a range you stand behind. License and insurance easy to find.</p>
<h2>What about lead sites?</h2>
<p>Test them, track cost per job and cap it. <a href="/guides/angi-vs-thumbtack-vs-local-services-ads">How each one charges</a>. Done for you: <a href="/marketing/roofing">roofing marketing</a>.</p>`,
    faq: [
      ["How do roofers get customers?", "Google Maps and reviews, referrals, neighbors of finished jobs, storm response and steady follow-up on inspections."],
      ["How can I get roofing leads without buying them?", "Make inspections easy to book, ask every customer for a review, work the streets around each job and follow up on every estimate for at least a month."],
      ["How long should a roofer follow up?", "At least 30 days. Many homeowners are still comparing or waiting on insurance."],
      ["Is door knocking worth it?", "It can be after a storm where it's allowed. Check local permit rules and no-soliciting signs, and lead with help."],
    ],
  },
];
