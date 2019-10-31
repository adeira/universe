// @flow

const utils = require('./utils');

/*::

type Options = {|
    +threshold: number,
|};

type Context = {
  +options: $ReadOnlyArray<?Options>,
  +report: Function,
  ...
};

*/

module.exports = {
  meta: {
    docs: {
      description: 'Verifies that your graphql`...` expressions are not too complex.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          threshold: {
            type: 'integer',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context /*: Context */) /*: { TaggedTemplateExpression: (node: any) => void, ... } */ {
    const config = context.options[0] || {};
    const threshold = config.threshold || 20;

    return {
      TaggedTemplateExpression: (node /*: any */) => {
        if (!utils.isGraphQLTemplate(node)) {
          return;
        }

        const ast = utils.getGraphQLAST(node);
        const score = utils.calculateComplexity(ast);

        if (score > threshold) {
          context.report({
            node,
            // TODO include loc in report
            message:
              'Your GraphQL expression exceeded the limit. Your score: {{ score }}, Limit: {{ max }}.',
            data: {
              score,
              max: threshold,
            },
          });
        }
      },
    };
  },
};
