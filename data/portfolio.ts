// 포트폴리오 화면·메타데이터·구조화 데이터(JSON-LD)·llms.txt가 모두 이 파일을 단일 출처로 사용한다.

export const profile = {
  name: "정지혁",
  englishName: "Jihyuk Jung",
  jobTitle: "풀스택 개발자",
  headline: "웹·모바일·백엔드·Cloud를 연결해 실제 사용자가 있는 서비스를 만듭니다.",
  email: "jihyukboin@gmail.com",
  githubUrl: "https://github.com/jihyukboin",
  image: "/images/jihyuk.webp",
  education: [
    { name: "가톨릭대학교", detail: "컴퓨터정보공학 · 졸업", emoji: "🏫" },
    { name: "삼성 청년 SW·AI 아카데미(SSAFY)", detail: "16기 · 이수 중", emoji: "🎓" },
  ],
} as const;

export type ProjectLink = {
  href: string;
  icon?: "appStore" | "googlePlay" | "web";
  label: string;
};

export type Project = {
  /** 한 문장 요약: 어떤 문제를 해결하는 어떤 서비스인지 */
  description: string;
  /** 기여한 부분: 무엇을 구현·설계했는지 */
  details: string[];
  icon: string;
  links: ProjectLink[];
  /** 더보기 버튼 링크. 없으면 웹 → App Store → Google Play 순으로 links에서 고른다. */
  moreHref?: string;
  /** 시작 연월(YYYY.MM). 종료일이 없으면 현재 운영 중으로 표시한다. */
  startedOn: string;
  endedOn?: string;
  /** 대표 프로젝트: 최신순 정렬과 무관하게 맨 위에 둔다. */
  featured?: boolean;
  /** 역할: 맡은 업무 범위 (기술 스택은 technologies에 둔다) */
  role: string;
  /**
   * 사용 기술: 프로젝트의 핵심 스택만 적는다(라이브러리·개념·버전 제외, 최대 10개).
   * 순서 규칙: 웹 클라이언트 → 모바일 → 서버 → 실시간 → DB/캐시 → 인프라·클라우드 → AI·자동화
   * 표기 규칙: React Native는 "React Native (Expo)", 클라우드 세부 서비스는 괄호 안에 "·"로 묶는다.
   */
  technologies: string[];
  title: string;
};

export const cumulativeUsersText = "3,096명";

