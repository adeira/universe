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
    react: {
      version: 'detect',
    },
  },

  globals: {
    // set each global variable name equal to true to allow the variable
    // to be overwritten or false to disallow overwriting
    __DEV__: false,
    FormData: false, // https://developer.mozilla.org/en-US/docs/Web/API/FormData
  },

  plugins: [
    'eslint-plugin-babel',
    'eslint-plugin-flowtype',
    'eslint-plugin-jest',
    'eslint-plugin-prefer-object-spread',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react-native',
    'eslint-plugin-relay',
    'eslint-plugin-import',
    'eslint-plugin-dependencies',
    'eslint-plugin-monorepo',
    'eslint-plugin-node',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-kiwi-graphql', // TODO: deprecated this package and move it under 'eslint-plugin-kiwicom-incubator'
    'eslint-plugin-kiwicom-incubator',
    'eslint-plugin-prettier',
  ],
};
