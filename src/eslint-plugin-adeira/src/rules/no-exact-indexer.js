// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

/**
 * This rule is written for our codebase where we expect that `exact_by_default` option is enabled.
 * This implies these rules:
 *
 *  1) exact objects:     {} or {||}
 *  2) inexact objects:   {...}
 *
 * Indexer property makes sense only on inexact objects, because it effectively makes the object inexact.
 */
module.exports = ({
  meta: {
    fixable: true,
    docs: {},
    schema: [],
  },

  create(context) {
    return {
      ObjectTypeAnnotation(node) {
        if ((node.exact === true || node.inexact === false) && node.indexers.length > 0) {
          context.report({
            node,
            message: 'Exact type cannot have indexer property.',
          });
        }
      },
    };
  },
} /*: EslintRule */);
