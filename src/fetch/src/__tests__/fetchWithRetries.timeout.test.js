// @flow

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
