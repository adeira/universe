// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

it('sends a GET request to the server', () => {
  expect(fetch).not.toHaveBeenCalled();

  fetchWithRetries('https://localhost', { method: 'GET' });

  expect(fetch).toHaveBeenNthCalledWith(1, 'https://localhost', {
    method: 'GET',
  });
});
