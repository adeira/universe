// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('that storybook works', async ({ page, baseURL }) => {
  // This is here just to make sure that our Storybook works as it gets broken very often.
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/^Styleguide \/ Colors - Page ⋅ Storybook$/);
});
