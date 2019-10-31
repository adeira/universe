// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/fetch.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/fetch/', '']]);
  },
};
