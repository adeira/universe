// @flow

import { createNetworkFetcher } from '../index';

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
      case_3: createNetworkFetcher('//localhost', {
        'Different-Header': 'err',
      }),
      case_4: createNetworkFetcher('//localhost'),
      case_5: createNetworkFetcher('//localhost', {}, { credentials: 'include' }),
    };
  },

  // Invalid usages:
  invalidHTTPHeader: () => {
    // $FlowExpectedError[incompatible-call]: HTTP header values should be string, not number
    return createNetworkFetcher('//localhost', {
      'my-awesome-header': 1,
    });
  },
}: $FlowFixMe);
