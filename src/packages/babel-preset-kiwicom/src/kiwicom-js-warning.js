/* eslint-disable flowtype/require-valid-file-annotation */

const getDevExpression = require('./getDevExpression');

/**
 * import { warning } from "@kiwicom/js";
 * warning(condition, argument, argument);
 *
 *      ↓ ↓ ↓ ↓ ↓ ↓
 *
 * import { warning } from "@kiwicom/js";
 * if (process.env.NODE_ENV !== "production") {
 *   warning(condition, argument, argument);
 * }
 *
 * This should then be removed by dead code elimination so these warnings are
 * not called in production at all.
 */
module.exports = function({ types: t }) {
  const DEV_EXPRESSION = getDevExpression(t);
  const SEEN_SYMBOL = Symbol();

  return {
    pre() {
      this.canPerformChanges = false;
    },
    visitor: {
      ImportDeclaration(path) {
        this.canPerformChanges = path.node.source.value === '@kiwicom/js';
      },
      CallExpression: {
        exit: function(path) {
          const node = path.node;

          // do nothing when testing
          if (process.env.NODE_ENV === 'test') {
            return;
          }

          // not our function
          if (this.canPerformChanges !== true) {
            return;
          }

          // ignore if it's already been processed
          if (node[SEEN_SYMBOL]) {
            return;
          }

          if (path.get('callee').isIdentifier({ name: 'warning' })) {
            node[SEEN_SYMBOL] = true;
            path.replaceWith(
              t.ifStatement(
                DEV_EXPRESSION,
                t.blockStatement([t.expressionStatement(node)]),
              ),
            );
          }
        },
      },
    },
  };
};
