import { blueCtaClass } from '@/components/button-styles';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteOwner } from '@/lib/site';

type SiteHeaderProps = {
  navigation: ReactNode;
  mobileMenu: ReactNode;
};

// 사이트 공통 외형. 각 페이지의 탐색 UI는 서버 컴포넌트에서 조합한다.
export function SiteHeader({ navigation, mobileMenu }: SiteHeaderProps) {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-[2147483645] h-auto min-h-(--site-header-height) w-full bg-white/85 font-bold shadow-none backdrop-blur-[8px] [font-synthesis:auto]"
    >
      {/* 가운데 열을 메인 article(max-w-(--site-content-width), mx-auto)과 같은 폭·위치로 맞춘다. */}
      <div className="relative box-border flex min-h-(--site-header-height) w-full items-center justify-between px-4 min-[840px]:grid min-[840px]:grid-cols-[minmax(7rem,1fr)_minmax(0,var(--site-content-width))_minmax(7rem,1fr)]">
        <div className="mr-auto inline-flex min-w-0 items-center min-[840px]:mr-0 min-[840px]:w-28 min-[840px]:min-w-28">
          <Link
            href="/"
            aria-label={`${siteOwner.name} 포트폴리오 홈으로 이동`}
            className="inline-flex min-h-9 w-full items-center gap-2 whitespace-nowrap text-[#191f28] no-underline transition-colors focus-visible:outline-none"
          >
            <Image
              src={siteOwner.image}
              alt=""
              width={32}
              height={32}
              sizes="32px"
              loading="eager"
              className="h-8 w-8 shrink-0 rounded-full object-cover object-top"
            />
            <span className="inline-flex min-w-0 items-end gap-1 whitespace-nowrap leading-none">
              <span className="text-lg font-bold leading-none tracking-normal">
                {siteOwner.name}
              </span>
            </span>
          </Link>
        </div>

        <div className="hidden min-w-0 min-[840px]:flex min-[840px]:h-(--site-header-height) min-[840px]:w-full min-[840px]:self-stretch">
          {navigation}
        </div>

        <a
          href={siteOwner.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${blueCtaClass} min-h-8 whitespace-nowrap px-3 py-1.5 text-sm leading-4 max-[839px]:hidden min-[840px]:justify-self-end`}
        >
          GitHub
        </a>

        {mobileMenu}
      </div>
    </header>
  );
}
