// @flow strict

import path from 'path';

import type { ConfigType } from '../../../../ConfigType.flow';

module.exports = ({
  // $FlowExpectedError[prop-missing]
  getBranchConfig() {
    // $FlowExpectedError[prop-missing]
    return {
      // should be 'source' and 'destination'
      what_is_this: 'source_branch',
    };
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/adeira/relay-example.git',
    };
  },
  getPathMappings() {
    const ossRoot = 'src/apps/example-relay/';
    return new Map([
      [path.join(ossRoot, '__github__', '.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
}: ConfigType);
