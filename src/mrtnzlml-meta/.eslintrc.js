module.exports = {
  root: true,
  parser: 'hermes-eslint',
  env: {
    node: true,
  },
  extends: [
    '@adeira/eslint-config/base',
    '@adeira/eslint-config/flowtype',
    '@adeira/eslint-config/react',
  ],
};
