// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

function mockResponse(status) {
  return { status };
}

let handleNext;
beforeEach(() => {
  handleNext = jest.fn();
});

it('gives up if response failed after retries', () => {
  const init = { retryDelays: [600] };
  const failedResponse = mockResponse(500);
  const handleCatch = jest.fn();
  fetchWithRetries('https://localhost', init)
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
  // No more re-tries, it should reject with an `Error`
  expect(handleNext).not.toBeCalled();
  jest.runAllTimers();
  const errorArg = handleCatch.mock.calls[0][0];
  expect(errorArg instanceof Error).toBe(true);
  expect(errorArg.message).toEqual(
    'fetchWithRetries: Still no successful response after 2 retries, giving up.',
  );
  expect(errorArg.response).toEqual(failedResponse);
});
