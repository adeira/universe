/**
 * @flow
 * @jest-environment jsdom
 */

import RelayLogger from '../RelayLogger';

let consoleErrorSpy;
let consoleLogSpy;
let consoleGroupCollapsedSpy;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
  consoleGroupCollapsedSpy = jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn());
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
  consoleLogSpy.mockRestore();
  consoleGroupCollapsedSpy.mockRestore();
});

it('logs network.complete as expected', () => {
  RelayLogger({
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
    cacheConfig: {},
  });

  RelayLogger({
    name: 'network.complete',
    transactionID: 100_000,
  });

  expect(consoleErrorSpy).not.toHaveBeenCalled();
  expect(consoleGroupCollapsedSpy.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "%c%s",
        "font-weight:bold",
        "[Relay] network.start",
      ],
      Array [
        "%c%s",
        "font-weight:bold",
        "[Relay] network.complete",
      ],
    ]
  `);
  expect(consoleLogSpy.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "cacheConfig": Object {},
          "params": Object {
            "cacheID": "",
            "id": null,
            "metadata": Object {},
            "name": "Lol",
            "operationKind": "query",
            "text": "query Lol{id}",
          },
          "transactionID": 100000,
          "variables": Object {},
        },
      ],
      Array [
        Object {
          "transactionID": 100000,
        },
      ],
    ]
  `);
});
