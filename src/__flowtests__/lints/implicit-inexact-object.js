// @flow strict

export type ImplicitExact = { x: number };
export type ExplicitInexact = { x: number, ... };

// We no longer allow this syntax (we use implicit exact by default):
/* eslint-disable flowtype/require-exact-type */
export type ExplicitExact = {| x: number |};
/* eslint-enable flowtype/require-exact-type */
