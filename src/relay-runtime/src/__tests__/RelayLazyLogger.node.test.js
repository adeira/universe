/**
 * @flow
 * @jest-environment node
 */

import RelayLazyLogger from '../RelayLazyLogger';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

afterEach(() => {
  spy.mockRestore();
});

it('does not log in Node.js', () => {
  RelayLazyLogger({
    name: 'execute.start',
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

  RelayLazyLogger({
    name: 'execute.complete',
    transactionID: 100_000,
  });

  expect(spy).not.toHaveBeenCalled();
});
