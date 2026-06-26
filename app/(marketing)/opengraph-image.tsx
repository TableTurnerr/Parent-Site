import { ImageResponse } from "next/og";

export const alt = "TableTurnerr — Review automation for home services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f4a100",
            marginBottom: 28,
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#f4a100", display: "flex" }} />
          Review automation for home services
        </div>

        <div style={{ display: "flex", fontSize: 66, fontWeight: 800, color: "#ffffff", lineHeight: 1.08, maxWidth: 940 }}>
          Turn finished jobs into 5-star reviews
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.72)", marginTop: 26, maxWidth: 800, lineHeight: 1.5 }}>
          More reviews, a higher map-pack rank, and more booked work for HVAC, roofing, plumbing & electrical pros.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 50 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#ffffff" }}>TableTurnerr</div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f4a100", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 22, color: "#f4a100" }}>tableturnerr.com</div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 20, fontWeight: 700, color: "#f4a100", letterSpacing: "0.12em", textTransform: "uppercase" }}>HVAC · Roofing · Plumbing · Electrical</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
