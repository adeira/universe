// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

const { AdoptPage } = require('./AdoptPage');
const { ContributePage } = require('./ContributePage');
const { JobsPage } = require('./JobsPage');
const { MenuPage } = require('./MenuPage');
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

  async visitMenuPage() /*: Promise<MenuPage> */ {
    await this.page.locator('a', { hasText: 'Menu' }).click();
    const menuPage = new MenuPage(this.page, this.baseURL);

    await expect(menuPage.page).toHaveTitle(/^Café menu · KOCHKA Café$/);
    await expect(menuPage.page.locator('h1', { hasText: 'Café menu' })).toBeVisible();

    return menuPage;
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

  async visitJobsPage() /*: Promise<JobsPage> */ {
    await this.page.locator('a', { hasText: 'Jobs' }).click();
    const jobsPage = new JobsPage(this.page, this.baseURL);

    await expect(jobsPage.page).toHaveTitle(/^Open positions · KOCHKA Café$/);
    await expect(jobsPage.page.locator('h1', { hasText: 'Open positions' })).toBeVisible();

    return jobsPage;
  }

  async visitContributePage() /*: Promise<ContributePage> */ {
    await this.page.locator('a', { hasText: 'Contribute' }).click();
    const contributePage = new ContributePage(this.page, this.baseURL);

    await expect(contributePage.page).toHaveTitle(/^Voluntary contribution · KOCHKA Café$/);
    await expect(
      contributePage.page.locator('h1', { hasText: 'Voluntary contribution' }),
    ).toBeVisible();

    return contributePage;
  }
};
