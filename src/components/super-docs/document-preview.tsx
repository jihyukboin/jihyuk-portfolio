import styles from "./landing.module.css";

export function DocumentPreview() {
  return (
    <figure className="relative mx-auto max-w-4xl">
      <div
        className="hero-glow pointer-events-none absolute -inset-x-12 -inset-y-10 sm:-inset-x-32 sm:-inset-y-20"
        aria-hidden="true"
      />
      <div
        className={`${styles.editor} relative overflow-hidden rounded-2xl ring-1 ring-neutral-800 shadow-2xl shadow-black/40`}
        aria-hidden="true"
      >
        <div className={styles.editorTitlebar}>
          <span className={styles.trafficLights}>
            <i />
            <i />
            <i />
          </span>
          <span>프로젝트 기획서.hwpx — Super Docs</span>
          <span className="hidden sm:block text-neutral-500">HWPX</span>
        </div>
        <div className={styles.editorToolbar}>
          <span className={styles.toolbarSelect}>
            본문 <span>⌄</span>
          </span>
          <span className={styles.toolbarSelect}>
            시스템 글꼴 <span>⌄</span>
          </span>
          <span>11</span>
          <span className={styles.toolbarDivider} />
          <b>가</b>
          <i>가</i>
          <span className="underline">가</span>
          <span className={styles.toolbarDivider} />
          <span>≡</span>
          <span>☷</span>
          <span className="ml-auto hidden sm:block text-neutral-500">⌘S</span>
        </div>
        <div className={styles.editorCanvas}>
          <div className={styles.documentPaper}>
            <p className={styles.documentEyebrow}>SUPER DOCS</p>
            <p className={styles.documentTitle}>
              생각을 문서로,
              <br />더 자연스럽게.
            </p>
            <p className={styles.documentIntro}>
              익숙한 Mac에서 시작하는 새로운 문서 작업.
              <br />
              한글 문서와 Word 문서를 한곳에서 만나보세요.
            </p>
            <div className={styles.documentRule} />
            <p className={styles.documentSubtitle}>프로젝트 개요</p>
            <p className={styles.documentBody}>
              아이디어를 정리하고, 내용을 다듬고, 함께 나눌 문서를 만듭니다.
              <br className="hidden sm:block" /> 필요한 형식으로 열고 저장하며
              작업을 이어가세요.
            </p>
            <div className={styles.documentTable}>
              <span>문서 형식</span>
              <span>HWP · HWPX · DOCX</span>
              <span>작업 환경</span>
              <span>Mac · 오프라인 편집</span>
            </div>
          </div>
        </div>
        <div className={styles.editorStatus}>
          <span>Super Docs</span>
          <span>문서 편집 화면 예시</span>
        </div>
      </div>
      <figcaption className="relative mt-3 text-center text-xs text-neutral-500">
        Super Docs의 문서 편집 화면을 표현한 예시입니다.
      </figcaption>
    </figure>
  );
}
