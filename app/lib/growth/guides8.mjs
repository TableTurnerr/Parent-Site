// Reviews, Google Maps and AI search guides (added 2026-11-27): replying to bad reviews, removing fake ones, the FTC
// review rule, service-area suspensions, ranking without a storefront, and Google's AI Mode / Ask Maps.
// Policy facts were read on Google's help pages, the FTC's site, Whitespark and BrightLocal on 2026-11-27.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
// Google features (Ask Maps especially) change often: re-check dated facts when updating.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;

// Google help and policy pages
const G_POLICY = (t = "Google's review policy") => A("https://support.google.com/contributionpolicy/answer/7400114", t);
const G_REPORT = (t = "Google's help page on reporting reviews") => A("https://support.google.com/business/answer/4596773", t);
const G_TOOL = (t = "Reviews Management tool") => A("https://support.google.com/business/workflow/9945796", t);
const G_REPLY_TIPS = (t = "Google's tips for review replies") => A("https://support.google.com/business/answer/3474122", t);
const G_MANAGE = (t = "Google's help page on managing reviews") => A("https://support.google.com/business/answer/3474050", t);
const G_EXTORT = (t = "extortion report process") => A("https://support.google.com/business/answer/16404809", t);
const G_SUSP = (t = "Google's help page on suspended profiles") => A("https://support.google.com/business/answer/4569145", t);
const G_APPEALS = (t = "Business Profile appeals tool") => A("https://support.google.com/business/?p=manage_appeals", t);
const G_LOCAL_APPEALS = (t = "additional review request") => A("https://support.google.com/business/contact/local_appeals", t);
const G_GUIDELINES = (t = "Google's Business Profile guidelines") => A("https://support.google.com/business/answer/3038177", t);
const G_RESTRICT = (t = "restriction policy") => A("https://support.google.com/business/answer/13762416", t);
const G_SAB = (t = "Google's service-area help page") => A("https://support.google.com/business/answer/9157481", t);
const G_RANK = (t = "Google's local ranking page") => A("https://support.google.com/business/answer/7091", t);
const G_AI = (t = "Google's guidance on AI features") => A("https://developers.google.com/search/docs/appearance/ai-features", t);
const G_AUTOCALLS = (t = "Google's automated calls help page") => A("https://support.google.com/business/answer/7690269", t);
const G_PRICECHECK = (t = "Google's AI pricing-check help page") => A("https://support.google.com/websearch/answer/16421135", t);
const ASKMAPS_LAUNCH = (t = "Google's Ask Maps launch post") => A("https://blog.google/products-and-platforms/products/maps/ask-maps-immersive-navigation/", t);
const ASKMAPS_EU = (t = "Google's November 16, 2026 post") => A("https://blog.google/products-and-platforms/products/maps/ask-maps-is-coming-to-europe/", t);
const SEJ_CALLS = (t = "Search Engine Journal") => A("https://searchenginejournal.com/google-ask-maps-appointments-business-calls/597678", t);
// FTC
const FTC_QA = (t = "the FTC's Q&A on the rule") => A("https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers", t);
const FTC_WARN = (t = "warning letters to 10 companies") => A("https://www.ftc.gov/news-events/news/press-releases/2025/12/ftc-warns-10-companies-about-possible-violations-agencys-new-consumer-review-rule", t);
// Research
const WHITESPARK = (t = "Whitespark's 2026 Local Search Ranking Factors") => A("https://whitespark.ca/local-search-ranking-factors/", t);
const BRIGHTLOCAL = (t = "BrightLocal's 2026 Local Consumer Review Survey") => A("https://www.brightlocal.com/research/local-consumer-review-survey/", t);

