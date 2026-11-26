// Cost and comparison guides (added 2026-11-25): AI receptionist, missed-call text-back, answering services, Google
// Business Profile management and contractor websites. Topics from the ICP search research (price-curious and comparison
// queries). Vendor prices: read on each vendor's own pricing page on 2026-11-25 (Rosie, Goodcall, Smith.ai, Ruby, Jobber,
// PATLive, Twilio, HighLevel's fee article, Whitespark, NiceJob) unless the text says a third party reported them.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} and {{DEMO}} tokens are filled from app/lib/pricing.ts.
// Re-check dated figures when updating.
const DATE = "2026-11-25";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const ROSIE = (t = "Rosie") => A("https://heyrosie.com/pricing", t);
const GOODCALL = (t = "Goodcall") => A("https://www.goodcall.com/pricing.md", t);
const SMITH = (t = "Smith.ai") => A("https://smith.ai/pricing", t);
const RUBY = (t = "Ruby") => A("https://www.ruby.com/pricing/", t);
const JOBBER = (t = "Jobber") => A("https://www.getjobber.com/pricing/", t);
const PATLIVE = (t = "PATLive") => A("https://www.patlive.com/pricing/", t);
const TWILIO = (t = "Twilio's US SMS pricing page") => A("https://www.twilio.com/en-us/sms/pricing/us", t);
const HL_FEES = (t = "HighLevel's A2P fee article") => A("https://help.gohighlevel.com/support/solutions/articles/155000005200", t);
const HL_PRICING = (t = "HighLevel's pricing page") => A("https://www.gohighlevel.com/pricing", t);
const WHITESPARK = (t = "Whitespark") => A("https://whitespark.ca/google-my-business-management-service/", t);
const MERCHYNT = (t = "Merchynt's pricing guide") => A("https://merchynt.com/post/google-my-business-management-pricing", t);
const NICEJOB = (t = "NiceJob") => A("https://get.nicejob.com/pricing", t);
const PCE_PLUMBER = (t = "Project Cost Estimator's plumber website guide") => A("https://projectcostestimator.com/blog/plumber-website-cost-2026", t);
const PCE_HVAC = (t = "its HVAC guide") => A("https://projectcostestimator.com/blog/hvac-company-website-cost-2026", t);
const HOOK = (t = "Hook Agency") => A("https://hookagency.com/blog/digital-marketing-costs-for-home-service-businesses-in-2026/", t);

