// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

it('does not retry for requests with FormData body', async () => {
  const handleNext = jest.fn();
  const handleCatch = jest.fn();

  fetchWithRetries('https://localhost', {
    body: new FormData(),
  })
    .then(handleNext)
    .catch(handleCatch);

  fetch.mock.deferreds[0].resolve({
    status: 500, // this would normally trigger a retry (but not for POST FormData)
  });

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).not.toBeCalled();

  await flushPromises();
  jest.runAllTimers();

  expect(handleNext).not.toBeCalled();
  expect(handleCatch).toBeCalledWith(new Error('fetch: No successful response, giving up.'));

  expect(handleCatch.mock.calls[0][0].response.status).toBe(500);
});
