// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { test, expect } = require('@playwright/test');

const { HomePage } = require('./pages/HomePage');

test('basic layout structure', async ({ page, baseURL }) => {
  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await expect(homepage.page).toHaveTitle(/^KOCHKA Café$/);
});

test('navigation to our menu page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openMenuPage();
});

test('navigation to our adopt page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openAdoptPage();
});

test('navigation to our rules page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openRulesPage();
});

test('navigation to our shop page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openShopPage();
});

test('navigation to our jobs page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openJobsPage();
});

test('navigation to our contribute page', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.openContributePage();
});
