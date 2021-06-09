// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

beforeEach(() => {
  // TODO: migrate legacy fake timers, see: https://github.com/adeira/universe/issues/2436
  jest.useFakeTimers('legacy');
});

afterEach(() => {
  jest.useRealTimers();
});

it('sends a POST request to the server', () => {
  expect(fetch).not.toHaveBeenCalled();

  fetchWithRetries('https://localhost', { method: 'POST', body: '' });
  expect(fetch).toHaveBeenNthCalledWith(1, 'https://localhost', {
    headers: {
      'User-Agent': '@adeira/fetch (+https://github.com/adeira/universe)',
    },
    method: 'POST',
    body: '',
  });

  fetchWithRetries('https://localhost', {
    method: 'POST',
    body: '',
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
  });
  expect(fetch).toHaveBeenNthCalledWith(2, 'https://localhost', {
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
    method: 'POST',
    body: '',
  });
});
