// @flow strict

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-fbt', { extraOptions: { __self: true } }],
    'babel-plugin-fbt-runtime',
    'relay',
  ],
};
