// @flow

// import { rossum_hook_request_handler } from '../rossumHookRequestHandler';
import settings from './fixtures/settings.json';
import payload from './fixtures/payload.json';

let rossumHookRequestHandler;
beforeEach(() => {
  jest.isolateModules(() => {
    rossumHookRequestHandler = require('../rossumHookRequestHandler').rossum_hook_request_handler;
  });
});

it('works as expected', () => {
  expect(rossumHookRequestHandler({ ...payload, settings })).toMatchInlineSnapshot(`
    {
      "automation_blockers": [],
      "messages": [
        {
          "content": "A1 is bigger than A2!",
          "id": 5483409898,
          "type": "info",
        },
      ],
      "operations": [
        {
          "id": 5483409898,
          "op": "replace",
          "value": {
            "content": {
              "value": "123466",
            },
          },
        },
        {
          "id": 5483409898,
          "op": "replace",
          "value": {
            "content": {
              "value": "123456",
            },
          },
        },
        {
          "id": 5483409854,
          "op": "replace",
          "value": {
            "content": {
              "value": "1",
            },
          },
        },
        {
          "id": 5483409878,
          "op": "replace",
          "value": {
            "content": {
              "value": "2",
            },
          },
        },
        {
          "id": 5483413303,
          "op": "replace",
          "value": {
            "content": {
              "value": "3",
            },
          },
        },
        {
          "id": 5483409854,
          "op": "replace",
          "value": {
            "content": {
              "value": "660",
            },
          },
        },
        {
          "id": 5483409878,
          "op": "replace",
          "value": {
            "content": {
              "value": "660",
            },
          },
        },
        {
          "id": 5483413303,
          "op": "replace",
          "value": {
            "content": {
              "value": "660",
            },
          },
        },
        {
          "id": 5483409854,
          "op": "replace",
          "value": {
            "content": {
              "value": "20",
            },
          },
        },
        {
          "id": 5483409878,
          "op": "replace",
          "value": {
            "content": {
              "value": "40",
            },
          },
        },
        {
          "id": 5483413303,
          "op": "replace",
          "value": {
            "content": {
              "value": "60",
            },
          },
        },
        {
          "id": 5483422527,
          "op": "replace",
          "value": {
            "content": {
              "value": "20",
            },
          },
        },
        {
          "id": 5483423544,
          "op": "replace",
          "value": {
            "content": {
              "value": "40",
            },
          },
        },
        {
          "id": 5483423549,
          "op": "replace",
          "value": {
            "content": {
              "value": "60",
            },
          },
        },
      ],
    }
  `);
});

it('does not allow writing into meta fields', () => {
  expect(() =>
    rossumHookRequestHandler({
      ...payload,
      settings: {
        sheets: {
          meta: {
            columns: {
              A: 'annotation.url',
              B: 'document.url',
            },
            formulas: [
              {
                fx: '=B1',
                target: 'annotation.url',
              },
            ],
          },
        },
      },
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Meta fields are not supported as a target: annotation.url"`,
  );
});
