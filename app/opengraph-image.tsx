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
          background: "#0a0b09",
          color: "#ecebe3",
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
            color: "#8d9282",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#c8ff2e",
              color: "#0a0b09",
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
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -8,
          }}
        >
          <div style={{ display: "flex" }}>
            The&nbsp;<span style={{ color: "#c8ff2e" }}>3%</span>
          </div>
          <div style={{ display: "flex" }}>is yours.</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 2,
            color: "#c8ff2e",
          }}
        >
          3% creator tax → holders. every 60s.
        </div>
      </div>
    ),
    size,
  );
}
