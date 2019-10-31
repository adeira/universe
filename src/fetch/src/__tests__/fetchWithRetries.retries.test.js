// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

it('retries the request if the previous attempt timed-out', async () => {
  let retries;
  const handleNext = jest.fn();
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const retryDelays = [1000, 3000, 5000];

  fetchWithRetries('https://localhost', { retryDelays }).catch(handleNext);
  expect(fetch.mock.calls).toHaveLength(1);
  for (retries = 0; retries < retryDelays.length; retries++) {
    // Timeout request.
    jest.runAllTimers();
  }
  expect(fetch.mock.calls).toHaveLength(retries + 1);

  // Timeout last request.
  await flushPromises();
  jest.runAllTimers();

  expect(fetch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/kiwicom/fetch; 1)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/kiwicom/fetch; 2)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/kiwicom/fetch; 3)",
          },
        },
      ],
      Array [
        "https://localhost",
        Object {
          "headers": Object {
            "User-Agent": "@adeira/fetch (+https://github.com/kiwicom/fetch; 4)",
          },
        },
      ],
    ]
  `);
  expect(handleNext.mock.calls[0][0].message).toEqual(
    'fetchWithRetries: Failed to get response from server (https://localhost), tried 4 times.',
  );

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  expect(consoleSpy).toHaveBeenCalledWith(
    'fetchWithRetries: HTTP timeout (https://localhost), retrying.',
  );
  consoleSpy.mockRestore();
});
