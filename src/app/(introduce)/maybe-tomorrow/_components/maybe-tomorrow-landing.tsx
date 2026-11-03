import Image from 'next/image';
import { SiteHeader } from '@/components/layout/site-header';
import styles from './maybe-tomorrow-landing.module.css';

const APP_STORE_URL = 'https://apps.apple.com/app/id6777882500';
const SHOT_BASE = '/maybe-tomorrow/screenshots';

function AppStoreButton() {
  return (
    <a
      className={styles.appStore}
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download 내일할까 on the App Store"
    >
      <Image
        unoptimized
        className={styles.appStoreBadge}
        src="/maybe-tomorrow/app-store-badge.svg"
        alt="Download on the App Store"
        width={197}
        height={66}
      />
    </a>
  );
}

const AUDIENCE = [
  '계획 세우는 것까지만 즐거운 분',
  '오늘 할 일을 자꾸 내일의 나에게 넘기는 분',
  '죄책감 주는 투두 앱에 지친 분',
  '거창한 목표보다 매일 조금씩 자라고 싶은 분'
];

const STEPS = [
  '떠오른 할 일을 툭 적어두세요',
  '오늘 못 하겠다면 왼쪽으로 슬쩍 미세요',
  '“내일로 미루기 성공!” — 오늘 할 일이 내일 할 일로 이동'
];

const SHOTS = [
  {
    src: '01-list-overview',
    alt: '오늘과 내일 할 일이 날짜별로 정리된 목록 화면'
  },
  { src: '02-today-progress', alt: '오늘 할 일과 진척 링이 보이는 오늘 화면' },
  {
    src: '03-postpone-tomorrow',
    alt: '왼쪽으로 스와이프해 할 일을 내일로 미루는 화면'
  },
  {
    src: '04-team-project',
    alt: '팀원과 담당자, 진척도를 함께 관리하는 프로젝트 화면'
  },
  {
    src: '05-projects',
    alt: '집안일·여행·루틴을 프로젝트로 묶은 프로젝트 목록 화면'
  }
];

const FEATURES = [
  {
    icon: '↪️',
    name: '스와이프 미루기',
    desc: '오늘 할 일을 한 번에 내일로. 실수했다면 ‘취소’로 바로 되돌리기.'
  },
  {
    icon: '✨',
    name: '기분 좋은 반응',
    desc: '미룰 때마다 전해지는 햅틱 피드백으로 부담 대신 가벼움을.'
  },
  {
    icon: '🗂️',
    name: '오늘·내일·전체',
    desc: '지금 할 일과 미뤄둔 일을 화면 하나로 또렷하게.'
  },
  {
    icon: '📅',
    name: '날짜별 자동 정리',
    desc: '목록이 알아서 정돈되고, 접고 펼치며 깔끔하게 관리.'
  },
  {
    icon: '⭕',
    name: '채워지는 진척도',
    desc: '완료 체크마다 차오르는 진척 링으로 작은 성취감을.'
  },
  {
    icon: '⏰',
    name: '마감일까지',
    desc: '제목·상세내용·날짜·마감일, 원하는 만큼만 입력.'
  }
];

const TEAM = [
  '닉네임과 4자리 태그로 멤버를 간편하게 초대',
  '프로젝트 안에서 작업과 플랜을 자유롭게 구성',
  '작업·플랜마다 담당자를 지정하고 팀 진척도를 실시간 확인'
];

const ANYWHERE = [
  '다양한 로그인 방식 · 게스트 모드, 원하는 방식으로 시작',
  '클라우드 동기화로 기기를 바꿔도 내 계획 그대로',
  '한국어 · 영어 지원, 라이트 · 다크 · 자동 테마'
];

