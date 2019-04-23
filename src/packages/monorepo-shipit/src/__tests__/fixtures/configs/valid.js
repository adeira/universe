// @flow

import path from 'path';

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay-example',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    const ossRoot = 'src/apps/example-relay/';
    return new Map([
      [path.join(ossRoot, '__github__', '.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
};
