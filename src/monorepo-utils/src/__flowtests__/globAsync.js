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
    // $FlowExpectedError: pattern should not be an object
    return globAsync({});
  },
  tooManyArgs(): empty {
    // $FlowExpectedError: max 2 arguments expected
    return globAsync('pattern', {}, () => {});
  },
  invalidConfig_1(): empty | Promise<$ReadOnlyArray<string>> {
    return globAsync('pattern', {
      // $FlowExpectedError: root option must be string
      root: true,
    });
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError: second argument should be config object
    return globAsync('pattern', () => {});
  },
};
