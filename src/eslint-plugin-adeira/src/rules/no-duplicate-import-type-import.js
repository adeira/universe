// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

// TODO: Implement auto-fixing
module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },

  create(context) {
    const imports /* : Array<{| +name: string, +importKind: string | null |}> */ = [];
    return {
      ImportDeclaration: node => {
        if (imports.some(i => i.name === node.source.value && i.importKind !== node.importKind)) {
          context.report({
            node,
            message: `Found duplicate import/type import ${node.source.value}`,
          });
        } else {
          imports.push({ name: node.source.value, importKind: node.importKind });
        }
      },
    };
  },
} /*: EslintRule */);
