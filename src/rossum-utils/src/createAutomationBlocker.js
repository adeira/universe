// @flow

import type { RossumDatapoint, WebhookResponseAutomationBlocker } from '@adeira/rossum-flow-types';

/**
 * @param datapoint - the content of the datapoint
 * @param content - the message shown to the user
 */
export default function createAutomationBlocker(
  datapoint: RossumDatapoint,
  content: WebhookResponseAutomationBlocker['content'],
): WebhookResponseAutomationBlocker {
  return {
    id: datapoint.id,
    content,
  };
}
