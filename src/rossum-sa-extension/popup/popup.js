// @flow

/*::

declare const chrome: any; // TODO

*/

// 1. load default values for the settings checkboxes:
document.addEventListener('DOMContentLoaded', async function () {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
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

  // 1.2. get the actual value of `schemaAnnotationsEnabled` and set it to the checkbox:
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
