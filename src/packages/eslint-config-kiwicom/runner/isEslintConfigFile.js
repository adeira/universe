// @flow strict

module.exports = function isEslintConfigFile(filename: string) {
  // Eslint configs can be nested (not only the root path).
  // See: https://eslint.org/docs/user-guide/configuring#configuration-file-formats
  return /\.eslintrc(?:\.(?:js(?:on)?|ya?ml))?$/.test(filename);
};
