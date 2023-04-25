// @flow

import type { WebhookResponseMessage } from '../types';

/**
 * Create a message which will be shown to the user.
 *
 * @param type - the type of the message; errors prevent confirmation in the UI
 * @param content - the message shown to the user
 * @param datapointId - the id of the datapoint where the message will appear (null for "global" messages).
 *
 * Returns the JSON message definition (see https://elis.rossum.ai/api/docs/#annotation-content-event-response-format)
 */
export default function createMessage(
  type: WebhookResponseMessage['type'],
  content: WebhookResponseMessage['content'],
  datapointId: ?string = null,
): WebhookResponseMessage {
  return {
    content,
    type,
    id: datapointId,
  };
}
