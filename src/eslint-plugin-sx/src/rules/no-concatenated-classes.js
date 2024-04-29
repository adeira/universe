// @flow

/*::
import type { EslintRule as EslintRuleType } from '@adeira/flow-types-eslint';
*/

const getSXImportSpecifiers = require('./utils/getSXImportSpecifiers');
const isSXVariableDeclarator = require('./utils/isSXVariableDeclarator');

/**
 * This rule tries to find incorrect SX concatenations. For example:
 *
 * ```
 * <div className={`${styles('aaa')} ${styles('bbb')}`} />
 * ```
 *
 * Should be:
 *
 * ```
 * <div className={styles('aaa', 'bbb')} />
 * ```
 *
 * It's because the first call doesn't handle rules specificity correctly whereas the later one does.
 * Don't get confused: SX doesn't handle the specificity in a same way like CSS.
 */
const EslintRule /*: EslintRuleType */ = {
  create: function (context) {
    // import sx from '@adeira/sx'
    //        ^^
    let importDefaultSpecifier = null;

    // import { create as sxCreate } from '@adeira/sx';
    //                    ^^^^^^^^
    let importSpecifierCreate = null;

    // "styles" in "let styles = sx.create({})
    let sxFunctionName = null;

    const relevantTemplateLiterals = [];

    return {
      // TODO: add support for `require("@adeira/sx")`
      'ImportDeclaration'(node) {
        const importSpecifiers = getSXImportSpecifiers(node);
        if (importSpecifiers !== null) {
          importDefaultSpecifier = importSpecifiers.importDefaultSpecifier;
          importSpecifierCreate = importSpecifiers.importSpecifierCreate;
        }
      },
      'VariableDeclarator'(node) {
        if (isSXVariableDeclarator(node, importDefaultSpecifier, importSpecifierCreate)) {
          sxFunctionName = node.id.name;
        }
      },
      'JSXExpressionContainer'(node) {
        if (importDefaultSpecifier == null && importSpecifierCreate == null) {
          // not in an @adeira/sx scope, early exit
          return;
        }

        if (node.expression.type === 'TemplateLiteral') {
          relevantTemplateLiterals.push(node);
        }
      },
      'Program:exit'() {
        for (const relevantTemplateLiteralNode of relevantTemplateLiterals) {
          let sxTemplateCallExpressions = 0;

          if (relevantTemplateLiteralNode.expression.type === 'TemplateLiteral') {
            for (const expression of relevantTemplateLiteralNode.expression.expressions) {
              if (expression.type === 'CallExpression') {
                if (expression.callee.name === sxFunctionName) {
                  sxTemplateCallExpressions += 1;
                }
              }
            }
          }

          if (sxTemplateCallExpressions >= 2) {
            // This rule will be satisfied if we find at least 2 SX expressions in the string.
            context.report({
              node: relevantTemplateLiteralNode,
              message:
                'SX functions should not be concatenated in a template literal otherwise styles ' +
                'precedence might not work as expected.',
            });
          }
        }
      },
    };
  },
};

module.exports = EslintRule;
