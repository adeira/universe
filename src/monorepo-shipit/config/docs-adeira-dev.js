// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/adeira.dev.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/docs/', '']]);
  },
};
