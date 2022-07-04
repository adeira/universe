// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that homepage works', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/^Abacus$/);
});
