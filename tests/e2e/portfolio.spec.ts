import { expect, test } from '@playwright/test';

test('홈의 메타데이터와 공개 정보 경로가 유지된다', async ({
  page,
  request
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('정지혁 | 풀스택 개발자 포트폴리오');
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3007'
  ).replace(/\/+$/, '');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    siteUrl
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'profile'
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    siteUrl
  );

  const imageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute('content');
  expect(imageUrl).toBeTruthy();
  const image = await request.get(new URL(imageUrl!).pathname);
  expect(image.ok()).toBeTruthy();
  expect(image.headers()['content-type']).toContain('image/png');

  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain(`${siteUrl}/sitemap.xml`);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain(`<loc>${siteUrl}</loc>`);
  const llms = await request.get('/llms.txt');
  expect(llms.headers()['content-type']).toContain('text/plain');
  expect(await llms.text()).toContain('임고봇');
});

test.describe('서버에서 제공하는 본문', () => {
  test.use({ javaScriptEnabled: false });

  test('JavaScript 없이 본문과 JSON-LD를 읽을 수 있다', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      '정지혁'
    );
    await expect(page.locator('#projects > article')).toHaveCount(8);
    await expect(
      page.getByRole('heading', { name: '임고봇', exact: true })
    ).toBeVisible();
    const schema = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText()
    );
    expect(
      schema['@graph'].map((item: { '@type': string }) => item['@type'])
    ).toEqual(['ProfilePage', 'Person', 'ItemList']);
    expect(schema['@graph'][2].itemListElement).toHaveLength(8);
  });
});

test('섹션 메뉴와 프로젝트 독이 현재 위치를 추적한다', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const navigation = page.getByRole('navigation', {
    name: '포트폴리오 메뉴',
    exact: true
  });
  await navigation.getByRole('link', { name: '기술', exact: true }).click();
  await expect(
    navigation.getByRole('link', { name: '기술', exact: true })
  ).toHaveAttribute('aria-current', 'location');
  await navigation.getByRole('link', { name: '프로젝트', exact: true }).click();
  const dock = page.getByRole('navigation', { name: '프로젝트 바로가기' });
  await expect(dock).toBeVisible();
  const planner = dock.getByRole('link', {
    name: '내일할까 - 게으름뱅이 플래너',
    exact: true
  });
  await planner.click();
  await expect(page).toHaveURL(/#project-maybe-tomorrow$/);
  await expect(planner).toHaveAttribute('aria-current', 'location');
  await navigation.getByRole('link', { name: '어학', exact: true }).click();
  await expect(
    navigation.getByRole('link', { name: '어학', exact: true })
  ).toHaveAttribute('aria-current', 'location');
  await expect(dock).not.toBeVisible();
  expect(errors).toEqual([]);
});

test('고정 앵커와 이전 공유 앵커가 같은 프로젝트를 가리킨다', async ({
  page
}) => {
  await page.goto('/#project-7');
  await expect(page.locator('#project-7').locator('..')).toHaveAttribute(
    'id',
    'project-fintrendbeacon'
  );
  await expect
    .poll(async () => {
      const position = await page
        .locator('#project-fintrendbeacon')
        .boundingBox();
      return Boolean(position && position.y >= 49 && position.y < 180);
    })
    .toBe(true);
  const ids = await page
    .locator('#projects > article')
    .evaluateAll((articles) => articles.map((a) => a.id));
  expect(new Set(ids).size).toBe(ids.length);
  expect(ids[0]).toBe('project-imgobot');
});

test.describe('모바일 메뉴', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('서버에서 전달한 링크 선택과 Escape로 닫힌다', async ({ page }) => {
    await page.goto('/');
    const openButton = page.getByRole('button', { name: '모바일 메뉴 열기' });
    await openButton.click();
    const menu = page.getByRole('dialog', { name: '모바일 메뉴', exact: true });
    await expect(menu).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await page.keyboard.press('Shift+Tab');
    await expect(
      menu.getByRole('link', { name: '어학', exact: true })
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      menu.getByRole('link', { name: 'GitHub', exact: true })
    ).toBeFocused();
    await menu.getByRole('link', { name: '프로젝트', exact: true }).click();
    await expect(menu).not.toBeVisible();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
    await openButton.click();
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(openButton).toBeFocused();
    await openButton.click();
    await page.mouse.click(10, 800);
    await expect(menu).not.toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflow).toBe(false);
  });

  test('데스크톱으로 전환할 때 메뉴와 스크롤 잠금이 해제된다', async ({
    page
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '모바일 메뉴 열기' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  });
});

test('포트폴리오 외 경로에 홈의 메타데이터와 탐색 UI가 상속되지 않는다', async ({
  page
}) => {
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:type"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await expect(page.locator('#site-header')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0
  );
});
