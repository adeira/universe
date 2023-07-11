// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that the index page works', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/^Abacus Tools$/);
});
