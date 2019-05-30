// @flow strict

import path from 'path';

// TODO: defaultProjectFilterChangeset
//  (currently unused)

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
  getDefaultStrippedFiles(): Set<RegExp> {
    return new Set([/__github__/]);
  },
};
