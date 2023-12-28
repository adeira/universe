// @flow

import { rossum_hook_request_handler } from '../extension';
import settings from './fixtures/settings.json';
import payload from './fixtures/payload.json';

it('works as expected', () => {
  expect(
    rossum_hook_request_handler({
      ...payload,
      settings,
    }),
  ).toMatchInlineSnapshot(`
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
