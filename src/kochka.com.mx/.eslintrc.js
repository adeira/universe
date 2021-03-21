// @flow

module.exports = {
  rules: {
    'react/forbid-elements': [
      'error',
      {
        forbid: [{ element: 'input', message: 'use <Input> or <InputSubmit> instead' }],
      },
    ],
  },
};
