// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'vault2env-js',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/vault2env/', '']]);
  },
};
