// @flow

/*::
import type { VariableDeclarator } from '@adeira/flow-types-eslint';
*/

module.exports = function isSXKeyframesVariableDeclarator(
  node /*: VariableDeclarator */,
  importDefaultSpecifier /*: string | null */,
  importSpecifier /*: string | null */,
) /*: boolean */ {
  return (
    node.init != null &&
    node.init.type === 'CallExpression' &&
    node.init.callee &&
    node.init.arguments &&
    ((node.init.callee.object &&
      node.init.callee.object.name === importDefaultSpecifier && // "sx" in sx.keyframes({})
      node.init.callee.property &&
      node.init.callee.property.name === 'keyframes') || // "keyframes" in sx.keyframes({})
      node.init.callee.name === importSpecifier) // "sxKeyframes" in sxKeyframes({})
  );
};
