"use client";

import { useEffect, useRef } from "react";

/**
 * 페이지 스크롤 진행률 인디케이터.
 *
 * Magic UI `ScrollProgress`(motion `useScroll`)와 motion `useSpring` 패턴을 참고해
 * 외부 의존성 없이 구현했다.
 * - React 리렌더 없이 rAF에서 transform만 갱신 (GPU 합성, 레이아웃 비용 없음)
 * - 시간 기반 지수 감쇠로 스프링처럼 부드럽게 따라감
 * - prefers-reduced-motion 사용자는 스무딩 없이 즉시 반영
 */
const SMOOTHING_MS = 90; // 작을수록 빠르게 따라감
const EPSILON = 0.0005;

export function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bar = barRef.current;
    if (!container || !bar) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let target = 0;
    let current = 0;
    let frameId = 0;
    let lastTime = 0;

    const readProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      return max > 0 ? Math.min(Math.max(scrollTop / max, 0), 1) : 0;
    };

    const paint = (value: number) => {
      bar.style.transform = `scaleX(${value})`;
      container.style.opacity = value > EPSILON ? "1" : "0";
    };

    const tick = (time: number) => {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;

      const alpha = 1 - Math.exp(-dt / SMOOTHING_MS);
      current += (target - current) * alpha;

      if (Math.abs(target - current) < EPSILON) {
        current = target;
        paint(current);
        frameId = 0;
        lastTime = 0;
        return;
      }

      paint(current);
      frameId = requestAnimationFrame(tick);
    };

    const update = () => {
      target = readProgress();

      if (reducedMotion.matches) {
        current = target;
        paint(current);
        return;
      }

      if (!frameId) frameId = requestAnimationFrame(tick);
    };

    // 최초 진입(새로고침·앵커 이동) 시에는 애니메이션 없이 현재 위치로 맞춘다.
    current = target = readProgress();
    paint(current);

    // 콘텐츠 높이가 바뀌면(이미지 로드 등) 진행률도 다시 계산한다.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] opacity-0 transition-opacity duration-300"
    >
      <div
        ref={barRef}
        // Tailwind v4의 scale-x-* 는 CSS `scale` 속성을 써서 인라인 transform과 곱해지므로
        // 초기값은 transform 인라인 스타일로만 지정한다.
        style={{ transform: "scaleX(0)" }}
        className="h-full w-full origin-left rounded-r-full bg-linear-to-r from-[#7cc4ff] via-[#3182f6] to-[#1b64da] shadow-[0_0_8px_rgba(49,130,246,0.45)] will-change-transform"
      />
    </div>
  );
}
