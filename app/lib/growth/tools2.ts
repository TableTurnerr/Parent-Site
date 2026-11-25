// More free tools (added 2026-11-25): the pricing, paperwork and messaging questions owners search for, which Jobber and
// Housecall Pro also answer with free tools. Components live in app/components/growth/JobTools.tsx and DocMaker.tsx.
import type { Tool } from "@/app/lib/growth/tools";

export const tools2: Tool[] = [
  {
    slug: "job-price-calculator",
    path: "/tools/job-price-calculator",
    name: "Job price calculator",
    title: "Contractor Job Price Calculator: Markup vs. Margin",
    description:
      "Free job pricing calculator for contractors: put in labor, materials, overhead and the profit you want, and get the price to charge and the markup it takes.",
    h1: "Job price calculator for contractors",
    lede:
      "Put in your labor, materials and overhead, and the profit you want to keep. You get the price to charge, the markup it works out to, and what you would lose by just adding a percentage on top.",
    card: "The price to charge on a job so overhead is paid and the profit you wanted is still there.",
    heading: "The math, in plain English",
    method: [
      ["Direct cost", "Labor hours times what an hour really costs you (wage, payroll taxes, insurance, benefits), plus materials and anything bought or rented for the job."],
      ["Price", "Direct cost divided by one minus your overhead share and your profit share. With 25% overhead and 15% profit, cost is 60% of the price, so price is cost divided by 0.60."],
      ["Markup vs. margin", "Markup is profit compared with cost. Margin is profit compared with price. A 67% markup is a 40% margin. Mixing the two up is the most common reason a busy company makes no money."],
    ],
    faq: [
      ["What is the difference between markup and margin?", "Markup is what you add to cost, as a share of cost. Margin is what's left, as a share of the price. If a job costs you $600 and you charge $1,000, the markup is 67% and the margin is 40%."],
      ["How do I work out my overhead percentage?", "Add up a year of costs that aren't tied to one job: truck, fuel, insurance, tools, phone, software, marketing, rent, office pay. Divide by a year of sales. $60,000 of overhead on $240,000 of sales is 25%."],
      ["How much profit should a contractor make on a job?", "That's your call and depends on the trade, the risk and your market. What matters is that it's a number you picked, left after overhead and after paying yourself, not whatever happens to remain."],
      ["Should I give one price or an hourly rate?", "Many homeowners prefer one price in writing because they know what they'll pay. Use the hourly rate to build the price, then quote the total. Keep hourly for work you can't see until you open it up."],
    ],
    next: [
      ["/tools/hourly-rate-calculator", "Hourly rate calculator", "Work out what an hour of your time has to bring in."],
      ["/tools/estimate-template", "Free estimate template", "Put the price in writing and print it or save it as a PDF."],
      ["/guides/how-to-follow-up-on-an-estimate", "How to follow up on an estimate", "What to send, and when, after the price goes out."],
    ],
  },
  {
    slug: "hourly-rate-calculator",
    path: "/tools/hourly-rate-calculator",
    name: "Hourly rate calculator",
    title: "Contractor Hourly Rate Calculator: What to Charge",
    description:
      "Free hourly rate calculator for handymen, plumbers, electricians and other trades: what to charge per hour to cover pay, overhead and the profit you want.",
    h1: "Contractor hourly rate calculator",
    lede:
      "What do you have to charge per hour to pay yourself and your crew, cover the truck and insurance, and still make a profit? Put in your own numbers.",
    card: "What to charge per billable hour to cover pay, overhead and profit.",
    heading: "The math, in plain English",
    method: [
      ["Sales you need", "Pay plus overhead, divided by one minus your profit share. Materials are left out because you bill those separately."],
      ["Billable hours", "Only hours a customer pays for. Quotes, drive time, buying parts and paperwork don't count, which is why a 45-hour week is often 25 billable hours."],
      ["Rate", "Sales you need divided by billable hours in a year. The break-even rate is the same sum with no profit."],
    ],
    faq: [
      ["How much should I charge per hour as a contractor?", "Enough to cover your pay, your overhead and a profit across the hours you can actually bill. Two handymen in the same town can need very different rates because their overhead and billable hours differ. The calculator shows yours."],
      ["What counts as a billable hour?", "Time on a job a customer is paying for. Driving, quoting, supply runs, callbacks and bookkeeping usually aren't, so track a normal week before you guess."],
      ["Should I charge for drive time?", "Either charge it, add a trip or service fee, or build it into the hourly rate. What doesn't work is ignoring it."],
      ["Why is my rate higher than my wage?", "The wage is one cost. The rate also has to pay for insurance, the truck, tools, taxes, slow weeks and the hours nobody pays for."],
    ],
    next: [
      ["/tools/job-price-calculator", "Job price calculator", "Turn the rate into a price for a whole job."],
      ["/tools/maintenance-plan-calculator", "Maintenance plan calculator", "Fill slow weeks with recurring visits."],
      ["/guides/how-to-keep-track-of-customers", "How to keep track of customers", "A simple list that works before you need software."],
    ],
  },
  {
    slug: "maintenance-plan-calculator",
    path: "/tools/maintenance-plan-calculator",
    name: "Maintenance plan calculator",
    title: "Maintenance Plan Calculator for Home-Service Companies",
    description:
      "Free calculator for HVAC, plumbing, pest, pool and lawn companies: what a maintenance plan earns each month, and the lowest price that covers your visits.",
    h1: "Maintenance plan calculator",
    lede:
      "A service agreement only helps if the price covers the visits. Put in your plan price, members and cost per visit to see recurring revenue, margin and the lowest price that works.",
    card: "Recurring revenue and margin from a service plan, and the lowest price that covers the visits.",
    heading: "The math, in plain English",
    method: [
      ["Recurring revenue", "Members times the monthly price. It comes in even in a slow month, which is the point."],
      ["Plan margin", "What a member pays in a year minus visits times your cost per visit. If that's negative, the plan only works when visits lead to other work."],
      ["Extra work", "Repairs found on plan visits, times your margin on them. Use your own average and leave it at zero if you don't know it yet."],
    ],
    faq: [
      ["What should a home-service maintenance plan include?", "A set number of visits, a written checklist for each one, what's included and what isn't, the price, how it renews and how to cancel. Priority booking and a discount on repairs are common extras."],
      ["How much should I charge for a maintenance plan?", "At least your cost for the year's visits divided by 12, plus your margin. The calculator shows that floor. Then look at what nearby companies charge for a similar plan."],
      ["Which trades suit maintenance plans?", "Work that repeats on a calendar: HVAC tune-ups, plumbing and water-heater checks, pest control, pool, lawn, gutters, garage doors and generators."],
      ["Do auto-renewing plans have legal rules?", "Yes. Many states require clear renewal terms, permission for recurring charges and an easy way to cancel, and some trades have their own service-contract rules. Check your state before you sell one."],
    ],
    next: [
      ["/services/maintenance-plans", "Maintenance plans, set up for you", "Sign-up page, card on file and automatic visit reminders."],
      ["/tools/hourly-rate-calculator", "Hourly rate calculator", "Get your real cost per visit right first."],
      ["/services/email-sms-campaigns", "Email and text campaigns", "Offer the plan to customers who already trust you."],
    ],
  },
  {
    slug: "cost-per-lead-calculator",
    path: "/tools/cost-per-lead-calculator",
    name: "Cost per lead calculator",
    title: "Cost Per Lead & Cost Per Job Calculator for Contractors",
    description:
      "Compare lead sources side by side: cost per lead, cost per job won, and the most you can pay for a lead before you lose money. Free, for contractors.",
    h1: "Cost per lead and cost per job calculator",
    lede:
      "A cheap lead that never books is expensive. Put your lead sources side by side and see cost per lead, cost per job won and the most a lead can cost before you lose money.",
    card: "Compare lead sources by cost per lead and cost per job won.",
    heading: "The math, in plain English",
    method: [
      ["Cost per lead", "What you spent, divided by the calls, texts and forms it brought."],
      ["Cost per job", "What you spent, divided by the jobs it won. This is the number to compare sources on."],
      ["Break-even lead cost", "Profit on an average job, times the share of that source's leads that became jobs. Pay more than that per lead and the source loses money."],
    ],
    faq: [
      ["What is a good cost per lead for a contractor?", "One that's below your break-even. A $200 lead is fine on a $12,000 roof and terrible on a $150 repair. Work out your own ceiling instead of comparing with other companies."],
      ["How do I lower my cost per lead?", "Three ways: spend less for the same leads, get more leads from the same spend, or win more of the leads you have. The third is often fastest: answer every call, reply within minutes and follow up on every estimate."],
      ["Are shared leads worth it?", "They can be if you answer first and your cost per job stays under your profit per job. Track them as their own source. Leads that come from your own Google profile and website aren't sold to anyone else."],
      ["How do I track where leads come from?", "Ask every caller, use a different tracking number per source, and record the source on the job. After a few months you can compare cost per job, not only cost per lead."],
    ],
    next: [
      ["/tools/marketing-roi-calculator", "Marketing ROI calculator", "How many jobs a monthly plan has to bring to pay for itself."],
      ["/guides/local-services-ads-vs-google-ads", "Local Services Ads vs. Google Ads", "How the two charge, and which suits which trade."],
      ["/tools/missed-call-calculator", "Missed call calculator", "What the leads you already pay for are worth when nobody answers."],
    ],
  },
  {
    slug: "estimate-template",
    path: "/tools/estimate-template",
    name: "Estimate template",
    title: "Free Contractor Estimate Template (Print or Save as PDF)",
    description:
      "Free estimate template for contractors and handymen. Fill in the job, add line items, tax and deposit, then print it or save it as a PDF. No sign-up.",
    h1: "Free contractor estimate template",
    lede:
      "Fill it in, print it or save it as a PDF, and send it before you leave the driveway. Line items, tax, deposit, terms and a signature line. No account and no email.",
    card: "Fill in a clean estimate and print it or save it as a PDF. No sign-up.",
    heading: "What a good estimate includes",
    method: [
      ["Who and what", "Your business name, phone and license number, the customer, the address, and the job in words they'd use."],
      ["Line items and total", "Labor, materials, permits and disposal on separate lines, then tax, total and any deposit. Say what isn't included."],
      ["Terms", "How long the price is good for, when you can start, how to pay and how to approve it. Then follow up in two or three days."],
    ],
    faq: [
      ["What is the difference between an estimate and a quote?", "An estimate is your best guess and can change when you see more. A quote is a fixed price for a defined job. Say which one you're giving, and put any limits in writing."],
      ["Is a signed estimate a contract?", "It can be, depending on the wording and your state. Many states have rules for home-improvement contracts, such as required notices and deposit limits. Check your state's rules and have a lawyer look at your terms."],
      ["How fast should I send an estimate?", "The same day, while the visit is fresh. If you need a supplier price, send a message the same day saying when it's coming."],
      ["Does this template save my estimates?", "No. Everything stays in your browser and is gone when you close the page, so save the PDF. If you want estimates sent, signed and followed up automatically, that's something we set up."],
    ],
    next: [
      ["/tools/job-price-calculator", "Job price calculator", "Work out the number before you write it down."],
      ["/guides/how-to-follow-up-on-an-estimate", "How to follow up on an estimate", "The messages to send after day two, seven and fourteen."],
      ["/services/estimates-invoices-payments", "Estimates and payments, set up for you", "Send, sign, pay and follow up from your phone."],
    ],
  },
  {
    slug: "invoice-template",
    path: "/tools/invoice-template",
    name: "Invoice template",
    title: "Free Contractor Invoice Template (Print or Save as PDF)",
    description:
      "Free invoice template for contractors and service businesses. Add line items, sales tax and payments, then print it or save it as a PDF. No sign-up.",
    h1: "Free contractor invoice template",
    lede:
      "Make an invoice in two minutes: line items, sales tax, amount already paid and balance due. Print it or save it as a PDF. Nothing you type leaves your browser.",
    card: "Make an invoice with tax and balance due, then print it or save it as a PDF.",
    heading: "What gets an invoice paid faster",
    method: [
      ["Send it the same day", "Invoice when the job is done, while the customer is happy and the work is fresh."],
      ["Make it easy to pay", "Put the balance, the due date and how to pay at the top. A card or bank link gets paid sooner than a mailing address."],
      ["Remind on a schedule", "A friendly note just before it's due and another about a week after. Set it once and it isn't personal."],
    ],
    faq: [
      ["What should be on a contractor invoice?", "Your business name and contact details, license number where required, the customer and job address, an invoice number and date, line items, tax, what's been paid, the balance, the due date and how to pay."],
      ["How do I number invoices?", "Any order that never repeats works. Year plus a count, such as 2026-041, is easy to sort and look up."],
      ["What payment terms should I use?", "For homeowners, many small companies use due on completion, with a deposit for bigger jobs. For businesses and property managers, terms such as Net 15 or Net 30 are common. Put it on the estimate too."],
      ["Do I charge sales tax on labor?", "It depends on the state, the trade and the kind of job. Ask your accountant or your state tax office before you set a rate."],
    ],
    next: [
      ["/services/estimates-invoices-payments", "Invoices and text-to-pay, set up for you", "Customers pay from a link in a text."],
      ["/guides/best-invoicing-software-for-contractors", "Best invoicing software for contractors", "When a template stops being enough."],
      ["/tools/contractor-text-templates", "Payment reminder texts", "Polite wording for before and after the due date."],
    ],
  },
  {
    slug: "contractor-text-templates",
    path: "/tools/contractor-text-templates",
    name: "Contractor text templates",
    title: "Contractor Text Message Templates: 16 to Copy (Free)",
    description:
      "Free text message templates for contractors: appointment reminders, on-my-way texts, estimate follow-ups, payment reminders and seasonal offers to copy.",
    h1: "Text message templates for contractors",
    lede:
      "Sixteen texts you can copy for the moments that repeat every week: booking, reminders, on my way, estimates, invoices and past customers. Swap in your details and send.",
    card: "Sixteen copy-and-paste texts: reminders, on my way, estimates, payment and past customers.",
    heading: "Three rules for texting customers",
    method: [
      ["Get permission", "Text people who gave you their number for that purpose. Marketing texts need clear written consent, and every one needs a way to opt out."],
      ["Register your number", "US carriers want business texting registered (A2P 10DLC). Unregistered messages get blocked or filtered."],
      ["Write like a person", "Their name, the job, one question. Then have someone ready to reply, because most answers come within minutes."],
    ],
    faq: [
      ["Do I need permission to text customers?", "Yes. Messages about a job they asked for are treated differently from marketing, which needs prior written consent. Keep a record of consent and honor every STOP. If you're unsure, ask a lawyer about the TCPA and your state's rules."],
      ["What is A2P 10DLC?", "The US carrier registration for businesses that text from a normal 10-digit number. You register the business and what you send. Without it, texts are often blocked."],
      ["When should I send an appointment reminder?", "One the day before and an on-my-way text when the tech leaves covers most jobs. Two weeks out or more, add one a few days ahead."],
      ["Can these be sent automatically?", "Yes. A CRM can send reminders, on-my-way texts, estimate follow-ups and invoices when a job changes status. Setting that up is part of what we do."],
    ],
    next: [
      ["/tools/review-request-templates", "Review request templates", "The texts and emails that get Google reviews."],
      ["/services/crm-automation", "CRM and follow-up", "These messages, sent on their own."],
      ["/guides/how-to-follow-up-on-an-estimate", "How to follow up on an estimate", "Timing and wording, step by step."],
    ],
  },
  {
    slug: "phone-scripts",
    path: "/tools/phone-scripts",
    name: "Phone and voicemail scripts",
    title: "Voicemail Greetings & Phone Scripts for Contractors",
    description:
      "Free voicemail greetings and phone scripts for contractors: after hours, holidays, booking the job and answering \"how much will it cost?\" Copy and use them.",
    h1: "Voicemail greetings and phone scripts for contractors",
    lede:
      "Copy a voicemail greeting that gets a message, and short scripts for the calls that decide the job: the first 20 seconds, booking it, price questions and shoppers.",
    card: "Voicemail greetings and call scripts, including what to say about price.",
    heading: "What wins the call",
    method: [
      ["Answer, or reply fast", "Someone with a leak calls the next company if nobody answers. If you can't pick up, send a text right away."],
      ["Get the basics early", "Name, number, address and the problem in the first minute, in case the call drops."],
      ["Offer two times", "\"Tuesday morning or Wednesday afternoon?\" books more than \"when works for you?\""],
    ],
    faq: [
      ["What should a contractor's voicemail say?", "Your business name, your trade and town, that you're on a job, what to leave (name, number, problem) and when you'll call back. Offer texting too. Keep it under 20 seconds."],
      ["How do I answer \"how much will it cost?\"", "Don't guess. Say what the visit costs, what happens on it, and that they get a price in writing before work starts. Then offer a time."],
      ["Should I use an answering service or AI receptionist?", "If you miss calls on the job or after hours, yes. A person, an AI receptionist or a text-back all beat voicemail. Most owners start with the calls they miss now."],
      ["Do I have to tell callers the call is recorded or that it's AI?", "Some states require everyone on the call to agree to recording, and rules on AI voices are changing. The safe choice is to say so at the start of the call."],
    ],
    next: [
      ["/services/missed-call-text-back", "Missed-call text-back and AI receptionist", "So voicemail is the last resort, not the first."],
      ["/guides/ai-receptionist-for-contractors", "AI receptionists for contractors", "What they do well, and what they don't."],
      ["/tools/missed-call-calculator", "Missed call calculator", "What unanswered calls cost you."],
    ],
  },
  {
    slug: "google-review-link-generator",
    path: "/tools/google-review-link-generator",
    name: "Google review link & QR code",
    title: "Google Review Link Generator + Free QR Code",
    description:
      "Free Google review link and QR code generator. Paste your Place ID or profile link, get the direct review link, a QR code to print and a text to send.",
    h1: "Google review link and QR code generator",
    lede:
      "Paste your Google Place ID or profile link and get the link that opens the review box, a QR code you can print on cards and invoices, and a text to send. Free, with no sign-up.",
    card: "Your direct Google review link, a QR code to print and a text to send.",
    heading: "How to use it",
    method: [
      ["Get your link", "In your Google Business Profile, tap Ask for reviews and copy the link. Or use Google's Place ID finder and paste the ID here."],
      ["Print the code", "Put it on invoices, leave-behind cards, the truck or a counter sign. Scan it with your own phone first."],
      ["Ask everyone", "Send every customer the same link, right after the job. Don't offer anything for a review and don't filter out unhappy customers."],
    ],
    faq: [
      ["How do I find my Google review link?", "Search your business name on Google while signed in to the account that manages it, open your profile and choose Ask for reviews. Google shows a link and a QR code you can copy."],
      ["Does the QR code expire?", "No. The code is just your link drawn as a picture, so it works as long as Google keeps your profile at that link. We don't track scans and there's no subscription."],
      ["What is a Google Place ID?", "The code Google uses for one place on the map. It starts with letters such as ChIJ. Added to Google's write-a-review address, it opens the review box for your business."],
      ["Are QR code reviews allowed by Google?", "Yes. Google offers its own review QR code. What isn't allowed is paying for reviews, asking only happy customers or having reviews left by people who weren't customers."],
    ],
    next: [
      ["/guides/google-review-qr-code-and-nfc-cards", "QR codes and NFC review cards", "Where they work, and when a text works better."],
      ["/tools/review-request-templates", "Review request templates", "What to write next to the link."],
      ["/services/review-generation", "Review generation, done for you", "Every customer asked, every review answered."],
    ],
  },
  {
    slug: "lead-response-calculator",
    path: "/tools/lead-response-calculator",
    name: "Lead response calculator",
    title: "Speed to Lead Calculator for Contractors (Free)",
    description:
      "Free speed-to-lead calculator for home-service businesses: what replying faster to calls, forms and texts is worth each month, using your own win rates.",
    h1: "Speed to lead calculator",
    lede:
      "Speed to lead is how long a new lead waits for your first reply. Put in your own win rates for quick and slow replies and see what the difference is worth.",
    card: "What replying faster to new leads is worth each month.",
    heading: "The math, in plain English",
    method: [
      ["More jobs", "Leads a month, times the gap between your two win rates."],
      ["Revenue and profit", "Those jobs times your average job value, then times your gross margin."],
      ["Your own data", "Plenty of sites quote a multiplier for replying within five minutes. Most trace back to old call-center studies, so this calculator uses your numbers instead."],
    ],
    faq: [
      ["What is speed to lead?", "The time between a new lead arriving (a call, text, form or message) and your first real reply. An auto-text counts only if it starts a conversation."],
      ["How fast should a contractor respond to a lead?", "Within a few minutes in working hours, because urgent callers are contacting several companies. After hours, an instant text with a real time for the callback is better than silence."],
      ["How do I measure my response time?", "For one month, write down when each lead came in, when you first replied and whether it became a job. A CRM records this for you."],
      ["How can I reply faster without hiring?", "Missed-call text-back, an instant reply to web forms, a booking link, and an AI receptionist for calls you can't take."],
    ],
    next: [
      ["/services/missed-call-text-back", "Missed-call text-back", "The first reply, sent within seconds."],
      ["/tools/missed-call-text-templates", "Missed-call text templates", "What that text should say, by trade."],
      ["/services/unified-inbox", "One inbox", "Calls, texts, web chat and messages in one place."],
    ],
  },
  {
    slug: "google-business-description-generator",
    path: "/tools/google-business-description-generator",
    name: "Google description generator",
    title: "Google Business Profile Description Generator (Free)",
    description:
      "Write your Google Business Profile description: a plain template for contractors, a 750-character counter and a check for what Google doesn't allow.",
    h1: "Google Business Profile description generator",
    lede:
      "Fill in six boxes and get a plain, true description for your Google profile, with a 750-character counter and a check for links, phone numbers and promotions.",
    card: "A plain description for your Google profile, checked against Google's rules.",
    heading: "What makes a good description",
    method: [
      ["Say what and where", "Trade, main services and towns in the first sentence. Many people only see the beginning."],
      ["Keep it true", "Years in business, who does the work, what customers can count on. Nothing you couldn't show someone."],
      ["Leave out the ads", "Google doesn't want links, HTML, or a focus on prices and promotions here. Use posts for offers."],
    ],
    faq: [
      ["How long can a Google Business Profile description be?", "Up to 750 characters. Put the important part first because the rest is often hidden behind a More link."],
      ["Does the description help me rank?", "Don't count on it. Your categories, services, reviews and location matter far more. The description helps the person reading it decide to call."],
      ["Can I put my phone number or website in it?", "No links. Your phone number and website have their own fields, so use the space for what you do."],
      ["Should I list every town?", "A few main ones. Your service areas go in their own setting, where Google lets you add up to 20."],
    ],
    next: [
      ["/guides/google-business-profile-service-area", "Service-area setup", "Hide your address the right way and choose your areas."],
      ["/services/google-business-profile", "Google Business Profile management", "We set it up, post and reply for you."],
      ["/tools/google-review-link-generator", "Review link and QR code", "The next thing to set up."],
    ],
  },
  {
    slug: "missed-call-text-templates",
    path: "/tools/missed-call-text-templates",
    name: "Missed-call text templates",
    title: "Missed-Call Text-Back Templates by Trade (Free to Copy)",
    description:
      "Missed-call text-back templates for contractors: working hours, after hours and emergencies, for plumbing, HVAC, electrical, roofing, cleaning and more.",
    h1: "Missed-call text-back templates",
    lede:
      "Thirteen texts to send when you can't pick up: working hours, after hours, urgent trades and planned work. Copy one, or have it sent automatically.",
    card: "What to text after a missed call, by trade and time of day.",
    heading: "What makes them work",
    method: [
      ["Send it in seconds", "A caller with a problem dials the next company straight away. The text has to land before they do."],
      ["Ask one easy question", "Something they can answer with a word or a photo. A question gets a reply; \"we'll call you back\" doesn't."],
      ["Have someone reply", "The text only buys you a few minutes. Route replies to a phone that gets checked."],
    ],
    faq: [
      ["What should a missed-call text say?", "Who you are, that you're sorry you missed them, and one easy question. Around 160 characters keeps it to a single text."],
      ["Is it legal to text someone who called me?", "They contacted you about a service, so a reply about that is generally treated as a response, not marketing. Register the number (A2P 10DLC), include opt-out wording where your registration requires it, and don't add them to marketing lists. Ask a lawyer if you're unsure."],
      ["Can landlines get the text?", "Not usually. Calls from landlines need a callback, so keep a missed-call list as well."],
      ["How do I send it automatically?", "With a CRM or phone system that watches your business line. That's the missed-call text-back we set up."],
    ],
    next: [
      ["/services/missed-call-text-back", "Missed-call text-back", "Sent for you, within seconds."],
      ["/guides/missed-call-text-back-vs-ai-receptionist", "Text-back vs. AI receptionist vs. answering service", "Which one suits your calls."],
      ["/tools/missed-call-calculator", "Missed call calculator", "What missed calls cost you now."],
    ],
  },
  {
    slug: "review-response-templates",
    path: "/tools/review-response-templates",
    name: "Review response templates",
    title: "Review Response Templates for Contractors (Good & Bad)",
    description:
      "Copy-and-paste replies to Google reviews for home-service companies: 5-star, price complaints, no-shows, callbacks, wrong company and fake reviews.",
    h1: "Google review response templates for contractors",
    lede:
      "Twelve replies for the reviews contractors really get, from five stars to \"never showed up\" to one from somebody you've never met.",
    card: "Replies to good, bad and not-a-customer reviews.",
    heading: "How to reply well",
    method: [
      ["Write for the next reader", "The reviewer already decided. Future customers are reading how you act when something goes wrong."],
      ["Keep details private", "No addresses, prices, phone numbers or arguments about who said what. Move it to a call."],
      ["Never trade or threaten", "Don't offer anything for changing a review, and don't threaten legal action over an honest one. Google and the FTC both have rules on this."],
    ],
    faq: [
      ["Should I respond to every Google review?", "Yes, if you can. In BrightLocal's 2026 survey of 1,002 US adults, 89% said they expect owners to reply to reviews."],
      ["How do I respond to a fake review?", "Reply once, calmly, saying you can't find the job and giving a number to call. Then report it to Google as a policy violation from your profile."],
      ["Can I get a bad review removed?", "Only if it breaks Google's content policies. A harsh but honest review stays, so a good reply and newer reviews are what help."],
      ["Can I ask a customer to change a review after I fix the problem?", "You can tell them it's fixed and leave the choice to them. Don't offer money, discounts or refunds in exchange."],
    ],
    next: [
      ["/guides/is-review-gating-allowed", "Is review gating allowed?", "What Google and the FTC say."],
      ["/tools/review-request-templates", "Review request templates", "How to ask in the first place."],
      ["/services/review-generation", "Review generation", "We ask every customer and reply to every review."],
    ],
  },
];
