/**
 * @flow strict
 * @jest-environment jsdom
 */

import isBrowser from '../isBrowser';

test('isBrowser', () => {
  expect(isBrowser()).toBe(true);
});
