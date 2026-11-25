// Google review guides (added 2026-11-24). Topics picked from Google autocomplete: "how to get more google reviews
// (for my business / fast / from customers)", "how to ask past clients for reviews", "why are my google reviews not
// showing up", "google review cards nfc / qr code". Policy points checked against Google's help pages that day.
const DATE = "2026-11-24";
const POLICY = `<a href="https://support.google.com/contributionpolicy/answer/7400114" rel="noopener">Google's review policy</a>`;
const SURVEY = `<a href="https://www.brightlocal.com/research/local-consumer-review-survey/" rel="noopener">BrightLocal's 2026 survey of 1,002 US adults</a>`;

export const guides4 = [
  {
    slug: "how-to-get-more-google-reviews",
    path: "/guides/how-to-get-more-google-reviews",
    title: "How to Get More Google Reviews for Your Business (2026)",
    description: "Nine ways home-service businesses get more Google reviews: who to ask first, what to text, when to send it, and the Google rules that get reviews removed.",
    h1: "How to get more Google reviews for your business",
    lede: "The fastest way to get more Google reviews is to text the customers you already have. Here's the order we do it in for home-service businesses, the exact messages, and the rules that keep your reviews from being removed.",
    eyebrow: "Google reviews", readMinutes: 5, article: { date: DATE },
    ctaTitle: "Want us to run your reviews for you?",
    content: `
<div class="callout"><p><strong>Short version:</strong> copy your direct Google review link, text it to every customer from the last year or two, send one reminder, then send the same request automatically after every new job. Ask everyone, never offer a reward, and reply to every review.</p></div>
<h2>Why reviews decide who gets the call</h2>
<p>A homeowner looking at three plumbers on Google Maps compares two things before they call: how many reviews each one has and how recent they are. In ${SURVEY}, 47% said they won't use a business with fewer than 20 reviews, and 74% said they only care about reviews from the last three months.</p>
<p>So you need two things: enough reviews to look established, and new ones coming in every month. A burst two years ago doesn't do it.</p>
<h2>1. Get your direct review link</h2>
<p>Open your Google Business Profile, choose <em>Ask for reviews</em> and copy the link. It opens the review box directly. Never send people to your website or tell them to "find us on Google." Every extra tap loses some of them.</p>
<h2>2. Text your past customers first</h2>
<p>This is where the quick reviews are. You already have their numbers in your CRM, your invoicing software or your phone, and most of them were never asked.</p>
<p>In our experience, 15 texts to recent past customers can bring in around 5 to 7 reviews when the work was good. Some lists do better and some do worse. It depends on how good the job was, how recently you did it and whether the customer remembers you. Our client <a href="/results/presidential-roofing">Presidential Roofing went from 27 to 43 reviews in 20 days</a>, with a past-customer campaign and a request after every new job.</p>
<p>We wrote a full walkthrough with the messages and a day-by-day plan: <a href="/guides/ask-past-customers-for-google-reviews">how to ask past customers for Google reviews</a>.</p>
<h2>3. Ask after every job, the same day</h2>
<p>Once the past customers are done, the steady flow comes from new jobs. Send the request the day the job is finished, while the customer is still happy about the working furnace or the clean gutters.</p>
<blockquote class="callout"><p>Hi Sarah, it's Dave from Northside Plumbing. Thanks for having us out today. If you have a minute, a Google review really helps a small company like ours: [link]</p></blockquote>
<p>Short, from a real person, one link. More versions are in our free <a href="/tools/review-request-templates">review request templates</a>.</p>
<h2>4. Make it automatic</h2>
<p>If it depends on someone remembering, it stops in the first busy week. Set the request to go out by itself when a job is marked complete or an invoice is paid. Here's how in <a href="/guides/jobber-google-reviews">Jobber</a>, <a href="/guides/housecall-pro-google-reviews">Housecall Pro</a>, <a href="/guides/servicetitan-review-requests">ServiceTitan</a> and <a href="/guides/workiz-google-reviews">Workiz</a>.</p>
<h2>5. Send one reminder</h2>
<p>Many people mean to do it and forget. One friendly nudge a few days later is fine. More than one starts to annoy them.</p>
<h2>6. Add a photo of you or your crew</h2>
<p>A text from a number people don't recognize gets ignored. One with a picture of the person who fixed their AC doesn't look like spam. That's how our own review requests go out.</p>
<h2>7. Hand over a review card</h2>
<p>A card with a QR code or an NFC chip puts the review page one tap away while you're packing up. Hand it over, say thanks, and leave it at that. See <a href="/guides/google-review-qr-code-and-nfc-cards">Google review QR codes and NFC cards</a>.</p>
<h2>8. Reply to every review</h2>
<p>In the same survey, 89% of people expect owners to respond, and half said generic copy-paste replies put them off. Two sentences that mention the job is enough. For a bad review, stay calm, say what you'll do about it and take it offline. The reply is for the next customer, not the angry one.</p>
<h2>9. Put the link everywhere customers look</h2>
<p>Put the review link in your email signature, on invoices and on the thank-you page of your website. None of these bring many on their own, but they run forever.</p>
<h2>What gets your reviews removed</h2>
<p>${POLICY} has become stricter. These all break it:</p>
<ul>
<li><strong>Rewards.</strong> Discounts, gift cards, raffle entries or free service in exchange for a review, or for changing one.</li>
<li><strong>Only asking happy customers.</strong> It's called review gating. Ask everyone the same way.</li>
<li><strong>Review quotas for staff.</strong> Google lists asking staff to collect a certain number of reviews as prohibited.</li>
<li><strong>Scripting the review.</strong> That includes having staff ask customers to mention them by name. Ask for an honest review and leave the words to the customer.</li>
<li><strong>Pressure on the spot.</strong> Don't require or push anyone to write it while you're there.</li>
<li><strong>Reviews from your own people.</strong> Google treats current and former employment as a conflict of interest.</li>
</ul>
<p>If your reviews are already disappearing, read <a href="/guides/google-reviews-not-showing-up">why Google reviews don't show up</a>.</p>
<h2>How many reviews do you need?</h2>
<p>Enough to match the three businesses at the top of Google Maps in your town. Our free <a href="/tools/google-review-calculator">Google review calculator</a> works out your number and how long it will take. There's more in <a href="/guides/how-many-google-reviews-to-rank">how many reviews you need to rank</a>.</p>
<h2>Doing it yourself or having it done</h2>
<p>Everything above is free to do yourself. The hard part is keeping it up for a year. If you'd rather not, our <a href="/services/review-generation">review generation service</a> texts past customers, asks after every job and replies to every review, from $97 a month with no contract.</p>`,
    faq: [
      ["How can I get Google reviews fast?", "Text your direct Google review link to every customer from the last year or two, then send one reminder a few days later. Past customers are the quickest source because you already have their numbers and most were never asked."],
      ["How do I get more Google reviews for free?", "Copy your review link from Google Business Profile and text or email it yourself to every customer. It costs nothing but time. Software only saves you from having to remember."],
      ["Is it OK to ask customers for Google reviews?", "Yes. Google allows you to ask for honest reviews. You can't offer anything in return, ask only the customers you expect to be happy, or tell them what to write."],
      ["Can I buy Google reviews?", "No. Paid reviews break Google's policy, are removed when found, and can get your profile restricted."],
      ["What is the best way to ask for a Google review?", "A short text the same day as the job, from a real person, with a direct review link. Email works as a backup."],
    ],
  },

  {
    slug: "ask-past-customers-for-google-reviews",
    path: "/guides/ask-past-customers-for-google-reviews",
    title: "How to Ask Past Customers for Google Reviews (With Texts)",
    description: "A 7-day plan to get Google reviews from past customers: who to text, the exact messages, how to handle replies, and the texting and Google rules to follow.",
    h1: "How to ask past customers for Google reviews",
    lede: "You have a list of people who already paid you, liked the work and were never asked. Text 15 of them this week. Here's the plan, message by message.",
    eyebrow: "Past-customer reviews", readMinutes: 5, article: { date: DATE },
    ctaTitle: "Want us to run this campaign for you?",
    content: `
<div class="callout"><p><strong>Short version:</strong> export your customers from the last 12 to 24 months, text them in small batches of about 15 a day with your direct review link, use their name and the job you did, send one reminder after three days, and reply to everyone.</p></div>
<h2>Why past customers work so well</h2>
<p>A new customer has to be won first. A past customer already knows you. They let you into their house, the problem got fixed and they paid. Nobody asked, so they never wrote about it.</p>
<p>In ${SURVEY}, 78% said a business had asked them for a review in the past year and 65% wrote one after being asked. That's what people say in a survey, so expect less from a list of older customers.</p>
<h2>What to expect from 15 texts</h2>
<p>When the work was good, we've found 15 texts to recent past customers can bring in around 5 to 7 reviews. It isn't a promise. What changes the number:</p>
<table>
<tr><th>Helps</th><th>Hurts</th></tr>
<tr><td>Job was in the last few months</td><td>Job was three years ago</td></tr>
<tr><td>Text names the actual job</td><td>Generic "valued customer" message</td></tr>
<tr><td>Comes from the owner or tech they met</td><td>Comes from an unknown number with no name</td></tr>
<tr><td>Direct link to the review box</td><td>Link to your home page</td></tr>
<tr><td>You did good work and cleaned up</td><td>They had a problem nobody fixed</td></tr>
</table>
<p>Do it a few weeks in a row and a list of a few hundred past customers can change how your profile looks next to the competition. <a href="/results/presidential-roofing">Here's a roofer who went from 27 to 43 reviews in 20 days.</a></p>
<h2>Step 1: pull the list</h2>
<p>Export customers from the last 12 to 24 months out of your CRM, field-service app or invoicing software. If there's no software, go through your phone and your paid invoices. You need a first name, a mobile number and what you did for them. Not sure where to keep it? See <a href="/guides/how-to-keep-track-of-customers">how to keep track of customers</a>.</p>
<p>Start with the most recent and work backwards. Keep everyone on the list, including the jobs that had a hiccup. Leaving out people you think are unhappy is review gating, which Google doesn't allow.</p>
<h2>Step 2: check the texting rules</h2>
<p>US texting rules care about consent, and having someone's number isn't always the same as permission to text them. Before you send:</p>
<ul>
<li>Text customers who gave you their number in the course of doing business with you, and leave out anyone who has asked you not to.</li>
<li>Say who you are, keep it about the job you did, and don't add a promotion.</li>
<li>Make it easy to opt out, and stop right away if someone does.</li>
<li>If you send through software, your business number needs to be registered with the carriers (called 10DLC), or messages get blocked.</li>
</ul>
<p>Rules differ by state and keep changing, so check with your texting provider or a lawyer if you're unsure. Email is the safer choice for anyone you have doubts about.</p>
<h2>Step 3: send the first message</h2>
<blockquote class="callout"><p>Hi Mark, it's Luis from Summit Roofing. We replaced the shingles on your garage back in August. I'm trying to get more reviews on Google so people can find us. Would you mind leaving an honest one? It takes a minute: [link]. Reply STOP and I won't text again.</p></blockquote>
<p>Why it works: their name, your name, the actual job, one honest reason and one link. Send about 15 a day. Small batches let you answer every reply yourself and keep new reviews coming in over several weeks.</p>
<h2>Step 4: handle the replies</h2>
<ul>
<li><strong>"Sure, will do!"</strong> Say thanks. Nothing else.</li>
<li><strong>"How do I do it?"</strong> "Tap the link, pick the stars, write a line about the job. Needs a Google account. Thank you!"</li>
<li><strong>"Actually, it's leaking again."</strong> This is the best text you'll get all week. Call them today and fix it. You keep the customer and find a problem before it's public.</li>
<li><strong>No answer.</strong> One reminder after three days, then leave them alone.</li>
</ul>
<h2>Step 5: the reminder</h2>
<blockquote class="callout"><p>Hi Mark, Luis again. No pressure at all. If you get a minute, here's that review link: [link]. Either way, thanks for hiring us.</p></blockquote>
<h2>The 7-day plan</h2>
<ol>
<li><strong>Day 1:</strong> export the list, copy your review link, write your message.</li>
<li><strong>Day 2:</strong> text the 15 most recent customers.</li>
<li><strong>Day 3:</strong> text 15 more. Reply to every review that came in.</li>
<li><strong>Day 4:</strong> text 15 more.</li>
<li><strong>Day 5:</strong> remind the day 2 group. Text 15 more.</li>
<li><strong>Day 6:</strong> remind the day 3 group.</li>
<li><strong>Day 7:</strong> count the new reviews, then set up a request after every new job so you never have to catch up again.</li>
</ol>
<h2>Three mistakes that cost you reviews</h2>
<ol>
<li><strong>Offering something.</strong> "$10 off for a review" breaks ${POLICY}.</li>
<li><strong>Blasting the whole list in one go.</strong> You can't answer 400 replies, and spammy-looking sends get filtered by the carriers.</li>
<li><strong>Stopping after the list is done.</strong> Homeowners look at recent reviews. Keep asking after every job. See <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</li>
</ol>
<h2>Or we do it for you</h2>
<p>We import your customers, write the messages with a photo of you or your crew, send them in batches, reply to every review and keep it going after each job. It's the core of our <a href="/services/review-generation">review generation service</a>, from $97 a month.</p>`,
    faq: [
      ["How do you politely ask a past customer for a review?", "Use their name, remind them of the job, say why it helps and give one direct link. For example: Hi Mark, it's Luis from Summit Roofing. We replaced the shingles on your garage in August. Would you mind leaving an honest Google review? It takes a minute: [link]."],
      ["How far back should I go?", "Start with the last 12 months and work back to about two years. Older customers are less likely to remember the details."],
      ["Is it legal to text past customers for reviews?", "It depends on consent and your state. Text people who gave you their number while doing business with you, identify yourself, skip promotions and honor opt-outs. Ask your texting provider or a lawyer if you're unsure."],
      ["Should I text or email past customers?", "Text usually gets a faster response from home-service customers. Use email for anyone without a mobile number or whose permission to be texted is unclear."],
      ["How many reviews can I expect?", "From about 15 recent past customers, we've found around 5 to 7 reviews is possible when the work was good. Older lists and generic messages bring in fewer."],
    ],
  },

  {
    slug: "google-reviews-not-showing-up",
    path: "/guides/google-reviews-not-showing-up",
    title: "Google Reviews Not Showing Up? 9 Reasons and Fixes",
    description: "Why your Google reviews aren't showing up or keep disappearing: the delays, filters and policy removals Google lists, and what you can do about each one.",
    h1: "Google reviews not showing up? Why it happens and what to do",
    lede: "A customer swears they left you a review and it isn't there. Or ten reviews vanished overnight. Here's what Google says causes it, and what you can fix.",
    eyebrow: "Missing reviews", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want us to look at your profile?",
    content: `
<div class="callout"><p><strong>Short version:</strong> most missing reviews are either still being checked, which Google says can take a few days, or were removed for breaking its policy, which Google says it won't restore. Wait a few days, rule out the causes below, and contact Google Business Profile support if you think a real review was caught by mistake.</p></div>
<h2>Reviews that haven't appeared yet</h2>
<p>Google <a href="https://support.google.com/business/answer/10313341" rel="noopener">lists several reasons</a> a review can be late or missing:</p>
<ol>
<li><strong>It's still being checked.</strong> Every review is screened first. Google says that might take a few days.</li>
<li><strong>Two profiles were merged.</strong> It can take a few days for the combined reviews to show.</li>
<li><strong>The customer's phone or app is out of date.</strong> Ask them to update Google Maps and try again.</li>
<li><strong>Google has switched reviews off for now.</strong> Google says it may temporarily disable reviews for certain profiles or whole categories.</li>
<li><strong>Your profile was just reinstated.</strong> Google says reviews might be removed after a reinstatement, and to contact support if so. See <a href="/guides/google-business-profile-suspended">fixing a suspended profile</a>.</li>
</ol>
<h2>Reviews that were removed</h2>
<ol start="6">
<li><strong>Something was offered for it.</strong> A discount, a gift card or a raffle entry.</li>
<li><strong>It looks like a conflict of interest.</strong> Google names current and former employment.</li>
<li><strong>The review was steered.</strong> Google prohibits collecting only positive reviews, giving staff a review quota, or having staff ask for specific content such as their own name.</li>
<li><strong>The spam filter got it wrong.</strong> <a href="https://support.google.com/business/answer/4596773" rel="noopener">Google says</a> its system may occasionally remove real reviews by mistake, and to contact support.</li>
</ol>
<p>Google says reviews removed for breaking policy won't be restored. The full list is in ${POLICY}.</p>
<h2>What to do, in order</h2>
<ol>
<li><strong>Wait a few days.</strong> Don't ask the customer to post again and again.</li>
<li><strong>Ask for a screenshot.</strong> Have the customer check their own reviews in Google Maps. If they can see it and you can't, it's being held or filtered.</li>
<li><strong>Check the profile.</strong> Make sure they reviewed the right one, especially if you have an old or duplicate listing.</li>
<li><strong>Look at how you ask.</strong> Stop anything that could look like gating, rewards or quotas.</li>
<li><strong>Contact support.</strong> If you believe real reviews were removed by mistake, contact Google Business Profile support with the reviewer's name, the date and a screenshot.</li>
</ol>
<h2>How to keep it from happening again</h2>
<ul>
<li>Ask every customer, with the same neutral message and the same link.</li>
<li>Let people post from their own phone, at home, in their own words.</li>
<li>Send requests as jobs finish instead of hundreds in one day.</li>
<li>Don't run contests between techs for the most reviews.</li>
</ul>
<h2>What about fake or unfair bad reviews?</h2>
<p>You can <a href="https://support.google.com/business/answer/4596773" rel="noopener">report a review</a> only if it breaks Google's policy. Disagreeing with it isn't enough. Google says evaluation typically takes several days, and you can submit a one-time appeal if a report is turned down. While you wait, post a short, calm reply. The fastest way to soften a bad review is to have more good, recent ones above it: see <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</p>`,
    faq: [
      ["How long does it take for a Google review to show up?", "Often it's quick, but Google says checks might take a few days."],
      ["Why are my Google reviews disappearing?", "Usually because Google removed them for breaking policy, such as incentives, conflicts of interest or steered reviews, or because its spam filter caught them by mistake."],
      ["Can I get a removed Google review back?", "Google says reviews removed for policy violations won't be restored. If you think the spam filter made a mistake, contact Google Business Profile support."],
      ["Why can a customer see their review but I can't?", "It's probably still being checked or has been filtered. Wait a few days, then contact support with a screenshot."],
    ],
  },

  {
    slug: "google-review-qr-code-and-nfc-cards",
    path: "/guides/google-review-qr-code-and-nfc-cards",
    title: "Google Review QR Codes and NFC Cards: How to Set Them Up",
    description: "How to make a free Google review QR code, when a tap-to-review NFC card is worth it, what to print on it, and how crews should hand it over.",
    h1: "Google review QR codes and NFC cards: how to set them up",
    lede: "A card your crew hands over can put a customer on your Google review page in one tap. Here's how to make one for free, when the tap version is worth it, and how to use it without breaking Google's rules.",
    eyebrow: "Review cards", readMinutes: 3, article: { date: DATE },
    ctaTitle: "Want custom review cards with your logo, free?",
    content: `
<div class="callout"><p><strong>Short version:</strong> Google gives you a review link and QR code for free in your Business Profile. Print the QR code on a card, or put the same link on an NFC card customers tap with their phone. Hand it over after the job and follow up by text.</p></div>
<h2>How to make a free Google review QR code</h2>
<ol>
<li>Sign in to the Google account that manages your Business Profile.</li>
<li>Search your business name on Google and choose <em>Ask for reviews</em>.</li>
<li>Copy the link, or download the QR code Google shows you.</li>
<li>Test it on an iPhone and an Android phone before you print anything.</li>
</ol>
<p>You don't need to pay a QR generator. If one gives you a "dynamic" code, remember that it stops working if you stop paying.</p>
<h2>QR code or NFC card?</h2>
<table>
<tr><th></th><th>QR code</th><th>NFC card</th></tr>
<tr><td>How it works</td><td>Customer opens the camera and scans</td><td>Customer taps the card with their phone</td></tr>
<tr><td>Cost</td><td>Free to make, plus printing</td><td>Costs more per card</td></tr>
<tr><td>Phones</td><td>Any phone with a camera</td><td>Most newer phones; NFC may need to be on</td></tr>
<tr><td>Best for</td><td>Invoices, door hangers, stickers, trucks</td><td>Crews who hand it over in person</td></tr>
</table>
<p>The best cards have both: tap if it works, scan if it doesn't.</p>
<h2>What to put on the card</h2>
<ul>
<li>Your logo and phone number. It's also a business card.</li>
<li>One line: "How did we do? Tap or scan to leave a Google review."</li>
<li>The QR code, large enough to scan at arm's length.</li>
</ul>
<p>Leave off five gold stars, "leave us 5 stars" and any reward. Ask for a review, not a rating.</p>
<h2>How your crew should hand it over</h2>
<p>At the end of the job, after the walkthrough: "Here's our card. If you get a chance, a Google review helps us out." Then go. Don't wait while they write it, don't hand them your phone, and don't ask them to mention anyone by name. Google's policy covers pressure, staff quotas and scripted content. See <a href="/guides/how-to-get-more-google-reviews">what gets reviews removed</a>.</p>
<h2>A card alone isn't enough</h2>
<p>Cards end up in kitchen drawers. Pair the card with a text the same day, so the link is also on their phone. Then go back to the people you never asked: <a href="/guides/ask-past-customers-for-google-reviews">how to ask past customers for reviews</a>.</p>
<h2>Get custom cards free</h2>
<p>Every new TableTurnerr client gets custom NFC review cards with their logo, designed and shipped free. Plans start at $97 a month, with no contract. <a href="/pricing">See the cards and prices</a>.</p>`,
    faq: [
      ["Is a Google review QR code free?", "Yes. Google gives you a review link and QR code in your Business Profile at no cost. You only pay for printing."],
      ["Do NFC review cards work on iPhones?", "Yes on newer iPhones, and on most newer Android phones with NFC switched on. Print a QR code on the card as a backup."],
      ["Are Google review cards against Google's policy?", "No. Asking for honest reviews with a link or QR code is allowed. Rewards, pressure and asking for a specific rating are not."],
      ["Can I put a review QR code on my invoices?", "Yes. Invoices, door hangers and follow-up emails are all good places for it."],
    ],
  },
];
