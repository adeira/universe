// @flow

import fetchWithRetries from '../fetchWithRetries';
import { rest, server } from '../test-utils';

it('gives up if response failed after retries', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  await expect(fetchWithRetries(url, { retryDelays: [600] })).rejects.toThrow(
    'fetchWithRetries: Still no successful response after 2 retries, giving up.',
  );

  expect(consoleSpy).toHaveBeenCalledWith(
    'fetchWithRetries: HTTP error 500 (https://localhost), retrying.',
  );
  consoleSpy.mockRestore();
});
