// @flow

import { createEnvironment } from '../index';

module.exports = {
  validUsage: () => {
    return createEnvironment({
      fetchFn: () => false,
    });
  },

  // Invalid usages:
  invalidUsage: () => {
    // $FlowExpectedError: property 'fetcherFn' should be in fact 'fetchFn'
    return createEnvironment({
      fetcherFn: () => false,
    });
  },
};
