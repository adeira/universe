// @flow strict

import type { ConfigType } from '../../../../ConfigType.flow';

// $FlowExpectedError[prop-missing]
module.exports = ({
  // getStaticConfig missing
  getPathMappings() {
    return new Map([['src/apps/example-relay/', '']]);
  },
}: ConfigType);
