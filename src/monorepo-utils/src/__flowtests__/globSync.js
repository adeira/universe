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
    // $FlowExpectedError[incompatible-call]: pattern should not be an object
    // $FlowExpectedError[incompatible-return]
    return globSync({});
  },
  tooManyArgs(): empty {
    // $FlowExpectedError[extra-arg]: max 2 arguments expected
    // $FlowExpectedError[incompatible-return]
    return globSync('pattern', {}, () => {});
  },
  invalidConfig_1(): empty | $ReadOnlyArray<string> {
    return globSync('pattern', {
      // $FlowExpectedError[incompatible-call]: root option must be string
      root: true,
    });
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError[incompatible-exact]: second argument should be config object
    // $FlowExpectedError[incompatible-return]
    return globSync('pattern', () => {});
  },
};
