Current issues (TODOs):

- update and then differential sync back not working?
- tax schedule fields
- UOM (need internal ID from Salem)

---

This hook expects the following button to be present on the line item:

```json5
{
  category: 'datapoint',
  id: 'button_update', // required ID name
  label: 'Update',
  type: 'button',
  can_export: false,
}
```

It then searches for the button parent and calls NetSuite export endpoint with the line item data.

Expected NetSuite configuration:

```json5
{
  itemVendorList: {
    _schema_id: 'line_items',
    _record_type: 'ItemVendorList',
    _filter_values: ['inventory_item'],
    _filter_schema_id: 'item_type',
    itemVendor: {
      _record_type: 'ItemVendor',
      vendorCode: {
        // Vendor Code => Item Vendor List: Vendor Code
        _schema_id: 'item_code',
        _value_type: 'string',
        _record_type: 'simple',
      },
      vendor: {
        _schema_id: 'vendor_ns',
        _value_type: 'string',
        _record_type: 'RecordRef$vendor',
      },
      purchasePrice: {
        // Unit Cost => Item Vendor List: Purchase Price
        _schema_id: 'item_amount',
        _value_type: 'double',
        _record_type: 'simple',
      },
    },
  },
  internalId: {
    _schema_id: 'item_ns',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_always',
  },
  vendorName: {
    // Description => Vendor Name
    _schema_id: 'item_description',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_if_blank',
  },
  displayName: {
    // Description => displayname
    _schema_id: 'item_description',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_if_blank',
  },
  upcCode: {
    // UPC Code => upccode
    _schema_id: 'upc_code',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_if_blank',
  },
  unitsType: {
    // TODO:
    // UOM => unitstype
    _schema_id: 'item_uom_units_type',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_if_blank',
    _default: 'Each', // TODO: remove
  },
  purchaseUnit: {
    // TODO:
    // UOM => purchaseunit
    _schema_id: 'item_uom_purchase_unit',
    _value_type: 'string',
    _record_type: 'simple',
    _update_mode: 'update_if_blank',
    _default: 'Ea', // TODO: remove
  },
  rate: {
    // Retail Price => base price
    _schema_id: 'retail_price',
    _value_type: 'double',
    _record_type: 'simple',
    _update_mode: 'update_always',
  },
  class: {
    // Category => Class
    _schema_id: 'item_category',
    _value_type: 'string',
    _record_type: 'RecordRef$classification',
    _update_mode: 'update_always',
  },
  isTaxable: {
    _schema_id: 'item_is_taxable',
    _value_type: 'boolean',
    _record_type: 'simple',
    _update_mode: 'update_always',
  },
  taxSchedule: {
    _schema_id: 'item_tax_schedule',
    _value_type: 'string',
    _record_type: 'RecordRef$taxType',
    _update_mode: 'update_always',
  },
  customFieldList: {
    _record_type: 'CustomFieldList',
    customField: [
      {
        value: {
          _schema_id: 'item_size',
          _value_type: 'string',
          _record_type: 'simple',
          _omit_empty_value: true,
        },
        scriptId: {
          _default: 'custitem10',
          _schema_id: 'placeholder',
          _value_type: 'string',
          _record_type: 'simple',
        },
        _record_type: 'StringCustomFieldRef',
      },
      {
        value: {
          _schema_id: 'item_color',
          _value_type: 'string',
          _record_type: 'simple',
          _omit_empty_value: true,
        },
        scriptId: {
          _default: 'custitem11',
          _schema_id: 'placeholder',
          _value_type: 'string',
          _record_type: 'simple',
        },
        _record_type: 'StringCustomFieldRef',
      },
      {
        value: {
          _schema_id: 'item_cases',
          _value_type: 'string',
          _record_type: 'simple',
          _omit_empty_value: true,
        },
        scriptId: {
          _default: 'custitem1',
          _schema_id: 'placeholder',
          _value_type: 'string',
          _record_type: 'simple',
        },
        _record_type: 'StringCustomFieldRef',
      },
    ],
  },
}
```
