> [!IMPORTANT]
> This is a community project supported by enthusiasts and volunteers. For official support, please get in touch with [Rossum Sales](https://rossum.ai/form/contact/).

# Rossum Sheets

Rossum Sheets is a project bringing spreadsheet UX into Rossum.

- Use ~400 standardized Excel functions and formulas to calculate or validate anything you need.
- No steep learning curve (everyone knows Excel).
- Stay performant and organize your data as you need them.
- Support for calculating, validating or conditionally hiding fields.

Powered by [HyperFormula](https://github.com/handsontable/hyperformula)

## Installation and Usage

**TODO**

Check `/build/` folder for pre-build functions for AWS, DigitalOcean and Rossum serverless functions.

## Build from source

```
yarn workspace @adeira/rossum-sheets build
```

## Features

### Calculate values

Writes result of the `fx` into the specified datapoint (`target`):

```json
{
  "sheets": {
    "headers": {
      "columns": { "A": "document_id" },
      "formulas": [
        {
          "fx": "=ISBLANK(A1)",
          "target": "notes"
        }
      ]
    }
  }
}
```

Note that you can calculate intermediate values as well:

```json5
{
  columns: {
    A: 'document_id',
    B: '=SUM(A1, 24)', // This allows to pre-calculate any value to be shared in multiple formulas later
  },
}
```

### Set automation blocker

Using `ifTruthy` prevents writing into `target` and it performs some action instead. In this case it sets automation blocker:

```json
{
  "sheets": {
    "headers": {
      "columns": { "A": "document_id" },
      "formulas": [
        {
          "fx": "=ISBLANK(A1)",
          "target": "notes",
          "ifTruthy": {
            "showAutomationBlocker": "My custom automation blocker message."
          }
        }
      ]
    }
  }
}
```

### Show info/warning/error messages

Using `ifTruthy` prevents writing into `target` and it performs some action instead. In this case it shows various messages:

```json
{
  "sheets": {
    "headers": {
      "columns": { "A": "document_id" },
      "formulas": [
        {
          "fx": "=ISBLANK(A1)",
          "target": "notes",
          "ifTruthy": {
            "showInfo": "Document ID is empty.",
            "showWarning": "Should Document ID be empty?",
            "showError": "Document ID cannot be empty!"
          }
        }
      ]
    }
  }
}
```

### Hide and show fields conditionally

Using `ifTruthy` prevents writing into `target` and it performs some action instead. In this case it hides `target` conditionally:

```json
{
  "sheets": {
    "headers": {
      "columns": { "A": "document_id" },
      "formulas": [
        {
          "fx": "=ISBLANK(A1)",
          "target": "notes",
          "ifTruthy": {
            "hide": true
          }
        }
      ]
    }
  }
}
```

Note that when the condition (`fx`) is false then the field is automatically shown again.

## Migrating from existing extensions

Here you will find relevant existing extensions from the Rossum store and their respective configuration using Rossum Sheets. Notice, that even though the new configuration might seem longer, you can replace all these extensions with one Rossum Sheets.

### Accounts Payable Checks

Before:

```json
{
  "checks": [
    {
      "left": ["amount_total"],
      "right": ["amount_total_base", "amount_total_tax"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_sum",
      "message_type": "warning",
      "message_content": "{amount_total} is not equal to {amount_total_base} + {amount_total_tax}."
    },
    {
      "left": "date_issue",
      "right": "date_due",
      "data_type": "date",
      "operation": "check_right_minus_left_within_range",
      "lower_bound": 0,
      "upper_bound": 120,
      "message_type": "warning",
      "message_content": "{date_due} is not within 120 days after {date_issue}."
    },
    {
      "left": ["tax_detail_tax"],
      "right": ["tax_detail_base", "tax_detail_rate"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_multiplication",
      "message_type": "warning",
      "message_content": "{tax_detail_tax} is not equal to {tax_detail_base} x {tax_detail_rate}."
    },
    {
      "left": ["tax_detail_total"],
      "right": ["tax_detail_base", "tax_detail_tax"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_sum",
      "message_type": "warning",
      "message_content": "{tax_detail_total} is not equal to {tax_detail_base} + {tax_detail_tax}."
    },
    {
      "left": ["item_amount_total"],
      "right": ["item_total_base", "item_tax"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_sum",
      "message_type": "warning",
      "message_content": "{item_amount_total} is not equal to {item_total_base} + {item_tax}."
    },
    {
      "left": ["item_total_base"],
      "right": ["item_amount_base", "item_quantity"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_multiplication",
      "message_type": "warning",
      "message_content": "{item_total_base} is not equal to {item_amount_base} x {item_quantity}."
    },
    {
      "left": ["item_amount_total"],
      "right": ["item_amount", "item_quantity"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_multiplication",
      "message_type": "warning",
      "message_content": "{item_amount_total} is not equal to {item_amount} x {item_quantity}."
    },
    {
      "left": ["item_tax"],
      "right": ["item_total_base", "item_rate"],
      "epsilon": 0.5,
      "operation": "check_left_sum_equals_right_multiplication",
      "message_type": "warning",
      "message_content": "{item_tax} is not equal to {item_total_base} x {item_rate}."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "tax_detail_total",
      "header_field": "amount_total",
      "message_type": "warning",
      "message_content": "{amount_total} is not equal to the {tax_detail_total} in the Tax table."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "tax_detail_base",
      "header_field": "amount_total_base",
      "message_type": "warning",
      "message_content": "{amount_total_base} is not equal to the {tax_detail_base} in the Tax table."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "tax_detail_tax",
      "header_field": "amount_total_tax",
      "message_type": "warning",
      "message_content": "{amount_total_tax} is not equal to {tax_detail_tax} in the Tax table."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "item_amount_total",
      "header_field": "amount_total",
      "message_type": "warning",
      "message_content": "{amount_total} is not equal to the sum of the line items’ total amounts."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "item_total_base",
      "header_field": "amount_total_base",
      "message_type": "warning",
      "message_content": "{amount_total_base} is not equal to the sum of the line items’ total bases."
    },
    {
      "epsilon": 0.5,
      "operation": "check_header_field_equals_table_field_sum",
      "table_field": "item_tax",
      "header_field": "amount_total_tax",
      "message_type": "warning",
      "message_content": "{amount_total_tax} is not equal to the sum of the line items’ taxes."
    }
  ]
}
```

After:

**TODO**

### Business Rules Validation

Before:

```json
{
  "checks": [
    {
      "rule": "has_value({document_id})",
      "message": "Invoice number is mandatory."
    }
  ],
  "variables": {}
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "document_id"
      },
      "formulas": [
        {
          "fx": "=ISBLANK(A1)",
          "target": "document_id",
          "ifTruthy": {
            "showError": "Invoice number is mandatory."
          }
        }
      ]
    }
  }
}
```

### Copy & Paste Values

Before:

```json
{
  "operations": [
    {
      "condition": "len({line_items}) > 0 and {item_order_id} == ''",
      "source_field": "order_id",
      "target_field": "item_order_id_calculated"
    },
    {
      "condition": "len({line_items}) > 0 and {item_order_id} != ''",
      "source_field": "item_order_id",
      "target_field": "item_order_id_calculated"
    }
  ]
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "order_id"
      }
    },
    "line_items": {
      "columns": {
        "A": "item_order_id",
        "B": "item_order_id_calculated"
      },
      "formulas": [
        {
          "fx": "=IF(ISBLANK($A1), headers!$A$1, $B1)",
          "target": "item_order_id_calculated"
        }
      ]
    }
  }
}
```

### Date Calculations

Before:

```json
{
  "calculations": [
    {
      "expression": "{date_issue} + timedelta(days={terms})",
      "target_field": "date_due_calculated"
    }
  ]
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "date_issue",
        "B": "terms"
      },
      "formulas": [
        {
          "fx": "=A1 + B1",
          "target": "date_due_calculated"
        }
      ]
    }
  }
}
```

### Find & Replace Values

Before:

```json
{
  "actions": [
    {
      "transformations": [
        {
          "pattern_to_replace": "[^a-zA-Z\\d]",
          "value_to_replace_with": "",
          "replace_if_this_pattern_matches": "[^a-zA-Z\\d]"
        }
      ],
      "source_target_mappings": [
        {
          "source": "sender_vat_id",
          "target": "sender_vat_id_normalized"
        },
        {
          "source": "iban",
          "target": "iban_normalized"
        }
      ]
    }
  ]
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "sender_vat_id",
        "B": "iban"
      },
      "formulas": [
        {
          "fx": "=REGEXREPLACE(A1, \"[^a-zA-Z0-9]\", \"\")",
          "target": "sender_vat_id_normalized"
        },
        {
          "fx": "=REGEXREPLACE(A1, \"[^a-zA-Z0-9]\", \"\")",
          "target": "iban_normalized"
        }
      ]
    }
  }
}
```

### Numeric Calculations

Before:

```json
{
  "calculations": [
    {
      "expression": "({item_amount_total} - default({item_tax}, 0)) / {item_quantity}",
      "target_field": "item_amount_base_calculated",
      "result_decimal_points": 2
    },
    {
      "expression": "{item_total_base} / {item_quantity}",
      "target_field": "item_amount_base_calculated",
      "result_decimal_points": 2
    },
    {
      "expression": "{item_amount_base}",
      "target_field": "item_amount_base_calculated",
      "result_decimal_points": 2
    },
    {
      "expression": "{amount_total}",
      "target_field": "amount_total_calculated",
      "result_decimal_points": 2
    }
  ]
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "amount_total"
      }
    },
    "line_items": {
      "columns": {
        "A": "item_amount_base",
        "B": "item_amount_total",
        "C": "item_quantity",
        "D": "item_tax",
        "E": "item_total_base"
      },
      "formulas": [
        {
          "fx": "=($B1 - IF(ISBLANK($D1), 0, $D1)) / $C1",
          "target": "item_amount_base_calculated"
        },
        {
          "fx": "=$E1 / $C1",
          "target": "item_amount_base_calculated"
        },
        {
          "fx": "=$A1",
          "target": "item_amount_base_calculated"
        },
        {
          "fx": "=headers!A1",
          "target": "amount_total_calculated"
        }
      ]
    }
  }
}
```

### Value Mapping

Before:

```json
{
  "operations": [
    {
      "source_field": "document_type",
      "target_field": "document_type_calculated",
      "values_mapping": {
        "credit_note": "20",
        "tax_invoice": "10"
      }
    }
  ]
}
```

After:

```json
{
  "sheets": {
    "headers": {
      "columns": {
        "A": "document_type"
      },
      "formulas": [
        {
          "fx": "=SWITCH(A1, \"credit_note\", 20, \"tax_invoice\", 10)",
          "target": "document_type_calculated"
        }
      ]
    }
  }
}
```

## Known limitations

- No support for async functions (cannot fetch data in formula for example).
- **TODO**
