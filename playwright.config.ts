import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

const chromiumPath = '/usr/bin/chromium';
const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:3108';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL,
    headless: true,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: existsSync(chromiumPath) ? { executablePath: chromiumPath, args: ['--no-sandbox'] } : undefined,
      },
    },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
  webServer: process.env.PLAYWRIGHT_TEST_BASE_URL ? undefined : {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3108',
    url: 'http://127.0.0.1:3108/diagnostico',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
