// Answering service cost by trade (added 2026-11-27): garage door, pest control, landscaping/lawn care, cleaning.
// Vendor prices re-read on each vendor's own pricing page on 2026-11-27 (PATLive, Ruby, Smith.ai, Rosie, Goodcall, Jobber)
// and match guides7.mjs (checked 2026-11-25). Job values: This Old House (garage door springs), Housecall Pro's 2026
// price guides (pest control, house cleaning), LawnStarter's 2026 guides (mowing, yard cleanup).
// Per-trade minute math is ours: plan picked = cheapest listed plan that covers the example volume.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} and {{DEMO}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const PATLIVE = (t = "PATLive") => A("https://www.patlive.com/pricing/", t);
const RUBY = (t = "Ruby") => A("https://www.ruby.com/pricing/", t);
const SMITH = (t = "Smith.ai") => A("https://smith.ai/pricing", t);
const ROSIE = (t = "Rosie") => A("https://heyrosie.com/pricing", t);
const GOODCALL = (t = "Goodcall") => A("https://www.goodcall.com/pricing.md", t);
const JOBBER = (t = "Jobber") => A("https://www.getjobber.com/pricing/", t);
const TOH_SPRING = (t = "This Old House") => A("https://www.thisoldhouse.com/garages/garage-door-spring-cost", t);
const HCP_PEST = (t = "Housecall Pro's 2026 pest control price guide") => A("https://www.housecallpro.com/resources/pest-control-prices/", t);
const HCP_CLEAN = (t = "Housecall Pro's 2026 house cleaning price guide") => A("https://www.housecallpro.com/resources/house-cleaning-prices/", t);
const LS_MOW = (t = "LawnStarter's 2026 mowing guide") => A("https://www.lawnstarter.com/blog/cost/lawn-mowing-price", t);
const LS_CLEANUP = (t = "LawnStarter's yard cleanup guide") => A("https://www.lawnstarter.com/blog/cost/yard-cleanup-price/", t);