export function MaybeTomorrowLanding() {
  return (
    <>
      <SiteHeader navigation={null} mobileMenu={null} />
      <main className={styles.page}>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>내일할까 · 게으름뱅이 플래너</p>
              <h1 className={styles.heroTitle}>
                미루는 당신을 다그치지 않는,
                <br />
                <em>세상에서 가장 마음 편한 플래너</em>
              </h1>
              <p className={styles.heroLead}>
                완벽하지 않아도 괜찮아요. 오늘 못한 건 그냥 내일 하면 되니까요.
              </p>
              <div className={styles.heroActions}>
                <AppStoreButton />
              </div>
              <p className={styles.heroNote}>
                iPhone · iOS 18.0 이상 · 무료 (앱 내 광고 포함)
              </p>
            </div>
            <div className={styles.heroVisual}>
              <Image
                unoptimized
                className={styles.heroPhone}
                src={`${SHOT_BASE}/03-postpone-tomorrow.webp`}
                alt="할 일을 왼쪽으로 스와이프해 내일로 미루는 내일할까 앱 화면"
                width={840}
                height={1818}
                loading="eager"
              />
            </div>
          </div>
        </header>

        {/* Empathy */}
        <section className={styles.section}>
          <div className={`${styles.sectionInner} ${styles.empathy}`}>
            <p className={styles.empathyText}>
              나를 위해 시작한 플래너가 어느 순간 부담으로 다가온 적이 있나요?
              <br />더 이상 플래너에게 <span>완벽함을 강요받지 마세요.</span>
            </p>
          </div>
        </section>

        {/* Audience */}
        <section className={`${styles.section} ${styles.surface}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>이런 분께 딱이에요</h2>
              <p className={styles.sectionSub}>
                ‘내일할까’는 미루는 당신을 위해 만들어졌어요.
              </p>
            </div>
            <ul className={styles.audienceGrid}>
              {AUDIENCE.map((item) => (
                <li className={styles.audienceItem} key={item}>
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to use */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>
                오늘 못 한 일, 손가락 한 번이면 깔끔하게 내일로
              </h2>
              <p className={styles.sectionSub}>세 번이면 충분해요.</p>
            </div>
            <ol className={styles.steps}>
              {STEPS.map((text, index) => (
                <li className={styles.step} key={text}>
                  <div className={styles.stepNum}>{index + 1}</div>
                  <p className={styles.stepText}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Screenshot showcase */}
        <section
          className={`${styles.section} ${styles.surface} ${styles.showcase}`}
        >
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>한눈에 보는 내일할까</h2>
            <p className={styles.sectionSub}>
              오늘도, 내일도, 함께하는 일까지.
            </p>
          </div>
          <div className={styles.showcaseTrack}>
            {SHOTS.map((shot) => (
              <figure className={styles.shot} key={shot.src}>
                <Image
                  unoptimized
                  className={styles.shotImg}
                  src={`${SHOT_BASE}/${shot.src}.webp`}
                  alt={shot.alt}
                  width={840}
                  height={1818}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* Core features */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>핵심 기능</h2>
              <p className={styles.sectionSub}>부담은 덜고, 가벼움은 더하고.</p>
            </div>
            <div className={styles.featureGrid}>
              {FEATURES.map((feature) => (
                <article className={styles.featureCard} key={feature.name}>
                  <div className={styles.featureIcon} aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className={styles.featureName}>{feature.name}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team collaboration */}
        <section className={`${styles.section} ${styles.surface}`}>
          <div className={styles.split}>
            <div className={styles.splitVisual}>
              <Image
                unoptimized
                className={styles.splitPhone}
                src={`${SHOT_BASE}/04-team-project.webp`}
                alt="팀원과 담당자, 팀 진척도를 함께 확인하는 프로젝트 화면"
                width={840}
                height={1818}
                loading="lazy"
              />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>혼자가 아니어도 좋아요</h2>
              <ul className={styles.splitList}>
                {TEAM.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.splitNote}>
                집안일 분담부터 스터디, 사이드 프로젝트까지. 함께 미루고 함께
                해내세요.
              </p>
            </div>
          </div>
        </section>

        {/* Anywhere / sync */}
        <section className={styles.section}>
          <div className={`${styles.split} ${styles.splitReverse}`}>
            <div className={styles.splitVisual}>
              <Image
                unoptimized
                className={styles.splitPhone}
                src={`${SHOT_BASE}/05-projects.webp`}
                alt="집안일·여행·건강 루틴을 프로젝트로 묶어 관리하는 화면"
                width={840}
                height={1818}
                loading="lazy"
              />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>어디서나 끊김 없이</h2>
              <ul className={styles.splitList}>
                {ANYWHERE.map((item) => (
                  <li key={item}>
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.splitNote}>
                큰 계획도 부담 없이. 떠오른 일을 프로젝트로 묶어 차근차근.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.section}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>서두르지 않아도 괜찮아요</h2>
            <p className={styles.ctaText}>
              오늘 해야 할 일, 일단 내일로 미뤄볼까요? 지금 ‘내일할까’를 무료로
              받아보세요.
            </p>
            <div className={styles.ctaActions}>
              <AppStoreButton />
            </div>
            <p className={styles.ctaFree}>
              모든 핵심 기능 무료 · 앱 내 광고 포함
            </p>
          </div>
        </section>

        {/* Support */}
        <p className={styles.support}>
          도움이 필요하신가요?{' '}
          <a href="mailto:contact@trendswhat.com">이메일로 문의하세요.</a> · ©
          2026 TrendsWhat Inc.
        </p>
      </main>
    </>
  );
}
