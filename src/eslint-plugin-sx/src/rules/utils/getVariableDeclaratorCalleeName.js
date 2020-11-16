// @flow

/*::
import type { VariableDeclarator } from '@adeira/flow-types-eslint';
*/

module.exports = function getVariableDeclaratorCalleeName(
  node /*: VariableDeclarator */,
  importDefaultSpecifier /*: string | null */,
) /*: string | null */ {
  if (node.init != null && node.init.type === 'CallExpression' && node.init.callee) {
    if (
      node.init.callee.object &&
      node.init.callee.object.name === importDefaultSpecifier // "sx" in sx.create({})
    ) {
      return node.init.callee.property.name; // "create" in sx.create({})
    }
    return node.init.callee.name; // "sxCreate" in sxCreate({})
  }
  return null;
};
