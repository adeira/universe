// @flow strict

let foo = 1;
const bar = true;
const baz = () => null;
const qux = () => null;

// eslint-disable-next-line curly
if (foo) foo++;

// eslint-disable-next-line curly
while (bar) baz();

if (foo) {
  baz();
  // eslint-disable-next-line curly
} else qux();
