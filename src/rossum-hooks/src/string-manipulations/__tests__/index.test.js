// @flow

import { rossum_hook_request_handler } from '../index';
import event from './fixtures/event.json';

it('correctly applies TRANSFORM, REVERSE, SQUISH transformations', () => {
  const settings = {
    mappings: [
      {
        sources: ['custom_3'],
        target: 'result',
        transformations: [
          'TRANSFORM(uppercase)', // "TEST $$$ STRING"
          'TRANSFORM(lowercase)', // "test $$$ string"
          'TRANSFORM(capitalize)', // "Test $$$ String"
          'REVERSE', // "gnirtS $$$ tseT",
          'REMOVE_SPECIAL_CHARACTERS', // "gnirtS  tseT"
          'SQUISH', // "gnirtS tseT",
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
              "value": "gnirtS tseT",
            },
          },
        },
      ],
    }
  `);
});

it('correctly applies SPLIT and CONCATENATE transformation', () => {
  const settings = {
    mappings: [
      {
        sources: ['custom_3'],
        target: 'result',
        transformations: [
          'REMOVE_SPECIAL_CHARACTERS', // "test  string"
          'SQUISH', // "test string"
          'SPLIT( )', // ["test", "string"]
          'CONCATENATE(~)', // "test~string"
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
              "value": "test~string",
            },
          },
        },
      ],
    }
  `);
});

it('correctly applies MATH_OPERATION transformation', () => {
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
