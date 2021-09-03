module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  extends: [
    '@adeira/eslint-config/base',
    '@adeira/eslint-config/flowtype',
    '@adeira/eslint-config/react',
  ],
};
