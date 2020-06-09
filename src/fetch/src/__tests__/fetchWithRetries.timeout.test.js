// @flow

import fetchWithRetries from '../fetchWithRetries';
import flushPromises from './_flushPromises';

jest.mock('../fetch');

it('defaults fetch timeout to 15s', (done) => {
  expect.assertions(2);

  const handleCatch = jest.fn();

  setTimeout(() => {
    expect(handleCatch).not.toBeCalled();
  }, 14999);

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
  }, 15001);

  fetchWithRetries('https://localhost', { retryDelays: [] }).catch(handleCatch);
  jest.runAllTimers();
  done();
});
