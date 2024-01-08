// @flow

import createMockPayload from '../../src/__tests__/createMockPayload';
import { main } from '../rossum-sheets-digitalocean.js';

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

  expect(main(createMockPayload(config))).toMatchInlineSnapshot(`
    {
      "body": "{"messages":[],"operations":[{"op":"replace","id":9999,"value":{"content":{"value":"false"}}}],"automation_blockers":[]}",
    }
  `);
});
