import { certifications, cumulativeUsersText, languageTests, profile, skills } from "@/data/portfolio";
import { formatPeriod, primaryLinkOf, sortedProjects } from "@/components/portfolio/project-anchors";
import { siteDescription, siteUrl } from "@/lib/site";

// llms.txt (https://llmstxt.org): AI 검색·답변 엔진(GEO/AEO)이 포트폴리오 내용을 정확히 인용하도록 제공하는 요약본.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${profile.name} (${profile.englishName}) - ${profile.jobTitle} 포트폴리오`,
    "",
    `> ${siteDescription}`,
    "",
    "## 프로필",
    "",
    `- 이름: ${profile.name} (${profile.englishName})`,
    `- 직무: ${profile.jobTitle}`,
    ...profile.education.map((item) => `- 학력·교육: ${item.name} ${item.detail}`),
    `- 이메일: ${profile.email}`,
    `- GitHub: ${profile.githubUrl}`,
    `- 포트폴리오: ${siteUrl}`,
    `- 대표 성과: 학습 플랫폼 임고봇 누적 사용자 ${cumulativeUsersText}`,
    "",
    "## 기술",
    "",
    ...skills.map((group) => `- ${group.category}: ${group.items.join(", ")} — ${group.summary}`),
    "",
    "## 프로젝트",
    "",
    ...sortedProjects.flatMap((project) => {
      const link = primaryLinkOf(project);
      return [
        `### ${project.title} (${formatPeriod(project)})`,
        "",
        project.description,
        "",
        `- 역할: ${project.role}`,
        `- 사용 기술: ${project.technologies.join(", ")}`,
        ...(link ? [`- 링크: ${link}`] : []),
        "- 기여한 부분:",
        ...project.details.map((detail) => `  - ${detail}`),
        "",
      ];
    }),
    "## 자격증",
    "",
    ...certifications.map((item) => `- ${item.name} (${item.issuer}, ${item.date} 취득)`),
    "",
    "## 어학",
    "",
    ...languageTests.map((item) => `- ${item.name}: ${item.result} (${item.issuer}, ${item.date} 응시)`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
