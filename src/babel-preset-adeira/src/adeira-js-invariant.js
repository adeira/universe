/* eslint-disable ft-flow/require-valid-file-annotation */

const buildDevExpression = require('./buildDevExpression');

/**
 * import { invariant } from "@adeira/js";
 * invariant(condition, argument, argument);
 *
 *      ↓ ↓ ↓ ↓ ↓ ↓
 *
 * import { invariant } from "@adeira/js";
 * if (!condition) {
 *   if (process.env.NODE_ENV !== "production") {
 *     invariant(false, argument, argument);
 *   } else {
 *     invariant(false);
 *   }
 * }
 *
 * This should then be minified by dead code elimination.
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

          if (path.get('callee').isIdentifier({ name: 'invariant' })) {
            const prodInvariant = babel.template.expression.ast('invariant(false)');

            const devInvariant = babel.template.expression('invariant(false, %%arguments%%)')({
              arguments: node.arguments.slice(1),
            });

            prodInvariant[SEEN_SYMBOL] = true;
            devInvariant[SEEN_SYMBOL] = true;

            path.replaceWith(
              babel.template(`
                if (!%%condition%%) {
                  if (%%innnerCondition%%) {
                    %%devInvariant%%
                  } else {
                    %%prodInvariant%%
                  }
                }
              `)({
                condition: node.arguments[0],
                innnerCondition: buildDevExpression(babel),
                prodInvariant,
                devInvariant,
              }),
            );
          }
        },
      },
    },
  };
};
