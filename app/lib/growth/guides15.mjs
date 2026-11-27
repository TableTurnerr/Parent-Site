// Answering-service cost guides by trade (added 2026-11-27): HVAC, plumbing, electrician, roofing, handyman.
// Each guide is written for its trade (call pattern, triage rules, job values, worked minute math). Do not template.
// Vendor prices: re-read on each vendor's own pricing page on 2026-11-27 (PATLive, Ruby, Smith.ai, MAP Communications,
// Specialty Answering Service, Rosie, Goodcall, Jobber). The PATLive/Ruby/Smith.ai/Rosie/Goodcall/Jobber figures match
// guides7.mjs. Job-value figures are Fixr/EnergySage cost guides (dates in the text); Triple-I storm figures as reported
// by Insurance Business (April 2026). Safety lines: Wisconsin PSC (gas), Oregon State Fire Marshal (CO), ESFI (power lines).
// TableTurnerr prices are never typed here: {{PRICE:<key>}} and {{DEMO}} tokens are filled from app/lib/pricing.ts.
// Worked examples use only the minute counts that have tokens: 100, 200, 300, 600, 1000.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const PATLIVE = (t = "PATLive") => A("https://www.patlive.com/pricing/", t);
const RUBY = (t = "Ruby") => A("https://www.ruby.com/pricing/", t);
const SMITH = (t = "Smith.ai") => A("https://smith.ai/pricing", t);
const MAP = (t = "MAP Communications") => A("https://www.mapcommunications.com/pricing/", t);
const SAS = (t = "Specialty Answering Service") => A("https://www.specialtyansweringservice.net/pricing/", t);
const ROSIE = (t = "Rosie") => A("https://heyrosie.com/pricing", t);
const GOODCALL = (t = "Goodcall") => A("https://www.goodcall.com/pricing.md", t);
const JOBBER = (t = "Jobber") => A("https://www.getjobber.com/pricing/", t);
const FIXR_AC_REPAIR = (t) => A("https://www.fixr.com/costs/air-conditioner-repair", t);
const FIXR_AC_INSTALL = (t) => A("https://www.fixr.com/costs/air-conditioner-installation", t);
const FIXR_EPLUMB = (t) => A("https://www.fixr.com/articles/emergency-plumbing-costs-an-in-depth-guide-to-repairs-and-insurance", t);
const FIXR_GAS_WH = (t) => A("https://www.fixr.com/costs/gas-water-heater", t);
const FIXR_PANEL = (t) => A("https://www.fixr.com/costs/install-electrical-circuit-panel-upgrade", t);
const FIXR_ELEC = (t) => A("https://www.fixr.com/costs/electrician", t);
const ENERGYSAGE = (t) => A("https://www.energysage.com/ev-charging/how-much-does-ev-charger-installation-cost/", t);
const FIXR_ROOF_REPAIR = (t) => A("https://www.fixr.com/costs/repair-roof", t);
const FIXR_ROOF_REPLACE = (t) => A("https://www.fixr.com/costs/roof-replacement", t);
const FIXR_HANDY = (t) => A("https://www.fixr.com/costs/handyman", t);
const TRIPLE_I = (t) => A("https://www.insurancebusinessmag.com/us/news/catastrophe/severe-storm-losses-stay-above-50-billion-for-third-year-571849.aspx", t);
const GAS_SAFETY = (t) => A("https://psc.wi.gov/Pages/ServiceType/Energy/PipelineSafety/NaturalGasConsumerSafety.aspx", t);
const CO_SAFETY = (t) => A("https://www.oregon.gov/osfm/education/Pages/carbon-monoxide.aspx", t);
const ESFI = (t) => A("https://www.esfi.org/downed-power-line-electrical-safety-downed-and-dangerous/", t);

