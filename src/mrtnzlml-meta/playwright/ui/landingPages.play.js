// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

test('/til', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/^Today I Learned \| Martin Zlámal 🤓$/);
});

test('/til/2022/04/03/list-of-all-packages-installed-using-homebrew', async ({ page }) => {
  await page.goto('/til/2022/04/03/list-of-all-packages-installed-using-homebrew');
  await expect(page).toHaveTitle(
    /^List of all packages installed using Homebrew | Martin Zlámal 🤓$/,
  );
});

test('/til-articles', async ({ page }) => {
  await page.goto('/til-articles');
  await expect(page).toHaveTitle(/^Articles \| Martin Zlámal 🤓$/);
});

test('/til-articles/2021/09/30/fbt-deep-dive', async ({ page }) => {
  await page.goto('/til-articles/2021/09/30/fbt-deep-dive');
  await expect(page).toHaveTitle(/^FBT deep dive | Martin Zlámal 🤓$/);
});

test('/docs/flow', async ({ page }) => {
  await page.goto('/docs/flow');
  await expect(page).toHaveTitle(/^Flow all-in \| Martin Zlámal 🤓$/);
});
