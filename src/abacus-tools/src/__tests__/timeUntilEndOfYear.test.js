// @flow strict

import { timeUntilEndOfYear } from '../timeUntilEndOfYear';

test('timeUntilEndOfYear on Jan 1, 2023', () => {
  const testDate = new Date(2023, 0, 1);
  expect(timeUntilEndOfYear(testDate)).toBe('in 365 days');
});

test('timeUntilEndOfYear on Dec 24, 2023', () => {
  const testDate = new Date(2023, 11, 24);
  expect(timeUntilEndOfYear(testDate)).toBe('in 8 days');
});
