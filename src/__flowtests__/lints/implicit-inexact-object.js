// @flow strict

export type ImplicitExact = { x: number };
export type ExplicitInexact = { x: number, ... };

// We no longer allow this syntax (we use implicit exact by default):
/* eslint-disable fb-flow/use-exact-by-default-object-type */
export type ExplicitExact = {| x: number |};
/* eslint-enable fb-flow/use-exact-by-default-object-type */
