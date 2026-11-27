// Google Business Profile verification cluster (added 2026-11-27): how to verify, video verification, verification
// problems, and claiming a listing someone else controls. Every Google rule here was read on Google's own Business
// Profile help pages on 2026-11-27 (verify, video recording, request ownership, duplicates, claim, owners and managers,
// transfer primary ownership, edit review, guidelines). Re-check them when updating: Google changes this flow often.
// Case study facts (Cooling Comfort Inc.) are owner-confirmed and limited to: months trying, free call, verified 3 days later.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const G_VERIFY = (t = "Google's verification help page") => A("https://support.google.com/business/answer/7107242", t);
const G_VIDEO = (t = "Google's video verification page") => A("https://support.google.com/business/answer/14271705", t);
const G_OWNERSHIP = (t = "Google's request-ownership page") => A("https://support.google.com/business/answer/4566671", t);
const G_DUPES = (t = "Google's duplicates and ownership page") => A("https://support.google.com/business/answer/12756178", t);
const G_CLAIM = (t = "Google's add-or-claim page") => A("https://support.google.com/business/answer/2911778", t);
const G_PEOPLE = (t = "Google's owners and managers page") => A("https://support.google.com/business/answer/3403100", t);
const G_TRANSFER = (t = "Google's primary ownership page") => A("https://support.google.com/business/answer/3415281", t);
const G_EDITS = (t = "Google's page on edit reviews") => A("https://support.google.com/business/answer/3038311", t);
const G_GUIDELINES = (t = "Google's guidelines for representing your business") => A("https://support.google.com/business/answer/3038177", t);
const G_HELP = (t = "Business Profile support") => A("https://support.google.com/business/gethelp", t);
const G_REMOVE_DUP = (t = "remove the duplicate") => A("https://support.google.com/business/answer/4669092", t);
const G_MERGE = (t = "report it as a duplicate on Google Maps") => A("https://support.google.com/maps/answer/10552932#duplicate", t);
const G_ACCOUNTS = (t = "Google's account recovery troubleshooter") => A("https://support.google.com/accounts/troubleshooter/2402620", t);
const G_SEARCH_CONSOLE = (t = "Google Search Console") => A("https://support.google.com/webmasters/answer/34592", t);
const CASE = (t = "Cooling Comfort's case study") => `<a href="/results/cooling-comfort">${t}</a>`;
const PHONE = `<a href="tel:+13323331008">(332) 333-1008</a>`;

