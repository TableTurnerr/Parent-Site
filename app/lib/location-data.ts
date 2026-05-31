export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
}

// Texas-first local SEO targeting: top Texas metros by population.
// Start with the 10 largest TX markets; expand as client coverage grows.
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
