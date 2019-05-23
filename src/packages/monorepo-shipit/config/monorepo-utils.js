// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'monorepo-utils',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/monorepo-utils/', '']]);
  },
};
