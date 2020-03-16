/**
 * @flow
 * @jest-environment  jsdom
 */

import Logger from '../RelayLogger';

let log;
let groupCollapsed;

beforeEach(() => {
  log = jest.spyOn(console, 'log').mockImplementation(jest.fn());
  groupCollapsed = jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn());
});

afterEach(() => {
  log.mockRestore();
  groupCollapsed.mockRestore();
});

it('logs in browser', () => {
  Logger({
    name: 'execute.start',
    transactionID: 100_000,
    params: {
      name: 'test',
      operationKind: 'Node',
      text: 'query Lol{id}',
    },
    variables: {},
  });

  expect(log).toHaveBeenCalledTimes(2);
  expect(log).toHaveBeenCalledWith('Variables: %o', {});
  expect(log).toHaveBeenCalledWith('query Lol{id}');
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
  expect(groupCollapsed).toHaveBeenCalledWith(
    '%c%s%c%s',
    'font-weight:bold;',
    '[Relay 1] execute.start',
    'font-weight:normal',
    ' - test 🔍 (13)',
  );
});
