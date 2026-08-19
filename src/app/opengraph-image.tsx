import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = await readFile(
    join(process.cwd(), "public/brand/app-icon-512.png"),
  );
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#FFF8F1",
          padding: "88px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, #FF8A1C 0%, rgba(255,138,28,0) 70%)",
            opacity: 0.55,
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt=""
          width={104}
          height={104}
          style={{ borderRadius: 24, marginBottom: 40 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            color: "#1F1913",
            lineHeight: 1.05,
          }}
        >
          Find the places
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            color: "#1F1913",
            lineHeight: 1.05,
          }}
        >
          you see online.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#6F6257",
            marginTop: 28,
          }}
        >
          Share a video. Nearr finds the place.
        </div>
      </div>
    ),
    { ...size },
  );
}
