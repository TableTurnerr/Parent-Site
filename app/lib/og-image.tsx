import { ImageResponse } from "next/og";

/** Shared frame for branded OG/Twitter images across the marketing site. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "TableTurnerr — Review automation for home services";

export function renderOgImage({
  eyebrow,
  title,
  subtitle = "Across Google, Facebook, Yelp & Angi.",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#11142b",
          padding: "80px",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#f4a100",
            marginBottom: 28,
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f4a100", display: "flex" }} />
          {eyebrow}
        </div>

        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, color: "#ffffff", lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.72)", marginTop: 26, maxWidth: 860, lineHeight: 1.5 }}>
          {subtitle}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 50 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#ffffff" }}>TableTurnerr</div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f4a100", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 22, color: "#f4a100" }}>tableturnerr.com</div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 18, fontWeight: 700, color: "#f4a100", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            HVAC · Roofing · Plumbing · Electrical
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
