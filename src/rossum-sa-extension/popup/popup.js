// @flow

/*::

declare const chrome: any; // TODO

*/

function combineUrlWithCustomPath(
  originalUrl /*: string */,
  customPath /*: string */,
) /*: string */ {
  const baseUrlMatch = originalUrl.match(/^https?:\/\/[^/?#]+/);
  if (baseUrlMatch) {
    const [baseUrl] = baseUrlMatch;
    const normalizedPath = customPath.startsWith('/') ? customPath : `/${customPath}`;
    return baseUrl + normalizedPath;
  }
  return originalUrl;
}

// 1. load default values for the settings checkboxes (+ handle button clicks):
document.addEventListener('DOMContentLoaded', async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const masterDataHubButton = document.getElementById('masterDataHub');
  masterDataHubButton?.addEventListener('click', () => {
    chrome.tabs.create({
      // Note that this is currently ignoring whether the tab URL is Rossum related or not (so on some websites this might redirect to 404).
      url: combineUrlWithCustomPath(tab.url, '/svc/data-matching/web/management'),
      index: tab.index + 1,
    });
  });

  // 1.1. get the actual value of `devFeaturesEnabled` and set it to the checkbox:
  chrome.tabs.sendMessage(tab.id, 'get-dev-features-enabled-value', function (response) {
    const devFeaturesEnabledElement = document.getElementById('devFeaturesEnabled');
    if (
      devFeaturesEnabledElement != null &&
      devFeaturesEnabledElement instanceof HTMLInputElement
    ) {
      devFeaturesEnabledElement.checked = response;
    }
  });

  // 1.2. get the actual value of `devDebugEnabled` and set it to the checkbox:
  chrome.tabs.sendMessage(tab.id, 'get-dev-debug-enabled-value', function (response) {
    const devDebugEnabledElement = document.getElementById('devDebugEnabled');
    if (devDebugEnabledElement != null && devDebugEnabledElement instanceof HTMLInputElement) {
      devDebugEnabledElement.checked = response;
    }
  });

  // 1.3. get the actual value of `schemaAnnotationsEnabled` and set it to the checkbox:
  chrome.storage.local.get(['schemaAnnotationsEnabled']).then((result) => {
    const schemaAnnotationsEnabledElement = document.getElementById('schemaAnnotationsEnabled');
    if (
      schemaAnnotationsEnabledElement != null &&
      schemaAnnotationsEnabledElement instanceof HTMLInputElement
    ) {
      schemaAnnotationsEnabledElement.checked = result.schemaAnnotationsEnabled ?? false;
    }
  });
});

// 2. add event listeners to the checkboxes:
const devFeaturesEnabledElement = document.getElementById('devFeaturesEnabled');
if (devFeaturesEnabledElement != null && devFeaturesEnabledElement instanceof HTMLInputElement) {
  devFeaturesEnabledElement.addEventListener('change', async function () {
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
}

const devDebugEnabledElement = document.getElementById('devDebugEnabled');
if (devDebugEnabledElement != null && devDebugEnabledElement instanceof HTMLInputElement) {
  devDebugEnabledElement.addEventListener('change', async function () {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, 'toggle-dev-debug-enabled', function (response) {
      if (response === true) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
}

const schemaAnnotationsEnabledElement = document.getElementById('schemaAnnotationsEnabled');
if (
  schemaAnnotationsEnabledElement != null &&
  schemaAnnotationsEnabledElement instanceof HTMLInputElement
) {
  schemaAnnotationsEnabledElement.addEventListener('change', function () {
    chrome.storage.local
      .set({ schemaAnnotationsEnabled: schemaAnnotationsEnabledElement.checked })
      .then(() => {
        // noop
      });
  });
}
