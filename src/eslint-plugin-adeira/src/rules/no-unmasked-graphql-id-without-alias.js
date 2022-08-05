// @flow

const path = require('path');
const graphql = require('graphql');

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

function shouldLint(context) {
  return /graphql|relay/i.test(context.getSourceCode().text);
}

function isGraphQLTag(tag /*: any */) {
  return tag.type === 'Identifier' && tag.name === 'graphql';
}

module.exports = ({
  meta: {
    docs: {
      description: 'Validates correct usages of `id(opaque: false)` field.',
    },
  },
  create(context) {
    if (!shouldLint(context)) {
      return {};
    }
    return {
      TaggedTemplateExpression(node) {
        if (!isGraphQLTag(node.tag)) {
          return;
        }
        const quasi = node.quasi.quasis[0];
        try {
          const filename = path.basename(context.getFilename());
          const ast = graphql.parse(new graphql.Source(quasi.value.cooked, filename));

          // we are not validating Relay usages here (relay/rule-graphql-syntax does it already)
          // but we are trying to be quite benevolent here

          const checkSelections = (selections) => {
            for (const selection of selections) {
              if (
                selection.kind === 'InlineFragment' &&
                selection.selectionSet.selections != null
              ) {
                checkSelections(selection.selectionSet.selections);
              }

              if (selection.kind === 'Field') {
                const args = selection.arguments ?? [];
                for (const argument of args) {
                  if (
                    selection.name.value === 'id' &&
                    selection.alias === undefined &&
                    argument.name.value === 'opaque' &&
                    argument.value.value === false
                  ) {
                    context.report({
                      message:
                        'Fetching ID field with (opaque:false) without aliasing it could have ' +
                        'unexpected side-effects. Please, use a GraphQL alias for this field or ' +
                        'make it opaque.',
                      node,
                    });
                  }
                }
              }
            }
          };

          for (const definition of ast.definitions) {
            if (definition.kind === 'FragmentDefinition') {
              const selections = definition.selectionSet.selections ?? [];
              checkSelections(selections);
            }
          }
        } catch (error) {
          context.report({
            node: node,
            message: '{{message}}',
            data: { message: error.message },
          });
        }
      },
    };
  },
} /*: EslintRule */);
