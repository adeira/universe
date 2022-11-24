// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

const { AdoptPage } = require('./AdoptPage');
const { DonatePage } = require('./DonatePage');
const { RulesPage } = require('./RulesPage');
const { ShopPage } = require('./ShopPage');

/*::
import type { Page } from '../../Page.flow.js';
*/

exports.MainNavigationPage = class MainNavigationPage {
  /*::
  declare page: Page;
  declare baseURL: string;
  */

  constructor(page /*: Page */, baseURL /*: string */) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async visitAdoptPage() /*: Promise<AdoptPage> */ {
    await this.page.locator('a', { hasText: 'Adopt' }).click();
    const adoptPage = new AdoptPage(this.page, this.baseURL);

    await expect(adoptPage.page).toHaveTitle(/^Adopt a cat · KOCHKA Café$/);
    await expect(adoptPage.page.locator('h1', { hasText: 'Adopt a cat' })).toBeVisible();

    return adoptPage;
  }

  async visitRulesPage() /*: Promise<RulesPage> */ {
    await this.page.locator('a', { hasText: 'Rules' }).click();
    const rulesPage = new RulesPage(this.page, this.baseURL);

    await expect(rulesPage.page).toHaveTitle(/^Café rules · KOCHKA Café$/);
    await expect(rulesPage.page.locator('h1', { hasText: 'Café rules' })).toBeVisible();

    return rulesPage;
  }

  async visitShopPage() /*: Promise<ShopPage> */ {
    await this.page.locator('a', { hasText: 'Shop' }).click();
    const shopPage = new ShopPage(this.page, this.baseURL);

    await expect(shopPage.page).toHaveTitle(/^Online shop · KOCHKA Café$/);
    await expect(shopPage.page.locator('h1', { hasText: 'Online shop' })).toBeVisible();

    return shopPage;
  }

  async visitDonatePage() /*: Promise<DonatePage> */ {
    await this.page.locator('a', { hasText: 'Donate' }).click();
    const contributePage = new DonatePage(this.page, this.baseURL);

    await expect(contributePage.page).toHaveTitle(/^Donate · KOCHKA Café$/);
    await expect(contributePage.page.locator('h1', { hasText: 'Donate' })).toBeVisible();

    return contributePage;
  }
};
