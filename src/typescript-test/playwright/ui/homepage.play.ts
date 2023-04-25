import { test, expect } from '@playwright/test';

test('that homepage works', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/^Create Next App$/);
});
