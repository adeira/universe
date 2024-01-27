// @flow

const listSelectorImprovements = document.createElement('style');

listSelectorImprovements.textContent = `
  div:has(> ul.rossum-sa-extension-list) {
    min-width: 440px !important;
    max-height: initial !important;
  }`;

document.head?.appendChild(listSelectorImprovements);

const listSelectorObserver = new MutationObserver((mutations) => {
  if (window.location.pathname === '/settings/extensions/logs') {
    // It is important to execute these modifications only on the specified path not to influence
    // other parts of the application.

    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            const element = node.querySelector('ul.MuiMenu-list');
            if (element) {
              element.classList.add('rossum-sa-extension-list'); // to apply custom styles specified above

              // TODO: remove the extension ID and append it to the end of the item name
              Array.from(element.getElementsByTagName('li'))
                .sort((a, b) => a.textContent.localeCompare(b.textContent))
                .forEach((li) => element.appendChild(li));
            }
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
