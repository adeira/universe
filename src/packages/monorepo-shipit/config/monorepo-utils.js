// @flow

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'monorepo-utils',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    // TODO: rename to 'monorepo-utils'
    return new Map([['src/packages/monorepo/', '']]);
  },
};
