// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { devices } = require('@playwright/test');

const config = {
  testDir: 'tests', // TODO: rename to something like UI tests
  testMatch: '**.play.js',
  forbidOnly: !!process.env.CI,
  // $FlowFixMe[sketchy-null-string]
  retries: ((process.env.CI ? 2 : 0): number),
  use: {
    trace: 'on-first-retry',
    // screenshot: 'only-on-failure',
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
