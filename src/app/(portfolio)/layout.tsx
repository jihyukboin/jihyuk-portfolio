import type { ReactNode } from 'react';
import { PortfolioHeader } from '@/components/portfolio/portfolio-header';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <PortfolioHeader />
      <main className="w-full flex-1 pb-[100px]">{children}</main>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex h-[100px] items-center justify-center px-5">
        <input
          aria-label="채팅 메시지"
          className="pointer-events-auto min-h-14 w-full py-3 max-w-[800px] rounded-full border border-[#e5e8eb] bg-white px-6 text-base text-[#333d4b] shadow-[0_4px_20px_rgba(0,0,0,0.06)] outline-none"
          type="text"
        />
      </div>
    </div>
  );
}
