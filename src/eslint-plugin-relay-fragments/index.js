// @flow

module.exports = {
  rules: {
    'limit-complexity': require('./src/limit-complexity'),
  },
  configs: {
    recommended: {
      plugins: ['relay-fragments'],
      rules: {
        'relay-fragments/limit-complexity': 'error',
      },
    },
  },
};
