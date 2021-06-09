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

it('resolves the promise when the `fetch` was successful', async () => {
  const handleNext = jest.fn();
  const response = {
    status: 200,
  };

  fetchWithRetries('https://localhost', {}).then(handleNext);
  fetch.mock.deferreds[0].resolve(response);

  expect(handleNext).not.toBeCalled();

  await flushPromises();
  jest.runAllTimers();

  expect(handleNext).toBeCalledWith(response);
});
