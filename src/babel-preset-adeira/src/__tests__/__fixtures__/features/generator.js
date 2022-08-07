// @flow strict

/* eslint-disable */

function* generator(i: number) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 20
