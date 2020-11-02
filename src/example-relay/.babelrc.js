// @flow strict

module.exports = {
  presets: [['@adeira/babel-preset-adeira', { reactRuntime: 'automatic' }], 'next/babel'],
  plugins: ['relay'],
};
