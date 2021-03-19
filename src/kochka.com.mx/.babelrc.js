// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira'],
  plugins: [
    [
      'babel-plugin-fbt',
      {
        fbtCommonPath: '../../translations/common.js',
      },
    ],
    'babel-plugin-fbt-runtime',
    'relay',
  ],
};
