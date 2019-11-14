// @flow strict

module.exports = {
  rules: {
    'no-internal-flow-type': require('./rules/no-internal-flow-type'),
    'no-invalid-flow-annotations': require('./rules/no-invalid-flow-annotations'),
    'only-nullable-fields': require('./rules/only-nullable-fields'),
    'relay-import-no-values': require('./rules/relay-import-no-values'),
    'relay-import-type-must-exist': require('./rules/relay-import-type-must-exist'),
    'valid-test-folder': require('./rules/valid-test-folder'),
  },
};
