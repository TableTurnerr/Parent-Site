// Google Business Profile optimization cluster (added 2026-11-27): optimization checklist, categories, photos and posts,
// and common mistakes. Written for service-area contractors (no storefront, hidden address).
// Every Google rule here was read on Google's own Business Profile help pages on 2026-11-27 (linked inline).
// Category names were checked against PlePer's US English Google category list on 2026-11-27; Google publishes no full
// list, and names change, so the text tells readers to confirm in the category box.
// Posting frequency and the seasonal plan are our recommendations, not Google rules, and the text says so.
// Verification topics live in guides17.mjs (writer A). Suspensions, service-area setup and Maps ranking live in
// guides2/6/8 and guides.mjs; this file links to them instead of repeating them.
// TableTurnerr prices are never typed here: {{PRICE:<key>}} tokens are filled from app/lib/pricing.ts.
const DATE = "2026-11-27";
const A = (href, text) => `<a href="${href}" rel="noopener">${text}</a>`;
const G_GUIDE = (t = "Google's guidelines for representing your business") => A("https://support.google.com/business/answer/3038177?hl=en", t);
const G_EDIT = (t = "Google's edit-your-profile help") => A("https://support.google.com/business/answer/14368911?hl=en", t);
const G_CAT = (t = "Google's category help") => A("https://support.google.com/business/answer/7249669?hl=en", t);
const G_RANK = (t = "Google's local ranking help") => A("https://support.google.com/business/answer/7091?hl=en", t);
const G_PHOTO = (t = "Google's photo and video guidelines") => A("https://support.google.com/business/answer/6103862?hl=en", t);
const G_POSTS = (t = "Google's posts help") => A("https://support.google.com/business/answer/7342169?hl=en", t);
const G_POSTPOLICY = (t = "Google's posts content policy") => A("https://support.google.com/business/answer/7213077?hl=en", t);
const G_REPLY = (t = "Google's review reply help") => A("https://support.google.com/business/answer/3474050?hl=en", t);
const G_SAB = (t = "Google's service-area help") => A("https://support.google.com/business/answer/9157481?hl=en", t);
const G_USERS = (t = "Google's owners and managers help") => A("https://support.google.com/business/answer/3403100?hl=en", t);
const G_DUP = (t = "Google's duplicate profiles help") => A("https://support.google.com/business/answer/12756178?hl=en", t);
const G_SERVICES = (t = "Google's services help") => A("https://support.google.com/business/answer/9455399?hl=en", t);
const G_INFO = (t = "Google's business information help") => A("https://support.google.com/business/answer/3039617?hl=en", t);
const PLEPER = (t = "PlePer's list of Google categories") => A("https://pleper.com/index.php?do=tools&sdo=gmb_categories&go=1&lang=en&country=us", t);
const PHONE = `<a href="tel:+13323331008">(332) 333-1008</a>`;
const CALL = `Or call us and we'll go through it with you on a free call: ${PHONE}.`;

