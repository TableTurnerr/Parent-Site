import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "TableTurnerr — Restaurant Website Design, SEO & Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bgImage = await readFile(
    join(process.cwd(), "public/images/usage/restaurant-kitchen-2.jpg")
  );
  const bgSrc = `data:image/jpeg;base64,${bgImage.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Background photo */}
        <img
          src={bgSrc}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.75) 50%, rgba(28,25,23,0.45) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#C4A97D",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Restaurant Marketing Agency
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#FAF8F5",
              lineHeight: 1.15,
              marginBottom: 24,
              maxWidth: 700,
            }}
          >
            Restaurant Website Design, SEO & Marketing
          </div>

          {/* Subline */}
          <div
            style={{
              fontSize: 20,
              color: "#C4B8A8",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Custom websites, local SEO, and Google Ads for independent
            restaurants.
          </div>

          {/* Brand bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 44,
              gap: 12,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "#FAF8F5" }}>
              TableTurnerr
            </div>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#C4A97D",
              }}
            />
            <div style={{ fontSize: 17, color: "#C4A97D" }}>
              tableturnerr.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
