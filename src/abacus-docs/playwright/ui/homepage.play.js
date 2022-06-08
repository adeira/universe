// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that docs homepage works', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/^Adeira DOC | Welcome to KOCHKA Café!$/);
});
