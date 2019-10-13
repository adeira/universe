// @flow

import * as utils from './utils';

const THRESHOLD = 20;

module.exports = {
  meta: {
    docs: {
      description: 'Verifies that your graphql`...` expressions are not too complex.',
    },
  },
  create(context /*: any */) {
    return {
      TaggedTemplateExpression: (node /*: any */) => {
        if (!utils.isGraphQLTemplate(node)) {
          return;
        }

        const ast = utils.getGraphQLAST(node);
        const score = utils.calculateComplexity(ast);

        if (score > THRESHOLD) {
          context.report({
            node,
            // TODO include loc in report
            message:
              'Your GraphQL expression exceeded the limit. Your score: {{ score }}, Limit: {{ max }}.',
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
