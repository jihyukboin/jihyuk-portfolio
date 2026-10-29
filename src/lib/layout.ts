// globals.css의 --site-header-height와 동일한 값으로 스크롤 기준선을 계산한다.
// 브라우저 이벤트/effect 안에서만 호출한다.
export function getSiteHeaderHeight() {
  return Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--site-header-height'
    )
  );
}
