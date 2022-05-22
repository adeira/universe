// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('visual, code:ALT', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/iframe.html?args=code:ALT&id=components-kbd`);
  await expect(page.locator('#root')).toHaveScreenshot();
});

test('visual, code:CTRL', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/iframe.html?args=code:CTRL&id=components-kbd`);
  await expect(page.locator('#root')).toHaveScreenshot();
});

test('visual, code:SHIFT', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/iframe.html?args=code:SHIFT&id=components-kbd`);
  await expect(page.locator('#root')).toHaveScreenshot();
});
