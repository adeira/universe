// @flow

/*::
import type { EslintRule as EslintRuleType } from '@adeira/flow-types-eslint';
*/

const EslintRule /*: EslintRuleType */ = {
  meta: {
    docs: {
      description: 'Disallows GraphQLNonNull type.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
  },

  create: function (context) {
    /**
     * Whether should be this rule completely ignored.
     *
     * Type `GraphQLNonNull` is prohibited except these situations:
     *  - inside of `GraphQLInputObjectType`
     *  - in query or types arguments (`args` property)
     *  - direct child of `GraphQLList`
     */
    let noOfAllowedNodesVisited = 0;

    return {
      'Property': (node) => {
        if (node.key && node.key.name === 'args') {
          noOfAllowedNodesVisited += 1;
        }
      },
      'Property:exit': (node) => {
        if (node.key && node.key.name === 'args') {
          noOfAllowedNodesVisited -= 1;
        }
      },

      'CallExpression': function (node) {
        // disallow GraphQLNonNull
        if (
          noOfAllowedNodesVisited === 0 &&
          node.callee.name === 'GraphQLNonNull' &&
          node.parent &&
          (node.parent.callee == null || node.parent.callee.name !== 'GraphQLList')
        ) {
          context.report(node, 'Avoid using GraphQLNonNull.');
        }
      },

      'NewExpression': function (node) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          noOfAllowedNodesVisited += 1;
        }

        // disallow GraphQLNonNull
        if (
          noOfAllowedNodesVisited === 0 &&
          node.callee.name === 'GraphQLNonNull' &&
          (node.parent.callee == null || node.parent.callee.name !== 'GraphQLList')
        ) {
          context.report(node, 'Avoid using GraphQLNonNull.');
        }
      },
      'NewExpression:exit': function (node) {
        if (node.callee.name === 'GraphQLInputObjectType') {
          noOfAllowedNodesVisited -= 1;
        }
      },
    };
  },
};

module.exports = EslintRule;
