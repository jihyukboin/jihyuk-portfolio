import type { Metadata } from 'next';
import { IntroductionSection } from '@/components/portfolio/introduction-section';
import { ProfileSection } from '@/components/portfolio/profile-section';
import { ProjectsSection } from '@/components/portfolio/projects-section';
import { CertificationsSection } from '@/components/portfolio/certifications-section';
import { LanguageTestsSection } from '@/components/portfolio/language-tests-section';
import { SkillsSection } from '@/components/portfolio/skills-section';
import { PortfolioStructuredData } from '@/components/portfolio/portfolio-structured-data';
import { PortfolioCta } from '@/components/portfolio/portfolio-cta';
import { profile, skills } from '@/data/portfolio';
import {
  portfolioDescription,
  portfolioOpenGraphImage,
  portfolioTitle
} from '@/lib/portfolio';
import { siteName } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'DX 엔지니어 정지혁 포트폴리오' },
  description: portfolioDescription,
  keywords: [
    profile.name,
    profile.englishName,
    profile.jobTitle,
    '개발자 포트폴리오',
    '임고봇',
    ...skills.flatMap((group) => group.items)
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'ko_KR',
    url: '/',
    siteName,
    title: portfolioTitle,
    description: portfolioDescription,
    images: [portfolioOpenGraphImage],
    firstName: '지혁',
    lastName: '정',
    username: 'jihyukboin'
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioTitle,
    description: portfolioDescription,
    images: [portfolioOpenGraphImage]
  }
};

// 섹션 순서를 바꾸면 components/portfolio/navigation.ts의 메뉴 순서도 함께 바꾼다.
export default function PortfolioPage() {
  return (
    <article className="mx-auto w-full max-w-(--site-content-width) bg-white pt-[clamp(40px,6vw,64px)] pb-[clamp(64px,8vw,96px)] text-[#333d4b] max-[840px]:px-5">
      <PortfolioStructuredData />

      <IntroductionSection />

      <ProfileSection />

      <ProjectsSection />

      <SkillsSection />

      <CertificationsSection />

      <LanguageTestsSection />

      <PortfolioCta />
    </article>
  );
}
