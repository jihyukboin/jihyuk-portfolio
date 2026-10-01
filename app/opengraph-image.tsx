import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

// 링크 공유(카카오톡·Slack·LinkedIn 등) 미리보기 이미지.
// 기본 폰트에 한글 글리프가 없어 영문으로만 구성한다.
export const alt = `${profile.name} ${profile.jobTitle} 포트폴리오`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          color: "#191f28",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#3182f6" }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, letterSpacing: "-0.04em" }}>
            {profile.englishName}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#4e5968" }}>Full Stack Developer</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 24,
            background: "#f2f4f6",
            padding: "28px 36px",
            fontSize: 26,
            color: "#4e5968",
          }}
        >
          <span>Web · Mobile · Backend · Cloud · AI</span>
          <span style={{ flexShrink: 0 }}>{profile.githubUrl.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
