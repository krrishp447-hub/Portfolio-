import { ImageResponse } from "next/og";

/**
 * The link preview card, generated at build time.
 *
 * Without this, pasting the URL anywhere produces a blank card, which for a
 * site whose whole argument is "I think about how things are presented" is the
 * worst possible first impression. Deliberately typographic: no image to load,
 * no font files to fetch, same palette as the site (anime mode, the default).
 */
export const alt = "Krish Patil: Content × Research × Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff6ef",
          color: "#1d1033",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6a4b86",
          }}
        >
          Mumbai, India
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: -4,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Krish Patil
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 40,
              marginTop: 24,
              letterSpacing: -1,
              textTransform: "uppercase",
              color: "#6a4b86",
            }}
          >
            Content&nbsp;
            <span style={{ color: "#ff2e88" }}>×</span>
            &nbsp;Research&nbsp;
            <span style={{ color: "#ff2e88" }}>×</span>
            &nbsp;Technology
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#6a4b86",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: "#ff2e88",
            }}
          />
          A researcher who makes things.
        </div>
      </div>
    ),
    size,
  );
}
