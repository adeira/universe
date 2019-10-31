// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/monorepo-utils.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/core/monorepo-utils/', '']]);
  },
};
