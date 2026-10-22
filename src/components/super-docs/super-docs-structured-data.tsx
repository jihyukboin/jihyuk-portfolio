import { siteUrl } from "@/lib/site";
import { faqs, superDocs } from "@/data/super-docs";

export function SuperDocsStructuredData() {
  const url = `${siteUrl}/super-docs`;
  const applicationId = `${url}#application`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: superDocs.title,
        description: superDocs.description,
        inLanguage: "ko-KR",
        mainEntity: { "@id": applicationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": applicationId,
        name: superDocs.name,
        url,
        description: superDocs.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "macOS 14 or later",
        processorRequirements: "Apple Silicon (M1 or later)",
        image: `${siteUrl}/super-docs/app-icon.png`,
        downloadUrl: superDocs.downloadUrl,
        releaseNotes: superDocs.downloadUrl,
        license: `${superDocs.repositoryUrl}/blob/main/LICENSE`,
        sameAs: [superDocs.repositoryUrl],
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        featureList: [
          "HWP·HWPX·DOCX 열람·편집·저장",
          "오프라인 문서 편집",
          "본문·표·글자 서식 편집",
          "HWP·HWPX 간 저장 형식 변환",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "ko-KR",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
