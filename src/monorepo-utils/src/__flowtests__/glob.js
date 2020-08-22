// @flow strict-local

import { glob } from '../glob';

module.exports = {
  // VALID EXAMPLES
  validSimple(): void {
    return glob('pattern', () => {});
  },
  validComplex(): void {
    return glob(
      'pattern',
      {
        absolute: true,
      },
      () => {},
    );
  },

  // INVALID EXAMPLES:
  invalidPattern(): empty {
    // $FlowExpectedError[incompatible-call]: pattern should be string, not object
    return glob({}, () => {});
  },
  missingCallback(): empty {
    // $FlowExpectedError[incompatible-call]: at least 2 arguments expected
    return glob('pattern');
  },
  tooManyArgs(): empty {
    // $FlowExpectedError[incompatible-call]: max 3 arguments expected
    return glob('pattern', {}, () => {}, 'additional');
  },
  invalidConfig_1(): empty {
    // $FlowExpectedError[incompatible-call]: root option must be string
    return glob(
      'pattern',
      {
        root: true,
      },
      () => {},
    );
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError[incompatible-call]: config must be object
    return glob('pattern', 'config', () => {});
  },
  invalidCombination(): empty {
    // $FlowExpectedError[incompatible-call]: missing callback
    return glob('pattern', {});
  },
};
