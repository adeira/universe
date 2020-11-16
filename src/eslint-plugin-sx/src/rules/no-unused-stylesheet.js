// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

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
    const definedStylesheetNames = new Map();
    const definedStylesheetNodes = new Map();
    const definedStylesheetNameNodes = new Map();

    // xxx('aaa', 'bbb')   =>   Map([["xxx", [aaaNode, bbbNode]]])
    const usedStylesheetNames = new Map();
    const usedStylesheetNodes = new Map();

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
      //       | id |
      'VariableDeclarator'(node) {
        if (isSXVariableDeclarator(node, importDefaultSpecifier, importSpecifierCreate)) {
          const initArguments = (node.init && node.init.arguments) || [];
          const firstArgument = initArguments[0];
          const firstArgumentProperties = (firstArgument && firstArgument.properties) || [];
          for (const property of firstArgumentProperties) {
            const alreadyCaptured = definedStylesheetNames.get(node.id.name) || [];
            const propertyName =
              property.key.name || // in case property is type of "Identifier"
              property.key.value; // in case property is type of "Literal"
            definedStylesheetNames.set(node.id.name, [...alreadyCaptured, propertyName]);
            definedStylesheetNameNodes.set(propertyName, property);
          }
          definedStylesheetNodes.set(node.id.name, node);
        }
      },

      // className={styles('aaa')}
      //           ^^^^^^^^^^^^^^^
      'JSXAttribute'(node) {
        if (
          node.name.type !== 'JSXIdentifier' ||
          node.name.name !== 'className' ||
          node.value.type !== 'JSXExpressionContainer'
        ) {
          return;
        }

        if (node.value.expression.type !== 'CallExpression') {
          // some unexpected "className" construct (fail gracefully)
          unableToAnalyzeUsedStylesheets = true;
          return;
        }

        const usedNames = new Set();
        const classNameExpressions = node.value.expression;
        const expressionArguments = classNameExpressions.arguments || [];
        for (const argument of expressionArguments) {
          let value;
          if (argument.type === 'Literal') {
            value = argument.value;
          } else if (argument.type === 'TemplateLiteral') {
            value = argument.quasis[0].value.raw;
          } else if (argument.type === 'LogicalExpression') {
            value = argument.right.value;
          } else {
            // TODO: more cases (deeper analysis)
            unableToAnalyzeUsedStylesheets = true;
            return;
          }
          usedNames.add(value);
          usedStylesheetNodes.set(value, argument);
        }

        if (classNameExpressions.callee) {
          const maybeCaptured = usedStylesheetNames.get(classNameExpressions.callee.name);
          const alreadyCaptured = maybeCaptured ? maybeCaptured : [];
          usedStylesheetNames.set(classNameExpressions.callee.name, [
            ...alreadyCaptured,
            ...usedNames,
          ]);
        }
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
              message:
                'SX function "{{functionName}}" was not used anywhere in the "className" JSX attribute.',
              data: { functionName: callee },
            });
          }

          const definedButNotUsed =
            definedNames.filter((name) => {
              return !(usedNames && usedNames.includes(name));
            }) || [];
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
            (usedNames &&
              usedNames.filter((name) => {
                return !(definedNames && definedNames.includes(name));
              })) ||
            [];
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
