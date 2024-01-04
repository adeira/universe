// @flow

import processRossumPayload from '../processRossumPayload';
import type { ExtensionUserConfig } from '../validateUserConfig';
import type { WebhookPayload, WebhookResponse } from '../../flowTypes';

// https://elis.rossum.ai/api/docs/#webhook-events
export function rossum_hook_request_handler(
  payload: WebhookPayload<ExtensionUserConfig>,
): WebhookResponse {
  const { messages, operations, automation_blockers } = processRossumPayload(payload);

  return {
    messages,
    operations,
    automation_blockers,
  };
}
