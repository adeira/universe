/**
 * Adds functionality to enable or disable `devFeaturesEnabled` flag in the local storage.
 *
 * This functionality is invoked from the popup window when toggling the checkbox.
 *
 * @flow
 */

/*::

declare const chrome: any; // TODO

*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === 'get-dev-features-enabled-value') {
    sendResponse(window.localStorage.getItem('devFeaturesEnabled') === 'true');
  }

  if (message === 'toggle-dev-features-enabled') {
    if (window.localStorage.getItem('devFeaturesEnabled') === 'true') {
      window.localStorage.removeItem('devFeaturesEnabled');
    } else {
      window.localStorage.setItem('devFeaturesEnabled', true);
    }
    sendResponse(true);
  }
});
