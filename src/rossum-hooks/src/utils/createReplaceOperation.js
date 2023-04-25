// @flow

import type { WebhookResponseOperation, RossumDatapoint } from '../types';

/**
 * Replace the value of the datapoint with a new value.
 *
 * @param datapoint - the content of the datapoint
 * @param newValue - the new value of the datapoint
 *
 * Returns the JSON replace operation definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
 */
export default function createReplaceOperation(
  datapoint: RossumDatapoint,
  newValue: string,
): WebhookResponseOperation {
  return {
    op: 'replace',
    id: datapoint.id,
    value: {
      content: {
        value: newValue,
      },
    },
  };
}