export const guides7 = [
  {
    slug: "ai-receptionist-cost",
    path: "/guides/ai-receptionist-cost",
    title: "How Much Does an AI Receptionist Cost? (2026)",
    description: "AI receptionist prices for contractors, checked November 2026: per-minute, per-call and flat plans, hidden costs, and the math at 100, 300 and 600 minutes.",
    h1: "How much does an AI receptionist cost a home-service business?",
    lede: "Most small contractors will pay somewhere between about $50 and $300 a month for an AI receptionist. Where you land depends on how prices are counted, how many minutes you use and what the setup includes. Here are real prices, checked on November 25, 2026, and the math at three call volumes.",
    eyebrow: "AI answering costs", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Hear one answer before you price it.",
    content: `
<div class="callout"><p><strong>Short version:</strong> self-serve AI receptionists we checked on November 25, 2026 ran from $49 to $299 a month. Jobber's add-on was $99 a month on top of a Jobber plan. Live human services cost several times more per minute. Your real bill depends on minutes used, whether spam and transfers count, and who does the setup. Count your minutes before you compare plans.</p></div>
<h2>The three ways AI receptionists are priced</h2>
<table>
<tr><th>Price shape</th><th>How it works</th><th>Example (Nov 25, 2026)</th><th>Watch for</th></tr>
<tr><td>Minutes bundle</td><td>A monthly fee includes a block of minutes. Extra minutes cost more.</td><td>${ROSIE()}: $49 for 250 minutes. Ours: {{PRICE:aiShort}}</td><td>The extra-minute price, and what counts as a minute</td></tr>
<tr><td>Per caller or per call</td><td>You pay for each caller or each call, however long it lasts.</td><td>${GOODCALL()}: $79 for 100 unique callers, then 79¢ each. ${SMITH()}: $300 for 30 calls</td><td>Short calls and wrong numbers cost the same as real jobs</td></tr>
<tr><td>Flat or add-on</td><td>One monthly price, often tied to other software.</td><td>${JOBBER()}: Receptionist add-on $99 a month on top of a Jobber plan</td><td>Fair-use limits, and the subscription you must keep</td></tr>
</table>
<h2>Prices we checked</h2>
<p>All read on each vendor's own pricing page on November 25, 2026. Prices change often, so check again before you buy.</p>
<table>
<tr><th>Vendor</th><th>Plans</th><th>Notes</th></tr>
<tr><td>${ROSIE()}</td><td>$49/mo (250 min), $149 (1,000 min), $299 (2,000 min)</td><td>Books directly into your calendar and transfers calls from the $149 plan. The $49 plan texts a booking link. Extra-minute price not shown.</td></tr>
<tr><td>${GOODCALL()}</td><td>$79/mo (100 unique callers), $129 (500), $299 (2,000)</td><td>Minutes aren't metered. Extra callers cost 79¢, 26¢ or 15¢ depending on plan.</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>$99/mo add-on on Core, Connect or Grow. Included in Plus.</td><td>Answers calls and texts and can book jobs in your Jobber calendar. No minute limit shown. Core was $49/mo.</td></tr>
<tr><td>${SMITH()}</td><td>$300/mo (30 calls), $810 (90), $2,100 (300)</td><td>$11.50 to $8.50 per extra call. The page offers AI-first, hybrid and human-first modes but doesn't say which one these prices are for.</td></tr>
<tr><td>TableTurnerr (us)</td><td>{{PRICE:aiShort}}</td><td>Set up and run by us. Books or texts you the job, and forwards urgent calls to you.</td></tr>
<tr><td>${RUBY()} (human, for scale)</td><td>$250/mo (50 min) to $1,725 (500 min)</td><td>Live receptionists. The page says optional AI is included at no extra cost.</td></tr>
</table>
<p>Two you may see mentioned: Housecall Pro doesn't publish a price for its AI answering. ServiceTitan's AI voice agent was reported by ${A("https://www.usecarly.com/blog/servicetitan-ai-voice-agent/", "a third party")} at about $2.75 a call, and it needs a ServiceTitan subscription.</p>
<h2>What one minute really costs</h2>
<p>Divide the monthly price by the minutes you actually use, not the minutes included.</p>
<ul>
<li><strong>Rosie:</strong> $49 for 250 minutes is about 20¢ a minute if you use them all. $149 for 1,000 is about 15¢.</li>
<li><strong>Ruby (human):</strong> $5.00 a minute on the 50-minute plan, about $3.45 on the 500-minute plan.</li>
<li><strong>${PATLIVE()} (human):</strong> about $1.98 a minute on the 50-minute plan, about $1.52 on the 500-minute plan.</li>
<li><strong>Ours:</strong> minutes past the 150 included are {{PRICE:minute}} each.</li>
</ul>
<p>The catch with bundles: a $149 plan with 1,000 minutes, used for 200 minutes, costs about 75¢ a minute. Buy the plan that fits your calls, not the one with the best headline rate.</p>
<h2>Hidden costs to ask about</h2>
<ul>
<li><strong>Setup.</strong> Self-serve tools are cheap because you write the script, the rules and the answers. Budget an afternoon, then time each week to read transcripts and fix answers.</li>
<li><strong>Spam and robocalls.</strong> Ask whether they count as minutes or callers. If they do, your bill rises with junk calls.</li>
<li><strong>Transfers.</strong> Ask whether the meter keeps running while a call is passed to you.</li>
<li><strong>Phone numbers and forwarding.</strong> Some tools give you a new number to forward to. Extra numbers cost money: ${TWILIO("Twilio lists")} $1.15 a month for a local number, and PATLive $5 a month for each extra number.</li>
<li><strong>Texting.</strong> If the receptionist texts callers, the number needs carrier registration. ${HL_FEES("HighLevel lists")} $22.50 one-time for low-volume registration plus a monthly campaign fee. PATLive lists a one-time $50 texting review fee.</li>
<li><strong>Integrations.</strong> Booking into your job software may need a higher plan or a paid connector. Smith.ai charges $0.50 a call for each extra CRM. Goodcall limits outside tools to 1, 5 or 15 by plan.</li>
</ul>
<h2>Worked example: 100, 300 and 600 minutes a month</h2>
<p>We assumed calls average about three minutes, so 100 minutes is about 33 calls, 300 is about 100 and 600 is about 200. Check your own phone log, because call length changes everything. Each cell is the cheapest listed plan that covers it.</p>
<table>
<tr><th>Option</th><th>100 minutes</th><th>300 minutes</th><th>600 minutes</th></tr>
<tr><td>Rosie</td><td>$49</td><td>$149</td><td>$149</td></tr>
<tr><td>Goodcall (fewer if callers repeat)</td><td>$79</td><td>$79</td><td>$129</td></tr>
<tr><td>Jobber Receptionist</td><td>$99 + Jobber plan</td><td>$99 + Jobber plan</td><td>$99 + Jobber plan</td></tr>
<tr><td>Smith.ai</td><td>$334.50</td><td>$915</td><td>$1,965</td></tr>
<tr><td>PATLive (human)</td><td>$189</td><td>$479</td><td>$938</td></tr>
<tr><td>TableTurnerr (Growth package)</td><td>{{PRICE:aiAt100}}</td><td>{{PRICE:aiAt300}}</td><td>{{PRICE:aiAt600}}</td></tr>
</table>
<p>How we got the harder ones: Smith.ai at 33 calls is $300 plus 3 extra calls at $11.50. At 100 calls it's the $810 plan plus 10 calls at $10.50. At 200 calls it's $810 plus 110 calls at $10.50, which is still under the $2,100 plan. PATLive at 600 minutes is the $759 plan plus 100 minutes at $1.79. Goodcall at 200 callers is cheaper on the $129 plan than $79 plus 100 extra callers.</p>
<p>Ours is {{PRICE:ai}}. So 100 minutes fits inside what's included, 300 minutes adds 150 extra minutes and 600 adds 450.</p>
<h2>How to decide</h2>
<ol>
<li><strong>Count your minutes.</strong> Take last month's calls that went unanswered or after hours, and multiply by your average call length.</li>
<li><strong>Decide what it must do.</strong> Take a message, book a visit, or pass emergencies to you. Booking and transfers often sit on higher plans.</li>
<li><strong>Ask the three questions:</strong> what an extra minute costs, whether spam counts, and who writes the script.</li>
<li><strong>Call it like a customer.</strong> Try a booking, a price question and an emergency. You can call our demo line at {{DEMO}} to hear ours.</li>
<li><strong>Compare with one job.</strong> Put your numbers in the <a href="/tools/missed-call-calculator">missed call calculator</a>. If one saved job a month covers the bill, it's worth testing.</li>
</ol>
<p>On a tight budget, start with <a href="/guides/missed-call-text-back-cost">missed-call text-back</a> and add voice later. For how the options differ, read <a href="/guides/missed-call-text-back-vs-ai-receptionist">text-back vs AI receptionist vs answering service</a>, <a href="/guides/ai-receptionist-for-contractors">what an AI receptionist gets wrong</a> and our <a href="/guides/best-ai-receptionist-for-contractors">comparison of six options</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}. We write the script, connect it to your existing number and set the emergency rules, so you don't build it yourself. That's why it costs more than a self-serve tool. See every plan on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does an AI receptionist cost per month?", "Self-serve plans we checked on November 25, 2026 ran from $49 to $299 a month. Jobber's add-on was $99 a month plus a Jobber plan. Done-for-you setups cost more because someone else builds and runs it."],
      ["Do AI receptionists charge per minute?", "Many do, through a monthly bundle of minutes with a price for each extra one. Others charge per caller, per call, or a flat fee. Divide the price by the minutes you actually use to compare."],
      ["Is an AI receptionist cheaper than an answering service?", "Usually, by a lot. The live services we checked worked out to about $1.40 to $5 a minute, or $7 to $11.50 a call. Self-serve AI plans were around 15 to 20 cents a minute when fully used."],
      ["Do spam calls count toward AI receptionist minutes?", "It depends on the vendor, and most pricing pages don't say. Ask before you buy, because robocalls can eat a small bundle."],
      ["How many minutes does a small contractor need?", "Multiply the calls it will take by the average call length. Five calls a day at three minutes is about 450 minutes a month."],
      ["Is there a free AI receptionist?", "Some offer free trials. Rosie listed a 7-day trial in November 2026. A free trial is a good time to call it yourself with real questions."],
    ],
  },
  {
    slug: "missed-call-text-back-cost",
    path: "/guides/missed-call-text-back-cost",
    title: "Missed-Call Text-Back Cost: DIY vs Software (2026)",
    description: "What missed-call text-back costs a contractor: DIY, software or done-for-you, plus A2P 10DLC registration and carrier fees, checked November 2026.",
    h1: "What does missed-call text-back cost?",
    lede: "The software is cheap. The bill also includes a phone number, texting registration and a fraction of a cent per text, plus the time it takes to set up properly. Here's each piece, with prices checked on November 25, 2026.",
    eyebrow: "Missed-call costs", readMinutes: 5, article: { date: DATE },
    ctaTitle: "We set it up and register it for you.",
    content: `
<div class="callout"><p><strong>Short version:</strong> standalone text-back apps are listed at about $17 to $79 a month. All-in-one CRMs that include it start higher. On top of that, texting from software needs A2P 10DLC registration, which ${HL_FEES("one platform")} listed at $22.50 one-time plus $1.50 to $10 a month for a small business. Each text adds well under a cent in carrier fees. Done-for-you costs more because setup and registration are handled.</p></div>
<h2>What you're paying for</h2>
<ul>
<li><strong>The software</strong> that notices a missed call and sends the text.</li>
<li><strong>A phone number</strong> it can text from, usually your business line or a number you forward to.</li>
<li><strong>Registration</strong> with US carriers, so your texts aren't blocked.</li>
<li><strong>Per-text fees</strong> from the software and the carriers.</li>
<li><strong>Setup time:</strong> the message, business hours, who it shouldn't text, and where replies go.</li>
</ul>
<h2>Three ways to get it</h2>
<table>
<tr><th></th><th>DIY</th><th>Software</th><th>Done for you</th></tr>
<tr><td>What it is</td><td>A feature in your phone system, or a CRM you configure yourself</td><td>A text-back app or CRM plan you set up</td><td>Someone sets it up, registers it and keeps it running</td></tr>
<tr><td>Price examples (Nov 25, 2026)</td><td>Free if your phone system already has it, plus usage</td><td>Standalone apps about $17 to $79/mo. ${HL_PRICING("HighLevel")} includes it from $97/mo, plus usage</td><td>Onvert about $297/mo all-in, per its own article. Ours: see below</td></tr>
<tr><td>Registration</td><td>You file it</td><td>You file it, usually inside the app</td><td>Filed for you</td></tr>
<tr><td>Your time</td><td>Most</td><td>A few hours to start</td><td>Least</td></tr>
</table>
<p>Standalone app prices come from third-party listings: ${A("https://mcpservers.org/servers/ringback-0xpi-com", "Ringback")} at about $17 a month and ${A("https://www.getapp.com/all-software/a/beepback/", "BeepBack")} at about $79. The Onvert figure is from ${A("https://onvert.com/best-missed-call-text-back-for-contractors", "Onvert's own article")}. HighLevel's price was read on its pricing page.</p>
<h2>A2P 10DLC registration fees</h2>
<p>If you text customers from a normal 10-digit number through software, carriers want the business registered. The fees are set by the registry and carriers and passed on by your software. Here's what ${HL_FEES()} listed on November 25, 2026:</p>
<table>
<tr><th>Fee</th><th>Amount</th></tr>
<tr><td>One-time registration, sole proprietor or low-volume standard</td><td>$22.50</td></tr>
<tr><td>One-time registration, high-volume standard</td><td>$64.00</td></tr>
<tr><td>Each extra campaign under the same brand</td><td>$15.00</td></tr>
<tr><td>Monthly, sole proprietor campaign</td><td>$2.00</td></tr>
<tr><td>Monthly, low-volume mixed campaign</td><td>$1.50</td></tr>
<tr><td>Monthly, standard campaign</td><td>$10.00</td></tr>
</table>
<p>Fees are charged even if an application is rejected, so get the details right the first time. Our <a href="/guides/a2p-10dlc-for-contractors">A2P 10DLC guide</a> covers what to have ready.</p>
<h2>Carrier fees per text</h2>
<p>Carriers add a small fee to every text segment. ${TWILIO()} listed these per outbound text on November 25, 2026: AT&amp;T $0.0035, T-Mobile $0.0045, Verizon $0.005, US Cellular $0.005, others $0.0042. Twilio's own charge was $0.0083 per segment, and a local number was $1.15 a month. Other platforms resell these with their own markup.</p>
<p>A segment is about 160 plain characters. Longer texts, emojis and pictures can cost more, so keep the first text short.</p>
<h2>Worked example</h2>
<p>Say you miss 60 calls a month and each one leads to three texts. That's 180 segments. At Twilio's list rates, about 1.3¢ each with carrier fees, that's about $2.40 a month. Add $1.15 for the number and $1.50 to $10 for the campaign. Usage comes to under $15 a month, plus $22.50 once. The software subscription or service fee is the big number, not the texts.</p>
<h2>Why setup matters more than price</h2>
<ul>
<li>Calls must reach the system before your cell voicemail does, or nothing is sent.</li>
<li>Without rules, suppliers, family and spam callers get the text too.</li>
<li>Replies need to land on your phone, or the conversation dies.</li>
<li>Opt-outs such as STOP must be honored right away.</li>
<li>A short delay and a plain message feel less robotic. Copy one from our <a href="/tools/missed-call-text-templates">missed-call text templates</a>.</li>
</ul>
<h2>Is it worth it?</h2>
<p>If one saved job a month pays for it, yes. Put your missed calls into the <a href="/tools/missed-call-calculator">missed call calculator</a> to see. Text-back only starts the conversation, though. It won't take job details from people who won't text, which is where an <a href="/guides/ai-receptionist-cost">AI receptionist</a> comes in.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/missed-call-text-back">missed-call text-back</a> is {{PRICE:textback}}. We write the messages, connect your existing number and handle the carrier registration. See all plans on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does missed call text back cost?", "Standalone apps were listed at about $17 to $79 a month in November 2026. Add texting registration, about $22.50 once plus a monthly campaign fee, and a fraction of a cent per text."],
      ["Is there a free missed call text back app?", "Some business phone systems include it. You still pay for texts and registration if it sends from software, and you still have to set it up."],
      ["What is the A2P 10DLC registration fee?", "One platform's fee article listed $22.50 one-time for sole-proprietor and low-volume registration in November 2026, plus a monthly campaign fee of $1.50 to $10 for most small businesses."],
      ["Do I pay per text for missed call text back?", "Usually, yes. Carriers add about a third to half a cent per text segment, and the software adds its own charge. For a small shop it's a few dollars a month."],
      ["Is missed call text back worth it for contractors?", "If it saves one job a month, it pays for itself many times over. It works best for people who miss calls while on a job."],
    ],
  },
  {
    slug: "best-ai-receptionist-for-contractors",
    path: "/guides/best-ai-receptionist-for-contractors",
    title: "Best AI Receptionist for Contractors: 6 Compared (2026)",
    description: "Rosie, Goodcall, Smith.ai, Ruby, Jobber Receptionist and TableTurnerr compared for contractors: price, minutes, booking, human backup and Jobber support.",
    h1: "Best AI receptionist for contractors: six options compared",
    lede: "Six ways to get your phone answered, from a $49 self-serve tool to a staffed service. We read each pricing page on November 25, 2026 and put the facts side by side. We sell one of them, so we've marked where that matters.",
    eyebrow: "AI answering compared", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Call our demo, then decide.",
    content: `
<div class="callout"><p><strong>Short version:</strong> for the lowest price and doing it yourself, look at Rosie or Goodcall. If you run on Jobber and want bookings in your Jobber calendar, try Jobber's Receptionist. If you want people on the line, Smith.ai and Ruby are staffed services and cost much more. If you want it set up and run for you along with text-back and follow-up, that's what we do. <strong>Our bias:</strong> TableTurnerr is on this list, and we earn money when you pick us.</p></div>
<h2>Side by side</h2>
<p>From each vendor's own pricing page, read on November 25, 2026. "Not listed" means the pricing page didn't say, not that the feature is missing. Ask them.</p>
<table>
<tr><th></th><th>Price</th><th>Minutes</th><th>Books jobs?</th><th>Human backup?</th><th>Jobber or Housecall Pro?</th></tr>
<tr><td>${ROSIE()}</td><td>$49 to $299/mo</td><td>250 to 2,000 a month</td><td>Into your calendar from $149. The $49 plan texts a link.</td><td>Transfers to your team from $149</td><td>Not listed. Zapier connection.</td></tr>
<tr><td>${GOODCALL()}</td><td>$79 to $299/mo</td><td>Not metered. Priced by unique callers (100 to 2,000).</td><td>Not listed. Connects to outside tools by API.</td><td>Transfers mentioned, details not listed</td><td>Not listed</td></tr>
<tr><td>${SMITH()}</td><td>$300 to $2,100/mo</td><td>Priced per call (30 to 300)</td><td>Yes, through Calendly, Acuity and similar</td><td>Yes. Plans described as live-staffed 24/7.</td><td>Not listed. HubSpot, Salesforce, Clio, Zapier named.</td></tr>
<tr><td>${RUBY()}</td><td>$250 to $1,725/mo</td><td>50 to 500 a month</td><td>Not listed on pricing page</td><td>Yes. It's a human service, with optional AI.</td><td>Not listed</td></tr>
<tr><td>${JOBBER("Jobber Receptionist")}</td><td>$99/mo add-on plus a Jobber plan</td><td>No limit shown</td><td>Yes, into your Jobber calendar</td><td>Not listed</td><td>Built into Jobber. Not for Housecall Pro.</td></tr>
<tr><td>TableTurnerr (us)</td><td>{{PRICE:aiShort}}</td><td>150 included</td><td>Yes, or texts you the job details</td><td>Urgent calls forwarded to you or your on-call tech. No staffed answering.</td><td>Yes, on plans that include our CRM</td></tr>
</table>
<h2>Who each one fits</h2>
<h3>Rosie</h3>
<p>Good for a solo owner or small shop that wants a low price and doesn't mind setting it up. Plan on the $149 plan if you want it to book and transfer, since the $49 plan sends a booking link instead. The page didn't show the price of extra minutes.</p>
<h3>Goodcall</h3>
<p>Interesting if your calls run long, because you pay per caller and minutes aren't counted. Repeat callers count once. It's built for people who will connect their own tools, and the pricing page doesn't mention Jobber or Housecall Pro.</p>
<h3>Smith.ai</h3>
<p>For owners who want trained people available and will pay per call for it. At $7 to $11.50 a call, it suits fewer, higher-value calls such as remodels or commercial work. Its page offers AI-first, hybrid and human-first modes, but doesn't say which mode the listed prices are for.</p>
<h3>Ruby</h3>
<p>The most expensive per minute here, from $3.45 to $5.00. You're paying for live receptionists who sound like your front desk. Fits businesses where every caller is a big ticket and a person matters more than price.</p>
<h3>Jobber Receptionist</h3>
<p>The easy choice if you already run on Jobber, because it can book straight into your Jobber calendar. Owner opinions are mixed: on Jobber's community forum, ${A("https://community.getjobber.com/discussions/operations-forum/i-love-the-ai-receptionist-even-though-it-isnt-quite-what-i-really-need-yet-/7720", "one owner calls it far better than voicemail")}, while ${A("https://community.getjobber.com/discussions/operations-forum/ai-receptionist-vs-outsourced-vs-owners/7842", "another found it average")}. You need a Jobber plan, and Core was $49 a month.</p>
<h3>TableTurnerr</h3>
<p>For owners who don't want to build or babysit a phone system. Ours is {{PRICE:ai}}. We write the script, set the emergency rules and connect it to your existing number. On plans that include our CRM, leads also get follow-up, text-back and review requests, and the CRM connects to <a href="/integrations/jobber">Jobber</a> and <a href="/integrations/housecall-pro">Housecall Pro</a>. It costs more than a self-serve tool, and there's no staffed person behind it: urgent calls come to you. Call our demo line at {{DEMO}} to hear it.</p>
<h2>Not on the list</h2>
<p>Housecall Pro sells AI call answering but doesn't publish the price. ServiceTitan's AI voice agent was reported by ${A("https://www.usecarly.com/blog/servicetitan-ai-voice-agent/", "a third party")} at about $2.75 a call, for ServiceTitan customers. If you use either, ask them before adding another tool.</p>
<h2>How to test any of them</h2>
<ol>
<li>Call it five times: a booking, a price question, an emergency, a wrong number and an upset customer.</li>
<li>Check where the details land. A message you have to copy by hand will get lost.</li>
<li>Ask what an extra minute or call costs, and whether spam counts.</li>
<li>Read the transcripts every week for the first month.</li>
</ol>
<p>For the full price math at 100, 300 and 600 minutes, read <a href="/guides/ai-receptionist-cost">how much an AI receptionist costs</a>. To weigh it against people, see <a href="/guides/answering-service-cost">answering service costs</a>. More on our setup: <a href="/services/ai-answering-service">AI answering service</a>.</p>`,
    faq: [
      ["What is the best AI receptionist for contractors?", "It depends on what you need. Rosie and Goodcall are cheapest if you set them up yourself. Jobber Receptionist fits Jobber users. Smith.ai and Ruby add people. Done-for-you services cost more and handle setup."],
      ["Does Jobber have an AI receptionist?", "Yes. In November 2026 Jobber listed its Receptionist as a $99 a month add-on for Core, Connect and Grow, included in Plus. It can book jobs in your Jobber calendar."],
      ["Which AI receptionist works with Housecall Pro?", "Housecall Pro sells its own AI answering but doesn't publish the price. Rosie, Goodcall, Smith.ai and Ruby didn't list Housecall Pro on their pricing pages, so ask them directly."],
      ["Is Smith.ai AI or human?", "Both. Its pricing page offers AI-first, hybrid and human-first modes and describes plans as live-staffed. The listed per-call prices don't say which mode they cover."],
      ["Is Rosie good for contractors?", "It's low-cost and built for small service businesses. Direct booking and call transfers start on the $149 plan, and the pricing page didn't list Jobber or Housecall Pro."],
    ],
  },
  {
    slug: "answering-service-cost",
    path: "/guides/answering-service-cost",
    title: "How Much Does an Answering Service Cost? (2026)",
    description: "Live answering service prices for contractors, checked November 2026: per-minute and per-call plans, real cost per minute, hidden fees and how AI compares.",
    h1: "How much does an answering service cost a contractor?",
    lede: "A live answering service puts a person on your calls. That's worth a lot on some calls and costs a lot on all of them. Here are real plans, checked on November 25, 2026, what a minute really costs, and when AI makes more sense.",
    eyebrow: "Answering service costs", readMinutes: 5, article: { date: DATE },
    ctaTitle: "Compare a person with our AI on one call.",
    content: `
<div class="callout"><p><strong>Short version:</strong> the live answering services we checked cost about $1.40 to $5 a minute, or $7 to $11.50 a call. A small contractor using 200 minutes a month would pay about $349 to $726. Self-serve AI plans worked out to about 15 to 20 cents a minute when fully used. Use people for emergencies and big-ticket calls, and AI or text-back for the rest.</p></div>
<h2>Prices we checked</h2>
<p>All from each company's own pricing page on November 25, 2026.</p>
<table>
<tr><th>Service</th><th>Plans</th><th>Extra</th><th>Notes</th></tr>
<tr><td>${PATLIVE()}</td><td>$49 pay-as-you-go, $99 (50 min), $189 (100), $349 (200), $479 (300), $759 (500), $1,499 (1,000)</td><td>$2.99 to $1.69 a minute, lower on bigger plans</td><td>Prices exclude taxes and government fees. $50 one-time texting review fee.</td></tr>
<tr><td>${RUBY()}</td><td>$250 (50 min), $395 (100), $720 (200), $1,725 (500)</td><td>Not listed</td><td>No setup fees, per the page. Optional AI at no extra cost.</td></tr>
<tr><td>${SMITH()}</td><td>$300 (30 calls), $810 (90), $2,100 (300)</td><td>$11.50 to $8.50 a call</td><td>Per call, not per minute. AI-first, hybrid and human-first modes offered.</td></tr>
</table>
<p>AnswerConnect only gives prices through a quote form, so it isn't in the table.</p>
<h2>What a minute really costs</h2>
<table>
<tr><th>Plan</th><th>Cost per included minute or call</th></tr>
<tr><td>PATLive 50 minutes</td><td>About $1.98 a minute</td></tr>
<tr><td>PATLive 500 minutes</td><td>About $1.52 a minute</td></tr>
<tr><td>PATLive 5,000 minutes ($6,899)</td><td>About $1.38 a minute</td></tr>
<tr><td>Ruby 50 minutes</td><td>$5.00 a minute</td></tr>
<tr><td>Ruby 500 minutes</td><td>About $3.45 a minute</td></tr>
<tr><td>Smith.ai 30 calls</td><td>$10 a call</td></tr>
<tr><td>Smith.ai 300 calls</td><td>$7 a call</td></tr>
<tr><td>${ROSIE("Rosie")} (AI), 1,000 minutes for $149</td><td>About 15¢ a minute</td></tr>
<tr><td>Our AI, past the 150 included</td><td>{{PRICE:minute}} a minute</td></tr>
</table>
<p>These rates assume you use every minute you pay for. Use half and the real rate doubles.</p>
<h2>Example: 200 minutes a month</h2>
<p>About 67 calls at three minutes each. Check your own call lengths first.</p>
<ul>
<li><strong>PATLive:</strong> $349 on the 200-minute plan.</li>
<li><strong>Smith.ai:</strong> about $726, the $300 plan plus 37 extra calls at $11.50.</li>
<li><strong>Ruby:</strong> $720 on the 200-minute plan.</li>
<li><strong>Rosie (AI):</strong> $49 for up to 250 minutes, or $149 if you want direct booking and transfers.</li>
<li><strong>Our AI:</strong> {{PRICE:aiShort}}, so 200 minutes means 50 extra minutes.</li>
</ul>
<h2>What pushes the bill up</h2>
<ul>
<li><strong>Rounding.</strong> Ask whether calls are billed by the second or rounded up.</li>
<li><strong>What counts.</strong> Ask about spam, wrong numbers, hold time and transfers.</li>
<li><strong>Overage.</strong> A busy storm week can cost more than the plan.</li>
<li><strong>Taxes and fees.</strong> PATLive's page says prices exclude them.</li>
<li><strong>Extras.</strong> Extra numbers, texting, bilingual answering and extra integrations are often separate. PATLive lists $5 a month per extra number, and Smith.ai $0.50 a call per extra CRM.</li>
<li><strong>Scripts that go stale.</strong> If the service books the wrong job or quotes old prices, the cost is a lost customer.</li>
</ul>
<h2>Person or AI?</h2>
<table>
<tr><th>Call type</th><th>Better fit</th></tr>
<tr><td>Flooding, no heat, gas smell, insurance claims</td><td>A person: you, your on-call tech or a live service</td></tr>
<tr><td>Upset or confused callers</td><td>A person</td></tr>
<tr><td>Routine booking, hours, service area</td><td>AI</td></tr>
<tr><td>Nights, weekends and overflow</td><td>AI, with a transfer for emergencies</td></tr>
<tr><td>Calls you miss on the job</td><td><a href="/guides/missed-call-text-back-cost">Text-back</a> or AI</td></tr>
</table>
<p>Many shops mix them: AI answers first and passes real emergencies to a person. See <a href="/guides/missed-call-text-back-vs-ai-receptionist">text-back vs AI vs answering service</a> and <a href="/guides/best-ai-receptionist-for-contractors">six AI options compared</a>.</p>
<h2>Our option</h2>
<p>We don't run a staffed answering service. Our <a href="/services/ai-answering-service">AI answering service</a> is {{PRICE:ai}}, and urgent calls go straight to you or your on-call tech. Call our demo line at {{DEMO}} and judge it against a person yourself. Plans are on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does an answering service cost per month?", "Live plans we checked in November 2026 started at $99 for 50 minutes and ran to $1,725 for 500 minutes, or $300 for 30 calls. Pay-as-you-go started at $49 a month plus $2.99 a minute."],
      ["How much does an answering service cost per minute?", "About $1.40 to $5 a minute on the live plans we checked, depending on the provider and plan size. Per-call services worked out to $7 to $11.50 a call."],
      ["Is an AI answering service cheaper than a live one?", "Yes, usually by many times. Self-serve AI plans were around 15 to 20 cents a minute when fully used. A person is still better for emergencies and upset callers."],
      ["What's the cheapest answering service for a small business?", "For very few calls, a pay-as-you-go live plan or a low-cost AI plan. Compare by the minutes you actually use, not the plan headline."],
      ["Do answering services charge for spam calls?", "Policies differ, and the pricing pages we read didn't all say. Ask before you sign, along with how they round call time."],
    ],
  },
  {
    slug: "google-business-profile-management-cost",
    path: "/guides/google-business-profile-management-cost",
    title: "Google Business Profile Management Cost (2026)",
    description: "What Google Business Profile management costs a contractor, what you should get each month, red flags to avoid, and when doing it yourself makes sense.",
    h1: "What does Google Business Profile management cost?",
    lede: "The profile itself is free. Keeping it complete, active and accurate is the part people pay for. Here's what that typically costs, what the money should buy, and how to tell real work from a monthly report.",
    eyebrow: "Google Maps costs", readMinutes: 5, article: { date: DATE },
    ctaTitle: "See what your profile is missing.",
    content: `
<div class="callout"><p><strong>Short version:</strong> most providers charge about $125 to $500 a month per profile, and some add a $300 to $500 setup fee. Software that automates posts costs less. Doing it yourself is free but takes a few hours a month. Whatever you pay, you should get regular photos and posts, review replies, accurate services and categories, and a report on calls, not just views.</p></div>
<h2>What it costs</h2>
<table>
<tr><th>Option</th><th>Typical price</th><th>What you get</th></tr>
<tr><td>Do it yourself</td><td>Free</td><td>Your time. ${MERCHYNT()} estimates 5 to 10 hours a month per profile.</td></tr>
<tr><td>Automation software</td><td>About $99/mo (Merchynt's Paige)</td><td>Scheduled posts and suggestions. You still handle photos, replies and problems.</td></tr>
<tr><td>Freelancer or agency</td><td>About $125 to $400/mo, often with a $300 to $500 setup fee</td><td>Varies widely. Get the list of monthly tasks in writing.</td></tr>
<tr><td>Specialist agency</td><td>${WHITESPARK()}: $499/mo, no setup fee, no contract</td><td>Optimization, weekly posts, review strategy, competitor checks, spam fighting, monthly reports</td></tr>
<tr><td>Full local SEO retainer</td><td>About $1,000 to $3,500/mo for SEO at home-service agencies, per ${HOOK()}</td><td>Profile work plus website pages, content and links</td></tr>
</table>
<p>Whitespark's price was read on its own page on November 25, 2026. Merchynt's ranges come from its guide, which is dated 2024 but describes 2026 rates. Hook Agency's are from its 2026 cost article.</p>
<h2>What you should get each month</h2>
<ul>
<li><strong>Categories checked.</strong> The right primary category for your trade, and secondary ones that fit.</li>
<li><strong>Every service listed</strong> with a plain description.</li>
<li><strong>Real job photos</strong> added regularly.</li>
<li><strong>Posts</strong> about recent jobs, seasonal work and offers, weekly or close to it.</li>
<li><strong>Every review answered</strong> within a day or two, including bad ones.</li>
<li><strong>Hours, service area and Q&amp;A kept accurate,</strong> including holidays.</li>
<li><strong>Edits watched.</strong> Google and the public can suggest changes to your profile. Someone should catch wrong ones.</li>
<li><strong>A report that shows calls, website clicks and direction requests,</strong> plus where you rank across your service area.</li>
</ul>
<h2>Red flags</h2>
<ul>
<li>Stuffing keywords or town names into your business name. It breaks Google's rules and can get the profile <a href="/guides/google-business-profile-suspended">suspended</a>.</li>
<li>Fake addresses or virtual offices to rank in other towns.</li>
<li>Buying reviews, or asking only happy customers.</li>
<li>The agency owns your profile. You should be the owner, with them added as a manager.</li>
<li>Long contracts with no list of monthly work.</li>
<li>Reports that only show views and "impressions", never calls.</li>
</ul>
<h2>Is it worth paying for?</h2>
<p>Your profile is often the first thing a homeowner sees, so a neglected one costs calls. If you have a few hours a month and the discipline to post and reply, do it yourself with our <a href="/guides/how-to-rank-higher-on-google-maps">Google Maps ranking guide</a>. If it keeps slipping down the list, pay someone, but only for a clear list of work.</p>
<p>If you're also comparing bigger SEO packages, read <a href="/blog/contractor-seo-cost">what contractor SEO costs</a>. Service-area businesses should also read <a href="/guides/google-business-profile-service-area">how to set your service area</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/google-business-profile">Google Business Profile management</a> is {{PRICE:gbp}}. It covers weekly posts, photos, services, Q&amp;A and review replies. You stay the owner of your profile. See every plan on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does Google Business Profile management cost?", "Most providers charge about $125 to $500 a month per profile, sometimes with a $300 to $500 setup fee. Automation software is cheaper, and doing it yourself is free."],
      ["Is Google Business Profile free?", "Yes. Google doesn't charge for the profile. You pay only if you hire someone to manage it or buy software to help."],
      ["Can I manage my Google Business Profile myself?", "Yes. Plan on a few hours a month for photos, posts, review replies and checking your details. Consistency matters more than any trick."],
      ["What should a Google Business Profile manager do each month?", "Add photos and posts, answer every review, keep services, hours and service area accurate, catch unwanted edits, and report calls and rankings."],
      ["Is Google Business Profile management worth it?", "If your profile is neglected and you don't have the time, usually yes. Pay for a written list of monthly work, not for reports alone."],
    ],
  },
  {
    slug: "contractor-website-cost",
    path: "/guides/contractor-website-cost",
    title: "How Much Does a Contractor Website Cost? (2026)",
    description: "What a contractor website costs in 2026: DIY, one-time builds and monthly plans compared, what drives the price, and the costly mistakes to avoid.",
    h1: "How much does a contractor website cost?",
    lede: "You can pay $10 a month or several thousand dollars up front. The right number depends on how many services and towns you cover, who writes it and who keeps it updated. Here's what drives the price and what to avoid.",
    eyebrow: "Website costs", readMinutes: 5, article: { date: DATE },
    ctaTitle: "Want a site that makes the phone ring?",
    content: `
<div class="callout"><p><strong>Short version:</strong> DIY builders cost about $9 to $20 a month plus your time. A freelancer or agency build for a plumbing or HVAC company typically runs about $1,800 to $6,500 up front, plus $30 to $180 a month for hosting and tools. Monthly website plans skip the big up-front bill. Whatever you choose, own your domain and get a page for each service you want calls for.</p></div>
<h2>One-time build or monthly plan?</h2>
<table>
<tr><th>Option</th><th>Typical price</th><th>Good for</th><th>Watch for</th></tr>
<tr><td>DIY builder</td><td>About $9 to $20/mo</td><td>A new business with time and a tight budget</td><td>Your evenings, thin pages, no one to fix it</td></tr>
<tr><td>Freelancer build</td><td>Most plumber sites about $1,800 to $4,500 one-time</td><td>A clear scope and someone you trust</td><td>Who hosts and updates it later</td></tr>
<tr><td>Agency build</td><td>Most HVAC sites about $3,500 to $6,500. Agencies run about 2 to 2.5 times freelancers.</td><td>Bigger companies, many services and towns</td><td>Contracts and who owns the site</td></tr>
<tr><td>Monthly website plan</td><td>${NICEJOB()} Sites: $99/mo plus $199 setup</td><td>Owners who want updates handled and no big bill</td><td>What happens to the site if you cancel</td></tr>
<tr><td>Hosting and tools on any build</td><td>About $30 to $180/mo</td><td>Everyone</td><td>Paying for plugins you don't use</td></tr>
</table>
<p>Sources: ${PCE_PLUMBER()} ($800 to $8,000+ overall, most $1,800 to $4,500) and ${PCE_HVAC()} ($1,800 to $14,000 overall, most $3,500 to $6,500). ${HOOK()} puts a basic template site through an agency at $3,000 to $5,000. DIY builder prices are from ${A("https://mightysites.com/articles/website-builders-hvac-contractors-2026", "Mighty Sites")}. NiceJob's price was read on its own page. All seen on November 25, 2026.</p>
<h2>What drives the price</h2>
<ul>
<li><strong>Number of pages.</strong> A page per service, and pages for the towns you serve, add up fast.</li>
<li><strong>Who writes it.</strong> Good copy about your work takes interviews and time. Templates are cheaper and sound like everyone else.</li>
<li><strong>Photos.</strong> Real job photos beat stock, but someone has to collect and prepare them.</li>
<li><strong>Custom design</strong> versus a template.</li>
<li><strong>Forms, booking and tracking</strong> that connect to your CRM or job software.</li>
<li><strong>Moving an old site.</strong> Redirecting old pages so you keep your rankings is extra work, and skipping it is expensive.</li>
</ul>
<h2>What a contractor site needs</h2>
<ul>
<li>Your phone number and a call button at the top, on a phone screen.</li>
<li>A page for each service you want calls for.</li>
<li>Your service area, stated plainly.</li>
<li>Real reviews and job photos.</li>
<li>A short quote form.</li>
<li>Fast loading on a weak signal.</li>
<li>Your name, phone and service area matching your Google Business Profile.</li>
</ul>
<h2>What to avoid</h2>
<ul>
<li><strong>Not owning your domain.</strong> Register it in your name. If a vendor owns it, you can lose your rankings when you leave.</li>
<li><strong>A site you can't take with you.</strong> Ask what you keep if you cancel: the domain, the content, the design.</li>
<li><strong>"SEO included"</strong> with no list of what that means.</li>
<li><strong>A redesign without redirects.</strong> It can wipe out years of rankings.</li>
<li><strong>Stock photos</strong> of smiling workers who aren't yours.</li>
<li><strong>Long contracts</strong> for a template site.</li>
</ul>
<h2>Do you need one if you have a Google Business Profile?</h2>
<p>It helps. Your profile gets most map calls, but many homeowners check the website before calling. AI search also leans on business websites: a ${A("https://www.brightlocal.com/research/local-ai-visibility-study/", "2026 BrightLocal study")} found business websites were 42% of the sources cited in local AI answers it tracked. Read more in <a href="/guides/how-to-get-recommended-by-chatgpt">how to get recommended by ChatGPT</a>.</p>
<h2>What ours costs</h2>
<p>Our <a href="/services/contractor-websites">contractor websites</a> are {{PRICE:website}}. The site is on your own domain, and if you leave, the site and domain stay yours. Pair it with <a href="/services/google-business-profile">Google Business Profile management</a> so the two match. All plans are on the <a href="/pricing">pricing page</a>.</p>`,
    faq: [
      ["How much does a contractor website cost?", "DIY builders cost about $9 to $20 a month. One estimator puts most plumber sites at $1,800 to $4,500 and most HVAC sites at $3,500 to $6,500 to build, plus $30 to $180 a month for hosting and tools."],
      ["Is it better to pay monthly or one-time for a website?", "One-time costs less over many years if you can update it yourself. Monthly suits owners who want edits and hosting handled. Either way, make sure you own the domain."],
      ["How much does website hosting cost for a contractor?", "Hosting and tools usually add about $30 to $180 a month, depending on what's included. Some monthly plans bundle hosting and edits."],
      ["Can I build my own contractor website?", "Yes, with a builder for about $9 to $20 a month. Plan on several evenings, and write a page for each service you want calls for."],
      ["Do I need a website if I have a Google Business Profile?", "It helps. Many homeowners check your site before calling, and AI search tools often cite business websites."],
    ],
  },
];
