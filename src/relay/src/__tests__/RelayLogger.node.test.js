/**
 * @jest-environment  node
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

it('does not log in node', () => {
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

  expect(spy).not.toHaveBeenCalled();
});
