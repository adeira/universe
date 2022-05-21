// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { devices } = require('@playwright/test');

const config = {
  testDir: 'playwright',
  outputDir: 'playwright/test-results',
  testMatch: '**.play.js',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  webServer: {
    command: process.env.CI ? 'yarn run build && yarn run start' : 'yarn run dev',
    port: 5001,
    timeout: 120 * 1000, // milliseconds
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'Mobile Chrome',
      use: devices['Pixel 5'],
    },
  ],
};

module.exports = config;
