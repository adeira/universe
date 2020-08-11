/**
 * @jest-environment  jsdom
 */
// @flow strict

import isBrowser from '../isBrowser';

test('isBrowser', () => {
  expect(isBrowser()).toBe(true);
});
