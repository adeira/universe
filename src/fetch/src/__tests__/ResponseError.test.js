// @flow

import { ResponseError } from '../fetchWithRetries';

const fetchResponse = {
  status: 403,
};

it('is instance of Error and TimeoutError', () => {
  /* $FlowFixMe[invalid-constructor] This comment suppresses an error when
   * upgrading Flow to version 0.176.0. To see the error delete this comment
   * and run Flow. */
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error).toBeInstanceOf(Error);
  /* $FlowFixMe[incompatible-call] This comment suppresses an error when
   * upgrading Flow. To see the error delete this comment and run Flow. */
  expect(error).toBeInstanceOf(ResponseError);
});

it('contains response', () => {
  /* $FlowFixMe[invalid-constructor] This comment suppresses an error when
   * upgrading Flow to version 0.176.0. To see the error delete this comment
   * and run Flow. */
  const error = new ResponseError(fetchResponse, 'ups');
  expect(error.response).toBe(fetchResponse);
  expect(error.message).toBe('ups');
});

it('is throwable', () => {
  expect(() => {
    /* $FlowFixMe[invalid-constructor] This comment suppresses an error when
     * upgrading Flow to version 0.176.0. To see the error delete this comment
     * and run Flow. */
    throw new ResponseError(fetchResponse, 'ups');
  }).toThrow('ups');
});
