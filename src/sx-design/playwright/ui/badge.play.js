// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
import { test, expect } from '@playwright/test';

const STORYBOOK_IFRAME = '#storybook-preview-iframe';

test('Badge component stories', async ({ page, baseURL }) => {
  await page.goto(baseURL);

  // Open the `Badge` submenu
  await page.locator('#components-badge').click();

  // Open default `Badge` story
  await page.locator('#components-badge--badge-default').click();
  await expect(page).toHaveURL(`${baseURL}?path=/story/components-badge--badge-default`);

  // Verify the default `Badge` text
  await page.frameLocator(STORYBOOK_IFRAME).locator('text=Badge - modify me').click();

  // Open showcase `Badge` story (submenu should be already open)
  await page.locator('#components-badge--badge-showcase').click();
  await expect(page).toHaveURL(`${baseURL}?path=/story/components-badge--badge-showcase`);

  // Verify the showcase `Badge` texts
  await page.frameLocator(STORYBOOK_IFRAME).locator('text=Badge').first().click();
  await page.frameLocator(STORYBOOK_IFRAME).locator('text=Badge').nth(1).click();
  await page.frameLocator(STORYBOOK_IFRAME).locator('text=Badge').nth(2).click();
  await page.frameLocator(STORYBOOK_IFRAME).locator('text=Badge').nth(3).click();
});
