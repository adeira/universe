// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/eslint-plugin-graphql-fragments.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-plugin-graphql-fragments/', '']]);
  },
};
