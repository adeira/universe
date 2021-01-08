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
  rules: {
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
