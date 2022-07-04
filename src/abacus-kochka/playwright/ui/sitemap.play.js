// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

test('navigation to our menu page from homepage', async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/sitemap.xml`);

  const numberOfPages = 11;

  // How to capture the sitemap better? (good for now just to know it works)
  await expect(page.locator('url > loc').count()).resolves.toBe(numberOfPages);
  await expect(page.locator('url > changefreq').count()).resolves.toBe(numberOfPages);
});
