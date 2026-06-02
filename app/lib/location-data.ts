export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
}

// Local SEO targeting. Texas is the STARTING POINT, not a restriction: we lead
// with the 10 largest Texas metros and expand to new US markets as we grow.
// (Per Hasham: base the regional pages on major TX cities, frame TX as the
// launch market, not a limit.)
export const TARGET_CITIES: CityData[] = [
  { slug: "houston", name: "Houston", state: "Texas", stateCode: "TX" },
  { slug: "san-antonio", name: "San Antonio", state: "Texas", stateCode: "TX" },
  { slug: "dallas", name: "Dallas", state: "Texas", stateCode: "TX" },
  { slug: "austin", name: "Austin", state: "Texas", stateCode: "TX" },
  { slug: "fort-worth", name: "Fort Worth", state: "Texas", stateCode: "TX" },
  { slug: "el-paso", name: "El Paso", state: "Texas", stateCode: "TX" },
  { slug: "arlington", name: "Arlington", state: "Texas", stateCode: "TX" },
  { slug: "corpus-christi", name: "Corpus Christi", state: "Texas", stateCode: "TX" },
  { slug: "plano", name: "Plano", state: "Texas", stateCode: "TX" },
  { slug: "laredo", name: "Laredo", state: "Texas", stateCode: "TX" },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TARGET_CITIES.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return TARGET_CITIES.map((city) => city.slug);
}
