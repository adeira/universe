// @flow

import FormData from 'form-data';

import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('does not retry for requests with FormData body', async () => {
  const url = 'https://localhost';
  server.use(
    rest.post(url, (_, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  await expect(
    fetchWithRetries(url, {
      method: 'POST',
      body: new FormData(),
    }),
  ).rejects.toThrow('fetch: No successful response, giving up.');
});
