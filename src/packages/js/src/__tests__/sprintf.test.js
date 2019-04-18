// @flow strict

import { sprintf } from '../index';

test.each([
  ['', 'a  b'],
  ['string', 'a string b'],
  [111, 'a 111 b'],
  [undefined, 'a undefined b'], // just like when you do `String(undefined)`
  [null, 'a null b'],
  [NaN, 'a NaN b'],
  [new RegExp(/x/), 'a /x/ b'],
  [{ aaa: 111 }, 'a [object Object] b'],
  [[1, 2], 'a 1,2 b'],
])('%#) sprintf prints %p correctly for String format', (input, output) => {
  expect(sprintf('a %s b', input)).toBe(output);
});

it('works without placeholder', () => {
  expect(sprintf('aaa bbb ccc')).toBe('aaa bbb ccc');
});

test.each([
  ['', 'a "" b'],
  ['string', 'a "string" b'],
  [111, 'a 111 b'],
  [undefined, 'a undefined b'],
  [null, 'a null b'],
  [NaN, 'a null b'],
  [new RegExp(/x/), 'a {} b'],
  [{ aaa: 111 }, 'a {"aaa":111} b'],
  [{ aaa: 'foo' }, 'a {"aaa":"foo"} b'],
  [[1, 2], 'a [1,2] b'],
])('%#) sprintf prints %p correctly for JSON format', (input, output) => {
  expect(sprintf('a %j b', input)).toBe(output);
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
