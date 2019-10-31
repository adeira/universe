// @flow strict

import path from 'path';

module.exports = {
  getBranchConfig() {
    return {
      // should be 'source' and 'destination'
      what_is_this: 'source_branch',
    };
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/kiwicom/relay-example.git',
    };
  },
  getPathMappings(): Map<string, string> {
    const ossRoot = 'src/apps/example-relay/';
    return new Map([
      [path.join(ossRoot, '__github__', '.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
};
