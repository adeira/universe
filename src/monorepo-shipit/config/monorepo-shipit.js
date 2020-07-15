// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/shipit.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/monorepo-shipit/', '']]);
  },
};
