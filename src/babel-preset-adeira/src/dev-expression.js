/* eslint-disable ft-flow/require-valid-file-annotation */

const buildDevExpression = require('./buildDevExpression');

module.exports = function (babel) {
  return {
    pre() {
      this.canChangeProperty = true;
    },
    visitor: {
      Property(path) {
        this.canChangeProperty = path.node.computed === true || path.node.key.name !== '__DEV__';
      },
      Identifier(path) {
        // Do nothing when testing because RN internally overwrites __DEV__ like so:
        // `global.__DEV__ = true;` (results in invalid code)
        if (process.env.NODE_ENV === 'test') {
          return;
        }

        // replace __DEV__ with process.env.NODE_ENV !== 'production'
        if (path.isIdentifier({ name: '__DEV__' }) && this.canChangeProperty) {
          path.replaceWith(buildDevExpression(babel));
        }
      },
    },
  };
};
