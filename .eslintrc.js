// @flow strict

module.exports = {
  root: true, // stop ESLint from looking for a configuration file in parent folders
  extends: ['@adeira/eslint-config/strict'],
  env: {
    // TODO: consider moving this into `eslint-config-adeira`
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'hermes-eslint',
  parserOptions: {
    // https://github.com/facebook/hermes/blob/main/tools/hermes-parser/js/hermes-eslint/README.md
    sourceType: 'module',
    fbt: true,
  },
};
