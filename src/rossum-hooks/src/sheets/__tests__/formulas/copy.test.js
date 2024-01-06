// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('correctly copies empty values', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'notes' },
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

  // Note: with HyperFormula `evaluateNullToZero` set to `true`, this would evaluate to "0" (zero)
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
              "value": "",
            },
          },
        },
      ],
    }
  `);
});
