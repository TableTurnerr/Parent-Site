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
// with the major Texas metros and fast-growing cities, and expand to new US
// markets as we grow. (Per Hasham: base the regional pages on major TX cities,
// frame TX as the launch market, not a limit.) Each city carries a unique,
// hand-written blurb so the programmatic pages stay specific, not thin.
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
  {
    slug: "lubbock",
    name: "Lubbock",
    state: "Texas",
    stateCode: "TX",
    lat: 33.5779,
    lng: -101.8552,
    blurb:
      "Lubbock is a West Texas hub anchored by Texas Tech, with a big student crowd and a loyal local base that lives on Google and Maps. The restaurants that show up first for nearby searches win the steady, repeat traffic that keeps tables full year round.",
  },
  {
    slug: "irving",
    name: "Irving",
    state: "Texas",
    stateCode: "TX",
    lat: 32.814,
    lng: -96.9489,
    blurb:
      "Irving and Las Colinas mix a dense corporate lunch crowd with one of the most diverse dining scenes in the Metroplex. Standing out means being the first, most trustworthy result when nearby workers and residents search for their next meal.",
  },
  {
    slug: "garland",
    name: "Garland",
    state: "Texas",
    stateCode: "TX",
    lat: 32.9126,
    lng: -96.6389,
    blurb:
      "Garland is a large, diverse Dallas suburb where independent and family-run restaurants are the backbone of the food scene. A strong local search presence and direct ordering let those spots compete without handing profit to delivery apps.",
  },
  {
    slug: "frisco",
    name: "Frisco",
    state: "Texas",
    stateCode: "TX",
    lat: 33.1507,
    lng: -96.8236,
    blurb:
      "Frisco is one of the fastest-growing cities in the country, packed with affluent families and a booming sports and corporate scene. Diners here research before they pick, so ranking locally and converting that traffic directly is a real edge over the chains nearby.",
  },
  {
    slug: "mckinney",
    name: "McKinney",
    state: "Texas",
    stateCode: "TX",
    lat: 33.1972,
    lng: -96.6398,
    blurb:
      "McKinney pairs a beloved historic downtown with rapid Collin County growth. Visitors and new residents alike start on Google, so a fast site that ranks and makes ordering simple turns that discovery into direct, repeat business.",
  },
  {
    slug: "amarillo",
    name: "Amarillo",
    state: "Texas",
    stateCode: "TX",
    lat: 35.222,
    lng: -101.8313,
    blurb:
      "Amarillo anchors the Texas Panhandle with a strong steakhouse and comfort-food tradition and steady Route 66 tourism. The restaurants that rank locally capture both loyal regulars and travelers searching on the move.",
  },
  {
    slug: "waco",
    name: "Waco",
    state: "Texas",
    stateCode: "TX",
    lat: 31.5493,
    lng: -97.1467,
    blurb:
      "Waco's dining scene has boomed alongside Magnolia and Baylor, drawing waves of tourists and students. Being the top local result, with a fast site and direct ordering, is what turns that visitor surge into full tables.",
  },
  {
    slug: "denton",
    name: "Denton",
    state: "Texas",
    stateCode: "TX",
    lat: 33.2148,
    lng: -97.1331,
    blurb:
      "Denton blends a vibrant college and music scene with a tight-knit local community. Diners here are young, mobile-first, and quick to try somewhere new, so ranking in local search and making ordering effortless captures that demand.",
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    state: "Texas",
    stateCode: "TX",
    lat: 30.5083,
    lng: -97.6789,
    blurb:
      "Round Rock is one of the fastest-growing suburbs north of Austin, with a tech-driven, family-heavy population that researches before it orders. Restaurants that own their local search presence keep that growth working for them.",
  },
  {
    slug: "sugar-land",
    name: "Sugar Land",
    state: "Texas",
    stateCode: "TX",
    lat: 29.6197,
    lng: -95.6349,
    blurb:
      "Sugar Land is an affluent, diverse Houston suburb with discerning diners and a thriving international food scene. The spots that rank first and convert that traffic directly hold a clear edge over the national chains nearby.",
  },
  {
    slug: "the-woodlands",
    name: "The Woodlands",
    state: "Texas",
    stateCode: "TX",
    lat: 30.1658,
    lng: -95.4613,
    blurb:
      "The Woodlands is an upscale, master-planned community north of Houston with high-spending diners and heavy competition. A site that ranks, loads fast, and makes direct ordering simple is what separates the busy restaurants from the overlooked ones.",
  },
  {
    slug: "mcallen",
    name: "McAllen",
    state: "Texas",
    stateCode: "TX",
    lat: 26.2034,
    lng: -98.23,
    blurb:
      "McAllen anchors the Rio Grande Valley with cross-border shoppers and a fast-growing local dining scene. Most new customers still find their next meal on Google, so a strong local presence turns that search traffic into repeat, direct business.",
  },
  {
    slug: "killeen",
    name: "Killeen",
    state: "Texas",
    stateCode: "TX",
    lat: 31.1171,
    lng: -97.7278,
    blurb:
      "Killeen sits beside Fort Cavazos with a large, steady military and family population that relies on Google and Maps to choose where to eat. Ranking first locally, with easy direct ordering, captures that constant flow of new diners.",
  },
  {
    slug: "tyler",
    name: "Tyler",
    state: "Texas",
    stateCode: "TX",
    lat: 32.3513,
    lng: -95.3011,
    blurb:
      "Tyler is the hub of East Texas, where a loyal local base still finds new favorites through Google and Maps. A strong local search presence and commission-free ordering let independent restaurants compete and keep more of every sale.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TARGET_CITIES.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return TARGET_CITIES.map((city) => city.slug);
}
