/**
 * @flow
 * @jest-environment jsdom
 */

import Logger from '../RelayLogger';

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

it("calls event 'execute.start' as expected", () => {
  Logger({
    name: 'execute.start',
    transactionID: 100_000,
    params: {
      id: null,
      name: 'test',
      operationKind: 'query',
      text: 'query Lol{id}',
      metadata: {},
    },
    variables: {},
  });

  expect(consoleLogSpy).toHaveBeenCalledTimes(2);
  expect(consoleLogSpy).toHaveBeenCalledWith('Variables: %o', {});
  expect(consoleLogSpy).toHaveBeenCalledWith('query Lol{id}');
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s%c%s',
    'font-weight:bold;',
    '[Relay 1] execute.start',
    'font-weight:normal',
    ' - test 🔍 (13)',
  );
});

test.each([
  // response => groupCollapsedArgs
  [{ data: null, extensions: {} }, ['%c%s', 'font-weight:bold;', '[Relay 1] execute.next']],
  [{ data: 'mock' }, ['%c%s', 'font-weight:bold;', '[Relay 1] execute.next']],
  [
    { errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] execute.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
  [
    { data: null, errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] execute.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
  [
    { data: 'mock', errors: 'oops' },
    [
      '%c%s%c%s',
      'font-weight:bold;color:orange',
      '[Relay 1] execute.next',
      'font-weight:normal',
      ' - partial response with errors',
    ],
  ],
])("%#) calls event 'execute.next' as expected", (response, groupCollapsedArgs) => {
  Logger({
    name: 'execute.next',
    transactionID: 100_000,
    response,
  });

  expect(groupCollapsed).toHaveBeenCalledWith(...groupCollapsedArgs);
});

it("calls event 'execute.error' as expected", () => {
  Logger({
    name: 'execute.error',
    transactionID: 100_000,
    error: new Error('oops'),
  });

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('oops'));
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s',
    'font-weight:bold;color:red',
    '[Relay 1] execute.error',
  );
});

test.each(['execute.info', 'execute.complete', 'execute.unsubscribe'])(
  "calls event '%s' as expected",
  eventName => {
    // $FlowExpectedError: OK for testing purposes - additional props are being ignored for these events
    Logger({
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
