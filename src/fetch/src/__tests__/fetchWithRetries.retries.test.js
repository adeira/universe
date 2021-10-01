// @flow

import * as fetchFn from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import { server, rest } from '../test-utils';

it('retries the request if the previous attempt timed-out', async () => {
  const url = 'https://localhost';
  server.use(
    rest.get(url, (_, res, ctx) => {
      return res(ctx.delay(200), ctx.status(200));
    }),
  );
  const fetch = jest.spyOn(fetchFn, 'default');
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const retryDelays = [10, 30, 50];

  await expect(fetchWithRetries(url, { retryDelays, fetchTimeout: 100 })).rejects.toThrow(
    'fetchWithRetries: Failed to get response from server (https://localhost), tried 4 times.',
  );
  await (() => {
    // We have to wait for the last promise to resolve, if not we have an open handle
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(), 200));
  })();
  expect(fetch.mock.calls).toHaveLength(4);

  expect(fetch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/adeira/universe)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/adeira/universe)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/adeira/universe)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/adeira/universe)",
          },
        },
      ],
    ]
  `);

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    'fetchWithRetries: HTTP timeout (https://localhost), retrying.',
  );
  consoleSpy.mockRestore();
  fetch.mockRestore();
});
