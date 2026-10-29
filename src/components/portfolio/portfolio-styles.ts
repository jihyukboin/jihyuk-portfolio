// 공통 디자인 토큰
// - 포인트: #3182f6 (hover #1b64da)
// - 텍스트: #191f28(제목) · #333d4b(본문) · #4e5968(보조) · #596575(라벨)
// - 면·선: #f2f4f6(카드) · #e5e8eb(구분선)
export const sectionClass = 'mt-[clamp(64px,8vw,96px)]';
export const sectionHeadingClass =
  'mb-[clamp(24px,3vw,32px)] text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.055em] text-[#1b64da] [font-weight:750]';
export const subHeadingClass =
  'text-[clamp(1.1875rem,2vw,1.625rem)] leading-[1.35] tracking-[-0.04em] text-[#191f28] [font-weight:720]';
export const textLinkClass = 'w-max transition-colors hover:text-[#1b64da]';
export const bulletListClass = 'grid content-start gap-[7px]';
export const bulletItemClass =
  "relative pl-[18px] before:absolute before:left-[2px] before:text-[#1b64da] before:content-['•']";

// 회색 라운딩 카드 (프로젝트 설명·기술·자격증·어학 공통)
export const cardClass = 'rounded-2xl bg-[#f2f4f6]';
export const cardPaddingClass = 'p-6 sm:p-8';
export const cardTitleClass =
  'text-xl leading-[1.35] tracking-[-0.04em] text-[#191f28] [font-weight:700] sm:text-2xl';
export const cardBodyClass =
  'text-[0.9375rem] leading-[1.7] tracking-[-0.02em] text-[#4e5968] sm:text-base';
export const cardGridClass = 'grid gap-4 md:grid-cols-2';

// 프로젝트 카드 안의 소제목(역할·기여한 부분·사용 기술)
export const projectLabelClass =
  'mt-[18px] text-[1.0625rem] text-[#191f28] [font-weight:750]';
