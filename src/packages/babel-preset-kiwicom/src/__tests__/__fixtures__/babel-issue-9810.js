// @flow

// See: https://github.com/babel/babel/issues/9810

/*:: type TestType = any; */

// This currently yields invalid Flow code. One workaround is to use regular
// functions and not arrow functions. See the original issue.
const executeNodeScript = (
  aaa /*: string */,
  bbb /*: number */,
  ccc /*: any */,
) /*: TestType */ => {
  return [aaa, bbb, ccc];
};

// This currently yields invalid Flow code.
const supportsESM = (target: string) /*: boolean %checks */ => {
  return target === 'js-esm';
};

module.exports = { executeNodeScript, supportsESM };
