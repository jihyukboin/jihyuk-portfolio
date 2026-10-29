import Image from 'next/image';
import { siteOwner } from '@/data/site';
import { faqs, formats, superDocs } from '@/data/super-docs';
import { DocumentPreview } from './document-preview';
import { FeatureTabs } from './feature-tabs';

export function DownloadLink() {
  return (
    <a
      href={superDocs.downloadUrl}
      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-neutral-200 px-7 py-3 text-sm font-medium text-neutral-900 shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-300 hover:shadow-xl active:translate-y-0 active:scale-[0.98]"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" />
      </svg>
      Mac용 무료 다운로드
    </a>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="super-docs-title"
      className="px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-4xl pt-28 sm:pt-36 pb-8 text-center">
        <p className="mb-6 text-sm font-medium tracking-widest uppercase text-neutral-500">
          무료 오픈소스 문서 편집기
        </p>
        <h1
          id="super-docs-title"
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]"
        >
          Mac에서 문서 편집,
          <br />
          <span className="animated-gradient bg-linear-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            Super Docs로 가볍게
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-400">
          HWP·HWPX·DOCX를 열고, 편집하고, 저장하세요.
          <br className="hidden sm:block" /> Super Docs는 인터넷 연결 없이도
          사용할 수 있는
          <br className="hidden sm:block" /> Mac용 무료 오픈소스 문서
          편집기입니다.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <DownloadLink />
          <p className="text-xs text-neutral-500">
            macOS 14 이상 · Apple Silicon Mac (M1 이상)
          </p>
        </div>
      </div>
      <DocumentPreview />
    </section>
  );
}

