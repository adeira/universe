// @flow

/* eslint-disable no-console */

module.exports = function(a: Object, ...rest: Array<any>) {
  console.warn(rest);
  return {
    ...a,
  };
};
