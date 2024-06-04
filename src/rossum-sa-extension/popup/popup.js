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

function observeCheckbox(
  checkboxElementId /*: string */,
  defaultCheckboxValue /*: ?boolean */,
  onCheckboxChange /*: (() => void, number, boolean) => void */,
) {
  const checkboxElement = document.getElementById(checkboxElementId);
  if (checkboxElement != null && checkboxElement instanceof HTMLInputElement) {
    checkboxElement.checked = defaultCheckboxValue ?? false;
  }

  if (checkboxElement != null && checkboxElement instanceof HTMLInputElement) {
    checkboxElement.addEventListener('change', async function () {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      onCheckboxChange(
        () => {
          chrome.tabs.reload(tab.id);
        },
        tab.id,
        checkboxElement.checked,
      );
    });
  }
}

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

  chrome.tabs.sendMessage(tab.id, 'get-dev-features-enabled-value', function (response) {
    observeCheckbox('devFeaturesEnabled', response, (reloadCurrentTab, currentTabId) => {
      chrome.tabs.sendMessage(currentTabId, 'toggle-dev-features-enabled', function (response) {
        if (response === true) {
          reloadCurrentTab();
        }
      });
    });
  });

  chrome.tabs.sendMessage(tab.id, 'get-dev-debug-enabled-value', function (response) {
    observeCheckbox('devDebugEnabled', response, (reloadCurrentTab, currentTabId) => {
      chrome.tabs.sendMessage(currentTabId, 'toggle-dev-debug-enabled', function (response) {
        if (response === true) {
          reloadCurrentTab();
        }
      });
    });
  });

  chrome.tabs.sendMessage(tab.id, 'get-ac-4366-queue-settings-layout-v2', function (response) {
    observeCheckbox('legacySettings', response, (reloadCurrentTab, currentTabId) => {
      chrome.tabs.sendMessage(currentTabId, 'toggle-ac-4366-queue-settings-layout-v2', function (response) {
        if (response === true) {
          reloadCurrentTab();
        }
      });
    });
  });

  chrome.storage.local.get(['schemaAnnotationsEnabled']).then((result) => {
    observeCheckbox(
      'schemaAnnotationsEnabled',
      result.schemaAnnotationsEnabled,
      (reloadCurrentTab, _, currentCheckboxValue) => {
        chrome.storage.local
          .set({ schemaAnnotationsEnabled: currentCheckboxValue })
          .then(reloadCurrentTab);
      },
    );
  });

  chrome.storage.local.get(['netsuiteFieldNamesEnabled']).then((result) => {
    observeCheckbox(
      'netsuiteFieldNamesEnabled',
      result.netsuiteFieldNamesEnabled,
      (reloadCurrentTab, _, currentCheckboxValue) => {
        chrome.storage.local
          .set({ netsuiteFieldNamesEnabled: currentCheckboxValue })
          .then(reloadCurrentTab);
      },
    );
  });
});
