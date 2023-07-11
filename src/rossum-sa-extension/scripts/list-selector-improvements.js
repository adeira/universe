// @flow

const listSelectorImprovements = document.createElement('style');

// TODO: apply only on /settings/extensions/logs (?)
listSelectorImprovements.textContent = `
  div:has(> ul.MuiMenu-list) {
    min-width: 400px !important;
  }`;

document.head?.appendChild(listSelectorImprovements);

const listSelectorObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          const element = node.querySelector('ul.MuiMenu-list');
          if (element) {
            // TODO: remove the extension ID and append it to the end of the item name
            Array.from(element.getElementsByTagName('li'))
              .sort((a, b) => a.textContent.localeCompare(b.textContent))
              .forEach((li) => element.appendChild(li));
          }
        }
      }
    }
  }
});

const body = document.body;
if (body) {
  listSelectorObserver.observe(body, {
    childList: true,
    subtree: true,
  });
}
