/**
 * @jest-environment  jsdom
 */
// @flow

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
    transactionID: 1,
    params: {
      name: 'test',
      operationKind: 'Node',
      text: 'query Lol{id}',
    },
    variables: {},
  });

  expect(log).toHaveBeenCalledTimes(2);
  expect(groupCollapsed).toHaveBeenCalledTimes(1);
});
