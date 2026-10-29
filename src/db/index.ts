import 'server-only';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import * as schema from './schema';

function createDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL 환경 변수가 필요합니다.');

  const pool = createPool({
    uri: url,
    connectionLimit: 5,
    connectTimeout: 3000,
    charset: 'utf8mb4',
    timezone: 'Z'
  });

  return drizzle({ client: pool, schema, mode: 'default' });
}

const globalForDb = globalThis as typeof globalThis & {
  portfolioDb?: ReturnType<typeof createDatabase>;
};

// 개발 중 모듈을 다시 로드해도 커넥션 풀이 계속 늘어나지 않게 합니다.
export function getDb() {
  return (globalForDb.portfolioDb ??= createDatabase());
}
