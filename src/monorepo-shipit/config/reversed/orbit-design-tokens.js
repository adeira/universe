// @flow strict

module.exports = {
  getBranchConfig() {
    return {
      source: 'master',
      destination: 'shipit-reversed-test',
    };
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/orbit-design-tokens.git',
    };
  },
  getPathMappings(): Map<string, string> {
    const root = 'src/platform/orbit-design-tokens/';
    return new Map([
      [`${root}__github__/.circleci`, '.circleci'],
      [`${root}__github__/.editorconfig`, '.editorconfig'],
      [`${root}__github__/.flowconfig`, '.flowconfig'],
      [`${root}__github__/.github`, '.github'],
      [`${root}__github__/.prettierrc`, '.prettierrc'],
      [`${root}__github__/flow-typed`, 'flow-typed'],
      [`${root}`, ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    return new Set([/yarn\.lock$/]);
  },
};