export const guides15 = [
  // ------------------------------------------------------------------ HVAC
  {
    slug: "hvac-answering-service-cost",
    path: "/guides/hvac-answering-service-cost",
    title: "How Much Does an HVAC Answering Service Cost? (2026)",
    description: "HVAC answering service prices checked November 2026: live per-minute and per-call plans vs AI, with the math for a shoulder month, a summer and a heat wave.",
    h1: "How much does an HVAC answering service cost?",
    lede: "An HVAC phone bill is set by the weather. A quiet April and a 100-degree July can differ several times over in call minutes, and that swing decides which kind of answering service makes sense. Here are real prices, checked November 27, 2026, run through three HVAC months.",
    eyebrow: "HVAC answering costs", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Hear how it handles a no-cool call.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked on November 27, 2026 cost about $1.20 to $5 a minute, or $7 to $11.50 a call. For a typical HVAC summer month of about 300 minutes, that's roughly $384 to $810, and more on premium services. Self-serve AI receptionists ran $49 to $299 a month. Ours is {{PRICE:ai}}, which works out to {{PRICE:aiAt300}} at 300 minutes and {{PRICE:aiAt600}} in a 600-minute heat-wave month.</p></div>
<h2>Prices at a glance</h2>
<p>All read on each company's own pricing page on November 27, 2026. Prices change, so check again before you sign.</p>
<table>
<tr><th>Service</th><th>Type</th><th>Plans</th><th>What matters for HVAC</th></tr>
<tr><td>${PATLIVE()}</td><td>Live, per minute</td><td>$99 (50 min) to $1,499 (1,000 min). Extra minutes $2.29 down to $1.69.</td><td>Bills only the time an agent is live on the call, not the notes afterward.</td></tr>
<tr><td>${MAP()}</td><td>Live, per minute</td><td>$179 (125 min), $339 (250), $649 (500). Extra $1.30 or $1.28.</td><td>The page warns after-hours and holiday support can add to the bill, without amounts.</td></tr>
<tr><td>${SAS()}</td><td>Live, per minute</td><td>$159 (100 min), $269 (220), $649 (500). Extra $1.44 to $1.34.</td><td>Transferring a call to your on-call tech ("patching") is $0.10 a minute extra.</td></tr>
<tr><td>${SMITH()}</td><td>Per call</td><td>$300 (30 calls), $810 (90), $2,100 (300)</td><td>A long diagnostic call costs the same as a short one. Spam isn't charged, per the page.</td></tr>
<tr><td>${ROSIE()}</td><td>AI, minute bundle</td><td>$49 (250 min), $149 (1,000), $299 (2,000)</td><td>Booking into your calendar and call transfers start on the $149 plan.</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>AI add-on</td><td>$99/mo on top of a Jobber plan</td><td>Only if you run on Jobber.</td></tr>
<tr><td>TableTurnerr (us)</td><td>AI, set up for you</td><td>{{PRICE:aiShort}}</td><td>Emergencies forwarded to your on-call tech by your rules.</td></tr>
</table>
<h2>Why HVAC call math is different</h2>
<p>Most trades have a steady phone. HVAC has seasons inside seasons. Spring and fall are tune-ups, maintenance-plan renewals and replacement estimates. Then the first real heat wave or the first hard freeze hits, and every homeowner whose system quit calls the same week, often the same afternoon.</p>
<p>Two things follow. First, a per-minute plan sized for April will run deep into overage in July, and a plan sized for July wastes money in April. Second, HVAC calls run longer than a simple booking, because a good dispatcher asks: is the system running at all, is the outdoor unit on, furnace or heat pump, how old is it, is anyone at home at risk from the heat or cold. That's useful on the call and expensive on a meter.</p>
<h2>Worked example: three HVAC months</h2>
<p>Assumptions, so you can swap in your own: HVAC calls average about four minutes. A shoulder month brings 25 calls the answering service takes (100 minutes), a normal summer month 75 calls (300 minutes), and a heat-wave month 150 calls (600 minutes). Each cell is the cheapest listed plan that covers it.</p>
<table>
<tr><th>Option</th><th>Shoulder month (100 min)</th><th>Normal summer (300 min)</th><th>Heat wave (600 min)</th></tr>
<tr><td>Specialty Answering Service</td><td>$159</td><td>$384</td><td>$783</td></tr>
<tr><td>MAP Communications</td><td>$179</td><td>$403</td><td>$777</td></tr>
<tr><td>PATLive</td><td>$189</td><td>$479</td><td>$938</td></tr>
<tr><td>Smith.ai (25, 75, 150 calls)</td><td>$300</td><td>$810</td><td>$1,440</td></tr>
<tr><td>Rosie, with booking and transfers</td><td>$149</td><td>$149</td><td>$149</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt300}}</td><td>{{PRICE:aiAt600}}</td></tr>
</table>
<p>How the harder cells work: MAP at 300 minutes is its $339 plan plus 50 extra minutes at $1.28, a few dollars less than its $179 plan plus 175 minutes at $1.30. Specialty at 600 minutes is the $649 plan plus 100 minutes at $1.34. Smith.ai at 150 calls is the $810 plan plus 60 calls at $10.50. Live figures exclude taxes, after-hours fees and transfer charges, which some services add.</p>
<p>The honest read: in a quiet month, a low-cost live plan or a self-serve AI tool is cheaper than ours. In a heat wave, the cheapest live services land close to our price, and ours includes the rest of the Growth package, not just answering. The self-serve tools stay cheapest throughout if you're willing to write and tune the script yourself.</p>
<h2>What a missed no-cool call costs</h2>
<p>Fixr's cost guide (updated January 2026) puts the average ${FIXR_AC_REPAIR("AC repair at $375")}, with most between $250 and $700, and says emergency work often runs two to three times the normal hourly rate. A replacement is a different size of job: Fixr's ${FIXR_AC_INSTALL("AC installation guide")} (January 2026) puts most systems at $5,000 to $12,000, about $6,000 on average.</p>
<p>Example numbers, labeled as examples: you miss 12 no-cool calls during a heat-wave week. If half would have booked, that's 6 repairs at about $375, or $2,250. If one of those systems is 18 years old and the homeowner replaces instead of repairing, that one call is worth more than the whole year of answering. The homeowner without cooling doesn't leave a voicemail. They call the next company on the map.</p>
<h2>Emergency rules an HVAC answering service must follow</h2>
<p>Whoever answers, person or AI, needs written rules from you. Ours are set during setup and look like this:</p>
<ul>
<li><strong>Gas smell:</strong> the caller is told to leave the house and call the gas utility or 911 from outside. That matches state regulator advice, such as ${GAS_SAFETY("Wisconsin's Public Service Commission")}, which also warns against using phones, lights or switches near a suspected leak. No troubleshooting.</li>
<li><strong>Carbon monoxide alarm going off:</strong> get everyone outside into fresh air and call 911, as the ${CO_SAFETY("Oregon State Fire Marshal")} advises. Then a callback from your tech.</li>
<li><strong>No heat in freezing weather, or no cooling with an infant, an older person or someone medically fragile at home:</strong> forwarded to the on-call tech, with a backup person if they don't answer.</li>
<li><strong>System running but not keeping up, strange noises, water at the air handler:</strong> booked for the first open slot, with a text summary to you.</li>
<li><strong>Tune-ups, maintenance-plan questions, replacement estimates:</strong> booked or captured, never quoted beyond the fees you approve.</li>
</ul>
<p>Our <a href="/marketing/hvac/ai-answering-service">HVAC AI answering page</a> shows how these calls sound.</p>
<h2>Questions to ask before you sign</h2>
<ol>
<li><strong>What happens in July?</strong> Ask the overage rate and whether you can move plans mid-month, or only next month.</li>
<li><strong>How many calls at once?</strong> A heat wave means five people calling in the same ten minutes. Ask what callers hear when everyone is busy.</li>
<li><strong>What does a transfer cost?</strong> Patching a no-heat call to your tech can add per-minute charges, and the clock may keep running while it rings.</li>
<li><strong>Are nights and holidays extra?</strong> Some services list after-hours and holiday fees without printing the amount.</li>
<li><strong>Who writes the triage script?</strong> And who updates it when you add a service plan or change your diagnostic fee?</li>
</ol>
<p>For the general picture, see <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. Plumbers face a similar night problem with different rules: see <a href="/guides/plumbing-answering-service-cost">plumbing answering service costs</a>.</p>
<h2>What ours costs and does</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> costs {{PRICE:ai}}. It answers in your company name, takes several calls at once so a heat wave doesn't hit voicemail, picks up when you're already on the phone, and forwards emergencies to your on-call tech by your rules. Routine calls get booked or texted to you. We write the script and tune it, and the price includes the rest of the Growth package: CRM, follow-ups, review requests and your website. Call our demo line at {{DEMO}} and describe a dead AC to it.</p>`,
    faq: [
      ["How much does an HVAC answering service cost per month?", "Live plans we checked in November 2026 ranged from about $159 for 100 minutes to $1,499 for 1,000 minutes, or $300 for 30 calls. Self-serve AI tools ran $49 to $299 a month. Your real bill depends on how hard summer and winter hit your phones."],
      ["Do HVAC answering services charge more in summer?", "The rate usually stays the same, but you use more minutes, so overage drives the bill up. Some services also list after-hours or holiday fees. Ask whether you can change plans before the season starts."],
      ["Can an answering service dispatch my on-call HVAC tech?", "Most can transfer or 'patch' a call to the on-call tech, sometimes for an extra per-minute fee. Give them written rules for what counts as urgent in summer and in winter, plus a backup person."],
      ["What should an HVAC answering service do if a caller smells gas?", "Tell them to leave the house and call the gas utility or 911 from outside, and nothing more. It shouldn't try to troubleshoot. State regulators give the same advice."],
      ["Is AI or a live service better for an HVAC company?", "Live services handle upset or unusual callers better. AI is cheaper per minute and doesn't run out of people during a heat wave. Many shops let AI answer first and forward true emergencies to a person."],
      ["How many minutes does an HVAC company need?", "Count the calls you miss or send to voicemail and multiply by about four minutes. Do it for a quiet month and a peak month, because the gap is usually large."],
    ],
  },

  // ------------------------------------------------------------------ PLUMBING
  {
    slug: "plumbing-answering-service-cost",
    path: "/guides/plumbing-answering-service-cost",
    title: "How Much Does a Plumbing Answering Service Cost?",
    description: "What a plumbing answering service costs in 2026: live per-minute and per-call prices vs AI, the math for night-only and full coverage, and triage rules.",
    h1: "How much does a plumbing answering service cost?",
    lede: "Plumbing is the trade where the 2 a.m. call is the most valuable call of the week. An answering service is mostly about catching those, and telling them apart from a drip that can wait. Here's what coverage costs, checked November 27, 2026.",
    eyebrow: "Plumbing answering costs", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Call it with a burst pipe and listen.",
    content: `
