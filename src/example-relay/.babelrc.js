// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  /**
   * test-bc script broke after upgrading some babel packages.
   * Adding @babel/plugin-proposal-class-properties made it work, but it should not be necessary
   * to add it here, since we already have it in @adeira/babel-preset-adeira.
   * We need to leave it here for now for the test-bc script to work, but we should try
   * to remove it in the future
   */
  plugins: ['relay', '@babel/plugin-proposal-class-properties'],
};
