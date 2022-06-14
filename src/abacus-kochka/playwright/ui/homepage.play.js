// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { test } = require('@playwright/test');

const { HomePage } = require('./pages/HomePage');

test('navigation to our menu page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitMenuPage();
});

test('navigation to our adopt page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitAdoptPage();
});

test('navigation to our rules page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitRulesPage();
});

test('navigation to our shop page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitShopPage();
});

test('navigation to our jobs page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitJobsPage();
});

test('navigation to our contribute page from homepage', async ({ page, isMobile, baseURL }) => {
  test.skip(isMobile === true);

  const homepage = new HomePage(page, baseURL);
  await homepage.goto();
  await homepage.visitContributePage();
});
