// @flow strict

const path = require('path');

module.exports = {
  presets: ['@adeira/babel-preset-adeira'],
  plugins: [
    [
      'babel-plugin-fbt',
      {
        fbtCommonPath: path.join(__dirname, './translations/common.js'),
      },
    ],
    'babel-plugin-fbt-runtime',
    'relay',
  ],
};
