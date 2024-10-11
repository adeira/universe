// @flow

/*::

declare const chrome: any; // TODO

*/

const styleSchemaID = document.createElement('style');
styleSchemaID.textContent = `
[data-sa-extension-schema-id] {
  position: relative;
}

.rossum-sa-extension-schema-id {
  position: absolute;
  top: 0;
  right: 0;
  color: red;
  font-size: 10px;
  transition: all 0.25s ease-in-out;
  opacity: .7;
  margin-inline: 3px;
}

.rossum-sa-extension-schema-id:hover {
  font-size: 16px;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  padding-inline: 3px;
}`;
document.head?.appendChild(styleSchemaID);

function displaySchemaID(node /*: $FlowFixMe */) {
  const span = document.createElement('span');
  span.className = 'rossum-sa-extension-schema-id';
  span.innerHTML = node.getAttribute('data-sa-extension-schema-id');
  node.appendChild(span);
}

function isElementNode(node /*: any */) /*: node is Element */ {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  return node.nodeType === Node.ELEMENT_NODE;
}

const htmlBodyElement = document.querySelector('body');
if (htmlBodyElement == null) {
  throw new Error('No body element found');
}

const observeHtmlBody = (
  options /*: { +schemaAnnotationsEnabled: boolean, +expandFormulasEnabled: boolean } */,
) => {
  const observer = new MutationObserver((mutations /*: Array<MutationRecord> */) => {
    const checkAddedNode = (addedNode /*: Node */) => {
      if (!isElementNode(addedNode)) {
        return;
      }

      if (options.schemaAnnotationsEnabled === true) {
        if (addedNode.hasAttribute('data-sa-extension-schema-id')) {
          displaySchemaID(addedNode);
        }
      }

      if (options.expandFormulasEnabled === true) {
        const button = document.querySelector('button[aria-label="Show source code"]');
        if (button != null) {
          button.click();
        }
      }

      for (const child of addedNode.children) {
        checkAddedNode(child);
      }
    };

    for (const mutation of mutations) {
      for (const addedNode of mutation.addedNodes) {
        checkAddedNode(addedNode);
      }
    }
  });

  observer.observe(htmlBodyElement, {
    subtree: true,
    childList: true,
  });
};

chrome.storage.local.get(['schemaAnnotationsEnabled', 'expandFormulasEnabled']).then((result) => {
  observeHtmlBody({
    schemaAnnotationsEnabled: result.schemaAnnotationsEnabled,
    expandFormulasEnabled: result.expandFormulasEnabled,
  });
});

/**
 * Adds functionality to enable or disable `devFeaturesEnabled`/`devDebugEnabled` flag in the actual local storage.
 *
 * This functionality is invoked from the popup window when toggling the checkboxes.
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // devFeaturesEnabled:
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

  // devDebugEnabled:
  if (message === 'get-dev-debug-enabled-value') {
    sendResponse(window.localStorage.getItem('devDebugEnabled') === 'true');
  }

  if (message === 'toggle-dev-debug-enabled') {
    if (window.localStorage.getItem('devDebugEnabled') === 'true') {
      window.localStorage.removeItem('devDebugEnabled');
    } else {
      window.localStorage.setItem('devDebugEnabled', true);
    }
    sendResponse(true);
  }
});
