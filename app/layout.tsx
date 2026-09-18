import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "포트폴리오 - 정지혁",
  description: "정지혁의 포트폴리오 페이지입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ko" className="h-full antialiased">
      <body>{children}</body>
      {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
    </html>
  );
}
