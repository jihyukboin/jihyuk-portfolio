import { cpSync } from 'node:fs';

// SQL 파일은 Next.js의 JS 의존성 추적에 맡기지 않고 명시적으로 포함합니다.
cpSync('drizzle', '.next/standalone/drizzle', { recursive: true });
