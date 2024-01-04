// @flow

import processRossumPayload from '../processRossumPayload';
import type { ExtensionUserConfig } from '../validateUserConfig';
import type { WebhookPayload } from '../../flowTypes';

export function main(payload: WebhookPayload<ExtensionUserConfig>): { body: string } {
  const { messages, operations, automation_blockers } = processRossumPayload(payload);

  return {
    body: JSON.stringify({
      messages,
      operations,
      automation_blockers,
    }),
  };
}
