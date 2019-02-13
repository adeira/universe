/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = function(babel) {
  const t = babel.types;

  const DEV_IDENTIFIER = t.identifier('__DEV__');
  DEV_IDENTIFIER.typeAnnotation = t.typeAnnotation(t.booleanTypeAnnotation());
  const DEV_DECLARATION = t.declareVariable(DEV_IDENTIFIER);

  return {
    pre() {
      this.usesDEV = false;
    },

    visitor: {
      Identifier: {
        enter(path) {
          this.usesDEV = this.usesDEV || path.isIdentifier({ name: '__DEV__' });
        },
      },

      Program: {
        exit(path) {
          if (!this.usesDEV) {
            return;
          }

          // Add the declaration at the front of the body if we've used __DEV__.
          path.node.body.unshift(DEV_DECLARATION);
        },
      },
    },
  };
};
