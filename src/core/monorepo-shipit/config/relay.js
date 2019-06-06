// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/relay/', '']]);
  },
};
