export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
}

// Target cities from SEO Report section 4.4 (Local/Geo Keywords)
export const TARGET_CITIES: CityData[] = [
  { slug: "new-york", name: "New York", state: "New York", stateCode: "NY" },
  { slug: "los-angeles", name: "Los Angeles", state: "California", stateCode: "CA" },
  { slug: "chicago", name: "Chicago", state: "Illinois", stateCode: "IL" },
  { slug: "houston", name: "Houston", state: "Texas", stateCode: "TX" },
  { slug: "dallas", name: "Dallas", state: "Texas", stateCode: "TX" },
  { slug: "miami", name: "Miami", state: "Florida", stateCode: "FL" },
  { slug: "atlanta", name: "Atlanta", state: "Georgia", stateCode: "GA" },
  { slug: "san-francisco", name: "San Francisco", state: "California", stateCode: "CA" },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return TARGET_CITIES.find((city) => city.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return TARGET_CITIES.map((city) => city.slug);
}
