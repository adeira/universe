module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: ['@adeira/eslint-config'],
  rules: {
    'react/forbid-dom-props': 'off', // doesn't support <fbt:param/> namespaced JSX
  },
};
