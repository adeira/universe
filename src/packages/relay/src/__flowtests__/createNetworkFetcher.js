// @flow

import { createNetworkFetcher } from '../index';

module.exports = {
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
      // $FlowExpectedError: missing X-Client header
      case_1: createNetworkFetcher('//localhost', {
        'Different-Header': 'err',
      }),
      // $FlowExpectedError: missing X-Client header
      case_2: createNetworkFetcher('//localhost'),
    };
  },
  invalidXClient: () => {
    return createNetworkFetcher('//localhost', {
      // $FlowExpectedError: X-Client header should be string, not number
      'X-Client': 1,
    });
  },
};
