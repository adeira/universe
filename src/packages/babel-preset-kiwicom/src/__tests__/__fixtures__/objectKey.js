// @flow

declare var __DEV__: string;

module.exports = {
  rules: {},
  globals: {
    __DEV__: 'value',
    [__DEV__]: "this can be changed because it's dynamic",
    key: __DEV__,
  },
};
