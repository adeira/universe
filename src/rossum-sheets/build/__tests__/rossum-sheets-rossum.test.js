// @flow

import createMockPayload from '../../src/__tests__/createMockPayload';
import { rossum_hook_request_handler } from '../rossum-sheets-rossum.js';

it('the bundled file still works as expected', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'document_id' },
        formulas: [
          {
            fx: '=ISBLANK(A1)',
            target: 'notes',
          },
        ],
      },
    },
  };

  expect(rossum_hook_request_handler(createMockPayload(config))).toMatchInlineSnapshot(`
    {
      "automation_blockers": [],
      "messages": [],
      "operations": [
        {
          "id": 9999,
          "op": "replace",
          "value": {
            "content": {
              "value": "false",
            },
          },
        },
      ],
    }
  `);
});
