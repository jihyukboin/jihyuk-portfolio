import nextEnv from '@next/env';
import { migrateDatabase } from '../src/db/migrate.mts';

nextEnv.loadEnvConfig(process.cwd());

try {
  await migrateDatabase();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
