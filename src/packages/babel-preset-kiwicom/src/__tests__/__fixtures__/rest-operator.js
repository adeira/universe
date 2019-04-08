// @flow

/* eslint-disable no-console */

module.exports = function(a: Object, ...rest: Array<any>) {
  console.warn([1, ...rest]);
  const { b, ...c } = a;
  return {
    ...b,
    ...c,
  };
};
