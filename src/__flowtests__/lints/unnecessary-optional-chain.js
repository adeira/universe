// @flow strict

type Foo = {
  bar: number,
  ...
};

declare var foo: Foo;

// $FlowExpectedError[unnecessary-optional-chain]
export const x: number = foo?.bar;

// ~~~~~

type Baz = {
  bar: {
    foo: number,
    ...
  },
  ...
};

declare var baz: ?Baz;

// $FlowExpectedError[unnecessary-optional-chain]
export const y: ?number = baz?.bar?.foo;
