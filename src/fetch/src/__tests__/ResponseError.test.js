// @flow

import { ResponseError } from '../fetchWithRetries';

const fetchResponse = {
  status: 403,
};

it('is instance of Error and TimeoutError', () => {
  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error).toBeInstanceOf(Error);
  // $FlowExpectedError[incompatible-type]: function is incompatible with statics of existential (?)
  expect(error).toBeInstanceOf(ResponseError);
});

it('contains response', () => {
  // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error.response).toBe(fetchResponse);
  expect(error.message).toBe('ups');
});

it('is throwable', () => {
  expect(() => {
    // $FlowExpectedError[incompatible-call]: incomplete Response object for testing purposes only
    throw new ResponseError(fetchResponse, 'ups');
  }).toThrowError('ups');
});
