// @flow strict

import { timeFromStartOfYear } from '../timeFromStartOfYear';

test('timeFromStartOfYear on Jan 1, 2023', () => {
  const testDate = new Date(2023, 0, 1);
  expect(timeFromStartOfYear(testDate)).toBe('today');
});

test('timeFromStartOfYear on Dec 24, 2023', () => {
  const testDate = new Date(2023, 11, 24);
  expect(timeFromStartOfYear(testDate)).toBe('357 days ago');
});
