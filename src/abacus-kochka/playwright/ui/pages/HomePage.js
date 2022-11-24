// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('@playwright/test');

const { MainNavigationPage } = require('./MainNavigationPage');

/*::
const { AdoptPage } = require('./AdoptPage');
const { DonatePage } = require('./DonatePage');
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

  visitAdoptPage() /*: Promise<AdoptPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitAdoptPage();
  }

  visitShopPage() /*: Promise<ShopPage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitShopPage();
  }

  visitDonatePage() /*: Promise<DonatePage> */ {
    const mainNavigationPage = new MainNavigationPage(this.page, this.baseURL);
    return mainNavigationPage.visitDonatePage();
  }
};
