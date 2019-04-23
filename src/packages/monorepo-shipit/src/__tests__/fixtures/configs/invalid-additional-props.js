// @flow

module.exports = {
  invalidExtraField() {
    // this configuration is not supported and shjoult be removed
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
