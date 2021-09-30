// @flow

import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('resolves the promise when the `fetch` was successful', async () => {
  const response = {
    message: 'resolved',
  };
  server.use(
    rest.get('https://localhost', (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(response));
    }),
  );

  const res = await fetchWithRetries('https://localhost', {});
  expect(res.status).toBe(200);
  const json = await res.json();

  expect(json).toEqual(response);
});
