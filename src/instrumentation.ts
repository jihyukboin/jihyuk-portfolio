export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // DB를 설정하지 않은 정적 포트폴리오 빌드·미리보기도 지원합니다.
    // 설정된 DB의 연결·마이그레이션이 실패하면 서버 시작을 중단합니다.
    if (!process.env.DATABASE_URL) {
      console.info('[db] DATABASE_URL 미설정: DB 초기화를 생략합니다.');
      return;
    }

    const { migrateDatabase } = await import('./db/migrate.mts');
    try {
      await migrateDatabase();
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'DB 초기화 실패.');
      // Next.js가 초기화 오류 후 프로세스를 유지하는 경우에도 종료합니다.
      process.exit(1);
    }
  }
}
