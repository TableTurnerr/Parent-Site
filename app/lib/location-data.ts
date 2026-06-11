export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  /** Approximate metro-center coordinates, used for local geo schema. */
  lat: number;
  lng: number;
  /** Unique, city-specific intro copy so each location page is not a duplicate. */
  blurb: string;
}

// Local SEO targeting. Texas is the STARTING POINT, not a restriction: we lead
// with the 10 largest Texas metros and expand to new US markets as we grow.
// (Per Hasham: base the regional pages on major TX cities, frame TX as the
// launch market, not a limit.)
export const TARGET_CITIES: CityData[] = [
  {
    slug: "houston",
    name: "Houston",
    state: "Texas",
    stateCode: "TX",
    lat: 29.7604,
    lng: -95.3698,
    blurb:
      "Houston is one of the most diverse food cities in the country, with thousands of independent restaurants competing across every cuisine. Standing out here means showing up first when nearby diners search, not getting buried under delivery apps and national chains.",
  },
  {
    slug: "san-antonio",
    name: "San Antonio",
    state: "Texas",
    stateCode: "TX",
    lat: 29.4241,
    lng: -98.4936,
    blurb:
      "San Antonio blends deep Tex-Mex roots with a fast-growing independent dining scene. Locals and visitors alike start on Google, so the restaurants that win are the ones that are easy to find, easy to trust, and easy to order from directly.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    state: "Texas",
    stateCode: "TX",
    lat: 32.7767,
    lng: -96.797,
    blurb:
      "Dallas restaurants compete in one of the most crowded and fast-moving markets in Texas. A site that ranks, loads quickly, and turns searchers into orders is what separates the spots that grow from the ones that stall.",
  },
  {
    slug: "austin",
    name: "Austin",
    state: "Texas",
    stateCode: "TX",
    lat: 30.2672,
    lng: -97.7431,
    blurb:
      "Austin diners are online, mobile-first, and quick to try somewhere new. Restaurants that rank in local search and make ordering effortless capture that demand instead of handing it to third-party apps.",
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    state: "Texas",
    stateCode: "TX",
    lat: 32.7555,
    lng: -97.3308,
    blurb:
      "Fort Worth pairs a strong local identity with steady restaurant growth. Owners who control their own search presence and customer relationships keep more profit than those who rely on delivery platforms to bring people in.",
  },
  {
    slug: "el-paso",
    name: "El Paso",
    state: "Texas",
    stateCode: "TX",
    lat: 31.7619,
    lng: -106.485,
    blurb:
      "El Paso's restaurant scene is tight-knit and loyal, and most new customers still find their next meal on Google and Maps. A strong local presence turns that search traffic into repeat, direct business.",
  },
  {
    slug: "arlington",
    name: "Arlington",
    state: "Texas",
    stateCode: "TX",
    lat: 32.7357,
    lng: -97.1081,
    blurb:
      "Arlington sits between Dallas and Fort Worth and draws huge event and family crowds year round. Restaurants that rank for local searches and make direct ordering simple capture that traffic before the apps do.",
  },
  {
    slug: "corpus-christi",
    name: "Corpus Christi",
    state: "Texas",
    stateCode: "TX",
    lat: 27.8006,
    lng: -97.3964,
    blurb:
      "Corpus Christi mixes a loyal local base with seasonal coastal visitors. Being the first result those diners see, with a fast site and direct ordering, is what keeps tables full through every season.",
  },
  {
    slug: "plano",
    name: "Plano",
    state: "Texas",
    stateCode: "TX",
    lat: 33.0198,
    lng: -96.6989,
    blurb:
      "Plano is one of the fastest-growing suburbs in Texas, packed with discerning diners who research before they order. Restaurants that rank locally and convert that traffic directly hold a real edge over the chains nearby.",
  },
  {
    slug: "laredo",
    name: "Laredo",
    state: "Texas",
    stateCode: "TX",
    lat: 27.5306,
    lng: -99.4803,
    blurb:
      "Laredo's restaurant market is community-driven and increasingly online. A strong local search presence and commission-free ordering let independent spots compete and keep more of every sale.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TARGET_CITIES.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return TARGET_CITIES.map((city) => city.slug);
}
