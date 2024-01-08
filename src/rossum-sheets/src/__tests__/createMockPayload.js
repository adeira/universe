// @flow

import type { WebhookPayload } from '@adeira/rossum-flow-types';

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
          id: 2000,
          schema_id: 'number_currency',
          content: {
            value: '42USD',
          },
        },
        {
          id: 3000,
          schema_id: 'number_percent',
          content: {
            value: '42USD',
          },
        },
        {
          id: 4000,
          schema_id: 'number_date',
          content: {
            value: '2024-01-24',
          },
        },
        {
          id: 5000,
          schema_id: 'number_datetime',
          content: {
            value: '2024-01-24 12:24',
          },
        },
        {
          id: 6000,
          schema_id: 'number_time',
          content: {
            value: '12:24',
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
