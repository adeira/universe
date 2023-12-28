Excel in Rossum (powered by [HyperFormula](https://github.com/handsontable/hyperformula))

## Example config

```json5
{
  debug: false,
  sheets: {
    headers: {
      columns: {
        A: 'document_id',
        B: 'order_id',
        C: 'amount_due',
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
            automation_blocker: true,
          },
        },
      ],
    },
    line_items: {
      columns: {
        A: 'item_quantity',
        B: 'item_amount',
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
        A: 'tax_detail_rate',
      },
      formulas: [
        {
          fx: '=$A1*2',
          target: 'tax_detail_total',
        },
      ],
    },
  },
}
```
