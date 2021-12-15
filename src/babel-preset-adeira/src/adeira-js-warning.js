/* eslint-disable ft-flow/require-valid-file-annotation */

const buildDevExpression = require('./buildDevExpression');

/**
 * import { warning } from "@adeira/js";
 * warning(condition, argument, argument);
 *
 *      ↓ ↓ ↓ ↓ ↓ ↓
 *
 * import { warning } from "@adeira/js";
 * if (process.env.NODE_ENV !== "production") {
 *   warning(condition, argument, argument);
 * }
 *
 * This should then be removed by dead code elimination so these warnings are
 * not called in production at all.
 */
module.exports = function (babel) {
  const SEEN_SYMBOL = Symbol('SEEN_SYMBOL');

  return {
    pre() {
      this.canPerformChanges = false;
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@adeira/js') {
          this.canPerformChanges = true;
        }
      },
      CallExpression: {
        enter: function (path) {
          if (path.get('callee').isIdentifier({ name: 'require' })) {
            if (path.node.arguments[0].value === '@adeira/js') {
              this.canPerformChanges = true;
            }
          }
        },
        exit: function (path) {
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
              babel.template(`
                if (%%condition%%) {
                  %%conditionBody%%
                }
              `)({
                condition: buildDevExpression(babel),
                conditionBody: node,
              }),
            );
          }
        },
      },
    },
  };
};
