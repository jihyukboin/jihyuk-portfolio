import {
  certifications,
  getProjectPrimaryLink,
  languageTests,
  portfolioDescription,
  portfolioTitle,
  profile,
  skills,
  sortedProjects
} from '@/lib/portfolio';
import { siteUrl } from '@/lib/site';

/**
 * 검색 엔진·AI 답변 엔진이 인물·경력·프로젝트를 구조적으로 이해하도록 schema.org JSON-LD를 출력한다.
 * 화면에 보이는 내용과 같은 데이터(src/lib/portfolio.ts)만 사용한다.
 */
export function PortfolioStructuredData() {
  const personId = `${siteUrl}/#person`;

  const graph = [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: siteUrl,
      name: portfolioTitle,
      description: portfolioDescription,
      inLanguage: 'ko-KR',
      mainEntity: { '@id': personId }
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      alternateName: profile.englishName,
      jobTitle: profile.jobTitle,
      description: profile.headline,
      image: `${siteUrl}${profile.image}`,
      email: `mailto:${profile.email}`,
      url: siteUrl,
      sameAs: [profile.githubUrl],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: profile.education[1].name
      },
      knowsAbout: skills.flatMap((group) => group.items),
      knowsLanguage: ['ko', 'en'],
      hasCredential: [...certifications, ...languageTests].map(
        (credential) => ({
          '@type': 'EducationalOccupationalCredential',
          name: credential.name,
          credentialCategory: 'certification',
          dateCreated: credential.dateTime,
          recognizedBy: { '@type': 'Organization', name: credential.issuer }
        })
      )
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#projects`,
      name: `${profile.name} 프로젝트`,
      itemListElement: sortedProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: getProjectPrimaryLink(project),
          dateCreated: project.startedOn.replace('.', '-'),
          creator: { '@id': personId },
          keywords: project.technologies.join(', ')
        }
      }))
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph
        }).replace(/</g, '\\u003c')
      }}
    />
  );
}
