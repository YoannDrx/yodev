import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const dotSize = 70;
  const gap = 8;
  const radius = 10;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F1111",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: gap,
          }}
        >
          <div style={{ display: "flex", gap: gap }}>
            {/* Top left - primary */}
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: radius,
                background: "#1BA896",
              }}
            />
            {/* Top right - primary 60% */}
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: radius,
                background: "rgba(27, 168, 150, 0.7)",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: gap }}>
            {/* Bottom left - primary 40% */}
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: radius,
                background: "rgba(27, 168, 150, 0.5)",
              }}
            />
            {/* Bottom right - secondary */}
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: radius,
                background: "#FF6B35",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
