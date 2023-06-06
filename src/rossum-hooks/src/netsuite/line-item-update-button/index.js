// @flow

import { produce } from 'immer';

// https://elis.rossum.ai/document/23989179?datapointPath=3101180943,3101180945

// 10 * * * *

// {"ds_collection_name":"NS_InventoryItem"}
// {"created_at":-1}

// {"internalId":"31978"}
// {"displayName":"Men's Slip-On W Side Stitching, 24pp (TEST)"}

import createDummyDatapoint from '../../utils/createDummyDatapoint';
import createMessage from '../../utils/createMessage';
import findByDatapointId from '../../utils/findByDatapointId';
import findBySchemaId from '../../utils/findBySchemaId';
import fetchRossumAPI from '../../utils/fetchRossumAPI';
import getRandomDatapointID from '../../utils/getRandomDatapointID';
import removeLineItemsExceptOne from './removeLineItemsExceptOne';
import type { RossumPayload, WebhookResponse } from '../../types';

export async function rossum_hook_request_handler(
  payload: RossumPayload,
): Promise<WebhookResponse> {
  if (
    payload.event !== 'annotation_content' ||
    payload.action !== 'user_update' ||
    payload.updated_datapoints.length !== 1
  ) {
    // not event we care about, returning
    return {
      messages: [],
    };
  }

  const datapoint_id = payload.updated_datapoints[0];

  const maybeButtonDP = findByDatapointId(payload.annotation.content, datapoint_id)[0];
  if (maybeButtonDP.schema_id !== 'button_update') {
    // not a button click, returning
    return {
      messages: [],
    };
  }

  // Basically, the idea is to remove all line items except the one that was updated so we know
  // which one is the relevant. On top of that we create top-level dummy header fields for all
  // the fields that are mapped to NetSuite (because Netsuite integration cannot read from line items).
  //
  // See: https://rossumai.atlassian.net/browse/EXE-1106
  const reducedPayload = removeLineItemsExceptOne(payload, datapoint_id);

  const maybeLineItem = findBySchemaId(reducedPayload.annotation.content, 'item_ns')[0];
  if (maybeLineItem.content.value === '') {
    return {
      messages: [createMessage('warning', 'Cannot update item: no match found in NetSuite.')],
    };
  }

  const nsInventoryItem = await fetchRossumAPI<WebhookResponse>(
    `${reducedPayload.base_url}/svc/data-storage/api/v1/data/find`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${reducedPayload.rossum_authorization_token}`,
      },
      body: JSON.stringify({
        collectionName: 'NS_InventoryItem',
        query: { internalId: maybeLineItem.content.value },
        projection: {},
        skip: 0,
        limit: 1,
        sort: {},
      }),
    },
  );

  const inventoryItemMapping = reducedPayload.settings;
  const dummyDatapoints = [];

  for (const key in inventoryItemMapping) {
    if (inventoryItemMapping[key] === 'itemVendorList') {
      // special case for `itemVendorList`
      continue;
    } else if (inventoryItemMapping[key] === 'customFieldList') {
      // special case for `customFieldList`
      for (const customFieldElement of inventoryItemMapping[key].customField) {
        const customFieldDataPoint = findBySchemaId(
          reducedPayload.annotation.content,
          customFieldElement.value._schema_id,
        )[0];

        if (customFieldDataPoint != null) {
          dummyDatapoints.push(
            createDummyDatapoint(
              customFieldElement.value._schema_id,
              customFieldDataPoint.content.value,
            ),
          );
        }
      }
    } else if (Object.prototype.hasOwnProperty.call(inventoryItemMapping[key], '_schema_id')) {
      const schemaId = inventoryItemMapping[key]._schema_id;
      const updateMode = inventoryItemMapping[key]._update_mode ?? 'update_never';
      const datapoint = findBySchemaId(reducedPayload.annotation.content, schemaId)[0];

      // dummyDatapoints.push(createDummyDatapoint(schemaId, datapoint.content.value));

      if (updateMode === 'update_if_blank') {
        if (nsInventoryItem.result[0][key] == null || nsInventoryItem.result[0][key] === '') {
          if (datapoint != null) {
            dummyDatapoints.push(createDummyDatapoint(schemaId, datapoint.content.value));
          }
        }
      } else if (updateMode === 'update_always') {
        if (datapoint != null) {
          dummyDatapoints.push(createDummyDatapoint(schemaId, datapoint.content.value));
        }
      } else if (updateMode === 'update_never') {
        // do nothing
      } else {
        throw new Error(`Unknown update mode: ${updateMode}`);
      }
    }
  }

  const postData = JSON.stringify(
    produce(reducedPayload, (draft) => {
      draft.annotation.content.push({
        id: getRandomDatapointID(),
        url: 'https://api.elis.rossum.ai/v1/annotations/__dummy__/content/__dummy__',
        children: dummyDatapoints,
        category: 'section',
        schema_id: 'dummy_datapoints_section',
      });

      draft.settings = {
        debug: true,
        export_config: {
          mapping: {
            _: {
              _operation: 'update',
              _record_type: 'InventoryItem',
              ...inventoryItemMapping,
            },
          },
          objects: {},
          file_cabinet: [],
        },
      };
    }),
  );

  // https://elis.rossum.ai/svc/netsuite/api/v1/export
  const response = await fetchRossumAPI<WebhookResponse>(
    `${reducedPayload.base_url}/svc/netsuite/api/v1/export`,
    {
      method: 'POST',
      body: postData,
    },
  );

  if (response.messages.length > 0) {
    return response;
  }
  return {
    messages: [createMessage('info', 'Item successfully updated in NetSuite.')],
  };
}
