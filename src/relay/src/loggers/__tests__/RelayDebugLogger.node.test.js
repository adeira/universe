/**
 * @flow
 * @jest-environment node
 */

import RelayDebugLogger from '../RelayDebugLogger';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

afterEach(() => {
  spy.mockRestore();
});

it('does not log in Node.js', () => {
  RelayDebugLogger({
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
  });

  RelayDebugLogger({
    name: 'network.complete',
    transactionID: 100_000,
  });

  expect(spy).not.toHaveBeenCalled();
});
