import type { ReactNode } from 'react';
import { PortfolioHeader } from '@/components/portfolio/portfolio-header';
import { ChatComposer } from './_components/chat/chat-composer';
import '../fonts/pretendard/1.3.9/pretendard.css';

export default function HomeLayout({ children }: { children: ReactNode }) {
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
