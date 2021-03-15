// @flow strict-local

module.exports = {
  rules: {
    'flow-use-readonly-spread': require('./rules/flow-use-readonly-spread'),
    'graphql-require-object-description': require('./rules/graphql-require-object-description'),
    'no-duplicate-import-type-import': require('./rules/no-duplicate-import-type-import'),
    'no-invalid-flow-annotations': require('./rules/no-invalid-flow-annotations'),
    'only-nullable-fields': require('./rules/only-nullable-fields'),
    'relay-import-no-values': require('./rules/relay-import-no-values'),
    'relay-import-type-must-exist': require('./rules/relay-import-type-must-exist'),
    'valid-test-folder': require('./rules/valid-test-folder'),
  },
};
