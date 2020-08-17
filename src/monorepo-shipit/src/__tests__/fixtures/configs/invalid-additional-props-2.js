// @flow strict

import type { ConfigType } from '../../../../ConfigType.flow';

// $FlowExpectedError[prop-missing]
module.exports = ({
  getStrippedFiles() {
    return new Set<RegExp>([/__github__/]);
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git',
    };
  },
  defaultPathMappings() {
    // this configuration is not supported and should be removed (should be 'getPathMappings')
  },
}: ConfigType);
