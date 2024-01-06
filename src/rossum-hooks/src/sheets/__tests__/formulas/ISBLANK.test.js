// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('returns stringified boolean value', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'notes' },
        formulas: [
          {
            fx: '=ISBLANK(A1)',
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
              "value": "true",
            },
          },
        },
      ],
    }
  `);
});

it('shows info message', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'notes' },
        formulas: [
          {
            fx: '=ISBLANK(A1)',
            target: 'notes',
            ifTruthy: {
              showInfo: 'info message',
            },
          },
        ],
      },
    },
  };
  const payload = createMockPayload(config);
  expect(processRossumPayload(payload)).toMatchInlineSnapshot(`
    {
      "automation_blockers": [],
      "messages": [
        {
          "content": "info message",
          "id": 9999,
          "type": "info",
        },
      ],
      "operations": [],
    }
  `);
});

it('blocks automation', () => {
  const config = {
    sheets: {
      headers: {
        columns: { A: 'notes' },
        formulas: [
          {
            fx: '=ISBLANK(A1)',
            target: 'notes',
            ifTruthy: {
              showAutomationBlocker: 'automation blocker',
            },
          },
        ],
      },
    },
  };
  const payload = createMockPayload(config);
  expect(processRossumPayload(payload)).toMatchInlineSnapshot(`
    {
      "automation_blockers": [
        {
          "content": "automation blocker",
          "id": 9999,
        },
      ],
      "messages": [],
      "operations": [],
    }
  `);
});
