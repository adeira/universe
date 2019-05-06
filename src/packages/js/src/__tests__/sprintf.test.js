// @flow strict

import { sprintf } from '../index';

test.each([
  ['', 'a  b', 'a "" b'],
  ['string', 'a string b', 'a "string" b'],
  [111, 'a 111 b', 'a 111 b'],
  [
    undefined,
    'a undefined b', // just like when you do `String(undefined)`
    'a undefined b',
  ],
  [null, 'a null b', 'a null b'],
  [NaN, 'a NaN b', 'a null b'],
  [new RegExp(/x/), 'a /x/ b', 'a {} b'],
  [{ aaa: 111 }, 'a [object Object] b', 'a {"aaa":111} b'],
  [{ aaa: 'foo' }, 'a [object Object] b', 'a {"aaa":"foo"} b'],
  [[1, 2], 'a 1,2 b', 'a [1,2] b'],
])(
  '%#) sprintf prints %p correctly for all supported formats',
  (input, outputString, outputJSON) => {
    expect(sprintf('a %s b', input)).toBe(outputString);
    expect(sprintf('a %j b', input)).toBe(outputJSON);
  },
);

it('works without placeholder', () => {
  expect(sprintf('aaa bbb ccc')).toBe('aaa bbb ccc');
});

it('works with String and JSON together', () => {
  expect(sprintf('a %s b %j c', '111', '222')).toBe('a 111 b "222" c');
});

it('JSON format handles circular references', () => {
  const obj = {
    a: 'foo',
  };
  // $FlowExpectedError: Intentional circular reference created
  obj.b = obj;
  expect(sprintf('%j', obj)).toBe('{"a":"foo","b":"[Circular]"}');
});
