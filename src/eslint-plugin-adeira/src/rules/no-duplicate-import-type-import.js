// @flow

/*::
import type { EslintRule, Node, ImportDeclaration } from '@adeira/flow-types-eslint';
*/

function typeNodeSpecifiersToImport(typeNode /*: ImportDeclaration */) /*: string */ {
  // Build the import string, it will result in a string like: type Node, type ElementRef
  // Then caller wraps this accordingly to match it's specific case.
  /* $FlowFixMe[incompatible-use] This comment suppresses an error when
   * upgrading Flow to version 0.174.0. To see the error delete this comment
   * and run Flow. */
  return typeNode.specifiers.map((i) => `type ${i.imported.name}`).join(',');
}

function autoFix(
  typeNode /*: ImportDeclaration */,
  valueNode /*: ImportDeclaration */,
  fixer /*: $FlowFixMe */,
) {
  // Each import has an array of specifiers, we want to append our typeimport after the last import
  const { type, range } = valueNode.specifiers[valueNode.specifiers.length - 1];

  let newImport;
  switch (type) {
    case 'ImportDefaultSpecifier':
      // This covers import like `import React from 'react';`
      newImport = fixer.insertTextAfterRange(
        range,
        `, { ${typeNodeSpecifiersToImport(typeNode)} }`,
        fixer,
      );
      break;
    case 'ImportSpecifier':
      // This covers imports like `import {graphql, createFragmentContainer } from 'react-relay'`
      // and `import React, {Component, type Node } from 'react'`
      newImport = fixer.insertTextAfterRange(range, `, ${typeNodeSpecifiersToImport(typeNode)}`);
      break;
    default:
      // This is a case we don't know about, lets not fix anything
      return [];
  }
  return [newImport, fixer.remove(typeNode)];
}

module.exports = ({
  meta: {
    fixable: 'code',
    docs: {},
    schema: [],
  },

  create(context) {
    const imports /* : Array<Node> */ = [];
    return {
      ImportDeclaration: (node) => {
        if (node.specifiers.length === 0) {
          // Early return because we don't want to take imports with side-effects into account, for example:
          //    import '@material/mwc-dialog';
          return;
        }

        // An import like `import React, { type Node } from 'react'` has importKind value
        // An import like `import type { Node } from 'react'` has importKind type;
        const existingNode = imports.find(
          (i) => i.source.value === node.source.value && i.importKind !== node.importKind,
        );
        if (existingNode != null) {
          context.report({
            node,
            message: `Found duplicate import/type import ${node.source.value}`,
            fix: (fixer) => {
              // We don't know if user did `import React from 'react'; import type { Node } from 'react'`;
              // or `import type { Node } from 'react'; import React from 'react';`
              // Here we identify which import is typeImport and which one is value import
              const [typeNode, valueNode] =
                existingNode.importKind === 'type' ? [existingNode, node] : [node, existingNode];
              return autoFix(typeNode, valueNode, fixer);
            },
          });
        } else {
          imports.push(node);
        }
      },
    };
  },
} /*: EslintRule */);
