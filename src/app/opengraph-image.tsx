import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const technologies = [
  { name: "REACT.JS", mark: "R", color: "#61dafb", markColor: "#050506" },
  { name: "JAVASCRIPT", mark: "JS", color: "#f7df1e", markColor: "#050506" },
  { name: "TAILWIND", mark: "TW", color: "#38bdf8", markColor: "#ffffff" },
  { name: "REDUX", mark: "RX", color: "#764abc", markColor: "#ffffff" },
];

export default async function OpenGraphImage() {
  let photoSrc = `${siteConfig.url}/ilyas.png`;
  try {
    const fileBuffer = await readFile(
      path.join(process.cwd(), "public", "ilyas.png"),
    );
    photoSrc = `data:image/png;base64,${fileBuffer.toString("base64")}`;
  } catch {
    // fallback to url if local read fails
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#0d0f0e",
        color: "#f4f4f1",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(#aeb8b0 1px, transparent 1px), linear-gradient(90deg, #aeb8b0 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 34,
          bottom: -124,
          width: 510,
          height: 590,
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders native image elements. */}
        <img
          alt=""
          src={photoSrc}
          width="510"
          height="590"
          style={{
            width: 510,
            height: 590,
            objectFit: "contain",
            objectPosition: "bottom center",
            filter: "drop-shadow(0 24px 34px rgba(0, 0, 0, 0.28))",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 36,
          left: 42,
          right: 42,
          bottom: 36,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(244, 244, 241, 0.24)",
          borderRadius: 24,
          padding: "30px 34px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                background: "#f4f4f1",
                color: "#111412",
                fontFamily: "Georgia, serif",
                fontSize: 24,
                fontStyle: "italic",
              }}
            >
              I
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: 1.2 }}>
              ILYAS / PORTOFOLIO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 5,
              color: "#f4f4f1",
            }}
          >
            <span
              style={{
                color: "#89938b",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              LET&apos;S CONNECT
            </span>
            <span
              style={{
                display: "flex",
                paddingBottom: 5,
                borderBottom: "1px solid rgba(244, 244, 241, 0.82)",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0.25,
              }}
            >
              linkedin.com/in/muhammad-ilyas-satria-fauzan
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 62,
            width: 700,
          }}
        >
          <span
            style={{
              color: "#b7c7b9",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: 2.4,
            }}
          >
            FULL-STACK WEB DEVELOPER
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 13,
              fontSize: 73,
              fontWeight: 700,
              letterSpacing: -3.6,
              lineHeight: 0.94,
            }}
          >
            <span>Building website</span>
            <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
              with <span style={{ color: "#b7c7b9" }}>purpose.</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 25,
              color: "#c7cac7",
              fontSize: 20,
            }}
          >
            <span>{siteConfig.name}</span>
            <span style={{ color: "#7f8981" }}>/</span>
            <span>Indonesia</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: "auto",
          }}
        >
          {technologies.map((technology) => (
            <span
              key={technology.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                borderRadius: 100,
                padding: "7px 13px 7px 8px",
                background: "rgba(244, 244, 241, 0.1)",
                border: "1px solid rgba(244, 244, 241, 0.22)",
                color: "#e5e6e3",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              <span
                style={{
                  width: 27,
                  height: 27,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 14,
                  background: technology.color,
                  color: technology.markColor,
                  fontSize: technology.mark.length > 1 ? 9 : 12,
                  fontWeight: 800,
                  letterSpacing: -0.2,
                }}
              >
                {technology.mark}
              </span>
              {technology.name}
            </span>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
