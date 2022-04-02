// eslint-disable-next-line ft-flow/require-valid-file-annotation,import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async goto() {
    await this.page.goto(this.baseURL);
  }

  async openMenuPage() {
    await this.page.locator('a', { hasText: 'Menu' }).click();
    await expect(this.page.locator('h1', { hasText: 'Café menu' })).toBeVisible();
  }

  async openAdoptPage() {
    await this.page.locator('a', { hasText: 'Adopt' }).click();
    await expect(this.page.locator('h1', { hasText: 'Adopt a cat' })).toBeVisible();
  }

  async openRulesPage() {
    await this.page.locator('a', { hasText: 'Rules' }).click();
    await expect(this.page.locator('h1', { hasText: 'Café rules' })).toBeVisible();
  }

  async openShopPage() {
    await this.page.locator('a', { hasText: 'Shop' }).click();
    await expect(this.page.locator('h1', { hasText: 'Online shop' })).toBeVisible();
  }

  async openJobsPage() {
    await this.page.locator('a', { hasText: 'Jobs' }).click();
    await expect(this.page.locator('h1', { hasText: 'Open positions' })).toBeVisible();
  }

  async openContributePage() {
    await this.page.locator('a', { hasText: 'Contribute' }).click();
    await expect(this.page.locator('h1', { hasText: 'Voluntary contribution' })).toBeVisible();
  }
};
