// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('correctly replaces date values', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'number_date' },
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
              "value": "2024-1-24",
            },
          },
        },
      ],
    }
  `);
});

it('correctly replaces datetime values', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'number_datetime' },
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
              "value": "2024-1-24",
            },
          },
        },
      ],
    }
  `);
});

it('correctly replaces time values', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'number_time' },
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

  // TODO: this is a bit unspecified I'd say:
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
              "value": "0.516666666666667",
            },
          },
        },
      ],
    }
  `);
});
