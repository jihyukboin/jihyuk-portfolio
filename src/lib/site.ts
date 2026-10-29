import { siteOwner } from '@/data/site';

// 배포 환경에서는 GitHub Actions가 NEXT_PUBLIC_SITE_URL을 주입한다. 로컬 개발 시에는 dev 서버 주소를 쓴다.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3007'
).replace(/\/+$/, '');

export const siteName = `${siteOwner.name} 포트폴리오`;
