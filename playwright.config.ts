import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', fullyParallel: false, workers: 1, timeout: 60_000,
  use: { baseURL: 'http://127.0.0.1:3920', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev -- --hostname 127.0.0.1 --port 3920', url: 'http://127.0.0.1:3920/fr', reuseExistingServer: false, timeout: 120_000,
    env: { RESEND_API_KEY: '', RESEND_FROM_EMAIL: '', CONTACT_EMAIL: '' } },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
