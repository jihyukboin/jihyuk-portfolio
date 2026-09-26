import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "포트폴리오 - 정지혁",
  description: "정지혁의 소프트웨어 엔지니어 포트폴리오입니다.",
};

type ProjectLink = {
  href: string;
  icon?: "appStore" | "googlePlay" | "web";
  label: string;
};

type Project = {
  description: string;
  details: string[];
  icon: string;
  links: ProjectLink[];
  period: string;
  role: string;
  technologies?: string;
  title: string;
};

const cumulativeUsersText = "3,000명";

const projects: Project[] = [
  {
    title: "임고봇",
    icon: "/images/project-icons/imgobot.webp",
    description: `교원 임용시험 수험생을 위한 학습 플랫폼입니다. 웹과 iOS·Android 앱을 직접 설계·운영하며 누적 이용자 ${cumulativeUsersText}을 확보했습니다.`,
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
    period: "2024.08 ~ ",
    role: "기획 · 웹 · iOS/Android · 백엔드 · MySQL · Cloud 운영",
    details: [
      "PDF/HWP 업로드 자료를 S3에 저장하고, 문서 파싱 후 개인화 퀴즈를 생성하는 학습 파이프라인 구현",
      "원문·파싱 결과·생성 문제·풀이 이력을 MySQL에 분리 저장해 오류 구간을 추적할 수 있도록 설계",
      "AI 유사도 채점, Cognito 인증, CloudFront·SES·Elastic Beanstalk 배포를 서비스 흐름으로 연결",
      "Playwright로 교육청 공고와 첨부파일 수집을 자동화해 콘텐츠 확보 시간 단축",
    ],
  },
  {
    title: "쉬었음.COM",
    icon: "/images/project-icons/rested.svg",
    description:
      "개발자 스터디의 일정·공동 문서·코드 작성과 실행을 한 작업공간에 연결한 협업 플랫폼입니다. 웹과 iOS·Android 앱, 백엔드와 실시간 협업 서버를 함께 설계·구현했습니다.",
    links: [{ label: "웹 서비스", href: "https://쉬었음.com", icon: "web" }],
    period: "2026.07 ~ ",
    role: "기획 · Next.js 웹/웹뷰 · Expo iOS/Android · Spring Boot API · 실시간 협업 · Cloud 운영",
    details: [
      "[프론트엔드] Next.js App Router에서 일반 웹과 앱 WebView를 독립 레이아웃으로 분리하고, 스터디 작업공간·커뮤니티·투두·폼 빌더·관리자 화면을 반응형으로 구현",
      "[실시간 협업] Milkdown·CodeMirror 편집기를 Yjs·Hocuspocus WebSocket 서버와 연결하고, 서명된 협업 티켓·Markdown 변환·Spring API 스냅샷 저장 및 GitHub 저장소 동기화 구현",
      "[백엔드] Java·Spring Boot 기반으로 스터디 생성·초대·권한·그룹장 위임, 문서·소스코드, 투두 정렬, 동적 폼·제출, 관리자 API를 도메인별 트랜잭션과 권한 검증으로 설계",
      "[인증·AI·코드 실행] Google·Apple·GitHub OAuth와 웹/모바일 세션 교환을 구성하고, 대화 이력을 보존하는 AI 일정 에이전트와 Java·Python 격리 실행·결과 이력 파이프라인 구현",
      "[모바일] Expo Router 기반 네이티브 탭·스택과 WebView 화면을 결합하고, 네이티브 투두 작성·날짜 선택·진행률, PKCE·SecureStore 세션, 매일 알림, AdMob·Pangle 미디에이션 및 iOS ATT 적용",
      "[데이터·운영] PostgreSQL 스키마를 Flyway로 이력 관리하고 JPA·QueryDSL, Redis 세션을 구성했으며, Docker 이미지와 AWS ECS·ECR 배포 및 네트워크·CPU·메모리를 제한한 OCI gVisor 코드 실행 환경 운영",
    ],
    technologies:
      "Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Expo SDK 57 · React Native · Spring Boot 3.5 · Java 21 · PostgreSQL · Redis · JPA · QueryDSL · Flyway · Spring Security · OAuth 2.0/OIDC · Yjs · Hocuspocus · Milkdown · CodeMirror · WebSocket · Node.js · Docker · gVisor · AWS ECS/ECR · OCI · GitHub API · Upstage AI · AdMob/Pangle",
  },
  {
    title: "살래말래 - 스마트 자산관리 앱",
    icon: "/images/project-icons/fintrendbeacon.webp",
    description:
      "투자 내역과 일상 지출을 한 곳에서 기록·분석하는 금융 서비스입니다. Expo 앱, Next.js API, MySQL 기반으로 운영합니다.",
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
    period: "2025.10 ~ ",
    role: "Expo · Next.js API · MySQL · 금융 데이터 · Cloud",
    details: [
      "자산 포트폴리오, 매매일지, 월별 지출 캘린더, 종목 검색·시세·공시 조회 기능 구현",
      "AI CFO가 자연어 입력을 구조화하되 사용자 승인 후에만 거래·분개 테이블에 반영되도록 설계",
      "국내·미국 주식·암호화폐 데이터, OpenAI 이미지 인식·종목 요약, LLM 호출 이력을 운영",
      "거래·분개·호출 이력을 나눠 저장해 입력 원문과 변환 결과를 함께 추적",
    ],
  },
  {
    title: "리뷰인코리아",
    icon: "/images/project-icons/reviewinkorea.webp",
    description:
      "방한 여행자를 위한 19개 언어 여행 리뷰 플랫폼입니다. 다국어 검색 노출 구조와 콘텐츠·배포 운영 환경을 구현했습니다.",
    links: [{ label: "웹 서비스", href: "https://reviewinkorea.com", icon: "web" }],
    period: "2026.03 ~ ",
    role: "Next.js SSR · i18n · MySQL · SEO · Docker · Cloud",
    details: [
      "검색, 댓글·대댓글, 좋아요, 여행 가이드, 지도·날씨·주변 맛집, 피드백 기능 구현",
      "canonical·hreflang·sitemap·JSON-LD를 정리해 19개 언어의 검색 노출 구조 설계",
      "Docker·Caddy·Cloudflare·R2 CDN·OCI/AWS 기반 배포 및 자동 콘텐츠 수집·번역 배치 운영",
    ],
  },
  {
    title: "내일할까 - 게으름뱅이 플래너",
    icon: "/images/project-icons/maybe-tomorrow.webp",
    description: "Today·Tomorrow·All Tasks 흐름으로 업무를 관리하는 SwiftUI iOS 플래너입니다.",
    links: [
      { label: "웹 서비스", href: "https://trendswhat.com/maybe-tomorrow", icon: "web" },
      {
        label: "App Store",
        href: "https://apps.apple.com/kr/app/%EB%82%B4%EC%9D%BC%ED%95%A0%EA%B9%8C-%EA%B2%8C%EC%9C%BC%EB%A6%84%EB%B1%85%EC%9D%B4-%ED%94%8C%EB%9E%98%EB%84%88/id6777882500",
        icon: "appStore",
      },
    ],
    period: "2026.05 ~ ",
    role: "SwiftUI · 로컬 DB · 백엔드 동기화 · 위젯",
    details: [
      "프로젝트별 업무·담당자·완료율과 위젯 완료 처리 기능 구현",
      "App Group SQLite와 Firebase Auth 토큰 기반 백엔드 동기화 구현",
      "Outbox queue와 retry/backoff, 계정별 데이터 분리 설계",
    ],
  },
  {
    title: "샌드 - 나만의 AI 퀴즈앱",
    icon: "/images/project-icons/send.webp",
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
    period: "2026.01 ~ ",
    role: "Expo · Next.js API · 인증 · MySQL · OCI 배포",
    details: [
      "사용자 생성 퀴즈, 대화형 학습·편집·풀이, 진행률·오답·채팅 로그 데이터 모델 구성",
      "로그인 전 AsyncStorage와 로그인 후 JWT 기반의 상태 전환 설계",
      "이메일 인증·비밀번호 재설정, Google·Apple OAuth, 탈퇴·피드백·약관 흐름 구현",
    ],
  },
  {
    title: "트렌드왓 - 글로벌 트렌드 모아보기",
    icon: "/images/project-icons/trendswhat.webp",
    description:
      "Google Trends 기반 키워드 수집부터 기사 생성·이미지 변환·발행까지 자동화한 콘텐츠 서비스입니다.",
    links: [{ label: "웹 서비스", href: "https://trendswhat.com", icon: "web" }],
    period: "2026.06 ~ ",
    role: "자동화 · Next.js SSR · MySQL · Cloudflare R2",
    details: [
      "키워드 수집, 기사 생성, 이미지 변환, R2 업로드, MySQL 저장, sitemap 반영을 자동화",
      "잠금·트랜잭션·스키마 제약·URL 검증으로 중복 발행과 미공개 데이터 노출 방지",
      "SSR 공개 화면과 운영 자동화 워커를 분리해 책임 경계 구성",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Security - Specialty",
    acquiredOn: "2026. 9. 26.",
    registrationNumber: "57bfe1330cac42ffb3444b4d55a900a4",
  },
  {
    name: "AWS Certified Generative AI Developer - Professional",
    acquiredOn: "2026. 9. 19.",
    registrationNumber: "dd745a74b5484b81bff3962b4ee7cfd2",
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    acquiredOn: "2026. 3. 25.",
    registrationNumber: "b2bb8b18ba6746f0bae1b17a9f8d210c",
  },
  {
    name: "SQL 개발자 (SQLD)",
    acquiredOn: "2025. 9. 19.",
    registrationNumber: "SQLD-058015681",
  },
];

const languageTests = [
  {
    name: "TOEIC Speaking Test",
    testedOn: "2026.09.14",
    registrationNumber: "101909",
    result: "Intermediate High (Speaking Score 140)",
  },
];

const sectionClass = "mt-[clamp(64px,8vw,96px)]";
const sectionHeadingClass =
  "mb-[clamp(24px,3vw,32px)] text-[clamp(28px,3vw,40px)] tracking-[-0.055em] text-[#2383e2] [font-weight:750]";
const subHeadingClass =
  "text-[clamp(19px,2vw,26px)] leading-[1.35] tracking-[-0.04em] [font-weight:720]";
const twoColumnClass =
  "grid grid-cols-[minmax(220px,0.85fr)_1.55fr] gap-[clamp(32px,5vw,64px)] text-[17px] leading-[1.7] max-[720px]:grid-cols-1";
const textLinkClass = "w-max hover:text-[#2383e2]";
const bulletListClass = "grid content-start gap-[7px]";
const bulletItemClass =
  "relative pl-[18px] before:absolute before:left-[2px] before:text-[#2383e2] before:content-['•']";
const skillColumnClass = "grid content-start gap-4 text-[16px] leading-[1.7]";
const skillItemClass = `${bulletItemClass} min-h-[calc(1.7em*2)]`;

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
    </svg>
  );
}

