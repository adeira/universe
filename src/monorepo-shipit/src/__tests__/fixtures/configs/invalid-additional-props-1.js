// @flow strict

import type { ConfigType } from '../../../../ConfigType.flow';

// $FlowExpectedError[prop-missing]
module.exports = ({
  defaultStrippedFiles() {
    // this configuration is not supported and should be removed (should be 'getStrippedFiles')
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git',
    };
  },
  getPathMappings() {
    return new Map([['src/apps/example-relay/', '']]);
  },
}: ConfigType);
