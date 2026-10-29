import 'server-only';
import { profile, projects, type Project } from '@/data/portfolio';

export const portfolioTitle = `${profile.name} | ${profile.jobTitle} 포트폴리오`;
export const portfolioDescription = `${profile.jobTitle} ${profile.name}의 포트폴리오입니다. ${profile.headline} 누적 사용자 3천 명 이상의 학습 플랫폼 임고봇 등 직접 기획·개발·운영한 서비스를 소개합니다.`;

export const portfolioOpenGraphImage = {
  url: '/opengraph-image',
  type: 'image/png',
  width: 1200,
  height: 630,
  alt: `${profile.name} ${profile.jobTitle} 포트폴리오`
};

// 프로젝트 섹션과 헤더 프로젝트 독(ProjectDock)이 같은 순서·같은 앵커를 쓰도록 한 곳에서 정의한다.
// 대표 프로젝트(featured)를 맨 위에 두고, 나머지는 최신 프로젝트가 먼저 오도록 시작일 내림차순으로 정렬한다.
export const sortedProjects = [...projects].sort(
  (a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    b.startedOn.localeCompare(a.startedOn)
);

export function getProjectAnchorId(project: Pick<Project, 'id'>) {
  return `project-${project.id}`;
}

export function formatProjectPeriod({ startedOn }: Pick<Project, 'startedOn'>) {
  return startedOn;
}

/** 더보기 버튼 링크: 웹 서비스가 있으면 웹, 모바일 앱만 있으면 App Store → Google Play 순 */
export function getProjectPrimaryLink(project: Project) {
  return (
    project.moreHref ??
    project.links.find((link) => link.icon === 'web')?.href ??
    project.links.find((link) => link.icon === 'appStore')?.href ??
    project.links.find((link) => link.icon === 'googlePlay')?.href
  );
}
