"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ACTIVATION_RATIO, HEADER_HEIGHT } from "./navigation";

export type ProjectDockItem = {
  id: string;
  title: string;
  icon: string;
};

// 아이콘 버튼 크기·간격. 활성 하이라이트 pill 이동 거리 계산에 쓰인다.
const ITEM_SIZE = 40;
const ITEM_GAP = 4;

/**
 * iOS 26 Liquid Glass 느낌의 프로젝트 독.
 * 프로젝트 섹션을 보는 동안 헤더 아래 화면 중앙에 떠오르며, 현재 보고 있는 프로젝트를 강조한다.
 *
 * 헤더(backdrop-filter)의 자식으로 두면 헤더가 backdrop root가 되어 페이지 배경을 블러하지 못하므로
 * 헤더 바깥 fixed 레이어로 렌더링한다.
 */
export function ProjectDock({ items, sectionId }: { items: ProjectDockItem[]; sectionId: string }) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const heading = section?.querySelector("h2");
    const articles = items.map((item) => document.getElementById(item.id));
    let frameId = 0;

    const compute = () => {
      frameId = 0;
      if (!section || !heading) return;

      // 표시 구간: 헤더 하단이 섹션 제목(h2) 상단에 닿은 순간부터 섹션 끝(마지막 프로젝트 하단)에 닿기 전까지.
      // 앵커 이동(scroll-padding-top: 50px) 시 소수점 오차로 1px 모자라는 경우를 허용한다.
      const headerLine = HEADER_HEIGHT + 1;
      setVisible(
        heading.getBoundingClientRect().top <= headerLine &&
          section.getBoundingClientRect().bottom > headerLine,
      );

      // 활성 프로젝트는 SiteNav와 같은 뷰포트 35% 기준선을 쓴다.
      const threshold = HEADER_HEIGHT + window.innerHeight * ACTIVATION_RATIO;
      let next = 0;
      articles.forEach((article, index) => {
        if (article && article.getBoundingClientRect().top <= threshold) next = index;
      });
      setActiveIndex(next);
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items, sectionId]);

  // 숨겨진 동안엔 남아 있는 hover 상태를 무시한다.
  const captionIndex = (visible ? hoverIndex : null) ?? activeIndex;
  const caption = items[captionIndex]?.title;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[50px] z-[2147483644] flex justify-center px-4">
      <div className="pt-2">
        <div>
          <nav
            aria-label="프로젝트 바로가기"
            aria-hidden={!visible}
            inert={!visible}
            className={`flex origin-top flex-col items-center gap-1.5 transition-[opacity,translate,scale] motion-reduce:transition-opacity ${
              visible
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100 duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                : "-translate-y-3 scale-90 opacity-0 duration-200 ease-[cubic-bezier(0.4,0,1,1)]"
            }`}
          >
            {/* 유리 캡슐 */}
            <div className="relative rounded-full border border-white/70 bg-white/55 p-1.5 shadow-[0_10px_30px_-6px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-[1.8]">
              {/* 상단 스페큘러 하이라이트 */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/60 via-white/0 to-white/20"
              />

              <ul className="relative flex" style={{ gap: ITEM_GAP }}>
                {/* 활성 프로젝트 하이라이트 pill */}
                <li
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 rounded-full bg-white/90 shadow-[0_2px_10px_rgba(15,23,42,0.14),inset_0_0_0_0.5px_rgba(255,255,255,1)] ring-1 ring-[#3182f6]/15 transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none"
                  style={{
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    transform: `translateX(${activeIndex * (ITEM_SIZE + ITEM_GAP)}px)`,
                  }}
                />

                {items.map((item, index) => {
                  const active = index === activeIndex;
                  return (
                    <li key={item.id} className="relative">
                      <a
                        href={`#${item.id}`}
                        aria-label={item.title}
                        aria-current={active ? "location" : undefined}
                        onPointerEnter={() => setHoverIndex(index)}
                        onPointerLeave={() => setHoverIndex(null)}
                        onFocus={() => setHoverIndex(index)}
                        onBlur={() => setHoverIndex(null)}
                        className="group grid place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#3182f6]/60"
                        style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
                      >
                        <span
                          className={`block size-[30px] overflow-hidden rounded-[9px] border border-black/5 bg-white transition-[scale,opacity,filter] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none ${
                            active
                              ? "scale-100 opacity-100 shadow-[0_1px_3px_rgba(15,23,42,0.18)]"
                              : "scale-[0.82] opacity-60 saturate-[0.6] group-hover:scale-95 group-hover:opacity-100 group-hover:saturate-100"
                          }`}
                        >
                          <Image
                            className="block h-full w-full object-cover"
                            src={item.icon}
                            alt=""
                            width={30}
                            height={30}
                            sizes="30px"
                          />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 현재(또는 hover 중인) 프로젝트 이름 */}
            {caption && (
              <span
                aria-hidden="true"
                className="max-w-[calc(100vw-32px)] truncate rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[12px] leading-4 tracking-[-0.01em] text-[#333d4b] shadow-[0_4px_14px_-4px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl backdrop-saturate-[1.8] [font-weight:600]"
              >
                <span key={captionIndex} className="block animate-dock-caption motion-reduce:animate-none">
                  {caption}
                </span>
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
