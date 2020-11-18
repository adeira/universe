// @flow

/*::
import type { EslintRule } from '@adeira/flow-types-eslint';
*/

module.exports = ({
  meta: {
    messages: {
      readonlySpread:
        'Flow type with spread property and all readonly properties should be ' +
        "wrapped in '$ReadOnly<…>' to prevent accidental loss of readonly-ness.",
    },
  },
  create: function (context) {
    return {
      TypeAlias(node) {
        if (node.right.type === 'GenericTypeAnnotation' && node.right.id.name === '$ReadOnly') {
          // it's already $ReadOnly<…>, nothing to do
        } else if (node.right.type === 'ObjectTypeAnnotation') {
          // let's iterate all props and if everything is readonly then throw
          let shouldThrow = false;
          let hasSpread = false;
          for (const property of node.right.properties) {
            if (property.type === 'ObjectTypeProperty') {
              if (property.variance && property.variance.kind === 'plus') {
                shouldThrow = true;
              } else {
                shouldThrow = false;
                break;
              }
            } else if (property.type === 'ObjectTypeSpreadProperty') {
              hasSpread = true;
            }
          }
          if (hasSpread === true && shouldThrow === true) {
            context.report({
              node: node.right,
              messageId: 'readonlySpread',
            });
          }
        }
      },
    };
  },
} /*: EslintRule */);
