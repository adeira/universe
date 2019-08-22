// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/babel-plugin-orbit-components.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/packages/babel-plugin-orbit-components/__github__/.eslintignore', '.eslintignore'],
      ['src/packages/babel-plugin-orbit-components/__github__/.eslintrc.js', '.eslintrc.js'],
      ['src/packages/babel-plugin-orbit-components/__github__/.travis.yml', '.travis.yml'],
      ['src/packages/babel-plugin-orbit-components/__github__/babel.config.js', 'babel.config.js'],
      ['src/packages/babel-plugin-orbit-components/', ''],
    ]);
  },
};
