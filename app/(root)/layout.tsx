import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[800px] flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
