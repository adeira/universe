// @flow

/*::

declare const chrome: any; // TODO

*/

const styleSchemaID = document.createElement('style');
styleSchemaID.textContent = `
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
document.head?.appendChild(styleSchemaID);

function displaySchemaID(node /*: $FlowFixMe */) {
  const div = document.createElement('span');
  div.className = 'rossum-sa-extension-schema-id';
  div.innerHTML = node.getAttribute('data-schema-id');
  node.appendChild(div);
}

const observer = new MutationObserver((mutations) => {
  const checkAddedNode = (addedNode /*: $FlowFixMe */) => {
    if (addedNode?.hasAttribute('data-schema-id')) {
      displaySchemaID(addedNode);
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

chrome.storage.local.get(['schemaAnnotationsEnabled']).then((result) => {
  if (result.schemaAnnotationsEnabled === true) {
    observer.observe(htmlBodyElement, {
      subtree: true,
      childList: true,
    });
  }
});

chrome.storage.onChanged.addListener(function (changes, areaName) {
  if (areaName === 'local' && changes.schemaAnnotationsEnabled != null) {
    if (changes.schemaAnnotationsEnabled.newValue === false) {
      // remove all the schema IDs
      const elements = document.getElementsByClassName('rossum-sa-extension-schema-id');
      while (elements.length > 0) {
        elements[0].parentNode?.removeChild(elements[0]);
      }

      observer.disconnect();
    } else {
      // show all the schema IDs
      const elements = document.querySelectorAll('[data-schema-id]');
      elements.forEach((element) => displaySchemaID(element));

      observer.observe(htmlBodyElement, {
        subtree: true,
        childList: true,
      });
    }
  }
});
