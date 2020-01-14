// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

module.exports = ({
  meta: {
    docs: {
      description: 'Require that each instance of GraphQLObjectType has description.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
  },

  create: function(context) {
    return {
      NewExpression: function(node) {
        if (node.callee.name !== 'GraphQLObjectType') {
          return;
        }

        const objectProps =
          node.arguments != null &&
          node.arguments.length > 0 &&
          node.arguments[0] != null &&
          node.arguments[0].properties != null
            ? node.arguments[0].properties
            : null;

        if (!objectProps) {
          // instantiation of GraphQLObjectType is probably broken
          return;
        }

        const descriptionProp = objectProps.find(property => property.key.name === 'description');
        const nameProp = objectProps.find(property => property.key.name === 'name');
        const typeName =
          nameProp != null && nameProp.value.value != null ? nameProp.value.value : 'UNKNOWN';

        if (!descriptionProp) {
          context.report({
            node,
            message:
              "Graph type '{{type}}' name has no description. Every instance of 'GraphQLObjectType' has to include it to keep the graph well documented.",
            data: {
              type: typeName,
            },
          });
        }
      },
    };
  },
} /*: EslintRule */);
