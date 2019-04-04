// @flow

// See: https://github.com/babel/babel/issues/9810

/*:: type TestType = any; */

const executeNodeScript = (
  aaa /*: string */,
  bbb /*: number */,
  ccc /*: any */,
) /*: TestType */ => {
  // README: this code is invalid - leaving it here to see whether it's fixed or not

  // This currently yields invalid Flow code. One workaround is to use regular
  // functions and not arrow functions. See the original issue.
  return [aaa, bbb, ccc];
};

module.exports = executeNodeScript;
