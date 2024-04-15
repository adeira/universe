// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

test('that storybook works', async ({ page }) => {
  // This is here just to make sure that our Storybook works as it gets broken very often.
  await page.goto('/?path=/settings/about');
  await expect(page).toHaveTitle(/^Storybook$/);
});
