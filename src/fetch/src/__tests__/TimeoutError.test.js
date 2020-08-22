// @flow

import { TimeoutError } from '../fetchWithRetries';

it('is instance of Error and TimeoutError', () => {
  const error = new TimeoutError('ups');
  expect(error).toBeInstanceOf(Error);
  // $FlowExpectedError[incompatible-type]: function is incompatible with statics of existential (?)
  expect(error).toBeInstanceOf(TimeoutError);
});

it('is throwable', () => {
  expect(() => {
    throw new TimeoutError('ups');
  }).toThrowError('ups');
});
