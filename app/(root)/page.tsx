import { Introduction } from "@/components/portfolio/introduction";
import { ProfileSection } from "@/components/portfolio/profile-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { LanguageSection } from "@/components/portfolio/language-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { StructuredData } from "@/components/seo/structured-data";

// 메타데이터는 app/layout.tsx에서 정의한다.
// 섹션 순서를 바꾸면 components/layout/navigation.ts의 NAVIGATION_ITEMS도 함께 바꾼다.
export default function Home() {
  return (
    <article className="mx-auto w-full max-w-[800px] bg-white pt-[clamp(40px,6vw,64px)] pb-[clamp(64px,8vw,96px)] text-[#333d4b] max-[840px]:px-5">
      <StructuredData />

      <Introduction />

      <ProfileSection />

      <SkillsSection />

      <ProjectsSection />

      <CertificationsSection />

      <LanguageSection />
    </article>
  );
}
