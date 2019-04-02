// @flow strict-local

// See: https://github.com/babel/babel/issues/9810

/*:: type TestType = number; */

const testFunction = () /*: TestType */ => 42;

module.exports = testFunction;
