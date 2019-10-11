// @flow strict

/* eslint-disable */

// $FlowExpectedError: implicit-inexact-object
export type A = { x: number };
export type B = { x: number, ... };
export type C = {| x: number |};
