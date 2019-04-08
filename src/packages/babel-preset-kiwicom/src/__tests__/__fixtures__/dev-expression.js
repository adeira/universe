// @flow strict

/* eslint-disable no-console */

if (__DEV__) {
  const dev = __DEV__ ? 'foo' : 'bar';
  console.log(dev);

  console.warn({
    // this shouldn't change (valid object key):
    __DEV__: 'value',

    // this should change (replaceable __DEV__ value):
    key: __DEV__,
  });
}
