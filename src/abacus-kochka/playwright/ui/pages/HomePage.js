// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

const { MainNavigationPage } = require('./MainNavigationPage');

/*::
const { AdoptPage } = require('./AdoptPage');
const { ContributePage } = require('./ContributePage');
const { JobsPage } = require('./JobsPage');
const { MenuPage } = require('./MenuPage');
const { RulesPage } = require('./RulesPage');
const { ShopPage } = require('./ShopPage');

import type { Page } from '../../Page.flow';
*/

exports.HomePage = class HomePage {
  /*::
  declare page: Page;
  declare baseURL: string;
  */

  constructor(page /*: Page */, baseURL /*: string */) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async goto() {
    await this.page.goto(this.baseURL);
    await expect(this.page).toHaveTitle(/^KOCHKA Café$/);
  }

  visitMenuPage() /*: Promise<MenuPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitMenuPage();
  }

  visitAdoptPage() /*: Promise<AdoptPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitAdoptPage();
  }

  visitRulesPage() /*: Promise<RulesPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitRulesPage();
  }

  visitShopPage() /*: Promise<ShopPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitShopPage();
  }

  visitJobsPage() /*: Promise<JobsPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitJobsPage();
  }

  visitContributePage() /*: Promise<ContributePage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitContributePage();
  }
};
