// @flow

import * as fetchFn from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import { rest, server } from '../test-utils';

it('retries the request if the previous attempt failed', async () => {
  let attempts = 0;
  const url = 'https://localhost';
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const fetch = jest.spyOn(fetchFn, 'default');

  server.use(
    rest.get(url, (_, res, ctx) => {
      attempts++;
      return res(ctx.status(attempts % 2 === 0 ? 200 : 500));
    }),
  );

  const res = await fetchWithRetries(url, {});
  expect(fetch.mock.calls).toHaveLength(2);
  expect(res.status).toBe(200);
  expect(consoleSpy).toHaveBeenCalledWith(
    'fetchWithRetries: HTTP error 500 (https://localhost), retrying.',
  );

  consoleSpy.mockRestore();
  fetch.mockRestore();
});