export const projects: Project[] = [
  {
    title: "임고봇",
    featured: true,
    icon: "/images/project-icons/imgobot.webp",
    description: `초등교사 임용시험 수험생을 위한 AI 학습 플랫폼 "임고봇"(임용고시를 돕는 AI Bot)입니다. 기존 학습 도구는 개인 학습 데이터가 저장되지 않아 개인화 서비스를 제공하지 못한다는 문제를 발견하고, 업로드한 자료로 개인화 퀴즈를 만들고 풀이 이력을 관리하는 웹·앱 서비스로 출시했습니다. 현재 누적 ${cumulativeUsersText}이 이용하고 있습니다.`,
    links: [
      { label: "웹 서비스", href: "https://imgobot.com", icon: "web" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.imgobot.app",
        icon: "googlePlay",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/kr/app/%EC%9E%84%EA%B3%A0%EB%B4%87-%EC%B4%88%EB%93%B1-%EC%A4%91%EB%93%B1-%ED%8A%B9%EC%88%98-%EC%9E%84%EC%9A%A9%EA%B3%A0%EC%8B%9C-%ED%94%8C%EB%9E%AB%ED%8F%BC/id6754582450",
        icon: "appStore",
      },
    ],
    startedOn: "2024.08",
    role: "서비스 기획, 웹·iOS/Android 앱·백엔드 개발, 클라우드 인프라 구축 및 운영",
    details: [
      "PDF/HWP 업로드 자료를 S3에 저장하고, 문서 파싱 후 개인화 퀴즈를 생성하는 학습 파이프라인 구현",
      "원문·파싱 결과·생성 문제·풀이 이력을 MySQL에 분리 저장해 오류 구간을 추적할 수 있도록 설계",
      "AI 유사도 채점, Cognito 인증, CloudFront·SES·Elastic Beanstalk 배포를 서비스 흐름으로 연결",
      "Playwright로 교육청 공고와 첨부파일 수집을 자동화해 콘텐츠 확보 시간 단축",
    ],
    technologies: ["MySQL", "AWS (S3·CloudFront·Cognito·SES·Elastic Beanstalk)", "Playwright"],
  },
  {
    title: "쉬었음닷컴",
    icon: "/images/project-icons/rested.svg",
    description:
      "개발자 스터디의 일정·공동 문서·코드 작성과 실행을 한 작업공간에 연결한 협업 플랫폼입니다. 웹과 iOS·Android 앱, 백엔드와 실시간 협업 서버를 함께 설계·구현했습니다.",
    links: [{ label: "웹 서비스", href: "https://쉬었음.com", icon: "web" }],
    startedOn: "2026.07",
    role: "서비스 기획, 웹·웹뷰·iOS/Android 앱 개발, 백엔드 API·실시간 협업 서버 개발, 클라우드 운영",
    details: [
      "Next.js App Router에서 일반 웹과 앱 WebView를 독립 레이아웃으로 분리하고, 스터디 작업공간·커뮤니티·투두·폼 빌더·관리자 화면을 반응형으로 구현",
      "Milkdown·CodeMirror 편집기를 Yjs·Hocuspocus WebSocket 서버와 연결하고, 서명된 협업 티켓·Markdown 변환·Spring API 스냅샷 저장 및 GitHub 저장소 동기화 구현",
      "Spring Boot 기반으로 스터디 생성·초대·권한·그룹장 위임, 문서·소스코드, 투두 정렬, 동적 폼·제출, 관리자 API를 도메인별 트랜잭션과 권한 검증으로 설계",
      "Google·Apple·GitHub OAuth와 웹/모바일 세션 교환을 구성하고, 대화 이력을 보존하는 AI 일정 에이전트와 Java·Python 격리 실행·결과 이력 파이프라인 구현",
      "Expo Router 기반 네이티브 탭·스택과 WebView 화면을 결합하고, 네이티브 투두·날짜 선택·진행률, PKCE·SecureStore 세션, 매일 알림, AdMob·Pangle 미디에이션 및 iOS ATT 적용",
      "PostgreSQL 스키마를 Flyway로 이력 관리하고 JPA·QueryDSL·Redis 세션을 구성했으며, AWS ECS·ECR 배포와 네트워크·CPU·메모리를 제한한 OCI gVisor 코드 실행 환경 운영",
    ],
    technologies: ["Next.js", "TypeScript", "React Native (Expo)", "Spring Boot", "Yjs", "PostgreSQL", "Redis", "AWS (ECS·ECR)", "OCI", "Upstage AI"],
  },
  {
    title: "살래말래 - 스마트 자산관리 앱",
    icon: "/images/project-icons/fintrendbeacon.webp",
    description:
      "투자 내역과 일상 지출을 한 곳에서 기록·분석하는 금융 서비스입니다. AI가 자연어 입력을 거래 기록으로 정리하되, 사용자 승인 후에만 반영되도록 설계했습니다.",
    links: [
      { label: "웹 서비스", href: "https://fintrendbeacon.com", icon: "web" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.imgobot.stocknote",
        icon: "googlePlay",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/kr/app/%EC%82%B4%EB%9E%98%EB%A7%90%EB%9E%98-%EC%A3%BC%EC%8B%9D-%EB%A7%A4%EB%A7%A4%EC%9D%BC%EC%A7%80-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0/id6755510192",
        icon: "appStore",
      },
    ],
    startedOn: "2025.10",
    role: "iOS/Android 앱·API 서버 개발, 금융 데이터 연동, AI 기능 설계, 클라우드 운영",
    details: [
      "자산 포트폴리오, 매매일지, 월별 지출 캘린더, 종목 검색·시세·공시 조회 기능 구현",
      "AI CFO가 자연어 입력을 구조화하되 사용자 승인 후에만 거래·분개 테이블에 반영되도록 설계",
      "국내·미국 주식·암호화폐 데이터, OpenAI 이미지 인식·종목 요약, LLM 호출 이력을 운영",
      "거래·분개·호출 이력을 나눠 저장해 입력 원문과 변환 결과를 함께 추적",
    ],
    technologies: ["React Native (Expo)", "Next.js", "MySQL", "OpenAI API"],
  },
  {
    title: "리뷰인코리아",
    icon: "/images/project-icons/reviewinkorea.webp",
    description:
      "방한 여행자를 위한 19개 언어 여행 리뷰 플랫폼입니다. 다국어 검색 노출 구조와 콘텐츠·배포 운영 환경을 구현했습니다.",
    links: [{ label: "웹 서비스", href: "https://reviewinkorea.com", icon: "web" }],
    startedOn: "2026.03",
    role: "다국어 웹 서비스 개발, 검색 엔진 최적화(SEO) 설계, 배포 인프라·콘텐츠 배치 운영",
    details: [
      "검색, 댓글·대댓글, 좋아요, 여행 가이드, 지도·날씨·주변 맛집, 피드백 기능 구현",
      "canonical·hreflang·sitemap·JSON-LD를 정리해 19개 언어의 검색 노출 구조 설계",
      "Docker·Caddy·Cloudflare·R2 CDN·OCI/AWS 기반 배포 및 자동 콘텐츠 수집·번역 배치 운영",
    ],
    technologies: ["Next.js", "MySQL", "Docker", "Cloudflare (R2)", "OCI", "AWS"],
  },
  {
    title: "내일할까 - 게으름뱅이 플래너",
    moreHref:
      "https://apps.apple.com/kr/app/%EB%82%B4%EC%9D%BC%ED%95%A0%EA%B9%8C-%EA%B2%8C%EC%9C%BC%EB%A6%84%EB%B1%85%EC%9D%B4-%ED%94%8C%EB%9E%98%EB%84%88/id6777882500",
    icon: "/images/project-icons/maybe-tomorrow.webp",
    description: "Today·Tomorrow·All Tasks 흐름으로 업무를 관리하는 SwiftUI iOS 플래너입니다. 홈 화면 위젯에서 바로 완료 처리할 수 있습니다.",
    links: [
      { label: "웹 서비스", href: "https://trendswhat.com/maybe-tomorrow", icon: "web" },
      {
        label: "App Store",
        href: "https://apps.apple.com/kr/app/%EB%82%B4%EC%9D%BC%ED%95%A0%EA%B9%8C-%EA%B2%8C%EC%9C%BC%EB%A6%84%EB%B1%85%EC%9D%B4-%ED%94%8C%EB%9E%98%EB%84%88/id6777882500",
        icon: "appStore",
      },
    ],
    startedOn: "2026.05",
    role: "iOS 앱 설계·개발, 로컬 데이터·서버 동기화 구현, 위젯 개발",
    details: [
      "프로젝트별 업무·담당자·완료율과 위젯 완료 처리 기능 구현",
      "App Group SQLite와 Firebase Auth 토큰 기반 백엔드 동기화 구현",
      "Outbox queue와 retry/backoff, 계정별 데이터 분리 설계",
    ],
    technologies: ["SwiftUI", "WidgetKit", "SQLite", "Firebase Auth"],
  },
  {
    title: "샌드 - 나만의 AI 퀴즈앱",
    icon: "/images/project-icons/send.png",
    description:
      "Android·iOS에서 사용할 수 있는 대화형 퀴즈 메이커입니다. 사용자 생성 퀴즈의 편집·풀이·학습 이력을 제공합니다.",
    links: [
      { label: "웹 서비스", href: "https://sendquiz.net", icon: "web" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.send.quiz",
        icon: "googlePlay",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/kr/app/%EC%83%8C%EB%93%9C-%ED%80%B4%EC%A6%88%EB%A5%BC-%EB%B3%B4%EB%82%B4%EB%8B%A4/id6758034904",
        icon: "appStore",
      },
    ],
    startedOn: "2026.01",
    role: "iOS/Android 앱·API 서버 개발, 인증·계정 시스템 구현, 배포 및 운영",
    details: [
      "사용자 생성 퀴즈, 대화형 학습·편집·풀이, 진행률·오답·채팅 로그 데이터 모델 구성",
      "로그인 전 AsyncStorage와 로그인 후 JWT 기반의 상태 전환 설계",
      "이메일 인증·비밀번호 재설정, Google·Apple OAuth, 탈퇴·피드백·약관 흐름 구현",
    ],
    technologies: ["React Native (Expo)", "Next.js", "MySQL", "OCI"],
  },
  {
    title: "트렌드왓 - 글로벌 트렌드 모아보기",
    icon: "/images/project-icons/trendswhat.webp",
    description:
      "Google Trends 기반 키워드 수집부터 기사 생성·이미지 변환·발행까지 자동화한 콘텐츠 서비스입니다.",
    links: [{ label: "웹 서비스", href: "https://trendswhat.com", icon: "web" }],
    startedOn: "2026.06",
    role: "콘텐츠 자동화 파이프라인 설계·개발, 웹 서비스 개발, 스토리지·배포 운영",
    details: [
      "키워드 수집, 기사 생성, 이미지 변환, R2 업로드, MySQL 저장, sitemap 반영을 자동화",
      "잠금·트랜잭션·스키마 제약·URL 검증으로 중복 발행과 미공개 데이터 노출 방지",
      "SSR 공개 화면과 운영 자동화 워커를 분리해 책임 경계 구성",
    ],
    technologies: ["Next.js", "MySQL", "Cloudflare (R2)"],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
  summary: string;
};

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    summary: "SSR·다국어(i18n)·SEO 메타데이터를 갖춘 반응형 웹 서비스를 개발합니다.",
  },
  {
    category: "Mobile",
    items: ["SwiftUI", "WidgetKit", "React Native (Expo)"],
    summary: "iOS·Android 앱을 출시·운영하며, 위젯·로컬 DB 동기화·인증 기반 백엔드 연동을 구현합니다.",
  },
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "Node.js", "Next.js API Routes", "JPA", "QueryDSL"],
    summary: "REST API, 인증·세션(OAuth), 파일 업로드, 배치 작업, 실시간 협업 서버를 구현합니다.",
  },
  {
    category: "Database",
    items: ["MySQL", "PostgreSQL", "Redis", "SQLite", "Flyway"],
    summary: "스키마 설계, 트랜잭션, 이력 추적, 마이그레이션 검증을 수행합니다.",
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "OCI", "Docker", "Caddy", "Cloudflare (R2)", "GitHub Actions"],
    summary: "S3·CloudFront·Cognito·SES·Elastic Beanstalk·ECS 기반 서비스를 배포하고 운영합니다.",
  },
  {
    category: "AI & Automation",
    items: ["OpenAI API", "Upstage AI", "Playwright"],
    summary: "문서 파싱, AI 유사도 채점, 자연어 입력 구조화, 브라우저 자동화를 서비스에 적용합니다.",
  },
];

