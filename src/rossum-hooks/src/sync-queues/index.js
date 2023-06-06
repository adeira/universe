// @flow

import createMessage from '../utils/createMessage';
import fetchRossumAPI from '../utils/fetchRossumAPI';
import type { WebhookResponse } from '../types';

function fetchQueue(
  authToken: string,
  queueId: string | number,
  baseUrl: string,
): Promise<$FlowFixMe> {
  return fetchRossumAPI<$FlowFixMe>(`${baseUrl}/queues/${queueId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

function extractSchemaUrl(queue: $FlowFixMe): string {
  return queue.schema;
}

export async function rossum_hook_request_handler({
  rossum_authorization_token: rossumAuthorizationToken,
  base_url: baseUrl,
}: $FlowFixMe): Promise<WebhookResponse> {
  const fetchQueueId = 693393; // TODO: make configurable
  const updateQueueIds = [
    824803, // TODO: make configurable
    825096, // TODO: make configurable
  ];

  // Fetch the fetchQueue and extract its schema URL
  const fetchedQueue = await fetchQueue(rossumAuthorizationToken, fetchQueueId, baseUrl);
  const fetchSchemaUrl = extractSchemaUrl(fetchedQueue);

  // Fetch the schema
  const fetchedSchema: $FlowFixMe = await fetchRossumAPI(
    `${baseUrl}/schemas/${fetchSchemaUrl.split('/').pop()}`,
    { headers: { Authorization: `Bearer ${rossumAuthorizationToken}` } },
  );

  // Fetch the updateQueues and extract their schema URLs
  const updateQueues = await Promise.all(
    updateQueueIds.map((queueId) => fetchQueue(rossumAuthorizationToken, queueId, baseUrl)),
  );
  const updateSchemaUrls = updateQueues.map(extractSchemaUrl);

  // Update the other schemas
  const updatePromises = updateSchemaUrls.map((schemaUrl) => {
    return fetchRossumAPI(`${baseUrl}/schemas/${schemaUrl.split('/').pop()}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${rossumAuthorizationToken}` },
      body: JSON.stringify({
        name: fetchedSchema.name,
        content: fetchedSchema.content,
      }),
    });
  });

  await Promise.all(updatePromises);

  return {
    messages: [createMessage('info', 'Queues were updated successfully.')],
  };
}
