import { bulletListClass, sectionClass, sectionHeadingClass, skillColumnClass, skillItemClass, subHeadingClass } from "./styles";

export function SkillsSection() {
  return (
    <section id="skills" className={sectionClass}>
      <h2 className={sectionHeadingClass}>기술</h2>
      <div className="grid grid-cols-2 gap-x-[clamp(40px,6vw,72px)] gap-y-[clamp(32px,4vw,48px)] max-[720px]:grid-cols-1">
        <div className={skillColumnClass}><h3 className={subHeadingClass}>Frontend</h3><ul className={bulletListClass}><li className={skillItemClass}>React, Next.js, SSR, i18n, SEO metadata, 반응형 UI</li><li className={skillItemClass}>Playwright 기반 브라우저 검증과 공개 서비스의 검색 노출 구조를 다룹니다.</li></ul></div>
        <div className={skillColumnClass}><h3 className={subHeadingClass}>Mobile</h3><ul className={bulletListClass}><li className={skillItemClass}>SwiftUI, Expo/React Native 기반 iOS·Android 앱 출시·운영 경험이 있습니다.</li><li className={skillItemClass}>위젯, 로컬 DB 동기화, 인증 기반 백엔드 동기화를 구현합니다.</li></ul></div>
        <div className={skillColumnClass}><h3 className={subHeadingClass}>Backend &amp; Database</h3><ul className={bulletListClass}><li className={skillItemClass}>Node.js REST API, 인증·세션, 파일 업로드, 배치 작업, 이메일 인증·OAuth를 구현합니다.</li><li className={skillItemClass}>MySQL 스키마 설계, 트랜잭션, 이력 추적, 마이그레이션 검증 경험이 있습니다.</li></ul></div>
        <div className={skillColumnClass}><h3 className={subHeadingClass}>Cloud &amp; AI Automation</h3><ul className={bulletListClass}><li className={skillItemClass}>AWS S3·CloudFront·Cognito·SES·Elastic Beanstalk, OCI, Docker, Caddy, Cloudflare R2를 운영합니다.</li><li className={skillItemClass}>OpenAI API, 문서 파싱, AI 유사도 채점, 자연어 입력 구조화, Playwright 자동화를 적용합니다.</li></ul></div>
      </div>
    </section>
  );
}
