// @flow strict-local

import { globAsync } from '../glob';

module.exports = {
  // VALID EXAMPLES
  validSimple(): Promise<$ReadOnlyArray<string>> {
    return globAsync('pattern');
  },
  validComplex(): Promise<$ReadOnlyArray<string>> {
    return globAsync('pattern', {
      absolute: true,
    });
  },
  validComplexEmpty(): Promise<$ReadOnlyArray<string>> {
    return globAsync('pattern', {});
  },

  // INVALID EXAMPLES:
  invalidPattern(): empty {
    // $FlowExpectedError[incompatible-call]: pattern should not be an object
    // $FlowExpectedError[incompatible-return]
    return globAsync({});
  },
  tooManyArgs(): empty {
    // $FlowExpectedError[extra-arg]: max 2 arguments expected
    // $FlowExpectedError[incompatible-return]
    return globAsync('pattern', {}, () => {});
  },
  invalidConfig_1(): empty | Promise<$ReadOnlyArray<string>> {
    return globAsync('pattern', {
      // $FlowExpectedError[incompatible-call]: root option must be string
      root: true,
    });
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError[incompatible-exact]: second argument should be config object
    // $FlowExpectedError[incompatible-return]
    return globAsync('pattern', () => {});
  },
};
