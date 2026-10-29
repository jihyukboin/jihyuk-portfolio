import { expect, test } from '@playwright/test';
import type { ChatSnapshot } from '../../src/lib/chat/contracts';

function emptyChat(): ChatSnapshot {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setUTCHours(24, 0, 0, 0);
  return {
    day: now.toISOString().slice(0, 10),
    resetAt: midnight.toISOString(),
    turns: [],
    quotaReached: false
  };
}

test('패널 닫기 버튼은 스크롤해도 상단에 유지되고 닫힘 상태를 복원한다', async ({
  page
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'portfolio.chat.visitor',
      '3c34a901-cc43-4d72-af67-9ccf80f009c1'
    )
  );
  let state: ChatSnapshot = {
    ...emptyChat(),
    turns: Array.from({ length: 20 }, (_, index) => ({
      id: String(index),
      question: `질문 ${index}`,
      answer: `답변 ${index}`,
      status: 'completed',
      errorMessage: null,
      createdAt: new Date().toISOString()
    }))
  };
  await page.route('**/api/chat', async (route) => {
    if (route.request().method() === 'POST') {
      const { requestId, question } = route.request().postDataJSON();
      state = {
        ...state,
        turns: [
          ...state.turns,
          {
            id: requestId,
            question,
            answer: '다시 열린 패널의 답변',
            status: 'completed',
            errorMessage: null,
            createdAt: new Date().toISOString()
          }
        ]
      };
    }
    await route.fulfill({ json: state });
  });
  await page.goto('/');
  const panel = page.getByRole('region', { name: '채팅 대화', exact: true });
  const close = panel.getByRole('button', { name: '채팅 패널 닫기' });
  await expect(close).toBeVisible();
  const before = await close.boundingBox();
  await panel.evaluate((element) => {
    const body = Array.from(element.children).find(
      (child) => getComputedStyle(child).overflowY === 'auto'
    )!;
    body.scrollTop = 0;
  });
  const after = await close.boundingBox();
  expect(after!.y).toBe(before!.y);
  expect(after!.width).toBeGreaterThanOrEqual(44);
  expect(after!.height).toBeGreaterThanOrEqual(44);
  await close.click();
  await expect(panel).toHaveCount(0);
  await expect(
    page.getByRole('textbox', { name: '채팅 메시지' })
  ).toBeFocused();
  expect(
    await page.evaluate(() =>
      localStorage.getItem('portfolio.chat.panelClosed')
    )
  ).toBe('true');
  await page.reload();
  await expect(panel).toHaveCount(0);
  await page.getByRole('textbox', { name: '채팅 메시지' }).fill('다시 질문');
  await expect(page.getByRole('button', { name: '메시지 전송' })).toBeEnabled();
  await page.getByRole('button', { name: '메시지 전송' }).click();
  await expect(panel.getByText('다시 열린 패널의 답변')).toBeVisible();
  expect(
    await page.evaluate(() =>
      localStorage.getItem('portfolio.chat.panelClosed')
    )
  ).toBe('false');
});

test('답변을 기다리는 동안 닫으면 응답이 도착해도 패널을 다시 열지 않는다', async ({
  page
}) => {
  let state = emptyChat();
  let finishResponse!: () => void;
  const responseReady = new Promise<void>((resolve) => {
    finishResponse = resolve;
  });
  await page.route('**/api/chat', async (route) => {
    if (route.request().method() === 'POST') {
      const { requestId, question } = route.request().postDataJSON();
      await responseReady;
      state = {
        ...state,
        turns: [
          {
            id: requestId,
            question,
            answer: '나중에 도착한 답변',
            status: 'completed',
            errorMessage: null,
            createdAt: new Date().toISOString()
          }
        ]
      };
    }
    await route.fulfill({ json: state });
  });
  await page.goto('/');
  const input = page.getByRole('textbox', { name: '채팅 메시지' });
  await input.fill('전송한 질문');
  const send = page.getByRole('button', { name: '메시지 전송' });
  await expect(send).toBeEnabled();
  await send.click();
  await expect(page.getByText('답변을 작성하고 있습니다…')).toBeVisible();
  await page.getByRole('button', { name: '채팅 패널 닫기' }).click();
  finishResponse();
  await expect(input).toHaveAttribute('aria-busy', 'false');
  await expect(
    page.getByRole('region', { name: '채팅 대화', exact: true })
  ).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole('region', { name: '채팅 대화', exact: true })
  ).toHaveCount(0);
});

