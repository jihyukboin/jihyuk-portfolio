import assert from 'node:assert/strict';
import { after, before, beforeEach, test } from 'node:test';
import { createServer } from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import nextEnv from '@next/env';
import { createConnection } from 'mysql2/promise';

nextEnv.loadEnvConfig(process.cwd());
const databaseUrl = process.env.TEST_DATABASE_URL;
if (!databaseUrl || !new URL(databaseUrl).pathname.endsWith('_test')) {
  throw new Error(
    '이름이 _test로 끝나는 별도 DB의 TEST_DATABASE_URL이 필요합니다.'
  );
}

const day = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
const limit = 5_000_000;
const reservation = 100 + 2048;
const appUrl = 'http://127.0.0.1:3117';
let db;
let app;
let appExit;
let output = '';
let counted = [];
let generated = [];
let mode = {};

const provider = createServer(async (request, response) => {
  let raw = '';
  for await (const chunk of request) raw += chunk;
  const body = JSON.parse(raw);
  const tokens =
    (mode.inputTokens ?? 100) + (body.previous_response_id ? 100 : 0);
  response.setHeader('Content-Type', 'application/json');
  if (request.url === '/v1/responses/input_tokens') {
    counted.push(body);
    if (mode.countDelay) await delay(mode.countDelay);
    response.end(
      JSON.stringify({ object: 'response.input_tokens', input_tokens: tokens })
    );
    return;
  }
  assert.equal(request.url, '/v1/responses');
  generated.push(body);
  if (mode.delay) await delay(mode.delay);
  if (mode.disconnect) {
    response.destroy();
    return;
  }
  if (mode.errorStatus) {
    response.statusCode = mode.errorStatus;
    response.end(
      JSON.stringify({
        error: {
          message: 'Test rejection',
          type: 'test_error',
          code: 'test_error'
        }
      })
    );
    return;
  }
  response.end(
    JSON.stringify({
      id: `resp_test_${generated.length}`,
      object: 'response',
      status: mode.incomplete ? 'incomplete' : 'completed',
      created_at: Math.floor(Date.now() / 1000),
      model: body.model,
      output: [
        {
          type: 'message',
          role: 'assistant',
          id: `msg_${generated.length}`,
          status: 'completed',
          content: [
            {
              type: 'output_text',
              text: '포트폴리오 안내 답변입니다.',
              annotations: []
            }
          ]
        }
      ],
      usage: {
        input_tokens: tokens,
        output_tokens: 20,
        total_tokens: tokens + 20,
        input_tokens_details: { cached_tokens: 0 },
        output_tokens_details: { reasoning_tokens: 0 }
      }
    })
  );
});

async function post(
  visitorId,
  question = '프로젝트를 소개해주세요.',
  requestId = randomUUID()
) {
  return fetch(`${appUrl}/api/chat`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${visitorId}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requestId, question })
  });
}

function get(visitorId) {
  return fetch(`${appUrl}/api/chat`, {
    headers: { Authorization: `Bearer ${visitorId}` }
  });
}

async function daily() {
  const [rows] = await db.execute(
    'SELECT * FROM chat_daily_usage WHERE day = ?',
    [day]
  );
  return rows[0];
}

async function seedConversation(
  visitorId,
  conversationDay,
  lastResponseId = null
) {
  const id = randomUUID();
  const hash = createHash('sha256').update(visitorId).digest('hex');
  await db.execute(
    'INSERT INTO chat_conversations (id, visitor_hash, day, last_response_id) VALUES (?, ?, ?, ?)',
    [id, hash, conversationDay, lastResponseId]
  );
  return id;
}

before(
  async () => {
    await new Promise((resolve) => provider.listen(0, '127.0.0.1', resolve));
    const address = provider.address();
    app = spawn(process.execPath, ['scripts/start-standalone.mjs'], {
      env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: '3117',
        HOSTNAME: '127.0.0.1',
        DATABASE_URL: databaseUrl,
        OPENAI_API_KEY: 'test-only-not-a-real-key',
        OPENAI_BASE_URL: `http://127.0.0.1:${address.port}/v1`
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });
    app.stdout.on('data', (chunk) => {
      output += chunk;
    });
    app.stderr.on('data', (chunk) => {
      output += chunk;
    });
    appExit = new Promise((resolve) => app.on('exit', resolve));
    for (let attempt = 0; attempt < 150; attempt++) {
      if (app.exitCode !== null) throw new Error('테스트 서버 시작 실패');
      try {
        if ((await get(randomUUID())).status === 200) break;
      } catch {
        /* 서버 준비 대기 */
      }
      if (attempt === 149) throw new Error('테스트 서버 시작 시간 초과');
      await delay(100);
    }
    db = await createConnection({
      uri: databaseUrl,
      timezone: 'Z',
      dateStrings: true
    });
  },
  { timeout: 30_000 }
);

