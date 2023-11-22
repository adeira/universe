// @flow

function findAddedDOMElement(mutation, querySelector) {
  if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
    // Assume there is always only one node in the list
    for (const node of mutation.addedNodes) {
      if (node instanceof HTMLElement) {
        // Query the parent in case we searched for the node itself (querySelector works only for descendants)
        return node.parentNode.querySelector(querySelector);
      }
    }
  }
  return undefined;
}

const listSelectorObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const element = findAddedDOMElement(mutation, 'ul.MuiMenu-list');
    if (element) {
      // TODO: remove the extension ID and append it to the end of the item name
      Array.from(element.getElementsByTagName('li'))
        .sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach((li) => element.appendChild(li));
    }
  }
});

const extensionTableObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const tbody = findAddedDOMElement(mutation, 'tbody');
    if (tbody && (tbody?.children ?? []).length > 0) {
      const sortedChildren = Array.from(tbody.children).sort((a, b) =>
        a.textContent.localeCompare(b.textContent),
      );

      tbody.replaceChildren(...sortedChildren);
    }
  }
});

const body = document.body;
if (body) {
  if (window.location.pathname.endsWith('/extensions/logs')) {
    // Widen the menu of extensions
    const listSelectorImprovements = document.createElement('style');
    listSelectorImprovements.textContent = `
    div:has(> ul.MuiMenu-list) {
      min-width: 400px !important;
    }`;
    document.head?.appendChild(listSelectorImprovements);

    // Sort items in menus
    listSelectorObserver.observe(body, {
      childList: true,
      subtree: true,
    });
  }

  // Sort list of extensions in the extensions tab
  if (window.location.pathname.endsWith('/extensions')) {
    extensionTableObserver.observe(body, {
      childList: true,
      subtree: true,
    });
  }
}
