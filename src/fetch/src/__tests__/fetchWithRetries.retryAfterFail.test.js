// @flow

import { disallowWarnings, expectWarningWillFire } from '@adeira/jest-disallow-console';

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

disallowWarnings();

function mockResponse(status) {
  return { status };
}

it('retries the request if the previous attempt failed', async () => {
  // hm, not sure about this message (why timeout?):
  expectWarningWillFire('fetchWithRetries: HTTP timeout (https://localhost), retrying.');

  const handleNext = jest.fn();
  const failedResponse = mockResponse(500);

  fetchWithRetries('https://localhost', {}).then(handleNext);
  expect(fetch.mock.calls).toHaveLength(1);
  fetch.mock.deferreds[0].resolve(failedResponse);
  for (let ii = 0; ii < 100; ii++) {
    if (fetch.mock.calls.length < 2) {
      jest.runOnlyPendingTimers();
    } else {
      break;
    }
  }

  // Resolved with `failedResponse`, next run is scheduled
  expect(fetch.mock.calls).toHaveLength(2);
  const successfulResponse = mockResponse(200);
  fetch.mock.deferreds[1].resolve(successfulResponse);

  expect(handleNext).not.toBeCalled();
  await flushPromises();
  jest.runAllTimers();
  expect(handleNext).toBeCalledWith(successfulResponse);
});
