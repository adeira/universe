// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'monorepo-shipit',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([
      ['src/core/monorepo-shipit/', ''],
      ['src/packages/monorepo-shipit/', ''],
    ]);
  },
};
