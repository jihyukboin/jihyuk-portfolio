import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getImgobotUserCount } from '../src/lib/imgobot-stats.ts';

test('API의 회원 수를 반환한다 (0명 포함)', async (t) => {
  for (const totalUsers of [3567, 0]) {
    t.mock.method(globalThis, 'fetch', async () =>
      Response.json({ success: true, data: { totalUsers } })
    );
    assert.equal(await getImgobotUserCount(), totalUsers);
    t.mock.restoreAll();
  }
});

test('실패하거나 잘못된 응답이면 3,430명을 반환한다', async (t) => {
  const responses = [
    () => {
      throw new Error('Network error');
    },
    () => {
      throw new DOMException('Timed out', 'TimeoutError');
    },
    () => new Response(null, { status: 500 }),
    () => new Response('invalid JSON'),
    () => Response.json(null),
    () => Response.json({ success: false, data: { totalUsers: 4000 } }),
    ...[undefined, null, '4000', -1, 1.5].map(
      (totalUsers) => () =>
        Response.json({ success: true, data: { totalUsers } })
    )
  ];
  for (const response of responses) {
    t.mock.method(globalThis, 'fetch', async () => response());
    assert.equal(await getImgobotUserCount(), 3430);
    t.mock.restoreAll();
  }
});
