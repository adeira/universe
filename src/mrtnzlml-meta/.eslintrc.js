module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
  env: {
    node: true,
  },
  extends: [
    '@adeira/eslint-config/base',
    '@adeira/eslint-config/flowtype',
    '@adeira/eslint-config/react',
  ],
};
