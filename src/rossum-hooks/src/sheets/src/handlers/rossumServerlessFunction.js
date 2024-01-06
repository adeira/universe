// @flow

import type { WebhookPayload, WebhookResponse } from '@adeira/rossum-flow-types';

import processRossumPayload from '../processRossumPayload';
import type { ExtensionUserConfig } from '../validateUserConfig';

// https://elis.rossum.ai/api/docs/#webhook-events
// eslint-disable-next-line camelcase
export function rossum_hook_request_handler(
  payload: WebhookPayload<ExtensionUserConfig>,
): WebhookResponse {
  const {
    messages,
    operations,
    automation_blockers, // eslint-disable-line camelcase
  } = processRossumPayload(payload);

  return {
    messages,
    operations,
    automation_blockers, // eslint-disable-line camelcase
  };
}
