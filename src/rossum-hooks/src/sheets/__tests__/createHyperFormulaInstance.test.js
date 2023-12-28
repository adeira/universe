// @flow

import createHyperFormulaInstance from '../createHyperFormulaInstance';

const userConfig = {
  debug: false,
  sheets: {
    headers: {
      columns: {
        A1: 'document_id',
        B1: 'order_id',
        C1: 'amount_due',
      },
      formulas: [
        {
          fx: '=SUM(A1,line_items!A1)', // sum two fields
          target: 'notes',
        },
        {
          fx: '=A1', // copy a value
          target: 'notes',
        },
        {
          fx: '=A1>A2', // boolean condition
          target: 'notes',
          validation: {
            type: 'info',
            message: 'A1 is bigger than A2!',
          },
        },
      ],
    },
    line_items: {
      columns: {
        $A1: 'item_quantity',
        $B1: 'item_amount',
      },
      formulas: [
        {
          fx: '=ROW($A1)', // automatically number all rows
          target: 'item_description',
        },
        {
          fx: '=SUM(A:B)', // sum the whole table
          target: 'item_description',
        },
        {
          fx: '=$A1*2', // operation per row (relative rows reference, so it can be copied)
          target: 'item_description',
        },
      ],
    },
    tax_details: {
      columns: {
        $A1: 'tax_detail_rate',
      },
      formulas: [
        {
          fx: '=$A1*2',
          target: 'tax_detail_total',
        },
      ],
    },
  },
};

it('works', () => {
  const hfInstance = createHyperFormulaInstance(require('./payload.json'), userConfig);

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
