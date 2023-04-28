// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

test('that /til works', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/^Today I Learned \| Martin Zlámal 🤓$/);
});

test('that /til-articles works', async ({ page }) => {
  await page.goto('/til-articles');
  await expect(page).toHaveTitle(/^Articles \| Martin Zlámal 🤓$/);
});

test('that /docs/flow works', async ({ page }) => {
  await page.goto('/docs/flow');
  await expect(page).toHaveTitle(/^Flow all-in \| Martin Zlámal 🤓$/);
});
