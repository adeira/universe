// @flow

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
])('%#) sprintf prints %p correctly', (input, output) => {
  expect(sprintf('a %s b', input)).toBe(output);
});

it('works without %s', () => {
  expect(sprintf('aaa bbb ccc')).toBe('aaa bbb ccc');
});
