// @flow

import processRossumPayload from '../../processRossumPayload';
import createMockPayload from '../createMockPayload';

it('TODO', () => {
  //      A  |  B  |  C
  //  1  AAA | BBB | CCC
  //  2  AAA | BBB | CCC
  const config = {
    debug: true,
    sheets: {
      headers: {
        columns: {
          A: 'notes',
          B: '=TRANSPOSE({1,2; 3,4; 5,6})',
        },
        formulas: [
          // {
          //   fx: '=UPPER("a")',
          //   target: 'notes',
          // },
        ],
      },
      // line_items: {
      //   columns: {
      //     A: 'item_aaa',
      //     B: 'item_bbb',
      //     C: 'item_ccc',
      //     // D: '=TRANSPOSE(A1:C2)',
      //     // D: '=TRANSPOSE({1,2; 3,4; 5,6})',
      //   },
      //   formulas: [
      //     {
      //       fx: '=UPPER("a")',
      //       target: 'notes',
      //     },
      //   ],
      // },
    },
  };
  const payload = createMockPayload(config);

  expect(processRossumPayload(payload)).toMatchInlineSnapshot(`
    {
      "automation_blockers": [],
      "messages": [
        {
          "content": "{"allSheetsSerialized":{"headers":[[null,"=TRANSPOSE({1,2; 3,4; 5,6})",3,5],[null,2,4,6]]},"allSheetsValues":{"headers":[[null,1,3,5],[null,2,4,6]]},"rossumResponse":{"messages":[],"operations":[],"automation_blockers":[]}}",
          "id": null,
          "type": "info",
        },
      ],
      "operations": [],
    }
  `);
});
