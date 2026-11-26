// Trade + service pages for call answering (added 2026-11-25): /marketing/<trade>/ai-answering-service and
// /marketing/<trade>/missed-call-text-back. Same shape and rules as combos.mjs: each page written for its trade, no
// invented stats or clients, titles under ~50 characters (the site adds " | TableTurnerr").
//
// Pricing: never type a TableTurnerr price. {{PRICE:ai}} and {{PRICE:textback}} are filled in from app/lib/pricing.ts,
// and {{DEMO}} becomes the demo line. Competitor prices come from the ICP research notes (read November 2026) and must
// carry that month. Integrations: the CRM connects to Jobber, Housecall Pro and GorillaDesk (pricing.ts); combos.mjs
// and the FSM line in index.ts also name ServiceTitan and Workiz.
export const combos2Services = ['ai-answering-service', 'missed-call-text-back'];
export const combos2Trades = ['hvac', 'plumbing', 'electricians', 'handyman', 'roofing', 'garage-door-repair', 'pest-control', 'landscaping'];

export const combos2 = [
  // ------------------------------------------------------------------ HVAC
  {
    trade: 'hvac', service: 'ai-answering-service',
    title: 'AI Answering Service for HVAC Companies',
    description: `A 24/7 AI answering service for HVAC companies: takes no-cool and no-heat calls, books tune-ups, and forwards true emergencies to your on-call tech.`,
    h1: 'AI answering for HVAC companies, built for no-cool and no-heat calls',
    lede: `HVAC phones ring hardest when it's hottest and coldest, which is exactly when every tech is busy. The assistant answers each call in your name, sorts emergencies from tune-ups, and gets the job on your board.`,
    why: `<p>An AI answering service helps an HVAC company by picking up the calls that would go to voicemail during heat waves, cold snaps and nights, and by telling a "no heat, grandma's at home" call apart from a "can I book a tune-up" call. It costs {{PRICE:ai}}.</p><p>HVAC demand follows the weather. The first 95-degree week or the first freeze brings a wave of calls while your techs are in attics and on roofs, and a homeowner with no cooling calls the next company on the map if nobody answers. The assistant takes several calls at once, asks the system questions your CSR would, and books or forwards each one.</p><p>In the shoulder seasons it handles the quieter calls: maintenance plans, tune-up booking, "do you work on heat pumps?" and "do you come to my town?". To hear how it sounds, call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Emergency rules you write', `No heat in a freeze, no cooling with someone vulnerable at home, a gas smell: you decide what counts, and those calls go straight to the on-call tech. A caller reporting a gas smell is told to leave and call the gas company.`],
      ['The questions a dispatcher asks', `Is the system running at all? Is the outdoor unit on? Furnace or heat pump? Address and best number. Your tech walks in knowing the basics.`],
      ['Tune-ups and estimates booked', `Maintenance visits and replacement estimates go into your calendar in the slots you allow, so the morning starts with booked work instead of voicemails.`],
      ['Summaries where your team works', `Every call has a transcript and summary in the app on your phone and in the CRM, which we connect to ServiceTitan, Housecall Pro or Jobber.`],
    ],
    faq: [
      ['How much does an AI answering service for HVAC cost?', `Ours costs {{PRICE:ai}}, set up and tuned for you. In November 2026, Jobber listed its AI Receptionist add-on at $99 a month and Rosie listed $49 a month for 250 minutes; with those, you write and tune the script yourself.`],
      ['Can it tell a real HVAC emergency from a routine call?', `It follows the rules you give it. We write them with you: what counts as urgent in summer and in winter, who is on call, and what happens if they don't pick up. Anything unclear is flagged for a fast callback.`],
      ['Will it quote prices for a new system?', `No. If you have a set diagnostic or tune-up fee, it can say that. Replacement pricing needs a visit, so it books the estimate instead.`],
      ['What if ten people call at once during a heat wave?', `It can take several calls at the same time, so callers don't hit a busy signal or voicemail.`],
    ],
  },
  {
    trade: 'hvac', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for HVAC Companies',
    description: `Missed-call text-back for HVAC companies: every missed call gets a text in seconds, so no-cool and no-heat callers reply to you, not the next shop.`,
    h1: 'Missed-call text-back for HVAC: every missed call gets a text in seconds',
    lede: `During the first heat wave, nobody can answer every line. A homeowner who reaches voicemail calls the next HVAC company. A text within seconds keeps them talking to you.`,
    why: `<p>Missed-call text-back sends an automatic text to anyone whose call you miss, within seconds, asking what they need. For an HVAC company, that means the overflow during heat waves and cold snaps still gets a reply. It costs {{PRICE:textback}}.</p><p>HVAC call volume swings with the weather: quiet in spring and fall, then flooded the first hot or cold week. You or your CSR can only take one call at a time. Text-back covers the rest until someone can call back, and the replies land in one inbox.</p><p>It works on your existing number. It can't reach callers on landlines, and it doesn't take details the way a person or an <a href="/marketing/hvac/ai-answering-service">AI answering service</a> does, so many HVAC shops use both.</p>`,
    tactics: [
      ['A message for the season', `In summer: "Sorry we missed you. Is your AC out? Reply with your address and we'll get you on the schedule." In winter, the same for heat. We write the messages and change them for you.`],
      ['Replies in one inbox', `Customer replies land in the app on your phone and in the CRM, so you or your CSR can pick them up between calls.`],
      ['Rules for who gets a text', `Suppliers, your own techs and family can be left out, so only customers get the message.`],
      ['Registered for business texting', `US carriers require business texting to be registered (10DLC). We handle it, so your texts get delivered.`],
    ],
    faq: [
      ['What is missed-call text-back?', `An automatic text sent within seconds to anyone whose call you miss. It asks what they need, so the conversation starts before they call another company.`],
      ['Does missed-call text-back work for HVAC emergencies?', `It starts the conversation fast, but a text alone can't handle a no-heat call at midnight. Pair it with an on-call phone or an AI answering service that forwards emergencies.`],
      ['How much does missed-call text-back cost?', `Ours costs {{PRICE:textback}}. In November 2026, third-party roundups put simple standalone tools at roughly $29 to $50 a month, set up by you.`],
      ['Do I need a new phone number?', `No. It works with your existing business number.`],
    ],
  },

  // ------------------------------------------------------------------ PLUMBING
  {
    trade: 'plumbing', service: 'ai-answering-service',
    title: 'AI Answering Service for Plumbers',
    description: `A 24/7 AI answering service for plumbers: answers burst-pipe and backed-up drain calls, books routine work and forwards emergencies to your on-call.`,
    h1: 'AI answering for plumbers: someone picks up while the water is running',
    lede: `A homeowner with water coming through the ceiling calls once, maybe twice. If they get voicemail, they call the next plumber. The assistant answers in your name, asks the right questions and gets the emergency to whoever's on call.`,
    why: `<p>For a plumbing company, an AI answering service makes sure the 2 a.m. burst pipe and the Saturday sewer backup get answered, while routine calls like a running toilet or a water heater quote get booked for business hours. It costs {{PRICE:ai}}.</p><p>Plumbing has more true emergencies than most trades, and they don't keep office hours. A plumber under a sink can't answer either, and a caller with water on the floor won't leave a message. The assistant asks whether water is still running, whether they've found the main shut-off, and whether it's one fixture or the whole house, then routes the call by your rules.</p><p>Want to hear it? Call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Emergency vs. next-day, sorted', `Active leak, no water, sewage coming up: forwarded to your on-call plumber. Dripping faucet or slow drain: booked, or texted to you for the morning.`],
      ['The details your plumber needs', `Address, which fixture, how long it's been happening, whether the water is off, house or business, and the best callback number.`],
      ['Bigger jobs captured', `Water heater and repipe calls often start as a question. It takes the details (tank or tankless, age, gas or electric) and books the estimate.`],
      ['Fits how you already work', `Transcripts and summaries go to the app and the CRM, which we connect to Jobber, Housecall Pro and other plumbing software.`],
    ],
    faq: [
      ['What is the best answering service for a small plumbing company?', `One that answers every call, sorts emergencies the way you would and reaches your on-call plumber fast. Live services handle upset callers best but cost more. AI costs less and never puts anyone on hold. Many plumbers use AI for nights and overflow.`],
      ['How much does a plumbing answering service cost?', `Ours costs {{PRICE:ai}}. For comparison, in November 2026 Ruby listed live receptionists from $250 for 50 minutes, and Jobber listed its AI Receptionist add-on at $99 a month.`],
      ['Can it tell a caller how to shut off their water?', `Only if you want it to. Many plumbers approve one line, like "if you can, turn off the main valve," and nothing more. It won't diagnose or give other repair advice.`],
      ['Does it work for a one-truck plumber?', `Yes, and that's where it helps most: you keep working while it answers, and you call back from the summary in the app.`],
    ],
  },
  {
    trade: 'plumbing', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Plumbers',
    description: `Missed-call text-back for plumbers: a text in seconds to every caller you miss under a sink, so leak and drain calls reply to you, not the next plumber.`,
    h1: 'Missed-call text-back for plumbers who can\'t answer from under a sink',
    lede: `Your hands are wet, the phone buzzes, and you let it go. That caller had a backed-up drain and three more plumbers on the map. A text in seconds gives them a reason to wait for you.`,
    why: `<p>Missed-call text-back texts every caller you miss within seconds, so a plumbing customer gets a reply while you're still on the job and can tell you what's wrong by text. It costs {{PRICE:textback}}.</p><p>Many plumbing companies run one or two trucks, and the owner is also the plumber, so most daytime missed calls happen mid-job. A text that asks "what's going on, and what's the address?" turns a missed call into a written job description you can answer between tasks.</p><p>For real emergencies at night, a text isn't enough on its own. That's where an on-call phone or an <a href="/marketing/plumbing/ai-answering-service">AI answering service</a> comes in.</p>`,
    tactics: [
      ['A text that asks the right thing', `"Sorry I missed you, I'm on a job. Is water still running? Reply with what's going on and your address." Short, and it tells an emergency caller to say so.`],
      ['Photos by reply', `Customers often reply with a photo of the leak or the water heater label, which helps you prep or price before calling back.`],
      ['Your number, your name', `It works on your existing business number and signs off with your business name.`],
      ['Every reply in one place', `Threads land in the app and the CRM, connected to Jobber or Housecall Pro, so jobs don't live only in your personal texts.`],
    ],
    faq: [
      ['Is missed-call text-back worth it for a plumber?', `Usually, because it's inexpensive and plumbing callers rarely leave voicemail. Put last month's missed calls into our missed call calculator to see what they may be costing you.`],
      ['Will it text my supply house and family too?', `Not if we set rules. We leave out the numbers you choose, so only customers get the text.`],
      ['What about callers on a landline?', `They won't get the text. That's the main gap, and why some plumbers add an AI answering service for after hours.`],
      ['How fast does the text go out?', `Within seconds of the missed call. Some owners prefer a short delay so it feels less automatic, and we can set that.`],
    ],
  },

  // ------------------------------------------------------------------ ELECTRICIANS
  {
    trade: 'electricians', service: 'ai-answering-service',
    title: 'AI Answering Service for Electricians',
    description: `An AI answering service for electricians: answers 24/7, sorts sparks and burning smells from panel and EV charger quotes, and books your estimates.`,
    h1: 'AI answering for electricians who can\'t pick up with their hands in a panel',
    lede: `You don't answer the phone mid-wire. The assistant does, in your name, and it can tell a sparking outlet from a "how much for an EV charger?" call.`,
    why: `<p>An AI answering service helps an electrician by answering while you work, sorting the few real emergencies (sparks, a burning smell, power out to part of the house) from the many quote calls for panels, EV chargers, generators and lighting, and booking those quotes. It costs {{PRICE:ai}}.</p><p>Electrical calls split cleanly. A small share are urgent and safety-related. Most are planned work, where the homeowner calls a few electricians for prices and the first one to offer a time has the edge. The assistant books the estimate while the caller is still on the line.</p><p>Call our demo line at {{DEMO}} and ask it anything to hear how it handles a call.</p>`,
    tactics: [
      ['Safety calls go to a person', `Sparks, smoke, a burning smell or a hot panel: it tells the caller to call 911 if there's fire or danger, and forwards the call to you or your on-call electrician.`],
      ['Quote calls booked', `Panel upgrades, EV chargers, generators, rewiring and lighting: it asks what they want and books the estimate visit in the slots you allow.`],
      ['The utility, not you', `If the whole street is dark, that's the power company. You can have it suggest checking with the utility before booking a visit.`],
      ['Notes you can use', `Panel brand or size if the caller knows it, the car for an EV charger, and where they want it installed, all in the summary in the app.`],
    ],
    faq: [
      ['Is an AI answering service worth it for an electrician?', `If you miss calls on jobs and quote callers don't leave voicemail, it often is. Count last month's missed calls and how many left no message, then try our missed call calculator.`],
      ['Can it book EV charger and panel upgrade estimates?', `Yes, into the calendar slots you choose. It collects the details you need first, so you don't drive out for a job you wouldn't take.`],
      ['What does it do with an electrical emergency after hours?', `It follows your rules: it forwards to whoever's on call and tells anyone reporting fire, smoke or sparks to get out and call 911. If you don't do after-hours work, it says so and books the first slot.`],
      ['Will callers know it\'s not a person?', `Yes. It says it's an assistant at the start. Callers who want to talk to you get a callback.`],
    ],
  },
  {
    trade: 'electricians', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Electricians',
    description: `Missed-call text-back for electricians: every missed call gets a text in seconds, so panel, EV charger and repair leads hear from you while you work.`,
    h1: 'Missed-call text-back for electricians on the job',
    lede: `Working in a panel, you don't answer. A homeowner pricing an EV charger install calls the next electrician on the list. A text in seconds keeps you in the running.`,
    why: `<p>Missed-call text-back sends a text within seconds to every caller you miss, so an electrician's quote leads (panels, EV chargers, generators, lighting) get a reply even when you can't answer. It costs {{PRICE:textback}}.</p><p>Most electrical calls are planned work, and people shopping for a quote often call several electricians in a row. A text back starts a thread with you before they reach the others, and many people would rather describe the job by text anyway.</p><p>For the rare after-hours emergency, set up a forwarding rule or an <a href="/marketing/electricians/ai-answering-service">AI answering service</a>. A text can't check for sparks.</p>`,
    tactics: [
      ['A text that starts the quote', `"Sorry we missed you. What are you looking to get done? A photo of your panel helps." It gathers the details you'd ask for anyway.`],
      ['A safety line included', `The text can tell anyone with sparks, smoke or a burning smell to call 911 first. We write it with you.`],
      ['Rules for who gets it', `Supply houses, contractors you work with and family can be left out.`],
      ['Registered and delivered', `Business texting needs carrier registration (10DLC). We handle it, and replies come into one inbox on your phone.`],
    ],
    faq: [
      ['Does missed-call text-back work for commercial electrical calls?', `Yes, as a first reply. Commercial customers often prefer to send details in writing anyway.`],
      ['Can I see the replies on my phone?', `Yes. Replies come into an app on your phone and into the CRM.`],
      ['How much does missed-call text-back cost?', `It costs {{PRICE:textback}}.`],
    ],
  },

  // ------------------------------------------------------------------ HANDYMAN
  {
    trade: 'handyman', service: 'ai-answering-service',
    title: 'AI Answering Service for Handyman Businesses',
    description: `An AI answering service for handyman businesses: answers while you work, takes the job list and address, answers "do you do this?" and books visits.`,
    h1: 'AI answering for handymen who are the whole office',
    lede: `Most handyman businesses are one or two people, so the phone rings while you're on a ladder. The assistant answers, writes down the job list and books the visit, so you only call back when you need to.`,
    why: `<p>For a handyman, an AI answering service mostly answers one question, "do you do this kind of job?", then takes the list of jobs and the address and books a visit, so you don't lose work while your hands are full. It costs {{PRICE:ai}}.</p><p>Handyman calls are rarely emergencies, but there are lots of them and they're all different: mount a TV, patch drywall, hang a door, fix a fence board. You know what you take and what you don't, such as work your state requires a license for. The assistant uses that list, so you stop driving out to jobs you'd turn down.</p><p>Curious how it sounds? Call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Your yes-and-no list', `We load the jobs you take and the ones you don't, so it answers "do you do this?" the way you would.`],
      ['The whole job list in one call', `Customers rarely have just one task. It asks what else is on the list, so a short visit can become a half day.`],
      ['Booked into your open time', `Visits go into the slots you allow, with the address, task list and best number in the summary.`],
      ['No guessing at prices', `If you have a minimum charge or trip fee, it can say so. Everything else waits for you or the visit.`],
    ],
    faq: [
      ['Is an AI receptionist worth it for a one-man handyman business?', `It can be, if you lose jobs to missed calls. If you only miss a few calls a day, missed-call text-back costs less and may be enough. Our guide to text-back vs AI receptionists compares the two.`],
      ['Can it tell callers my hourly rate or minimum?', `Yes, if you want it to say a set rate or minimum. It won't estimate a job.`],
      ['I don\'t use any job software. Does that matter?', `No. Calls, transcripts and bookings are in the app on your phone. If you add Jobber or Housecall Pro later, we connect it.`],
    ],
  },
  {
    trade: 'handyman', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Handyman Businesses',
    description: `Missed-call text-back for handyman businesses: a text in seconds to every caller you miss, so they can send the job list and photos while you finish up.`,
    h1: 'Missed-call text-back for the one-person handyman business',
    lede: `If you're the only one answering the phone, you miss calls every day. A text in seconds lets the customer send their list and a photo, and you reply when your hands are free.`,
    why: `<p>For a handyman, missed-call text-back is usually the cheapest fix for missed calls: everyone you miss gets a text within seconds, and most handyman customers are happy to describe small jobs, and send photos, by text. It costs {{PRICE:textback}}.</p><p>Handyman work is many small jobs, and customers usually try a couple of names. A quick text back keeps you in line without stopping work, and photos of the job let you size it before you drive over.</p><p>Weighing it against an AI receptionist? Read <a href="/guides/missed-call-text-back-vs-ai-receptionist">text-back vs AI receptionist</a>. For most solo handymen, text-back comes first.</p>`,
    tactics: [
      ['A text that asks for the list', `"Sorry I missed you, I'm on a job. What do you need done? Send a photo if you can and I'll get back to you shortly."`],
      ['Photos to price small jobs', `Customers can reply with photos, so you can price a TV mount or a drywall patch without a trip.`],
      ['Works without job software', `No Jobber? No problem. Replies come into an app on your phone.`],
      ['Personal numbers left out', `If your business line is also your cell, family, friends and suppliers can be put on a skip list so they don't get the automatic text.`],
    ],
    faq: [
      ['What\'s the best missed call text back app for a handyman?', `One that works on your current number, keeps replies in one place and is registered for business texting. Ours is set up for you and costs {{PRICE:textback}}.`],
      ['My business number is my cell phone. Does that work?', `Yes, with call forwarding set so unanswered calls reach our system instead of your carrier's voicemail. We set it up and add the numbers you don't want texted to a skip list.`],
      ['Should I use text-back or an AI receptionist?', `Start with text-back. Add AI answering if many callers won't text back or you get a lot of calls at night.`],
    ],
  },

  // ------------------------------------------------------------------ ROOFING
  {
    trade: 'roofing', service: 'ai-answering-service',
    title: 'AI Answering Service for Roofers',
    description: `An AI answering service for roofing contractors: answers storm surges and leak calls 24/7, books inspections, and sends active leaks to your on-call.`,
    h1: 'AI answering for roofers, for the week after the storm',
    lede: `After hail or a windstorm, your phone rings all day while your crews are on roofs and you're out on estimates. The assistant answers every call, asks about the damage and books inspections in order.`,
    why: `<p>For a roofing company, an AI answering service catches the surge of calls after a storm and the steady flow of leak and inspection calls in between, takes the address and damage details, and books inspections without you stepping off a roof. It costs {{PRICE:ai}}.</p><p>Roofing calls come in waves. A storm can bring a week's worth of calls in a day, and homeowners call several roofers at once. Between storms, most calls are replacement quotes and small leaks, where a quick answer still decides who gets the inspection.</p><p>Hear it for yourself: call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Storm-day overflow', `It takes several calls at once, so a hail day doesn't fill your voicemail. Each caller gets the next open inspection slot, or a callback time you set.`],
      ['Damage questions up front', `Where is the leak, is water coming in now, how old is the roof, shingle or metal, is there an insurance claim open. Your estimator arrives knowing the job.`],
      ['Active leaks routed', `Water coming through the ceiling is forwarded to your on-call person, or booked for a tarp visit, by your rules.`],
      ['Careful with insurance', `It can say you work with insurance claims if you do. It doesn't give coverage advice or promise what insurance will pay.`],
    ],
    faq: [
      ['Do roofers need an answering service for storm season?', `If you miss calls when storms hit, yes. That's when homeowners call several roofers at once. The assistant answers them all and books inspections in order.`],
      ['Can it book roof inspections?', `Yes, into the inspection slots you set, with the address and damage details in the summary.`],
      ['What does it say about insurance claims?', `Only what you approve, such as "yes, we work with insurance claims." It won't promise coverage or comment on a claim.`],
      ['How many minutes does a roofer need?', `It costs {{PRICE:ai}}. After a big storm you may use more minutes than usual, so we look at last season's call log with you before storm season.`],
    ],
  },
  {
    trade: 'roofing', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Roofers',
    description: `Missed-call text-back for roofing contractors: a text in seconds to every missed caller, so storm and leak leads reply to you while you're on a roof.`,
    h1: 'Missed-call text-back for roofers after the storm',
    lede: `You can't take a call 30 feet up, and after a hailstorm nobody can take them all. A text in seconds asks for the address and what happened, so the lead waits for you.`,
    why: `<p>Missed-call text-back texts every caller you miss within seconds. For a roofer, it keeps storm and leak leads from going to the next company while you're on a roof or in an inspection. It costs {{PRICE:textback}}.</p><p>Roofing calls arrive in bursts after hail and wind, and homeowners call several roofers at once. A fast text with a link to book an inspection, or a simple "reply with your address," gets you on their list before the others call back. Between storms, it covers the calls you miss during estimates.</p><p>When a storm brings more calls than you can text back, an <a href="/marketing/roofing/ai-answering-service">AI answering service</a> can talk to callers and book inspections for you.</p>`,
    tactics: [
      ['Storm-ready messages', `One version for normal weeks and one for after a storm: "We're getting a lot of calls after yesterday's hail. Reply with your address and we'll add you to the inspection list."`],
      ['An inspection link', `If you use online booking, the text includes a link to pick an inspection time.`],
      ['Photos of the damage', `Homeowners can reply with photos of the leak or damage, which helps you see which jobs are urgent.`],
      ['One inbox for the office', `Replies land in the app and the CRM, so whoever is running estimates can pick them up.`],
    ],
    faq: [
      ['Does missed-call text-back help roofers after a storm?', `Yes. Storm days bring more calls than anyone can answer, and a text in seconds keeps those homeowners talking to you.`],
      ['Can the text come from my existing number?', `In most cases, yes. We work with your current business number and register it for business texting.`],
      ['Is it legal to text people who called me?', `Replying about the job someone just called about is generally treated differently from marketing, but the number must be registered and opt-outs honored. Don't add those callers to marketing texts without permission.`],
    ],
  },

  // ------------------------------------------------------------------ GARAGE DOOR
  {
    trade: 'garage-door-repair', service: 'ai-answering-service',
    title: 'AI Answering Service for Garage Door Companies',
    description: `An AI answering service for garage door companies: answers "car stuck inside" calls 24/7, books spring and opener repairs, and forwards urgent calls.`,
    h1: 'AI answering for garage door companies, where the first to answer gets the job',
    lede: `A snapped spring with the car stuck inside is an urgent call, and the homeowner calls the first listing that looks real. If you don't pick up, the next company does. The assistant answers every one.`,
    why: `<p>For a garage door company, an AI answering service answers the urgent "door won't open, car is stuck" calls at any hour, asks what failed, and either books the first slot or forwards the call to your on-call tech, so the job doesn't go to the next listing on the map. It costs {{PRICE:ai}}.</p><p>Garage door repair is a call-first trade: homeowners search on a phone, tap a listing and call. The category is also crowded with lead-gen listings that aren't real local shops, so a company that answers in its own name, every time, stands out.</p><p>Call our demo line at {{DEMO}} and ask it anything to hear how it sounds.</p>`,
    tactics: [
      ['Stuck open vs. stuck closed', `A door stuck open at night (house unsecured) or a car trapped inside can be forwarded or booked first. A noisy door or a new opener gets booked for later.`],
      ['The repair questions you\'d ask', `Broken spring, off track, snapped cable, opener not responding, remote or keypad. Door size and opener brand if they know them.`],
      ['One safety line, if you want it', `Many companies have it tell callers not to force a door with a broken spring. It says only what you approve.`],
      ['Replacement leads booked as estimates', `New door and opener calls get a quote visit, with style and size notes, instead of a price over the phone.`],
    ],
    faq: [
      ['Should a garage door company offer 24/7 service?', `Only if someone can actually go out. The assistant can answer around the clock either way: it forwards the urgent calls you take and books the rest for the morning.`],
      ['Can it quote a spring replacement?', `If you have a set price or service-call fee you want it to give, yes. Otherwise it books the visit.`],
      ['Does it work with my existing number?', `Yes. We use call forwarding, so the number on your trucks and Google profile stays the same.`],
    ],
  },
  {
    trade: 'garage-door-repair', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Garage Door Companies',
    description: `Missed-call text-back for garage door companies: every missed call gets a text in seconds, so stuck-door callers reply to you, not the next listing.`,
    h1: 'Missed-call text-back for garage door companies',
    lede: `Someone with a car stuck behind a broken door calls the first listing, then the second. If your phone rang out, a text in seconds is your chance to stay in the race.`,
    why: `<p>Missed-call text-back sends a text within seconds to anyone whose call you miss. In garage door repair, where callers move to the next listing almost right away, that text is your best shot at keeping the job. It costs {{PRICE:textback}}.</p><p>The category is call-first and crowded with listings that aren't real local shops. A quick text in your company's name, asking what happened to the door, shows the homeowner a real business is on it. Customers can reply with a photo of the spring or track, so your tech knows which parts to bring.</p><p>For nights and weekends, pair it with an <a href="/marketing/garage-door-repair/ai-answering-service">AI answering service</a> that can talk to stuck-door callers.</p>`,
    tactics: [
      ['A text in your name', `"This is [your company], sorry we missed you. Is your door stuck open or closed? Reply with your address and we'll get a tech out." Your name, not a generic number.`],
      ['Photos before the trip', `A photo of a broken spring, cable or opener helps your tech load the right parts.`],
      ['Day and night versions', `After hours, the text says when you'll call back, or how to reach your emergency line if you have one.`],
      ['Replies on your phone', `Every thread lands in the app and the CRM, so the next free tech can respond.`],
    ],
    faq: [
      ['Why do garage door companies lose so many calls?', `Repairs are urgent and homeowners call several listings fast. If you don't answer or reply within minutes, they've often booked someone else.`],
      ['Is text-back enough, or do I need someone to answer?', `It's the minimum. For urgent after-hours calls, add an AI answering service or an on-call phone so callers can talk to someone.`],
      ['How much does missed-call text-back cost?', `It costs {{PRICE:textback}}.`],
    ],
  },

  // ------------------------------------------------------------------ PEST CONTROL
  {
    trade: 'pest-control', service: 'ai-answering-service',
    title: 'AI Answering Service for Pest Control',
    description: `An AI answering service for pest control companies: answers wasp, rodent and bed bug calls, books first treatments and answers recurring-plan questions.`,
    h1: 'AI answering for pest control, from wasp nests to quarterly plans',
    lede: `Pest calls come in the moment someone sees the problem, often while your techs are in crawl spaces and attics. The assistant answers, asks what they're seeing and books the first visit.`,
    why: `<p>For a pest control company, an AI answering service answers the "I just saw a rat" and "there's a wasp nest by the door" calls when your techs can't, asks what pest and where, books the first treatment, and answers questions about your recurring plans. It costs {{PRICE:ai}}.</p><p>Most pest calls aren't emergencies, but they feel urgent to the caller, and people try the next company if nobody answers. A few deserve faster handling, like stinging insects at the door of a home with an allergic child, or a restaurant that needs service before opening. You set those rules. In spring and summer, when calls peak, the assistant takes the overflow.</p><p>To hear it, call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Pest, place and how long', `What they're seeing, where (inside, attic, yard, crawl space), for how long, and whether there are kids or pets at home. Your tech arrives prepared.`],
      ['First treatment booked', `Into the slots you set, with same-day requests flagged if you offer them.`],
      ['Plan questions answered', `Quarterly or monthly service, what's covered, how re-treatments work: it answers from what you give us and books the first visit.`],
      ['Safety questions sent to you', `Questions about products, pets or kids get your approved answer or a callback from your licensed tech, not a guess.`],
    ],
    faq: [
      ['Do pest control companies need an answering service?', `If calls go to voicemail while techs are on routes, it helps. Most callers want help soon and will try another company.`],
      ['Can it sign people up for recurring pest control plans?', `It can explain your plans and book the first visit. Plan agreements and payment stay with your office or your field software.`],
      ['Does it work with GorillaDesk?', `Calls, transcripts and summaries go into the CRM we run for you, which we connect to GorillaDesk, Jobber and Housecall Pro. We'll show you how bookings reach your schedule on the call.`],
      ['What about after-hours stinging insect or wildlife calls?', `You decide. It can forward urgent ones to your on-call tech, or take the details and book the first morning slot. If someone is having an allergic reaction, it tells them to call 911.`],
    ],
  },
  {
    trade: 'pest-control', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Pest Control',
    description: `Missed-call text-back for pest control companies: a text in seconds to every caller you miss, so rodent, wasp and bed bug leads reply to you, not a rival.`,
    h1: 'Missed-call text-back for pest control companies',
    lede: `Your techs are in attics and crawl spaces, and the office line is busy all spring. The caller who just saw a mouse won't wait. A text in seconds asks what they're seeing and keeps them with you.`,
    why: `<p>Missed-call text-back sends an automatic text within seconds to every caller you miss, so a pest control company replies to new leads even when every tech is on a route. It costs {{PRICE:textback}}.</p><p>Pest calls peak in spring and summer and often come from people who just found the problem. They're usually happy to text a photo of the bug or the droppings, which helps you identify the pest and plan the first visit. Text-back also catches calls from your recurring customers, so a re-service request doesn't sit in voicemail.</p><p>If many of your callers want to talk, an <a href="/marketing/pest-control/ai-answering-service">AI answering service</a> can take the call instead.</p>`,
    tactics: [
      ['Ask for a photo', `"Sorry we missed you! What are you seeing, and where? A photo helps us identify it." Photos of bugs and droppings save a lot of back-and-forth.`],
      ['New leads and current customers', `Recurring customers asking for a re-service get the same quick reply, and the thread goes to the office.`],
      ['Seasonal wording', `Spring ants and wasps, fall rodents: we update the text for your season.`],
      ['Runs next to your software', `Text-back runs in our CRM, which we connect to GorillaDesk, Jobber or Housecall Pro. Threads live in the CRM inbox and the app.`],
    ],
    faq: [
      ['Do pest control customers really reply to texts?', `Many prefer it, especially to send a photo of what they found. Callers on landlines won't get the text, which is the main gap.`],
      ['Does missed-call text-back work with GorillaDesk?', `Yes, alongside it. Text-back runs in our CRM, which we connect to GorillaDesk, Jobber and Housecall Pro, so you keep scheduling in your field software.`],
      ['How much does missed-call text-back cost?', `It costs {{PRICE:textback}}.`],
    ],
  },

  // ------------------------------------------------------------------ LANDSCAPING
  {
    trade: 'landscaping', service: 'ai-answering-service',
    title: 'AI Answering Service for Landscapers',
    description: `An AI answering service for landscaping and lawn care companies: answers during the spring rush, takes property details and books your estimates.`,
    h1: 'AI answering for landscapers during the spring rush',
    lede: `In spring, the phone rings all day while you're on a mower or running a crew. Those callers want a quote this week. The assistant answers, gets the property details and books the estimate.`,
    why: `<p>For a landscaping or lawn care company, an AI answering service picks up the spring and fall rush calls you can't answer from a mower, asks what the property needs, and books estimates or texts you the details. It costs {{PRICE:ai}}.</p><p>Landscaping calls are seasonal and almost never emergencies, but timing still matters: a homeowner who wants spring cleanup or weekly mowing calls a few companies and goes with whoever gets back first. An answering service that misunderstands the job makes you look bad, so we give it your exact service list and it doesn't promise work you don't do.</p><p>Call our demo line at {{DEMO}} and ask it anything.</p>`,
    tactics: [
      ['Your exact service list', `Mowing, cleanups, mulch, sod, irrigation, hardscaping, snow: it knows what you do and don't, so it doesn't book a job you'd turn down.`],
      ['Property details first', `Address, rough lot size, front or back, gate or dog, one-time or recurring. Enough to plan the estimate.`],
      ['Estimates booked by area', `If you quote certain neighborhoods on certain days, we set the calendar that way, so estimates fit your routes.`],
      ['Current customers handled', `Skip a week, add a service, a question about the bill: it takes the message and sends it to you, so new-lead calls don't get buried.`],
    ],
    faq: [
      ['How do I stop missing calls during the spring rush?', `Make sure something answers every call you can't: missed-call text-back at minimum, AI answering if callers want to talk. Then call back from the summaries at the end of the day.`],
      ['Is AI answering worth it for a lawn care business?', `If a few saved quotes a season cover the cost, yes. Plans are month to month, so many lawn businesses run text-back all year and add AI answering for the busy months.`],
      ['Can it handle snow removal calls in winter?', `Yes, if you plow. We change the script by season, so in winter it asks about driveways and lots instead of lawns.`],
    ],
  },
  {
    trade: 'landscaping', service: 'missed-call-text-back',
    title: 'Missed-Call Text-Back for Landscapers',
    description: `Missed-call text-back for landscaping and lawn care: a text in seconds to every call you miss on a mower, so spring quote requests reply to you first.`,
    h1: 'Missed-call text-back for landscapers who can\'t hear the phone over the mower',
    lede: `In spring you miss calls all day: you're on a mower, a trimmer or a skid steer. A text in seconds asks for the address and what they need, and you quote from the truck at lunch.`,
    why: `<p>For a landscaping or lawn care company, missed-call text-back answers every missed call with a text within seconds, so spring and fall quote requests reply to you instead of calling the next company. It costs {{PRICE:textback}}.</p><p>Lawn care calls are rarely urgent, but the spring rush is short and homeowners book whoever gets back first. Text is also how many landscaping customers like to talk: they can send an address, a photo of the yard and what they want, and you can often quote from that.</p><p>If you want callers to be able to talk to someone during the rush, see <a href="/marketing/landscaping/ai-answering-service">AI answering for landscapers</a>.</p>`,
    tactics: [
      ['A quote-ready text', `"Sorry we missed you, we're out on a job. What are you looking for (mowing, cleanup, mulch, something else) and what's the address?"`],
      ['Yard photos by reply', `Customers can send photos, which helps you price cleanups and beds without a site visit.`],
      ['Rush-season and winter versions', `Spring wording for cleanups and weekly service. Winter wording for snow if you plow, or a note about when spring booking opens.`],
      ['Crew calls left out', `Your crew, suppliers and family can be excluded, so only customers get the text.`],
    ],
    faq: [
      ['How do I stop missing calls during spring cleanup season?', `Turn on missed-call text-back so every missed call gets a reply in seconds, then answer the threads between jobs. Add AI answering if callers want to talk.`],
      ['How much does missed-call text-back cost?', `It costs {{PRICE:textback}}.`],
      ['Does it work if I use Jobber?', `Yes. Text-back runs in our CRM, which we connect to Jobber, so you keep running jobs in Jobber.`],
    ],
  },
].map((c) => ({ ...c, path: `/marketing/${c.trade}/${c.service}` }));
