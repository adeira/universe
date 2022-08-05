// @flow

const levenshtein = require('fast-levenshtein');

/*::
import type { EslintRule, Node } from '@adeira/flow-types-eslint';
*/

function suggest(name /*: string */, alternativeNames /*: Array<string> */) /*: string */ {
  return alternativeNames.sort((firstEl, secondEl) => {
    const firstScore = levenshtein.get(name, firstEl);
    const secondScore = levenshtein.get(name, secondEl);
    return firstScore - secondScore;
  })[0];
}

/**
 * Originally from here: https://github.com/github/eslint-plugin-github/tree/fca4b4f2276989a0fb4399cc7c34eb5407fb2429/lib/rules
 */

module.exports = ({
  meta: {
    docs: {},
    schema: [],
  },

  create(context) {
    function handleComment(comment /*: Node */) {
      const value = comment.value.trim();
      let isNoFlowOrWeakFlow = false;

      if (value.match(/@noflow/)) {
        context.report(
          comment,
          `Do not disable Flow type checker, use '@flow' or '@flow strict' instead.`,
        );
        isNoFlowOrWeakFlow = true;
      }

      if (value.match(/@flow weak/)) {
        context.report(
          comment,
          "Weak mode in Flow is not allowed, use '@flow' or '@flow strict' instead.",
        );
        isNoFlowOrWeakFlow = true;
      }

      if (
        !isNoFlowOrWeakFlow && // We already checked these
        /^@flow/.test(value) && // check that it is flow comment, see: https://github.com/gajus/eslint-plugin-flowtype/blob/master/src/utilities/isFlowFileAnnotation.js
        !/(?:@flow|@flow\sstrict|@flow\sstrict-local)$/.test(value)
      ) {
        context.report(
          comment,
          `Flow annotation '${value}' is not valid, did you mean '${suggest(value, [
            '@flow',
            '@flow strict',
            '@flow strict-local',
          ])}'?`,
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