<div class="callout"><p><strong>Short version:</strong> covering only nights and weekends, about 200 minutes a month, cost roughly $270 to $720 on the live services we checked on November 27, 2026, or $415 on a per-call plan. Self-serve AI tools ran $49 to $299 a month. Ours is {{PRICE:ai}}, so 200 minutes comes to {{PRICE:aiAt200}} and full day-and-night coverage at 600 minutes comes to {{PRICE:aiAt600}}.</p></div>
<h2>Plumbing calls come at night and run long</h2>
<p>A plumbing emergency doesn't wait for business hours. A supply line lets go overnight, a water heater floods a basement on Sunday morning, a sewer line backs up during a holiday dinner. These calls are worth the most and they're also the longest, because the caller is stressed and someone has to ask the right questions: is water still running, have you found the main shut-off, is it one fixture or the whole house, is it clean water or sewage.</p>
<p>During the day the pattern flips. Most one- and two-truck shops have the owner under a sink, so the missed calls are routine: drain cleaning, a running toilet, a water heater quote. Short calls, but a lot of them. That split is why many plumbers buy coverage for nights and weekends first, and why per-call and per-minute pricing land so differently.</p>
<h2>What you'd pay, side by side</h2>
<p>Two plumbing setups. Night and weekend only: 40 calls at about five minutes, or 200 minutes. Day overflow plus nights: 120 calls at five minutes, or 600 minutes. Swap in your own numbers. Prices read on each company's own page on November 27, 2026.</p>
<table>
<tr><th>Option</th><th>Nights and weekends (200 min, 40 calls)</th><th>Day overflow plus nights (600 min, 120 calls)</th></tr>
<tr><td>${SAS()} (live)</td><td>$269 (220-minute plan)</td><td>$783</td></tr>
<tr><td>${MAP()} (live)</td><td>About $277</td><td>$777</td></tr>
<tr><td>${PATLIVE()} (live)</td><td>$349</td><td>$938</td></tr>
<tr><td>${RUBY()} (live)</td><td>$720</td><td>Over $1,725 (extra-minute rate not listed)</td></tr>
<tr><td>${SMITH()} (per call)</td><td>$415</td><td>$1,125</td></tr>
<tr><td>${GOODCALL()} (AI, per caller)</td><td>$79</td><td>$129</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>{{PRICE:aiAt200}}</td><td>{{PRICE:aiAt600}}</td></tr>
</table>
<p>The math: MAP at 200 minutes is the $179 plan plus 75 minutes at $1.30. At 600 minutes it's the $649 plan plus 100 at $1.28, and Specialty is $649 plus 100 at $1.34. PATLive at 600 is its $759 plan plus 100 at $1.79. Smith.ai at 40 calls is $300 plus 10 calls at $11.50, and at 120 calls it's $810 plus 30 at $10.50. Goodcall counts unique callers, so a customer who calls three times about one leak counts once. Live prices exclude taxes and any after-hours fees.</p>
<h2>Per minute or per call for emergency plumbing?</h2>
<p>Long calls favor per-call pricing. Lots of short calls favor per-minute. Plumbing has both, so look at your own log before choosing:</p>
<ul>
<li><strong>Per minute</strong> (PATLive, MAP, Specialty, Ruby): a ten-minute flooding call costs ten minutes. Ask how calls are rounded. Specialty bills by the second. A 30-second wrong number on a plan that rounds up to the minute still costs a full minute.</li>
<li><strong>Per call</strong> (Smith.ai): the flood call and the "what are your hours?" call cost the same $7 to $11.50. Smith.ai says it doesn't charge for spam.</li>
<li><strong>AI bundles</strong> (Rosie, ours): minutes still count, but at cents instead of dollars. Ours past the included 150 is {{PRICE:minute}} a minute.</li>
</ul>
<h2>What one unanswered emergency costs a plumber</h2>
<p>Fixr's emergency plumbing guide (October 2026) puts ${FIXR_EPLUMB("emergency rates at $100 to $500 an hour, about $170 on average")}, with a standard burst-pipe repair at $600 to $800 for most homeowners and sewer backups from $500 to $3,800. A failed water heater often turns into a replacement: Fixr puts ${FIXR_GAS_WH("a gas water heater replacement")} at about $1,900 on average (January 2026).</p>
<p>The formula: missed after-hours calls a month, times the share that were real jobs, times your average ticket. Example numbers, not data: 8 missed night calls, half of them real jobs, at a $700 ticket, is $2,800 a month walking to the plumber who answered. And the customer you saved at 2 a.m. tends to call you for the water heater next year.</p>
<h2>The triage script: what's a 2 a.m. call and what waits</h2>
<p>Your answering service is only as good as its rules. These are the ones we set up with plumbers, and you change them to fit how you run on-call:</p>
<table>
<tr><th>Caller says</th><th>What happens</th></tr>
<tr><td>Water is pouring and won't stop</td><td>Asks if they've found the main shut-off. Forwards live to the on-call plumber, with a backup if no answer.</td></tr>
<tr><td>Sewage coming up a drain</td><td>Asks if it's one drain or several and whether it's still rising. Forwarded by your rules.</td></tr>
<tr><td>Water heater leaking</td><td>Asks gas or electric and how fast. A puddle gets the first morning slot, active flooding gets forwarded.</td></tr>
<tr><td>Smells gas near the water heater</td><td>Told to leave the house and call the gas utility or 911 from outside, as ${GAS_SAFETY("state regulators advise")}. Nothing else.</td></tr>
<tr><td>No water in the whole house</td><td>Asks if neighbors have water (a city main break isn't your job). Then your rule.</td></tr>
<tr><td>Dripping faucet, running toilet, slow drain</td><td>Booked for business hours. Summary texted to you.</td></tr>
</table>
<p>It won't walk anyone through a repair or quote a job you haven't priced. See how this sounds on our <a href="/marketing/plumbing/ai-answering-service">plumbing AI answering page</a>.</p>
<h2>Questions to ask a plumbing answering service</h2>
<ol>
<li><strong>What's the escalation chain?</strong> First on-call plumber, then a second, then you. What happens if nobody picks up at 3 a.m.?</li>
<li><strong>Does the meter run during the transfer?</strong> Specialty lists $0.10 a minute for patched calls. Others may bill the ringing time.</li>
<li><strong>Can it tell a city main break from your problem?</strong> A "no water" call from half a street isn't a job.</li>
<li><strong>Will it read my exact shut-off line?</strong> Only the words you approve, and only that.</li>
<li><strong>What's the after-hours rate?</strong> Some services list night, weekend and holiday fees without amounts on the pricing page.</li>
</ol>
<p>More background: <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. HVAC shops face the same night problem driven by weather: <a href="/guides/hvac-answering-service-cost">HVAC answering service costs</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your name day and night, takes several calls at once, picks up when you're already on another call, and forwards emergencies to whoever is on call by your rules. Everything else gets booked or texted to you with the address and the problem. It's part of the Growth package, so the CRM, follow-ups, review requests and website come with it. Call our demo line at {{DEMO}} and tell it your basement is flooding.</p>`,
    faq: [
      ["How much does a 24/7 plumbing answering service cost?", "On the live plans we checked in November 2026, about $270 to $720 a month for 200 minutes of nights and weekends, and $777 to $938 for 600 minutes on the lower-cost services. Self-serve AI tools ran $49 to $299 a month."],
      ["Is per-call or per-minute better for a plumber?", "Per-call pricing suits long emergency calls; per-minute suits many short routine calls. Check your call log for average length before you choose, and ask how each service rounds call time."],
      ["Can an answering service send emergency calls to my on-call plumber?", "Yes, most can transfer the call. Ask about extra charges for transfers and what happens when the on-call plumber doesn't answer, so the caller isn't left waiting."],
      ["Should an answering service give customers shut-off instructions?", "Only a line you have written and approved, such as asking whether they've found the main shut-off. It shouldn't walk a caller through repairs."],
      ["What's the cheapest way to cover plumbing calls at night?", "A self-serve AI tool or missed-call text-back costs the least, but you set it up yourself. A low-cost live plan covers a few night calls for a few hundred dollars a month."],
      ["Do I need an answering service if I already have an on-call phone?", "Maybe not for emergencies. It helps when the on-call plumber is already on a job, asleep through a call, or getting routine calls that could have been booked for the morning."],
    ],
  },

  // ------------------------------------------------------------------ ELECTRICIANS
  {
    slug: "electrician-answering-service-cost",
    path: "/guides/electrician-answering-service-cost",
    title: "How Much Does an Electrician Answering Service Cost?",
    description: "Electrician answering service costs, checked November 2026: live, per-call and AI prices for quote-heavy call volume, plus the few calls that are emergencies.",
    h1: "How much does an electrician answering service cost?",
    lede: "Most calls to an electrician are people shopping for a quote: a panel upgrade, an EV charger, a generator, recessed lights. They call two or three shops and book whoever answers. That changes what you should pay for. Prices checked November 27, 2026.",
    eyebrow: "Electrician answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Ask our demo line for an EV charger quote.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked on November 27, 2026 cost about $1.20 to $5 a minute, or $7 to $11.50 a call. An electrician with about 100 minutes of missed calls a month would pay $159 to $395 live, or $49 to $99 for a self-serve AI tool. Ours is {{PRICE:ai}}, which is {{PRICE:aiAt100}} at 100 minutes and {{PRICE:aiAt300}} at 300.</p></div>
<h2>Answering service prices for electricians</h2>
<p>Read on each company's own pricing page on November 27, 2026.</p>
<table>
<tr><th>Service</th><th>How it charges</th><th>Plans</th><th>Note for electricians</th></tr>
<tr><td>${SAS()}</td><td>Live, per minute</td><td>$44 a month plus $1.54 a minute, or $159 (100 min), $269 (220)</td><td>Billed by the second, which suits short quote calls.</td></tr>
<tr><td>${RUBY()}</td><td>Live, per minute</td><td>$250 (50 min), $395 (100), $720 (200), $1,725 (500)</td><td>No setup fees, per the page. Extra-minute rate not listed.</td></tr>
<tr><td>${SMITH()}</td><td>Per call</td><td>$300 (30 calls), $810 (90), $2,100 (300)</td><td>A one-minute "do you install chargers?" call costs the same as a long one.</td></tr>
<tr><td>${GOODCALL()}</td><td>AI, per unique caller</td><td>$79 (100 callers), $129 (500), $299 (2,000)</td><td>Minutes aren't metered.</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>AI add-on</td><td>$99/mo plus a Jobber plan (Core was $49)</td><td>Books into your Jobber calendar.</td></tr>
<tr><td>TableTurnerr (us)</td><td>AI, set up for you</td><td>{{PRICE:aiShort}}</td><td>Takes the quote details and books or texts you.</td></tr>
</table>
<h2>Electrical calls are shoppers, not emergencies</h2>
<p>An electrician's phone looks more like a contractor's than a plumber's. The big tickets are planned: Fixr puts the average ${FIXR_PANEL("panel upgrade at about $3,000")}, mostly $1,500 to $4,500 (updated January 2025), and EnergySage puts ${ENERGYSAGE("a home EV charger installation")} at $800 to $3,000 before equipment (June 2026). Smaller service calls run $176 to $327 a visit in ${FIXR_ELEC("Fixr's electrician guide")}.</p>
<p>People buying a $3,000 job rarely leave a voicemail. They call the next name on the list. The exception is after a big outage, when generator and transfer-switch calls can pile up fast. So for most electricians, the answering service's job isn't dispatch. It's answering fast, sounding like a real business, and collecting enough detail that you can quote or book an estimate without a second phone call.</p>
<p>Example math, labeled as an example: you miss 15 quote calls a month and normally win one in four quotes. That's three to four jobs. If even one of them is a panel upgrade, the month's answering is paid for many times over.</p>
<h2>The math at 100 and 300 minutes</h2>
<p>Quote calls are short. Assume three minutes each, so 100 minutes is about 33 calls and 300 minutes is 100 calls. A shop that answers most calls itself and only sends overflow lands near the first column. One that forwards every call after 3 p.m. lands near the second.</p>
<table>
<tr><th>Option</th><th>100 min (about 33 calls)</th><th>300 min (100 calls)</th></tr>
<tr><td>Specialty Answering Service</td><td>$159</td><td>$384</td></tr>
<tr><td>Ruby</td><td>$395</td><td>Over $720 (extra-minute rate not listed)</td></tr>
<tr><td>Smith.ai</td><td>$335</td><td>$915</td></tr>
<tr><td>Goodcall</td><td>$79</td><td>$79</td></tr>
<tr><td>Jobber Receptionist</td><td>$99 + Jobber plan</td><td>$99 + Jobber plan</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt300}}</td></tr>
</table>
<p>How we got them: Specialty at 300 minutes is its $269 plan plus 80 minutes at $1.44. Smith.ai at 33 calls is $300 plus 3 calls at $11.50, and at 100 calls it's the $810 plan plus 10 at $10.50. Goodcall counts unique callers, and 100 fits in its first plan. Short calls are where per-call pricing hurts most: Smith.ai's per-call price on a three-minute call works out to more than $3 a minute.</p>
<h2>The few calls that are emergencies</h2>
<p>Electricians get fewer true emergencies than plumbers or HVAC, but the ones they get are dangerous, so the rules matter more than the volume:</p>
<ul>
<li><strong>Smoke, fire or sparks from a panel or outlet:</strong> the caller is told to get out and call 911. Then your on-call electrician is notified.</li>
<li><strong>A downed power line:</strong> stay away from it and call 911 and the utility. ${ESFI("ESFI")} says to assume any downed line is live. It isn't your job until the utility clears it.</li>
<li><strong>Whole house dark:</strong> the first question is whether the neighbors have power. A street outage goes to the utility, not to your truck.</li>
<li><strong>Burning smell, a breaker that's hot or won't reset, partial power:</strong> forwarded or booked first thing, by your rule.</li>
<li><strong>Everything else</strong> (new circuits, lighting, chargers, panels, generators): captured and booked.</li>
</ul>
<p>It won't tell a caller to open a panel or reset anything. See our <a href="/marketing/electricians/ai-answering-service">AI answering page for electricians</a> for how these calls go.</p>
<h2>What it should capture for a quote</h2>
<p>A message that says "call back about a charger" is half a lead. Ask any service, live or AI, whether it can collect what you need to quote:</p>
<ol>
<li>Address, and whether they own the home.</li>
<li>The job: panel upgrade, EV charger, generator, lighting, repair.</li>
<li>For chargers, the car and where the charger goes relative to the panel. For panels, the current amperage if they know it.</li>
<li>Photos of the panel by text, if your setup sends a follow-up text.</li>
<li>When they want it done, and whether an inspection or utility deadline is driving it.</li>
</ol>
<h2>Questions to ask vendors</h2>
<ul>
<li>How are short calls billed? Per second, rounded up to the minute, or per call?</li>
<li>Can the greeting use your company name and, if you want, your license number?</li>
<li>Can it book estimates into the slots you choose, or only take messages?</li>
<li>Do spam and robocalls count? Smith.ai says it doesn't charge for them. Others don't say.</li>
<li>What does a transfer to your phone cost, and how fast does it happen?</li>
</ul>
<p>For the full price picture, read <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. For a trade with the opposite pattern, many small jobs, see <a href="/guides/handyman-answering-service-cost">handyman answering service costs</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your company name, takes several calls at once, picks up when you're on another call, collects the quote details above and books the estimate or texts you the summary. Emergencies go to your on-call electrician by your rules. It comes with the rest of the Growth package, including follow-up texts on quotes that go quiet. Call our demo line at {{DEMO}} and ask about an EV charger.</p>`,
    faq: [
      ["How much does an answering service cost for an electrician?", "Live plans we checked in November 2026 cost about $159 to $395 for 100 minutes, or $300 for 30 calls. Self-serve AI tools ran $49 to $299 a month, and Jobber's add-on was $99 plus a Jobber plan."],
      ["Do electricians need a 24/7 answering service?", "Many don't need 24/7 dispatch, because most calls are planned work. What they need is fast answers to quote calls, so buyers don't move on to the next electrician. Emergency forwarding can cover the rare night call."],
      ["Is per-call pricing a good fit for electricians?", "Usually not. Quote calls are short, so paying $7 to $11.50 a call works out to several dollars a minute. Per-minute billed by the second, or an AI plan, tends to cost less."],
      ["What should an answering service ask about an EV charger job?", "The address, whether they own the home, the car, where the charger will go relative to the panel, and when they want it done. Photos of the panel help you quote without a site visit."],
      ["What should it do if a caller reports sparks or a downed line?", "Tell them to get away and call 911, and for downed lines, the utility too. It should never coach someone through touching a panel or wires."],
      ["Can an AI answering service book electrical estimates?", "Yes, into the time slots you allow. Jobs you'd rather scope yourself can be texted to you as a summary instead."],
    ],
  },

  // ------------------------------------------------------------------ ROOFING
  {
    slug: "roofing-answering-service-cost",
    path: "/guides/roofing-answering-service-cost",
    title: "How Much Does a Roofing Answering Service Cost?",
    description: "Roofing answering service costs in 2026: what live and AI answering cost in a quiet month vs a storm month, what a storm lead is worth, and what to ask.",
    h1: "How much does a roofing answering service cost?",
    lede: "A roofer's phone is quiet for weeks, then a hailstorm rolls through and it rings all day for a month. Pricing that looks fine in March can explode in May. Here's what answering costs in both kinds of month, with prices checked November 27, 2026.",
    eyebrow: "Roofing answering costs", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Test it like the morning after a storm.",
    content: `
<div class="callout"><p><strong>Short version:</strong> in a quiet month of about 100 minutes, live answering services we checked on November 27, 2026 cost $159 to $300, and self-serve AI $49 to $79. In a storm month of 1,000 minutes, live plans ran about $1,199 to $2,100, while AI stayed between $129 and $149. Ours is {{PRICE:ai}}: {{PRICE:aiAt100}} in a quiet month and {{PRICE:aiAt1000}} at 1,000 minutes.</p></div>
<h2>Two months, two bills</h2>
<p>Assume roofing calls average about four minutes. A quiet month sends the answering service 25 calls (100 minutes). A storm month sends 250 (1,000 minutes). Prices from each company's own page on November 27, 2026, cheapest plan that covers it.</p>
<table>
<tr><th>Option</th><th>Quiet month (100 min, 25 calls)</th><th>Storm month (1,000 min, 250 calls)</th></tr>
<tr><td>${SAS()} (live)</td><td>$159</td><td>$1,199</td></tr>
<tr><td>${MAP()} (live)</td><td>$179</td><td>$1,289</td></tr>
<tr><td>${PATLIVE()} (live)</td><td>$189</td><td>$1,499</td></tr>
<tr><td>${SMITH()} (per call)</td><td>$300</td><td>$2,100</td></tr>
<tr><td>${ROSIE()} (AI)</td><td>$49, or $149 to book and transfer</td><td>$149</td></tr>
<tr><td>${GOODCALL()} (AI, per caller)</td><td>$79</td><td>$129</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt1000}}</td></tr>
</table>
<p>How the storm column works: MAP is its $649 plan plus 500 minutes at $1.28. Smith.ai's 300-call plan at $2,100 beats its $810 plan plus 160 extra calls at $10.50. Specialty and PATLive have 1,000-minute plans. Ruby tops out on its page at 500 minutes for $1,725, with no listed rate past that. Live prices exclude taxes and after-hours fees.</p>
<p>Being straight with you: in a quiet month, a low-cost live plan or a self-serve AI tool costs less than ours. Where ours pulls ahead is the storm month, and because it includes the CRM and follow-ups that turn those calls into inspections.</p>
<h2>Why storms break a roofer's phone</h2>
<p>Storm damage is the roofing industry's biggest driver. Insurance Business, reporting ${TRIPLE_I("Insurance Information Institute figures in April 2026")}, said severe convective storms caused $51 billion in insured US losses in 2025, that hail can make up as much as 80% of those claims in a year, and that roofs account for an estimated 70% to 90% of insured residential catastrophe losses.</p>
<p>For a roofing company that means a whole neighborhood calls in the same 48 hours. Homeowners call three or four roofers, and canvassers and storm-chasers are knocking on the same doors. The roofer who answers first and gets an inspection on the calendar usually gets the job. A live service with a few agents on your account can hold callers in a queue. Ask how many can be answered at once before you need it.</p>
<h2>What a storm lead is worth</h2>
<p>Fixr puts the average ${FIXR_ROOF_REPAIR("roof repair at about $1,150")}, mostly $400 to $1,900 (January 2026), and ${FIXR_ROOF_REPLACE("a full replacement at about $10,000")}, mostly $7,500 to $14,000 (February 2026). Insurance-paid replacements after hail are common, which is why storm leads matter so much.</p>
<p>Example math, labeled as an example: in a storm month you miss 40 calls. If a quarter turn into inspections and a third of those become replacements, that's about three roofs, or roughly $30,000 at Fixr's average. Even one lost replacement costs more than a year of any option in the table.</p>
<h2>What the answering service must handle after a storm</h2>
<ul>
<li><strong>Active leak into the house:</strong> asks where the water is coming in and how bad. Forwarded to whoever handles emergency tarping, or put first on tomorrow's list, by your rule.</li>
<li><strong>Tree or debris through the roof:</strong> if anyone is in danger or the structure looks unsafe, the caller is told to get out and call 911. Then your crew gets the details.</li>
<li><strong>Hail or wind damage, no leak:</strong> books an inspection with the address, roof age if they know it, and whether they've called their insurer.</li>
<li><strong>Insurance questions:</strong> it can say whether you work with insurance claims and offer an inspection. It shouldn't advise on coverage, deductibles or what a policy will pay.</li>
<li><strong>Price questions:</strong> no quotes without an inspection, unless you give it an inspection fee to state.</li>
<li><strong>Existing customers and warranty calls:</strong> flagged for you, not booked as new leads.</li>
</ul>
<p>Our <a href="/marketing/roofing/ai-answering-service">roofing AI answering page</a> shows how a storm call goes.</p>
<h2>When a live service still makes sense for a roofer</h2>
<p>AI isn't the right answer for every roofing company. A person on the line is worth paying for when:</p>
<ul>
<li><strong>Your calls are few and large.</strong> A commercial roofer getting ten calls a month from property managers may prefer a live receptionist at a few hundred dollars, because each call is a five-figure job and the caller expects a person.</li>
<li><strong>Your callers are upset more often than not.</strong> Warranty disputes and leak callbacks on your own work go better with a person, or with you.</li>
<li><strong>You need someone to make outbound calls</strong>, like confirming tomorrow's inspections. Some live services sell that separately. PATLive, for example, lists outbound calling as its own plan.</li>
</ul>
<p>Many roofers mix: AI answers every call, books what it can and forwards the rest to a person. That keeps the storm month affordable without losing the calls that need a human.</p>
<h2>Questions to ask before storm season</h2>
<ol>
<li><strong>What happens at 30 calls in an hour?</strong> Busy signal, hold queue, voicemail, or answered?</li>
<li><strong>Can I change plans mid-month?</strong> If not, the storm month is billed at overage rates.</li>
<li><strong>Do spam and solicitor calls count?</strong> After a storm, sales calls rise too. Smith.ai says it doesn't charge for spam. Ask the rest.</li>
<li><strong>Can it book inspections into my calendar, or only take messages?</strong> A message list of 80 names a day is its own problem.</li>
<li><strong>Bilingual callers?</strong> Ask whether Spanish is included or extra.</li>
</ol>
<p>The general versions of this math are in <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. HVAC owners face the same surge with heat waves: <a href="/guides/hvac-answering-service-cost">HVAC answering service costs</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers every call in your company name, takes several at once so a storm doesn't stack them in voicemail, picks up when you're already on the phone or on a roof, books inspections or texts you the details, and forwards emergencies by your rules. The Growth package also follows up on every inspection that hasn't signed. Call our demo line at {{DEMO}} and report hail damage to it.</p>`,
    faq: [
      ["How much does a roofing answering service cost?", "In November 2026, live plans we checked cost $159 to $300 for a quiet month of about 100 minutes, and roughly $1,199 to $2,100 for a 1,000-minute storm month. Self-serve AI tools stayed between $49 and $299 a month."],
      ["Why does storm season make answering services so expensive for roofers?", "Live services charge per minute or per call, so a month with ten times the calls costs about ten times as much, often at overage rates. AI plans with large minute bundles change much less."],
      ["Can an answering service book roof inspections?", "Many can, if they connect to your calendar. Check this before storm season, because a list of messages to call back is slow when 50 people called that day."],
      ["Should an answering service talk about insurance claims?", "It can say whether you work with insurance and book an inspection. It shouldn't advise on coverage, deductibles or what the insurer will pay."],
      ["What should it do about an active roof leak at night?", "Ask where the water is coming in and how bad it is, then forward the call or put it first in line by your rules. If the structure looks unsafe, tell the caller to get out and call 911."],
      ["Is a cheap AI tool enough for a roofing company?", "It can be, if you'll set it up and keep it current. Test it with a storm call, an insurance question and an upset homeowner before you rely on it."],
    ],
  },

  // ------------------------------------------------------------------ HANDYMAN
  {
    slug: "handyman-answering-service-cost",
    path: "/guides/handyman-answering-service-cost",
    title: "How Much Does a Handyman Answering Service Cost?",
    description: "Handyman answering service costs in 2026: live, AI and text-back prices for a one- or two-person business, and the break-even math on small jobs.",
    h1: "How much does a handyman answering service cost?",
    lede: "A handyman's phone rings with small, varied jobs, and the person who should answer it is usually on a ladder. That makes the question less about features and more about whether the service pays for itself on a few hundred dollars a job. Prices checked November 27, 2026.",
    eyebrow: "Handyman answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Ask our demo if you mount TVs.",
    content: `
<div class="callout"><p><strong>Short version:</strong> for about 100 minutes of calls a month, live answering services we checked on November 27, 2026 cost $179 to $415, and self-serve AI tools $49 to $99. Ours is {{PRICE:ai}}, so 100 minutes is {{PRICE:aiAt100}} and 200 minutes is {{PRICE:aiAt200}}. For many solo handymen, missed-call text-back or a self-serve tool is the right first step. More on that below.</p></div>
<h2>Prices for a handyman's call volume</h2>
<p>Handyman calls are short: "do you do this?", what's on the list, the address, when. Assume about two and a half minutes each, so 100 minutes is 40 calls and 200 minutes is 80. Prices from each company's own pricing page on November 27, 2026.</p>
<table>
<tr><th>Option</th><th>Type</th><th>100 min (40 calls)</th><th>200 min (80 calls)</th></tr>
<tr><td>${MAP()}</td><td>Live, per minute</td><td>$179 (125-minute plan)</td><td>About $277</td></tr>
<tr><td>${PATLIVE()}</td><td>Live, per minute</td><td>$189</td><td>$349</td></tr>
<tr><td>${SMITH()}</td><td>Per call</td><td>$415</td><td>$810</td></tr>
<tr><td>${ROSIE()}</td><td>AI, minute bundle</td><td>$49 (texts a booking link) or $149 (books directly)</td><td>Same</td></tr>
<tr><td>${GOODCALL()}</td><td>AI, per caller</td><td>$79</td><td>$79</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>AI add-on</td><td>$99 + Jobber plan</td><td>$99 + Jobber plan</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>AI, set up for you</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt200}}</td></tr>
</table>
<p>The math: MAP at 200 minutes is its $179 plan plus 75 minutes at $1.30. Smith.ai at 40 calls is $300 plus 10 at $11.50, and at 80 calls its $810 plan is cheaper than $300 plus 50 extra calls. Pay-as-you-go live plans look cheap at $49 a month, but PATLive charges $2.99 a minute on top and MAP $1.37, so they only win if you send very few calls.</p>
<h2>Handyman calls: many, short and all different</h2>
<p>A plumber's calls sort into a few types. A handyman's don't. In one afternoon: mount a TV, patch drywall, rehang a door, replace a fence board, assemble a crib, caulk a tub. Most aren't urgent, and most callers have more than one item once you ask.</p>
<p>So the service has to do three things well: answer "do you do this?" the way you would, including the work you don't take, like jobs your state requires a license for; get the whole list, not just the first item; and book a visit in the time you have open. Dispatch and emergency triage hardly matter. A service that sells you 24/7 emergency dispatch is selling you something you'll rarely use.</p>
<p>Two kinds of callers deserve special handling. Real estate agents and property managers call with punch lists before a closing or a move-in, on a deadline, and they come back with more work if you're reliable. Tell the service to flag them for a fast callback instead of the next open slot. And past customers calling with a new list are your best calls of the week, so they should never sit behind a stranger's TV-mount question. Busy stretches tend to follow the calendar, such as spring to-do lists and the weeks before holiday guests arrive, so check your own call log for when your phone peaks.</p>
<h2>The break-even math on a $300 job</h2>
<p>Fixr's handyman guide puts ${FIXR_HANDY("the average job at about $300")}, mostly $150 to $600, with $130 the most common minimum charge (updated January 2025). That's the number to divide by.</p>
<p>The formula: monthly cost, divided by what you keep from an average job. Example numbers, labeled as examples: if you keep about $150 of a $300 job after materials, gas and time, a $49 tool pays for itself with one saved job a month. A $349 live plan needs a little over two. Run the same division on our {{PRICE:aiAt100}} to see how many saved jobs it takes for you, and remember that our price is the whole Growth package, including your website, review requests and follow-ups, not answering alone.</p>
<p>Look at the job mix too. If you take a lot of $130 minimum-charge calls, each saved call is worth less. If one call usually becomes a half-day list, it's worth more. Our <a href="/tools/missed-call-calculator">missed call calculator</a> does the division for you.</p>
<h2>What the answering service must handle</h2>
<ul>
<li><strong>Your yes-and-no list.</strong> The jobs you take, the ones you don't, and what you refer out.</li>
<li><strong>The whole job list.</strong> "Anything else while we're there?" turns an hour into a half day.</li>
<li><strong>Your minimum or trip fee</strong>, stated plainly if you want it said, so tiny jobs know up front.</li>
<li><strong>Photos.</strong> A follow-up text asking for photos lets you size the job before you drive over.</li>
<li><strong>The rare urgent call.</strong> A leak or a dead outlet may not be your work. Tell it who you refer those to, and anyone in danger is told to call 911.</li>
</ul>
<p>See how these calls sound on our <a href="/marketing/handyman/ai-answering-service">handyman AI answering page</a>.</p>
<h2>Cheaper options worth trying first</h2>
<p>Be honest about your volume. If you miss three or four calls a day and most callers are happy to text, <a href="/guides/missed-call-text-back-cost">missed-call text-back</a> may be all you need: every missed caller gets a text in seconds and can send the list and a photo. Ours is {{PRICE:textback}}. If you'd rather a voice answers and you don't mind building the script, a $49 to $99 self-serve AI tool is a fair test. Move up to a done-for-you setup when calls are piling up, you're adding a second person, or you want the follow-up and reviews handled too.</p>
<h2>What to ask any service</h2>
<ol>
<li>Is there a monthly minimum or a contract, or can I stop any month?</li>
<li>Does it work on my cell phone number, with my personal contacts left alone?</li>
<li>Can it say my minimum charge and my service area?</li>
<li>Can it book into my calendar, or does it only take messages?</li>
<li>How are short calls billed? Two-minute calls rounded up add up fast.</li>
</ol>
<p>For the wider picture, read <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. Electricians have a similar quote-shopping pattern with bigger tickets: <a href="/guides/electrician-answering-service-cost">electrician answering service costs</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your business name while you work, takes several calls at once, picks up when you're already on the phone, uses your yes-and-no list, gets the full job list and books the visit or texts you the summary. We set it up and tune it. Call our demo line at {{DEMO}} and ask whether it hangs shelves.</p>`,
    faq: [
      ["How much does an answering service cost for a handyman?", "For about 100 minutes a month, live plans we checked in November 2026 cost $179 to $415, and self-serve AI tools $49 to $99. Pay-as-you-go live plans start at $49 plus $1.37 to $2.99 a minute."],
      ["Is an answering service worth it for a one-man handyman business?", "Only if missed calls are costing you jobs. Divide the monthly cost by what you keep from an average job. If one or two saved jobs cover it, it's worth testing."],
      ["What's cheaper than an answering service for a handyman?", "Missed-call text-back, which texts every missed caller within seconds, or a self-serve AI receptionist you set up yourself. Both cost less than a live service."],
      ["Can an answering service tell callers my minimum charge?", "Yes, if you give it the exact wording. It shouldn't estimate jobs, but stating a set minimum or trip fee saves you from driving out to jobs that are too small."],
      ["Do handymen need 24/7 emergency answering?", "Rarely. Most handyman work can wait for the next open slot. What matters more is answering during the day while you're working and capturing the whole job list."],
      ["Will it work with my cell phone as my business line?", "Usually, through call forwarding for calls you don't answer. Ask the provider how it keeps family and suppliers from reaching the service."],
    ],
  },
];
