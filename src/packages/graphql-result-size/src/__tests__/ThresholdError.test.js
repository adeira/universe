// @flow strict

import ThresholdError from '../ThresholdError';

it('works as expected', () => {
  expect.hasAssertions();
  try {
    throw new ThresholdError(100_000);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ThresholdError);
    expect(error.name).toBe('ThresholdError');
    expect(error.message).toBe('Threshold of 100000 reached.');
  }
});
