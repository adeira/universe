// @flow

/*::

declare var chrome: any; // TODO

*/

chrome.tabs.onCreated.addListener((createdTab) => {
  if (createdTab.pendingUrl === 'chrome://newtab/') {
    chrome.tabs.update(createdTab.id, {
      url: 'https://tools.adeira.io/newtab',
    });
  }
});
