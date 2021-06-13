// @flow strict

module.exports = {
  env: {
    browser: true,
  },
  rules: {
    'react/forbid-elements': [
      'error',
      {
        forbid: [{ element: 'input', message: 'use <Input> or <InputSubmit> instead' }],
      },
    ],
  },
};
