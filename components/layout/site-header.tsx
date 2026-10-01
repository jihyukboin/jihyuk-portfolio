import Link from "next/link";

import { ScrollProgress } from "./scroll-progress";
import { SiteMobileMenu, type NavigationItem } from "./site-mobile-menu";
import { SiteNav } from "./site-nav";

// 페이지(app/(root)/page.tsx)의 실제 섹션 순서와 동일하게 유지한다.
const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "소개", href: "/#introduction" },
  { label: "프로젝트", href: "/#projects" },
  { label: "자격증", href: "/#certifications" },
  { label: "어학", href: "/#language-tests" },
  { label: "기술", href: "/#skills" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[2147483645] h-auto min-h-[50px] w-full bg-white/85 font-bold shadow-none backdrop-blur-[8px] [font-synthesis:auto]">
      <ScrollProgress />
      {/* 가운데 열을 메인 article(max-w-[800px], mx-auto)과 같은 폭·위치로 맞춘다. */}
      <div className="relative box-border flex min-h-[50px] w-full items-center justify-between px-4 min-[840px]:grid min-[840px]:grid-cols-[minmax(7rem,1fr)_minmax(0,800px)_minmax(7rem,1fr)]">
        <div className="mr-auto inline-flex min-w-0 items-center min-[840px]:mr-0 min-[840px]:w-28 min-[840px]:min-w-28">
          <Link
            href="/"
            aria-label="정지혁 포트폴리오 홈으로 이동"
            className="inline-flex min-h-9 w-full items-center gap-2 whitespace-nowrap text-[rgba(26,31,41,0.89)] no-underline transition-colors focus-visible:outline-none"
          >
            <span className="inline-flex min-w-0 items-end gap-1 whitespace-nowrap leading-none">
              <span className="text-lg font-bold leading-none tracking-normal">정지혁</span>
            </span>
          </Link>
        </div>

        <div className="hidden min-w-0 min-[840px]:flex min-[840px]:h-[50px] min-[840px]:w-full min-[840px]:self-stretch">
          <SiteNav items={NAVIGATION_ITEMS} />
        </div>

        <a
          href="https://github.com/jihyukboin"
          target="_blank"
          rel="noopener noreferrer"
          className="relative hidden min-h-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border-0 bg-[#3182f6] px-3 py-1.5 text-sm font-semibold leading-4 text-white no-underline transition-colors hover:bg-[#1b64da] focus-visible:bg-[#1b64da] focus-visible:outline-none min-[840px]:inline-flex min-[840px]:justify-self-end"
        >
          GitHub
        </a>

        <SiteMobileMenu navigationItems={NAVIGATION_ITEMS} />
      </div>
    </header>
  );
}
