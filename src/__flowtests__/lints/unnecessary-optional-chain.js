// @flow strict

type Foo = {
  bar: number,
  ...
};

declare var foo: Foo;

// $FlowExpectedError: unnecessary-optional-chain
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

// $FlowExpectedError: unnecessary-optional-chain
export const y = baz?.bar?.foo;
