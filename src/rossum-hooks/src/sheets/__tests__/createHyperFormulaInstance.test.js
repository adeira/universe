// @flow

import payload from './fixtures/payload.json';
import settings from './fixtures/settings.json';
import createHyperFormulaInstance from '../createHyperFormulaInstance';

it('works as expected', () => {
  const hfInstance = createHyperFormulaInstance({ ...payload, settings });

  expect(hfInstance.getAllSheetsSerialized()).toMatchInlineSnapshot(`
    {
      "headers": [
        [
          "123456",
          "098765",
          "2000",
          "=SUM(A1,line_items!A1)",
          "=A1",
          "=A1>A2",
        ],
      ],
      "line_items": [
        [
          "10",
          "100",
          "=ROW($A1)",
          "=SUM(A:B)",
          "=$A1*2",
        ],
        [
          "20",
          "200",
          "=ROW($A2)",
          "=SUM(A:B)",
          "=$A2*2",
        ],
        [
          "30",
          "300",
          "=ROW($A3)",
          "=SUM(A:B)",
          "=$A3*2",
        ],
      ],
      "meta": [
        [
          "https://api.elis.rossum.ai/v1/annotations/45455385",
          "https://api.elis.rossum.ai/v1/documents/49064686",
        ],
      ],
      "tax_details": [
        [
          "10",
          "=$A1*2",
        ],
        [
          "20",
          "=$A2*2",
        ],
        [
          "30",
          "=$A3*2",
        ],
      ],
    }
  `);

  expect(hfInstance.getAllSheetsValues()).toMatchInlineSnapshot(`
    {
      "headers": [
        [
          123456,
          98765,
          2000,
          123466,
          123456,
          true,
        ],
      ],
      "line_items": [
        [
          10,
          100,
          1,
          660,
          20,
        ],
        [
          20,
          200,
          2,
          660,
          40,
        ],
        [
          30,
          300,
          3,
          660,
          60,
        ],
      ],
      "meta": [
        [
          "https://api.elis.rossum.ai/v1/annotations/45455385",
          "https://api.elis.rossum.ai/v1/documents/49064686",
        ],
      ],
      "tax_details": [
        [
          10,
          20,
        ],
        [
          20,
          40,
        ],
        [
          30,
          60,
        ],
      ],
    }
  `);
});
