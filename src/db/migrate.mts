import { setTimeout } from 'node:timers/promises';
import { join } from 'node:path';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection, type RowDataPacket } from 'mysql2/promise';

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String(error.code);
  }
  return 'UNKNOWN';
}

async function connect(url: string) {
  const retryable = new Set([
    'ECONNREFUSED',
    'ECONNRESET',
    'ETIMEDOUT',
    'EAI_AGAIN',
    'PROTOCOL_CONNECTION_LOST'
  ]);

  for (let attempt = 1; ; attempt++) {
    try {
      return await createConnection({
        uri: url,
        connectTimeout: 3000,
        charset: 'utf8mb4',
        timezone: 'Z'
      });
    } catch (error) {
      const code = errorCode(error);
      if (attempt >= 10 || !retryable.has(code)) {
        throw new Error(`MySQL 연결에 실패했습니다 (${code}).`);
      }
      console.info(`[db] MySQL 연결 대기 중 (${attempt}/10).`);
      await setTimeout(1000);
    }
  }
}

export async function migrateDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL 환경 변수가 필요합니다.');

  // 마이그레이션과 잠금은 같은 전용 연결에서 실행합니다.
  const connection = await connect(url);
  let locked = false;

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT GET_LOCK(CONCAT(DATABASE(), ':migrate'), 30) AS acquired"
    );
    locked = Number(rows[0].acquired) === 1;
    if (!locked) throw new Error('마이그레이션 잠금을 획득하지 못했습니다.');

    await migrate(drizzle(connection), {
      migrationsFolder: join(process.cwd(), 'drizzle')
    });
    console.info('[db] MySQL 연결 및 마이그레이션 완료.');
  } catch (error) {
    // 드라이버 오류에 포함될 수 있는 접속 정보와 SQL은 출력하지 않습니다.
    throw new Error(`DB 마이그레이션에 실패했습니다 (${errorCode(error)}).`);
  } finally {
    try {
      if (locked) {
        await connection.query(
          "SELECT RELEASE_LOCK(CONCAT(DATABASE(), ':migrate'))"
        );
      }
    } finally {
      await connection.end();
    }
  }
}
