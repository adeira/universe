// @flow

import fetchWithRetries from '../fetchWithRetries';
import { rest, server } from '../test-utils';

it('rejects the promise if an error occurred during fetch and no more retries should be attempted', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: 'Ups' }));
    }),
  );

  await expect(
    fetchWithRetries(url, {
      retryDelays: [], // disable retries for this test
    }),
  ).rejects.toThrow('fetchWithRetries: Still no successful response after 1 retries, giving up.');
});