test('최초 입력에 UUID를 발급하고 새로고침 후 대화 패널을 복원한다', async ({
  page
}) => {
  let state = emptyChat();
  let visitor: string | null = null;
  let finishResponse!: () => void;
  const responseReady = new Promise<void>((resolve) => {
    finishResponse = resolve;
  });
  await page.route('**/api/chat', async (route) => {
    const request = route.request();
    const authorization = request.headers().authorization;
    expect(authorization).toMatch(/^Bearer [0-9a-f-]{36}$/);
    visitor ??= authorization;
    expect(authorization).toBe(visitor);
    if (request.method() === 'POST') {
      await responseReady;
      const { requestId, question } = request.postDataJSON();
      state = {
        ...state,
        turns: [
          ...state.turns,
          {
            id: requestId,
            question,
            answer: '저장된 답변입니다.',
            status: 'completed',
            createdAt: new Date().toISOString(),
            errorMessage: null
          }
        ]
      };
    }
    await route.fulfill({ json: state });
  });
  await page.goto('/');
  expect(
    await page.evaluate(() => localStorage.getItem('portfolio.chat.visitor'))
  ).toBeNull();
  const input = page.getByRole('textbox', { name: '채팅 메시지' });
  const send = page.getByRole('button', { name: '메시지 전송' });
  await input.fill('안녕하세요');
  const id = await page.evaluate(() =>
    localStorage.getItem('portfolio.chat.visitor')
  );
  expect(id).toMatch(/^[0-9a-f-]{36}$/);
  await input.press('Shift+Enter');
  await input.pressSequentially('반갑습니다');
  await expect(send).toBeEnabled();
  await input.press('Enter');
  const panel = page.getByRole('region', { name: '채팅 대화' });
  await expect(panel.getByText('안녕하세요 반갑습니다')).toBeVisible();
  await expect(input).toBeEmpty();
  await expect(panel.getByText('답변을 작성하고 있습니다…')).toBeVisible();
  finishResponse();
  await expect(panel.getByText('저장된 답변입니다.')).toBeVisible();
  await expect(input).toBeEmpty();
  await page.reload();
  await expect(panel.getByText('저장된 답변입니다.')).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem('portfolio.chat.visitor'))
  ).toBe(id);
});

test('처리 중 새로고침하면 저장된 질문을 복원하고 완료될 때까지 기다린다', async ({
  page
}) => {
  const state = emptyChat();
  let reads = 0;
  await page.addInitScript(() =>
    localStorage.setItem(
      'portfolio.chat.visitor',
      '3c34a901-cc43-4d72-af67-9ccf80f009c1'
    )
  );
  await page.route('**/api/chat', async (route) => {
    expect(route.request().method()).toBe('GET');
    reads++;
    await route.fulfill({
      json: {
        ...state,
        turns: [
          {
            id: 'ongoing',
            question: '진행 중 질문',
            answer: reads > 1 ? '완료된 답변' : null,
            status: reads > 1 ? 'completed' : 'pending',
            errorMessage: null,
            createdAt: new Date().toISOString()
          }
        ]
      }
    });
  });
  await page.goto('/');
  await expect(page.getByText('진행 중 질문')).toBeVisible();
  await expect(
    page.getByRole('button', { name: '메시지 전송' })
  ).toBeDisabled();
  await expect(page.getByText('완료된 답변')).toBeVisible();
});

