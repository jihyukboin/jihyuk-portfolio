import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import { and, asc, eq, sql } from 'drizzle-orm';
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import type { RowDataPacket } from 'mysql2/promise';
import type { Response } from 'openai/resources/responses/responses';
import { getDb } from '@/db';
import * as schema from '@/db/schema';
import {
  DAILY_TOKEN_LIMIT,
  MAX_OUTPUT_TOKENS,
  QUOTA_MESSAGE,
  RESPONSE_ERROR_MESSAGE,
  nextUtcMidnight,
  utcDay,
  type ChatSnapshot,
  type QuestionInput
} from './contracts';
import {
  countInputTokens,
  createResponse,
  definitelyUnbilled,
  responseInput
} from './openai';

const {
  chatConversations: conversations,
  chatTurns: turns,
  chatDailyUsage: usage
} = schema;
type ChatDb = MySql2Database<typeof schema>;

export class ChatError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public resetAt?: string
  ) {
    super(message);
  }
}

function quotaError(day: string) {
  return new ChatError('DAILY_LIMIT', QUOTA_MESSAGE, 429, nextUtcMidnight(day));
}

async function withVisitor<T>(
  visitorId: string,
  requireLock: boolean,
  action: (db: ChatDb, visitorHash: string, locked: boolean) => Promise<T>
) {
  const visitorHash = createHash('sha256').update(visitorId).digest('hex');
  const connection = await getDb().$client.getConnection();
  const lockName = `chat:${visitorHash.slice(0, 59)}`;
  let locked = false;
  try {
    // mysql2의 timezone은 값 해석 옵션이므로 MySQL 세션 시간대도 명시합니다.
    await connection.query("SET SESSION time_zone = '+00:00'");
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT GET_LOCK(?, 0) AS acquired',
      [lockName]
    );
    locked = Number(rows[0].acquired) === 1;
    if (requireLock && !locked) {
      throw new ChatError(
        'BUSY',
        '이전 답변을 기다린 후 다시 질문해주세요.',
        409
      );
    }
    return await action(
      drizzle({ client: connection, schema, mode: 'default' }),
      visitorHash,
      locked
    );
  } finally {
    try {
      if (locked)
        await connection.execute('SELECT RELEASE_LOCK(?)', [lockName]);
    } finally {
      connection.release();
    }
  }
}

// 방문자 잠금을 얻었다면 이전 pending 요청은 더 이상 실행 중이지 않습니다.
// 프로세스 중단·응답 유실로 실제 과금량을 모르면 예약 전량을 보수적으로 집계합니다.
async function recoverInterrupted(db: ChatDb, visitorHash: string) {
  const interrupted = await db
    .select({ id: turns.id, day: conversations.day })
    .from(turns)
    .innerJoin(conversations, eq(turns.conversationId, conversations.id))
    .where(
      and(
        eq(conversations.visitorHash, visitorHash),
        eq(turns.status, 'pending')
      )
    );
  for (const turn of interrupted) {
    await settleTurn(db, turn.id, turn.day, null, undefined);
  }
}

async function snapshot(
  db: ChatDb,
  visitorHash: string
): Promise<ChatSnapshot> {
  const day = utcDay();
  const [daily] = await db.select().from(usage).where(eq(usage.day, day));
  const messages = await db
    .select({
      id: turns.id,
      question: turns.question,
      answer: turns.answer,
      status: turns.status,
      errorMessage: turns.errorMessage,
      createdAt: turns.createdAt
    })
    .from(turns)
    .innerJoin(conversations, eq(turns.conversationId, conversations.id))
    .where(
      and(
        eq(conversations.visitorHash, visitorHash),
        eq(conversations.day, day)
      )
    )
    .orderBy(asc(turns.createdAt), asc(turns.id));
  return {
    day,
    resetAt: nextUtcMidnight(day),
    turns: messages.map((turn) => ({
      ...turn,
      createdAt: turn.createdAt.toISOString()
    })),
    quotaReached:
      (daily?.usedTokens ?? 0) +
        (daily?.reservedTokens ?? 0) +
        MAX_OUTPUT_TOKENS >
      DAILY_TOKEN_LIMIT
  };
}

export function getChat(visitorId: string) {
  return withVisitor(visitorId, false, async (db, visitorHash, locked) => {
    if (locked) await recoverInterrupted(db, visitorHash);
    return snapshot(db, visitorHash);
  });
}

