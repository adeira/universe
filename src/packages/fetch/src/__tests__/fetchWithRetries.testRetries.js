// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

let handleNext;
beforeEach(() => {
  handleNext = jest.fn();
});

it('retries the request if the previous attempt timed-out', () => {
  let retries;
  const retryDelays = [1000, 3000, 5000];
  const init = { retryDelays };
  fetchWithRetries('https://localhost', init).catch(handleNext);
  expect(fetch.mock.calls).toHaveLength(1);
  for (retries = 0; retries < retryDelays.length; retries++) {
    // Timeout request.
    jest.runAllTimers();
  }
  expect(fetch.mock.calls).toHaveLength(retries + 1);
  // Timeout last request.
  jest.runAllTimers();
  expect(handleNext.mock.calls[0][0].message).toEqual(
    'fetchWithRetries: Failed to get response from server (https://localhost), tried ' +
      (retries + 1) +
      ' times.',
  );
});
