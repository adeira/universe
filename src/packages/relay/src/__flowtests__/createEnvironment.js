// @flow

import { createEnvironment } from '../index';

const getOperation = (reference: string) => {
  // $FlowAllowDynamicImport
  return import(`./src/__generated__/${reference}`);
};

module.exports = {
  validMinimalUsage: () => {
    return createEnvironment({
      fetchFn: () => false,
    });
  },
  withOperationLoader: () => {
    return createEnvironment({
      fetchFn: () => false,
      operationLoader: {
        get(reference) {
          return getOperation(reference);
        },
        load(reference) {
          return getOperation(reference);
        },
      },
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
