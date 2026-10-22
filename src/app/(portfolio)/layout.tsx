import type { ReactNode } from "react";
import { PortfolioFooter } from "@/components/portfolio/portfolio-footer";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <PortfolioHeader />
      <main className="w-full flex-1">{children}</main>
      <PortfolioFooter />
    </div>
  );
}
