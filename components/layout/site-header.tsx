import Link from "next/link";

import { SiteMobileMenu, type NavigationItem } from "./site-mobile-menu";

const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "경험", href: "/#experience" },
  { label: "자격증", href: "/#certifications" },
  { label: "프로젝트", href: "/#projects" },
  { label: "기술", href: "/#skills" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[2147483645] h-auto min-h-[50px] w-full bg-white/85 font-bold shadow-none backdrop-blur-[8px] [font-synthesis:auto]">
      <div className="relative box-border flex min-h-[50px] w-full items-center justify-between px-4 min-[840px]:grid min-[840px]:grid-cols-[auto_minmax(0,1fr)_auto]">
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

        <div className="hidden min-w-0 items-center justify-start min-[840px]:inline-flex min-[840px]:w-full">
          <nav aria-label="포트폴리오 메뉴" className="flex min-w-0 flex-nowrap items-center justify-start gap-0.5 overflow-visible whitespace-nowrap">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center overflow-visible whitespace-nowrap rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-medium leading-5 text-[#23242a] no-underline transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <a
          href="https://github.com/jihyukboin"
          target="_blank"
          rel="noopener noreferrer"
          className="relative hidden min-h-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border-0 bg-[#3182f6] px-3 py-1.5 text-sm font-semibold leading-4 text-white no-underline transition-colors hover:bg-[#1b64da] focus-visible:bg-[#1b64da] focus-visible:outline-none min-[840px]:inline-flex"
        >
          GitHub
        </a>

        <SiteMobileMenu navigationItems={NAVIGATION_ITEMS} />
      </div>
    </header>
  );
}
