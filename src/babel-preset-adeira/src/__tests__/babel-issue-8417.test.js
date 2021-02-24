// @flow strict

// See: https://github.com/babel/babel/issues/8417

class Foo {
  constructor() {
    // $FlowExpectedError[prop-missing]
    this.a = 5;
  }
}

class Bar extends Foo {
  declare a: number;
}

it('returns number 5 as expected', () => {
  const bar = new Bar();
  expect(bar.a).toBe(5); // should return 5, not undefined
});
