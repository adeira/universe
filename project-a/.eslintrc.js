module.exports = {
  root: true,
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: ['@adeira/eslint-config'],
  plugins: ['eslint-plugin-sx'], // TODO: remove with a new 'eslint-config-adeira' version
  rules: {
    'sx/no-concatenated-classes': 2,
    'sx/no-unused-stylesheet': 2,
    'sx/valid-usage': 2,

    'react/forbid-dom-props': 'off', // doesn't support <fbt:param/> namespaced JSX
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          { element: 'h1', message: 'use <Heading> instead' },
          { element: 'h2', message: 'use <Heading> instead' },
          { element: 'h3', message: 'use <Heading> instead' },
          { element: 'h4', message: 'use <Heading> instead' },
          { element: 'h5', message: 'use <Heading> instead' },
          { element: 'h6', message: 'use <Heading> instead' },
          { element: 'input', message: 'use <Input> or <InputSubmit> instead' },
          { element: 'section', message: 'use <Seading> instead' },
        ],
      },
    ],
  },
};