export const guides17 = [
  // ------------------------------------------------------------------ PILLAR: HOW TO VERIFY
  {
    slug: "how-to-verify-google-business-profile",
    path: "/guides/how-to-verify-google-business-profile",
    title: "How to Verify Your Google Business Profile",
    description: "Every Google Business Profile verification method, the one contractors usually get, step-by-step setup, how long review takes, and what to do when you're stuck.",
    h1: "How to verify your Google Business Profile as a contractor",
    lede: "Until your profile is verified, you can't fully edit it, reply to reviews or count on showing up for local searches. Here is every method Google uses, checked on Google's own help pages in November 2026, and how a contractor without a storefront gets through it.",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Stuck on verification? We'll walk through it with you, free.",
    content: `
<div class="callout"><p><strong>Short version:</strong> sign in at business.google.com, add or claim your business, then use the verification method Google offers you. Google picks the method, and for most service-area contractors that means recording a short live video from your phone. Google says reviews take up to 5 business days. If nothing works, call us at ${PHONE} and we'll go through it with you on a free call.</p></div>
<h2>Before you start: get these right first</h2>
<p>Many failed verifications start with a profile that doesn't match the real business. Fix these before you press "Get verified," because changing them later can restart the process.</p>
<ul>
<li><strong>Business name:</strong> your real-world name as it appears on your truck, invoices and website. No city or service keywords added. ${G_GUIDELINES()} say "unnecessary information" in the name isn't permitted.</li>
<li><strong>Address:</strong> a real place you work from. Google says P.O. boxes and remote mailboxes aren't acceptable, and a virtual office you don't operate from isn't eligible. Working from home is fine.</li>
<li><strong>Hide the address</strong> if customers don't come to you. Google's guidelines say service-area businesses should hide it. You still verify with it. Our <a href="/guides/google-business-profile-service-area">service-area setup guide</a> covers this step.</li>
<li><strong>Primary category:</strong> the most specific one for your main work, such as "HVAC contractor" or "Plumber." See our <a href="/guides/google-business-profile-categories">category guide by trade</a>.</li>
<li><strong>Phone number:</strong> one that rings a person. Google warns that phone menu systems (IVR) can't receive the verification code.</li>
<li><strong>A Google Account you will keep.</strong> Use an email the business owns, not an employee's or an agency's personal login.</li>
</ul>
<h2>The five verification methods</h2>
<p>Per ${G_VERIFY()} (checked November 2026), Google decides which methods you're offered and you can't change them. The choice depends on your business type, public information, region and business hours. Some businesses must complete more than one.</p>
<table>
<thead><tr><th>Method</th><th>How it works</th><th>What to know</th></tr></thead>
<tbody>
<tr><td>Video recording</td><td>You record a live, continuous video in the Business Profile app showing your location, tools and proof you run the business.</td><td>Google recommends it if you're eligible. Review takes up to 5 business days.</td></tr>
<tr><td>Live video call</td><td>A Google support rep joins a video call and asks you to show the same things.</td><td>Only during your listed business hours. Not available for every business.</td></tr>
<tr><td>Phone or text</td><td>Google calls or texts a code to your business number.</td><td>Phone trees can't receive the code. Answer the call yourself.</td></tr>
<tr><td>Email</td><td>Google sends steps to an address shown on the verification screen.</td><td>You must be able to open that inbox.</td></tr>
<tr><td>Postcard</td><td>Google mails a 5-digit code to your business address.</td><td>Most arrive within 14 days and codes expire after 30 days. Not offered to everyone.</td></tr>
</tbody>
</table>
<p>Google also lists instant verification for some businesses that have already verified their website in ${G_SEARCH_CONSOLE()}, and bulk verification for brands with many locations. Most owner-operators won't see either.</p>
<h2>Which method will you get as a contractor?</h2>
<p>Google doesn't publish odds, so nobody can promise you a method. What we can say from Google's pages: video verification is written to work for storefront, service-area and hybrid businesses, and Google recommends it whenever you're eligible. So if you run your company from home or out of a truck, plan on the video. Phone, text and email codes are quicker when offered. Postcards are less common, and they go to the address on the profile, so a home-based owner needs to watch the mailbox.</p>
<p>If you're offered a live video call, book it for a time you can walk outside to your truck and street sign, inside your listed hours. The rep asks for the same three things a recorded video shows. Our <a href="/guides/google-business-profile-video-verification">video verification guide</a> has a shot-by-shot plan for both.</p>
<h2>Step by step: verifying a service-area business</h2>
<ol>
<li>Go to business.google.com/add, or search for your company on Google Maps to see if a listing already exists. If one exists, claim it instead of making a new one (see <a href="/guides/how-to-claim-google-business-profile">how to claim your listing</a>).</li>
<li>Enter your real business name and primary category.</li>
<li>Enter the address you work from, then choose that you serve customers at their location and hide the address.</li>
<li>Add your service areas by city or ZIP. Google's guidelines say they shouldn't extend beyond about 2 hours of driving from your base.</li>
<li>Add your phone and website, then select "Get verified."</li>
<li>Pick from the methods shown. For video, install the Google Business Profile app on your phone first, since it must be recorded live there.</li>
<li>Finish the steps, then stop editing. Don't change your name, address or category while you wait. For postcards, Google says those edits make the mailed code useless, and requesting a new code cancels the old one.</li>
<li>Watch for the confirmation email. Once verified, finish the rest of the profile with our <a href="/guides/google-business-profile-optimization">optimization checklist</a>.</li>
</ol>
<h2>How long verification takes</h2>
<p>Google says verification reviews take up to 5 business days, and in rare cases longer. Postcards add mailing time: most arrive within 14 days. Separately, ${G_EDITS("ordinary edits")} usually clear in about 10 minutes but can take up to 30 days. If the "Get verified" button comes back after your review, Google couldn't verify you and you should try again or use another method. If you see "Review issues," your video wasn't accepted. Our <a href="/guides/google-business-profile-verification-problems">verification problems guide</a> covers each of these states and the fix.</p>
<h2>If nothing works</h2>
<p>Work through it in this order:</p>
<ol>
<li>Check the profile against the guidelines. A keyword-stuffed name, a mailbox address or the wrong category is often the real problem.</li>
<li>Try another method if Google offers more than one.</li>
<li>Re-record a video that adds whatever the rejection notice says was missing.</li>
<li>Contact ${G_HELP()}. Google's verification page says to contact support if you can't verify.</li>
</ol>
<p>Verification is different from a suspension. If your profile was verified and then disappeared or shows "suspended," read our <a href="/guides/google-business-profile-suspended">suspension guide</a> instead.</p>
<h2>A real example: months stuck, verified in 3 days</h2>
<p>Cooling Comfort Inc., an HVAC company in Inglewood, California, had been trying to get its profile verified for months. After a free consultation call with us, the profile was verified 3 days later. On the call we went through the profile and the verification steps together. Read ${CASE()}.</p>
<h2>Or call us and we'll go through it with you</h2>
<p>Everything above is free and you can do it yourself. If you'd rather not guess, call ${PHONE} and we'll go through your profile and the verification steps with you on a free call. No charge and no contract. You can also get a <a href="/free-google-maps-audit">free Google Maps audit</a> to see what's holding your listing back.</p>
<p>If you want it handled every month after that, our <a href="/services/google-business-profile">Google Business Profile management</a> keeps the profile inside Google's rules and posts for you. It costs {{PRICE:gbp}}. You stay the owner of your profile.</p>`,
    faq: [
      ["How do I verify my Google Business Profile?", "Sign in at business.google.com, add or claim your business, select Get verified and use the method Google offers. Methods include a recorded video, a live video call, a phone or text code, email or a postcard."],
      ["Can I choose my verification method?", "No. Google says it picks the methods based on your business type, public information, region and hours, and they can't be changed. You can switch only between the options it shows you."],
      ["How long does Google Business Profile verification take?", "Google says verification reviews take up to 5 business days, rarely longer. Postcards add mailing time, and most arrive within 14 days."],
      ["Can I verify a business that runs from my home?", "Yes. Use your home address, hide it from customers and set a service area. Google's video rules let home-based businesses show signs and landmarks in their immediate neighborhood."],
      ["Why can't I use a P.O. box or virtual office?", "Google's guidelines say P.O. boxes and remote mailboxes aren't acceptable addresses, and a rented address where you don't operate isn't eligible for a profile."],
      ["Does TableTurnerr charge to help with verification?", "The consultation call is free. Call (332) 333-1008 and we'll go through the profile and the verification steps with you."],
    ],
  },

  // ------------------------------------------------------------------ VIDEO VERIFICATION
  {
    slug: "google-business-profile-video-verification",
    path: "/guides/google-business-profile-video-verification",
    title: "Google Business Profile Video Verification Guide",
    description: "A shot-by-shot plan for a contractor's Google Business Profile verification video, from home or a truck, with a pre-recording checklist and why videos fail.",
    h1: "Google Business Profile video verification: a contractor's shot list",
    lede: "Video verification is the method Google recommends when you're eligible, and it's the one many contractors without a storefront end up using. It's short, but it's strict. Here's what Google asks for, checked on Google's help pages in November 2026, turned into a shot-by-shot plan for a home-based or truck-based business.",
    eyebrow: "Google Business Profile", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want a second set of eyes before you record? Call us.",
    content: `
<div class="callout"><p><strong>Short version:</strong> record one live, unbroken video of at least 30 seconds in the Business Profile app on your phone. It needs to show where you are, the tools you work with, and proof you run the business, such as unlocking your work van or a permit or invoice in your business name. Plan the route before you press record. Google says review takes up to 5 business days.</p></div>
<h2>What the video has to prove</h2>
<p>Per ${G_VIDEO()} (checked November 2026), the video proves three things. For a service-area business, Google describes them like this:</p>
<table>
<thead><tr><th>Proof</th><th>What Google asks for</th><th>Contractor example</th></tr></thead>
<tbody>
<tr><td>Location</td><td>Street signs, nearby landmarks or other identifiers at your business address. Home-based businesses can show signs and landmarks in their immediate neighborhood.</td><td>The street sign at your corner, then your house number</td></tr>
<tr><td>Equipment and tools</td><td>The professional tools, equipment, products or workspace you use. Business cards or branded apparel also count.</td><td>Gauges and a recovery machine, a drain machine, ladders on the rack, a shirt with your logo</td></tr>
<tr><td>Management</td><td>You performing a service, or opening business-only assets like a branded van. Or a business permit, invoice or utility bill that matches your profile name.</td><td>Unlocking the van with your keys, then holding up a permit or invoice</td></tr>
</tbody>
</table>
<p>The address you show in the video goes to Google's review team. It does not get published if your profile hides the address.</p>
<h2>Google's rules before you press record</h2>
<ul>
<li><strong>Live only.</strong> Google says pre-recorded videos aren't allowed. You can't upload a file from your camera roll.</li>
<li><strong>One take.</strong> The video must be unedited, unique and complete, with no breaks.</li>
<li><strong>At least 30 seconds.</strong> That's Google's minimum. We suggest planning for one to two minutes so nothing gets rushed.</li>
<li><strong>From your phone.</strong> It's recorded and uploaded through the Business Profile app.</li>
<li><strong>No sensitive details.</strong> Don't show bank, tax or ID numbers or other private information, and don't show other people's faces.</li>
</ul>
<h2>Shot-by-shot plan: home-based contractor</h2>
<p>This plan suits a plumber, electrician or HVAC tech who parks the truck at home. Walk it once without recording.</p>
<ol>
<li><strong>Street sign (about 10 seconds).</strong> Start at the nearest corner. Hold the camera on the street sign long enough to read it, then turn slowly toward your house.</li>
<li><strong>Walk to the address (about 15 seconds).</strong> Keep filming as you walk. Show a neighbor's house or a landmark on the way, then your house number.</li>
<li><strong>The truck or van (about 15 seconds).</strong> Show the business name on the vehicle if it's lettered. Pull out your keys and unlock it on camera.</li>
<li><strong>Tools (about 20 seconds).</strong> Open the doors or bins and pan across the gear you use every day. Name what you're showing out loud if it helps.</li>
<li><strong>Paperwork (about 15 seconds).</strong> Hold up a business permit, a recent invoice or a utility bill with the same business name as your profile. Cover any account numbers first.</li>
<li><strong>Stop recording.</strong> Watch it back in the app. If any shot is shaky or unreadable, tap Try again and redo the whole thing.</li>
</ol>
<h2>Shot-by-shot plan: shop, yard or unmarked truck</h2>
<p>A roofer with a yard, a landscaper with a trailer lot or a garage door tech with a small shop follows the same order with different shots.</p>
<ol>
<li>Street sign or cross street, then the building or lot entrance.</li>
<li>Any permanent sign with your business name. If it's posted, film it clearly. Google's storefront rules require the name on a permanent fixture, so a sign helps a hybrid business.</li>
<li>Unlock the gate, door or storage room on camera. That is the "access only an employee would have" Google wants.</li>
<li>Equipment: mowers and trailers, ladders and tear-off gear, spring stock and openers.</li>
<li>No lettering on the truck? Lean harder on proof of management. Show business cards, a shirt with your logo and a permit or invoice in the business name.</li>
</ol>
<h2>Pre-recording checklist</h2>
<ul>
<li>The name on your profile matches the name on your truck, invoices and permit. Fix the profile first if it doesn't. ${G_GUIDELINES()} require your real-world name.</li>
<li>The Business Profile app is installed and signed in to the account that owns the profile.</li>
<li>Location, camera and microphone permissions are on. The app asks for them.</li>
<li>Daylight. Street signs are hard to read at dusk.</li>
<li>A strong signal at the start, so the upload doesn't stall.</li>
<li>Paperwork is ready, with numbers covered.</li>
<li>No family members, customers or neighbors in frame.</li>
<li>You've walked the route once and it fits in a single take.</li>
</ul>
<h2>Why videos get rejected, and the fix</h2>
<p>If a video fails, the app shows "Your video didn't meet all the requirements" with the reasons. Tap Review issues, then record a new video that includes everything from the first one plus what was missing. Google names these common problems:</p>
<table>
<thead><tr><th>Problem</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Business name not visible</td><td>Show the name on the vehicle, a sign, business cards or paperwork, and make sure it matches the profile</td></tr>
<tr><td>No nearby area shown</td><td>Start at a readable street sign or landmark. Google says to avoid empty land or places without clear markers</td></tr>
<tr><td>Missing proof of authorization</td><td>Unlock the van, gate or shop on camera, or show a permit, invoice or utility bill in the business name</td></tr>
</tbody>
</table>
<p>Other common trip-ups: a cut in the video, rushing past the sign, and a profile name with extra keywords that matches nothing on camera. If you keep failing, Google says to try another verification method before contacting support. Our <a href="/guides/google-business-profile-verification-problems">verification problems guide</a> covers the next steps.</p>
<h2>After you upload</h2>
<p>Google says review can take up to 5 business days. Don't edit your name, address or category while you wait. Once you're verified, you can delete the video under Business Profile settings, then Advanced settings, then Video uploads. Then use those same truck and tool shots as profile photos. Our <a href="/guides/google-business-profile-photos-and-posts">photos and posts guide</a> shows which ones help. For the full picture of every method, see <a href="/guides/how-to-verify-google-business-profile">how to verify your Google Business Profile</a>.</p>
<h2>Want help before you hit record?</h2>
<p>We helped Cooling Comfort Inc., an Inglewood HVAC company that had been stuck for months, get verified 3 days after a free call with us (${CASE("see the case study")}). Call ${PHONE} and we'll go through your profile and the plan for your video with you on a free call. Or start with a <a href="/free-google-maps-audit">free Google Maps audit</a>. If you'd like us to manage the profile from then on, see <a href="/services/google-business-profile">Google Business Profile management</a>.</p>`,
    faq: [
      ["How long should a Google Business Profile verification video be?", "Google's minimum is 30 seconds. Plan for one to two minutes so you can show the street sign, tools and proof of management without rushing."],
      ["Can I upload a video I already recorded?", "No. Google says pre-recorded videos aren't allowed. You must record it live in the Business Profile app on your phone."],
      ["Can I edit or cut the video?", "No. Google requires one unedited, complete video with no breaks. If you make a mistake, tap Try again and record the whole thing again."],
      ["What if my truck has no logo on it?", "Show other proof. Google accepts business cards or branded apparel for equipment, and a business permit, invoice or utility bill in your business name as proof of management."],
      ["Will my home address be shown publicly?", "No, not if your profile hides the address. The video goes to Google's reviewers, and service-area businesses are told to hide their address from customers."],
      ["How long does video verification review take?", "Google says up to 5 business days. If it's rejected, tap Review issues and record a new video that adds what was missing."],
    ],
  },

  // ------------------------------------------------------------------ VERIFICATION PROBLEMS
  {
    slug: "google-business-profile-verification-problems",
    path: "/guides/google-business-profile-verification-problems",
    title: "Google Business Profile Verification Problems, Fixed",
    description: "Verification pending for weeks, no method offered, rejected video, a postcard that never came, or a loop after edits: what each one means and how to fix it.",
    h1: "Google Business Profile verification problems and how to fix them",
    lede: "A stuck verification can keep a contractor off Google Maps for months. Most problems come down to a handful of states, and each has a fix. Every rule below was checked on Google's own help pages in November 2026.",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Been stuck for weeks? Get on a free call with us.",
    content: `
<div class="callout"><p><strong>Short version:</strong> first find out which state your profile is in. "Pending" past 5 business days, a "Get verified" button that came back, a "Review issues" notice and a code that never arrived each need a different fix. Most stuck profiles have a name, address or category problem underneath, or someone kept editing during review. Fix that first, then re-verify with a method Google offers.</p></div>
<h2>Step one: work out which state you're in</h2>
<p>These are the signals ${G_VERIFY()} describes (checked November 2026), and what to do about each.</p>
<table>
<thead><tr><th>What you see</th><th>What it means</th><th>What to do</th></tr></thead>
<tbody>
<tr><td>Under review, waiting</td><td>Google is checking your submission. It says reviews take up to 5 business days, rarely longer.</td><td>Wait. Don't edit core details.</td></tr>
<tr><td>"Get verified" button is back</td><td>Google couldn't fully verify the business.</td><td>Re-verify, or use another method if more than one is offered.</td></tr>
<tr><td>"Review issues"</td><td>Your verification video wasn't accepted.</td><td>Read the reasons and record a new video that adds what was missing.</td></tr>
<tr><td>Asked for more information</td><td>Usually follows recent changes to your business details.</td><td>Select Get verified and re-verify with what's requested.</td></tr>
<tr><td>Edits marked pending</td><td>An edit is under review, not your verification. Edits usually take about 10 minutes but can take up to 30 days, per ${G_EDITS()}.</td><td>Stop stacking more edits on top.</td></tr>
<tr><td>Suspended</td><td>A different problem: a policy action, not a verification step.</td><td>Read our <a href="/guides/google-business-profile-suspended">suspension guide</a>.</td></tr>
</tbody>
</table>
<h2>Verification pending for weeks</h2>
<p>Google's stated review time is up to 5 business days. Weeks past that usually means one of three things. You edited the name, address or category during review, which can send it back for another look. The profile doesn't match the real business, so the reviewer couldn't confirm it. Or the submission stalled and needs a nudge.</p>
<p>The fix: compare the profile to your truck, invoices and website. Fix any mismatch once, then leave it alone. If the "Get verified" button is showing, use it. If it's been well past 5 business days with no change, contact ${G_HELP()} with your business name and the date you submitted.</p>
<h2>"Can't verify" or no method offered</h2>
<p>Google picks your methods and you can't change them. When no usable option appears, check eligibility before anything else. ${G_GUIDELINES()} say P.O. boxes and remote mailboxes aren't acceptable and a virtual office you don't work from isn't eligible. ${G_VIDEO("Google's video page")} adds that online-only businesses with no in-person service can't get a profile. A contractor who visits customers is eligible, so the problem is usually the address or the name.</p>
<p>Other common blockers: your phone number runs through a menu system, which Google says can't receive the code. Or the live video call option is only open during your listed hours and you keep trying after hours. If you've ruled those out, Google's verification page says to contact support when you can't verify.</p>
<h2>Video rejected</h2>
<p>Google's video page names the usual reasons: the business name isn't visible, no nearby area is shown, or proof that you run the business is missing. Tap Review issues, read the reasons, then record a new video that includes everything from the first plus what was missing. Don't just reshoot the same video. Our <a href="/guides/google-business-profile-video-verification">video verification guide</a> has a shot list for home-based and truck-based contractors.</p>
<h2>The postcard never came</h2>
<p>Google says most codes arrive within 14 days and expire after 30 days. Two mistakes make a postcard fail even when it arrives:</p>
<ul>
<li><strong>Editing while you wait.</strong> Changing your name, address or category before the code arrives means the code won't work.</li>
<li><strong>Requesting another code.</strong> Google says a new request invalidates the code already in the mail and can make the process take longer.</li>
</ul>
<p>Give it the full 14 days and check that the mailing address is complete, including any unit number. If it still hasn't come, see whether Google now offers another method under Get verified before asking for a new card.</p>
<h2>Phone, text or email code didn't work</h2>
<p>These are the quickest methods when Google offers them, and the failures are usually simple:</p>
<ul>
<li><strong>The call went to a phone menu or voicemail.</strong> Google says menu systems (IVR) can't receive the code. Turn off the menu or call forwarding for a few minutes, or answer from a phone that rings directly.</li>
<li><strong>The text went to a number nobody checks.</strong> If you list a tracking or office line, make sure someone can read texts on that exact number.</li>
<li><strong>The email went to an inbox you can't open.</strong> Google only sends it to an address shown on the verification screen. If none of those are yours, pick another method.</li>
<li><strong>You shared the code.</strong> Google says it never asks for your code and you shouldn't share it, even with people who manage your profile. Enter it yourself.</li>
</ul>
<h2>Stuck in a loop after edits</h2>
<p>This one catches owners who keep tweaking. Google says requests for more verification usually follow recent changes to your business details. Each change to a core field can put the profile back under review. The fix is boring but it works: decide on the final name, address, service areas and primary category, make the changes in one sitting, re-verify, then leave those fields alone. Weekly posts, photos and review replies are fine. See <a href="/guides/google-business-profile-mistakes">common profile mistakes</a> for what else to avoid.</p>
<h2>Months stuck: what helped Cooling Comfort</h2>
<p>Cooling Comfort Inc., an HVAC company in Inglewood, California, had spent months trying to get its Google Business Profile verified. We set up a free consultation call and went through the profile and the verification steps together. Three days after that call, the profile was verified. The details are in ${CASE()}.</p>
<h2>When to contact Google support</h2>
<ol>
<li>You've waited more than 5 business days with no change.</li>
<li>You've fixed the profile and tried every method Google offers.</li>
<li>Google tells you to contact support, or no method is available.</li>
</ol>
<p>Use ${G_HELP()}. Have your business name, address, the Google Account email, the method you tried and when, and any rejection reasons ready.</p>
<h2>Or call us and we'll go through it with you</h2>
<p>You can fix all of this yourself with the steps above. If you'd rather have someone look at it with you, call ${PHONE} for a free call, or start with a <a href="/free-google-maps-audit">free Google Maps audit</a>. When it's fixed, our <a href="/services/google-business-profile">Google Business Profile management</a> can keep it clean so you don't end up here again. It costs {{PRICE:gbp}}. Also see <a href="/guides/how-to-verify-google-business-profile">how to verify your Google Business Profile</a> for the full method-by-method walkthrough.</p>`,
    faq: [
      ["Why is my Google Business Profile verification still pending?", "Google says reviews take up to 5 business days, rarely longer. If it's been weeks, check that you didn't edit your name, address or category during review and that the profile matches the real business, then contact support."],
      ["Why does Google say I can't verify my business?", "The most common causes are an ineligible address, such as a P.O. box or virtual office, or a name that doesn't match the real business. If you've ruled those out, Google says to contact support."],
      ["What should I do if my verification video was rejected?", "Tap Review issues in the app, read the reasons, and record a new video that includes everything from the first plus what was missing, such as a readable street sign or proof you run the business."],
      ["My postcard never arrived. Should I request a new one?", "Wait the full 14 days first. Google says requesting a new code invalidates the one in the mail. If it still hasn't come, check for another method under Get verified."],
      ["Why does Google keep asking me to verify again?", "Google says re-verification requests usually follow recent changes to business details. Make your core edits once, re-verify, then stop changing the name, address and category."],
      ["Can someone help me verify for free?", "Yes. TableTurnerr's consultation call is free. Call (332) 333-1008 and we'll go through the profile and verification steps with you."],
    ],
  },

  // ------------------------------------------------------------------ CLAIM / OWNERSHIP
  {
    slug: "how-to-claim-google-business-profile",
    path: "/guides/how-to-claim-google-business-profile",
    title: "How to Claim Your Google Business Profile",
    description: "Claim an existing Google listing, get it back from an old agency, ex-employee or previous owner, request access, and clean up duplicates. Checked November 2026.",
    h1: "How to claim your Google Business Profile, even if someone else owns it",
    lede: "Many contractors already have a Google listing they never made. It was auto-created, set up by an old marketing company, or verified by an employee who's long gone. Here's how to take control of it, using the process on Google's own help pages as of November 2026.",
    eyebrow: "Google Business Profile", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Can't get your listing back? We'll work through it with you.",
    content: `
<div class="callout"><p><strong>Short version:</strong> search for your business on Google Maps. If the listing is unclaimed, select "Claim this business" and verify. If someone else owns it, use Request access. Google gives the current owner 3 days to respond, and if they don't, you may be able to claim it yourself. Service-area businesses with no shop request the transfer through Google support. Don't create a second profile, because duplicates get hidden.</p></div>
<h2>First, find out who controls the listing</h2>
<p>Open Google Maps and search your business name and city. On the app, tap the result and then About. You'll land in one of three places:</p>
<table>
<thead><tr><th>What you see</th><th>What it means</th><th>Your next step</th></tr></thead>
<tbody>
<tr><td>"Claim this business"</td><td>Nobody has verified it.</td><td>Claim and verify it yourself.</td></tr>
<tr><td>"Someone else may manage this Business Profile"</td><td>It's verified by another Google Account.</td><td>Request access, or ask the person directly to add you.</td></tr>
<tr><td>No listing at all</td><td>There's nothing to claim.</td><td>Create one at business.google.com/add, then <a href="/guides/how-to-verify-google-business-profile">verify it</a>.</td></tr>
</tbody>
</table>
<p>Before anything else, ask around. If a partner, office manager or past agency set it up, the fastest route is often their login, not Google's forms. If the login was yours and you forgot it, use ${G_ACCOUNTS()}.</p>
<h2>Claiming an unclaimed listing</h2>
<p>Per ${G_CLAIM()} (checked November 2026):</p>
<ol>
<li>Find the listing on Google Maps.</li>
<li>Select "Claim this business," then Manage now.</li>
<li>Choose a verification option and follow the steps.</li>
<li>Before you verify, check that the name and address follow ${G_GUIDELINES()}: your real business name and a real address, not a P.O. box or virtual office.</li>
</ol>
<p>Most contractors are then asked to verify, often by video. Our <a href="/guides/google-business-profile-video-verification">video verification guide</a> has a shot list. Once you're in, hide your address if customers don't come to you, as covered in our <a href="/guides/google-business-profile-service-area">service-area guide</a>.</p>
<h2>When someone else owns it: request access</h2>
<p>${G_OWNERSHIP()} lays out the process for storefront and hybrid businesses:</p>
<ol>
<li>Go to business.google.com/add.</li>
<li>Enter your business name and address and pick it from the list.</li>
<li>When you see "Someone else may manage this Business Profile," select Request access.</li>
<li>Fill in the form and submit. You get a confirmation email.</li>
</ol>
<p>The current owner gets an email and has 3 days to respond. If they approve, you get an email and can manage the profile. If they deny it, you can appeal, and you can still suggest edits to the listing on Maps. If they don't answer within 3 days, you may be able to claim it: open the confirmation email, select View request, then Verify. Google warns the claim option isn't always available.</p>
<p>A few things make the request go smoother. Submit it from the Google Account the business will keep long term, not a personal one you might lose. Use the exact business name and phone number customers know. And keep the confirmation email, because that's where the View request link lives. You can check the status any time by signing in to your Business Profile or opening that email.</p>
<h2>Service-area businesses: the support route</h2>
<p>Google's request-ownership page says service-area businesses with no physical shop or office must contact ${G_HELP("Google support")} instead of using the request form. Enter "Transfer ownership of listing" as the issue and pick that option when you submit. Have proof ready that you run the business, such as a business license, invoices and the website in your name.</p>
<h2>Old agency, ex-employee or previous owner</h2>
<table>
<thead><tr><th>Situation</th><th>Best route</th></tr></thead>
<tbody>
<tr><td>Old marketing agency owns it</td><td>Ask them in writing to add you as an owner, then make you primary owner. If they won't answer, use Request access, or Google support for a service-area business.</td></tr>
<tr><td>Ex-employee verified it with a personal account</td><td>Contact them first. If they're unreachable, request access and wait out the 3 days.</td></tr>
<tr><td>You bought the business</td><td>Ask the seller to make you primary owner before closing. Afterwards, use Request access with proof of the sale.</td></tr>
<tr><td>Co-owner or partner has it</td><td>Have them add you as an owner from People and access.</td></tr>
</tbody>
</table>
<p>A friendly handover takes two steps. Per ${G_PEOPLE()}, an owner adds you under Business Profile settings, then People and access. Then, per ${G_TRANSFER()}, only the current primary owner can make you primary owner, and only once you're already an owner or manager. Expect a wait: for 7 days after joining, a new owner or manager can't remove other users or take primary ownership.</p>
<h2>Duplicates: one business, one profile</h2>
<p>${G_DUPES()} says you can have only one profile per business, and a profile flagged as a duplicate won't appear in Search or Maps. That's why making a fresh profile instead of claiming the old one backfires.</p>
<ul>
<li><strong>You made an extra one by accident:</strong> ${G_REMOVE_DUP()}. Google warns this removes all its content and managers, so be sure it's the right one.</li>
<li><strong>Two public listings for the same business:</strong> ${G_MERGE()}. Google reviews every merge request. Reviews are combined, but review replies may be lost.</li>
<li><strong>You moved:</strong> edit the address on your existing profile. Don't create a new one.</li>
<li><strong>Separate listings per service</strong> (one for "AC repair," one for "furnace repair"): Google says to list services on one profile instead.</li>
</ul>
<h2>Keep control from now on</h2>
<p>Make the business owner the primary owner on a Google Account the company owns. Give agencies and staff manager access, not ownership, so they can post and reply but can't remove you. When someone leaves, remove them that week. For the settings worth fixing once you're in, work through our <a href="/guides/google-business-profile-optimization">optimization checklist</a>, and if an old profile was suspended, see our <a href="/guides/google-business-profile-suspended-service-area">service-area suspension guide</a>.</p>
<h2>Need a hand getting it back?</h2>
<p>Ownership disputes and stuck verifications are fixable, but the forms are easy to get wrong. One example: Cooling Comfort Inc. in Inglewood had spent months trying to verify, and was verified 3 days after a free call with us (${CASE("case study")}). Call ${PHONE} and we'll work through your listing with you on a free call, or start with a <a href="/free-google-maps-audit">free Google Maps audit</a>. If you want us to manage it after that, see <a href="/services/google-business-profile">Google Business Profile management</a>. You stay the owner, and we work as a manager.</p>`,
    faq: [
      ["How do I claim a Google Business Profile that already exists?", "Find it on Google Maps and select Claim this business, then Manage now, and verify. If it says someone else may manage it, use Request access instead."],
      ["How long does the current owner have to respond to my request?", "Google gives the current owner 3 days. If they don't respond, you may be able to claim the profile from the link in your confirmation email, though Google says that option isn't always available."],
      ["How do I get my Google listing back from an old agency?", "Ask them in writing to add you as an owner and then transfer primary ownership. If they won't respond, use Request access, or contact Google support if you're a service-area business with no shop."],
      ["Why can't I use the request access form as a service-area business?", "Google's request-ownership page says service-area businesses without a physical shop or office must contact Google support and choose Transfer ownership of listing."],
      ["Should I just create a new profile instead?", "No. Google allows one profile per business, and a profile flagged as a duplicate won't appear in Search or Maps. Claim or request the existing one."],
      ["Should my marketing company be the owner of my profile?", "No. Keep the business as primary owner on an account the company controls and give agencies manager access. Managers can post and reply but can't remove owners."],
    ],
  },
];
