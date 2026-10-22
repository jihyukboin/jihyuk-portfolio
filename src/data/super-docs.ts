export const superDocs = {
  name: "Super Docs",
  title: "Super Docs - Mac용 무료 HWP·HWPX·DOCX 문서 편집기",
  description:
    "Mac에서 HWP·HWPX·DOCX 문서를 열고, 편집하고, 저장하세요. Super Docs는 오프라인으로 사용할 수 있는 무료 오픈소스 문서 편집기입니다. Apple Silicon Mac · macOS 14 이상 지원.",
  repositoryUrl: "https://github.com/jihyukboin/super-docs",
  downloadUrl: "https://github.com/jihyukboin/super-docs/releases/latest",
  issuesUrl: "https://github.com/jihyukboin/super-docs/issues",
} as const;

export const formats = [
  {
    name: "HWP",
    title: "Mac에서도 한글 문서를 자연스럽게",
    description:
      "HWP 문서의 본문, 표, 글자 서식을 편집하세요. 작업한 문서는 HWP 또는 HWPX 형식으로 저장할 수 있습니다.",
    savesAs: "HWP 또는 HWPX",
    filename: "업무 보고서.hwp",
  },
  {
    name: "HWPX",
    title: "새 문서부터 한글 문서 작업까지",
    description:
      "새 문서는 HWPX 형식으로 시작합니다. 기존 HWPX 문서도 열고 편집한 뒤, HWPX 또는 HWP 형식으로 저장할 수 있습니다.",
    savesAs: "HWPX 또는 HWP",
    filename: "프로젝트 기획서.hwpx",
  },
  {
    name: "DOCX",
    title: "Word 문서도 같은 앱에서",
    description:
      "DOCX 문서의 기본 본문, 글자 서식과 표를 편집하세요. 편집한 Word 문서는 DOCX 형식으로 저장합니다.",
    savesAs: "DOCX",
    filename: "회의록.docx",
  },
] as const;

export const faqs = [
  {
    question: "Super Docs는 어떤 앱인가요?",
    answer:
      "Super Docs는 Mac에서 HWP·HWPX·DOCX 문서를 열고, 편집하고, 저장하는 무료 오픈소스 문서 편집기입니다. MIT 라이선스로 소스 코드를 공개합니다.",
  },
  {
    question: "어떤 Mac에서 사용할 수 있나요?",
    answer:
      "Apple Silicon 칩(M1 이상)을 탑재한 Mac과 macOS 14 이상이 필요합니다.",
  },
  {
    question: "인터넷 없이 문서를 편집할 수 있나요?",
    answer:
      "네. 문서를 열고 편집하고 저장하는 데 인터넷 연결이 필요하지 않습니다. 앱 다운로드와 업데이트 확인·다운로드에는 인터넷 연결이 필요합니다.",
  },
  {
    question: "HWP와 HWPX 사이에서 변환할 수 있나요?",
    answer:
      "네. ‘다른 이름으로 저장’에서 HWP 또는 HWPX를 선택할 수 있습니다. DOCX 문서는 DOCX로 저장합니다. 새 문서는 HWPX로 시작합니다.",
  },
  {
    question: "문서 호환성에 제한이 있나요?",
    answer:
      "복잡한 문서의 배치·글꼴·일부 개체는 한컴 앱이나 Microsoft Word와 다르게 표시될 수 있습니다. DOCX의 변경 내용 추적과 메모 편집, 암호 문서의 저장은 지원하지 않습니다. 중요한 문서는 원본을 보관하고 복사본으로 작업해 주세요.",
  },
] as const;

export const navigationLinks = [
  { label: "주요 기능", href: "#features" },
  { label: "지원 형식", href: "#formats" },
  { label: "설치 방법", href: "#install" },
  { label: "자주 묻는 질문", href: "#faq" },
] as const;
