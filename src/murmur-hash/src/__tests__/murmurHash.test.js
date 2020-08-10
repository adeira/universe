// @flow strict

import murmurHash from '../murmurHash';

it.each`
  input                                                                          | output
  ${'{count: 20, start: 0, end: 5}'}                                             | ${'31sjku'}
  ${'{arg: "{arg: {count: 20, start: 0, end: 5}}"}'}                             | ${'3RGiWM'}
  ${'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(40)} | ${'3OKbT6'}
  ${'{}'}                                                                        | ${'2wIPj2'}
  ${''}                                                                          | ${'0'}
`('works as expected for output [$output]', ({ input, output }) => {
  expect(murmurHash(input)).toEqual(output);
});
