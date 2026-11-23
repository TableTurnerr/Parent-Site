// AI search (AEO) guides. Added 2026-11-23 alongside /services/ai-search-optimization.
const DATE = '2026-11-23';

export const guides3 = [
  {
    slug: 'how-to-get-recommended-by-chatgpt',
    path: '/blog/how-to-get-recommended-by-chatgpt',
    title: 'How to Get Your Business Recommended by ChatGPT and AI',
    description: 'How home-service businesses get named by ChatGPT, Google AI Mode, Gemini, Perplexity and Copilot: where each assistant looks, and a 10-step checklist.',
    h1: 'How to get your business recommended by ChatGPT and other AI assistants',
    lede: 'Homeowners are starting to ask AI assistants who to hire. Here\'s where ChatGPT, Google\'s AI answers, Gemini, Perplexity and Copilot get their local recommendations, and the checklist we use to get contractors named.',
    eyebrow: 'AI search (AEO)', readMinutes: 8, article: { date: DATE },
    ctaTitle: 'Want to know if AI assistants recommend you?',
    content: `
<div class="callout"><p><strong>Short version:</strong> AI assistants recommend the local businesses they can confirm from the most trusted places at once. Make your name, phone, services and area identical everywhere, keep recent detailed reviews coming on Google and Yelp, claim Bing Places and Apple Business Connect, write pages that answer homeowners' questions in plain sentences, and get mentioned on other local sites. Nobody can guarantee a mention, but this is what moves it.</p></div>
<h2>Why this matters for contractors</h2>
<p>A homeowner who types "best AC repair near me" into Google sees ads, a map and ten links. One who asks ChatGPT or Google's AI Mode gets two or three names with a reason for each. If you're not one of those names, you don't get a chance to compete on price, speed or reviews. That's what answer engine optimization (AEO) is about: being one of the names.</p>
<h2>Where each assistant gets its local answers</h2>
<table>
<tr><th>Assistant</th><th>Where it looks</th><th>What to do</th></tr>
<tr><td>Google AI Overviews, AI Mode, Gemini</td><td>Google's index and Business Profiles</td><td>Normal local SEO and a complete Google Business Profile. Google says <a href="https://developers.google.com/search/docs/appearance/ai-features" rel="noopener">no special AI markup is needed</a>.</td></tr>
<tr><td>ChatGPT</td><td>OpenAI's own search crawler, Bing and data partners such as review sites</td><td>Don't block OAI-SearchBot, be indexed in Bing, and keep your Yelp and directory listings accurate.</td></tr>
<tr><td>Microsoft Copilot</td><td>Bing and Bing Places</td><td>Claim and complete Bing Places for Business. Many contractors never have.</td></tr>
<tr><td>Perplexity</td><td>Its own crawler plus other search sources</td><td>Clear pages with quotable facts; Perplexity cites sources more openly than most.</td></tr>
<tr><td>Claude</td><td>Its own search crawler</td><td>Don't block Claude-SearchBot.</td></tr>
</table>
<p>The details change often, but the pattern is steady: assistants read many sources, then name the businesses those sources agree on.</p>
<h2>The 10-step checklist</h2>
<ol>
<li><strong>Find out where you stand.</strong> Ask each assistant "who's the best [your trade] in [your town]?" and a few variations. Write down who gets named. Our <a href="/free-google-maps-audit">free audit</a> does this across ChatGPT, Claude, Gemini, Grok, Meta AI and Perplexity.</li>
<li><strong>Make your business facts identical everywhere.</strong> Same business name, phone, address or service area, hours and list of services on your website, Google, Bing Places, Apple Business Connect, Yelp, Facebook, Nextdoor, the BBB and your trade directories. Conflicting facts make an assistant less sure you're the right answer.</li>
<li><strong>Complete your Google Business Profile.</strong> Primary and secondary categories, every service, service areas, photos of real jobs and regular posts. It feeds Google's AI answers directly. See <a href="/blog/how-to-rank-higher-on-google-maps">how to rank higher on Google Maps</a>.</li>
<li><strong>Claim Bing Places and Apple Business Connect.</strong> Bing feeds Copilot and is one of the sources behind ChatGPT search. Apple feeds Siri and Apple Maps.</li>
<li><strong>Get recent, detailed reviews, on more than one site.</strong> Reviews that mention the job and the town ("replaced our water heater in Frisco the same day") give assistants something to repeat. Keep Google first, and don't ignore Yelp. Use our <a href="/tools/review-request-templates">review request templates</a>.</li>
<li><strong>Write answer-first service pages.</strong> Start each page with one or two plain sentences: what you do, where, how fast and roughly what it costs. Then add detail. Assistants quote clear sentences, not slogans.</li>
<li><strong>Add an FAQ to each service page.</strong> Use the questions customers actually ask you on the phone, each with a short direct answer.</li>
<li><strong>Add schema markup.</strong> LocalBusiness (or a trade type like HVACBusiness or Plumber), Service and FAQ markup help search engines read your facts. It's not magic, but it removes doubt.</li>
<li><strong>Let AI search crawlers in.</strong> Check your robots.txt and any "block AI bots" setting at your host or Cloudflare. Blocking training bots is your choice; blocking search bots keeps you out of answers.</li>
<li><strong>Get mentioned on other sites.</strong> Local "best of" lists, your suppliers' and manufacturers' dealer pages, trade associations, the chamber of commerce, sponsorships and local news. Assistants trust what other sites say about you more than what you say about yourself.</li>
</ol>
<h2>What doesn't work</h2>
<ul>
<li>Stuffing "best roofer in Dallas" into your pages or business name. It breaks Google's rules and reads badly.</li>
<li>Fake reviews or fake "top 10" lists you wrote yourself. Assistants and search engines are getting better at spotting them, and fake reviews can get your Google profile suspended.</li>
<li>Paying anyone who guarantees "#1 in ChatGPT". Answers vary from one question to the next; nobody controls them.</li>
</ul>
<h2>How long it takes</h2>
<p>Listing fixes and page rewrites take a few weeks. Assistants refresh what they know on their own schedules, so expect a few months before you're named consistently. The good news: almost all of this work also improves your Google Maps and organic rankings, so it pays off either way.</p>
<h2>Want it done for you?</h2>
<p>We run <a href="/services/ai-search-optimization">AI search optimization</a> together with <a href="/services/local-seo">local SEO</a> for home-service businesses, month to month, and check every month whether the assistants name you. It starts with the <a href="/free-google-maps-audit">free audit</a>.</p>`,
    faq: [
      ['How does ChatGPT decide which local business to recommend?', 'It reads a set of web sources for the question, such as search results, review sites and directories, and names businesses that those sources agree on. Consistent business facts, plenty of recent reviews and mentions on other trusted sites all make you more likely to be named.'],
      ['Does ChatGPT use Google reviews?', 'As far as is publicly known, not in the way Google\'s own AI does. ChatGPT relies mostly on its own crawler, Bing and data partners such as review sites, so your Yelp, Bing and directory listings matter there. Google reviews matter most for Google\'s own AI answers and Gemini.'],
      ['What is AEO?', 'Answer engine optimization: the work of getting your business named and cited in AI-written answers from ChatGPT, Google AI Mode, Gemini, Perplexity and Copilot. It builds on local SEO.'],
      ['Can I pay to be recommended by ChatGPT?', 'No. There\'s no paid placement in ChatGPT\'s local recommendations today. Be wary of anyone selling a guaranteed spot.'],
    ],
  },
];
