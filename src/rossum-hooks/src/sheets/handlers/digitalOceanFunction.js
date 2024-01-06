// @flow

import type { WebhookPayload } from '@adeira/rossum-flow-types';

import createMessage from '../../utils/createMessage';
import processRossumPayload from '../processRossumPayload';
import type { ExtensionUserConfig } from '../validateUserConfig';

export function main(payload: WebhookPayload<ExtensionUserConfig>): { body: string } {
  try {
    const { messages, operations, automation_blockers } = processRossumPayload(payload);
    return {
      body: JSON.stringify({
        messages,
        operations,
        automation_blockers,
      }),
    };
  } catch (error) {
    return {
      body: JSON.stringify({
        messages: [createMessage('error', error.message)],
        operations: [],
      }),
    };
  }
}