export function HighlightsSection() {
  return (
    <section
      aria-label="Super Docs 한눈에 보기"
      className="px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <dl className="mx-auto grid max-w-4xl grid-cols-3 gap-2.5 sm:gap-8">
        {[
          { value: '3', label: '문서 형식' },
          { value: '무료', label: 'MIT 오픈소스' },
          { value: '오프라인', label: '인터넷 없이 편집' }
        ].map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center rounded-2xl bg-neutral-900 p-4 sm:p-8 ring-1 ring-neutral-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <dt className="order-2 mt-1.5 sm:mt-2 text-center text-xs sm:text-base leading-tight text-neutral-400">
              {label}
            </dt>
            <dd className="text-2xl sm:text-4xl font-bold tracking-tight">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="scroll-mt-28 px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h2
            id="features-title"
            className="text-2xl sm:text-3xl font-semibold tracking-tight"
          >
            한글 문서와 Word 문서를 한곳에서
          </h2>
          <p className="mt-3 text-neutral-400">
            본문, 표, 글자 서식까지. 익숙한 문서 작업을 Mac에서 이어가세요.
          </p>
        </header>
        <FeatureTabs />
        <ul
          className="mt-6 flex flex-wrap justify-center gap-2"
          aria-label="주요 편집 기능"
        >
          {[
            '본문 편집',
            '표 편집',
            '글자 서식',
            '여러 문서 창',
            '시스템 파일 선택창',
            'Mac 단축키',
            '앱 내 업데이트'
          ].map((label) => (
            <li
              key={label}
              className="rounded-full bg-neutral-900 px-3 py-1 text-sm text-neutral-400 ring-1 ring-neutral-800"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section
      aria-labelledby="workflow-title"
      className="px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="workflow-title"
          className="text-center text-2xl sm:text-3xl font-semibold tracking-tight"
        >
          Mac에 익숙한 문서 작업
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-400">
          <p>
            여러 문서를 각각의 창에서 열고, 시스템 파일 선택창과 익숙한 단축키로
            작업하세요. 문서를 열고 편집하고 저장하는 데 인터넷 연결이 필요하지
            않습니다.
          </p>
          <p>
            저장하지 않은 변경 사항을 알려주고, 다른 앱이 원본 파일을 변경하면
            덮어쓰기를 막습니다. 새 버전은 앱 안에서 확인하고 설치 안내를 받을
            수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export function FormatsSection() {
  return (
    <section
      id="formats"
      aria-labelledby="formats-title"
      className="scroll-mt-28 px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="formats-title"
          className="text-center text-2xl sm:text-3xl font-semibold tracking-tight"
        >
          세 가지 형식, 하나의 편집기
        </h2>
        <p className="mt-4 text-center leading-relaxed text-neutral-400">
          HWP·HWPX·DOCX의 열람과 편집을 지원합니다.
          <br />새 문서는 HWPX로 시작합니다.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-800 shadow-xs">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Super Docs 문서 형식별 열람·편집 및 저장 지원
            </caption>
            <thead>
              <tr className="border-b border-neutral-800 text-left">
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-neutral-500"
                >
                  문서 형식
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-neutral-300"
                >
                  열람·편집
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-medium text-neutral-300"
                >
                  저장 형식
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {formats.map((format) => (
                <tr key={format.name}>
                  <th
                    scope="row"
                    className="px-5 py-3 text-left font-medium text-neutral-100"
                  >
                    {format.name}
                  </th>
                  <td className="px-5 py-3 text-neutral-400">지원</td>
                  <td className="px-5 py-3 text-neutral-400">
                    {format.savesAs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm leading-relaxed text-neutral-500">
          복잡한 문서의 배치·글꼴·일부 개체는 원본 앱과 다르게 표시될 수
          있습니다.
          <br />
          <a
            href="#faq"
            className="underline underline-offset-4 hover:text-neutral-300"
          >
            지원 범위와 제약 확인하기
          </a>
        </p>
      </div>
    </section>
  );
}

export function InstallSection() {
  return (
    <section
      id="install"
      aria-labelledby="install-title"
      className="scroll-mt-28 px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h2
            id="install-title"
            className="text-2xl sm:text-3xl font-semibold tracking-tight"
          >
            다운로드하고, 바로 시작하세요
          </h2>
          <p className="mt-3 text-neutral-400">
            Apple Silicon Mac (M1 이상) · macOS 14 이상
          </p>
        </header>
        <ol className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: '앱 다운로드',
              body: (
                <>
                  <a
                    href={superDocs.downloadUrl}
                    className="underline underline-offset-4 hover:text-neutral-100"
                  >
                    GitHub 릴리스
                  </a>
                  에서 최신 DMG 파일을 받으세요.
                </>
              )
            },
            {
              title: 'Applications로 이동',
              body: 'DMG를 열고 Super Docs를 Applications 폴더로 드래그하세요.'
            },
            {
              title: '첫 문서 열기',
              body: '앱을 실행하고 ⌘O로 문서를 열거나, ⌘N으로 새 문서를 만드세요.'
            }
          ].map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl bg-neutral-900 p-6 ring-1 ring-neutral-800"
            >
              <span
                aria-hidden="true"
                className="text-sm font-medium text-blue-400"
              >
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-28 px-4 lg:px-6 xl:px-0 mb-24 sm:mb-32"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="faq-title"
          className="mb-8 text-center text-2xl sm:text-3xl font-semibold tracking-tight"
        >
          자주 묻는 질문
        </h2>
        <div className="divide-y divide-neutral-800">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">
                <h3>{question}</h3>
                <span
                  aria-hidden="true"
                  className="text-neutral-500 group-open:rotate-45 transition-transform"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-6 text-sm sm:text-base leading-relaxed text-neutral-400">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DownloadSection() {
  return (
    <section
      aria-labelledby="download-title"
      className="px-4 lg:px-6 xl:px-0 mb-16"
    >
      <div className="mx-auto max-w-4xl rounded-2xl bg-linear-to-br from-neutral-900 to-neutral-800 p-10 sm:p-14 text-center ring-1 ring-neutral-800">
        <Image
          src="/super-docs/app-icon.png"
          alt=""
          width={64}
          height={64}
          className="mx-auto mb-5"
        />
        <h2
          id="download-title"
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
        >
          문서 작업을 더 가볍게
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-neutral-400">
          한글 문서부터 Word 문서까지.
          <br />
          무료 오픈소스 Super Docs로 시작하세요.
        </p>
        <div className="mt-8">
          <DownloadLink />
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="px-4 pt-16 pb-8 text-center text-sm text-neutral-500">
      <nav aria-label="Super Docs 관련 링크">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          <li>
            <a
              href={superDocs.repositoryUrl}
              className="hover:text-neutral-300"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href={superDocs.downloadUrl} className="hover:text-neutral-300">
              릴리스 노트
            </a>
          </li>
          <li>
            <a href={superDocs.issuesUrl} className="hover:text-neutral-300">
              문제 신고·기능 제안
            </a>
          </li>
          <li>
            <a
              href={`${superDocs.repositoryUrl}/blob/main/LICENSE`}
              className="hover:text-neutral-300"
            >
              MIT 라이선스
            </a>
          </li>
          <li>
            <a href="https://mac-stats.com/" className="hover:text-neutral-300">
              디자인 레퍼런스
            </a>
          </li>
        </ul>
      </nav>
      <p className="mt-6 text-xs">
        Super Docs · 만든 사람{' '}
        <a href={siteOwner.githubUrl} className="hover:underline">
          {siteOwner.name}
        </a>
      </p>
    </footer>
  );
}
