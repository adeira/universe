// @flow strict

/*::
import type { EslintRule } from './EslintRule.flow';
*/

module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const fileName = context.getFilename();
        const isTest = /(?:spec|test).js$/.test(fileName);
        if (isTest) {
          const isValidTestPath = /__tests__/.test(fileName);
          if (!isValidTestPath) {
            context.report({ node, message: `Expect test to be in a folder called __tests__` });
          }
        }
      },
    };
  },
} /*: EslintRule  */);
