/**
 * @jest-environment  node
 */
// @flow strict

import isBrowser from '../isBrowser';

test('isBrowser', () => {
  expect(isBrowser()).toBe(false);
});
