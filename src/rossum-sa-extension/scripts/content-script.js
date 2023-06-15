// @flow

const style = document.createElement('style');
style.textContent = `
.rossum-sa-extension-schema-id {
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: 8px;
  transition: font-size 0.3s ease-in-out;
}

.rossum-sa-extension-schema-id:hover {
  font-size: 16px;
}`;
document.head?.appendChild(style);

const observer = new MutationObserver((mutations) => {
  const checkAddedNode = (addedNode /*: $FlowFixMe */) => {
    if (addedNode.hasAttribute('data-schema-id')) {
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
