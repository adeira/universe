/**
 * @flow
 * @jest-environment jsdom
 */

import { RelayLogger, RelayRequiredFieldLogger } from '../RelayLogger';

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

describe('Relay Logger', () => {
  it('logs network.complete as expected', () => {
    RelayLogger({
      name: 'execute.start',
      executeId: 100_000,
      params: {
        id: null,
        name: 'MyAwesomeQuery',
        operationKind: 'query',
        text: 'query MyAwesomeQuery{id}',
        metadata: {},
        cacheID: '',
      },
      variables: {},
      cacheConfig: {},
    });

    RelayLogger({
      name: 'execute.complete',
      executeId: 100_000,
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleGroupCollapsedSpy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "%c%s%c%s%c%s",
          "font-weight:bold",
          "[Relay] ",
          "font-weight:normal",
          "execute.start ",
          "font-weight:bold",
          "MyAwesomeQuery",
        ],
        Array [
          "%c%s%c%s",
          "font-weight:bold",
          "[Relay] ",
          "font-weight:normal",
          "execute.complete",
        ],
      ]
    `);
    expect(consoleLogSpy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "cacheConfig": Object {},
            "executeId": 100000,
            "params": Object {
              "cacheID": "",
              "id": null,
              "metadata": Object {},
              "name": "MyAwesomeQuery",
              "operationKind": "query",
              "text": "query MyAwesomeQuery{id}",
            },
            "variables": Object {},
          },
        ],
        Array [
          Object {
            "executeId": 100000,
          },
        ],
      ]
    `);
  });
});

describe('Relay Required Field Logger', () => {
  it('logs missing_field.log as expected', () => {
    RelayRequiredFieldLogger({
      kind: 'missing_field.log',
      owner: 'mock',
      fieldPath: 'mock',
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(consoleGroupCollapsedSpy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "%c%s%c%s",
          "font-weight:bold",
          "[Relay] ",
          "font-weight:normal",
          "missing_field.log",
        ],
      ]
    `);
    expect(consoleLogSpy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "fieldPath": "mock",
            "owner": "mock",
          },
        ],
      ]
    `);
  });
});
