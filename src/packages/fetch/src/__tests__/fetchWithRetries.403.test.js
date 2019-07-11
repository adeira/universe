// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

it('tries only once for non-transient HTTP code', async () => {
  const handleNext = jest.fn();
  const handleCatch = jest.fn();

  fetchWithRetries('https://localhost', {})
    .then(handleNext)
    .catch(handleCatch);

  fetch.mock.deferreds[0].resolve({
    status: 403, // non-transient HTTP status code (shouldn't retry)
  });

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).not.toBeCalled();

  await flushPromises();
  jest.runAllTimers();

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).toBeCalledWith(
    new Error('fetchWithRetries: Still no successful response after 1 retries, giving up.'),
  );

  expect(handleCatch.mock.calls[0][0].response.status).toBe(403);
});
