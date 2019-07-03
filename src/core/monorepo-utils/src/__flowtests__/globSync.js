// @flow strict-local

import { globSync } from '../glob';

module.exports = {
  // VALID EXAMPLES
  validSimple(): $ReadOnlyArray<string> {
    return globSync('pattern');
  },
  validComplex(): $ReadOnlyArray<string> {
    return globSync('pattern', {
      absolute: true,
    });
  },
  validComplexEmpty(): $ReadOnlyArray<string> {
    return globSync('pattern', {});
  },

  // INVALID EXAMPLES:
  invalidPattern(): empty {
    // $FlowExpectedError: pattern should not be an object
    return globSync({});
  },
  tooManyArgs(): empty {
    // $FlowExpectedError: max 2 arguments expected
    return globSync('pattern', {}, () => {});
  },
  invalidConfig_1(): empty | $ReadOnlyArray<string> {
    return globSync('pattern', {
      // $FlowExpectedError: root option must be string
      root: true,
    });
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError: second argument should be config object
    return globSync('pattern', () => {});
  },
};
