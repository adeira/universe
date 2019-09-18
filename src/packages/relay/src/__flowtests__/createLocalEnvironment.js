// @flow

import { createLocalEnvironment } from '../index';

module.exports = {
  validMinimalUsage: () => {
    return createLocalEnvironment();
  },

  // Invalid usages:
  invalidUsage: () => {
    // $FlowExpectedError: Cannot call createLocalEnvironment because no arguments are expected by function [1].
    return createLocalEnvironment({
      something: false,
    });
  },
};
