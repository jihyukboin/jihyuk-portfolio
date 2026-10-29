import type { ReactNode } from 'react';
import { PortfolioHeader } from '@/components/portfolio/portfolio-header';
import { ChatComposer } from '@/components/portfolio/chat-composer';

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <PortfolioHeader />
      <main className="w-full flex-1 pb-[100px]">
        {children}
        <ChatComposer />
      </main>
    </div>
  );
}
