// @flow

import { rossum_hook_request_handler } from '../index';
import event from './fixtures/event.json';

describe('CONCATENATE', () => {
  it('correctly applies CONCATENATE transformation without separator', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_1', 'custom_2'],
          target: 'result',
          transformations: ['CONCATENATE'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "24",
              },
            },
          },
        ],
      }
    `);
  });

  it('correctly applies CONCATENATE transformation with custom separator', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_1', 'custom_2'],
          target: 'result',
          transformations: ['CONCATENATE(~)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "2~4",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('REGEX_REPLACE', () => {
  it('correctly applies REGEX_REPLACE transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['REGEX_REPLACE(\\$,💣)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " test 💣💣💣 STRING ",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('REGEX_SEARCH', () => {
  it('correctly applies REGEX_SEARCH transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: [`REGEX_SEARCH(\\\${3})`],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "$$$",
              },
            },
          },
        ],
      }
    `);
  });

  it('correctly handles search with no results', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: [`REGEX_SEARCH(no_matching_results)`], // this should not find anything
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('REMOVE_SPECIAL_CHARACTERS', () => {
  it('correctly applies REMOVE_SPECIAL_CHARACTERS transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['REMOVE_SPECIAL_CHARACTERS'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " test  STRING ",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('REMOVE_WHITESPACE', () => {
  it('correctly applies REMOVE_WHITESPACE transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['REMOVE_WHITESPACE'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "test$$$STRING",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('REVERSE', () => {
  it('correctly applies REVERSE transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['REVERSE'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " GNIRTS $$$ tset ",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('SPLIT', () => {
  it('correctly applies SPLIT transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['SPLIT($$$)', 'CONCATENATE(~)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " test ~ STRING ",
              },
            },
          },
        ],
      }
    `);
  });

  it('correctly applies SPLIT transformation with implicit concatenation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['SPLIT($$$)'], // CONCATENATE not called here on purpose!
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " test  STRING ",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('SQUISH', () => {
  it('correctly applies SQUISH transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: [
            'REMOVE_SPECIAL_CHARACTERS', // " test  string "
            'SQUISH',
          ],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "test STRING",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('TRANSFORM', () => {
  it('correctly applies TRANSFORM(uppercase) transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['TRANSFORM(uppercase)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " TEST $$$ STRING ",
              },
            },
          },
        ],
      }
    `);
  });

  it('correctly applies TRANSFORM(lowercase) transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['TRANSFORM(lowercase)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " test $$$ string ",
              },
            },
          },
        ],
      }
    `);
  });

  it('correctly applies TRANSFORM(capitalize) transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['TRANSFORM(lowercase)', 'TRANSFORM(capitalize)'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": " Test $$$ String ",
              },
            },
          },
        ],
      }
    `);
  });
});

describe('TRIM', () => {
  it('correctly applies TRIM transformation', () => {
    const settings = {
      mappings: [
        {
          sources: ['custom_3'],
          target: 'result',
          transformations: ['TRIM'],
        },
      ],
    };

    expect(
      // $FlowExpectedError[prop-missing]
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
                "value": "test $$$ STRING",
              },
            },
          },
        ],
      }
    `);
  });
});