export type Credential = {
  name: string;
  issuer: string;
  /** 화면 표시용(YYYY.MM.DD) */
  date: string;
  /** <time dateTime>·JSON-LD용(YYYY-MM-DD) */
  dateTime: string;
  registrationNumber: string;
  result?: string;
};

export const certifications: Credential[] = [
  {
    name: "AWS Certified Security - Specialty",
    issuer: "Amazon Web Services",
    date: "2026.09.26",
    dateTime: "2026-09-26",
    registrationNumber: "57bfe1330cac42ffb3444b4d55a900a4",
  },
  {
    name: "AWS Certified Generative AI Developer - Professional",
    issuer: "Amazon Web Services",
    date: "2026.09.19",
    dateTime: "2026-09-19",
    registrationNumber: "dd745a74b5484b81bff3962b4ee7cfd2",
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2026.03.25",
    dateTime: "2026-03-25",
    registrationNumber: "b2bb8b18ba6746f0bae1b17a9f8d210c",
  },
  {
    name: "SQL 개발자 (SQLD)",
    issuer: "한국데이터산업진흥원",
    date: "2025.09.19",
    dateTime: "2025-09-19",
    registrationNumber: "SQLD-058015681",
  },
];

export const languageTests: Credential[] = [
  {
    name: "TOEIC Speaking Test",
    issuer: "ETS",
    date: "2026.09.14",
    dateTime: "2026-09-14",
    registrationNumber: "409119-1810001701",
    result: "Intermediate High (140점)",
  },
];
