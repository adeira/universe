// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'fetch',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/fetch/', '']]);
  },
};
