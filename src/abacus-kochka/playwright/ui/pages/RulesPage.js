// @flow strict

/*::
import type { Page } from '../../Page.flow.js';
*/

exports.RulesPage = class RulesPage {
  /*::
  declare page: Page;
  declare baseURL: string;
  */

  constructor(page /*: Page */, baseURL /*: string */) {
    this.page = page;
    this.baseURL = baseURL;
  }
};
