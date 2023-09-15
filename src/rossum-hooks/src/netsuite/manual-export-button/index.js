// @flow

import { produce } from 'immer';

import createMessage from '../../utils/createMessage';
import fetchRossumAPI from '../../utils/fetchRossumAPI';
import type { RossumPayload, WebhookResponse } from '../../types';

export async function rossum_hook_request_handler(
  payload: RossumPayload,
): Promise<WebhookResponse> {
  // Note: this test hook is supposed to be called manually.

  const postData = JSON.stringify(
    produce(payload, (draft) => {
      draft.settings = {
        debug: true,
        export_config: {
          mapping: {
            VendorBill: {
              entity: {
                _schema_id: 'vendor_ns',
                _value_type: 'string',
                _record_type: 'RecordRef$vendor',
              },
              tranId: {
                _schema_id: 'document_id',
                _value_type: 'string',
                _record_type: 'simple',
              },
              dueDate: {
                _schema_id: 'date_due',
                _value_type: 'datetime',
                _record_type: 'simple',
              },
              currency: {
                _schema_id: 'currency_ns',
                _value_type: 'string',
                _record_type: 'RecordRef$currency',
                _reference_field: 'name',
              },
              itemList: {
                item: {
                  item: {
                    _schema_id: 'item_ns',
                    _value_type: 'string',
                    _record_type: 'RecordRef$inventoryItem',
                    _create_if_empty: true, // TODO: important flag!
                  },
                  rate: {
                    _schema_id: 'item_amount',
                    _value_type: 'double',
                    _record_type: 'simple',
                  },
                  taxCode: {
                    _default: '1',
                    _schema_id: 'placeholder',
                    _value_type: 'string',
                    _record_type: 'RecordRef$taxType',
                  },
                  quantity: {
                    _schema_id: 'item_quantity',
                    _value_type: 'double',
                    _record_type: 'simple',
                  },
                  displayName: {
                    _schema_id: 'item_description',
                    _value_type: 'string',
                    _record_type: 'simple',
                  },
                  taxSchedule: {
                    _schema_id: 'item_tax_schedule',
                    _value_type: 'string',
                    _record_type: 'RecordRef$taxType',
                  },
                  _record_type: 'VendorBillItem',
                  customFieldList: {
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
                    _record_type: 'CustomFieldList',
                  },
                },
                _schema_id: 'line_items',
                _record_type: 'VendorBillItemList',
                _filter_values: ['inventory_item'],
                _filter_schema_id: 'item_type',
              },
              location: {
                _schema_id: 'location_ns',
                _value_type: 'string',
                _record_type: 'RecordRef$location',
              },
              taxTotal: {
                _schema_id: 'amount_due',
                _value_type: 'double',
                _record_type: 'simple',
              },
              externalId: {
                _schema_id: 'vb_externalId_generated',
                _value_type: 'string',
                _record_type: 'simple',
              },
              subsidiary: {
                _schema_id: 'subsidiary_ns',
                _value_type: 'string',
                _record_type: 'RecordRef$subsidiary',
              },
              _record_type: 'VendorBill',
              _export_condition: "{po_ns} == ''", // TODO: important flag!
            },
          },
          objects: {
            inventoryItem: {
              _record_type: 'InventoryItem',
              _filter_values: ['inventory_item'],
              _filter_schema_id: 'item_type',
              externalId: {
                _schema_id: 'item_description',
                _value_type: 'string',
                _record_type: 'simple',
              },
              rate: {
                _schema_id: 'item_amount',
                _value_type: 'double',
                _record_type: 'simple',
              },
              taxCode: {
                _default: '1',
                _schema_id: 'placeholder',
                _value_type: 'string',
                _record_type: 'RecordRef$taxType',
              },
              quantity: {
                _schema_id: 'item_quantity',
                _value_type: 'double',
                _record_type: 'simple',
              },
              displayName: {
                _schema_id: 'item_description',
                _value_type: 'string',
                _record_type: 'simple',
              },
              taxSchedule: {
                _schema_id: 'item_tax_schedule',
                _value_type: 'string',
                _record_type: 'RecordRef$taxType',
              },
              customFieldList: {
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
                _record_type: 'CustomFieldList',
              },

              // Down here are some additional fields that were in the original `objects` field definition:
              itemId: {
                _schema_id: 'item_code',
                _value_type: 'string',
                _record_type: 'simple',
              },
              upcCode: {
                _schema_id: 'upc_code',
                _value_type: 'string',
                _record_type: 'simple',
              },
              subsidiaryList: {
                recordRef: {
                  _schema_id: 'subsidiary_ns',
                  _value_type: 'string',
                  _record_type: 'RecordRef$subsidiary',
                },
                _record_type: 'RecordRefList',
              },
            },
          },
          file_cabinet: [],
        },
      };
    }),
  );

  // https://elis.rossum.ai/svc/netsuite/api/v1/export
  const response = await fetchRossumAPI<WebhookResponse>(
    `${payload.base_url}/svc/netsuite/api/v1/export`,
    {
      method: 'POST',
      body: postData,
    },
  );

  if (response.messages.length > 0) {
    return response;
  }
  return {
    messages: [createMessage('info', 'OK!')],
  };
}
