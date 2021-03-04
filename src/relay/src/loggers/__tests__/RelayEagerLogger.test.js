/**
 * @flow
 * @jest-environment jsdom
 */

import RelayEagerLogger from '../RelayEagerLogger';

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

it("calls event 'network.start' as expected", () => {
  RelayEagerLogger({
    name: 'network.start',
    transactionID: 100_000,
    params: {
      id: null,
      name: 'test',
      operationKind: 'query',
      text: 'query Lol{id}',
      metadata: {},
      cacheID: '',
    },
    variables: {},
    cacheConfig: {},
  });

  expect(consoleLogSpy).toHaveBeenCalledTimes(2);
  expect(consoleLogSpy).toHaveBeenCalledWith('Variables: %o', {});
  expect(consoleLogSpy).toHaveBeenCalledWith('query Lol{id}');
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s%c%s',
    'font-weight:bold;',
    '[Relay 1] network.start',
    'font-weight:normal',
    ' - test 🔍 (13)',
  );
});

test.each([
  // response => groupCollapsedArgs
  [{ data: null, extensions: {} }, ['%c%s', 'font-weight:bold;', '[Relay 1] network.next']],
  [{ data: 'mock' }, ['%c%s', 'font-weight:bold;', '[Relay 1] network.next']],
  [
    { errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] network.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
  [
    { data: null, errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] network.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
  [
    { data: 'mock', errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] network.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
])("%#) calls event 'network.next' as expected", (response, groupCollapsedArgs) => {
  RelayEagerLogger({
    name: 'network.next',
    transactionID: 100_000,
    response,
  });

  expect(groupCollapsed).toHaveBeenCalledWith(...groupCollapsedArgs);
});

it("calls event 'network.error' as expected", () => {
  RelayEagerLogger({
    name: 'network.error',
    transactionID: 100_000,
    error: new Error('oops'),
  });

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('oops'));
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s',
    'font-weight:bold;color:red',
    '[Relay 1] network.error',
  );
});

test.each(['network.complete', 'network.unsubscribe'])(
  "calls event '%s' as expected",
  (eventName) => {
    // $FlowExpectedError[speculation-ambiguous]: OK for testing purposes - additional props are being ignored for these events
    RelayEagerLogger({
      name: eventName,
      transactionID: 100_001,
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      '%c%s',
      'font-weight:bold',
      `[Relay 2] ${eventName}`,
    );
  },
);
