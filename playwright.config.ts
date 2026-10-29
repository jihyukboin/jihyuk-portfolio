import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:3108',
    trace: 'retain-on-failure'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run start:standalone',
    url: 'http://127.0.0.1:3108',
    env: { PORT: '3108', HOSTNAME: '127.0.0.1' },
    reuseExistingServer: false
  }
});
