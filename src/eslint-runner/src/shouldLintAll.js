// @flow strict

export default function shouldLintAll(filename: string): boolean {
  // Eslint configs can be nested (not only the root path).
  // See: https://eslint.org/docs/user-guide/configuring#configuration-file-formats
  return /\.eslintrc(?:\.(?:js(?:on)?|ya?ml))?$|package\.json$|^\.eslintignore$/.test(filename);
}
