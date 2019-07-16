// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/vault2env-js.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/vault2env/', '']]);
  },
};
