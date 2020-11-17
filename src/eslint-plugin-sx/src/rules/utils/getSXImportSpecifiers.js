// @flow

/*::

import type { ImportDeclaration } from '@adeira/flow-types-eslint';

type ReturnType = {|
  +importNamespaceSpecifier: null | string,
  +importSpecifierCreate: null | string,
  +importSpecifierKeyframes: null | string,
|};

*/

module.exports = function getSXImportSpecifiers(
  node /*: ImportDeclaration */,
) /*: ReturnType | null */ {
  // import * as sx from '@adeira/sx'
  //             ^^
  let importNamespaceSpecifier = null;

  // import { create as sxCreate } from '@adeira/sx';
  //                    ^^^^^^^^
  let importSpecifierCreate = null;

  // import { keyframes as sxKeyframes } from '@adeira/sx';
  //                    ^^^^^^^^
  let importSpecifierKeyframes = null;

  if (node.source.value !== '@adeira/sx') {
    return null;
  }

  for (const specifier of node.specifiers) {
    if (specifier.type === 'ImportNamespaceSpecifier') {
      // import * as sx from '@adeira/sx'
      // import * as tada from '@adeira/sx'
      importNamespaceSpecifier = specifier.local.name; // "sx" or "tada"
    } else if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'create') {
      // import { create } from '@adeira/sx';
      // import { create as sxCreate } from '@adeira/sx';
      importSpecifierCreate = specifier.local.name; // "create" or "sxCreate"
    } else if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'keyframes') {
      // import { keyframes } from '@adeira/sx';
      // import { keyframes as sxKeyframes } from '@adeira/sx';
      importSpecifierKeyframes = specifier.local.name; // "create" or "sxCreate"
    }
  }

  return {
    importNamespaceSpecifier,
    importSpecifierCreate,
    importSpecifierKeyframes,
  };
};
