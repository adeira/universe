// @flow

/*::
import type { VariableDeclarator } from '@adeira/flow-types-eslint';
*/

module.exports = function isSXVariableDeclarator(
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
      node.init.callee.object.name === importDefaultSpecifier && // "sx" in sx.create({})
      node.init.callee.property &&
      node.init.callee.property.name === 'create') || // "create" in sx.create({})
      node.init.callee.name === importSpecifier) // "sxCreate" in sxCreate({})
  );
};
