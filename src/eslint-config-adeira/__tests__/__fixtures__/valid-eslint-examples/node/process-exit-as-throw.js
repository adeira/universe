// @flow strict

/* eslint-disable no-else-return */

class Bar {}

// Normally, Eslint would complain because of `consistent-return` error, however,
// rule `node/process-exit-as-throw` makes sure this is not the case.
// See: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
export function foo(a: boolean): ?Bar {
  if (a) {
    return new Bar();
  } else {
    process.exit(1);
  }
}
