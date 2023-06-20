// @flow

/*::

declare const chrome: any; // TODO

*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === 'toggle-dev-features-enabled') {
    if (window.localStorage.getItem('devFeaturesEnabled') === 'true') {
      window.localStorage.removeItem('devFeaturesEnabled');
    } else {
      window.localStorage.setItem('devFeaturesEnabled', true);
    }
    sendResponse(true);
  }
});

// ---

const style = document.createElement('style');
style.textContent = `
.rossum-sa-extension-schema-id {
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: 8px;
  transition: all 0.3s ease-in-out;
  opacity: .7;
}

.rossum-sa-extension-schema-id:hover {
  font-size: 16px;
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  padding-inline: 3px;
}`;
document.head?.appendChild(style);

const observer = new MutationObserver((mutations) => {
  const checkAddedNode = (addedNode /*: $FlowFixMe */) => {
    if (addedNode?.hasAttribute('data-schema-id')) {
      const div = document.createElement('span');
      div.className = 'rossum-sa-extension-schema-id';
      div.innerHTML = addedNode.getAttribute('data-schema-id');
      addedNode.appendChild(div);
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

const htmlBodyElement = document.querySelector('body');
if (htmlBodyElement == null) {
  throw new Error('No body element found');
}
observer.observe(htmlBodyElement, {
  subtree: true,
  childList: true,
});
