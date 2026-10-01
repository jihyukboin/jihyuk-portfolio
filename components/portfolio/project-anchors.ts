import { projects } from "@/data/portfolio";

// 프로젝트 섹션과 헤더 프로젝트 독(ProjectDock)이 같은 순서·같은 앵커를 쓰도록 한 곳에서 정의한다.
// 대표 프로젝트(featured)를 맨 위에 두고, 나머지는 최신 프로젝트가 먼저 오도록 시작일 내림차순으로 정렬한다.
export const sortedProjects = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.startedOn.localeCompare(a.startedOn),
);

export function projectAnchorId(index: number) {
  return `project-${index + 1}`;
}

export function formatPeriod({ startedOn, endedOn }: { startedOn: string; endedOn?: string }) {
  return `${startedOn} ~ ${endedOn ?? "운영 중"}`;
}

/** 더보기 버튼 링크: 웹 서비스가 있으면 웹, 모바일 앱만 있으면 App Store → Google Play 순 */
export function primaryLinkOf(project: (typeof projects)[number]) {
  return (
    project.moreHref ??
    project.links.find((link) => link.icon === "web")?.href ??
    project.links.find((link) => link.icon === "appStore")?.href ??
    project.links.find((link) => link.icon === "googlePlay")?.href
  );
}
