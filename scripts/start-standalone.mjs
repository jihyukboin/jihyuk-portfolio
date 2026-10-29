import { cpSync } from 'node:fs';

// OCI 배포와 동일하게 정적 파일을 포함한 standalone 서버를 실행한다.
cpSync('public', '.next/standalone/public', { recursive: true });
cpSync('.next/static', '.next/standalone/.next/static', { recursive: true });
await import('../.next/standalone/server.js');
