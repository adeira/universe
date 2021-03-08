// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira'],
  plugins: [
    [
      'babel-plugin-fbt',
      {
        extraOptions: {
          __self: true,
          __source: true,
        },
      },
    ],
    'babel-plugin-fbt-runtime',
  ],
};
