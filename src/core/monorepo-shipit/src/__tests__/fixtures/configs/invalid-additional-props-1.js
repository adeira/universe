// @flow

module.exports = {
  defaultStrippedFiles() {
    // this configuration is not supported and should be removed (should be 'getDefaultStrippedFiles')
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/kiwicom/relay-example.git',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/apps/example-relay/', '']]);
  },
};
