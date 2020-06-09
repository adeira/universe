// @flow

import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

it('preserves fetch timeout of 0s', (done) => {
  expect.assertions(1);

  const handleCatch = jest.fn();

  fetchWithRetries('https://localhost', {
    fetchTimeout: 0,
    retryDelays: [],
  }).catch(handleCatch);

  setTimeout(async () => {
    try {
      await flushPromises();
      expect(handleCatch).toBeCalledWith(
        new Error(
          'fetchWithRetries: Failed to get response from server (https://localhost), tried 1 times.',
        ),
      );
    } catch (error) {
      done.fail(error);
    }
  }, 1);

  jest.runAllTimers();
  done();
});
