// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { devices } = require('@playwright/test');

const config = {
  testDir: 'tests', // TODO: rename to something like UI tests
  testMatch: '**.play.js',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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
