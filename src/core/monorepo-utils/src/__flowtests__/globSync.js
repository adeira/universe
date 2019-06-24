// @flow strict-local

import { globSync } from '../glob';

module.exports = {
  // VALID EXAMPLES
  validSimple() {
    return globSync('pattern');
  },
  validComplex() {
    return globSync('pattern', {
      absolute: true,
    });
  },
  validComplexEmpty() {
    return globSync('pattern', {});
  },

  // INVALID EXAMPLES:
  invalidPattern() {
    // $FlowExpectedError: pattern should not be an object
    return globSync({});
  },
  tooManyArgs() {
    // $FlowExpectedError: max 2 arguments expected
    return globSync('pattern', {}, () => {});
  },
  invalidConfig_1() {
    return globSync('pattern', {
      // $FlowExpectedError: root option must be string
      root: true,
    });
  },
  invalidConfig_2() {
    // $FlowExpectedError: second argument should be config object
    return globSync('pattern', () => {});
  },
};
