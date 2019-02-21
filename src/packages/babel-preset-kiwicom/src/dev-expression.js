/* eslint-disable flowtype/require-valid-file-annotation */

const getDevExpression = require('./getDevExpression');

module.exports = function({ types: t }) {
  const DEV_EXPRESSION = getDevExpression(t);

  return {
    pre() {
      this.canChangeProperty = true;
    },
    visitor: {
      Property(path) {
        this.canChangeProperty =
          path.node.computed === true || path.node.key.name !== '__DEV__';
      },
      Identifier(path) {
        // do nothing when testing
        if (process.env.NODE_ENV === 'test') {
          return;
        }

        // replace __DEV__ with process.env.NODE_ENV !== 'production'
        if (path.isIdentifier({ name: '__DEV__' }) && this.canChangeProperty) {
          path.replaceWith(DEV_EXPRESSION);
        }
      },
    },
  };
};
