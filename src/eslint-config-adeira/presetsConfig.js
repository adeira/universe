// @flow

const { groupedRules } = require('./ourRules');

module.exports = {
  base: {
    plugins: [
      'eslint-plugin-import',
      'eslint-plugin-monorepo',
      'eslint-plugin-node',
      'eslint-plugin-eslint-comments',
      'eslint-plugin-promise',
      'eslint-plugin-adeira',
      'eslint-plugin-sx',
      'eslint-plugin-prettier',
    ],
    rules: groupedRules.base,
  },
  jest: {
    plugins: ['eslint-plugin-jest'],
    rules: groupedRules.jest,
  },
  flowtype: {
    plugins: ['eslint-plugin-flowtype', 'eslint-plugin-fb-flow'],
    rules: groupedRules.flowtype,
  },
  react: {
    plugins: [
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-react-native',
      'eslint-plugin-jsx-a11y',
    ],
    rules: groupedRules.react,
  },
  relay: {
    plugins: ['eslint-plugin-relay'],
    rules: groupedRules.relay,
  },
};
