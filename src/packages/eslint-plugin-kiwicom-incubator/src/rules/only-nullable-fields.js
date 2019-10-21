// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

module.exports = ({
  meta: {
    docs: {
      description: 'Disallows GraphQLNonNull type.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
  },

  create: function(context) {
    /**
     * Whether should be this rule completely ignored.
     *
     * Type `GraphQLNonNull` is prohibited except these situations:
     *  - inside of `GraphQLInputObjectType`
     *  - in query or types arguments (`args` property)
     *  - direct child of `GraphQLList`
     */
    let ignoreRule = false;

    return {
      Property: node => {
        if (node.key && node.key.name === 'args') {
          ignoreRule = true;
        }
      },
      'Property:exit': node => {
        if (node.key && node.key.name === 'args') {
          ignoreRule = false;
        }
      },

      CallExpression: function(node) {
        // disallow GraphQLNonNull
        if (
          ignoreRule === false &&
          node.callee.name === 'GraphQLNonNull' &&
          (node.parent.callee == null || node.parent.callee.name !== 'GraphQLList')
        ) {
          context.report(node, 'Avoid using GraphQLNonNull.');
        }
      },

      NewExpression: function(node) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          ignoreRule = true;
        }

        // disallow GraphQLNonNull
        if (
          ignoreRule === false &&
          node.callee.name === 'GraphQLNonNull' &&
          (node.parent.callee == null || node.parent.callee.name !== 'GraphQLList')
        ) {
          context.report(node, 'Avoid using GraphQLNonNull.');
        }
      },
      'NewExpression:exit': function(node) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          ignoreRule = false;
        }
      },
    };
  },
} /*: EslintRule */);
