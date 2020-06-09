// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

function isRelayImport(node) {
  return /\/__generated__\/.*\.graphql/.test(node.source.value);
}

module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration: (node) => {
        if (!isRelayImport(node)) {
          return;
        }
        node.specifiers.forEach((specifier) => {
          if (node.importKind !== 'type' && specifier.importKind !== 'type') {
            const nameNode = specifier.imported ? specifier.imported : specifier.local;
            context.report(nameNode, `"${nameNode.name}" is not imported as a type`);
          }
        });
      },
    };
  },
} /*: EslintRule  */);
