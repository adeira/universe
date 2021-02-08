// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

const getSXImportSpecifiers = require('./utils/getSXImportSpecifiers');
const isSXVariableDeclarator = require('./utils/isSXVariableDeclarator');
const isSXKeyframesVariableDeclarator = require('./utils/isSXKeyframesVariableDeclarator');
const getVariableDeclaratorCalleeName = require('./utils/getVariableDeclaratorCalleeName');

/**
 * This rule tries to catch obviously invalid SX usages.
 */
module.exports = ({
  create: function (context) {
    // import sx from '@adeira/sx'
    //        ^^
    let importDefaultSpecifier = null;

    // import { create as sxCreate } from '@adeira/sx';
    //                    ^^^^^^^^
    let importSpecifierCreate = null;

    // import { keyframes as sxKeyframes } from '@adeira/sx';
    //                    ^^^^^^^^
    let importSpecifierKeyframes = null;

    return {
      // TODO: add support for `require("@adeira/sx")`
      ImportDeclaration(node) {
        const importSpecifiers = getSXImportSpecifiers(node);
        if (importSpecifiers !== null) {
          importDefaultSpecifier = importSpecifiers.importDefaultSpecifier;
          importSpecifierCreate = importSpecifiers.importSpecifierCreate;
          importSpecifierKeyframes = importSpecifiers.importSpecifierKeyframes;
        }
      },

      // const styles = sx.create({})
      //       ^^^^^^^^^^^^^^^^^^^^^^
      //       | id |
      VariableDeclarator(node) {
        if (
          // "sx.create" and "sx.keyframes" are essentially the same from the validation point of view
          isSXVariableDeclarator(node, importDefaultSpecifier, importSpecifierCreate) ||
          isSXKeyframesVariableDeclarator(node, importDefaultSpecifier, importSpecifierKeyframes)
        ) {
          const initArguments = node.init?.arguments || [];
          const calleeName = getVariableDeclaratorCalleeName(node, importDefaultSpecifier);

          if (initArguments.length > 1) {
            context.report({
              node,
              message:
                'SX function "{{calleeName}}" was called with too many arguments. Only one is allowed.',
              data: { calleeName },
            });
          }

          const firstArgument = initArguments[0];
          if (firstArgument?.type !== 'ObjectExpression') {
            context.report({
              node,
              message:
                'SX function "{{calleeName}}" must be called with object in a first argument.',
              data: { calleeName },
            });
          }

          const firstArgumentProperties = firstArgument?.properties ?? [];
          for (const property of firstArgumentProperties) {
            if (property.value.type !== 'ObjectExpression') {
              context.report({
                node,
                message: 'Each SX "{{calleeName}}" property must be an object.',
                data: { calleeName },
              });
            }
          }
        }
      },
    };
  },
} /*: EslintRule */);
