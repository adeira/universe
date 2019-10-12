// @flow

import * as utils from './utils';

const THRESHOLD = 20;

module.exports = {
  meta: {
    docs: {
      description: `Verifies that your GraphQL fragments are not too complex.`,
    },
  },
  create(context /*: any */) {
    function calculateComplexity(node /*: any */) {
      let score = 0;

      function walkGraph(node /*: any */) {
        if (node.kind === 'Document') {
          node.definitions.forEach(definition => walkGraph(definition));
        }

        if (['FragmentSpread', 'InlineFragment', 'Field'].includes(node.kind)) {
          score += 1;

          if (node.selectionSet && Array.isArray(node.selectionSet.selections)) {
            // extra penalty for object field
            score += 1;
          }
        }

        if (node.kind === 'OperationDefinition') {
          // query, subscription & mutation are highly penalized to encourage usage of fragments
          score += 8;
        }

        if (node.selectionSet && Array.isArray(node.selectionSet.selections)) {
          node.selectionSet.selections.forEach(selection => walkGraph(selection));
        }
      }

      walkGraph(node);
      return score;
    }

    return {
      TaggedTemplateExpression: (node /*: any */) => {
        if (!utils.isGraphQLTemplate(node)) {
          return;
        }

        const ast = utils.getGraphQLAST(node);
        const score = calculateComplexity(ast);

        if (score > THRESHOLD) {
          context.report({
            node,
            // TODO include loc in report
            message:
              'Your GraphQL fragment exceeded the limit. Your score: {{ score }}, Limit: {{ max }}.',
            data: {
              score,
              max: THRESHOLD,
            },
          });
        }
      },
    };
  },
};
