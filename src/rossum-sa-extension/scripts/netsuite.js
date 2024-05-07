// @flow

/*::

declare const chrome: any; // TODO

*/

const styleSchemaID = document.createElement('style');
styleSchemaID.textContent = `
.rossum-sa-extension-netsuite-field-name {
  color: red;
  font-size: 10px;
  opacity: .7;
  text-transform: lowercase;
}`;
document.head?.appendChild(styleSchemaID);

function displayFieldName(node /*: $FlowFixMe */, fieldId /*: string */) {
  const div = document.createElement('div');
  div.className = 'rossum-sa-extension-netsuite-field-name';
  div.innerHTML = fieldId;
  node.appendChild(div);
}

chrome.storage.local.get(['netsuiteFieldNamesEnabled']).then((result) => {
  if (result.netsuiteFieldNamesEnabled === true) {
    const linksWithLabel = document.querySelectorAll("span[id$='_lbl'] a");
    linksWithLabel.forEach(function (linkWithLabel) {
      const onClick = linkWithLabel.getAttribute('onclick');
      if (onClick != null && onClick.includes('nlFieldHelp')) {
        const resultArray =
          onClick.match(/"(?<word>[^"]*)"/g) || onClick.match(/'(?<word>[^']*)'/g);

        if (resultArray && resultArray.length > 1) {
          const fieldId = resultArray[1].replace(/['"]/g, '');
          displayFieldName(linkWithLabel, fieldId);
        }
      }
    });
  }
});
