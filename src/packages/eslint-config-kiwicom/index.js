// @flow

const ourRules = require('./ourRules');
const prettierRules = require('./extraPrettierRules');

const ERROR = 2;

module.exports = {
  rules: {
    ...ourRules,
    ...prettierRules,
    'prettier/prettier': [
      ERROR,
      {
        bracketSpacing: true,
        printWidth: 80,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.android.js',
          '.ios.js',
          '.native.js',
          '.web.js',
        ],
      },
    },
  },

  plugins: [
    'eslint-plugin-babel',
    'eslint-plugin-flowtype',
    'eslint-plugin-jest',
    'eslint-plugin-prefer-object-spread',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-native',
    'eslint-plugin-relay',
    'eslint-plugin-import',
    'eslint-plugin-dependencies',
    'eslint-plugin-monorepo',
    'eslint-plugin-node',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-kiwi-graphql',
    'eslint-plugin-prettier',
  ],
};
