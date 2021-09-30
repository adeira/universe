// @flow

import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('tries only once for non-transient HTTP code', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.status(403));
    }),
  );

  await expect(fetchWithRetries(url, {})).rejects.toThrow(
    'fetchWithRetries: Still no successful response after 1 retries, giving up.',
  );
});
