// @flow

/*::

declare const chrome: any; // TODO

*/

document.getElementById('toggle')?.addEventListener('click', async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  chrome.tabs.sendMessage(tab.id, 'toggle-dev-features-enabled', function (response) {
    if (response === true) {
      chrome.tabs.reload(tab.id);
    }
  });
});
