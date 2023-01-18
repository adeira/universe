// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

const getObjectPropertyName = require('./utils/getObjectPropertyName');
const getSXImportSpecifiers = require('./utils/getSXImportSpecifiers');
const isSXVariableDeclarator = require('./utils/isSXVariableDeclarator');

/**
 * This rule makes sure that all defined stylesheets are used AND all used stylesheets are defined.
 */
module.exports = ({
  create: function (context) {
    // import sx from '@adeira/sx'
    //        ^^
    let importDefaultSpecifier = null;

    // import { create as sxCreate } from '@adeira/sx';
    //                    ^^^^^^^^
    let importSpecifierCreate = null;

    // stylesheet names which were defined via `sx.create`
    // const xxx = sx.create({yyy, zzz})   =>   Map([["xxx", ["yyy", "zzz"]]])
    const definedStylesheetNames /*: Map<string, $FlowFixMe> */ = new Map();
    const definedStylesheetNodes /*: Map<string, $FlowFixMe> */ = new Map();
    const definedStylesheetNameNodes /*: Map<string|null, $FlowFixMe> */ = new Map();

    // xxx('aaa', 'bbb')   =>   Map([["xxx", [aaaNode, bbbNode]]])
    const usedStylesheetNames /*: Map<string, $FlowFixMe> */ = new Map();
    const usedStylesheetNodes /*: Map<string|null, $FlowFixMe> */ = new Map();

    let unableToAnalyzeUsedStylesheets = false;

    return {
      // TODO: add support for `require("@adeira/sx")`
      'ImportDeclaration'(node) {
        const importSpecifiers = getSXImportSpecifiers(node);
        if (importSpecifiers !== null) {
          importDefaultSpecifier = importSpecifiers.importDefaultSpecifier;
          importSpecifierCreate = importSpecifiers.importSpecifierCreate;
        }
      },

      // const styles = sx.create({})
      //       ^^^^^^^^^^^^^^^^^^^^^^
      //       { id }   {    init    }
      'VariableDeclarator'(node) {
        if (isSXVariableDeclarator(node, importDefaultSpecifier, importSpecifierCreate)) {
          const initArguments = node.init?.arguments || [];
          const firstArgument = initArguments[0];
          // $FlowIssue[unnecessary-optional-chain]: https://github.com/facebook/flow/issues/5972
          if (firstArgument?.type === 'ObjectExpression') {
            const firstArgumentProperties = firstArgument.properties ?? [];
            for (const property of firstArgumentProperties) {
              if (property.type === 'Property') {
                const alreadyCaptured = definedStylesheetNames.get(node.id.name) ?? [];
                let propertyName = null;
                if (property.key.type === 'Literal') {
                  propertyName = property.key.value;
                } else if (property.key.type === 'Identifier') {
                  propertyName = property.key.name;
                }
                definedStylesheetNames.set(node.id.name, [...alreadyCaptured, propertyName]);
                definedStylesheetNameNodes.set(propertyName, property);
              }
            }
            definedStylesheetNodes.set(node.id.name, node);
          }
        }
      },

      // styles('aaa')
      // ^^^^^^^^^^^^^
      'CallExpression'(node) {
        const expressionArguments = node.arguments ?? [];
        for (const argument of expressionArguments) {
          if (['CallExpression'].includes(argument.type)) {
            // these are argument which we simply want to acknowledge and skip (but continue analyzing)
            return;
          } else if (argument.type === 'ObjectExpression') {
            // special case for conditional objects
            for (const property of argument.properties) {
              if (property.type === 'Property' && property.value.type === 'ObjectExpression') {
                // we assume this is a SX.create definition so we skip it
                return;
              }
            }
          } else if (
            ![
              // Supported argument types:
              'ConditionalExpression',
              'Literal',
              'LogicalExpression',
              'TemplateLiteral',
            ].includes(argument.type)
          ) {
            // backout early if we cannot recognize (or do not support) the 'CallExpression' pattern
            unableToAnalyzeUsedStylesheets = true;
            return;
          }
        }

        const usedNames /*: Set<string|null> */ = new Set();
        for (const argument of expressionArguments) {
          // TODO: more cases (deeper analysis)
          let value = null;
          if (argument.type === 'ObjectExpression') {
            for (const property of argument.properties) {
              if (property.type === 'Property') {
                const propertyName = getObjectPropertyName(property);
                usedNames.add(propertyName);
                usedStylesheetNodes.set(propertyName, argument);
              }
            }
            continue;
          } else if (argument.type === 'Literal') {
            // styles('aaa')
            value = argument.value;
          } else if (argument.type === 'TemplateLiteral') {
            // styles(`aaa`)
            value = argument.quasis[0].value.raw;
          } else if (argument.type === 'LogicalExpression') {
            if (argument.right.type === 'Literal') {
              // styles(isAAA && 'aaa')
              value = argument.right.value;
            }
          } else if (argument.type === 'ConditionalExpression') {
            if (
              argument.consequent.type === 'Literal' &&
              typeof argument.consequent.value === 'string' // can be also `null`, `false`, …
            ) {
              // styles(isAAA ? 'aaa' : null)
              const consequentValue = argument.consequent.value;
              usedNames.add(consequentValue);
              usedStylesheetNodes.set(consequentValue, argument);
            }
            if (
              argument.alternate.type === 'Literal' &&
              typeof argument.alternate.value === 'string' // can be also `null`, `false`, …
            ) {
              // styles(isBBB ? null : 'aaa')
              const alternateValue = argument.alternate.value;
              usedNames.add(alternateValue);
              usedStylesheetNodes.set(alternateValue, argument);
            }
            continue;
          }
          usedNames.add(value);
          usedStylesheetNodes.set(value, argument);
        }

        const maybeCaptured = usedStylesheetNames.get(node.callee.name);
        const alreadyCaptured = maybeCaptured ?? [];
        usedStylesheetNames.set(node.callee.name, [...alreadyCaptured, ...usedNames]);
      },

      // xstyle={styles.spacing}        xstyle={styles['spacing']}
      //         ^^^^^^^^^^^^^^    or           ^^^^^^^^^^^^^^^^^
      'JSXExpressionContainer'(node) {
        // used when composing styles via `sx(…)`
        // we limit it for JSX on purpose (to simplify things)
        const expression = node.expression;
        if (expression.type !== 'MemberExpression') {
          return;
        }

        let stylesheetName = null;
        if (expression.property.name != null) {
          stylesheetName = expression.property.name;
        } else if (expression.property.value != null) {
          stylesheetName = expression.property.value;
        }
        const maybeCaptured = usedStylesheetNames.get(expression.object.name);
        const alreadyCaptured = maybeCaptured ?? [];
        usedStylesheetNames.set(expression.object.name, [...alreadyCaptured, stylesheetName]);
      },

      'Program:exit'(node) {
        if (unableToAnalyzeUsedStylesheets === true) {
          // backout early in cases we are not 100% sure about it
          return;
        }

        definedStylesheetNames.forEach((definedNames, callee) => {
          const usedNames = usedStylesheetNames.get(callee);
          if (usedNames == null) {
            const definedNode = definedStylesheetNodes.get(callee);
            context.report({
              node,
              loc: definedNode ? definedNode.loc : undefined,
              message: 'SX function "{{functionName}}" was not used anywhere in the code.',
              data: { functionName: callee },
            });
          }

          const definedButNotUsed =
            definedNames.filter((name) => {
              return !usedNames?.includes(name);
            }) ?? [];
          for (const name of definedButNotUsed) {
            const definedNameNode = definedStylesheetNameNodes.get(name);
            context.report({
              node,
              loc: definedNameNode ? definedNameNode.loc : undefined,
              message:
                'Unused stylesheet: {{stylesheetName}} (defined via "{{definedBy}}" variable)',
              data: {
                stylesheetName: name,
                definedBy: callee,
              },
            });
          }

          const usedButNotDefined =
            usedNames?.filter((name) => {
              return !definedNames.includes(name);
            }) ?? [];
          for (const name of usedButNotDefined) {
            const usedNode = usedStylesheetNodes.get(name);
            context.report({
              node,
              loc: usedNode ? usedNode.loc : undefined,
              message: 'Unknown stylesheet used: {{stylesheetName}} (not defined anywhere)',
              data: {
                stylesheetName: name,
              },
            });
          }
        });
      },
    };
  },
} /*: EslintRule */);
