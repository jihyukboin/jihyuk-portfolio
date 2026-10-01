"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { profile } from "@/data/portfolio";

import type { NavigationItem } from "./navigation";

export function SiteMobileMenu({
  navigationItems,
}: {
  navigationItems: NavigationItem[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 840px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    mediaQuery.addEventListener("change", closeAtDesktop);
    return () => mediaQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="inline-flex min-w-0 items-center justify-end min-[840px]:hidden">
      <button
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-[#4e5968] transition-colors hover:bg-[#f2f4f6] hover:text-[#191f28] focus-visible:bg-[#f2f4f6] focus-visible:text-[#191f28] focus-visible:outline-none"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="모바일 메뉴 닫기"
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-[50px] z-[2147483646] cursor-default border-0 bg-black/20"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-label="모바일 메뉴"
            className="fixed inset-x-0 top-[50px] z-[2147483647] max-h-[calc(100dvh-50px)] overflow-y-auto overscroll-contain border-t border-[#e5e8eb] bg-white px-4 pb-6 text-[#191f28] shadow-[0_8px_24px_rgba(0,0,0,0.08)] [-webkit-overflow-scrolling:touch]"
          >
            <div className="flex flex-col">
              <div className="flex py-3.5">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-lg bg-[#3182f6] px-2 py-2.5 text-sm font-semibold leading-5 text-white no-underline transition-colors hover:bg-[#1b64da] focus-visible:bg-[#1b64da] focus-visible:outline-none"
                >
                  GitHub
                </a>
              </div>
              <nav aria-label="모바일 포트폴리오 탐색">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex w-full items-center border-b border-[#e5e8eb] py-3.5 text-left text-[15px] font-semibold leading-5 no-underline transition-colors hover:bg-[#f9fafb] focus-visible:bg-[#f9fafb] focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