export const guides16 = [
  // ------------------------------------------------------------------ GARAGE DOOR
  {
    slug: "garage-door-answering-service-cost",
    path: "/guides/garage-door-answering-service-cost",
    title: "How Much Does a Garage Door Answering Service Cost? (2026)",
    description: "Garage door answering service prices, checked November 2026: live per-minute and per-call plans vs AI, the math at 200 minutes, and stuck-door triage rules.",
    h1: "How much does an answering service cost a garage door company?",
    lede: "Garage door calls are short, urgent and easy to lose to the next listing. Here's what live and AI answering cost for that kind of call, with prices checked in November 2026 and the math for a typical shop.",
    eyebrow: "Garage door answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Call our demo with a stuck-door problem.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. Self-serve AI tools ran $49 to $299 a month. For a garage door shop sending about 200 minutes of night, weekend and overflow calls a month, that's roughly $349 to $726 for a live service, $79 to $149 for a self-serve AI tool, and {{PRICE:aiAt200}} for ours, which is {{PRICE:ai}}.</p></div>
<h2>What you'd pay at 200 minutes a month</h2>
<p>Garage door calls tend to be quick: what broke, where you are, when can you come. We assumed about three minutes a call, so 200 minutes is roughly 67 calls. Prices were read on each vendor's own pricing page, checked November 2026. Each cell is the cheapest listed plan that covers that volume.</p>
<table>
<thead><tr><th>Option</th><th>Type</th><th>Cost at ~200 minutes (~67 calls)</th><th>Note for garage door work</th></tr></thead>
<tbody>
<tr><td>${PATLIVE()}</td><td>Live, per minute</td><td>$349 (200-minute plan)</td><td>Overage on that plan is $1.99 a minute, so a cold-snap week costs more</td></tr>
<tr><td>${RUBY()}</td><td>Live, per minute</td><td>$720 (200-minute plan)</td><td>Overage price not listed on the pricing page</td></tr>
<tr><td>${SMITH()}</td><td>Per call</td><td>About $726 ($300 for 30 calls plus 37 at $11.50)</td><td>A 40-second "are you open?" call costs the same as a spring job</td></tr>
<tr><td>${ROSIE()}</td><td>Self-serve AI</td><td>$149 (1,000 minutes)</td><td>Live call transfers start on this plan. The $49 plan only texts a booking link.</td></tr>
<tr><td>${GOODCALL()}</td><td>Self-serve AI</td><td>$79 (100 unique callers)</td><td>Priced per caller, minutes not metered</td></tr>
<tr><td>TableTurnerr</td><td>Done-for-you AI</td><td>{{PRICE:aiAt200}}</td><td>150 minutes included, then {{PRICE:minute}} a minute. We set the stuck-door rules.</td></tr>
</tbody>
</table>
<p>For transfers in particular, the cheap AI plans are not always the ones that can pass a call to your on-call tech. Price the plan that does what you need, not the headline plan.</p>
<h2>Why garage door calls are their own kind of call</h2>
<p>A homeowner with a door that won't open usually needs it fixed today. They're standing in the garage with a phone, they tap the first listing that looks real, and if nobody picks up they tap the next one. There's rarely a second call. That makes garage door work one of the most answer-first trades there is.</p>
<p>The pattern has a few quirks worth planning for:</p>
<ul>
<li><strong>Morning bunching.</strong> Doors fail when people try to leave for work, so calls stack up early, often while you're already on the first job.</li>
<li><strong>Cold snaps.</strong> Springs are under constant tension, and many shops see more broken-spring calls in cold weather. A busy week can blow through a live plan's minutes.</li>
<li><strong>Crowded listings.</strong> Search results for garage door repair are full of call centers and lead sellers. A company that answers in its own name stands out.</li>
<li><strong>Two kinds of caller.</strong> Repair calls want speed. New door and opener shoppers want an estimate visit. The answering has to tell them apart.</li>
</ul>
<h2>What one missed garage door call costs</h2>
<p>${TOH_SPRING()} put an installed torsion spring replacement at $350 to $540 and an extension spring at $300 to $400 in its 2026 cost guide (checked November 2026). It also notes some companies charge extra for emergency, weekend or same-day work.</p>
<p>The formula is simple: <strong>missed calls a month × share that were real jobs × average ticket</strong>. As an example only: 20 missed calls, half of them real repair jobs, at $400 each, is $4,000 of work that went to someone else. Plug in your own numbers in the <a href="/tools/missed-call-calculator">missed call calculator</a>. If the answering saves even one spring job a month, it has paid for most options in the table above.</p>
<h2>What the answering must handle</h2>
<p>Whoever answers, person or AI, needs your rules written down before the first call. These are the ones garage door owners usually set:</p>
<ul>
<li><strong>Car trapped inside.</strong> Ask whether they need the car today. Many shops treat this as same-day or forward it to the on-call tech.</li>
<li><strong>Door stuck open at night.</strong> The house is unsecured, so this is often your most urgent call type.</li>
<li><strong>Door off track, hanging or fallen.</strong> Tell people to stay clear and keep kids and pets away, then book or forward by your rule.</li>
<li><strong>Anyone hurt or trapped.</strong> Tell them to call 911. Nothing else.</li>
<li><strong>One safety line you approve.</strong> Many companies tell callers not to pull the red release cord or lift a door with a broken spring, because the door can drop. The AI should say only what you've approved.</li>
<li><strong>The diagnosis questions.</strong> A loud bang (often a spring), a snapped cable, an opener that hums, a remote or keypad that stopped working, and the opener brand if they know it, so the tech brings the right parts.</li>
<li><strong>Replacement leads.</strong> New door or opener calls become estimate visits, with size and style notes.</li>
</ul>
<h2>After hours: 24/7 service or first slot tomorrow?</h2>
<p>Only promise 24/7 if someone will actually go out. The answering can run around the clock either way. A common setup: after 7 p.m., a door stuck open or a trapped car is forwarded to the on-call tech, and everything else gets the first morning slot plus a text to you with the details. If you charge an after-hours fee, decide whether the AI should state it up front. Callers who hear the fee before you drive out are less likely to cancel at the door.</p>
<p>Also decide the backup. If the on-call tech doesn't pick up in a set number of rings, the call details should go by text to a second person, not into a voicemail nobody checks until morning.</p>
<h2>Questions to ask any vendor</h2>
<ol>
<li>What happens when three people call at once on a cold morning? Does anyone get a busy signal?</li>
<li>Can it forward a live call to my on-call cell, then try a second number if nobody answers?</li>
<li>Will it state my service-call fee and after-hours fee exactly as I write them?</li>
<li>Are calls billed by the second or rounded up? Do spam calls count? (${SMITH()}'s page says spam is not charged. Others didn't say.)</li>
<li>Where do the job details land: a text, an email, or my job software?</li>
<li>Can I change the rules myself during a busy week, or do I have to file a ticket?</li>
</ol>
<p>For the broader picture, see our guides to <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. Pest control runs on a very different calendar: compare with <a href="/guides/pest-control-answering-service-cost">what pest control answering costs</a>.</p>
<h2>What ours costs and does</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your company's name, takes several calls at once, picks up when you're already on the phone, and forwards stuck-open and trapped-car calls to your on-call tech by your rules. Everything else is booked or texted to you. We write the script and set it up on your existing number. See how it works for <a href="/marketing/garage-door-repair/ai-answering-service">garage door companies</a>, or call our demo line at {{DEMO}} and describe a broken spring.</p>`,
    faq: [
      ["How much does a garage door answering service cost?", "Live services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. At 200 minutes a month that's about $349 to $726. Self-serve AI tools were $49 to $299 a month."],
      ["Is per-call or per-minute pricing better for garage door calls?", "Per-minute usually wins, because many garage door calls are short. Per-call plans charge the same for a 40-second hours question as for a full spring repair booking."],
      ["Should a garage door answering service quote prices?", "Only prices you've approved, such as your service-call fee or after-hours fee. Repair prices depend on the door, so most shops have it book a visit instead."],
      ["What counts as a garage door emergency?", "Most shops treat a door stuck open at night and a car trapped inside as urgent. Anyone hurt or trapped should be told to call 911. You set the rest of the rules."],
      ["Can an AI answering service forward calls to my on-call tech?", "Many can, but often only on higher plans. Rosie, for example, listed live transfers from its $149 plan in November 2026. Ours forwards by your rules as part of the package."],
      ["How many minutes does a garage door company need?", "Count the calls you miss plus after-hours calls, then multiply by about three minutes each. Twenty calls a week works out to roughly 250 minutes a month."],
    ],
  },
  // ------------------------------------------------------------------ PEST CONTROL
  {
    slug: "pest-control-answering-service-cost",
    path: "/guides/pest-control-answering-service-cost",
    title: "How Much Does a Pest Control Answering Service Cost? (2026)",
    description: "Pest control answering service costs, checked November 2026: live and AI prices in a slow month vs a peak month, what a lost caller is worth, and triage rules.",
    h1: "How much does an answering service cost a pest control company?",
    lede: "Pest control phones are quiet in January and buried in June. That swing matters more than the plan price. Here's what live and AI answering cost in a slow month and a peak month, with prices checked in November 2026.",
    eyebrow: "Pest control answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Call our demo and report a wasp nest.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked in November 2026 run about $1.40 to $5 a minute, or $7 to $11.50 a call. In a slow month at 100 minutes that's about $189 to $395. In a peak month at 600 minutes it's about $938 to $1,725 or more. Self-serve AI tools stayed between $49 and $149 in both. Ours is {{PRICE:ai}}, which comes to {{PRICE:aiAt100}} in the slow month and {{PRICE:aiAt600}} in the busy one.</p></div>
<h2>Slow month vs peak month</h2>
<p>Pest calls run longer than most trades because the caller describes what they saw and where, and asks about kids, pets and plans. We assumed about four minutes a call: 100 minutes is about 25 calls and 600 minutes is about 150. Prices read on each vendor's pricing page, checked November 2026.</p>
<table>
<thead><tr><th>Option</th><th>Slow month (100 min, ~25 calls)</th><th>Peak month (600 min, ~150 calls)</th></tr></thead>
<tbody>
<tr><td>${PATLIVE()} (live)</td><td>$189</td><td>$938 ($759 for 500 minutes plus 100 at $1.79)</td></tr>
<tr><td>${RUBY()} (live)</td><td>$395</td><td>$1,725 for 500 minutes, plus overage the page doesn't list</td></tr>
<tr><td>${SMITH()} (per call)</td><td>$300 (30 calls)</td><td>$1,440 ($810 for 90 calls plus 60 at $10.50)</td></tr>
<tr><td>${ROSIE()} (self-serve AI)</td><td>$49, or $149 for direct booking</td><td>$149</td></tr>
<tr><td>${GOODCALL()} (self-serve AI)</td><td>$79</td><td>$118.50 ($79 plus 50 extra callers at 79¢)</td></tr>
<tr><td>TableTurnerr (done for you)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt600}}</td></tr>
</tbody>
</table>
<p>The gap is widest in peak season. Per-minute and per-call live plans scale straight up with your busiest weeks. AI pricing barely moves.</p>
<h2>A pest control company's phone year</h2>
<p>Every market is different, but most pest companies see a version of this:</p>
<ul>
<li><strong>Early spring:</strong> ants, and swarmer calls from people who think they have termites. These callers are worried and want an inspection soon.</li>
<li><strong>Summer:</strong> wasps, hornets, mosquitoes and fleas. Short, urgent-feeling calls, many from people who just found a nest by the door.</li>
<li><strong>Fall:</strong> mice and rats moving indoors as it cools. Callers often heard something in the walls at night and call first thing.</li>
<li><strong>Winter:</strong> quieter, mostly existing customers and rodent work.</li>
</ul>
<p>On top of new callers, your recurring customers call between visits: "the ants came back," "can you come before Saturday's party." Those calls protect revenue you already have, and they're the ones that sit in voicemail when every tech is in a crawl space.</p>
<h2>What a lost pest control caller is worth</h2>
<p>${HCP_PEST()} (checked November 2026) put one-time service at $100 to $300 and monthly plan visits at $40 to $80 each. A monthly customer is worth $480 to $960 a year at those rates, and many stay for years.</p>
<p>So the real question is how many first-time callers become plan customers. Example only: if 10 missed calls a month would have produced 3 one-time jobs at $200 and 1 monthly plan at $60 a visit, that month's misses cost $600 now plus $720 a year in plan revenue. That's why the answering should always offer your recurring plan, not just book the one-time visit.</p>
<h2>Triage rules to write down first</h2>
<p>Most pest calls aren't emergencies, but some need faster handling. Decide these before you compare vendors, because some plans can't forward calls at all.</p>
<table>
<thead><tr><th>Caller says</th><th>What the answering does (your rule)</th></tr></thead>
<tbody>
<tr><td>Someone is having an allergic reaction to a sting</td><td>Tells them to call 911. Nothing else first.</td></tr>
<tr><td>A child or pet may have swallowed a pest product</td><td>Gives Poison Control, 1-800-222-1222, then flags the call for you</td></tr>
<tr><td>Wasp or hornet nest at the front door</td><td>Asks about allergies in the home, then same-day list or on-call tech</td></tr>
<tr><td>A bat in the living space</td><td>Same-day by your rule. If anyone may have been bitten or scratched, tells them to call their doctor or local health department.</td></tr>
<tr><td>Restaurant or commercial account before an inspection</td><td>Forwards to you or your commercial lead</td></tr>
<tr><td>Questions about chemicals, pets or kids</td><td>Your approved answer, or a callback from a licensed tech. No guessing.</td></tr>
<tr><td>Ants, spiders, "do you do quarterly service?"</td><td>Answers from your plan details and books the first visit</td></tr>
</tbody>
</table>
<h2>Paying for the peak without paying for it all year</h2>
<p>Live services sell monthly minute tiers. ${PATLIVE()}'s page says plans can be changed or canceled anytime, which helps if you remember to move up in April and down in October. If you don't, you either pay overage all summer or pay for unused minutes all winter. Remember that per-minute rates assume you use every minute you paid for.</p>
<p>AI pricing is flatter. Ours includes 150 minutes and charges {{PRICE:minute}} for each extra one, so a slow month costs the package price and a peak month adds only the extra minutes. Self-serve tools are cheaper still, but you write and maintain the script, the plan details and the triage rules yourself.</p>
<p>To size your own peak, pull last June's call log, not last January's. Count the calls nobody answered and the ones that came in after 6 p.m., then multiply by your average call length. A three-tech company that misses 8 calls a day in June at four minutes each is already near 1,000 minutes a month, which changes which plan makes sense.</p>
<h2>Questions to ask before you sign</h2>
<ol>
<li>Can it explain my plans (monthly, quarterly, mosquito season) and book the first visit, or only take a message?</li>
<li>Will it ask about kids, pets and allergies on every call?</li>
<li>Can I set different rules for commercial accounts?</li>
<li>What does a 600-minute month cost, in writing? Ask for June, not January.</li>
<li>Do repeat calls from the same customer count again? Goodcall prices by unique caller, so repeats count once there.</li>
<li>Does it connect to my software? If you run GorillaDesk or similar, ask how bookings reach your schedule.</li>
</ol>
<p>More background: <a href="/guides/answering-service-cost">answering service costs</a> across trades and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a> at three volumes. Landscapers face a similar spring surge but very different calls: see <a href="/guides/landscaping-answering-service-cost">landscaping answering costs</a>.</p>
<h2>What ours costs and does</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your name, takes several calls at once when June hits, picks up when you're already on the phone, asks what pest and where, offers your recurring plans, and forwards the calls you mark urgent to your on-call tech. Calls, transcripts and summaries go into the CRM we run for you, which connects to other software through Zapier or Make. See <a href="/marketing/pest-control/ai-answering-service">AI answering for pest control</a>, or call our demo line at {{DEMO}} and tell it about a wasp nest.</p>`,
    faq: [
      ["How much does a pest control answering service cost?", "Live services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. That's about $189 to $395 in a 100-minute month and $938 or more in a 600-minute peak month."],
      ["Why do pest control calls use more minutes than other trades?", "Callers describe the pest, where they saw it and for how long, and ask about kids, pets and plans. Four minutes a call is a reasonable starting guess until you check your own log."],
      ["Can an answering service sign customers up for a pest control plan?", "It can explain your plans and book the first visit. Agreements and payment usually stay with your office or field software."],
      ["What should an answering service do with a sting allergy call?", "Tell the caller to call 911 right away. Allergy questions for nests near the home can go to your same-day list or on-call tech by your rule."],
      ["Should I change answering plans by season?", "With a live per-minute service, yes, if the plan allows it, or you'll pay overage in summer or waste minutes in winter. AI pricing changes much less between seasons."],
      ["Is an AI answering service safe for pesticide questions?", "Only with answers you approve. Anything outside them should go to a licensed tech as a callback, and a possible ingestion should get the Poison Control number."],
    ],
  },
  // ------------------------------------------------------------------ LANDSCAPING / LAWN CARE
  {
    slug: "landscaping-answering-service-cost",
    path: "/guides/landscaping-answering-service-cost",
    title: "How Much Does a Landscaping Answering Service Cost? (2026)",
    description: "What an answering service costs a landscaping or lawn care company, checked November 2026: live vs AI prices in the spring rush and the value of one weekly mow.",
    h1: "How much does an answering service cost a landscaping or lawn care company?",
    lede: "Landscapers rarely get emergencies, but they get a flood of estimate requests in a few spring weeks while every crew is on a mower. Here's what live and AI answering cost for that rush, with prices checked in November 2026.",
    eyebrow: "Landscaping answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Call our demo and ask for a spring cleanup.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. For a lawn and landscaping company taking about 300 minutes of calls in a spring month, that's roughly $479 to $810 at PATLive and Smith.ai and more at Ruby, $79 to $149 for a self-serve AI tool, and {{PRICE:aiAt300}} for ours, which is {{PRICE:ai}}. In winter most landscapers need far less.</p></div>
<h2>Prices at a glance</h2>
<p>Landscaping calls run long. The caller describes the yard, what they want done and how often. We assumed about four minutes a call: 300 minutes is about 75 calls, and 1,000 minutes, a busy spring for a company with several crews, is about 250. Prices read on each vendor's own pricing page, checked November 2026.</p>
<table>
<thead><tr><th>Option</th><th>300 min (~75 calls)</th><th>1,000 min (~250 calls)</th></tr></thead>
<tbody>
<tr><td>${PATLIVE()} (live)</td><td>$479</td><td>$1,499</td></tr>
<tr><td>${RUBY()} (live)</td><td>$720 for 200 minutes plus unlisted overage, or $1,725 for 500</td><td>$1,725 for 500 minutes, plus unlisted overage</td></tr>
<tr><td>${SMITH()} (per call)</td><td>$810 (90 calls)</td><td>$2,100 (300 calls)</td></tr>
<tr><td>${ROSIE()} (self-serve AI)</td><td>$149</td><td>$149, right at its 1,000-minute limit</td></tr>
<tr><td>${GOODCALL()} (self-serve AI)</td><td>$79</td><td>$129 (500 callers)</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")} (AI add-on)</td><td>$99 plus a Jobber plan</td><td>$99 plus a Jobber plan</td></tr>
<tr><td>TableTurnerr (done for you)</td><td>{{PRICE:aiAt300}}</td><td>{{PRICE:aiAt1000}}</td></tr>
</tbody>
</table>
<p>Jobber is common in lawn care, so its add-on is worth a look if you already pay for Jobber. ${JOBBER()} listed the Receptionist at $99 a month on top of Core, Connect or Grow and included in Plus (checked November 2026). Our CRM also connects to Jobber through its official integration.</p>
<h2>When a landscaper's phone rings</h2>
<ul>
<li><strong>Late winter to May:</strong> the estimate rush. Spring cleanups, mowing contracts, mulch, new beds and patios. Homeowners call a few companies and book whoever responds first.</li>
<li><strong>Summer:</strong> fewer new calls, more existing customers: skip a week, add trimming, "you missed my yard."</li>
<li><strong>Rain days:</strong> a burst of "when are you coming now?" calls when the schedule slides.</li>
<li><strong>Fall:</strong> leaf cleanup and aeration requests, and early snow contract questions if you plow.</li>
<li><strong>Evenings and weekends:</strong> many homeowners call after work or while walking the yard on Saturday, exactly when your office is closed.</li>
</ul>
<p>The spring rush is short. If your estimate calendar fills a week late because calls went to voicemail, those weekly mows went to a competitor for the whole season.</p>
<h2>The math on one weekly-mow customer</h2>
<p>${LS_MOW()} (checked November 2026) put mowing at $44 to $71 a visit, and estimated a season of weekly mowing at about $1,152 to $1,800 in the Northeast and $1,980 to $3,060 in the Southeast, where the season runs longer. ${LS_CLEANUP()} put an average yard cleanup at $169.</p>
<p>So one missed spring call can be worth a cleanup plus a season of mowing, around $1,300 to $3,200 using those figures, before any mulch or landscaping work. Example only: if 8 spring calls a month go unanswered and 3 would have become weekly customers, that's roughly $4,000 to $9,700 of season revenue. Run your own numbers in the <a href="/tools/missed-call-calculator">missed call calculator</a>.</p>
<h2>What the AI needs to know about your business</h2>
<p>Landscaping answering fails when it promises work you don't do. Before it goes live, give whoever answers:</p>
<ol>
<li><strong>Your exact service list,</strong> including what you don't do (tree removal, irrigation, hardscape).</li>
<li><strong>Your service area by town or ZIP,</strong> so it doesn't book an estimate 40 minutes out.</li>
<li><strong>Minimums,</strong> such as a minimum lot size or job size, if you have them.</li>
<li><strong>How you quote:</strong> from satellite images, a photo by text, or an on-site visit.</li>
<li><strong>Property notes to collect:</strong> gate codes, dogs in the yard, corner lot, slopes.</li>
<li><strong>Your rain and skip policy,</strong> so it can answer schedule questions without calling you.</li>
</ol>
<p>Urgent calls are rare, but set rules for the few you get: a broken irrigation line flooding a yard (if you do irrigation), a commercial snow contract during a storm, or storm damage. If a caller mentions a downed power line, the only answer is to stay away and call the utility or 911.</p>
<h2>After hours and off season</h2>
<p>Since few landscaping calls need a person tonight, after-hours answering is mostly about booking. The answering takes the property details, books an estimate slot or sends you a summary, and the homeowner hangs up knowing they're on your list. Compared with a voicemail you return two days later, that's often the difference between winning and losing the bid.</p>
<p>In winter, a live per-minute plan you sized for April becomes wasted money unless you step it down. With AI, a quiet month simply uses fewer minutes. If you plow, keep the after-hours answering on through storms and set a rule for commercial accounts.</p>
<p>Many lawn companies also pair answering with a text. During the day, a caller you can't reach from the mower gets a quick text asking for the address and a yard photo, and the AI picks up the ones who'd rather talk. That split keeps minutes down in the rush, because the text-first callers never touch the meter. Our <a href="/guides/missed-call-text-back-cost">missed-call text-back cost guide</a> covers that piece.</p>
<h2>Questions to ask vendors</h2>
<ol>
<li>Can it collect a full property description and send it to me in one summary?</li>
<li>Can it refuse jobs outside my service area or below my minimum, politely?</li>
<li>Can I switch plans down for winter without a fee?</li>
<li>Does it work with Jobber or my lawn care software, and how do bookings reach my schedule?</li>
<li>What does a 1,000-minute April cost, in writing?</li>
<li>Can it text the caller a link to send yard photos?</li>
</ol>
<p>Compare with <a href="/guides/answering-service-cost">answering service costs</a> in general and <a href="/guides/ai-receptionist-cost">AI receptionist prices</a> at three volumes. Cleaning companies have a similar recurring-customer model with different calls: see <a href="/guides/cleaning-business-answering-service-cost">answering service costs for cleaners</a>.</p>
<h2>What ours costs and does</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your company's name, takes several calls at once during the spring rush, picks up when you're already on the phone, collects the property details, and books estimates or texts you the summary. Urgent calls go to whoever you choose. We write the script from your service list and area. See <a href="/marketing/landscaping/ai-answering-service">AI answering for landscapers</a>, or call our demo line at {{DEMO}} and ask for a spring cleanup quote.</p>`,
    faq: [
      ["How much does a landscaping answering service cost?", "Live services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. At 300 minutes in a spring month that's about $479 to $810. Self-serve AI tools were $79 to $149 at that volume."],
      ["Do lawn care companies need an answering service?", "Mostly in spring and fall, when estimate requests come in faster than a crew owner can call back. Outside the rush, missed-call text-back may be enough."],
      ["Does Jobber have an answering service for lawn care companies?", "Jobber offers an AI Receptionist, listed at $99 a month as an add-on to Core, Connect or Grow and included in Plus in November 2026. You need a Jobber plan to use it."],
      ["Can an answering service quote mowing prices?", "It can give prices you approve, such as a starting price for a standard lot. Most landscapers have it book an estimate or ask for photos for anything bigger."],
      ["How many minutes does a landscaping company use?", "Landscaping calls average longer than many trades because callers describe the yard. At four minutes a call, 75 spring calls is about 300 minutes."],
      ["What should landscapers do with phones in winter?", "Step down any per-minute plan, or use AI that only bills for what it uses. If you plow, keep answering on during storms with a rule for commercial accounts."],
    ],
  },
  // ------------------------------------------------------------------ CLEANING
  {
    slug: "cleaning-business-answering-service-cost",
    path: "/guides/cleaning-business-answering-service-cost",
    title: "How Much Does an Answering Service for Cleaners Cost? (2026)",
    description: "Answering service costs for house cleaning businesses, checked November 2026: live vs AI prices, why short calls favor per-minute plans, and a client's value.",
    h1: "How much does an answering service cost a cleaning business?",
    lede: "Cleaning calls are mostly quote requests and quick reschedules, made while you're mid-clean with gloves on. Here's what live and AI answering cost for that mix, with prices checked in November 2026.",
    eyebrow: "Cleaning answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Call our demo and ask for a cleaning quote.",
    content: `
<div class="callout"><p><strong>Short version:</strong> live answering services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. A small cleaning business sending about 100 minutes a month would pay roughly $189 to $415 live, or $49 to $99 for a self-serve AI tool. Ours is {{PRICE:ai}}, so {{PRICE:aiAt100}} at that volume. Because many cleaning calls are short reschedules, per-call pricing costs cleaners more than most trades.</p></div>
<h2>What it costs for a cleaning business</h2>
<p>Cleaning calls split in two: one-minute reschedules from regulars and four- or five-minute quote calls from new clients. We assumed an average of about 2.5 minutes, so 100 minutes is about 40 calls (a solo owner or small team) and 300 minutes is about 120 calls (several crews). Prices read on each vendor's pricing page, checked November 2026.</p>
<table>
<thead><tr><th>Option</th><th>100 min (~40 calls)</th><th>300 min (~120 calls)</th></tr></thead>
<tbody>
<tr><td>${PATLIVE()} (live, per minute)</td><td>$189</td><td>$479</td></tr>
<tr><td>${RUBY()} (live, per minute)</td><td>$395</td><td>$720 for 200 minutes plus unlisted overage</td></tr>
<tr><td>${SMITH()} (per call)</td><td>$415 ($300 for 30 calls plus 10 at $11.50)</td><td>$1,125 ($810 for 90 calls plus 30 at $10.50)</td></tr>
<tr><td>${ROSIE()} (self-serve AI)</td><td>$49 (sends a booking link)</td><td>$149 (books into your calendar)</td></tr>
<tr><td>${GOODCALL()} (self-serve AI)</td><td>$79</td><td>$94.80 ($79 plus 20 callers at 79¢), less if regulars call twice</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>$99 plus a Jobber plan</td><td>$99 plus a Jobber plan</td></tr>
<tr><td>TableTurnerr (done for you)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt300}}</td></tr>
</tbody>
</table>
<p>Notice the per-call row. At 120 short calls, Smith.ai costs more than twice PATLive's per-minute plan, because a 45-second "can we move Thursday to Friday?" is billed like a full quote call. If your log is full of quick reschedules, favor per-minute or per-caller pricing. Goodcall counts a repeat caller once, which suits regulars.</p>
<h2>What cleaning calls actually are</h2>
<ul>
<li><strong>Quote requests:</strong> "How much for a three-bed, two-bath?" Most new clients want a number before anything else.</li>
<li><strong>Move-out and deep cleans:</strong> often with a deadline, like a landlord walk-through on Friday.</li>
<li><strong>Reschedules and skips</strong> from recurring clients, frequently on Sunday night or early Monday.</li>
<li><strong>Entry details:</strong> a new gate code, a lockbox, "the dog will be home."</li>
<li><strong>Problems:</strong> a missed spot, a broken item, a cleaner who didn't show.</li>
</ul>
<p>If you're the owner and also clean, these arrive while your hands are wet or you're on a ladder. A call you return two hours later has usually already booked someone else, especially a move-out with a deadline.</p>
<p>The mix also tells you what the answering must do well. Reschedules need access to your calendar or at least a clean message to you, so a regular isn't left wondering whether Friday is confirmed. Quote calls need your price grid and a friendly way to say "we'll need to see it" for anything unusual. A service that can only take a name and number handles neither one well, and that's what many basic message-taking plans do.</p>
<h2>What one recurring client is worth</h2>
<p>${HCP_CLEAN()} (checked November 2026) put a standard cleaning at $140 to $220 a visit, move-in or move-out deep cleans at $220 to $400, and cited Angi's whole-home deep clean average of $260.</p>
<p>A biweekly client is about 26 visits a year. At $140 to $220 a visit, that's $3,640 to $5,720 a year from one phone call. Example only: if you miss 6 quote calls a month and 1 of them would have become a biweekly client, the miss costs thousands over a year, not one cleaning. It's the reason cleaners should answer quote calls first and sort out reschedules second.</p>
<h2>Quoting over the phone: what to allow</h2>
<p>Callers want a price, and an answering service that won't give one loses them. But a wrong price is worse. A workable middle:</p>
<ol>
<li><strong>Give a starting price from your grid</strong> for a standard recurring clean by bedrooms and bathrooms, if you have one and approve the wording.</li>
<li><strong>Book a walk-through or ask for photos</strong> for deep cleans, move-outs, post-construction and anything with pets or heavy buildup.</li>
<li><strong>Offer recurring first.</strong> Explain that weekly or biweekly visits cost less per visit, if that's your pricing.</li>
<li><strong>Collect the basics every time:</strong> address, home size, pets, preferred day, how they found you.</li>
</ol>
<p>One firm rule: don't have any answering service, person or AI, take alarm codes or lockbox codes over the phone. Have it tell the client you'll send a secure way to share entry details, and handle that yourself.</p>
<h2>Urgent calls in a cleaning business</h2>
<p>Cleaning has few true emergencies, but a few calls shouldn't wait until tonight:</p>
<ul>
<li><strong>A cleaner no-show or running very late:</strong> forward to you or your scheduler right away.</li>
<li><strong>Breakage or damage complaints:</strong> take the details calmly, promise a callback, and text you immediately. Don't let the AI apologize for fault or offer refunds.</li>
<li><strong>A crew locked out on site:</strong> forward to the owner or office.</li>
<li><strong>Same-day move-out requests:</strong> forward or flag, because they go to whoever answers first.</li>
</ul>
<p>Everything else, quotes and reschedules included, can be booked or sent to you as a summary after hours.</p>
<h2>Questions to ask vendors</h2>
<ol>
<li>Do reschedule calls count as full calls? Get the answer for per-call plans in writing.</li>
<li>Can it read my bed-and-bath price grid exactly, and refuse to quote deep cleans?</li>
<li>Can it move a recurring client's visit, or only take a message?</li>
<li>Does it handle Spanish-speaking callers, and does that cost more?</li>
<li>Will it ever repeat or store entry codes? The answer should be no.</li>
<li>Does it connect to my booking software, such as Jobber, or only send emails?</li>
</ol>
<p>For the wider picture, read <a href="/guides/answering-service-cost">answering service costs</a> and <a href="/guides/ai-receptionist-cost">AI receptionist costs</a>. Lawn care has a similar recurring model with a sharper spring rush: see <a href="/guides/landscaping-answering-service-cost">landscaping answering costs</a>.</p>
<h2>What ours costs and does</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. It answers in your business name, takes several calls at once, picks up when you're already on the phone or mid-clean, gives the prices you approve, collects home size and pets, and books or texts you the request. No-shows and complaints go to whoever you choose. Calls and summaries land in the CRM we run for you, which connects to Jobber through its official integration. See our <a href="/marketing/cleaning-services">marketing for cleaning businesses</a>, or call our demo line at {{DEMO}} and ask what a three-bedroom clean costs.</p>`,
    faq: [
      ["How much does an answering service for a cleaning business cost?", "Live services we checked in November 2026 cost about $1.40 to $5 a minute, or $7 to $11.50 a call. At 100 minutes a month that's about $189 to $415. Self-serve AI tools were $49 to $99."],
      ["Is per-call pricing a bad fit for cleaners?", "Often, yes. Many cleaning calls are short reschedules, and per-call plans charge the same for those as for a full quote call. Per-minute or per-caller pricing is usually cheaper."],
      ["Can an answering service give cleaning quotes?", "It can give starting prices from a grid you approve, such as by bedrooms and bathrooms. Deep cleans and move-outs are better booked as a walk-through or quoted from photos."],
      ["Should an answering service take alarm or lockbox codes?", "No. Have it tell the client you'll send a secure way to share entry details, and handle codes yourself."],
      ["What is a recurring cleaning client worth?", "Using Housecall Pro's 2026 range of $140 to $220 for a standard clean, a biweekly client is worth about $3,640 to $5,720 a year."],
      ["Do small cleaning businesses need an answering service?", "If you clean jobs yourself and quote calls go to voicemail, yes, or at least missed-call text-back. A move-out caller with a deadline will book whoever answers first."],
    ],
  },
];
