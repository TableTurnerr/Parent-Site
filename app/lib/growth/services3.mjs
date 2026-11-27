// AI answering service page (added 2026-11-25). Same shape as services.mjs.
// Rules for this file: never type a TableTurnerr price. Use {{PRICE:<key>}} tokens (app/lib/pricing.ts fills them in),
// and {{DEMO}} where the demo line number belongs. Competitor prices only with the month they were checked; the ones
// below were read on each vendor's own pricing page in November 2026 (see guides5 and the ICP research notes).
// Integrations (owner-confirmed): Jobber official; Housecall Pro on its plan that allows integrations; anything else via Zapier or Make. Don't promise that a booking
// lands directly in a job-software schedule; that depends on the client's setup.
export const services3 = [
  {
    slug: 'ai-answering-service', short: 'AI answering service',
    path: '/services/ai-answering-service',
    title: 'AI Answering Service for Contractors | TableTurnerr',
    description: `A 24/7 AI answering service for home-service businesses: answers in your name, takes job details, books or texts you, and forwards emergencies.`,
    eyebrow: 'AI answering, 24/7',
    h1: 'An AI answering service that picks up every call, in your name',
    lede: `When you're on a job, driving or asleep, the assistant answers. It asks what's wrong and where, answers the simple questions, and books the visit or texts you the details. True emergencies go straight to whoever's on call. Call our demo line at {{DEMO}} and ask it anything.`,
    includedIntro: `Set up and tuned by us. You answer a few questions about your business and approve what it says.`,
    included: [
      ['Answers 24/7 in your business name', `Nights, weekends, holidays, and the daytime calls you can't get to. Every call starts with your business name.`],
      ['Takes the job details', `Name, address, callback number, what's wrong and how urgent it is, asked the way your dispatcher would.`],
      ['Answers common questions', `Hours, the towns you serve, the services you do and don't offer, and anything else you give us an answer for.`],
      ['Books or texts you', `It books into your calendar, or texts you a short summary so you can call back. You choose which calls get which.`],
      ['Emergencies go to a person', `You decide what counts (no heat in a freeze, active flooding, a door stuck open at night) and those calls are forwarded to your on-call person.`],
      ['Everything in the app', `Call log, transcripts and summaries in an app on your phone and in your CRM, so nobody copies notes off a voicemail.`],
    ],
    steps: [
      ['Set up', `We learn your services, area, hours and emergency rules, write the script and connect your existing number with call forwarding. It usually takes a few days.`],
      ['Test', `We call it like your customers would: a booking, a price question, an emergency, an upset caller. We fix what sounds off, then you call it too.`],
      ['Tune', `We read the transcripts in the first weeks and adjust answers and rules as real calls come in.`],
    ],
    deepDive: `
<h2>What callers hear</h2>
<p>A friendly voice answers with your business name and says it's an assistant. Then it asks what a good dispatcher would: name, address, best number, what's going on and how urgent it is. It keeps the call short and answers questions like "do you come out to my town?" or "are you open Saturday?" from the facts you give us.</p>
<p>If a caller wants a person, it takes a message flagged for a quick callback, or forwards the call if you'd rather. Want to hear it first? Call our demo line at {{DEMO}} and ask it anything.</p>

<h2>What it handles, and what it sends to you</h2>
<table>
<tr><th>It handles</th><th>It sends to you</th></tr>
<tr><td>New customers calling for service</td><td>True emergencies, forwarded live to your on-call person</td></tr>
<tr><td>Booking estimates, tune-ups and routine visits</td><td>Price quotes it hasn't been given (it offers a visit or callback)</td></tr>
<tr><td>Hours, service area and "do you do this?" questions</td><td>Complaints, billing questions and anything it isn't sure about</td></tr>
<tr><td>After-hours calls and overflow when you're busy</td><td>Callers who ask for a person</td></tr>
</table>
<p>It won't quote prices you haven't approved, diagnose a problem over the phone, or give safety advice beyond telling someone in danger to get out and call 911 or the gas company.</p>

<h2>Set up in a few days, on your number</h2>
<p>You keep your number: the one on your trucks, cards and Google profile. We turn on call forwarding from your line to the assistant, either for every call or only for calls you don't pick up. Most owners start with the second, so they still answer when they can and the assistant catches the rest.</p>
<p>Calls are transcribed. Some states require everyone on a call to agree to recording, so we can add a short notice to the greeting. Check your state's rules with us during setup.</p>

<h2>How minutes work</h2>
<p>Minutes are the time the assistant spends on calls. It costs {{PRICE:ai}}. If it only answers the calls you miss, the calls you pick up yourself don't use any minutes.</p>
<p>As an example, 150 minutes is about 50 calls if the average call lasts three minutes. Most owners don't know their average until they look, so we go through your call log with you before you start.</p>

<h2>AI answering vs text-back vs a live answering service</h2>
<table>
<tr><th></th><th>Missed-call text-back</th><th>AI answering</th><th>Live answering service</th></tr>
<tr><td>What the caller gets</td><td>A text in seconds</td><td>A voice that talks and asks</td><td>A person with a script</td></tr>
<tr><td>Landline callers</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Books a visit</td><td>With a link</td><td>Yes</td><td>Sometimes</td></tr>
<tr><td>Upset or unusual callers</td><td>Weak</td><td>Weak</td><td>Best</td></tr>
<tr><td>Cost</td><td>Lowest</td><td>Middle</td><td>Usually highest</td></tr>
</table>
<p>For reference, in November 2026 Jobber listed its AI Receptionist add-on at $99 a month, and Ruby listed live receptionists from $250 for 50 minutes. Many shops run <a href="/services/missed-call-text-back">missed-call text-back</a> during the day and AI at night. More on choosing in <a href="/guides/missed-call-text-back-vs-ai-receptionist">text-back vs AI receptionist vs answering service</a>.</p>

<h2>What it sounds like in your trade</h2>
<h3>HVAC: no cooling at 9 p.m. in July</h3>
<p>It asks whether the system is running at all, whether anyone at home is at risk from the heat, and the address. If you run an on-call tech at night, a call that matches your emergency rules is forwarded. If not, it books the first morning slot and texts you the summary.</p>
<h3>Plumbing: a leak that won't stop</h3>
<p>It asks whether water is still running, whether they've found the main shut-off, and whether it's one fixture or the whole house. Active flooding goes to your on-call plumber. A dripping faucet gets booked for business hours.</p>
<h3>Garage door: stuck with the car inside</h3>
<p>It asks whether the door is stuck open or closed and what happened: a bang (often a spring), a door off its track, or an opener that won't respond. A door stuck open at night can be forwarded; a noisy opener gets booked. If you want, it repeats the one safety line you'd give, like leaving a door with a broken spring alone, and nothing more.</p>
<h3>Pest control: wasps by the back door</h3>
<p>It asks what they're seeing, where, and whether anyone has an allergy. A nest by the entrance of a home with an allergic child can go on your same-day list or to your on-call tech. Anyone having a reaction is told to call 911. "Do you do quarterly service?" gets answered and booked.</p>`,
    faq: [
      ['How much does an AI answering service cost?', `Ours costs {{PRICE:ai}}, set up and tuned for you. Self-serve options cost less but you write the script yourself: in November 2026, Rosie listed $49 a month for 250 minutes and Jobber listed its AI Receptionist add-on at $99 a month.`],
      ['Can an AI answering service book appointments?', `Yes. It books the visit types you choose, such as estimates and tune-ups, into the calendar we set up for you. Calls you'd rather schedule yourself get texted to you as a summary.`],
      ['Will customers know it\'s AI?', `Yes. It says it's an assistant at the start, which we recommend and some states have rules about. Most callers just want the problem handled. Anyone who wants a person gets a callback.`],
      ['Does it work with my existing number?', `Yes. We use call forwarding, so your number stays the same everywhere. You choose whether it answers every call or only the ones you miss.`],
      [`What if I'm already on the phone, or several people call at once?`, `It picks up. If you're on another call or can't get to the phone, the assistant answers, and it can take several calls at the same time, so nobody hits a busy signal or voicemail.`],
      ['What happens in an emergency?', `You decide what counts as an emergency, and those calls are forwarded to your on-call person. We agree on a backup if they don't pick up, such as a text with the details. Anyone in danger is told to call 911 or the gas company.`],
      ['Does it work with Jobber or Housecall Pro?', `Calls, transcripts and summaries go into the CRM we run for you, which connects to Jobber (official integration), to Housecall Pro on its plan that allows integrations, and to other software through Zapier or Make. How a booking reaches your job schedule depends on your setup, and we'll show you on the call.`],
      ['Can I hear it before I sign up?', `Yes. Call our demo line at {{DEMO}} and ask it anything.`],
      ['Can I use it only after hours?', `Yes. Many owners have it answer only at night, on weekends and when they miss a call during the day. You can change that whenever you want.`],
    ],
  },
].map((s) => ({ ...s, crumbs: [['/', 'Home'], ['/services', 'Services'], [s.path, s.short]] }));
