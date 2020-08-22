// @flow

import { createLocalEnvironment } from '../index';

module.exports = ({
  validMinimalUsage: () => {
    return createLocalEnvironment();
  },

  // Invalid usages:
  invalidUsage: () => {
    // $FlowExpectedError[extra-arg]
    return createLocalEnvironment({
      something: false,
    });
  },
}: $FlowFixMe);
