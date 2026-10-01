import { profile } from "@/data/portfolio";

// 배포 환경에서는 GitHub Actions가 NEXT_PUBLIC_SITE_URL을 주입한다. 로컬 개발 시에는 dev 서버 주소를 쓴다.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007").replace(/\/+$/, "");

export const siteTitle = `${profile.name} | ${profile.jobTitle} 포트폴리오`;
export const siteDescription = `${profile.jobTitle} ${profile.name}의 포트폴리오입니다. ${profile.headline} 누적 사용자 3천 명 이상의 학습 플랫폼 임고봇 등 직접 기획·개발·운영한 서비스를 소개합니다.`;
