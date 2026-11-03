import { expect, test } from '@playwright/test';

test('Google Analytics는 페이지 load가 끝난 뒤 초기화하고 로드한다', async ({
  page
}) => {
  test.skip(
    !process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    'GA 측정 ID를 설정한 빌드에서 검증합니다.'
  );
  let imageRequests = 0;
  let analyticsRequests = 0;
  let releaseImages!: () => void;
  const imagesReady = new Promise<void>((resolve) => {
    releaseImages = resolve;
  });
  await page.route('**/_next/image?**', async (route) => {
    imageRequests++;
    await imagesReady;
    await route.continue();
  });
  await page.route('https://www.googletagmanager.com/gtag/js?**', (route) => {
    analyticsRequests++;
    return route.fulfill({
      contentType: 'application/javascript',
      body: 'window.analyticsLoaded = true;'
    });
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('textbox', { name: '채팅 메시지' }).fill('로딩 확인');
  await expect(page.getByRole('button', { name: '메시지 전송' })).toBeEnabled();
  await expect.poll(() => imageRequests).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.readyState)).toBe('interactive');
  expect(analyticsRequests).toBe(0);
  expect(await page.evaluate(() => Reflect.has(window, 'dataLayer'))).toBe(
    false
  );

  releaseImages();
  await page.waitForLoadState('load');
  await expect
    .poll(() => page.evaluate(() => Reflect.get(window, 'analyticsLoaded')))
    .toBe(true);
  expect(analyticsRequests).toBe(1);
  const analytics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const script = performance
      .getEntriesByType('resource')
      .find((entry) => entry.name.includes('googletagmanager.com/gtag/js'))!;
    const events = Reflect.get(window, 'dataLayer') as unknown[][];
    return {
      loadEnd: navigation.loadEventEnd,
      requestStart: script.startTime,
      config: events
        .map((event) => Array.from(event))
        .find((e) => e[0] === 'config')
    };
  });
  expect(analytics.loadEnd).toBeGreaterThan(0);
  expect(analytics.requestStart).toBeGreaterThanOrEqual(analytics.loadEnd);
  expect(analytics.config).toEqual([
    'config',
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  ]);
});

test('홈 폰트 전송량을 줄이고 서브셋 밖의 한글도 필요할 때 로드한다', async ({
  page
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() =>
    performance
      .getEntriesByType('resource')
      .filter((entry) => entry.name.includes('.woff2'))
      .map((entry) => (entry as PerformanceResourceTiming).encodedBodySize)
  );
  expect(fonts.length).toBe(1);
  expect(fonts[0]).toBeLessThan(150_000);

  await page.getByRole('textbox', { name: '채팅 메시지' }).fill('힣');
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          performance
            .getEntriesByType('resource')
            .filter((entry) => entry.name.includes('.woff2')).length
      )
    )
    .toBeGreaterThan(1);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      document.fonts.check('16px "Pretendard Variable"', '힣')
    )
  ).toBe(true);
});

test('Markdown 코드는 답변이 생길 때 로드하고 로드 후 마지막 답변으로 스크롤한다', async ({
  page
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'portfolio.chat.visitor',
      '3c34a901-cc43-4d72-af67-9ccf80f009c1'
    )
  );
  let answerReady = false;
  let delayedScripts = 0;
  let releaseScripts!: () => void;
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route('**/_next/static/chunks/*.js', async (route) => {
    if (answerReady) {
      delayedScripts++;
      await scriptsReady;
    }
    await route.continue();
  });
  await page.route('**/api/chat', async (route) => {
    const now = new Date().toISOString();
    answerReady = route.request().method() === 'POST';
    await route.fulfill({
      json: {
        day: now.slice(0, 10),
        resetAt: new Date(Date.now() + 86_400_000).toISOString(),
        quotaReached: false,
        turns: answerReady
          ? [
              {
                id: 'lazy-markdown',
                question: '렌더링 확인',
                answer: `${'문단입니다.\n\n'.repeat(50)}**마지막 답변**`,
                status: 'completed',
                errorMessage: null,
                createdAt: now
              }
            ]
          : []
      }
    });
  });
  await page.goto('/');
  const textbox = page.getByRole('textbox', { name: '채팅 메시지' });
  await textbox.fill('렌더링 확인');
  await page.getByRole('button', { name: '메시지 전송' }).click();
  await expect.poll(() => delayedScripts).toBeGreaterThan(0);
  await expect(textbox).toBeVisible();
  releaseScripts();
  const panel = page.getByRole('region', { name: '채팅 대화', exact: true });
  await expect(panel.locator('strong')).toHaveText('마지막 답변');
  await expect
    .poll(() =>
      panel.evaluate((element) => {
        const body = Array.from(element.children).find(
          (child) => getComputedStyle(child).overflowY === 'auto'
        )!;
        return body.scrollHeight - body.clientHeight - body.scrollTop;
      })
    )
    .toBeLessThan(2);
});
