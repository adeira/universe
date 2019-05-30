// @flow

module.exports = {
  defaultStrippedFiles() {
    // this configuration is not supported and should be removed (should be 'getDefaultStrippedFiles')
  },
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay-example',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/apps/example-relay/', '']]);
  },
};
