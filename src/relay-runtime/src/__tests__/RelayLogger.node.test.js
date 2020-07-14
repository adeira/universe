/**
 * @flow
 * @jest-environment node
 */

import Logger from '../RelayLogger';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

afterEach(() => {
  spy.mockRestore();
});

it('does not log in Node.js', () => {
  Logger({
    name: 'execute.start',
    transactionID: 1,
    params: {
      id: null,
      name: 'test',
      operationKind: 'query',
      text: 'query Lol{id}',
      metadata: {},
      cacheID: '',
    },
    variables: {},
  });

  expect(spy).not.toHaveBeenCalled();
});
