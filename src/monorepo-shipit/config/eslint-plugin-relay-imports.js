// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/eslint-plugin-relay-imports.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-plugin-relay-imports/', '']]);
  },
};
