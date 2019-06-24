// @flow strict-local

import { glob } from '../glob';

module.exports = {
  // VALID EXAMPLES
  validSimple() {
    return glob('pattern', () => {});
  },
  validComplex() {
    return glob(
      'pattern',
      {
        absolute: true,
      },
      () => {},
    );
  },

  // INVALID EXAMPLES:
  invalidPattern() {
    // $FlowExpectedError: pattern should be string, not object
    return glob({}, () => {});
  },
  missingCallback() {
    // $FlowExpectedError: at least 2 arguments expected
    return glob('pattern');
  },
  tooManyArgs() {
    // $FlowExpectedError: max 3 arguments expected
    return glob('pattern', {}, () => {}, 'additional');
  },
  invalidConfig_1() {
    return glob(
      'pattern',
      {
        // $FlowExpectedError: root option must be string
        root: true,
      },
      () => {},
    );
  },
  invalidConfig_2() {
    // $FlowExpectedError: config must be object
    return glob('pattern', 'config', () => {});
  },
  invalidCombination() {
    // $FlowExpectedError: missing callback
    return glob('pattern', {});
  },
};
