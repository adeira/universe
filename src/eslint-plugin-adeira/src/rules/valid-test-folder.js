// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
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
        const isTestRegex =
          typeof context.settings.isTestRegex === 'string'
            ? new RegExp(context.settings.isTestRegex)
            : /\.(?:spec|test)\.js$/;

        if (isTestRegex.test(fileName)) {
          const isValidTestPathRegex =
            typeof context.settings.validTestFolderRegex === 'string'
              ? context.settings.validTestFolderRegex
              : '__tests__';

          if (!new RegExp(isValidTestPathRegex).test(fileName)) {
            context.report({
              node,
              message: `Expect test to be in a folder called ${isValidTestPathRegex}`,
            });
          }
        }
      },
    };
  },
} /*: EslintRule  */);
