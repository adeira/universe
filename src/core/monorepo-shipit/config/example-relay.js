// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'relay-example',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([
      ['src/incubator/example-relay/__github__/.circleci', '.circleci'],
      ['src/incubator/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/incubator/example-relay/', ''],
    ]);
  },
  getDefaultStrippedFiles(): Set<RegExp> {
    return new Set([/__github__/]);
  },
};
