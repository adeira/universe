/**
 * @flow
 * @jest-environment jsdom
 */

import RelayLazyLogger from '../RelayLazyLogger';

let consoleLogSpy;
let consoleErrorSpy;
let groupCollapsed;

beforeEach(() => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  groupCollapsed = jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn());
});

afterEach(() => {
  consoleLogSpy.mockRestore();
  consoleErrorSpy.mockRestore();
  groupCollapsed.mockRestore();
});

it('logs network.complete as expected', () => {
  RelayLazyLogger({
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

  RelayLazyLogger({
    name: 'network.complete',
    transactionID: 100_000,
  });

  expect(consoleLogSpy).toHaveBeenCalledTimes(2);
  expect(consoleLogSpy).toHaveBeenCalledWith('Variables: %o', {});
  expect(consoleLogSpy).toHaveBeenCalledWith('Response: %o', undefined);
  expect(consoleErrorSpy).not.toHaveBeenCalled();
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(groupCollapsed).toHaveBeenCalledWith('%c%s', 'font-weight:bold;', '[Relay query] Lol');
});

it('logs network.error as expected', () => {
  RelayLazyLogger({
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

  RelayLazyLogger({
    name: 'network.error',
    transactionID: 100_000,
    error: new Error('ups'),
  });

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('ups'));
  expect(consoleLogSpy).not.toHaveBeenCalled();
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s',
    'font-weight:bold;color:red',
    '[Relay query] Lol',
  );
});