test('한도에 도달하면 이메일과 초기화 시점을 안내하고 질문을 차단한다', async ({
  page
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'portfolio.chat.visitor',
      '3c34a901-cc43-4d72-af67-9ccf80f009c1'
    )
  );
  await page.route('**/api/chat', (route) =>
    route.fulfill({ json: { ...emptyChat(), quotaReached: true } })
  );
  await page.goto('/');
  await expect(
    page.getByText(/jihyukboin@gmail.com/, { exact: false }).last()
  ).toBeVisible();
  await expect(page.getByText(/다음 이용 가능:/)).toBeVisible();
  await page.getByRole('textbox', { name: '채팅 메시지' }).fill('질문');
  await expect(
    page.getByRole('button', { name: '메시지 전송' })
  ).toBeDisabled();
});

test('UTC 자정이 되면 이전 날짜의 대화 패널을 새 대화로 교체한다', async ({
  page
}) => {
  await page.clock.install({ time: new Date('2026-10-29T23:59:58.000Z') });
  await page.addInitScript(() =>
    localStorage.setItem(
      'portfolio.chat.visitor',
      '3c34a901-cc43-4d72-af67-9ccf80f009c1'
    )
  );
  await page.route('**/api/chat', async (route) => {
    const now = await page.evaluate(() => new Date().toISOString());
    const day = now.slice(0, 10);
    await route.fulfill({
      json: {
        day,
        resetAt:
          day === '2026-10-29'
            ? '2026-10-30T00:00:00.000Z'
            : '2026-10-31T00:00:00.000Z',
        turns:
          day === '2026-10-29'
            ? [
                {
                  id: 'yesterday',
                  question: '어제 질문',
                  answer: '어제 답변',
                  status: 'completed',
                  createdAt: now,
                  errorMessage: null
                }
              ]
            : [],
        quotaReached: false
      }
    });
  });
  await page.goto('/');
  await expect(page.getByText('어제 답변')).toBeVisible();
  await page.clock.fastForward(3000);
  await expect(page.getByRole('region', { name: '채팅 대화' })).toHaveCount(0);
});

