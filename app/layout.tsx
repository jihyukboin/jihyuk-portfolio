import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { profile, skills } from "@/data/portfolio";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name} 포트폴리오`,
  },
  description: siteDescription,
  applicationName: `${profile.name} 포트폴리오`,
  authors: [{ name: profile.name, url: profile.githubUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    profile.englishName,
    profile.jobTitle,
    "개발자 포트폴리오",
    "임고봇",
    ...skills.flatMap((group) => group.items),
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "ko_KR",
    url: "/",
    siteName: `${profile.name} 포트폴리오`,
    title: siteTitle,
    description: siteDescription,
    firstName: "지혁",
    lastName: "정",
    username: "jihyukboin",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
