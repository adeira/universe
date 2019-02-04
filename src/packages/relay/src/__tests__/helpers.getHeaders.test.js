// @flow

import { getHeaders } from '../helpers';

it('returns correct headers for request without uploadables', () => {
  expect(getHeaders()).toEqual({
    Accept: 'application/json',
    'Content-type': 'application/json',
  });
});

it('returns correct headers for request with uploadables', () => {
  // TODO: FlowExpectedError: 'value' literal is not valid uploadable File or Blob
  expect(getHeaders({ key: 'value' })).toEqual({
    Accept: '*/*',
  });
});
