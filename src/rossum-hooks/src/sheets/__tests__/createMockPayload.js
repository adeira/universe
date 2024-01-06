// @flow

import type { WebhookPayload } from '../../flowTypes';
import type { ExtensionUserConfig } from '../validateUserConfig';

export default function createMockPayload(
  config: ExtensionUserConfig,
): WebhookPayload<ExtensionUserConfig> {
  // $FlowExpectedError[prop-missing]: incomplete, only for testing purposes
  return {
    settings: config,
    // $FlowExpectedError[prop-missing]: incomplete, only for testing purposes
    annotation: {
      content: [
        {
          id: 1000,
          schema_id: 'document_id',
          content: {
            value: '1000',
          },
        },
        {
          id: 9999,
          schema_id: 'notes',
          content: {
            value: '',
          },
        },
      ],
    },
  };
}
