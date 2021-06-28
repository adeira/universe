// @flow

/*::
import type { Property } from '@adeira/flow-types-eslint';
*/

module.exports = function getObjectPropertyName(property /*: Property */) /*: string | null */ {
  let propertyName = null;
  if (property.key.type === 'Identifier') {
    propertyName = property.key.name;
  } else if (property.key.type === 'Literal') {
    propertyName = property.key.value;
  } else if (property.key.type === 'TemplateLiteral') {
    // simple cases only:
    propertyName = property.key.quasis[0].value.raw;
  }
  return propertyName;
};
