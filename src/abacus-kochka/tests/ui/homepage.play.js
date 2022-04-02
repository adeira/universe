// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://kochka.com.mx');
  await expect(page).toHaveTitle(/^KOCHKA Café$/);
});
