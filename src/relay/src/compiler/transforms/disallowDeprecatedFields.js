// @flow

import { IRTransformer } from 'relay-compiler';

function getFieldVisitor(schema) {
  function visitField(field) {
    // todo: implement this -> warn by default, throw error when "--no-deprecated-fields" is passed
    // How can I know whether field is deprecated?

    return this.traverse(field);
  }

  return visitField;
}

/**
 * This is not an actual transform but more a validation
 */
function disallowDeprecatedFields(context) {
  return IRTransformer.transform(context, {
    // todo: is this correct visitor type where to detect this?
    LinkedField: getFieldVisitor(context.getSchema()),
  });
}

const transform = {
  transform: disallowDeprecatedFields,
};

export default transform;