export const guides18 = [
  // ------------------------------------------------------------------ PILLAR: OPTIMIZATION CHECKLIST
  {
    slug: "google-business-profile-optimization",
    path: "/guides/google-business-profile-optimization",
    title: "Google Business Profile Optimization Checklist (2026)",
    description: "A Google Business Profile checklist for contractors, in order of impact: category, name, service areas, hours, services, photos, reviews and posts.",
    h1: "Google Business Profile optimization checklist for contractors",
    lede: "Most contractor profiles are half filled in. This is the checklist we use, in the order that matters most, with Google's own rules for each field (checked November 2026).",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Get a free check of your profile.",
    content: `
<div class="callout"><p><strong>Short version:</strong> get verified first, then fix the fields that decide which searches you show up for: the primary category, your real business name, service areas and accurate hours. After that, fill in services, the description and photos, and keep reviews and replies coming every week. Posts help customers who find you, but they're the last thing on the list, not the first.</p></div>
<h2>Before you touch anything: three checks</h2>
<p>Optimizing a profile you don't control is wasted work. Check these first.</p>
<ol>
<li><strong>It's verified.</strong> Google lists verification first in its own ranking tips: it tells Google you're authorized to represent the business (${G_RANK()}, checked November 2026). Stuck? See <a href="/guides/how-to-verify-google-business-profile">how to verify your Google Business Profile</a>.</li>
<li><strong>You're the owner.</strong> Not your old web designer, not an ex-office manager. If someone else holds it, follow <a href="/guides/how-to-claim-google-business-profile">how to claim your Google Business Profile</a>.</li>
<li><strong>There's only one.</strong> Google allows one profile per business. A profile flagged as a duplicate won't show on Search or Maps (${G_DUP()}).</li>
</ol>
<h2>The checklist, in order of impact</h2>
<p>This order is our judgment from working on contractor profiles. The rules in each row are Google's.</p>
<table>
<thead><tr><th>Field</th><th>What to put</th><th>Common mistake</th></tr></thead>
<tbody>
<tr><td>Primary category</td><td>The most specific one for your main work: "HVAC contractor," "Plumber," "Roofing contractor." See <a href="/guides/google-business-profile-categories">categories by trade</a>.</td><td>A general or "supplier" category when you don't sell parts over the counter</td></tr>
<tr><td>Business name</td><td>Your real name, as it appears on your truck, invoices and website</td><td>Adding "HVAC Repair Inglewood" to it. Google bans service and location details in the name (${G_GUIDE()}).</td></tr>
<tr><td>Address and service areas</td><td>Hide your home address if customers don't come to you. List up to 20 cities or zip codes, within about a 2-hour drive (${G_SAB()}).</td><td>A virtual office or P.O. box. Google says neither is eligible.</td></tr>
<tr><td>Hours</td><td>The hours you really answer and book work</td><td>"Open 24 hours" when nights go to voicemail</td></tr>
<tr><td>Phone</td><td>A number that rings your business and that you control. You can add up to 2 more (${G_EDIT()}).</td><td>A number tied to an old agency's account</td></tr>
<tr><td>Website</td><td>The page for this business. Google doesn't allow URLs that redirect to social pages.</td><td>Linking a Facebook page instead of a website</td></tr>
<tr><td>Additional categories</td><td>A few that truly describe other work. Google allows up to 9 more.</td><td>Ten categories, one per service</td></tr>
<tr><td>Services</td><td>Every job you sell, with a sentence or two each (${G_SERVICES()})</td><td>Leaving Google's suggested list half picked</td></tr>
<tr><td>Description</td><td>Up to 750 characters about what you do, where, and since when. No URLs or HTML.</td><td>Prices, sales and coupons. Google says to focus on the business, not promotions.</td></tr>
<tr><td>Photos</td><td>Real job photos, trucks, crew, logo</td><td>Stock images that look like every other listing</td></tr>
<tr><td>Reviews and replies</td><td>A steady flow, with a reply to each</td><td>Fifty reviews one month, none for a year</td></tr>
<tr><td>Posts</td><td>One short, useful post a week</td><td>Posting phone numbers in the text, which can get a post rejected</td></tr>
</tbody>
</table>
<h2>Your first hour, step by step</h2>
<ol>
<li>Open your profile while signed in to the Google account that owns it and choose Edit profile.</li>
<li>Set the primary category. Type your trade and pick the most specific match. Add two to four additional categories only if each describes work you really do.</li>
<li>Check the name matches your signage and paperwork, with nothing added. Google only allows "LLC" or "Inc." if they appear on real-world proof like signs or invoices.</li>
<li>Under Location, turn off the address if customers don't visit, and add service areas by city or zip.</li>
<li>Set regular hours, then add special hours for holidays.</li>
<li>Open Edit services. Select every suggested service that applies, then add custom ones for the rest.</li>
<li>Write the description. Lead with what you do and the area you cover, then how long you've been in business and what makes you different.</li>
<li>Upload 10 or more real photos: logo, a cover shot, your truck, your crew and recent jobs.</li>
<li>Save and wait. Google reviews changes before they go live (${G_EDIT()}).</li>
</ol>
<p>Don't do steps 2 to 4 one day and change them again the next. Google warns that changing your name after verification may mean verifying again, and moving means you must (${G_INFO()}). Make the big edits once, carefully.</p>
<h2>What a strong contractor profile says</h2>
<p>Services and the description are where trade detail lives. A few examples of what to list:</p>
<ul>
<li><strong>HVAC:</strong> AC repair, AC installation, furnace repair, heat pump installation, duct cleaning, maintenance plans. See <a href="/marketing/hvac">HVAC marketing</a>.</li>
<li><strong>Plumbing:</strong> drain cleaning, water heater repair and replacement, leak repair, repiping, sewer line work. See <a href="/marketing/plumbing">plumbing marketing</a>.</li>
<li><strong>Roofing:</strong> roof replacement, repair, inspections, storm damage, gutters. See <a href="/marketing/roofing">roofing marketing</a>.</li>
</ul>
<p>A plain description beats a clever one. Something like: "Family-owned heating and air company serving Inglewood, Hawthorne and the South Bay since 2012. Same-day AC and furnace repair, new system installs and yearly maintenance plans." That's about 200 characters, all useful.</p>
<h2>Keep it healthy every month</h2>
<ul>
<li><strong>Every job:</strong> ask for a review. Our <a href="/guides/how-to-get-more-google-reviews">review guide</a> covers how, and <a href="/guides/how-many-google-reviews-to-rank">how many you need</a>.</li>
<li><strong>Every review:</strong> reply. The reviewer is notified when you do (${G_REPLY()}). For the hard ones, see <a href="/guides/how-to-respond-to-negative-google-reviews">replying to negative reviews</a>.</li>
<li><strong>Every week:</strong> add a few job photos and one post. The <a href="/guides/google-business-profile-photos-and-posts">photos and posts guide</a> has a 4-week plan.</li>
<li><strong>Every season:</strong> check hours, special hours and services still match what you sell.</li>
<li><strong>Every quarter:</strong> check who has access under People and access, and remove anyone who left.</li>
</ul>
<h2>What optimization won't do</h2>
<p>A perfect profile still ranks best near where you're based. Google ranks local results on relevance, distance and prominence, and it says you can't pay for a better local ranking (${G_RANK()}). Filling in fields helps relevance. Reviews help prominence. Distance is fixed. For what to do about towns farther out, read <a href="/guides/rank-google-maps-without-storefront">ranking in Google Maps without a storefront</a> and <a href="/guides/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a>. And before you change anything big, skim the <a href="/guides/google-business-profile-mistakes">mistakes that hurt contractors</a>.</p>
<h2>Want a second pair of eyes?</h2>
<p>Cooling Comfort Inc., an HVAC company in Inglewood, had tried for months to get its profile verified and was verified 3 days after a free call with us (<a href="/results/cooling-comfort">Cooling Comfort's case study</a>).</p>
<p>You can do everything on this page yourself. ${CALL} You can also start with a <a href="/free-google-maps-audit">free Google Maps audit</a>. If you'd rather hand it off, our <a href="/services/google-business-profile">Google Business Profile management</a> handles the profile, photos and weekly posts. It costs {{PRICE:gbp}}.</p>`,
    faq: [
      ["What is the most important part of a Google Business Profile?", "For most contractors it's the primary category, because it decides which searches you're considered for. After that come your real business name, accurate service areas and hours, and a steady flow of reviews."],
      ["How many categories should a contractor use?", "One specific primary category and a few additional ones that each describe work you really do. Google allows up to 9 additional categories but advises using as few as needed."],
      ["Can I put my city or main service in my business name?", "Only if it's part of your real, legal business name used on signs and paperwork. Google's guidelines don't allow adding service or location details to the name, and breaking them can get a profile suspended."],
      ["Should a home-based contractor show their address?", "No. If customers don't come to your address, Google says to remove it and list service areas instead. You can list up to 20 cities or zip codes."],
      ["How long is the business description allowed to be?", "Up to 750 characters. Google says not to include URLs or HTML, and to focus on your business rather than prices or sales."],
      ["How often should I update my profile?", "Add reviews, replies, photos and a post every week. Change big fields like name, address and categories rarely, because Google reviews those edits and a name change or move can require verifying again."],
    ],
  },

  // ------------------------------------------------------------------ CATEGORIES
  {
    slug: "google-business-profile-categories",
    path: "/guides/google-business-profile-categories",
    title: "Google Business Profile Categories for Contractors",
    description: "How primary and additional Google Business Profile categories work, with real Google category names for HVAC, plumbing, roofing, electrical, cleaning and more.",
    h1: "Google Business Profile categories for contractors, by trade",
    lede: "Your primary category tells Google what kind of business you are. Pick the wrong one and you're competing for the wrong searches. Here's how categories work and the real names to look for in your trade.",
    eyebrow: "Google Business Profile", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Not sure your category is right? Ask us.",
    content: `
<div class="callout"><p><strong>Short version:</strong> choose one primary category that names your main trade as specifically as Google allows, such as "HVAC contractor," "Plumber" or "Roofing contractor." Then add a few additional categories only for other work you really do. Google allows up to 9 additional categories, but its advice is to use as few as possible. List individual jobs under Services, not as categories.</p></div>
<h2>How Google categories work</h2>
<p>Every profile has one primary category and can have up to 9 additional ones (${G_EDIT()}, checked November 2026). You pick from Google's list. You can't create your own, and if no specific match exists, a more general category is fine (${G_CAT()}).</p>
<p>Google's test is simple: the category should complete the sentence "This business IS a," not "This business HAS a" (${G_GUIDE()}). A plumber IS a plumber. A plumber HAS water heaters on the truck, but that doesn't make it a water heater store.</p>
<p>Google also says not to use categories as keywords or to describe features, and not to add a category for every product or service. The services section exists for that.</p>
<h2>How to pick your primary category</h2>
<ol>
<li>Write down the job that brings in most of your revenue, or the one you most want more of.</li>
<li>Open Edit profile, then Business category, and start typing your trade. Google shows matching names as you type.</li>
<li>Choose the most specific match. Google's own example is "Nail salon" over "Salon." For you, "HVAC contractor" usually beats "Contractor."</li>
<li>Search your main service in your town and note the primary category the top three map results use. That shows what Google already connects to the search.</li>
<li>Set it once and leave it. Category changes are reviewed, and switching back and forth makes it harder to judge what worked.</li>
</ol>
<h2>Category names by trade</h2>
<p>Google doesn't publish a full category list. We checked each name below against ${PLEPER()}, which tracks Google's US English categories (checked November 27, 2026). Names change, so confirm each one shows up when you type it in your own profile. Use an additional category only if you really do that work.</p>
<table>
<thead><tr><th>Trade</th><th>Primary to consider</th><th>Additional, if you do the work</th></tr></thead>
<tbody>
<tr><td>HVAC</td><td>HVAC contractor</td><td>Air conditioning contractor, Heating contractor, Air conditioning repair service, Furnace repair service, Air duct cleaning service</td></tr>
<tr><td>Plumbing</td><td>Plumber</td><td>Drainage service, Gas installation service, Septic system service, Water damage restoration service</td></tr>
<tr><td>Electrical</td><td>Electrician</td><td>Electrical installation service, Lighting contractor, Solar energy system service</td></tr>
<tr><td>Roofing</td><td>Roofing contractor</td><td>Siding contractor, Gutter cleaning service, Window installation service</td></tr>
<tr><td>Handyman</td><td>Handyman/Handywoman/Handyperson</td><td>Carpenter, Dry wall contractor, Deck builder, Painter</td></tr>
<tr><td>Garage door</td><td>Garage door supplier</td><td>Usually none needed. We found no separate "garage door repair" category in the list.</td></tr>
<tr><td>Pest control</td><td>Pest control service</td><td>Usually none needed. We found no separate termite category in the list.</td></tr>
<tr><td>Landscaping</td><td>Landscaper</td><td>Landscape designer, Lawn care service, Lawn sprinkler system contractor, Snow removal service</td></tr>
<tr><td>Cleaning</td><td>House cleaning service</td><td>Janitorial service, Carpet cleaning service, Window cleaning service, Pressure washing service</td></tr>
<tr><td>Painting</td><td>Painter</td><td>Dry wall contractor, Pressure washing service</td></tr>
<tr><td>Tree service</td><td>Tree service</td><td>Arborist service, Landscaper, Snow removal service</td></tr>
</tbody>
</table>
<p>A few notes. "Garage door supplier" has "supplier" in the name, but it's the closest Google category to a garage door company in the list we checked. That exception doesn't extend to other "supplier" or "store" categories: if you don't sell parts to walk-in customers, skip them. "Water damage restoration service" is for plumbers who really do drying and restoration, not just the leak repair. More by trade: <a href="/marketing/hvac">HVAC</a>, <a href="/marketing/plumbing">plumbing</a>, <a href="/marketing/electricians">electricians</a>, <a href="/marketing/roofing">roofing</a>, <a href="/marketing/garage-door-repair">garage door</a>, <a href="/marketing/pest-control">pest control</a>, <a href="/marketing/landscaping">landscaping</a>, <a href="/marketing/cleaning-services">cleaning</a>, <a href="/marketing/painting">painting</a>, <a href="/marketing/tree-service">tree service</a> and <a href="/marketing/handyman">handyman</a>.</p>
<h2>How many additional categories is right?</h2>
<p>For most owner-operators, two to four. Google's wording is "a few categories from the provided list" (${G_CAT()}). An HVAC company that does residential repair, installs and duct cleaning might use HVAC contractor as primary, with Air conditioning contractor, Heating contractor and Air duct cleaning service as additional. That's enough to cover the work without padding.</p>
<p>Adding a category for work you don't do won't win you those calls. It confuses customers who call for a job you turn down, and it's the kind of keyword use Google's guidelines tell you to avoid.</p>
<h2>Categories versus services</h2>
<p>Categories say what you are. Services say what you sell. After you set categories, open Edit services. Google suggests services based on your categories, such as "Install faucet" or "Repair toilet" for a plumber, and you can add custom ones (${G_SERVICES()}). Custom service names can't include prices or phone numbers, or Google rejects them.</p>
<p>This is where the long list belongs: tankless water heater install, sump pump replacement, slab leak repair, panel upgrade, EV charger install. Add a short description to each. It gives customers detail without stretching your categories past what's honest.</p>
<h2>Changing categories without causing trouble</h2>
<ul>
<li><strong>Change one thing at a time.</strong> If you're also changing your name or service areas, space the edits out so each one can be reviewed on its own.</li>
<li><strong>Don't swap categories by season.</strong> A landscaper who switches the primary to Snow removal service every winter keeps resetting what Google knows about the business. Add it as an additional category instead.</li>
<li><strong>Check the result.</strong> Edits show a status after Google reviews them (${G_EDIT()}). If an edit isn't approved, read why before you try again.</li>
<li><strong>Don't stack it with a name change or move.</strong> Google says a name change after verification may mean verifying again, and a move means you must (${G_INFO()}). If an edit does land you back in verification, see <a href="/guides/google-business-profile-verification-problems">verification problems and fixes</a>.</li>
</ul>
<h2>Where categories fit in the bigger picture</h2>
<p>Categories are one field on a long checklist. The rest, from service areas to photos, is in our <a href="/guides/google-business-profile-optimization">Google Business Profile optimization checklist</a>. If you have no storefront, the setup rules for hidden addresses are in <a href="/guides/google-business-profile-service-area">service areas, set up right</a>.</p>
<p>Want someone to look at your categories against the businesses beating you in the map? Our <a href="/free-google-maps-audit">free Google Maps audit</a> shows who ranks where and which categories they use. ${CALL} Ongoing help is part of <a href="/services/google-business-profile">Google Business Profile management</a>.</p>`,
    faq: [
      ["How many categories can I add to my Google Business Profile?", "One primary category plus up to 9 additional ones. Google advises using as few as describe your business, so most contractors only need two to four additional categories."],
      ["Can I create my own Google category?", "No. Google says you can't create your own category. If there's no specific match for your trade, pick the closest general one and describe the rest under Services."],
      ["What category should an HVAC company use?", "Most HVAC companies use HVAC contractor as the primary category. Air conditioning contractor, Heating contractor and Air duct cleaning service are common additional ones if you do that work."],
      ["Is there a garage door repair category?", "We didn't find one in the category list we checked in November 2026. Garage door supplier was the closest match. Type your trade in the category box to see what's offered today."],
      ["Should I add a category for every service I offer?", "No. Google says not to select a category for every product or service. Use a few categories for what your business is, and list individual jobs in the Services section."],
      ["Will changing my category hurt my ranking?", "It can shift which searches you show up for, which is the point if the old one was wrong. Change it once, on its own, and avoid switching back and forth."],
    ],
  },

  // ------------------------------------------------------------------ PHOTOS AND POSTS
  {
    slug: "google-business-profile-photos-and-posts",
    path: "/guides/google-business-profile-photos-and-posts",
    title: "Google Business Profile Photos and Posts for Contractors",
    description: "Which photos and posts help a contractor's Google Business Profile, Google's size rules, how often to post, and a 4-week posting plan for each season.",
    h1: "Google Business Profile photos and posts that help contractors",
    lede: "Customers looking at your profile want proof you do real work near them. Photos give them that. Posts keep the profile looking alive. Here's what to upload, how often, and a plan you can follow for a month.",
    eyebrow: "Google Business Profile", readMinutes: 6, article: { date: DATE },
    ctaTitle: "Want the posting done for you?",
    content: `
<div class="callout"><p><strong>Short version:</strong> upload real photos of your jobs, trucks and crew every week, and publish one short post a week. Google lists photos and videos in its own tips for local ranking. Posts aren't on that list, but they show customers you're active. Avoid stock images, heavy filters and phone numbers typed into posts.</p></div>
<h2>Google's photo and video rules</h2>
<p>From ${G_PHOTO()} (checked November 2026):</p>
<table>
<thead><tr><th>Item</th><th>Photos</th><th>Videos</th></tr></thead>
<tbody>
<tr><td>Format</td><td>JPG or PNG</td><td>Not specified on the page</td></tr>
<tr><td>File size</td><td>10 KB to 5 MB</td><td>Up to 75 MB</td></tr>
<tr><td>Resolution</td><td>720 x 720 px recommended, 250 x 250 px minimum</td><td>720p or higher</td></tr>
<tr><td>Length</td><td>n/a</td><td>Up to 30 seconds</td></tr>
</tbody>
</table>
<p>Google also says photos should be in focus and well lit, and that the image should represent reality, so skip heavy filters. Media that breaks Google's content policy is marked "Not approved" and doesn't show on Search or Maps.</p>
<h2>Photos that help a contractor</h2>
<p>Think about what a homeowner wants to see before letting a stranger into the house.</p>
<ul>
<li><strong>Logo and cover photo.</strong> The logo helps people recognize you. The cover should be your best single image, often a branded truck or your crew at a job.</li>
<li><strong>Your truck or van.</strong> Branding on a vehicle shows you're a real company. For a service-area business it plays the role a storefront plays for a shop.</li>
<li><strong>The crew.</strong> Faces in uniform build trust fast. Get each person's OK first.</li>
<li><strong>Before and after.</strong> A rusted water heater and its replacement. A torn-up roof and the finished one. A dead lawn and the new sod.</li>
<li><strong>Work in progress.</strong> A tech brazing a line set, an electrician at a new panel, a crew tearing off shingles. Short videos work well here.</li>
<li><strong>Equipment.</strong> A clean drain camera, a new furnace in the box, a lift truck. It shows you're equipped for the job.</li>
</ul>
<p>Aim for 3 to 5 new photos a week from real jobs. That's our recommendation, not a Google rule. The easy way to get there: have every tech snap a before and an after on every job, and pick the best few each Friday.</p>
<h2>What to avoid</h2>
<ul>
<li><strong>Stock photos.</strong> They look the same on every profile, and they don't show your work. Google's guidance that images should "represent reality" points the same way.</li>
<li><strong>Heavy filters or edits.</strong> Crop and straighten, but don't change what the job looked like.</li>
<li><strong>Customer details.</strong> House numbers, faces, license plates and paperwork with names on it. Crop them out or ask first.</li>
<li><strong>Text-heavy graphics as photos.</strong> A flyer with a coupon belongs in an offer post, not your photo gallery.</li>
<li><strong>Uploading 200 photos in one day, then nothing for a year.</strong> A steady trickle keeps the newest photos recent.</li>
</ul>
<h2>How Google posts work</h2>
<p>From ${G_POSTS()} (checked November 2026):</p>
<ul>
<li><strong>Three types.</strong> Updates (text, photo or video, optional button), Offers (title and dates required, with a View Offer button added) and Events (title, start and end dates).</li>
<li><strong>They archive.</strong> Posts older than 6 months are archived unless you set a date range. You can schedule posts or set them to repeat weekly or monthly.</li>
<li><strong>They're reviewed.</strong> Each post is checked after you publish it. It shows Live, Pending or Not approved. Posts stay Pending if the profile isn't verified, which is one more reason to <a href="/guides/how-to-verify-google-business-profile">get verified first</a>.</li>
<li><strong>Watch contact details.</strong> Posts with phone numbers, emails or social handles that can't be verified as yours may be removed. Use the Call now button instead, which uses your verified profile number (${G_POSTPOLICY()}).</li>
</ul>
<h2>How often to post</h2>
<p>Google doesn't set a number. We recommend one post a week. It's enough that the newest post is always recent, and little enough that an owner can keep it up. Keep each post short: one job or one tip, one photo, one button.</p>
<p>Be honest with yourself about what posts do. Google's ranking tips name verification, complete information, reviews, and photos and videos (${G_RANK()}). Posts aren't on that list. Treat them as a way to convert people already looking at you, not as a ranking trick.</p>
<h2>A 4-week posting plan by season</h2>
<p>Pick the column for the season you're in. Swap in your own trade's work. An HVAC company leans on the cooling and heating seasons, a landscaper on spring and fall, a pest control company on spring and summer. Our <a href="/guides/home-service-marketing-calendar">home-service marketing calendar</a> has the full year.</p>
<table>
<thead><tr><th>Week</th><th>Spring</th><th>Summer</th><th>Fall</th><th>Winter</th></tr></thead>
<tbody>
<tr><td>1</td><td>Update: before and after of a recent job, with the town named</td><td>Update: a heat-wave tip (change the filter, check the sump pump, shade the AC unit)</td><td>Update: "time to book" reminder for tune-ups, gutter cleaning or winterizing</td><td>Update: freeze tip (protect pipes, keep vents clear) with a job photo</td></tr>
<tr><td>2</td><td>Offer: spring tune-up or inspection, with real dates and terms</td><td>Update: crew photo and a short note on how fast you're booking</td><td>Offer: fall maintenance plan sign-up, with dates</td><td>Update: emergency service note, only if you really answer after hours</td></tr>
<tr><td>3</td><td>Update: a common problem you fixed this week and what caused it</td><td>Update: work-in-progress video under 30 seconds</td><td>Update: before and after of a big job</td><td>Update: year-end thank-you with a team photo</td></tr>
<tr><td>4</td><td>Update: a new review, quoted with permission, with a job photo</td><td>Offer: off-peak discount for weekday mornings, with dates</td><td>Event: a community event or open house, if you have one</td><td>Offer: winter booking special for slower weeks, with dates</td></tr>
</tbody>
</table>
<h2>Writing a post that gets a call</h2>
<ol>
<li>Start with the job or the problem, not your company name: "Replaced a 20-year-old water heater in Hawthorne today."</li>
<li>Add one useful detail the reader can use: what failed, what it cost them to wait, or what to watch for.</li>
<li>Attach one real photo from that job.</li>
<li>Add a Call now or Book button. Don't type the phone number into the text.</li>
<li>For offers, set real start and end dates. An offer with no end date reads like a permanent price.</li>
</ol>
<h2>Want it off your plate?</h2>
<p>Most owners start strong and stop by week three. That's normal. Our <a href="/services/social-media-posting">social media posting</a> and <a href="/services/google-business-profile">Google Business Profile management</a> post weekly from your own job photos. It costs {{PRICE:gbp}}. ${CALL} Or check the basics first with our <a href="/guides/google-business-profile-optimization">optimization checklist</a> and the <a href="/guides/google-business-profile-mistakes">common mistakes list</a>.</p>`,
    faq: [
      ["What size should Google Business Profile photos be?", "Google recommends 720 by 720 pixels, with a minimum of 250 by 250. Files should be JPG or PNG, between 10 KB and 5 MB."],
      ["How long can a Google Business Profile video be?", "Up to 30 seconds, up to 75 MB, at 720p or higher, per Google's photo and video guidelines."],
      ["How often should a contractor post on Google Business Profile?", "Google doesn't set a number. We recommend one post a week and 3 to 5 new job photos a week, which keeps the profile current without eating your evenings."],
      ["Do Google posts help ranking?", "Google's own local ranking tips mention photos and videos, reviews and complete information, but not posts. Posts are best used to turn people already viewing your profile into calls."],
      ["Do Google posts expire?", "Posts older than 6 months are archived unless you set a date range. Offers and events end on the dates you give them."],
      ["Can I put my phone number in a Google post?", "Google says posts with phone numbers that can't be verified as connected to your business may be rejected or removed. Add a Call now button instead, which uses your verified profile number."],
    ],
  },

  // ------------------------------------------------------------------ MISTAKES
  {
    slug: "google-business-profile-mistakes",
    path: "/guides/google-business-profile-mistakes",
    title: "Google Business Profile Mistakes Contractors Make",
    description: "The Google Business Profile mistakes that hurt contractors most, from keyword-stuffed names and virtual offices to agency-owned profiles, each with the fix.",
    h1: "Google Business Profile mistakes that hurt contractors (and the fixes)",
    lede: "Most profile trouble comes from a short list of mistakes, many made with good intentions. Here they are, with what Google's rules say and how to fix each one.",
    eyebrow: "Google Business Profile", readMinutes: 7, article: { date: DATE },
    ctaTitle: "Find out if your profile has any of these.",
    content: `
<div class="callout"><p><strong>Short version:</strong> the costliest mistakes are the ones that break Google's rules: keywords in the business name, a virtual office or P.O. box address, and duplicate profiles. Next come mistakes that quietly lose calls: wrong hours, too many edits at once, an agency owning your profile, and unanswered reviews. Each has a simple fix.</p></div>
<h2>The list at a glance</h2>
<table>
<thead><tr><th>Mistake</th><th>What can happen</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Keywords or towns in the name</td><td>Edits rejected, suspension risk</td><td>Use your real name only</td></tr>
<tr><td>Virtual office, P.O. box or visible home address</td><td>Not eligible, suspension risk</td><td>Real base, hidden, with service areas</td></tr>
<tr><td>Duplicate profiles</td><td>Duplicates hidden from Search and Maps</td><td>One profile, remove or merge the rest</td></tr>
<tr><td>Wrong hours</td><td>Missed calls, bad reviews</td><td>Hours you really answer</td></tr>
<tr><td>Editing too much, too often</td><td>Edits held for review, possible re-verification</td><td>Big changes once, one at a time</td></tr>
<tr><td>Agency or ex-employee owns it</td><td>Locked out of your own listing</td><td>You as primary owner, others as managers</td></tr>
<tr><td>Ignoring reviews</td><td>Lost trust and lost prominence</td><td>Ask after every job, reply to every review</td></tr>
</tbody>
</table>
<h2>1. Stuffing keywords into the business name</h2>
<p>"Ace Plumbing - 24/7 Emergency Plumber Inglewood" isn't a name. Google's guidelines say your name should match what customers know you by, and ban adding service descriptions, location details, hours or phone numbers (${G_GUIDE()}, checked November 2026). Profiles that break these rules can be suspended.</p>
<p><strong>Fix:</strong> change it to the name on your truck, invoices and license. If your legal name happens to include "Plumbing" or a town, that's fine. "LLC" or "Inc." are only allowed if they appear on real-world proof like signs or invoices.</p>
<h2>2. Using a virtual office, P.O. box or your home address</h2>
<p>Google says P.O. boxes and remote mailboxes aren't acceptable, and virtual offices aren't eligible. A co-working space only counts with signage, staff on site and in-person customer service during business hours. Home-based contractors have the opposite problem: they show their home address when customers never visit. Google's own example says a plumber who works from home should remove the address (${G_GUIDE()}).</p>
<p><strong>Fix:</strong> use your real base, hide the address and list up to 20 service areas (${G_SAB()}). Full setup: <a href="/guides/google-business-profile-service-area">service areas, set up right</a>.</p>
<h2>3. Making a profile for every town</h2>
<p>It's tempting to create "Ace Plumbing Torrance" and "Ace Plumbing Hawthorne." Google says a service-area business can have only one profile for the whole area it serves (${G_SAB()}). A profile flagged as a duplicate won't show on Search or Maps (${G_DUP()}).</p>
<p><strong>Fix:</strong> keep the verified profile. Remove duplicates you made by mistake, but be careful: Google warns that all content and linked managers on the removed profile go with it. If an old listing you can't access is the duplicate, Google handles merges through a report on Maps, and merged reviews combine. Ownership tangles are covered in <a href="/guides/how-to-claim-google-business-profile">how to claim your Google Business Profile</a>.</p>
<h2>4. Wrong or wishful hours</h2>
<p>Listing "Open 24 hours" because you'll take a call at 2 a.m. if you happen to wake up sets customers up for voicemail. Google asks for regular, customer-facing hours. "Open 24 hours" is allowed in the hours field when it's true, never in the name. Seasonal businesses can mark themselves temporarily closed in the off-season (${G_GUIDE()}).</p>
<p><strong>Fix:</strong> list the hours someone really answers. Add special hours for holidays. If you want to be reachable at night, put an answering setup behind the number first. Our <a href="/guides/ai-receptionist-for-contractors">AI receptionist guide</a> explains the options.</p>
<h2>5. Editing too often, or changing everything at once</h2>
<p>Google reviews changes before they go live (${G_EDIT()}). Changing your name, categories, service areas and phone number in one sitting puts the whole profile under review at once. Google also says a name change after verification may mean verifying again, and a move means you must (${G_INFO()}). Owners who tinker every week tend to have edits stuck in review.</p>
<p><strong>Fix:</strong> plan big changes, make them once, one at a time, and wait for each to show as approved. Weekly activity should be reviews, replies, photos and posts, not core fields. If you've already landed back in verification, see <a href="/guides/google-business-profile-verification-problems">verification problems and fixes</a>.</p>
<h2>6. Letting an agency or ex-employee own the profile</h2>
<p>This one hurts when you change vendors or someone leaves. Google has owners and managers. Owners can add and remove people and delete the profile; managers can't. A profile can have several owners but only one primary owner. New owners and managers also wait 7 days before they can remove others or transfer primary ownership (${G_USERS()}).</p>
<p><strong>Fix:</strong> make sure you, on a Google account you control, are the primary owner. Give agencies and staff manager access. That's how we work with clients: you own it, we manage it. If someone else already holds it, start with <a href="/guides/how-to-claim-google-business-profile">claiming your profile</a>.</p>
<h2>7. Ignoring reviews</h2>
<p>Google names responding to reviews as one of its ways to improve local ranking, and lists the number and rating of reviews under prominence (${G_RANK()}). The reviewer is notified when you reply, and customers can update their review after reading it (${G_REPLY()}). An unanswered one-star review sits there making your case for you, badly.</p>
<p><strong>Fix:</strong> ask every customer, every job. Reply to every review within a few days. Never offer rewards or only ask happy customers; see <a href="/guides/is-review-gating-allowed">is review gating allowed</a>. For the rough ones, read <a href="/guides/how-to-respond-to-negative-google-reviews">how to respond to negative reviews</a>.</p>
<h2>Smaller mistakes worth a minute</h2>
<ul>
<li><strong>Categories used as keywords.</strong> Google says not to. See <a href="/guides/google-business-profile-categories">categories by trade</a>.</li>
<li><strong>A website link to a Facebook page.</strong> Google doesn't allow URLs that redirect to social pages.</li>
<li><strong>A phone number you don't control.</strong> Google requires a number under the business's direct control.</li>
<li><strong>Prices and coupons in the description.</strong> Use offer posts. The <a href="/guides/google-business-profile-photos-and-posts">photos and posts guide</a> shows how.</li>
</ul>
<h2>If one of these already got you in trouble</h2>
<p>If the profile is suspended, start with <a href="/guides/google-business-profile-suspended">Google Business Profile suspended?</a> and, for no-storefront businesses, <a href="/guides/google-business-profile-suspended-service-area">suspensions for service-area businesses</a>. If it's fine but thin, work through the <a href="/guides/google-business-profile-optimization">optimization checklist</a>.</p>
<p>Not sure which of these applies to you? Our <a href="/free-google-maps-audit">free Google Maps audit</a> flags them. ${CALL} If you'd rather not watch it yourself, <a href="/services/google-business-profile">Google Business Profile management</a> keeps the profile inside the rules. It costs {{PRICE:gbp}}.</p>`,
    faq: [
      ["Can I add keywords to my Google Business Profile name?", "No. Google's guidelines say the name should match your real-world name and ban adding service or location details. A keyword-stuffed name can get your profile suspended."],
      ["Can I use a virtual office for my Google Business Profile?", "No. Google says virtual offices aren't eligible and P.O. boxes aren't acceptable. Use your real base, hide the address if customers don't visit, and list service areas."],
      ["Can I have a Google Business Profile for each city I serve?", "Not as a service-area business. Google allows one profile for the whole area you serve, and profiles flagged as duplicates don't show on Search or Maps."],
      ["Should my marketing agency own my Google Business Profile?", "No. You should be the primary owner on a Google account you control, and give the agency manager access. Managers can do the day-to-day work but can't remove you."],
      ["Does editing my profile a lot hurt it?", "Every edit is reviewed before it goes live, and changing your name or address can require verifying again. Make big changes rarely and one at a time."],
      ["Do I really need to reply to every Google review?", "Google lists responding to reviews among its tips for local ranking, and reviewers are notified when you reply. A short, specific reply to every review is a good habit."],
    ],
  },
];
