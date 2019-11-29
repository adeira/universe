/**
 * @jest-environment  node
 */
// @flow

import isBrowser from '../isBrowser';

test('isBrowser', () => {
  expect(isBrowser()).toBe(false);
});
