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

it('rejects the promise if an error occurred during fetch and no more retries should be attempted', async () => {
  const handleCatch = jest.fn();
  const error = new Error('ups');

  fetchWithRetries('https://localhost', {
    retryDelays: [], // disable retries for this test
  }).catch(handleCatch);
  fetch.mock.deferreds[0].reject(error);

  expect(handleCatch).not.toBeCalled();

  await flushPromises();
  jest.runAllTimers();

  expect(handleCatch).toBeCalledWith(error);
});
