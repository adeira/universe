/**
 * @jest-environment  jsdom
 */
// @flow

import Logger from '../RelayLogger';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

afterEach(() => {
  spy.mockRestore();
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

  expect(spy).toHaveBeenCalledTimes(3);
});
