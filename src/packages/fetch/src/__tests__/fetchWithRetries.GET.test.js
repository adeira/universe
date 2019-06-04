// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

it('sends a GET request to the server', () => {
  expect(fetch).not.toHaveBeenCalled();

  fetchWithRetries('https://localhost', { method: 'GET' });
  expect(fetch).toHaveBeenNthCalledWith(1, 'https://localhost', {
    headers: {
      'User-Agent': '@kiwicom/fetch (+https://github.com/kiwicom/fetch; 1)',
    },
    method: 'GET',
  });

  fetchWithRetries('https://localhost', {
    method: 'GET',
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
  });
  expect(fetch).toHaveBeenNthCalledWith(2, 'https://localhost', {
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
    method: 'GET',
  });
});
