export type PortfolioNavigationItem = {
  label: string;
  href: `/#${string}`;
  sectionId: string;
};

// 헤더·모바일 메뉴·푸터가 공유한다. src/app/(portfolio)/page.tsx의 섹션 순서와 맞춘다.
export const PORTFOLIO_NAVIGATION_ITEMS: PortfolioNavigationItem[] = [
  { label: "소개", href: "/#introduction", sectionId: "introduction" },
  { label: "프로젝트", href: "/#projects", sectionId: "projects" },
  { label: "기술", href: "/#skills", sectionId: "skills" },
  { label: "자격증", href: "/#certifications", sectionId: "certifications" },
  { label: "어학", href: "/#language-tests", sectionId: "language-tests" },
];

// 섹션 상단이 뷰포트의 이 비율 지점을 지나면 해당 섹션을 활성으로 본다.
export const ACTIVATION_RATIO = 0.35;
