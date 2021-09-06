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
    name: 'execute.start',
    executeId: 100_000,
    params: {
      id: null,
      name: 'MyAwesomeQuery',
      operationKind: 'query',
      text: 'query MyAwesomeQuery{id}',
      metadata: {},
      cacheID: '',
    },
    variables: {},
    cacheConfig: {},
  });

  RelayLogger({
    name: 'execute.complete',
    executeId: 100_000,
  });

  expect(consoleErrorSpy).not.toHaveBeenCalled();
  expect(consoleLogSpy).not.toHaveBeenCalled();
  expect(consoleWarnSpy).not.toHaveBeenCalled();
});
