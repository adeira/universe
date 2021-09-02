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
    networkRequestId: 100_000,
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
    networkRequestId: 100_000,
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
          "networkRequestId": 100000,
          "params": Object {
            "cacheID": "",
            "id": null,
            "metadata": Object {},
            "name": "Lol",
            "operationKind": "query",
            "text": "query Lol{id}",
          },
          "variables": Object {},
        },
      ],
      Array [
        Object {
          "networkRequestId": 100000,
        },
      ],
    ]
  `);
});
