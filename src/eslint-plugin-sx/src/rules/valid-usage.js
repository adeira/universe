// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

const getSXImportSpecifiers = require('./utils/getSXImportSpecifiers');
const isSXVariableDeclarator = require('./utils/isSXVariableDeclarator');

/**
 * This rule tries to catch obviously invalid SX usages.
 */
module.exports = ({
  create: function (context) {
    // import * as sx from '@adeira/sx'
    //             ^^
    let importNamespaceSpecifier = null;

    // import { create as sxCreate } from '@adeira/sx';
    //                    ^^^^^^^^
    let importSpecifier = null;

    return {
      // TODO: add support for `require("@adeira/sx")`
      ImportDeclaration(node) {
        const importSpecifiers = getSXImportSpecifiers(node);
        if (importSpecifiers !== null) {
          importNamespaceSpecifier = importSpecifiers.importNamespaceSpecifier;
          importSpecifier = importSpecifiers.importSpecifier;
        }
      },

      // const styles = sx.create({})
      //       ^^^^^^^^^^^^^^^^^^^^^^
      //       | id |
      VariableDeclarator(node) {
        if (isSXVariableDeclarator(node, importNamespaceSpecifier, importSpecifier)) {
          const initArguments = (node.init && node.init.arguments) || [];

          if (initArguments.length > 1) {
            context.report({
              node,
              message: 'SX create was called with too many arguments. Only one is allowed.',
            });
          }

          const firstArgument = initArguments[0];
          if ((firstArgument && firstArgument.type) !== 'ObjectExpression') {
            context.report({
              node,
              message: 'SX create must be called with object in a first argument.',
            });
          }

          const firstArgumentProperties = (firstArgument && firstArgument.properties) || [];
          for (const property of firstArgumentProperties) {
            if (property.value.type !== 'ObjectExpression') {
              context.report({
                node,
                message: 'Each SX definition property must be an object.',
              });
            }
          }
        }
      },
    };
  },
} /*: EslintRule */);
