// @flow

// See: https://github.com/babel/babel/issues/9810

/*:: type TestType = any; */

const executeNodeScript = (
  aaa /*: string */,
  bbb /*: number */,
  ccc /*: any */,
) /*: TestType */ => {
  return [aaa, bbb, ccc];
};

const supportsESM = (target: string) /*: boolean %checks */ => {
  return target === 'js-esm';
};

module.exports = { executeNodeScript, supportsESM };
