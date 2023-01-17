// @flow strict

// eslint-disable-next-line no-unused-vars
const someUnusedVar = 42;

// eslint-disable-next-line no-unused-vars
function fact(n: number): number {
  if (n < 2) {
    return 1;
  }
  return n * fact(n - 1);
}
