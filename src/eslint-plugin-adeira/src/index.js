// @flow strict

module.exports = {
  rules: {
    'graphql-require-description': require('./rules/graphql-require-description'),
    'no-internal-flow-type': require('./rules/no-internal-flow-type'),
    'no-invalid-flow-annotations': require('./rules/no-invalid-flow-annotations'),
    'only-nullable-fields': require('./rules/only-nullable-fields'),
    'relay-import-no-values': require('./rules/relay-import-no-values'),
    'relay-import-type-must-exist': require('./rules/relay-import-type-must-exist'),
    'valid-test-folder': require('./rules/valid-test-folder'),
    'no-duplicate-import-type-import': require('./rules/no-duplicate-import-type-import'),
  },
};
