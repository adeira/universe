// @flow

module.exports = {
  getDefaultStrippedFiles() {
    return new Set<RegExp>([/__github__/]);
  },
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay-example',
    };
  },
  defaultPathMappings() {
    // this configuration is not supported and should be removed (should be 'getDefaultPathMappings')
  },
};
