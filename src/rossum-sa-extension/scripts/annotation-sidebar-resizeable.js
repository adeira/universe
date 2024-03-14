// @flow

/*::

declare const chrome: any; // TODO

*/

const defaultAnnotationSidebarWidth = 400;

const sidebarObserver = new MutationObserver((mutations) => {
  if (window.location.pathname.startsWith('/document/')) {
    // It is important to execute these modifications only on the specified path not to influence
    // other parts of the application.

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const sidebarElements = document.querySelectorAll('div[class^="_Sidebar_"]');
        const documentToolBarElement = document.getElementById('documentToolBar');

        if (sidebarElements.length > 0 && documentToolBarElement != null) {
          // sidebarObserver.disconnect();

          // We need to move the document toolbar to the left because of the dynamic width of the sidebar:
          documentToolBarElement.style.left = '50px';

          // Make sidebar resizeable:
          sidebarElements.forEach((sidebarElement) => {
            chrome.storage.local.get(['annotationSidebarWidth']).then((result) => {
              sidebarElement.style.resize = 'horizontal';
              sidebarElement.style.overflow = 'scroll';
              sidebarElement.style.width = `${
                result.annotationSidebarWidth ?? defaultAnnotationSidebarWidth
              }px`;
            });

            const resizeObserver = new ResizeObserver(([entry]) => {
              if (entry.contentRect.width !== defaultAnnotationSidebarWidth) {
                chrome.storage.local
                  .set({ annotationSidebarWidth: entry.contentRect.width })
                  .then(() => {
                    // noop
                  });
              }
            });
            resizeObserver.observe(sidebarElement);
          });
        }
      }
    }
  }
});

if (document.body) {
  sidebarObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
