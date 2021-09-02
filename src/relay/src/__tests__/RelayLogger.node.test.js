/**
 * @flow
 * @jest-environment node
 */

import RelayLogger from '../RelayLogger';

let consoleLogSpy;
let consoleErrorSpy;
let consoleWarnSpy;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
  consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
  consoleLogSpy.mockRestore();
  consoleWarnSpy.mockRestore();
});

it('does not log in Node.js environment', () => {
  RelayLogger({
    name: 'network.start',
    transactionID: 100_000,
    params: {
      id: null,
      name: 'Lol',
      operationKind: 'query',
      text: 'query Lol{id}',
      metadata: {},
      cacheID: '',
    },
    variables: {},
    cacheConfig: {},
  });

  RelayLogger({
    name: 'network.complete',
    transactionID: 100_000,
  });

  expect(consoleErrorSpy).not.toHaveBeenCalled();
  expect(consoleLogSpy).not.toHaveBeenCalled();
  expect(consoleWarnSpy).not.toHaveBeenCalled();
});
