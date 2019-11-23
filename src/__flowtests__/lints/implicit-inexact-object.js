// @flow strict

/* eslint-disable flowtype/require-inexact-type */

// This is currently not allowed but it will eventually be the default:
// flowlint ambiguous-object-type:off
export type A = { x: number };
export type B = { x: number, ... };
export type C = {| x: number |};
