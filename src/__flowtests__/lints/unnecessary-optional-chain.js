// @flow strict

type Foo = {
  bar: number,
  ...
};

declare var foo: Foo;

// $FlowExpectedError[signature-verification-failure]
// $FlowExpectedError[unnecessary-optional-chain]
export const x = foo?.bar;

// ~~~~~

type Baz = {
  bar: {
    foo: number,
    ...
  },
  ...
};

declare var baz: ?Baz;

// $FlowExpectedError[signature-verification-failure]
// $FlowExpectedError[unnecessary-optional-chain]
export const y = baz?.bar?.foo;
