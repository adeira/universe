// @flow strict

// Babel-eslint currently fails on internal slot properties (this file is excluded in .eslintignore).
// See: https://github.com/babel/babel-eslint/pull/777

type F = {
  (): string,
  (x: boolean): string,
  [[call]](x: number): string,
  [[call]]: string => string,
  ...,
};
