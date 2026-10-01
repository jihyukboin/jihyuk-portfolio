import type { Metadata } from "next";
import { Introduction } from "@/components/portfolio/introduction";
import { ProfileSection } from "@/components/portfolio/profile-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { LanguageSection } from "@/components/portfolio/language-section";
import { SkillsSection } from "@/components/portfolio/skills-section";

export const metadata: Metadata = {
  title: "포트폴리오 - 정지혁",
  description: "정지혁의 소프트웨어 엔지니어 포트폴리오입니다.",
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const profileJsonLd = siteUrl && {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: "포트폴리오 - 정지혁",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "정지혁",
      jobTitle: "소프트웨어 엔지니어",
      description: "웹·모바일·백엔드 서비스를 기획·개발·운영하는 소프트웨어 엔지니어",
      image: `${siteUrl}/images/jihyuk.webp`,
      url: siteUrl,
      sameAs: ["https://github.com/jihyukboin"],
    },
  };

  return (
    <article className="mx-auto w-full max-w-[800px] bg-white pt-[clamp(40px,6vw,64px)] pb-[clamp(64px,8vw,96px)] text-[#37352f] max-[840px]:px-5">
      {profileJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Introduction />

      <ProfileSection />

      <ProjectsSection />

      <CertificationsSection />

      <LanguageSection />

      <SkillsSection />
    </article>
  );
}
