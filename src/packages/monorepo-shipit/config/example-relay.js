// @flow

// TODO: defaultProjectFilterChangeset
// TODO: getDefaultStrippedFiles
//  (currently unused)

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay-example',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    // TODO: rename to 'relay-example'
    const ossRoot = 'src/apps/relay-example/';
    return new Map([
      // [path.join(ossRoot, '__github__/.flowconfig'), '.flowconfig'],
      [ossRoot, ''],
    ]);
  },
};
