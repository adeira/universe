/* eslint-disable flowtype/require-valid-file-annotation */

const getDevExpression = require('./getDevExpression');

/**
 * import { invariant } from "@kiwicom/js";
 * invariant(condition, argument, argument);
 *
 *      ↓ ↓ ↓ ↓ ↓ ↓
 *
 * import { invariant } from "@kiwicom/js";
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
module.exports = function({ types: t }) {
  const DEV_EXPRESSION = getDevExpression(t);
  const SEEN_SYMBOL = Symbol('SEEN_SYMBOL');

  return {
    pre() {
      this.canPerformChanges = false;
    },
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value === '@kiwicom/js') {
          this.canPerformChanges = true;
        }
      },
      CallExpression: {
        enter: function(path) {
          if (path.get('callee').isIdentifier({ name: 'require' })) {
            if (path.node.arguments[0].value === '@kiwicom/js') {
              this.canPerformChanges = true;
            }
          }
        },
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

          if (path.get('callee').isIdentifier({ name: 'invariant' })) {
            const condition = node.arguments[0];
            const devInvariant = t.callExpression(
              node.callee,
              [t.booleanLiteral(false)].concat(node.arguments.slice(1)),
            );
            devInvariant[SEEN_SYMBOL] = true;
            const prodInvariant = t.callExpression(node.callee, [
              t.booleanLiteral(false),
            ]);
            prodInvariant[SEEN_SYMBOL] = true;
            path.replaceWith(
              t.ifStatement(
                t.unaryExpression('!', condition),
                t.blockStatement([
                  t.ifStatement(
                    DEV_EXPRESSION,
                    t.blockStatement([t.expressionStatement(devInvariant)]),
                    t.blockStatement([t.expressionStatement(prodInvariant)]),
                  ),
                ]),
              ),
            );
          }
        },
      },
    },
  };
};
