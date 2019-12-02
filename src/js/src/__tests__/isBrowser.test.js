/**
 * @jest-environment  jsdom
 */
// @flow

import isBrowser from '../isBrowser';

test('isBrowser', () => {
  expect(isBrowser()).toBe(true);
});
