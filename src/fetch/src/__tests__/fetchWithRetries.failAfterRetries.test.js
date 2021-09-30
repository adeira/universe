// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

beforeEach(() => {
  // TODO: migrate legacy fake timers, see: https://github.com/adeira/universe/issues/2436
  jest.useFakeTimers('legacy');
});

afterEach(() => {
  jest.useRealTimers();
});

function mockResponse(status) {
  return { status };
}

it('gives up if response failed after retries', async () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  const handleNext = jest.fn();
  const handleCatch = jest.fn();

  const failedResponse = mockResponse(500);

  fetchWithRetries('https://localhost', { retryDelays: [600] })
    .then(handleNext)
    .catch(handleCatch);

  expect(fetch.mock.calls).toHaveLength(1);
  fetch.mock.deferreds[0].resolve(failedResponse);

  for (let ii = 0; ii < 100; ii++) {
    if (fetch.mock.calls.length < 2) {
      jest.runOnlyPendingTimers();
    } else {
      break;
    }
  }

  // Resolved with `failedResponse`, next run is scheduled
  expect(fetch.mock.calls).toHaveLength(2);
  fetch.mock.deferreds[1].resolve(failedResponse);

  await flushPromises();
  jest.runAllTimers();

  // No more re-tries, it should reject with an `Error`
  expect(handleNext).not.toBeCalled();
  const errorArg = handleCatch.mock.calls[0][0];
  expect(errorArg instanceof Error).toBe(true);
  expect(errorArg.message).toBe(
    'fetchWithRetries: Still no successful response after 2 retries, giving up.',
  );
  expect(errorArg.response).toEqual(failedResponse);

  expect(consoleSpy).toHaveBeenCalledWith(
    // hm, not sure about this message (why timeout?):
    'fetchWithRetries: HTTP timeout (https://localhost), retrying.',
  );
  consoleSpy.mockRestore();
});
