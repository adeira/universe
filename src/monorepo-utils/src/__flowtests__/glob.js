// @flow strict-local

import { glob } from '../glob';

type GlobReturn = Promise<$ReadOnlyArray<string>>;

module.exports = {
  // VALID EXAMPLES
  validSimple(): GlobReturn {
    return glob('pattern');
  },
  validComplex(): GlobReturn {
    return glob('pattern', {
      absolute: true,
    });
  },

  // INVALID EXAMPLES:
  invalidPattern(): GlobReturn {
    // $FlowExpectedError[incompatible-call]: pattern should be string, not object
    return glob({});
  },
  tooManyArgs(): GlobReturn {
    // $FlowExpectedError[extra-arg]: max 3 arguments expected
    return glob('pattern', {}, () => {}, 'additional');
  },
  invalidConfig_1(): GlobReturn {
    return glob('pattern', {
      // $FlowExpectedError[incompatible-call]: root option must be string
      root: true,
    });
  },
  invalidConfig_2(): GlobReturn {
    // $FlowExpectedError[incompatible-call]: config must be object
    return glob('pattern', 'config');
  },
  invalidSimpleDeprecated(): GlobReturn {
    // $FlowExpectedError[incompatible-exact]: second argument used to be callback but is now config
    return glob('pattern', () => {});
  },
  invalidComplexDeprecated(): GlobReturn {
    return glob(
      'pattern',
      {
        absolute: true,
      },
      // $FlowExpectedError[extra-arg]: third argument used to be callback but is no longer supported
      () => {},
    );
  },
};
