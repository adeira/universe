// @flow

/*::

import type { ImportDeclaration } from '@adeira/flow-types-eslint';

type ReturnType = {|
  +importNamespaceSpecifier: null | string,
  +importSpecifier: null | string,
|};

*/

module.exports = function getImportSpecifiers(node /*: ImportDeclaration */) /*: ReturnType */ {
  // import * as sx from '@adeira/sx'
  //             ^^
  let importNamespaceSpecifier = null;

  // import { create as sxCreate } from '@adeira/sx';
  //                    ^^^^^^^^
  let importSpecifier = null;

  if (node.source.value === '@adeira/sx') {
    for (const specifier of node.specifiers) {
      if (specifier.type === 'ImportNamespaceSpecifier') {
        // import * as sx from '@adeira/sx'
        // import * as tada from '@adeira/sx'
        importNamespaceSpecifier = specifier.local.name; // "sx" or "tada"
      } else if (specifier.type === 'ImportSpecifier') {
        // import { create } from '@adeira/sx';
        // import { create as sxCreate } from '@adeira/sx';
        importSpecifier = specifier.local.name; // "create" or "sxCreate"
      }
    }
  }

  return {
    importNamespaceSpecifier,
    importSpecifier,
  };
};
