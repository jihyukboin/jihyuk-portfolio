'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navigationLinks } from '@/lib/super-docs';

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const glassSurface =
    scrolled || menuOpen
      ? 'bg-neutral-950/55 ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150'
      : 'bg-transparent';

  return (
    <header ref={header} className="h-17 shrink-0">
      <a
        href="#super-docs-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-900"
      >
        본문 바로가기
      </a>
      <Link
        href="/"
        aria-label="포트폴리오 홈"
        title="포트폴리오 홈"
        className={`fixed left-3 top-3 z-50 sm:left-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-neutral-300 transition-all duration-300 hover:text-neutral-100 active:scale-95 ${glassSurface}`}
      >
        <Home size={22} strokeWidth={1.75} aria-hidden="true" />
      </Link>
      <div className="fixed left-20 right-3 top-3 z-50 mx-auto max-w-5xl sm:left-[84px] sm:right-4 xl:inset-x-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            aria-label="Super Docs 메뉴"
            className={`relative flex h-14 min-w-0 flex-1 items-center justify-between rounded-full px-3 sm:px-4 transition-all duration-300 ${glassSurface}`}
          >
            <a
              href="/super-docs"
              aria-label="Super Docs 홈"
              className="flex shrink-0 items-center rounded-full"
            >
              <Image
                src="/super-docs/app-icon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="ml-2 text-base sm:text-lg text-neutral-100">
                Super Docs
              </span>
            </a>
            <ul className="hidden items-center gap-1 md:flex">
              {navigationLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block rounded-full px-3.5 py-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:bg-white/5 hover:text-neutral-100"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              ref={menuButton}
              type="button"
              className="rounded-full p-2 text-neutral-300 transition-colors duration-200 hover:bg-white/5 md:hidden"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              aria-controls="super-docs-mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d={
                    menuOpen
                      ? 'M6 6l12 12M6 18L18 6'
                      : 'M3 6h18M3 12h18M3 18h18'
                  }
                />
              </svg>
            </button>
          </nav>
        </div>
        <nav
          id="super-docs-mobile-menu"
          aria-label="Super Docs 모바일 메뉴"
          hidden={!menuOpen}
          className="mt-2 rounded-3xl bg-neutral-950/70 ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150 p-3 md:hidden"
        >
          <ul>
            {navigationLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-neutral-300 hover:bg-white/5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
