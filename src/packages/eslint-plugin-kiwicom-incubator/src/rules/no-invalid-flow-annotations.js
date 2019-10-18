// @flow strict

/*::

import type { EslintRule } from './EslintRule.flow';

*/

/**
 * Originally from here: https://github.com/github/eslint-plugin-github/tree/fca4b4f2276989a0fb4399cc7c34eb5407fb2429/lib/rules
 */
module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },

  create(context) {
    function handleComment(comment) {
      const value = comment.value.trim();

      if (value.match(/@noflow/)) {
        context.report(comment, 'Do not disable Flow type checker, use @flow instead.');
      }

      if (value.match(/@flow weak/)) {
        context.report(comment, 'Weak mode in Flow is not allowed, use @flow instead.');
      }
    }

    return {
      LineComment: handleComment,
      BlockComment: handleComment,
      Program() {
        const comments = context.getSourceCode().getAllComments();
        comments.forEach(handleComment);
      },
    };
  },
} /*: EslintRule */);