test('저장 결과가 불확실한 서버 오류 후 같은 요청 ID로 재확인한다', async ({
  page
}) => {
  const state = emptyChat();
  const requestIds: string[] = [];
  await page.route('**/api/chat', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: state });
      return;
    }
    const { requestId, question } = route.request().postDataJSON();
    requestIds.push(requestId);
    if (requestIds.length === 1) {
      await route.fulfill({
        status: 503,
        json: {
          error: { code: 'UNAVAILABLE', message: '잠시 후 다시 시도해주세요.' }
        }
      });
      return;
    }
    await route.fulfill({
      json: {
        ...state,
        turns: [
          {
            id: requestId,
            question,
            answer: '복원한 결과',
            status: 'completed',
            errorMessage: null,
            createdAt: new Date().toISOString()
          }
        ]
      }
    });
  });
  await page.goto('/');
  await page.getByRole('textbox', { name: '채팅 메시지' }).fill('전송한 질문');
  const send = page.getByRole('button', { name: '메시지 전송' });
  await expect(send).toBeEnabled();
  await send.click();
  await expect(
    page.getByRole('region', { name: '채팅 대화' }).getByRole('alert')
  ).toContainText('잠시 후 다시 시도해주세요.');
  await expect(page.getByRole('textbox', { name: '채팅 메시지' })).toHaveValue(
    '전송한 질문'
  );
  await expect(send).toBeEnabled();
  await send.click();
  await expect(page.getByText('복원한 결과')).toBeVisible();
  expect(requestIds).toHaveLength(2);
  expect(requestIds[1]).toBe(requestIds[0]);
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 390, height: 844 }
]) {
  test(`마크다운 답변을 렌더링하고 긴 콘텐츠를 패널 안에 유지한다 (${viewport.width}px)`, async ({
    page
  }) => {
    await page.setViewportSize(viewport);
    await page.addInitScript(() =>
      localStorage.setItem(
        'portfolio.chat.visitor',
        '3c34a901-cc43-4d72-af67-9ccf80f009c1'
      )
    );
    const answer = [
      '## 프로젝트 안내',
      '',
      '**강조 문장**과 *기울임*, ~~취소선~~, `inlineCode`를 표시합니다.',
      '',
      '- 첫 번째 항목',
      '- 두 번째 항목',
      '  - 중첩 항목',
      '',
      '1. 준비',
      '2. 실행',
      '',
      '> 인용 문장입니다.',
      '',
      '[프로젝트 링크](https://example.com/project)',
      '',
      '- [x] 완료 항목',
      '',
      '```typescript',
      `const message = "${'long-code-'.repeat(35)}";`,
      'console.log(message);',
      '```',
      '',
      '| 기술 | 설명 | 비고 |',
      '| --- | --- | --- |',
      `| Next.js | ${'긴설명'.repeat(40)} | ${'비고내용'.repeat(30)} |`,
      '',
      '<script>window.markdownExecuted = true</script>',
      '<img src=x onerror="window.markdownExecuted = true">',
      '',
      '[실행 링크](javascript:alert(1))'
    ].join('\n');
    await page.route('**/api/chat', (route) =>
      route.fulfill({
        json: {
          ...emptyChat(),
          turns: [
            {
              id: 'markdown',
              question: '**질문 원문**',
              answer,
              status: 'completed',
              errorMessage: null,
              createdAt: new Date().toISOString()
            }
          ]
        }
      })
    );
    await page.goto('/');
    const panel = page.getByRole('region', { name: '채팅 대화', exact: true });
    await expect(
      panel.getByRole('heading', { level: 2, name: '프로젝트 안내' })
    ).toHaveCount(1);
    await expect(panel.locator('strong')).toHaveText('강조 문장');
    await expect(panel.locator('em')).toHaveText('기울임');
    await expect(panel.locator('del')).toHaveText('취소선');
    await expect(panel.locator('ol > li')).toHaveCount(2);
    await expect(panel.locator('ul ul > li')).toHaveText('중첩 항목');
    await expect(panel.locator('blockquote')).toContainText('인용 문장입니다.');
    await expect(panel.getByRole('checkbox')).toBeChecked();
    await expect(panel.getByRole('checkbox')).toBeDisabled();
    await expect(panel.locator('pre code')).toContainText(
      'console.log(message);'
    );
    await expect(
      panel.getByRole('columnheader', { name: '기술', exact: true })
    ).toHaveCount(1);
    await expect(panel.getByText('**질문 원문**', { exact: true })).toHaveCount(
      1
    );
    const link = panel.getByRole('link', { name: '프로젝트 링크' });
    await expect(link).toHaveAttribute('href', 'https://example.com/project');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(
      panel.locator('script, [onerror], a[href^="javascript:"]')
    ).toHaveCount(0);
    expect(await page.evaluate(() => 'markdownExecuted' in window)).toBe(false);
    const sizes = await panel.evaluate((element) => ({
      pageOverflows: document.documentElement.scrollWidth > window.innerWidth,
      panelOverflows: element.scrollWidth > element.clientWidth,
      codeScrolls: (() => {
        const pre = element.querySelector('pre')!;
        return (
          pre.scrollWidth > pre.clientWidth &&
          getComputedStyle(pre).overflowX === 'auto'
        );
      })(),
      tableScrolls: (() => {
        const wrapper = element.querySelector('table')!.parentElement!;
        return (
          wrapper.scrollWidth > wrapper.clientWidth &&
          getComputedStyle(wrapper).overflowX === 'auto'
        );
      })()
    }));
    expect(sizes.pageOverflows).toBe(false);
    expect(sizes.panelOverflows).toBe(false);
    expect(sizes.codeScrolls).toBe(true);
    expect(sizes.tableScrolls).toBe(true);
  });
}
