// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('404', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/en-us/404-playwright-uitest`);
  await expect(page.locator('h1', { hasText: 'Page Not Found' })).toBeVisible();
});
