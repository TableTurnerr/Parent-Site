// Service pages for what we set up on our CRM (added 2026-11-25). The CRM is built on HighLevel, so every capability here
// was checked against HighLevel's own help center on 2026-11-24/25. Rules for this file: only generally available
// features (their Field Services module is a private beta: leave it out), and no promise about fees that come from
// carriers, card processors or AI usage. Re-check before adding anything.
const HL = (id) => `https://help.gohighlevel.com/support/solutions/articles/${id}`;

export const services2 = [
  {
    slug: 'online-booking', short: 'Online booking',
    path: '/services/online-booking',
    title: 'Online Booking for Home-Service Businesses | TableTurnerr',
    description: 'We set up online booking for contractors: a booking page with your services, real openings, reminders, deposits and a link for your Google profile.',
    eyebrow: 'Online booking',
    h1: 'Let customers book while you\'re on the job',
    lede: 'A booking page shows your real openings and puts the visit on your calendar, day or night. We build it, connect it to your calendar, add it to your website and Google profile, and write the reminders.',
    includedIntro: 'Set up for you, tested with a real booking before it goes live.',
    included: [
      ['A booking page', 'Your logo, your services and how long each takes. It works as a link, on your website and from a text.'],
      ['Real openings only', 'Synced with Google or Outlook, with buffers between visits, so nobody books over another job.'],
      ['The questions you need', 'Address, problem, photos and how to get in, asked before the visit.'],
      ['Reminders and changes', 'Confirmation and reminder messages, and a link to reschedule or cancel up to the cut-off you choose.'],
      ['Deposits, if you want them', 'A flat amount or a percentage at booking, through your own payment account.'],
      ['More than one person', 'Share estimate visits across your team in turn, or only offer times when two people are both free.'],
    ],
    steps: [
      ['Decide', 'On a short call we pick what can be booked online and what needs a call first.'],
      ['Build', 'We set up the page, calendar sync, messages and any deposit, then book a test visit together.'],
      ['Share', 'It goes on your website, Google profile, missed-call texts and invoices.'],
    ],
    deepDive: `
<h2>What to put online, and what not to</h2>
<p>Book online: estimate visits, tune-ups, cleanings, inspections and anything with a known length. Keep on the phone: emergencies, multi-day work and jobs you can't size without seeing. For those, the page can take a request instead and you confirm the time.</p>
<h2>What it won't do</h2>
<p>A booking calendar knows your free time, not your route. It won't plan drive time between jobs or run a dispatch board. If you need that, keep <a href="/integrations/jobber">Jobber</a> or <a href="/integrations/housecall-pro">Housecall Pro</a> and use their booking, or let us handle estimate visits and leave jobs to them. Details: <a href="/guides/online-booking-for-home-services">how online booking works for home services</a>.</p>
<h2>The Book button on Google</h2>
<p>Google lets you add a booking link to your Business Profile. Some booking providers also get Google's own Book button. We add whichever your profile allows. <a href="/guides/book-online-button-on-google">Here's how that works.</a></p>`,
    faq: [
      ['Will people book over my existing jobs?', 'No, as long as those jobs are on the connected calendar. We set buffers and a minimum notice so you don\'t wake up to a 7 a.m. surprise.'],
      ['Can I charge a deposit at booking?', 'Yes, through a connected payment account such as Stripe. Some states limit deposits on home-improvement contracts, so check yours first.'],
      ['Can I limit how far I travel?', 'We ask for the address or zip code and follow up if it\'s outside your area. The calendar doesn\'t plan routes.'],
      ['What does it cost?', 'It runs on the CRM, included from {{PRICE:pkgGrowth}}. We confirm the setup, and any text or card-processing fees, in writing before you start.'],
    ],
  },
  {
    slug: 'estimates-invoices-payments', short: 'Estimates, invoices & text-to-pay',
    path: '/services/estimates-invoices-payments',
    title: 'Estimates, Invoices & Text-to-Pay Setup | TableTurnerr',
    description: 'Send estimates customers can approve on their phone, collect signatures and deposits, and get paid from a text. Set up for home-service companies.',
    eyebrow: 'Get paid faster',
    h1: 'Estimates they can sign and invoices they can pay by text',
    lede: 'Paper estimates get lost and mailed invoices get paid late. We set up estimates that customers approve on their phone, documents they sign, and invoices with a pay link, plus the reminders that go with them.',
    includedIntro: 'Built around how you already quote and bill.',
    included: [
      ['Estimates by text and email', 'Your line items and logo. The customer accepts or declines on their phone, and an accepted one becomes an invoice.'],
      ['E-signatures', 'Contracts, change orders and work authorizations signed on a phone, with a record of who signed and when.'],
      ['Text-to-pay', 'An invoice link in a text. Card or bank payment, and phone wallets where the customer\'s device supports them.'],
      ['Card on file', 'With the customer\'s permission, for repeat visits and plans. Card details stay with the payment company.'],
      ['Payment schedules', 'Deposit, progress and final payment on bigger jobs.'],
      ['Reminders that stop', 'Estimate follow-ups and invoice reminders that end when they reply or pay.'],
    ],
    steps: [
      ['Connect', 'You open or connect your own payment account. The money goes to you, never through us.'],
      ['Build', 'We set up your items, estimate and invoice designs, terms and messages.'],
      ['Run', 'You send from your phone. Follow-ups go out on their own.'],
    ],
    deepDive: `
<h2>Already invoicing somewhere else?</h2>
<p>If your job software already sends invoices you like, keep it. Two systems sending invoices is worse than one. We can still run the estimate follow-up around it. The CRM also has a QuickBooks connection that can <a href="${HL('48001153903')}" rel="noopener">send its invoices and receipts to QuickBooks Online</a>.</p>
<h2>Pay-later options</h2>
<p>Through Stripe, some customers may be able to pay a one-time invoice with Affirm, Klarna or Afterpay. The customer applies and the provider decides. It isn't a home-improvement loan, and fees apply to you, so compare it with lenders your suppliers work with.</p>
<h2>Deposits have rules</h2>
<p>Some states cap the deposit on home-improvement work. California, for example, limits it to 10% or $1,000, whichever is less. See <a href="/guides/contractor-deposits">contractor deposits: how much you can ask for</a>.</p>`,
    faq: [
      ['Do you take a cut of payments?', 'No. Payments go into your own payment account. The payment company charges its normal processing fee.'],
      ['Can customers pay without an account?', 'Yes. They open the link and pay. There\'s nothing to install.'],
      ['Is an e-signature valid on a contract?', 'In general, US law recognizes electronic signatures. Some documents and states have extra rules, so ask a lawyer about your contract.'],
      ['Does it replace QuickBooks?', 'No. It sends the estimate and collects the money. Your bookkeeping stays in QuickBooks or wherever your accountant wants it.'],
    ],
  },
  {
    slug: 'maintenance-plans', short: 'Maintenance plans & memberships',
    path: '/services/maintenance-plans',
    title: 'Maintenance Plan Setup for Home Services | TableTurnerr',
    description: 'Sell and bill maintenance plans without spreadsheets: a sign-up page, automatic monthly payments, visit reminders and renewal messages, set up for you.',
    eyebrow: 'Recurring revenue',
    h1: 'A maintenance plan that bills itself',
    lede: 'Plans bring steady income in slow months and keep customers from shopping around. The hard part is the admin. We set up the sign-up page, the automatic billing and the reminders, so a plan doesn\'t live in a spreadsheet.',
    includedIntro: 'You decide what the plan includes. We build the system around it.',
    included: [
      ['Sign-up page', 'What\'s included, what isn\'t, the price and the terms, with a card or bank payment at the end.'],
      ['Automatic billing', 'Monthly or yearly charges through your payment account, with a message when one fails.'],
      ['Visit reminders', 'Recurring appointments and messages when a visit is due.'],
      ['A member list', 'Who\'s on which plan, since when, and what they have installed.'],
      ['Offer messages', 'Texts and emails to past customers and after good jobs, with permission and opt-outs.'],
      ['Renewal and win-back', 'A heads-up before yearly renewals, and a friendly note to members who leave.'],
    ],
    steps: [
      ['Price it', 'We work out the floor price from your cost per visit.'],
      ['Build it', 'Sign-up page, billing, member list and messages.'],
      ['Sell it', 'A script for your techs, plus a campaign to the customers who already trust you.'],
    ],
    deepDive: `
<h2>Is a plan right for your trade?</h2>
<p>Plans suit work that repeats on a calendar: HVAC tune-ups, water heaters and plumbing checks, pest control, pools, lawns, gutters, garage doors. They're a poor fit for one-off projects such as a roof or a remodel. Put your numbers in the <a href="/tools/maintenance-plan-calculator">maintenance plan calculator</a> first.</p>
<h2>What the system tracks, and what it doesn't</h2>
<p>It bills members, keeps the list and reminds people. It doesn't count which included visits have been used the way some field-service software does. If you have hundreds of members and technicians on routes, run the plan inside your job software and let us fill it.</p>
<h2>Read your state's rules first</h2>
<p>Many states have automatic-renewal laws, and some trades have service-contract rules. Clear terms, real consent and easy cancellation are the minimum. Have a lawyer read your terms.</p>`,
    faq: [
      ['How many plans should I offer?', 'Start with one. Two or three levels help later, once you know what people ask for.'],
      ['Can members cancel online?', 'We build a simple way to cancel. Some states require it, and people sign up more easily when leaving is easy.'],
      ['Can I move my existing members over?', 'Yes. We import the list. Each member re-enters their payment details on the new page, because card numbers can\'t be copied across.'],
      ['What does it cost?', 'The sign-up page, billing and reminders run on the CRM, included from our Growth package. The Partner package adds designing and selling the plan with you: the offer, a script for your techs and a campaign to past customers. We confirm setup and any processing fees in writing first.'],
    ],
  },
  {
    slug: 'email-sms-campaigns', short: 'Email & text campaigns',
    path: '/services/email-sms-campaigns',
    title: 'Email & Text Marketing for Contractors | TableTurnerr',
    description: 'Seasonal email and text campaigns to the customers you already have: tune-up reminders, win-backs and offers, written and sent for you with permission.',
    eyebrow: 'Campaigns',
    h1: 'Bring back the customers you already earned',
    lede: 'Your cheapest job is the next one from somebody who already paid you. We clean up your customer list, write short messages in your voice and send them at the right time of year, only to people you have permission to contact.',
    includedIntro: 'You approve every message before it goes out.',
    included: [
      ['Your list, cleaned', 'Duplicates merged, wrong numbers removed, customers grouped by job and date.'],
      ['Seasonal reminders', 'Tune-ups, gutters, opening and closing, pre-storm checks: the right people at the right time.'],
      ['Win-back messages', 'A friendly check-in to customers you haven\'t heard from in a year or more.'],
      ['Old estimates', 'A last check on quotes that went quiet.'],
      ['Replies handled', 'Answers land in one inbox, so "yes" turns into a booked visit.'],
      ['Plain results', 'Messages sent, replies, bookings and opt-outs, every month.'],
    ],
    steps: [
      ['Check permission', 'We go through where each contact came from and what they agreed to. No permission, no marketing text.'],
      ['Write', 'Two or three short messages per campaign. You approve them.'],
      ['Send and book', 'Sent in batches so your phone can keep up with the replies.'],
    ],
    deepDive: `
<h2>Permission comes first</h2>
<p>Marketing texts in the US need prior written consent, carrier registration and an opt-out that works. Texas and other states have extra rules. We register your business, keep the consent record and honor every opt-out. Old lists without clear consent get email or a phone call instead. Background: <a href="/guides/a2p-10dlc-for-contractors">A2P 10DLC for contractors</a>.</p>
<h2>What to send when</h2>
<p>The <a href="/guides/home-service-marketing-calendar">home-service marketing calendar</a> lists what past customers need each season, by trade. For wording, copy the <a href="/tools/contractor-text-templates">text templates</a>.</p>`,
    faq: [
      ['Can I text everyone in my phone?', 'Not for marketing. You need each person\'s consent. Messages about a job they\'ve booked are different.'],
      ['How often should I send?', 'For most trades, a few times a year plus one useful reminder per season. More than that and people opt out.'],
      ['Can you use my Jobber or QuickBooks customers?', 'Yes. Export the list and we import it, with the job date so we can group people sensibly.'],
      ['What does it cost?', 'Seasonal campaigns to past customers are {{PRICE:campaigns}}. Carrier and message fees depend on volume and we confirm them first.'],
    ],
  },
  {
    slug: 'unified-inbox', short: 'One inbox & website chat',
    path: '/services/unified-inbox',
    title: 'One Inbox for Calls, Texts & Web Chat | TableTurnerr',
    description: 'Calls, texts, emails, web chat, Facebook and Instagram messages in one inbox on your phone, with AI replies if you want them. Set up for contractors.',
    eyebrow: 'One inbox',
    h1: 'Every customer message in one place',
    lede: 'Leads arrive by call, text, email, web form, Facebook and Instagram, and one always gets missed. We put them in one inbox with an app, so you or your office can see the whole conversation and answer from the truck.',
    includedIntro: 'Connected, tested and explained in one short call.',
    included: [
      ['One thread per customer', 'Calls, texts, emails and messages for the same person, in order.'],
      ['Website chat', 'A chat bubble that turns into a text conversation, so it carries on after they leave the page.'],
      ['Facebook and Instagram', 'Messages to your business pages come to the same inbox.'],
      ['Google review threads', 'New reviews show up too, ready for a reply.'],
      ['AI replies, if you want them', 'An assistant that answers common questions, collects the details and offers times, then hands over to a person.'],
      ['Who answers what', 'Assign conversations, leave notes and see what\'s still waiting.'],
    ],
    steps: [
      ['Connect', 'Your number, website, email and social pages.'],
      ['Set the rules', 'Who gets notified, when the assistant answers and when it must hand over.'],
      ['Use it', 'You get the app and a walkthrough. We stay on call.'],
    ],
    deepDive: `
<h2>What about Google messages?</h2>
<p>Google switched off chat in Business Profiles on July 31, 2024. Your profile can show a text or WhatsApp link instead, which can point at the number in your inbox.</p>
<h2>Where AI helps, and where it shouldn't</h2>
<p>It's good at "do you cover my town", "how soon" and collecting an address. It should never give a price it can't stand behind or diagnose a gas smell. We write what it may say, what it must not, and when it calls in a person. It can still make mistakes, so someone should read the conversations.</p>`,
    faq: [
      ['Do I need a new phone number?', 'Usually not. We can forward or move your number. Texting needs a number that\'s registered for business messaging.'],
      ['Can my office and I both use it?', 'Yes. Add people, choose what each can see and assign conversations.'],
      ['Does it work with my email?', 'Yes. Replies from the inbox go out from your business address.'],
      ['Is AI required?', 'No. Plenty of owners use the inbox with people only.'],
    ],
  },
  {
    slug: 'call-tracking', short: 'Call tracking & reporting',
    path: '/services/call-tracking',
    title: 'Call Tracking for Contractors | TableTurnerr',
    description: 'See which calls came from Google, your website, ads or yard signs, hear how they went, and get a plain monthly report. Set up for home-service companies.',
    eyebrow: 'Call tracking',
    h1: 'Know which marketing makes the phone ring',
    lede: 'If you can\'t say where last month\'s jobs came from, you can\'t tell what to stop paying for. We set up tracking numbers, call reports and one page each month that shows what brought calls and what they turned into.',
    includedIntro: 'Set up without breaking your Google listing.',
    included: [
      ['A number per source', 'Google profile, website, mailers, trucks and lead sites, all ringing your phone.'],
      ['Set up right on Google', 'The tracking number goes first and your real number stays on the profile as an extra, so your listings still match.'],
      ['Website tracking', 'The number on your site can change by how the visitor found you.'],
      ['Call records', 'Answered, missed, length and outcome. Recording and transcripts are optional.'],
      ['Missed-call safety net', 'Missed calls can trigger a text back.'],
      ['Monthly report', 'Calls, forms, bookings and where each came from, in plain English.'],
    ],
    steps: [
      ['List', 'We list every place your number appears.'],
      ['Set up', 'Numbers, forwarding, greeting and reports.'],
      ['Compare', 'After a couple of months you can see cost per job by source.'],
    ],
    deepDive: `
<h2>Recording calls</h2>
<p>Some states require everyone on the call to agree to recording. The safe habit is a short announcement at the start. If you don't need recordings, leave them off.</p>
<h2>What tracking can't tell you</h2>
<p>No report is perfect. People see a truck, search your name and call from Google. Ask every new customer how they heard about you and compare. Then put the numbers into the <a href="/tools/cost-per-lead-calculator">cost per lead calculator</a>.</p>`,
    faq: [
      ['Will a tracking number hurt my Google ranking?', 'Not if it\'s set up properly: tracking number as the main number, your real number added as a second one, and the same business details everywhere else.'],
      ['Do I keep my number?', 'Yes. Tracking numbers forward to the phone you use now.'],
      ['Can I listen to calls?', 'Yes, if you turn on recording and follow your state\'s consent rules.'],
      ['What does it cost?', 'It runs on the CRM, included from {{PRICE:pkgGrowth}}. Extra numbers and call minutes are usage-based and we confirm them first.'],
    ],
  },
  {
    slug: 'social-media-posting', short: 'Social media posting',
    path: '/services/social-media-posting',
    title: 'Social Media Posting for Contractors | TableTurnerr',
    description: 'Job photos, reviews and tips posted to your Google profile, Facebook and Instagram every week, planned and published for you. Included in {{PRICE:pkgStarter}}.',
    eyebrow: 'Social media',
    h1: 'Your work, posted every week without you',
    lede: 'A page last updated in 2023 makes a homeowner wonder if you\'re still in business. Send us job photos and we turn them into posts on your Google profile, Facebook and Instagram, with the same message everywhere.',
    includedIntro: 'Included with Google Business Profile management.',
    included: [
      ['Posts from real jobs', 'Before and after photos, with the town and the work in the caption.'],
      ['Google profile posts', 'Updates and offers where people are already looking for you.'],
      ['Facebook and Instagram', 'The same content, sized and worded for each.'],
      ['Reviews as posts', 'Good reviews turned into simple graphics.'],
      ['A calendar you can see', 'Planned ahead. Change or stop anything.'],
      ['What people did', 'Views, clicks and messages in your monthly report.'],
    ],
    steps: [
      ['Connect', 'You give us access to the pages. They stay yours.'],
      ['Collect', 'Text us photos from the job. No app to learn.'],
      ['Post', 'We write, schedule and publish, and tell you when someone asks a question.'],
    ],
    deepDive: `
<h2>Does posting bring jobs?</h2>
<p>On its own, rarely. Posts make the profile look alive when somebody is deciding between you and two others, and they give past customers something to share. Reviews and answering the phone bring more work, so we do those first.</p>
<h2>What to photograph</h2>
<p>Wide shot before, the same angle after, one detail, the crew, the truck out front. Ask before showing a house number or a face. More ideas by trade in our <a href="/guides/handyman-marketing-ideas">marketing ideas</a> and the <a href="/guides/home-service-marketing-calendar">marketing calendar</a>.</p>`,
    faq: [
      ['Which platforms do you post to?', 'Your Google Business Profile, Facebook and Instagram. Ask us about others.'],
      ['What if I don\'t have photos?', 'We start with reviews, tips and your team, and give your crew a one-minute photo habit.'],
      ['Do you answer comments and messages?', 'We let you know, and from the Growth package up, messages come into one inbox. You or your office reply.'],
      ['What does it cost?', 'It comes with Google Business Profile management in {{PRICE:pkgStarter}}, with reviews included.'],
    ],
  },
  {
    slug: 'hiring-pages', short: 'Hiring pages & applicant follow-up',
    path: '/services/hiring-pages',
    title: 'Hiring Pages for Home-Service Companies | TableTurnerr',
    description: 'A hiring page that works on a phone, a short application, quick replies to applicants and a board to track them. Built for plumbing, HVAC and other trades.',
    eyebrow: 'Hiring',
    h1: 'Good techs apply to whoever answers first',
    lede: 'Hiring works like leads: the fast, clear company wins. We build a page that says what the job pays and what a week looks like, a two-minute application and the messages that keep applicants warm until you talk.',
    includedIntro: 'The same system that follows up customers, pointed at applicants.',
    included: [
      ['A hiring page', 'Pay range, schedule, area, tools, training and photos of your real crew.'],
      ['Short application', 'Two minutes on a phone. No resume needed to start.'],
      ['Instant reply', 'A text or email right away with the next step and a link to book a call.'],
      ['Applicant board', 'New, called, interview, trial, hired, no. So nobody is forgotten.'],
      ['Job post markup', 'JobPosting data, so the opening can be eligible for job search on Google.'],
      ['Onboarding checklist', 'Forms, training videos and first-week tasks in one link.'],
    ],
    steps: [
      ['Write it', 'One call about the job, the pay and who does well with you.'],
      ['Build it', 'Page, application, replies and board.'],
      ['Share it', 'Your site, Google profile, social pages, trucks and a code for the supply-house counter.'],
    ],
    deepDive: `
<h2>Put the pay on the page</h2>
<p>Applicants skip ads without it, and some states and cities now require a pay range in job posts. A range is fine if it's honest.</p>
<h2>Keep it fair</h2>
<p>Ask only what you need for the job. Don't let software reject people. Questions about age, family, health or background checks have legal limits, so have someone who knows employment law read your form.</p>`,
    faq: [
      ['Is this a recruiting agency?', 'No. We build the page and the follow-up. You interview and decide.'],
      ['Can I use it with Indeed or Facebook?', 'Yes. Point those posts at your page, so every applicant lands in one board.'],
      ['How long does it take?', 'It depends on how quickly we get the details and photos. We give you a date on the first call.'],
      ['What does it cost?', 'It runs on the website and CRM, included from {{PRICE:pkgGrowth}}. We confirm what\'s included before you start.'],
    ],
  },
].map((s) => ({ ...s, crumbs: [['/', 'Home'], ['/services', 'Services'], [s.path, s.short]] }));
