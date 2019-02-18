// @flow

import { sprintf } from '../index';

it('works with %s', () => {
  expect(sprintf('aaa %s bbb %s ccc', 111, '222')).toBe('aaa 111 bbb 222 ccc');
});

it('works without %s', () => {
  expect(sprintf('aaa bbb ccc')).toBe('aaa bbb ccc');
});
