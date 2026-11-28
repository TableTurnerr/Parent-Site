// Lowercase a name for use mid-sentence without breaking acronyms or proper nouns:
// "HVAC" stays "HVAC", "Google reviews" stays "Google reviews", "Garage Door Repair" -> "garage door repair".
const KEEP = new Set(["Google", "Maps", "Business", "Profile", "Jobber", "Housecall", "Pro"]);

export function softLower(name: string): string {
  return name
    .split(" ")
    .map((w) => (KEEP.has(w) || /^[A-Z0-9&]{2,}[,s]?$/.test(w) ? w : w.toLowerCase()))
    .join(" ");
}
