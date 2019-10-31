// @flow

import { ResponseError } from '../fetchWithRetries';

// $FlowExpectedError: incomplete Response object for testing purposes only
const fetchResponse = {
  status: 403,
};

it('is instance of Error and TimeoutError', () => {
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error).toBeInstanceOf(Error);
  // $FlowExpectedError: function is incompatible with statics of existential (?)
  expect(error).toBeInstanceOf(ResponseError);
});

it('contains response', () => {
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error.response).toBe(fetchResponse);
  expect(error.message).toBe('ups');
});

it('is throwable', () => {
  expect(() => {
    throw new ResponseError(fetchResponse, 'ups');
  }).toThrowError('ups');
});
