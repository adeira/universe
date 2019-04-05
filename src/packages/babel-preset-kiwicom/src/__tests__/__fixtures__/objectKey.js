// @flow strict

module.exports = {
  rules: {},
  globals: {
    // this shouldn't change (valid object key):
    __DEV__: 'value',

    // this should change (replaceable __DEV__ value):
    key: __DEV__,
  },
};
