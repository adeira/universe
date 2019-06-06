// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'monorepo-npm-publisher',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([
      ['src/core/monorepo-npm-publisher/', ''],
      ['src/packages/monorepo-npm-publisher/', ''],
    ]);
  },
};
