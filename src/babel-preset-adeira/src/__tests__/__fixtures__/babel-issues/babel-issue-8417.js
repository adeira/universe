/* eslint-disable */

// See: https://github.com/babel/babel/issues/8417

class Foo {
  constructor() {
    this.a = 5;
  }
}

class Bar extends Foo {
  a: number;
}

const bar = new Bar();
console.log(bar.a); // should return 5, not undefined
