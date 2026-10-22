import { certifications, cumulativeUsersText, languageTests, profile, skills } from "@/data/portfolio";
import { formatProjectPeriod, getProjectPrimaryLink, portfolioDescription, sortedProjects } from "@/lib/portfolio";
import { siteUrl } from "@/lib/site";
import { superDocs } from "@/data/super-docs";

// llms.txt (https://llmstxt.org): AI 검색·답변 엔진(GEO/AEO)이 포트폴리오 내용을 정확히 인용하도록 제공하는 요약본.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${profile.name} (${profile.englishName}) - ${profile.jobTitle} 포트폴리오`,
    "",
    `> ${portfolioDescription}`,
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
      const link = getProjectPrimaryLink(project);
      return [
        `### ${project.title} (${formatProjectPeriod(project)})`,
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
    "## Super Docs",
    "",
    superDocs.description,
    "",
    `- 제품 소개: ${siteUrl}/super-docs`,
    `- 다운로드: ${superDocs.downloadUrl}`,
    `- 소스 코드: ${superDocs.repositoryUrl}`,
    "- 지원 환경: Apple Silicon Mac (M1 이상), macOS 14 이상",
    "- 저장 형식: HWP·HWPX 간 변환 가능, DOCX는 DOCX로 저장",
    "- 라이선스: MIT, 무료 오픈소스",
    "",
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
