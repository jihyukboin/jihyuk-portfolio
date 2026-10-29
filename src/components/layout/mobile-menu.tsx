'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

// 콘텐츠는 서버에서 children으로 전달하고 열기·닫기와 포커스만 브라우저에서 처리한다.
export function MobileMenu({ children }: { children: ReactNode }) {
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 840px)');
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    mediaQuery.addEventListener('change', closeAtDesktop);
    return () => mediaQuery.removeEventListener('change', closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const button = buttonRef.current;
    const closeOnLinkClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a'))
        setOpen(false);
    };
    panel?.addEventListener('click', closeOnLinkClick);

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const links = panel.querySelectorAll<HTMLAnchorElement>('a[href]');
      const first = links[0];
      const last = links[links.length - 1];
      if (!first) {
        event.preventDefault();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    panel?.focus();

    return () => {
      panel?.removeEventListener('click', closeOnLinkClick);
      button?.focus({ preventScroll: true });
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="inline-flex min-w-0 items-center justify-end min-[840px]:hidden">
      <button
        type="button"
        ref={buttonRef}
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        aria-label={open ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-[#4e5968] transition-colors hover:bg-[#f2f4f6] hover:text-[#191f28] focus-visible:bg-[#f2f4f6] focus-visible:text-[#191f28] focus-visible:outline-none"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-[22px]" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>

      {/* backdrop-filter가 있는 헤더의 좌표계 밖에서 화면 전체를 덮는다. */}
      {open &&
        createPortal(
          <>
            <button
              type="button"
              aria-label="모바일 메뉴 닫기"
              onClick={closeMenu}
              className="fixed inset-x-0 bottom-0 top-(--site-header-height) z-[2147483646] cursor-default border-0 bg-black/20"
            />
            <div
              ref={panelRef}
              id={menuId}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label="모바일 메뉴"
              className="fixed inset-x-0 top-(--site-header-height) z-[2147483647] max-h-[calc(100dvh-var(--site-header-height))] overflow-y-auto overscroll-contain border-t border-[#e5e8eb] bg-white px-4 pb-6 text-[#191f28] shadow-[0_8px_24px_rgba(0,0,0,0.08)] [-webkit-overflow-scrolling:touch]"
            >
              {children}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
