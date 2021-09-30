// @flow

import fetchWithRetries from '../fetchWithRetries';
import { rest, server } from '../test-utils';

it('preserves fetch timeout of 0s', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.delay(500), ctx.status(200));
    }),
  );
  expect.assertions(1);

  await expect(
    fetchWithRetries(url, {
      fetchTimeout: 0,
      retryDelays: [],
    }),
  ).rejects.toThrow(
    'fetchWithRetries: Failed to get response from server (https://localhost), tried 1 times.',
  );
});
