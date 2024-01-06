// @flow

import type {
  WebhookResponseOperationValue,
  WebhookResponseOperation,
  RossumDatapoint,
} from '@adeira/rossum-flow-types';

/**
 * Replace the value of the datapoint with a new value.
 *
 * @param datapoint - the content of the datapoint
 * @param newValue - the new value of the datapoint
 * @param hidden - whether the datapoint should be hidden or not
 *
 * Returns the JSON replace operation definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
 */
export default function createReplaceOperation(
  datapoint: RossumDatapoint,
  newValue: string | null,
  hidden?: boolean,
): WebhookResponseOperation {
  const value: WebhookResponseOperationValue = {};

  if (newValue != null) {
    value.content = {
      value: newValue,
    };
  }

  if (hidden != null) {
    value.hidden = hidden;
  }

  return {
    op: 'replace',
    id: datapoint.id,
    value,
  };
}
