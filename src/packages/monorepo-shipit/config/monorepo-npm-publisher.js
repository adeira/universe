// @flow

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'monorepo-npm-publisher',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/monorepo-npm-publisher/', '']]);
  },
};
