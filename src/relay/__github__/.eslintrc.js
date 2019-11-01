const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: ['@adeira/eslint-config'],

  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    jest: true
  },
};
