// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('correctly calculates intermediate formulas', () => {
  const config = {
    sheets: {
      headers: {
        columns: {
          A: 'document_id',
          B: '=SUM(A1, 24)', // This allows us to pre-calculate any value to be shared in multiple formulas
        },
        formulas: [
          {
            fx: '=B1',
            target: 'notes',
          },
        ],
      },
    },
  };
  const payload = createMockPayload(config);

  expect(processRossumPayload(payload)).toMatchInlineSnapshot(`
    {
      "automation_blockers": [],
      "messages": [],
      "operations": [
        {
          "id": 9999,
          "op": "replace",
          "value": {
            "content": {
              "value": "1024",
            },
          },
        },
      ],
    }
  `);
});
