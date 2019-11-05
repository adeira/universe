// @flow

/* eslint-disable no-console */

type AnyObject = { +[key: string]: any, ... };

module.exports = function(a: AnyObject, ...rest: Array<any>): AnyObject {
  console.warn([1, ...rest]);
  const { b, ...c } = a;
  return {
    ...b,
    ...c,
  };
};
