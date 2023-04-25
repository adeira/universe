// @flow

import { rossum_hook_request_handler } from '../index';
import event from './fixtures/event.json';

it('correctly applies TRANSFORM', () => {
  const settings = {
    mappings: [
      {
        sources: ['custom_3'],
        target: 'result',
        transformations: [
          'TRANSFORM(uppercase)', // "TEST $$$ STRING"
          'REVERSE', // "GNIRTS $$$ TSET"
          'REMOVE_SPECIAL_CHARACTERS', // "GNIRTS  TSET"
          'SQUISH', // "GNIRTS TSET"
        ],
      },
    ],
  };

  expect(
    rossum_hook_request_handler({ settings, annotation: { content: event.annotation.content } }),
  ).toMatchInlineSnapshot(`
    {
      "messages": [],
      "operations": [
        {
          "id": 999,
          "op": "replace",
          "value": {
            "content": {
              "value": "GNIRTS TSET",
            },
          },
        },
      ],
    }
  `);
});

it('correctly applies MATH_OPERATION', () => {
  const settings = {
    mappings: [
      {
        sources: ['custom_1', 'custom_2'],
        target: 'result',
        transformations: ['MATH_OPERATION(add)'],
      },
    ],
  };

  expect(
    rossum_hook_request_handler({ settings, annotation: { content: event.annotation.content } }),
  ).toMatchInlineSnapshot(`
    {
      "messages": [],
      "operations": [
        {
          "id": 999,
          "op": "replace",
          "value": {
            "content": {
              "value": "6",
            },
          },
        },
      ],
    }
  `);
});