beforeEach(async () => {
  mode = {};
  counted = [];
  generated = [];
  await db.query('DELETE FROM chat_turns');
  await db.query('DELETE FROM chat_conversations');
  await db.query('DELETE FROM chat_daily_usage');
});

after(async () => {
  if (db) {
    await db.query('DELETE FROM chat_turns');
    await db.query('DELETE FROM chat_conversations');
    await db.query('DELETE FROM chat_daily_usage');
    await db.end();
  }
  if (app && app.exitCode === null) {
    app.kill('SIGTERM');
    await appExit;
  }
  provider.closeAllConnections();
  await new Promise((resolve) => provider.close(resolve));
  if (output.includes('test-only-not-a-real-key'))
    throw new Error('API 키가 로그에 노출되었습니다.');
});

test('UUID 검증·교차 사이트·본문 크기 검증으로 잘못된 요청을 차단한다', async () => {
  assert.equal((await fetch(`${appUrl}/api/chat`)).status, 401);
  assert.equal((await get('invalid')).status, 401);
  const cross = await fetch(`${appUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Sec-Fetch-Site': 'cross-site' }
  });
  assert.equal(cross.status, 403);
  assert.equal((await post(randomUUID(), ' ')).status, 400);
  assert.equal((await post(randomUUID(), 'a'.repeat(25_000))).status, 413);
  assert.equal(generated.length, 0);
});

test('같은 날의 맥락·대화 복원·방문자 격리·실제 토큰 정산을 처리한다', async () => {
  const visitor = randomUUID();
  const first = await post(visitor);
  assert.equal(first.status, 200);
  assert.match(first.headers.get('cache-control'), /no-store/);
  assert.equal(
    (await first.json()).turns[0].answer,
    '포트폴리오 안내 답변입니다.'
  );
  const restored = await (await get(visitor)).json();
  assert.ok(
    Math.abs(Date.now() - new Date(restored.turns[0].createdAt).getTime()) <
      10_000
  );
  assert.equal(
    (
      await (
        await post(visitor, '방금 프로젝트는 어떤 기술을 사용했나요?')
      ).json()
    ).turns.length,
    2
  );
  assert.equal(generated[0].previous_response_id, null);
  assert.equal(generated[1].previous_response_id, 'resp_test_1');
  assert.equal(generated[1].model, 'gpt-5.6-luna');
  assert.equal(generated[1].max_output_tokens, 2048);
  assert.equal(generated[1].instructions, counted[1].instructions);
  assert.equal(
    counted[1].previous_response_id,
    generated[1].previous_response_id
  );
  assert.equal((await (await get(visitor)).json()).turns.length, 2);
  assert.equal((await (await get(randomUUID())).json()).turns.length, 0);
  assert.equal((await daily()).used_tokens, 340);
  assert.equal((await daily()).reserved_tokens, 0);
});

test('동일 요청 재전송은 저장된 결과만 반환한다', async () => {
  const visitor = randomUUID();
  const requestId = randomUUID();
  assert.equal((await post(visitor, '질문', requestId)).status, 200);
  assert.equal((await post(visitor, '질문', requestId)).status, 200);
  assert.equal(generated.length, 1);
  assert.equal((await post(randomUUID(), '질문', requestId)).status, 409);
  assert.equal((await post(visitor, '변경된 질문', requestId)).status, 409);
});

test('전날 대화는 보존하고 오늘의 맥락·사용량을 새로 시작한다', async () => {
  const visitor = randomUUID();
  const conversationId = await seedConversation(
    visitor,
    yesterday,
    'resp_yesterday'
  );
  await db.execute(
    'INSERT INTO chat_turns (id, conversation_id, question, answer, status, reserved_tokens) VALUES (?, ?, ?, ?, ?, ?)',
    [randomUUID(), conversationId, '어제 질문', '어제 답변', 'completed', 0]
  );
  await db.execute(
    'INSERT INTO chat_daily_usage (day, used_tokens) VALUES (?, ?)',
    [yesterday, limit]
  );
  const empty = await (await get(visitor)).json();
  assert.equal(empty.day, day);
  assert.equal(empty.turns.length, 0);
  assert.equal(empty.quotaReached, false);
  const next = new Date(`${day}T00:00:00.000Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  assert.equal(empty.resetAt, next.toISOString());
  assert.equal((await post(visitor)).status, 200);
  assert.equal(generated[0].previous_response_id, null);
  const [old] = await db.execute(
    'SELECT answer FROM chat_turns WHERE conversation_id = ?',
    [conversationId]
  );
  assert.equal(old[0].answer, '어제 답변');
  assert.equal((await daily()).used_tokens, 120);
});

test('동시 요청이 남은 예산을 중복 사용하지 않는다', async () => {
  await db.execute(
    'INSERT INTO chat_daily_usage (day, used_tokens) VALUES (?, ?)',
    [day, limit - reservation]
  );
  mode.delay = 250;
  const results = await Promise.all([post(randomUUID()), post(randomUUID())]);
  assert.deepEqual(results.map((result) => result.status).sort(), [200, 429]);
  const rejected = await results.find((result) => result.status === 429).json();
  assert.match(rejected.error.message, /jihyukboin@gmail.com/);
  assert.equal(generated.length, 1);
  const current = await daily();
  assert.ok(current.used_tokens + current.reserved_tokens <= limit);
});

test('같은 방문자의 처리 중 질문은 복원하지만 중복 생성은 차단한다', async () => {
  const visitor = randomUUID();
  mode.delay = 300;
  const first = post(visitor);
  while (generated.length === 0) await delay(10);
  const pending = await (await get(visitor)).json();
  assert.equal(pending.turns[0].status, 'pending');
  assert.equal((await post(visitor, '동시 질문')).status, 409);
  assert.equal((await first).status, 200);
  assert.equal(generated.length, 1);
});

test('명시적 거절은 예약량을 반환하고 응답 유실은 예약량을 보수적으로 집계한다', async () => {
  mode.errorStatus = 429;
  assert.equal((await post(randomUUID())).status, 502);
  assert.equal((await daily()).used_tokens, 0);
  assert.equal((await daily()).reserved_tokens, 0);
  mode = { disconnect: true };
  assert.equal((await post(randomUUID())).status, 502);
  assert.equal((await daily()).used_tokens, reservation);
  assert.equal((await daily()).reserved_tokens, 0);
});

test('중단된 요청을 복구해 예약 누수와 무기한 대기를 방지한다', async () => {
  const visitor = randomUUID();
  const conversationId = await seedConversation(visitor, day);
  await db.execute(
    'INSERT INTO chat_daily_usage (day, reserved_tokens) VALUES (?, ?)',
    [day, reservation]
  );
  await db.execute(
    'INSERT INTO chat_turns (id, conversation_id, question, reserved_tokens) VALUES (?, ?, ?, ?)',
    [randomUUID(), conversationId, '중단된 질문', reservation]
  );
  const history = await (await get(visitor)).json();
  assert.equal(history.turns[0].status, 'failed');
  assert.equal((await daily()).used_tokens, reservation);
  assert.equal((await daily()).reserved_tokens, 0);
  await get(visitor);
  assert.equal((await daily()).used_tokens, reservation);
});

test('일일 한도를 모두 사용하면 토큰 계산·생성 API를 호출하지 않는다', async () => {
  await db.execute(
    'INSERT INTO chat_daily_usage (day, used_tokens) VALUES (?, ?)',
    [day, limit]
  );
  const response = await post(randomUUID());
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get('retry-after')) > 0);
  assert.equal(counted.length, 0);
  assert.equal(generated.length, 0);
});

test('출력 제한으로 끝난 답변은 사용량을 집계하고 맥락 체인을 갱신하지 않는다', async () => {
  const visitor = randomUUID();
  mode.incomplete = true;
  const result = await (await post(visitor)).json();
  assert.equal(result.turns[0].status, 'failed');
  assert.ok(result.turns[0].answer);
  assert.equal((await daily()).used_tokens, 120);
  mode = {};
  assert.equal((await post(visitor, '다시 질문')).status, 200);
  assert.equal(generated[1].previous_response_id, null);
});

test('토큰 계산 중에도 새로고침용 조회에 처리 중 질문을 반환한다', async () => {
  const visitor = randomUUID();
  mode.countDelay = 250;
  const first = post(visitor);
  while (counted.length === 0) await delay(10);
  const history = await (await get(visitor)).json();
  assert.equal(history.turns[0].status, 'pending');
  assert.equal(generated.length, 0);
  assert.equal((await first).status, 200);
});
