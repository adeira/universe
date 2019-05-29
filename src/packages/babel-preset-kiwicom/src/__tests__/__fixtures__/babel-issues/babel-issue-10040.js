// @flow strict

// Babel is currently losing ` ... ` while  tranpiling this type.
// See: https://github.com/babel/babel/issues/10040

export type ExplicitlyInexact = { foo: number, ... };