function ProjectLinkIcon({ icon, label }: Pick<ProjectLink, "icon" | "label">) {
  if (icon === "web") return <GlobeIcon />;

  if (icon === "googlePlay") {
    return (
      <Image
        className="block h-[22px] w-[22px]"
        src="/images/google-play.webp"
        alt=""
        width={22}
        height={22}
        sizes="22px"
      />
    );
  }

  if (icon === "appStore") {
    return (
      <Image
        className="block h-[22px] w-[22px]"
        src="/images/apple-logo-square.webp"
        alt=""
        width={22}
        height={22}
        sizes="22px"
      />
    );
  }

  return <>{label}</>;
}

function ProjectSection({ project }: { project: Project }) {
  return (
    <article className="grid content-start gap-[14px] border-t border-[#e9e9e7] py-[clamp(28px,4vw,40px)] text-[16px] leading-[1.7]">
      <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#e7e7e5] bg-white">
        <Image
          className="block h-full w-full object-cover"
          src={project.icon}
          alt={`${project.title} 아이콘`}
          width={36}
          height={36}
          sizes="36px"
        />
      </div>
      <h3 className={subHeadingClass}>{`${project.title} (${project.period})`}</h3>
      <p>{project.description}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 [font-weight:650]">
        {project.links.map((link) => (
          <a
            key={link.href}
            className={`${textLinkClass}${link.icon ? " inline-flex items-center justify-center no-underline hover:opacity-[0.72]" : ""}`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
          >
            <ProjectLinkIcon icon={link.icon} label={link.label} />
          </a>
        ))}
      </div>
      <p className="text-[#9b9a97]">{project.role}</p>
      <h4 className="mt-[18px] text-[17px] [font-weight:750]">👩🏻‍💻 내가 기여한 부분</h4>
      <ul className={bulletListClass}>
        {project.details.map((detail) => (
          <li key={detail} className={bulletItemClass}>{detail}</li>
        ))}
      </ul>
      <h4 className="mt-[18px] text-[17px] [font-weight:750]">🖥️ 사용 기술</h4>
      <p className="text-[#65645f]">
        {project.technologies ?? "NextJS · TypeScript · React-Query · Storybook · Axios · Emotion · MonoRepo"}
      </p>
    </article>
  );
}

export default function Home() {
  return (
    <article className="mx-auto w-full max-w-[800px] bg-white pt-[clamp(40px,6vw,64px)] pb-[clamp(64px,8vw,96px)] text-[#37352f] max-[840px]:px-5">
      <header>
          <h1 className="max-w-[780px] text-[clamp(34px,4vw,52px)] leading-[1.22] tracking-[-0.055em] text-[#242321] [font-weight:750]">
            👋🏻 안녕하세요, 소프트웨어 엔지니어 정지혁입니다.
          </h1>
          <div className="mt-[clamp(40px,5vw,64px)] grid max-w-[890px] gap-[clamp(28px,3vw,40px)] text-[clamp(17px,1.55vw,22px)] leading-[1.55] tracking-[-0.035em] [font-weight:560]">
            <p>
              <strong className="text-[#2383e2]">실제 사용자가 있는 서비스를 끝까지 만듭니다.</strong><br />
              학습 플랫폼, 금융 기록 앱, 여행 리뷰 서비스, 콘텐츠 자동화 서비스를 기획·개발·배포·운영해 왔습니다.<br />
              웹·모바일·백엔드·MySQL·Cloud·AI 기능을 하나의 운영 가능한 시스템으로 연결합니다.
            </p>
            <p>
              <strong className="text-[#2383e2]">문제를 사용자 흐름과 데이터 흐름으로 나누어 해결합니다.</strong><br />
              입력·처리·저장·조회·실패 복구 단계를 분리하고, 로그·DB 상태·배포 산출물·브라우저 동작을 함께 확인합니다.<br />
              임고봇은 현재 누적 <u>{cumulativeUsersText}</u>의 사용자가 이용하는 학습 플랫폼으로 운영하고 있습니다.
            </p>
            <p>
              <strong className="text-[#2383e2]">AI의 편의성과 데이터 신뢰성을 함께 설계합니다.</strong><br />
              AI가 입력을 구조화하거나 결과를 생성하더라도, 사용자 승인·검증·이력 관리가 남는 서비스 구조를 지향합니다.<br />
              현재 삼성 청년 SW·AI 아카데미에서 Java·Spring 기반의 협업 개발을 학습하고 있습니다.
            </p>
          </div>
      </header>

      <section
          className="mt-[clamp(56px,7vw,80px)] grid grid-cols-[minmax(220px,0.85fr)_1.55fr] items-center gap-[clamp(32px,5vw,64px)] max-[720px]:grid-cols-1 max-[720px]:gap-[34px]"
          aria-label="프로필 및 연락처"
        >
          <Image
            className="h-auto w-[231px] rounded-[14px] border border-[#e9e9e7] shadow-[0_18px_42px_rgba(35,42,52,0.1)] max-[720px]:w-[min(50.4vw,217px)]"
            src="/images/jihyuk.webp"
            alt="정지혁 프로필 사진"
            width={354}
            height={472}
            sizes="(max-width: 700px) 51vw, 231px"
            quality={90}
          />
          <div className="grid gap-[15px] text-[clamp(16px,1.4vw,20px)] leading-[1.45] [font-weight:620]">
            <p>📧 jihyukboin@gmail.com</p>
            <a className={`${textLinkClass} inline-flex items-center gap-2`} href="https://github.com/jihyukboin" target="_blank" rel="noreferrer">
              <Image className="flex-none" src="/images/github.svg" alt="" width={22} height={22} sizes="22px" />
              Github
            </a>
            <p>🏫 가톨릭대학교 컴퓨터정보공학 · 졸업</p>
            <p>🎓 삼성 청년 SW·AI 아카데미(SSAFY) 16기 · 교육과정 수강 중</p>
          </div>
      </section>

      <section id="experience" className={sectionClass}>
          <h2 className={sectionHeadingClass}>경험</h2>
          <div className={twoColumnClass}>
            <div>
              <h3 className={subHeadingClass}>🧑🏻‍💻 서비스 개발 및 운영</h3>
              <p className="text-[#9b9a97]">2024. 8 - 현재<br />웹 · 모바일 · 백엔드 · DB · Cloud</p>
            </div>
            <div className="grid gap-[22px]">
              <p>사용자의 실제 문제를 서비스 단위로 정의하고, 화면·API·인증·데이터베이스·배포를 연결해 운영까지 책임졌습니다.</p>
              <p>모바일 앱 4개와 웹 서비스 5개를 운영하며, 오류 제보와 이용 기록을 바탕으로 요구사항을 다시 정리하고 서비스를 개선하고 있습니다.</p>
            </div>
          </div>
      </section>

      <section id="certifications" className={sectionClass}>
          <h2 className={sectionHeadingClass}>자격증</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={certification.registrationNumber}
                className="flex min-h-[248px] flex-col rounded-2xl bg-[#f2f4f6] p-6 text-[#1d1d1f] sm:p-8"
              >
                <h3 className="text-xl leading-[1.35] tracking-[-0.04em] [font-weight:700] sm:text-2xl">
                  {certification.name}
                </h3>
                <dl className="mt-auto grid gap-4 pt-8 text-[15px] leading-[1.6] tracking-[-0.02em] text-[#4e5968] sm:text-base">
                  <div>
                    <dt className="text-sm text-[#8b95a1] [font-weight:650]">취득일</dt>
                    <dd className="mt-1 text-[#333d4b] [font-weight:650]">{certification.acquiredOn}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#8b95a1] [font-weight:650]">등록 번호</dt>
                    <dd className="mt-1 break-all text-[#333d4b] [font-weight:650]">{certification.registrationNumber}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
      </section>

      <section id="language-tests" className={sectionClass}>
          <h2 className={sectionHeadingClass}>어학</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {languageTests.map((languageTest) => (
              <article
                key={languageTest.registrationNumber}
                className="flex min-h-[248px] flex-col rounded-2xl bg-[#f2f4f6] p-6 text-[#1d1d1f] sm:p-8"
              >
                <h3 className="text-xl leading-[1.35] tracking-[-0.04em] [font-weight:700] sm:text-2xl">
                  {languageTest.name}
                </h3>
                <dl className="mt-auto grid gap-4 pt-8 text-[15px] leading-[1.6] tracking-[-0.02em] text-[#4e5968] sm:text-base">
                  <div>
                    <dt className="text-sm text-[#8b95a1] [font-weight:650]">취득일</dt>
                    <dd className="mt-1 text-[#333d4b] [font-weight:650]">{languageTest.testedOn}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#8b95a1] [font-weight:650]">등록 번호</dt>
                    <dd className="mt-1 text-[#333d4b] [font-weight:650]">{languageTest.registrationNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-[#8b95a1] [font-weight:650]">등급 및 점수</dt>
                    <dd className="mt-1 text-[#333d4b] [font-weight:650]">{languageTest.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
      </section>

      <section id="projects" className={sectionClass}>
          <h2 className={sectionHeadingClass}>프로젝트</h2>
          {projects.map((project) => <ProjectSection key={project.title} project={project} />)}
      </section>

      <section id="skills" className={sectionClass}>
          <h2 className={sectionHeadingClass}>기술</h2>
          <div className="grid grid-cols-2 gap-x-[clamp(40px,6vw,72px)] gap-y-[clamp(32px,4vw,48px)] max-[720px]:grid-cols-1">
            <div className={skillColumnClass}><h3 className={subHeadingClass}>Frontend</h3><ul className={bulletListClass}><li className={skillItemClass}>React, Next.js, SSR, i18n, SEO metadata, 반응형 UI</li><li className={skillItemClass}>Playwright 기반 브라우저 검증과 공개 서비스의 검색 노출 구조를 다룹니다.</li></ul></div>
            <div className={skillColumnClass}><h3 className={subHeadingClass}>Mobile</h3><ul className={bulletListClass}><li className={skillItemClass}>SwiftUI, Expo/React Native 기반 iOS·Android 앱 출시·운영 경험이 있습니다.</li><li className={skillItemClass}>위젯, 로컬 DB 동기화, 인증 기반 백엔드 동기화를 구현합니다.</li></ul></div>
            <div className={skillColumnClass}><h3 className={subHeadingClass}>Backend &amp; Database</h3><ul className={bulletListClass}><li className={skillItemClass}>Node.js REST API, 인증·세션, 파일 업로드, 배치 작업, 이메일 인증·OAuth를 구현합니다.</li><li className={skillItemClass}>MySQL 스키마 설계, 트랜잭션, 이력 추적, 마이그레이션 검증 경험이 있습니다.</li></ul></div>
            <div className={skillColumnClass}><h3 className={subHeadingClass}>Cloud &amp; AI Automation</h3><ul className={bulletListClass}><li className={skillItemClass}>AWS S3·CloudFront·Cognito·SES·Elastic Beanstalk, OCI, Docker, Caddy, Cloudflare R2를 운영합니다.</li><li className={skillItemClass}>OpenAI API, 문서 파싱, AI 유사도 채점, 자연어 입력 구조화, Playwright 자동화를 적용합니다.</li></ul></div>
          </div>
      </section>
    </article>
  );
}
