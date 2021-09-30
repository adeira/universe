// @flow

import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('defaults fetch timeout to 15s', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(`${url}/14990`, (req, res, ctx) => {
      return res(ctx.delay(14990), ctx.status(200));
    }),
  );
  server.use(
    rest.get(`${url}/15001`, (req, res, ctx) => {
      return res(ctx.delay(15001), ctx.status(200));
    }),
  );

  const [resolves, rejects] = await Promise.allSettled([
    fetchWithRetries(`${url}/14990`, { retryDelays: [] }),
    fetchWithRetries(`${url}/15001`, { retryDelays: [] }),
  ]);

  expect(resolves.status).toBe('fulfilled');
  expect(rejects.status).toBe('rejected');
}, 20000);
