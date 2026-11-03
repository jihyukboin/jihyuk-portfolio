import { expect, test } from '@playwright/test';

test('임고봇 개요는 기존 문구와 숫자 형식을 유지한다', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#project-imgobot > p').first()).toHaveText(
    /^교사 임용시험 수험생의 학습 효율을 극대화하기 위해 기획 및 개발된 에듀테크 플랫폼입니다\. 현재 누적 \d{1,3}(?:,\d{3})*명의 사용자가 이용중입니다\.$/
  );
});
