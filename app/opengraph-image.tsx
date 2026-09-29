import { ImageResponse } from "next/og";

export const alt = "Fair Fees — The 3% is yours. Hold $FEES. Take the tax. Every 60 seconds.";
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
          background: "#0b0b0c",
          color: "#ececea",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8a8a90",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              borderRadius: 10,
              background: "#c6f432",
              color: "#0b0b0c",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            %
          </div>
          Fair Fees · $FEES
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 190,
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: -7,
          }}
        >
          <div style={{ display: "flex" }}>
            The&nbsp;<span style={{ color: "#c6f432" }}>3%</span>
          </div>
          <div style={{ display: "flex" }}>is yours.</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 2,
            color: "#c6f432",
          }}
        >
          3% creator tax → holders. every 60s.
        </div>
      </div>
    ),
    size,
  );
}
