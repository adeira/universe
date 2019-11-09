// @flow strict

module.exports = {
  rules: {
    'no-exact-indexer': require('./rules/no-exact-indexer'),
    'no-internal-flow-type': require('./rules/no-internal-flow-type'),
    'no-invalid-flow-annotations': require('./rules/no-invalid-flow-annotations'),
    'only-nullable-fields': require('./rules/only-nullable-fields'),
  },
};
