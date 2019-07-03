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
    // $FlowExpectedError: pattern should be string, not object
    return glob({}, () => {});
  },
  missingCallback(): empty {
    // $FlowExpectedError: at least 2 arguments expected
    return glob('pattern');
  },
  tooManyArgs(): empty {
    // $FlowExpectedError: max 3 arguments expected
    return glob('pattern', {}, () => {}, 'additional');
  },
  invalidConfig_1(): empty {
    return glob(
      'pattern',
      {
        // $FlowExpectedError: root option must be string
        root: true,
      },
      () => {},
    );
  },
  invalidConfig_2(): empty {
    // $FlowExpectedError: config must be object
    return glob('pattern', 'config', () => {});
  },
  invalidCombination(): empty {
    // $FlowExpectedError: missing callback
    return glob('pattern', {});
  },
};
