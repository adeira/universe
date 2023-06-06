// @flow

import { produce } from 'immer';

import findParentByDatapointId from '../../utils/findParentByDatapointId';
import type { RossumPayload } from '../../types';

/**
 * This function accepts the original payload and Button datapoint ID.
 *
 * It then removes the line items from the payload that are NOT associated with the Button
 * datapoint ID.
 */
export default function removeLineItemsExceptOne(
  payload: RossumPayload,
  datapointId: number,
): RossumPayload {
  return produce(payload, (draft) => {
    const lineItemDatapoint = findParentByDatapointId(draft.annotation.content, datapointId);
    const lineItemsDatapoint = findParentByDatapointId(
      draft.annotation.content,
      lineItemDatapoint[0].id,
    );

    lineItemsDatapoint[0].children = [lineItemDatapoint[0]];
  });
}
