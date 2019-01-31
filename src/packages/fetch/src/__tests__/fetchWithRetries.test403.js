// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

let handleNext, handleCatch;
beforeEach(() => {
  handleNext = jest.fn();
  handleCatch = jest.fn();
});

it('tries only once for non-transient HTTP code', () => {
  fetchWithRetries('https://localhost', {})
    .then(handleNext)
    .catch(handleCatch);

  fetch.mock.deferreds[0].resolve({
    status: 403,
  });

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).not.toBeCalled();

  jest.runAllTimers();

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).toBeCalledWith(
    new Error(
      'fetchWithRetries: Still no successful response after 1 retries, giving up.',
    ),
  );

  expect(handleCatch.mock.calls[0][0].response.status).toBe(403);
});
