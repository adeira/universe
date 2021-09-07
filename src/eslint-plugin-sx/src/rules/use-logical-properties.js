// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

const getObjectPropertyName = require('./utils/getObjectPropertyName');
const getSXImportSpecifiers = require('./utils/getSXImportSpecifiers');
const isSXKeyframesVariableDeclarator = require('./utils/isSXKeyframesVariableDeclarator');
const isSXVariableDeclarator = require('./utils/isSXVariableDeclarator');

// Map(physical prop => logical prop)
//
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
const propertyNameSuggestions /*: Map<string, string> */ = new Map([
  // Border bottom:
  ['borderBottom', 'borderBlockEnd'],
  ['borderBottomColor', 'borderBlockEndColor'],
  ['borderBottomStyle', 'borderBlockEndStyle'],
  ['borderBottomWidth', 'borderBlockEndWidth'],

  // Border top:
  ['borderTop', 'borderBlockStart'],
  ['borderTopColor', 'borderBlockStartColor'],
  ['borderTopStyle', 'borderBlockStartStyle'],
  ['borderTopWidth', 'borderBlockStartWidth'],

  // Border right:
  ['borderRight', 'borderInlineEnd'],
  ['borderRightColor', 'borderInlineEndColor'],
  ['borderRightStyle', 'borderInlineEndStyle'],
  ['borderRightWidth', 'borderInlineEndWidth'],

  // Border left:
  ['borderLeft', 'borderInlineStart'],
  ['borderLeftColor', 'borderInlineStartColor'],
  ['borderLeftStyle', 'borderInlineStartStyle'],
  ['borderLeftWidth', 'borderInlineStartWidth'],

  // Margin:
  ['marginBottom', 'marginBlockEnd'],
  ['marginTop', 'marginBlockStart'],
  ['marginRight', 'marginInlineEnd'],
  ['marginLeft', 'marginInlineStart'],

  // Padding:
  ['paddingBottom', 'paddingBlockEnd'],
  ['paddingTop', 'paddingBlockStart'],
  ['paddingRight', 'paddingInlineEnd'],
  ['paddingLeft', 'paddingInlineStart'],
]);

const propertyValueSuggestions /*: Map<string, Map<string, string>> */ = new Map([
  // Map(property name => Map(old value => new value))
  [
    'textAlign',
    new Map([
      ['left', 'start'],
      ['right', 'end'],
    ]),
  ],
]);

/**
 * This rule aims to suggest logical CSS properties instead of physical CSS properties to improve
 * support of other layouts (LTR/RTL, …).
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
 * See: https://caniuse.com/css-logical-props
 */
module.exports = ({
  meta: {
    fixable: 'code',
  },
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
          const firstArgument = initArguments[0];

          // $FlowExpectedError[unnecessary-optional-chain]: https://github.com/facebook/flow/issues/5972
          if (firstArgument?.type === 'ObjectExpression') {
            // $FlowExpectedError[unnecessary-optional-chain]: https://github.com/facebook/flow/issues/5972
            const firstArgumentProperties = firstArgument?.properties ?? [];
            for (const property of firstArgumentProperties) {
              if (property.type === 'Property' && property.value.type === 'ObjectExpression') {
                for (const styleNameProperty of property.value.properties) {
                  if (styleNameProperty.type === 'Property') {
                    const propertyName = getObjectPropertyName(styleNameProperty);
                    if (propertyName != null && propertyNameSuggestions.has(propertyName)) {
                      context.report({
                        node: styleNameProperty.key,
                        message:
                          'Use logical CSS property "{{newProperty}}" instead of physical CSS property "{{oldProperty}}".',
                        data: {
                          oldProperty: propertyName,
                          newProperty: propertyNameSuggestions.get(propertyName),
                        },
                        fix: function (fixer) {
                          return fixer.replaceText(
                            styleNameProperty.key,
                            propertyNameSuggestions.get(propertyName),
                          );
                        },
                      });
                    } else if (propertyName != null && propertyValueSuggestions.has(propertyName)) {
                      const valueNode = styleNameProperty.value;
                      if (valueNode.type === 'Literal') {
                        const oldValue = valueNode.value;
                        const valueSuggestionMap =
                          propertyValueSuggestions.get(propertyName) ?? new Map();
                        if (valueSuggestionMap.has(oldValue)) {
                          context.report({
                            node: valueNode,
                            message:
                              'Use logical CSS value "{{newValue}}" instead of physical CSS value "{{oldValue}}".',
                            data: {
                              oldValue,
                              newValue: valueSuggestionMap.get(oldValue),
                            },
                            fix: function (fixer) {
                              return fixer.replaceText(
                                valueNode,
                                `'${valueSuggestionMap.get(oldValue) ?? '…'}'`,
                              );
                            },
                          });
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    };
  },
} /*: EslintRule */);
