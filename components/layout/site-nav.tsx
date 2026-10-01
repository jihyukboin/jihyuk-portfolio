"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { NavigationItem } from "./site-mobile-menu";

const HEADER_HEIGHT = 50;
// 섹션 상단이 뷰포트의 이 비율 지점을 지나면 해당 섹션을 활성으로 본다.
const ACTIVATION_RATIO = 0.35;

function sectionIdOf(href: string) {
  return href.slice(href.indexOf("#") + 1);
}

/**
 * 메인 영역(800px)과 같은 폭의 섹션 탭 내비게이션.
 * 스크롤 위치에 따라 현재 섹션을 강조하고, 하단 인디케이터가 해당 탭으로 미끄러진다.
 */
export function SiteNav({ items }: { items: NavigationItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(sectionIdOf(item.href)));
    let frameId = 0;

    const computeActive = () => {
      frameId = 0;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      // 페이지 끝에 닿으면 마지막 섹션이 짧아도 활성화한다.
      if (scrollTop + clientHeight >= scrollHeight - 2) {
        setActiveIndex(items.length - 1);
        return;
      }

      const threshold = HEADER_HEIGHT + window.innerHeight * ACTIVATION_RATIO;
      let next = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= threshold) next = index;
      });
      setActiveIndex(next);
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(computeActive);
    };

    computeActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <nav
      aria-label="포트폴리오 메뉴"
      className="relative grid h-full w-full min-w-0"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "location" : undefined}
            className={`group relative flex h-full min-w-0 items-center justify-center whitespace-nowrap text-[17px] leading-6 no-underline transition-colors duration-200 focus-visible:outline-none ${
              active ? "text-[#191f28] [font-weight:650]" : "text-[#8b95a1] [font-weight:500] hover:text-[#4e5968]"
            }`}
          >
            {/* hover·focus 시 은은한 배경 */}
            <span
              aria-hidden="true"
              className="absolute inset-x-1.5 inset-y-[7px] rounded-lg bg-[#f2f4f6] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}

      {/* 하단 트랙 라인 */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#e5e8eb]" />

      {/* 활성 섹션 인디케이터 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ width: `${100 / items.length}%`, transform: `translateX(${activeIndex * 100}%)` }}
      >
        <span className="mx-auto block h-full w-10 rounded-full bg-[#3182f6]" />
      </span>
    </nav>
  );
}
