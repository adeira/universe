// @flow strict

const hermesEslintParser = require('hermes-eslint');
const adeiraEslintConfig = require('@adeira/eslint-config/strict');

module.exports = [
  adeiraEslintConfig,
  {
    files: [
      '*.js', // root JS files
      'scripts/**/*.js',
      'src/**/*.js',
      // "src/**/*.mjs"
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    languageOptions: {
      parser: hermesEslintParser,
      parserOptions: {
        // https://github.com/facebook/hermes/blob/main/tools/hermes-parser/js/hermes-eslint/README.md
        sourceType: 'module',
        fbt: true,
      },
    },
    rules: {
      // TODO: move to `src/eslint-config-adeira/src/presets/base.js` once stable:
      'adeira/sort-imports': 'error',
    },
    ignores: [
      // This configuration is for the whole monorepo. Consider adding eslint-ignore comments
      // closer to your code (see Relay generated files for example).
      'node_modules/',
      '**/__generated__/*.graphql.js', // https://github.com/prettier/prettier/issues/6102
      '!**/.storybook', // https://github.com/eslint/eslint/issues/8429
      '**/target/doc/**', // Rust generated docs
      'next-env.d.ts', // https://nextjs.org/docs/basic-features/typescript

      // Project specifics:
      'src/babel-preset-adeira/src/__tests__/__fixtures__/',
      'src/rossum-swat/src/download-annotation-data/index.mjs',
      'src/rossum-swat/src/patch-exported-annotations/index.mjs',
    ],
  },
];
