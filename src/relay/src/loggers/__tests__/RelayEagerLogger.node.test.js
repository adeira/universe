/**
 * @flow
 * @jest-environment node
 */

import RelayEagerLogger from '../RelayEagerLogger';

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
});

afterEach(() => {
  spy.mockRestore();
});

it('does not log in Node.js', () => {
  RelayEagerLogger({
    name: 'network.start',
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
    cacheConfig: {},
  });

  expect(spy).not.toHaveBeenCalled();
});
