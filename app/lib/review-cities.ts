import { TARGET_CITIES, type CityData } from "./location-data";

export interface ReviewCity extends CityData {
  /** Unique hero sub-copy (home-services + reviews angle, city-specific). */
  intro: string;
  /** Unique local-market paragraph so no two pages share body content. */
  market: string;
}

// Hand-written, city-specific copy for the review-automation location pages.
// Each city has a distinct local angle (climate, growth, market makeup) so the
// pages are genuinely unique, not find-and-replace duplicates.
const COPY: Record<string, { intro: string; market: string }> = {
  houston: {
    intro:
      "Houston's sheer size cuts both ways: there's endless work for home-services pros, but you're up against thousands of competitors and the map pack only shows three. Recent reviews are what put you in those three.",
    market:
      "With brutal Gulf humidity running AC systems year-round and a metro this sprawling, Houston homeowners almost always search before they call. TableTurnerr makes sure your finished jobs become the reviews that win those searches across the Energy Corridor, Katy, The Heights and beyond.",
  },
  "san-antonio": {
    intro:
      "San Antonio's home-services market is big, fast-growing, and crowded with national franchises. A steady stream of fresh local reviews is how an independent shop outranks the chains.",
    market:
      "Between the long, hot summers that hammer AC units and a steady flow of new families across the North Side and far West Side, demand is constant. We turn every completed job into a review so you're the first name San Antonio homeowners trust.",
  },
  dallas: {
    intro:
      "Dallas is one of the most competitive home-services markets in the country. The companies that win aren't always the best, they're the ones with the most recent five-star reviews at the top of Google.",
    market:
      "Across a metro with deep pockets and high expectations, Dallas homeowners compare two or three companies before booking. TableTurnerr keeps your review count climbing so you're the obvious choice from Uptown to Far North Dallas.",
  },
  austin: {
    intro:
      "Austin's explosive growth means constant demand for home services, and a flood of new companies chasing it. Reviews are the fastest way to prove you're established when half your market just moved here.",
    market:
      "With new neighborhoods going up across the suburbs and transplants who rely entirely on Google to pick a contractor, recency matters more here than almost anywhere. We make sure your latest jobs show up as your latest reviews.",
  },
  "fort-worth": {
    intro:
      "Fort Worth rewards companies that feel local and trusted. In a market this hands-on, a wall of recent neighborhood reviews does more than any ad.",
    market:
      "As the metroplex keeps pushing west into Aledo and far Fort Worth, established crews compete with brand-new ones for the same jobs. TableTurnerr turns your track record into visible proof so homeowners pick experience.",
  },
  "el-paso": {
    intro:
      "El Paso is its own market, geographically isolated and tight-knit, where word of mouth and online reviews carry real weight. Owning local search here is very winnable for the shop that asks for reviews consistently.",
    market:
      "Desert heat keeps cooling systems working hard and the community leans heavily on trusted local names. We help you build that reputation online, in English and Spanish, so you're the clear pick across the city and the East Side.",
  },
  arlington: {
    intro:
      "Wedged between Dallas and Fort Worth, Arlington homeowners have endless options. Recent reviews are the tiebreaker that sends the call to you instead of a company two cities over.",
    market:
      "In a dense, established suburb with aging housing stock and constant repair demand, being top-three in the map pack is everything. TableTurnerr keeps your reviews fresh so you hold that spot.",
  },
  "corpus-christi": {
    intro:
      "On the coast, salt air and storm season keep home-services demand high, from AC corrosion to roof damage. Corpus Christi homeowners search for the most-reviewed local pro when something breaks.",
    market:
      "After every hurricane scare and humid summer, the companies with the strongest recent reviews get the surge of calls. We make sure that's you, across Calallen, Flour Bluff and the Southside.",
  },
  plano: {
    intro:
      "Plano is affluent, particular, and full of homeowners who research before they spend. A deep, recent review profile is what earns their trust and their high-ticket jobs.",
    market:
      "With established neighborhoods full of homes hitting the age where systems need replacing, the work is there for whoever looks most reliable online. TableTurnerr turns your completed Plano jobs into that proof automatically.",
  },
  laredo: {
    intro:
      "Laredo is a close-knit border market where reputation travels fast. Consistent local reviews, in English and Spanish, are how you become the name people pass along.",
    market:
      "Long stretches of heat keep AC and plumbing demand high, and a bilingual community relies on trusted local pros. We help you capture reviews from every job so your standing online matches your standing in town.",
  },
  lubbock: {
    intro:
      "In Lubbock, extreme West Texas weather and a steady Texas Tech rental market keep home-services crews busy. The companies that ask for reviews consistently own local search here.",
    market:
      "Wind, dust, and big temperature swings mean constant repairs, and a relatively contained market means a strong review lead is hard for competitors to catch. TableTurnerr helps you build that lead.",
  },
  irving: {
    intro:
      "Irving sits in the heart of the metroplex, where homeowners and Las Colinas property managers alike pick contractors off Google. Recent reviews decide who they call.",
    market:
      "In a dense, mixed market of older homes and corporate corridors, visibility is everything. We turn your finished Irving jobs into the steady review flow that keeps you in the map pack.",
  },
  garland: {
    intro:
      "Garland's older, established neighborhoods mean steady repair and replacement work, and plenty of competitors going after it. Fresh reviews are how you stand out as the dependable choice.",
    market:
      "Aging housing stock across the city drives constant HVAC, plumbing and electrical demand. TableTurnerr makes sure every job you complete shows up as proof for the next homeowner searching.",
  },
  frisco: {
    intro:
      "Frisco is one of the fastest-growing cities in America, which means endless new homes, warranty work, and competitors racing for the same jobs. Reviews are how you prove you're the established pro in a brand-new place.",
    market:
      "With entire neighborhoods built in the last few years, homeowners have no local history to go on, so they trust Google reviews completely. We make sure your latest Frisco jobs become the reviews that win the next street over.",
  },
  mckinney: {
    intro:
      "McKinney blends historic homes with explosive new development, and both kinds of homeowners shop online for contractors. A strong, recent review profile wins both.",
    market:
      "As Collin County keeps booming, new arrivals lean entirely on reviews to choose a pro. TableTurnerr turns your completed work into the local proof that earns their trust.",
  },
  amarillo: {
    intro:
      "Amarillo's Panhandle weather, hail, wind, and hard freezes, keeps roofers, HVAC and plumbing crews in demand. In a contained market like this, a review lead compounds fast.",
    market:
      "Storm seasons send homeowners straight to Google looking for the most-trusted local company. We make sure your recent jobs keep your reviews ahead of every competitor in town.",
  },
  waco: {
    intro:
      "Waco's renovation-happy, growing market, fueled by Baylor and a wave of home upgrades, means steady work and rising competition. Reviews are how you capture it.",
    market:
      "With homeowners renovating older homes and students' families needing reliable pros, trust signals matter. TableTurnerr turns each finished Waco job into the reviews that keep your phone ringing.",
  },
  denton: {
    intro:
      "Denton mixes college-town energy with fast suburban growth, and a wide mix of old and new homes that all need work. Recent reviews are how you reach every corner of that market.",
    market:
      "Between long-time residents and a constant churn of new arrivals near UNT, homeowners rely on reviews to sort the reliable from the rest. We make sure your latest work keeps you on top.",
  },
  "round-rock": {
    intro:
      "Round Rock's rapid Austin-overflow growth means new neighborhoods, new homeowners, and new competitors every year. Reviews are the shortcut to looking established.",
    market:
      "With families moving in faster than they can ask a neighbor for a recommendation, Google reviews are the recommendation. TableTurnerr turns your completed jobs into that trusted local signal.",
  },
  "sugar-land": {
    intro:
      "Sugar Land is affluent, master-planned, and full of homeowners who expect polished, professional service. A deep recent review profile is what gets you in the door.",
    market:
      "In humid Fort Bend County, systems work hard and expectations run high. We turn your finished Sugar Land jobs into the steady five-star proof that wins these high-value homes.",
  },
  "the-woodlands": {
    intro:
      "The Woodlands is upscale, wooded, and quality-obsessed, the kind of market where a strong reputation is everything. Recent reviews are how you earn premium jobs here.",
    market:
      "Affluent homeowners across the master-planned villages compare reviews carefully before hiring. TableTurnerr keeps your latest work front and center so you're the trusted choice north of Houston.",
  },
  mcallen: {
    intro:
      "McAllen anchors a fast-growing Rio Grande Valley market where bilingual word of mouth and online reviews both drive business. Consistent reviews are how you scale beyond referrals.",
    market:
      "Heat, humidity, and steady growth keep home-services demand strong across the Valley. We help you capture reviews from every job, in English and Spanish, so your search presence matches your reputation.",
  },
  killeen: {
    intro:
      "Killeen's Fort Cavazos community means a transient, rental-heavy market where new arrivals constantly need trusted pros, and find them on Google. Reviews are how you reach each new wave.",
    market:
      "With military families rotating in and out, almost nobody picks a contractor from a long-time local relationship; they pick from reviews. TableTurnerr makes sure your recent jobs keep you the top result.",
  },
  tyler: {
    intro:
      "Tyler is the hub of East Texas, drawing home-services demand from across the region's piney-woods communities. A strong review profile is how you own that whole catchment.",
    market:
      "Storms, heat, and a regional customer base mean homeowners drive in from surrounding towns based on what they find online. We turn your completed Tyler jobs into the reviews that win that wider market.",
  },
};

export const REVIEW_CITIES: ReviewCity[] = TARGET_CITIES.map((c) => ({
  ...c,
  intro: COPY[c.slug]?.intro ?? "",
  market: COPY[c.slug]?.market ?? "",
})).filter((c) => c.intro);

export const REVIEW_CITY_SLUGS = REVIEW_CITIES.map((c) => c.slug);
export const getReviewCity = (slug: string): ReviewCity | undefined =>
  REVIEW_CITIES.find((c) => c.slug === slug);
