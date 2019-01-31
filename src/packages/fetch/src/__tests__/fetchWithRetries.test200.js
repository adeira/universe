// @flow

import fetch from '../fetch';
import fetchWithRetries from '../fetchWithRetries';

jest.mock('../fetch');

let handleNext;
beforeEach(() => {
  handleNext = jest.fn();
});

it('resolves the promise when the `fetch` was successful', () => {
  const response = {
    status: 200,
  };

  fetchWithRetries('https://localhost', {}).then(handleNext);
  fetch.mock.deferreds[0].resolve(response);

  expect(handleNext).not.toBeCalled();
  jest.runAllTimers();
  expect(handleNext).toBeCalledWith(response);
});
