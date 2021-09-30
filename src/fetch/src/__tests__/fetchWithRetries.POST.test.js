// @flow

import * as fetchFn from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('sends a POST request to the server', async () => {
  const url = 'https://localhost';
  const fetch = jest.spyOn(fetchFn, 'default');
  server.use(
    rest.post(url, (_, res, ctx) => {
      return res(ctx.json(200));
    }),
  );

  expect(fetch).not.toHaveBeenCalled();

  await fetchWithRetries(url, { method: 'POST', body: '' });
  expect(fetch).toHaveBeenNthCalledWith(1, url, {
    headers: {
      'User-Agent': '@adeira/fetch (+https://github.com/adeira/universe)',
    },
    method: 'POST',
    body: '',
  });

  await fetchWithRetries(url, {
    method: 'POST',
    body: '',
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
  });
  expect(fetch).toHaveBeenNthCalledWith(2, url, {
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
    method: 'POST',
    body: '',
  });
  fetch.mockRestore();
});
