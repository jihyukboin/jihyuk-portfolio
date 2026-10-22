import type { Metadata } from "next";

const title = "Super Docs - Free HWP, HWPX & DOCX Editor for macOS";
const description =
  "Mac에서 HWP·HWPX·DOCX 문서를 열고, 편집하고, 저장하세요. Super Docs는 오프라인으로 사용할 수 있는 무료 오픈소스 macOS 문서 편집기입니다. Apple Silicon Mac · macOS 14 이상 지원.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  applicationName: "Super Docs",
  alternates: { canonical: "/super-docs" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/super-docs",
    siteName: "Super Docs",
    title,
    description,
    images: [{ url: "/super-docs/app-icon.png", alt: "Super Docs 앱 아이콘" }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [{ url: "/super-docs/app-icon.png", alt: "Super Docs 앱 아이콘" }],
  },
  icons: {
    icon: {
      url: "/super-docs/favicon.ico",
      type: "image/x-icon",
      sizes: "16x16 32x32 48x48 256x256",
    },
  },
};

export default function SuperDocsPage() {
  return null;
}
