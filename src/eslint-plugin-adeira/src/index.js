// @flow strict-local

module.exports = {
  rules: {
    'graphql-require-object-description': require('./rules/graphql-require-object-description'),
    'no-duplicate-import-type-import': require('./rules/no-duplicate-import-type-import'),
    'no-invalid-flow-annotations': require('./rules/no-invalid-flow-annotations'),
    'only-nullable-fields': require('./rules/only-nullable-fields'),
    'valid-test-folder': require('./rules/valid-test-folder'),
  },
};
