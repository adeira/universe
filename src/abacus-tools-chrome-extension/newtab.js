// @flow

/*::

declare const chrome: any; // TODO

*/

chrome.tabs.getCurrent((tab) => {
  chrome.tabs.update(tab.id, {
    url: 'https://tools.adeira.io/newtab',
  });
});
