// @flow strict

/* eslint-disable no-else-return */

class Bar {}

// Normally, Eslint would complain because of `consistent-return` error, however,
// rule `node/process-exit-as-throw` makes sure this is not the case.
// See: https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md

// TODO: the following `consistent-return` error is incorrect and should be removed once the following
//       issue is resolved: https://github.com/mysticatea/eslint-plugin-node/issues/301. We decided to
//       accept the low risk for now to ease migration to Eslint 8.
// eslint-disable-next-line consistent-return
export function foo(a: boolean): ?Bar {
  if (a) {
    return new Bar();
  } else {
    process.exit(1);
  }
}
