export type NavigationItem = {
  label: string;
  href: string;
};

// 헤더·모바일 메뉴·푸터가 공유한다. 페이지(app/(root)/page.tsx)의 실제 섹션 순서와 동일하게 유지한다.
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "소개", href: "/#introduction" },
  { label: "기술", href: "/#skills" },
  { label: "프로젝트", href: "/#projects" },
  { label: "자격증", href: "/#certifications" },
  { label: "어학", href: "/#language-tests" },
];

// sticky 헤더 높이(px). 스크롤 위치 계산과 globals.css의 scroll-padding-top(50px)이 이 값을 기준으로 한다.
export const HEADER_HEIGHT = 50;
// 섹션 상단이 뷰포트의 이 비율 지점을 지나면 해당 섹션을 활성으로 본다.
export const ACTIVATION_RATIO = 0.35;
