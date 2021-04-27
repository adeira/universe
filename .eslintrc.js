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
  parser: '@babel/eslint-parser', // TODO: consider moving this into `eslint-config-adeira`
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
};
