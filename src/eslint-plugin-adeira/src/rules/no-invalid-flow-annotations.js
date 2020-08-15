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
      let isNoFlowOrWeakFlow = false;

      if (value.match(/@noflow/)) {
        context.report(comment, 'Do not disable Flow type checker, use @flow instead.');
        isNoFlowOrWeakFlow = true;
      }

      if (value.match(/@flow weak/)) {
        context.report(comment, 'Weak mode in Flow is not allowed, use @flow instead.');
        isNoFlowOrWeakFlow = true;
      }
      if (
        !isNoFlowOrWeakFlow && // We already checked these
        /^@flow/.test(value) && // check that it is flow comment, see: https://github.com/gajus/eslint-plugin-flowtype/blob/master/src/utilities/isFlowFileAnnotation.js
        !/(?:@flow|@flow\sstrict|@flow\sstrict-local)$/.test(value)
      ) {
        context.report(
          comment,
          'It appears you have a typo, valid values are @flow, @flow strict and @flow strict-local',
        );
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
