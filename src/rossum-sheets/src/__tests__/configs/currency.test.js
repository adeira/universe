// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('correctly deals with currencies', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'number_currency' },
        formulas: [
          {
            fx: '=A1',
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
              "value": "42",
            },
          },
        },
      ],
    }
  `);
});
