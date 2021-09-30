// @flow

import { server, rest } from '../test-utils';
import * as fetchFn from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

it('sends a GET request to the server', async () => {
  const url = 'https://localhost';
  const fetch = jest.spyOn(fetchFn, 'default');

  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.status(200));
    }),
  );
  expect(fetch).not.toHaveBeenCalled();

  await fetchWithRetries(url, { method: 'GET' });
  expect(fetch).toHaveBeenNthCalledWith(1, url, {
    headers: {
      'User-Agent': '@adeira/fetch (+https://github.com/adeira/universe)',
    },
    method: 'GET',
  });

  await fetchWithRetries(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
  });
  expect(fetch).toHaveBeenNthCalledWith(2, url, {
    headers: {
      'User-Agent': 'my-custom-UA-string',
    },
    method: 'GET',
  });
  fetch.mockRestore();
});
