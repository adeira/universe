// @flow

import { createNetworkFetcher } from '../../index';

module.exports = ({
  validUsage: () => {
    return {
      case_1: createNetworkFetcher('//localhost', {
        'X-Client': 'ok',
      }),
      case_2: createNetworkFetcher('//localhost', {
        'X-Client': 'ok',
        'Additional-Header': 'ok',
      }),
    };
  },

  // Invalid usages:
  missingXClient: () => {
    return {
      // $FlowExpectedError[incompatible-call]: missing X-Client header
      case_1: createNetworkFetcher('//localhost', {
        'Different-Header': 'err',
      }),
      // $FlowExpectedError[incompatible-call]: missing X-Client header
      case_2: createNetworkFetcher('//localhost'),
    };
  },
  invalidXClient: () => {
    // $FlowExpectedError[incompatible-call]: X-Client header should be string, not number
    return createNetworkFetcher('//localhost', {
      'X-Client': 1,
    });
  },
}: $FlowFixMe);
