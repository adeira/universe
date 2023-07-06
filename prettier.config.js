// @flow strict

module.exports = {
  // see: @adeira/eslint-config
  bracketSpacing: true,
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  quoteProps: 'consistent',
  plugins: ['prettier-plugin-hermes-parser'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.flow'],
      options: {
        parser: 'hermes',
      },
    },
  ],
};
