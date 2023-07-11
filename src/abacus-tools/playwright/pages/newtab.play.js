// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that the newtab page works', async ({ page }) => {
  await page.goto('/newtab');
  await expect(page).toHaveTitle(/^Newtab | Abacus Tools$/);
});