export const guides8 = [
  {
    slug: "how-to-respond-to-negative-google-reviews",
    path: "/guides/how-to-respond-to-negative-google-reviews",
    title: "How to Respond to Negative Google Reviews: 8 Templates",
    description: "How contractors should reply to bad Google reviews, with 8 copy-ready templates (late tech, price, not a customer, fake, damage, rude) and what never to say.",
    h1: "How to respond to negative Google reviews (with 8 templates for contractors)",
    lede: "A one-star review stings, but the reply is what the next homeowner reads. Here's a simple structure, eight replies you can adapt by situation, and the things that make a bad review worse.",
    eyebrow: "Google reviews", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want every review answered, the right way?",
    content: `
<div class="callout"><p><strong>Short version:</strong> reply within a day or two, keep it short and calm, name the specific problem, and move the details to a phone call. Never share job details the customer didn't post, never argue the facts in public, and never offer anything in exchange for changing the review. Your reply is written for the next homeowner, not the reviewer.</p></div>
<h2>Why the reply matters more than the review</h2>
<p>Homeowners expect you to answer. In ${BRIGHTLOCAL()} (1,002 US adults, checked November 2026), 89% said they expect owners to respond to reviews and 80% said they're more likely to use a business that responds to all of them. Half said templated or generic replies put them off. So use the templates below as a starting point, then change the details every time.</p>
<p>Two things to know from ${G_MANAGE()}: the reviewer gets notified when you reply, and they can still edit their review afterward. A good reply sometimes turns a one-star into a three or a four. Google also checks replies against its content policies. Most go live within minutes, but some take longer.</p>
<h2>The four-part reply</h2>
<ol>
<li><strong>Use their name and thank them.</strong> Even when it hurts. It shows you read it.</li>
<li><strong>Name the specific problem.</strong> "Our tech arrived two hours late," not "your experience." Don't admit things you haven't checked yet.</li>
<li><strong>Say what you did or will do.</strong> A call, a return visit, a change in how you schedule.</li>
<li><strong>Take it offline.</strong> Give a direct number and a real name, and sign off with your name.</li>
</ol>
<p>That matches ${G_REPLY_TIPS()}: be brief, personalize, apologize when it's right, and don't accept responsibility for things outside your control. Aim for 40 to 90 words.</p>
<h2>Eight reply templates by situation</h2>
<p>Swap in your details. Replace [brackets] and delete anything that isn't true.</p>
<h3>1. The tech was late or didn't show</h3>
<p><em>"Hi [Name], you're right, and I'm sorry. We told you [morning] and didn't get there until [afternoon], and nobody called to warn you. That's on us. We've changed how we text arrival updates so it doesn't happen again. I'd like to make it right. Please call me directly at [number]. [Your name], owner"</em></p>
<p>Works for any trade where same-day timing matters: AC no-cools in July, a no-heat call, a garage door stuck open.</p>
<h3>2. "You charged way too much"</h3>
<p><em>"Hi [Name], thanks for the feedback. Price matters and we want it clear before any work starts. Our techs give a written price up front and start only after you approve it. If something on your invoice didn't match what you agreed to, I want to look at it with you. Call me at [number]. [Your name]"</em></p>
<p>Don't list their invoice line by line in public. Explain how you price, not what they paid.</p>
<h3>3. You can't find them as a customer</h3>
<p><em>"Hi [Name], we take every review seriously, but we can't find a job under this name or a matching visit in our records. If we did work for you, please call [number] so we can find the job and help. If this was meant for another company, we understand. [Your name]"</em></p>
<p>Polite and factual. A reader sees you checked. If you're sure it's not a real customer, report it too (see below).</p>
<h3>4. Clearly fake or a competitor</h3>
<p><em>"We have no record of this person or this job, and the details don't match any service we offer in [town]. We've reported the review to Google. If we've missed something, please call us at [number] and we'll look into it right away. [Your name]"</em></p>
<p>Don't accuse anyone by name. You can't prove who wrote it, and accusations look worse than the review.</p>
<h3>5. A damage claim</h3>
<p><em>"Hi [Name], I'm sorry to hear about the damage, and I want to sort this out properly. I've asked our office to pull the job notes and photos from [date]. Please call me at [number] so we can see it and work out next steps. [Your name]"</em></p>
<p>Don't admit fault or deny it in public. Get photos, talk to the tech and call your insurance carrier if needed. Settle it offline.</p>
<h3>6. Rude or profane</h3>
<p><em>"Hi [Name], we're sorry you're unhappy. We'd like to understand what went wrong and fix it if we can. Please reach me directly at [number]. [Your name]"</em></p>
<p>Short is the point. Readers see the tone of the review and the calm of your reply. If it has profanity or personal attacks on your staff, report it as well.</p>
<h3>7. The problem came back</h3>
<p><em>"Hi [Name], I'm sorry the [leak/breaker/opener] is acting up again so soon. That repair is covered by our [30-day] workmanship warranty and we'll come back at no charge. I've asked [office name] to call you today to book a time. [Your name]"</em></p>
<p>The best reply for callbacks on plumbing leaks, electrical work and garage door springs. Only promise what your warranty actually covers.</p>
<h3>8. Something outside your control</h3>
<p><em>"Hi [Name], we understand the wait was frustrating. The [compressor/part] was on backorder from the manufacturer, and we should have kept you better updated while we waited. We now send a status text every [two days] on back-ordered parts. Thanks for your patience, and call me any time at [number]. [Your name]"</em></p>
<p>Explain once without blaming. Then own the part you could control, like updates.</p>
<h2>What not to say</h2>
<ul>
<li><strong>Job details they didn't post.</strong> No address, no "what we found in your crawl space", no balance owed. ${G_REPLY_TIPS("Google's tips")} say never share a reviewer's private information.</li>
<li><strong>A point-by-point rebuttal.</strong> Even if you're right, a long argument reads as defensive.</li>
<li><strong>Legal threats.</strong> The FTC's review rule bans using intimidation or groundless legal threats to get reviews removed. See ${FTC_QA()}.</li>
<li><strong>Offers in return for removal.</strong> ${G_POLICY()} doesn't allow offering money, discounts or free service to change or remove a review. You can fix the problem. You can't make the fix depend on the review.</li>
<li><strong>Blame on a named employee.</strong> Readers side with the worker, and it's unfair to them.</li>
<li><strong>The same pasted reply on every review.</strong> People notice.</li>
</ul>
<p>Write the reply, wait an hour, and have someone else read it before you post. Never reply angry from the truck at 10 p.m.</p>
<h2>Reply, report, or both?</h2>
<table>
<tr><th>Situation</th><th>Reply</th><th>Report to Google</th></tr>
<tr><td>Real customer, unfair or harsh</td><td>Yes</td><td>No, it's not a policy violation</td></tr>
<tr><td>No record of the person</td><td>Yes, neutrally</td><td>Yes, if you believe it's fake</td></tr>
<tr><td>Competitor or ex-employee</td><td>Yes, briefly</td><td>Yes (conflict of interest)</td></tr>
<tr><td>Profanity, threats or personal info</td><td>Short reply</td><td>Yes</td></tr>
<tr><td>Wave of one-stars plus a demand for money</td><td>No</td><td>Yes, through Google's extortion form</td></tr>
</table>
<p>The full removal process is in <a href="/guides/how-to-remove-fake-google-reviews">how to remove fake Google reviews</a>.</p>
<h2>Make one bad review a small share</h2>
<p>A single one-star hurts most when you have 12 reviews. With 150 recent ones it barely moves the average. The fix is asking every customer after every job: <a href="/guides/ask-past-customers-for-google-reviews">start with past customers</a>, then make it routine. For more wording, use our free <a href="/tools/review-response-templates">review response templates</a>.</p>
<p>If you'd rather not write these yourself, our <a href="/services/review-generation">review generation service</a> sends review requests after every job and drafts a reply to every review, good or bad. It costs {{PRICE:reviews}}.</p>`,
    faq: [
      ["Should I respond to every negative Google review?", "Yes, with very few exceptions. A calm reply shows future customers how you handle problems, and the reviewer is notified and may update their review. Skip replying only to extortion attempts, which you should report instead."],
      ["How fast should I reply to a bad review?", "Within a day or two. Fast enough to show you care, but not so fast that you reply angry. Write it, wait an hour, then post."],
      ["Can I offer a refund to get a review removed?", "No. Google's policy doesn't allow offering money, discounts or free service to change or remove a review. You can fix the problem, but the fix can't depend on the review."],
      ["Should I mention job details to prove the customer wrong?", "No. Don't share addresses, findings, invoice amounts or anything the customer didn't post. Explain how you work in general and take the specifics to a phone call."],
      ["Can I edit my reply later?", "Yes. Google lets you edit or delete a reply from your Business Profile. If the customer updates their review after you fix the problem, update your reply too."],
      ["Will replying to reviews help my ranking?", "Google lists responding to reviews among its tips for local businesses. The bigger effect is on whether people call: most homeowners read replies and expect owners to answer."],
    ],
  },
  {
    slug: "how-to-remove-fake-google-reviews",
    path: "/guides/how-to-remove-fake-google-reviews",
    title: "How to Remove Fake Google Reviews (Google's Process)",
    description: "How to report fake or policy-breaking Google reviews: what qualifies, the Reviews Management tool, the one-time appeal, timelines and what to do meanwhile.",
    h1: "How to remove fake Google reviews: Google's actual process",
    lede: "You can't delete a review yourself, and Google won't remove one because it's unfair. It will remove reviews that break its policy. Here's what qualifies, how to report one, how the appeal works and what to do while you wait.",
    eyebrow: "Google reviews", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Bury the bad ones under real reviews.",
    content: `
<div class="callout"><p><strong>Short version:</strong> flag the review from your Business Profile or Google's ${G_TOOL()}, choosing the policy reason that fits. Google says evaluation typically takes several days. If it decides there's no violation, you get one appeal. Google removes only reviews that break its policy (fake, conflict of interest, off-topic, harassment and so on), not reviews that are just harsh. Reply calmly while you wait. Process checked on Google's help pages in November 2026.</p></div>
<h2>What Google will and won't remove</h2>
<p>Everything turns on ${G_POLICY()}. It covers all user content on Maps, including reviews. Here's how it applies to a contractor's profile:</p>
<table>
<tr><th>Likely removable</th><th>Policy reason</th><th>Contractor example</th></tr>
<tr><td>Not based on a real experience</td><td>Fake engagement</td><td>A one-star from someone you never served, about a service you don't offer</td></tr>
<tr><td>Competitor or former employee</td><td>Conflict of interest</td><td>A rival roofer, or a tech you let go last month</td></tr>
<tr><td>Rants about something else</td><td>Off-topic</td><td>Politics, or a complaint about a different company</td></tr>
<tr><td>Threats or personal details</td><td>Harassment or personal information</td><td>Posting your tech's home address or phone number</td></tr>
<tr><td>Slurs or profanity aimed at people</td><td>Hate speech, obscenity and profanity</td><td>Swearing at a named employee</td></tr>
<tr><td>Same text from several accounts</td><td>Repetitive content</td><td>Five identical one-stars in a day</td></tr>
<tr><td>Ads or links</td><td>Advertising and solicitation</td><td>A review that promotes another company's number</td></tr>
</table>
<p><strong>Not removable:</strong> a real customer who thinks you charged too much, a rude but genuine complaint, or a low rating you disagree with. ${G_REPORT("Google's help page")} says you can report any review, but only ones that break policy are eligible for removal, and it asks you not to report reviews just because you don't like them.</p>
<h2>Step 1: Flag the review</h2>
<ol>
<li>Open your Business Profile on Google Search or Maps and choose <strong>Read reviews</strong>.</li>
<li>Next to the review, choose <strong>Report</strong>.</li>
<li>Pick the reason that matches the policy, such as spam, conflict of interest or off-topic. Pick the most accurate one, not the most dramatic.</li>
<li>Choose <strong>Send report</strong>.</li>
</ol>
<p>You can also report from the ${G_TOOL()}: confirm your account email, pick your business, choose "Report a new review for removal," then report the review and pick a reason. Either way, use the tool to track it.</p>
<h2>Step 2: Track it in the Reviews Management tool</h2>
<p>In the tool, choose "Check the status of a review I reported previously." You'll see one of three statuses:</p>
<table>
<tr><th>Status</th><th>What it means</th><th>What to do</th></tr>
<tr><td>Decision pending</td><td>Google hasn't evaluated it yet</td><td>Wait. Don't report it again.</td></tr>
<tr><td>Report reviewed: no policy violation</td><td>Google looked and kept it</td><td>Decide whether to use your one appeal</td></tr>
<tr><td>Escalated: check your email</td><td>Your appeal is with a reviewer</td><td>Watch your inbox for the decision</td></tr>
</table>
<p>Removed reviews disappear from Maps and Search.</p>
<h2>Step 3: Appeal once, with your best case</h2>
<p>If Google finds no violation, the tool offers "Appeal eligible reviews." You can select up to 10 reviews in one appeal, fill in the form and submit. Appeals are one-time, so make it count:</p>
<ul>
<li>Name the exact policy it breaks ("conflict of interest: the reviewer is a former employee").</li>
<li>State what you checked: "No customer by this name or at any matching address in our job software since we opened in 2015."</li>
<li>Point to what's in the review itself: a service you don't offer, a town you don't serve, a date before you opened.</li>
<li>Keep it factual and short. No anger, no theories about who wrote it.</li>
</ul>
<p>You'll get the result by email. If Google still finds no violation, the review stays up.</p>
<h2>Timelines</h2>
<table>
<tr><th>Step</th><th>How long Google says</th></tr>
<tr><td>First evaluation of a flagged review</td><td>"Typically takes several days"</td></tr>
<tr><td>Appeal decision</td><td>No timeframe published. Decision comes by email.</td></tr>
<tr><td>Your public reply going live</td><td>Usually minutes, occasionally longer while Google checks it</td></tr>
</table>
<p>Sources: ${G_REPORT()} and ${G_MANAGE()}, checked November 2026.</p>
<h2>If someone demands money to remove reviews</h2>
<p>Some scammers post a burst of one- and two-star reviews, then message you offering to remove them for a fee. Google has a separate ${G_EXTORT()} for this. Don't pay. Keep screenshots of every message and the demand, note when the reviews started and when the demand arrived, and submit the form while signed in to the account that manages your profile.</p>
<h2>What to do while you wait</h2>
<ol>
<li><strong>Reply to it.</strong> A short, neutral reply protects you with readers while Google decides. Templates are in <a href="/guides/how-to-respond-to-negative-google-reviews">how to respond to negative Google reviews</a>.</li>
<li><strong>Check your records properly.</strong> Search your CRM or job software by name, phone and street. Ask the office and techs. Sometimes the "fake" review is a real customer using a nickname or a spouse's account.</li>
<li><strong>Don't ask friends to flag it.</strong> Mass reporting doesn't speed anything up.</li>
<li><strong>Don't counter with friendly reviews.</strong> Reviews from family, staff or people who never hired you count as fake engagement or conflict of interest, and can get real reviews and your profile in trouble.</li>
<li><strong>Keep asking real customers.</strong> Fresh reviews push the bad one down and dilute your average. One real example: Presidential Roofing in Utah went from 27 to 43 Google reviews in 20 days by asking after every job.</li>
</ol>
<p>Also watch for the opposite problem. Google's spam filters sometimes remove genuine reviews. If good reviews vanish, see <a href="/guides/google-reviews-not-showing-up">why Google reviews aren't showing up</a>; Google says to contact support in that case.</p>
<h2>When the review is false and damaging</h2>
<p>If a review makes false statements that hurt your business and Google won't act, talk to a lawyer about your options. Don't threaten the reviewer yourself. The FTC's review rule treats intimidation and groundless legal threats used to remove reviews as a violation.</p>
<p>The long-term fix is volume. Our <a href="/services/review-generation">review generation service</a> asks every customer after every job, drafts a reply to every review and sends you a monthly report. It costs {{PRICE:reviews}}.</p>`,
    faq: [
      ["Can I delete a Google review myself?", "No. Only Google can remove a review, and only if it breaks Google's policy. You can report it from your Business Profile or the Reviews Management tool."],
      ["How long does Google take to remove a fake review?", "Google says evaluating a report typically takes several days. It doesn't publish a timeframe for appeals; you get the decision by email."],
      ["What if Google says the review doesn't violate policy?", "You get one appeal through the Reviews Management tool, covering up to 10 reviews. Name the exact policy it breaks and the facts you checked."],
      ["Will Google remove a negative review from a real customer?", "Not just because it's negative or unfair. Google removes reviews for policy reasons like fake engagement, conflict of interest, harassment or off-topic content."],
      ["Can a competitor's review be removed?", "Yes, if Google agrees there's a conflict of interest. Report it with that reason and explain what shows the connection."],
      ["Someone wants money to remove bad reviews. What do I do?", "Don't pay. Save every message and use Google's separate extortion report form for Business Profiles, with screenshots of the demand."],
    ],
  },
  {
    slug: "ftc-fake-review-rule-contractors",
    path: "/guides/ftc-fake-review-rule-contractors",
    title: "Can Contractors Offer Incentives for Reviews? FTC Rules",
    description: "The FTC's 2024 review rule and Google's incentive policy for contractors: what you can and can't offer for reviews, review gating, NFC cards and tech bonuses.",
    h1: "Can contractors offer incentives for reviews? The FTC rule and Google's policy",
    lede: "A $10 gift card for a review sounds harmless. Under the FTC's rule it can be legal. Under Google's policy it isn't. Here's how the two sets of rules fit together for a home-service business, and what you can safely do.",
    eyebrow: "Google reviews", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Get more reviews without breaking the rules.",
    content: `
<div class="callout"><p><strong>Short version:</strong> for Google reviews, offer nothing. Google's policy bans payment, discounts or free service in exchange for reviews, good or bad. The FTC's 2024 rule is narrower: it bans fake reviews, incentives tied to a positive review, undisclosed insider reviews and review suppression. You can always ask every customer, make it easy with a link or an NFC card, and follow up. This is a plain-English summary, not legal advice.</p></div>
<h2>The FTC rule in plain English</h2>
<p>The FTC's Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465) took effect on October 21, 2024. Courts can impose civil penalties for knowing violations. On December 22, 2025 the FTC sent ${FTC_WARN()}, reminding them of penalties of up to $53,088 per violation. Here's what each section means for a contractor, based on ${FTC_QA()} (checked November 2026):</p>
<table>
<tr><th>Section</th><th>What it bans</th><th>Contractor example</th></tr>
<tr><td>465.2</td><td>Writing, buying or selling fake reviews, or using ones you knew or should have known were fake</td><td>Paying a "review service" for 50 five-stars, or having your office manager write reviews</td></tr>
<tr><td>465.4</td><td>Incentives that require, openly or by implication, a particular sentiment</td><td>"$25 off your next tune-up for a 5-star review"</td></tr>
<tr><td>465.5</td><td>Reviews from insiders (employees, officers, relatives) without clear disclosure</td><td>Your brother-in-law reviewing the company without saying so</td></tr>
<tr><td>465.6</td><td>Pretending a site you control is an independent review site</td><td>A "Best Plumbers in Mesa" site you own that ranks you first</td></tr>
<tr><td>465.7</td><td>Suppressing reviews with intimidation, false accusations or groundless legal threats</td><td>Threatening to sue a customer unless they delete a one-star</td></tr>
<tr><td>465.8</td><td>Buying or using fake social media indicators</td><td>Buying followers or views for your Facebook page</td></tr>
</table>
<p>What the FTC rule doesn't ban: incentives that are truly neutral, where the customer gets the reward whether the review is good or bad. The FTC says failing to disclose an incentive could still break the FTC Act. And asking only happy customers isn't banned by the rule itself, but the FTC says it could still violate the FTC Act.</p>
<h2>Google's policy is stricter</h2>
<p>For reviews on your Business Profile, ${G_POLICY()} is what decides whether your reviews stay up and whether your profile stays safe. It says businesses may not:</p>
<ul>
<li>Offer payment, discounts or free goods or services for reviews, or for changing or removing them. No neutral-incentive exception.</li>
<li>Selectively ask for positive reviews (review gating).</li>
<li>Discourage or prohibit negative reviews.</li>
<li>Require reviews on the premises, set solicitation quotas, or ask for specific content, including naming staff.</li>
<li>Post or encourage reviews with a conflict of interest, such as current or former employees.</li>
</ul>
<p>Google treats incentivized or biased reviews as rating manipulation. The risk isn't a fine from Google. It's reviews being removed and, in bad cases, restrictions on your profile.</p>
<h2>What's allowed and what isn't</h2>
<table>
<tr><th>Practice</th><th>FTC rule</th><th>Google policy</th><th>Our call</th></tr>
<tr><td>Text every customer a review link after the job</td><td>Fine</td><td>Fine</td><td>Do it</td></tr>
<tr><td>Hand over an NFC card or QR code at the end of every job</td><td>Fine</td><td>Fine, if no pressure and no reward</td><td>Do it</td></tr>
<tr><td>One reminder a few days later</td><td>Fine</td><td>Fine</td><td>Do it</td></tr>
<tr><td>$10 gift card for any review, disclosed</td><td>Likely allowed</td><td>Not allowed</td><td>Don't, for Google</td></tr>
<tr><td>Discount for a 5-star review</td><td>Banned</td><td>Not allowed</td><td>Never</td></tr>
<tr><td>Prize draw for everyone who leaves a review</td><td>Depends on terms and disclosure</td><td>Not allowed</td><td>Don't</td></tr>
<tr><td>Only sending the link to happy customers</td><td>Not in the rule, may break FTC Act</td><td>Not allowed</td><td>Don't</td></tr>
<tr><td>Asking customers to mention the tech by name</td><td>Not addressed</td><td>Not allowed</td><td>Don't ask; let them</td></tr>
<tr><td>Employees or family reviewing the company</td><td>Needs clear disclosure</td><td>Not allowed (conflict of interest)</td><td>Don't</td></tr>
<tr><td>Bonus per review for techs</td><td>Not addressed</td><td>Risky: quotas and named-staff requests are banned</td><td>Reward job quality instead</td></tr>
</table>
<h2>NFC cards, QR codes and asking in person</h2>
<p>A tap card or QR code is just a faster way to share your review link. It's fine as long as everyone gets it and nobody is rewarded or pressured. Hand it over when the job is done, say "if you have a minute later, a review really helps us," and leave. Don't stand over the homeowner while they type, and don't make the review part of closing out the job. More on the setup in <a href="/guides/google-review-qr-code-and-nfc-cards">Google review QR codes and NFC cards</a>.</p>
<h2>Review gating, briefly</h2>
<p>Many review tools offer a "how did we do?" screen that only sends 4- and 5-star answers to Google. That's gating, and Google doesn't allow it. Check your software settings for words like "threshold," "sentiment" or "feedback first." The full breakdown is in <a href="/guides/is-review-gating-allowed">is review gating allowed?</a></p>
<h2>Tech bonuses and contests</h2>
<p>Owners like to reward techs who earn great reviews. The safe version rewards the work, not the review count. Bonus on callback rate, on-time arrival or customer survey scores you collect yourself. Shout out techs who get praised in reviews, but don't set review quotas and don't coach them to ask customers to name them. That's exactly what Google's policy calls out.</p>
<h2>A compliant review ask</h2>
<p><em>"Hi [Name], thanks for having us out today for your [water heater install]. If you have a minute, an honest Google review helps other homeowners in [town] find us: [link]. And if anything isn't right, just reply here and we'll fix it. [Your name]"</em></p>
<p>Everyone gets the same message and the same link. The "reply here" line goes to everyone too, so it isn't gating. More wording in our free <a href="/tools/review-request-templates">review request templates</a>, and the full playbook in <a href="/guides/how-to-get-more-google-reviews">how to get more Google reviews</a>.</p>
<p>Our <a href="/services/review-generation">review generation service</a> works this way by design: every customer gets the same request by text and email, with no filter and no incentives, plus free NFC cards for your techs. It costs {{PRICE:reviews}}.</p>`,
    faq: [
      ["Can I give customers a discount for leaving a Google review?", "No. Google's policy bans offering discounts, payment or free services for reviews, whether positive or negative. Reviews tied to incentives can be removed."],
      ["Does the FTC allow incentives for reviews?", "Only if the incentive doesn't require or imply a positive review, and the FTC says undisclosed incentives can still break the FTC Act. Google's policy is stricter and bans incentives entirely."],
      ["What are the penalties under the FTC review rule?", "Courts can impose civil penalties for knowing violations. The FTC's December 2025 warning letters cited penalties of up to $53,088 per violation."],
      ["Are NFC review cards allowed?", "Yes. An NFC card or QR code just shares your review link. Give it to every customer, with no reward and no pressure."],
      ["Can my employees leave Google reviews for my company?", "No. Google treats reviews from current or former employees as a conflict of interest. Under the FTC rule, insider reviews also need clear disclosure."],
      ["Can I pay my techs a bonus for reviews?", "It's risky. Google bans solicitation quotas and asking for reviews that name staff. Reward job quality, like callback rates and on-time arrival, instead."],
      ["Is this legal advice?", "No. It's a plain-English summary of the FTC rule and Google's policy as of November 2026. For specific situations, talk to a lawyer."],
    ],
  },
  {
    slug: "google-business-profile-suspended-service-area",
    path: "/guides/google-business-profile-suspended-service-area",
    title: "Service-Area Business Suspended on Google? How to Appeal",
    description: "Why Google suspends service-area contractor profiles, which documents to gather, how to use Google's appeals tool step by step, and how to avoid it again.",
    h1: "Service-area business suspended on Google? How to appeal, step by step",
    lede: "Contractors who work from home or a truck get suspended more than most, usually over the address. Here's how to tell what happened, what to fix, which documents to gather and exactly how Google's appeal works.",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Want a second pair of eyes before you appeal?",
    content: `
<div class="callout"><p><strong>Short version:</strong> most service-area suspensions come from the address: a home address shown publicly, a virtual office or mailbox, a second profile, or keywords and city names in the business name. Fix the cause first, gather documents whose name and address match the profile exactly, then file one appeal in Google's ${G_APPEALS()}. Don't create a new profile. Process checked on ${G_SUSP()} in November 2026.</p></div>
<h2>Suspended, restricted or just under review?</h2>
<p>Read the notice in your profile first. Google uses different terms for different problems:</p>
<table>
<tr><th>What you see</th><th>What it means</th><th>First move</th></tr>
<tr><td>Profile suspended or disabled</td><td>The profile breaks ${G_GUIDELINES()}. A removed profile can't be seen by the public or managed.</td><td>Fix the cause, then appeal the profile</td></tr>
<tr><td>Account restricted</td><td>Your Google account broke a policy. All profiles it manages are suspended, and you can't create or claim others.</td><td>Lift the restriction at <a href="https://myaccount.google.com/restrictions" rel="noopener">My Account restrictions</a> first, then appeal the profile. See the ${G_RESTRICT()}.</td></tr>
<tr><td>Edits under review or verification needed</td><td>Not a suspension. Google is checking a change or wants you to verify again.</td><td>Finish verification and stop editing</td></tr>
</table>
<h2>Why service-area profiles get suspended</h2>
<ul>
<li><strong>Showing an address customers don't visit.</strong> If you go to customers, Google wants the address hidden and service areas listed. See ${G_SAB()}.</li>
<li><strong>Virtual offices, mailboxes and coworking desks.</strong> A UPS Store box or a rented desk you don't staff isn't an eligible location.</li>
<li><strong>Keywords or towns in the name.</strong> "Mike's Plumbing" is fine. "Mike's Plumbing Phoenix 24/7 Emergency" isn't, unless that's your real, registered name.</li>
<li><strong>Duplicate profiles.</strong> One per city, or a second one made after the first had problems.</li>
<li><strong>Service areas far from your base.</strong> Google says the area shouldn't extend much beyond about a two-hour drive.</li>
<li><strong>Big edits at once.</strong> Name, address, phone and category changed the same week.</li>
</ul>
<p>Practitioners agree on the risks. In ${WHITESPARK()}, experts scored "showing address on a service area business" and "service areas beyond 2-hour driving distance" among the higher suspension risks.</p>
<h2>Documents to prepare</h2>
<p>Google lists business registration, a business license, tax certificates and business utility bills as evidence. The name and address on every document must match the profile. For a home-based contractor, the business address is usually your home, and that's fine as long as it's hidden on the profile.</p>
<table>
<tr><th>Document</th><th>Why it helps</th><th>Tip</th></tr>
<tr><td>State or county business registration</td><td>Proves the legal name</td><td>Match the profile name exactly, including "LLC" if you use it</td></tr>
<tr><td>Contractor or trade license</td><td>Proves you do the work you claim</td><td>HVAC, plumbing, electrical and roofing licenses usually show name and address</td></tr>
<tr><td>Tax certificate or EIN letter</td><td>Ties the name to the address</td><td>Use the same address as the profile</td></tr>
<tr><td>Utility or phone bill for the business</td><td>Proves the address is real</td><td>Recent, in the business name if possible</td></tr>
<tr><td>Photos of branded vehicles, tools and signage</td><td>Shows a real operating business</td><td>Useful if Google asks you to verify again, sometimes by video</td></tr>
</table>
<h2>How to appeal, step by step</h2>
<ol>
<li><strong>Fix the cause first.</strong> Hide the address if customers don't visit, remove keywords from the name, trim service areas, and mark any duplicate profile. Appealing an unfixed profile wastes your one shot.</li>
<li><strong>Open the ${G_APPEALS()}</strong> and sign in with the Google account that owns the profile.</li>
<li><strong>Select the profile</strong>, then the decision you want to appeal. The tool shows the decision date, reason, policy, whether it can be appealed and its status.</li>
<li><strong>Upload your evidence</strong> and explain briefly why the profile should be reinstated. Example: "We're a licensed HVAC contractor serving customers at their homes. We've hidden our home address and removed 'Best AC Repair' from the name to match our registration. Attached: state registration, contractor license and utility bill."</li>
<li><strong>Confirm and submit.</strong> Tick the box saying all evidence is attached, then choose Submit appeal.</li>
<li><strong>Wait for the email.</strong> Google sends one decision email for the profile you selected. It doesn't publish a timeframe.</li>
</ol>
<h2>If the appeal is denied</h2>
<p>Appeals can be submitted only once per decision. If reinstatement is denied, Google allows an ${G_LOCAL_APPEALS()}, but only with evidence you didn't include the first time. That's why the first appeal should carry everything. If you manage 10 or more suspended locations, the tool has a bulk path that needs a spreadsheet of profile IDs.</p>
<h2>What not to do while you wait</h2>
<ul>
<li><strong>Don't create a new profile.</strong> Google says this directly, and it usually makes things worse.</li>
<li><strong>Don't keep editing the suspended profile.</strong></li>
<li><strong>Don't pay anyone who promises guaranteed reinstatement</strong> or "a contact at Google."</li>
<li><strong>Don't go dark.</strong> Make sure your phone gets answered and your website, Bing, Apple and Yelp listings show the right number while Maps is down.</li>
</ul>
<h2>How to avoid it next time</h2>
<ol>
<li>Use your real, registered business name. Nothing extra.</li>
<li>Hide your address if customers don't come to you, and list honest service areas.</li>
<li>One profile per business, unless you have another real, staffed location.</li>
<li>Make big changes one at a time, a week or two apart.</li>
<li>Keep a folder with your registration, license and a recent utility bill, ready to upload.</li>
</ol>
<p>The general version of this guide is <a href="/guides/google-business-profile-suspended">Google Business Profile suspended?</a>, and setup details are in <a href="/guides/google-business-profile-service-area">service areas, set up right</a>. Our <a href="/free-google-maps-audit">free Google Maps audit</a> flags the common risks before Google does.</p>
<p>If you'd rather not babysit it, our <a href="/services/google-business-profile">Google Business Profile management</a> keeps your profile inside the rules and posts for you every week. It costs {{PRICE:gbp}}.</p>`,
    faq: [
      ["Why was my service-area business suspended on Google?", "Usually because of the address: a home address shown publicly, a virtual office or mailbox, a duplicate profile, or keywords in the business name. Read the notice in your profile and check Google's guidelines."],
      ["How do I appeal a Google Business Profile suspension?", "Fix the cause, then use Google's Business Profile appeals tool. Select the profile and decision, upload documents that match your profile's name and address, and submit."],
      ["What documents does Google want for an appeal?", "Google lists business registration, a business license, tax certificates and business utility bills. The name and address on each must match the profile."],
      ["How long does a reinstatement take?", "Google doesn't publish a timeframe. It reviews the appeal and sends one decision email for the profile you selected."],
      ["Can I appeal more than once?", "Each decision can be appealed once. If reinstatement is denied, Google allows an additional review request, but only with new evidence."],
      ["Should I just make a new profile?", "No. Google says not to create a new profile for the same business, and doing so usually makes the problem worse."],
    ],
  },
  {
    slug: "rank-google-maps-without-storefront",
    path: "/guides/rank-google-maps-without-storefront",
    title: "How to Rank in Google Maps Without a Storefront",
    description: "How service-area contractors with no storefront rank in Google Maps: hidden addresses, service areas, categories, reviews, proximity, and what helps or hurts.",
    h1: "How to rank in Google Maps without a storefront",
    lede: "Most plumbers, roofers and HVAC techs work from home or a truck. You can still rank in the map pack. You just need to know what Google rewards, what it ignores and how far your reach really goes.",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "See where you rank, town by town.",
    content: `
<div class="callout"><p><strong>Short version:</strong> yes, service-area businesses rank in Google Maps, mostly near where they're verified. Google ranks local results on relevance, distance and prominence. Service areas you list tell customers where you go, but they don't stretch your ranking radius. What moves the needle: the right primary category, a complete profile, a steady flow of reviews, and a website page for each service and main town.</p></div>
<h2>How Google ranks local results</h2>
<p>${G_RANK()} names three main factors (checked November 2026):</p>
<ul>
<li><strong>Relevance:</strong> how well your profile matches the search. Complete, detailed information helps.</li>
<li><strong>Distance:</strong> how far you are from the person searching, or from the place they searched for.</li>
<li><strong>Prominence:</strong> how well known you are, including links from other sites and the number and rating of your reviews.</li>
</ul>
<p>Google also says there's no way to pay for a better local ranking. Local Services Ads and Google Ads appear above or beside the map pack, but they don't change it.</p>
<h2>What local SEO experts rank highest</h2>
<p>Every year Whitespark surveys local search experts on ranking factors. These are the top ten for the map pack in ${WHITESPARK()}:</p>
<table>
<tr><th>#</th><th>Factor</th><th>Can a service-area business control it?</th></tr>
<tr><td>1</td><td>Primary Google Business Profile category</td><td>Yes. The single biggest lever.</td></tr>
<tr><td>2</td><td>Proximity of the address to the searcher</td><td>No. It's where you're based.</td></tr>
<tr><td>3</td><td>Keywords in the business name</td><td>Only if it's your real name. Adding keywords breaks Google's rules.</td></tr>
<tr><td>4</td><td>Physical address in the city searched</td><td>Only by having a real base there</td></tr>
<tr><td>5</td><td>Open at the time of search</td><td>Yes. Keep hours accurate, and list after-hours service only if you really answer.</td></tr>
<tr><td>6</td><td>High Google rating (4 to 5 stars)</td><td>Yes, by doing good work and asking everyone</td></tr>
<tr><td>7</td><td>Address showing on the profile (not hidden)</td><td>Not safely. See below.</td></tr>
<tr><td>8</td><td>Additional categories</td><td>Yes</td></tr>
<tr><td>9</td><td>Number of Google reviews with text</td><td>Yes</td></tr>
<tr><td>10</td><td>Correct map pin placement</td><td>Yes. Check your pin sits on your real base.</td></tr>
</table>
<p>These are expert opinions, not Google's formula. They're still the best public picture of what matters.</p>
<h2>The hidden-address question</h2>
<p>A visible address scores seventh in the survey, which worries home-based contractors. Two things to know. First, Whitespark's own Darren Shaw writes that he isn't convinced showing or hiding an address is a ranking factor, and suspects hiding it can cause pin problems. Second, the same survey scores showing an address on a service-area business as a real suspension risk. If customers don't come to your home, hide it. A suspended profile ranks nowhere. If you have a real, staffed shop or showroom with signage, show it. Setup steps are in <a href="/guides/google-business-profile-service-area">service areas, set up right</a>.</p>
<h2>The proximity reality</h2>
<p>Distance is the factor owners most want to beat and can least change. Your profile ranks best around the address you verified with, and the radius shrinks where competition is thick. A roofer based in a suburb will usually rank well across nearby suburbs and struggle in the downtown map pack 25 miles away, no matter what service areas are listed.</p>
<p>That's not a reason to give up on the bigger town. It means you reach it with other tools: a website page about your work in that town, reviews from customers there, and paid ads if the jobs are worth it. See <a href="/guides/local-services-ads-vs-google-ads">Local Services Ads vs Google Ads</a>.</p>
<h2>What helps</h2>
<ol>
<li><strong>Pick the most specific primary category.</strong> "HVAC contractor," "Plumber," "Roofing contractor," "Garage door supplier." Add a few secondary categories that truly apply.</li>
<li><strong>Fill out services.</strong> List every service you sell, with a sentence each: water heater installation, drain cleaning, panel upgrades, spring replacement.</li>
<li><strong>List honest service areas.</strong> Up to 20, within roughly a two-hour drive, per ${G_SAB()}.</li>
<li><strong>Get reviews every week, not in bursts.</strong> Number, rating and freshness all matter. You can't ask people to mention a service or town (Google's policy bans requesting specific content), but asking after every job brings those mentions naturally. See <a href="/guides/how-many-google-reviews-to-rank">how many Google reviews you need to rank</a>.</li>
<li><strong>Reply to every review.</strong> Google lists it in its own ranking tips.</li>
<li><strong>Add real job photos.</strong> Before-and-after shots, your trucks, your crew. Not stock images.</li>
<li><strong>Build service and town pages on your website.</strong> One page per main service and per main town, with real details: typical jobs, neighborhoods, permits, what affects price.</li>
<li><strong>Keep your name, phone and website consistent</strong> on Bing, Apple, Yelp, the BBB, Nextdoor and trade directories.</li>
</ol>
<h2>What doesn't help (or hurts)</h2>
<table>
<tr><th>Tactic</th><th>Why to skip it</th></tr>
<tr><td>Keywords or towns added to your business name</td><td>Against Google's guidelines and a common suspension trigger</td></tr>
<tr><td>Virtual office or mailbox in a bigger city</td><td>Not an eligible location. Risks suspension.</td></tr>
<tr><td>A profile for every town</td><td>Duplicate profiles get removed</td></tr>
<tr><td>Service areas far beyond your base</td><td>Doesn't expand ranking, and it's a suspension risk</td></tr>
<tr><td>Buying reviews or rewarding them</td><td>Against Google's policy and the FTC rule. See <a href="/guides/ftc-fake-review-rule-contractors">the review rules</a>.</td></tr>
<tr><td>Changing categories every few weeks</td><td>Can trigger reviews and confuses relevance</td></tr>
</table>
<h2>How to check where you rank</h2>
<p>Searching from your own phone only shows results for where you're standing. To see the real picture you need rankings checked from many points across your area, often called a geogrid. Our <a href="/free-google-maps-audit">free Google Maps audit</a> does this for your main services and shows who beats you in each part of town.</p>
<p>Want it handled? Our <a href="/services/local-seo">local SEO service</a> adds service-and-town pages every month on top of profile and review work. It costs {{PRICE:seo}}. Smaller budgets can start with <a href="/services/google-business-profile">Google Business Profile management</a>.</p>`,
    faq: [
      ["Can I rank in Google Maps without a storefront?", "Yes. Service-area businesses rank in the map pack, mostly in the area around the address they verified with. Hide the address if customers don't visit you there."],
      ["Does hiding my address hurt my Google ranking?", "Experts disagree. A visible address scores well in Whitespark's 2026 survey, but its author isn't convinced it's a ranking factor, and showing a home address customers don't visit risks suspension."],
      ["Do service areas help me rank in other cities?", "Not much by themselves. They tell customers where you work. Distance from your base, relevance and reviews decide where you rank."],
      ["What is the most important Google Maps ranking factor?", "In Whitespark's 2026 expert survey, the primary Business Profile category came first, just ahead of proximity to the searcher."],
      ["Should I use a virtual office to rank in a bigger city?", "No. Virtual offices and mailboxes aren't eligible locations under Google's guidelines and are a common reason for suspensions."],
      ["How long does it take to rank higher in Google Maps?", "Fixes like the right category show up fastest. Reviews and website pages build over months. Steady weekly progress beats bursts."],
    ],
  },
  {
    slug: "google-ask-maps-ai-mode-local-business",
    path: "/guides/google-ask-maps-ai-mode-local-business",
    title: "Google Ask Maps and AI Mode: What Contractors Should Fix",
    description: "What Google's AI Overviews, AI Mode and Ask Maps (Gemini in Maps) mean for local contractors: how picks are made, what to fix, and how to check your visibility.",
    h1: "Google Ask Maps and AI Mode: what local contractors should fix now",
    lede: "Homeowners can now ask Google Maps a full question and get a short list of names back. Some of those features can even call your business for them. Here's what's live as of November 2026, how the picks get made, and what to fix.",
    eyebrow: "AI search", readMinutes: 8, article: { date: DATE },
    ctaTitle: "Find out what Google's AI says about you.",
    content: `
<div class="callout"><p><strong>Short version:</strong> Google now answers many local questions with AI: AI Overviews at the top of Search, AI Mode (a chat-style Search experience) and Ask Maps, a Gemini chat inside Google Maps. All three lean on the same inputs: your Business Profile, your reviews and pages on the web. Google says there's no special AI markup to add. Fix the facts on your profile and website, keep reviews coming, and check what the AI says about you. Features checked November 27, 2026.</p></div>
<h2>Google's AI features, as of November 2026</h2>
<table>
<tr><th>Feature</th><th>Where it shows</th><th>What it means for a contractor</th></tr>
<tr><td>AI Overviews</td><td>A summary at the top of normal Google results</td><td>Answers "how much does a water heater cost" or "why is my AC freezing" before anyone scrolls to you</td></tr>
<tr><td>AI Mode</td><td>A chat-style mode in Google Search</td><td>Follow-up questions like "which of these can come tomorrow?" Google says it runs many related searches at once ("query fan-out")</td></tr>
<tr><td>Ask Maps</td><td>A button in the Google Maps app</td><td>Plain-language questions about places, with a short list of recommendations</td></tr>
<tr><td>AI calls to businesses</td><td>Ask Maps and Search</td><td>Google's AI may phone your business to ask about appointments or prices for a customer</td></tr>
</table>
<p><strong>Ask Maps</strong> launched on March 12, 2026 in the US and India on Android and iOS. ${ASKMAPS_LAUNCH()} says it draws on information about more than 300 million places and reviews from a community of more than 500 million contributors, and personalizes answers using places you've searched for or saved. ${ASKMAPS_EU()} expanded it to 30+ European countries. The same week, Google said Ask Maps can find appointments at beauty, pet care, auto and home-repair businesses and call them for the user, starting in the US (reported by ${SEJ_CALLS()}).</p>
<p>Separately, Google Search has a "Have AI check pricing" option that calls local providers and emails the user their quotes. ${G_PRICECHECK()} lists examples like auto repair and pet groomers and says coverage is expanding. It doesn't name home services yet.</p>
<h2>How the recommendations get made</h2>
<p>Google hasn't published which profile fields its AI uses or how it weighs them. Here's what we can say with confidence:</p>
<ul>
<li><strong>Normal local ranking still sits underneath.</strong> Google ranks local results on relevance, distance and prominence (${G_RANK("Google's local ranking page")}). AI answers start from the same pool.</li>
<li><strong>Reviews are read, not just counted.</strong> Ask Maps uses review content from Maps contributors. A review that says "fixed our tankless water heater same day" gives the AI something specific to repeat.</li>
<li><strong>Your website feeds AI Overviews and AI Mode.</strong> ${G_AI()} says there are no additional requirements beyond normal SEO: pages must be indexed, content should be in text, and Business Profile information should be kept current.</li>
<li><strong>Mentions elsewhere matter.</strong> In ${WHITESPARK()}, experts ranked these highest for AI visibility: being on curated "best of" lists, a dedicated page for each service, prominence on industry sites, quality mentions on other sites, and reviews on trusted third-party sites.</li>
</ul>
<p>It's not a niche habit anymore. In ${BRIGHTLOCAL()}, 45% of consumers said they'd used AI tools for local business recommendations, up from 6% a year earlier.</p>
<h2>When Google's AI calls your business</h2>
<p>If Google's AI phones to ask about availability or pricing, someone needs to answer it like a real lead, because it is one. A missed call means the homeowner gets a list without you.</p>
<p>You can control these calls. Per ${G_AUTOCALLS()}, verified businesses go to <strong>More, then Business Profile settings, then Advanced settings</strong>. Under "Google automated calls and text messages," the "Bookings and inquiries from customers" toggle turns customer-request calls on or off. You can also tell a caller "Please stop calling my business." Google says these customer-request features aren't available in Indiana, Louisiana, Minnesota, Montana or Nebraska, and that its calls are monitored and recorded. It isn't yet clear whether Ask Maps calls follow the same setting.</p>
<p>Our advice: leave it on if your phone gets answered every time, by a person or an <a href="/services/ai-answering-service">AI answering service</a>. If calls go to voicemail, fix that first.</p>
<h2>What to fix, in order</h2>
<ol>
<li><strong>Complete your Business Profile.</strong> Most specific primary category, the right secondary ones, every service with a short description, honest service areas, accurate hours (including emergency hours only if you answer), attributes and real job photos. Start with <a href="/services/google-business-profile">Google Business Profile management</a> if this is a mess.</li>
<li><strong>Get reviews that describe the work.</strong> Ask every customer after every job. You can't tell them what to write (Google's policy bans requesting specific content), but recent reviews from real jobs naturally mention the service, the town and the speed.</li>
<li><strong>Reply to reviews with specifics.</strong> "Glad we could get your furnace running the same night in Plano" adds service and place context in your own words.</li>
<li><strong>Put the facts on your website, in text.</strong> One page per service and main town, with the things homeowners ask: what it costs or what affects the price, how fast you can come, license numbers, warranty, financing, emergency hours. AI tools can't quote what isn't written down.</li>
<li><strong>Keep your details consistent everywhere.</strong> Same name, phone and website on Bing Places, Apple Business Connect, Yelp, the BBB, Nextdoor, Angi and your manufacturer's dealer locator.</li>
<li><strong>Earn mentions on lists people trust.</strong> Local "best of" awards, chamber of commerce listings, local news, supplier and manufacturer directories.</li>
<li><strong>Make sure Google can crawl your site.</strong> Pages indexed, nothing blocked in robots.txt, key content not hidden in images.</li>
</ol>
<h2>How to check your visibility</h2>
<ol>
<li><strong>Ask Maps on your phone</strong>, from inside your service area: "Who's a good [plumber] near [town] that can come this week?" Try three or four ways of asking. Write down who's named and the reasons given.</li>
<li><strong>Try AI Mode</strong> with a cost question and a "who should I hire" question for your trade and town.</li>
<li><strong>Read the reasons.</strong> If the AI says a competitor is "known for fast emergency service" and you aren't mentioned, look at what their reviews and website say that yours don't.</li>
<li><strong>Check Search Console.</strong> Google says clicks from AI Overviews and AI Mode are counted in the Performance report under the "Web" search type.</li>
<li><strong>Repeat monthly.</strong> Answers change, and personalization means your result may differ from a customer's.</li>
</ol>
<p>Our <a href="/free-google-maps-audit">free Google Maps audit</a> includes an AI visibility check across ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity. For the bigger picture beyond Google, see <a href="/guides/how-to-get-recommended-by-chatgpt">how to get recommended by ChatGPT and AI</a>.</p>
<p>Our <a href="/services/ai-search-optimization">AI search optimization</a> covers this work month to month: profile facts, service and town pages, listings and mentions. It costs {{PRICE:aeo}}.</p>`,
    faq: [
      ["What is Ask Maps?", "Ask Maps is a Gemini-powered chat feature in the Google Maps app. You ask a question in plain language and get recommendations drawn from place information and reviews. It launched in the US and India in March 2026 and has since expanded to more countries."],
      ["Can Google's AI call my business?", "Yes. Google can call businesses for customers to ask about appointments or prices, and in November 2026 Ask Maps added appointment finding for home-repair businesses in the US. Verified businesses manage customer-request calls under Business Profile settings, Advanced settings."],
      ["Do I need special markup to show up in AI Mode or AI Overviews?", "No. Google says there are no additional requirements beyond normal SEO: indexed pages, content in text and a current Business Profile."],
      ["How does Google's AI pick which contractors to recommend?", "Google hasn't published the details. Its answers draw on the same local signals as Maps, relevance, distance and prominence, plus review content and information from websites."],
      ["How do I check if Google's AI recommends my business?", "Ask Ask Maps and AI Mode the questions your customers would ask, from inside your service area, and note who gets named and why. Repeat monthly."],
      ["Should I turn off Google's automated calls?", "Only if you can't answer them. These calls come from real customer requests, so leave them on if every call gets picked up by a person or an AI answering service."],
    ],
  },
];