async function settleTurn(
  db: ChatDb,
  requestId: string,
  day: string,
  response: Response | null,
  error: unknown,
  unbilled = false
) {
  await db.transaction(async (tx) => {
    const [turn] = await tx
      .select()
      .from(turns)
      .where(eq(turns.id, requestId))
      .for('update');
    if (!turn || turn.status !== 'pending') return;

    const actual = response?.usage;
    const knownUsage =
      actual &&
      Number.isSafeInteger(actual.total_tokens) &&
      actual.total_tokens >= 0;
    const charged = knownUsage
      ? actual.total_tokens
      : unbilled || definitelyUnbilled(error)
        ? 0
        : turn.reservedTokens;
    const answer = response?.output_text?.trim() || null;
    const completed = response?.status === 'completed' && answer !== null;

    await tx
      .update(usage)
      .set({
        reservedTokens: sql`${usage.reservedTokens} - ${turn.reservedTokens}`,
        usedTokens: sql`${usage.usedTokens} + ${charged}`
      })
      .where(eq(usage.day, day));
    await tx
      .update(turns)
      .set({
        status: completed ? 'completed' : 'failed',
        answer,
        errorMessage: completed ? null : RESPONSE_ERROR_MESSAGE,
        inputTokens: actual?.input_tokens ?? null,
        outputTokens: actual?.output_tokens ?? null,
        chargedTokens: charged
      })
      .where(eq(turns.id, requestId));
    if (completed && response) {
      await tx
        .update(conversations)
        .set({ lastResponseId: response.id })
        .where(eq(conversations.id, turn.conversationId));
    }
  });
}

export function askChat(visitorId: string, input: QuestionInput) {
  return withVisitor(visitorId, true, async (db, visitorHash) => {
    await recoverInterrupted(db, visitorHash);
    const day = utcDay();

    const [existing] = await db
      .select({
        visitorHash: conversations.visitorHash,
        question: turns.question
      })
      .from(turns)
      .innerJoin(conversations, eq(turns.conversationId, conversations.id))
      .where(eq(turns.id, input.requestId));
    if (existing) {
      if (
        existing.visitorHash !== visitorHash ||
        existing.question !== input.question
      ) {
        throw new ChatError(
          'INVALID_REQUEST',
          '다시 질문을 전송해주세요.',
          409
        );
      }
      return snapshot(db, visitorHash);
    }

    const [daily] = await db.select().from(usage).where(eq(usage.day, day));
    if (
      (daily?.usedTokens ?? 0) + (daily?.reservedTokens ?? 0) >=
      DAILY_TOKEN_LIMIT
    ) {
      throw quotaError(day);
    }

    await db
      .insert(conversations)
      .values({ id: randomUUID(), visitorHash, day })
      .onDuplicateKeyUpdate({ set: { day } });
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(
        and(
          eq(conversations.visitorHash, visitorHash),
          eq(conversations.day, day)
        )
      );
    const modelInput = responseInput(
      input.question,
      conversation.lastResponseId
    );
    // 토큰 계산 도중 새로고침해도 처리 중인 질문을 복원할 수 있게 먼저 저장합니다.
    await db.insert(turns).values({
      id: input.requestId,
      conversationId: conversation.id,
      question: input.question,
      reservedTokens: 0
    });

    // 일일 예산만 짧은 트랜잭션으로 잠그고 외부 API는 트랜잭션 밖에서 호출합니다.
    try {
      const inputTokens = await countInputTokens(modelInput);
      const reserved = inputTokens + MAX_OUTPUT_TOKENS;
      await db.transaction(async (tx) => {
        await tx
          .insert(usage)
          .values({ day })
          .onDuplicateKeyUpdate({ set: { day } });
        const [current] = await tx
          .select()
          .from(usage)
          .where(eq(usage.day, day))
          .for('update');
        if (
          current.usedTokens + current.reservedTokens + reserved >
          DAILY_TOKEN_LIMIT
        ) {
          throw quotaError(day);
        }
        await tx
          .update(usage)
          .set({ reservedTokens: sql`${usage.reservedTokens} + ${reserved}` })
          .where(eq(usage.day, day));
        await tx
          .update(turns)
          .set({ reservedTokens: reserved })
          .where(eq(turns.id, input.requestId));
      });
    } catch (error) {
      await settleTurn(db, input.requestId, day, null, undefined, true);
      if (error instanceof ChatError) throw error;
      throw new ChatError('PREPARATION_FAILED', RESPONSE_ERROR_MESSAGE, 503);
    }

    // 토큰을 세는 동안 날짜가 바뀌면 이전 날짜의 맥락으로 모델을 호출하지 않습니다.
    if (utcDay() !== day) {
      await settleTurn(db, input.requestId, day, null, undefined, true);
      throw new ChatError(
        'DAY_CHANGED',
        '새 대화를 불러온 뒤 다시 전송해주세요.',
        409
      );
    }

    let response: Response;
    try {
      response = await createResponse(modelInput);
    } catch (error) {
      await settleTurn(db, input.requestId, day, null, error);
      throw new ChatError('RESPONSE_FAILED', RESPONSE_ERROR_MESSAGE, 502);
    }
    await settleTurn(db, input.requestId, day, response, undefined);
    return snapshot(db, visitorHash);
  });
}
